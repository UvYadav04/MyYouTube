import React, { createContext, useMemo, useContext } from 'react';
import io from 'socket.io-client';

const SocketContext = createContext();

export default function SocketProvider(props) {
    const socket = useMemo(() => {
        return io("http://localhost:3000", {
            transports: ['websocket']
        });
    }, []);

    return (
        <SocketContext.Provider value={socket}>
            {props.children}
        </SocketContext.Provider>
    );
}

// Custom hook to use the socket context
export function useSocket() {
    const context = useContext(SocketContext);
    if (context === undefined) {
        throw new Error('useSocket must be used within a SocketProvider');
    }
    return context;
}
