import React, { createContext, useContext, useState, useEffect } from 'react';
import peerjs from 'peerjs'
// Create a Context for the Peer Service
const PeerContext = createContext();

// Provider Component
export const PeerProvider = ({ children }) => {
    const [peer, setPeer] = useState(null);
    const [peerId, setpeerId] = useState()
    useEffect(() => {
        const newpeer = new peerjs()
        newpeer.on('open', id => {
            setPeer(newpeer)
            setpeerId(id)
        })
        setPeer(newpeer)

    }, []); // Empty dependency array means this runs once on mount



    return (
        <PeerContext.Provider value={{ peerId, peer }}>
            {children}
        </PeerContext.Provider>
    );
};

// Custom hook to use the PeerContext
export const usePeer = () => useContext(PeerContext);
