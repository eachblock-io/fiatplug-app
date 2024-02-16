"use client";
import { useState } from 'react';
import mtn from "../../public/glo.png"

const networks = [
    {
        id: 1,
        src: '/public/icons/download.png',
        alt: 'Network 1',
    },
    {
        id: 2,
        src: '/public/icons/download.png',
        alt: 'Network 2',
    },
    {
        id: 3,
        src: 'https://images.unsplash.com/photo-1556740749-887f6717d7e4?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        alt: 'Network 3',
    },
    {
        id: 4,
        src: 'https://images.unsplash.com/photo-1541747157478-3222166cf342?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
        alt: 'Network 4',
    },
];

const SelectNetwork = () => {
    const [selectedNetworkId, setSelectedNetworkId] = useState(null);

    const selectNetwork = (id) => {
        setSelectedNetworkId(id);
    };

    return (
        <div className="flex justify-center gap-4">
            {networks.map((network) => (
                <div
                    key={network.id}
                    className={`relative inline-block cursor-pointer p-2 rounded-full ${selectedNetworkId === network.id ? 'ring-4 ring-white' : ''}`}
                    onClick={() => selectNetwork(network.id)}
                    style={{ backgroundColor: selectedNetworkId === network.id ? '#28B825' : 'transparent' }}
                >
                    <img
                        className="h-16 w-16 rounded-full"
                        src={network.src}
                        alt={network.alt}
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
