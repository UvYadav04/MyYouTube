// src/components/CustomQualityButton.jsx
import videojs from 'video.js';

const Button = videojs.getComponent('Button');

class QualityButton extends Button {
    constructor(player, options) {
        super(player, options);
        this.addClass('vjs-quality-button');
        this.controlText('Quality');

        this.on('click', () => {
            const qualityLevels = player.qualityLevels();
            let currentQualityIndex = qualityLevels.selectedIndex;
            let nextQualityIndex = (currentQualityIndex + 1) % qualityLevels.length;

            qualityLevels.levels_.forEach((level, index) => {
                level.enabled = index === nextQualityIndex;
            });
        });
    }
}

videojs.registerComponent('QualityButton', QualityButton);
