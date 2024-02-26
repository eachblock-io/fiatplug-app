"use client";
import { useState } from 'react';
import Image from "next/image";

const networks = [
    {
        id: 1,
        src: '/download.png',
        alt: 'Network 1',
    },
    {
        id: 2,
        src: '/glo.png',
        alt: 'Network 2',
    },
    {
        id: 3,
        src: '/airtel.png',
        alt: 'Network 3',
    },
    {
        id: 4,
        src: '/etisalat.png',
        alt: 'Network 4',
    },
];

const SelectNetwork = () => {
    const [selectedNetworkId, setSelectedNetworkId] = useState(null);

    const selectNetwork = (id) => {
        setSelectedNetworkId(id);
    };

    return (
        <div className="flex">
            {networks.map((network) => (
                <div
                    key={network.id}
                    className={`relative inline-block cursor-pointer p-2 rounded-full ${selectedNetworkId === network.id ? 'ring-4 ring-white' : ''}`}
                    onClick={() => selectNetwork(network.id)}
                    style={{ backgroundColor: selectedNetworkId === network.id ? '#28B825' : 'transparent' }}
                >
                    <Image 
                        src={network.src}
                        alt={network.alt} 
                        className="h-10 w-10 rounded-full"
                    />

                    {selectedNetworkId === network.id && (
                        <span className="absolute right-0 top-0 block h-4 w-4 rounded-full bg-green-400 ring-2 ring-white" />
                    )}
                </div>
            ))}
        </div>
    );
};


export default SelectNetwork;
