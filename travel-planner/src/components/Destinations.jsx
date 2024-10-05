// src/components/Destinations.jsx
import React from 'react';
import destinations from '../data/destinations'; // Adjust the path based on your project structure

const Destinations = () => {
    return (
        <section className="py-8">
            <div className="max-w-6xl mx-auto px-2">
                <h2 className="text-xl font-bold mb-1">Trending Destinations</h2>
                <p className="mb-6 text-black text-md font-semi-bold">
                    Explore some of the most beautiful places around the world!
                </p>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {destinations.slice(0, 5).map(dest => (  // Only the first five destinations
                        <div key={dest.id} className="relative overflow-hidden rounded-lg shadow-lg">
                            <img src={dest.image} alt={dest.city} className="w-full h-auto object-cover" />
                            <div className="absolute bottom-0 left-0 bg-custom-gradient bg-opacity-50 text-white p-4 w-full">
                                <h3 className="text-xl font-semi-bold">{dest.city}</h3>
                                <p className="text-md font-light">{dest.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
