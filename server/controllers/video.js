"use strict";
const videofile = require("../models/videofile");
const path = require('path');
const fs = require('fs');
const ffmpeg = require('fluent-ffmpeg');

// Ensure the uploads directory exists
const baseDir = path.dirname(require.main.filename)
const uploadDir = path.join(baseDir, 'uploads')

// if (!fs.existsSync(uploadDir)) {
//     fs.mkdirSync(uploadDir, { recursive: true });
// }

const uploadvideo = async (req, res) => {
    // console.log(__dirname)
    if (!req.file) {
        return res.status(400).json({ message: "Please upload an MP4 video file only." });
    }

    try {
        const inputFilePath = req.file.path;
        const baseName = path.basename(inputFilePath, path.extname(inputFilePath));
        const outputDir = path.join(uploadDir, baseName);
        // console.log(baseName)

        if (!fs.existsSync(outputDir)) {
            fs.mkdirSync(outputDir, { recursive: true });
        }

        // Convert video to HLS format
        await convertToHLS(inputFilePath, outputDir);

        // Save file details to the database
        const file = new videofile({
            videotitle: req.body.title,
            filename: req.file.originalname,
            filepath: req.file.path,
            filetype: req.file.mimetype,
            filesize: req.file.size,
            videochanel: req.body.chanel,
            uploader: req.body.uploader,
            baseName: baseName
        });
        await file.save();

        res.status(200).json({ message: "File uploaded and converted successfully." });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

const getallvideos = async (req, res) => {
    try {
        const files = await videofile.find();
        res.status(200).json(files);
    } catch (error) {
        res.status(500).json({ message: "An error occurred.", error: error.message });
    }
};

// Convert video to HLS format
const convertToHLS = (inputFilePath, outputDir) => {
    return new Promise((resolve, reject) => {
        const resolutions = [
            { name: '360p', width: 640, height: 360 },
            { name: '480p', width: 854, height: 480 },
            { name: '720p', width: 1280, height: 720 }
        ];

        const masterPlaylist = path.join(outputDir, 'master.m3u8');
        fs.writeFileSync(masterPlaylist, '#EXTM3U\n');

        const command = ffmpeg(inputFilePath);

        resolutions.forEach(res => {
            const outputFile = path.join(outputDir, `${res.name}.m3u8`);
            console.log(`Processing resolution: ${res.name}`);

            command.output(outputFile)
                .outputOptions([
                    `-vf scale=${res.width}:${res.height}`,
                    '-c:a aac',
                    '-ar 48000',
                    '-b:a 128k',
                    '-c:v h264',
                    '-profile:v main',
                    '-crf 20',
                    '-sc_threshold 0',
                    '-g 48',
                    '-keyint_min 48',
                    '-hls_time 4',
                    '-hls_playlist_type vod',
                    '-b:v 1400000',
                    '-maxrate 1400000',
                    '-bufsize 2100000',
                    '-hls_segment_filename', path.join(outputDir, `${res.name}_%03d.ts`)
                ]);

            fs.appendFileSync(masterPlaylist, `#EXT-X-STREAM-INF:BANDWIDTH=1400000,RESOLUTION=${res.width}x${res.height}\n${res.name}.m3u8\n`);
        });

        command.on('end', () => {
            console.log('File has been converted successfully.');
            resolve();
        }).on('error', (err) => {
            console.error('An error occurred: ' + err.message);
            reject(err);
        }).run();
    });
};

module.exports = { uploadvideo, getallvideos };
