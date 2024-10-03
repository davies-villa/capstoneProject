import React from 'react';
import destination1 from '../assets/folosi.png'; 
import destination2 from '../assets/namibia.png';
import destination3 from '../assets/zanzibar.png';
import destination4 from '../assets/okavangoo.png';
import destination5 from '../assets/desert.png';

const destinations = [
    { id: 1, city: 'New York', country: 'United States', image: destination1 },
    { id: 2, city: 'Tokyo', country: 'Japan', image: destination2 },
    { id: 3, city: 'Paris', country: 'France', image: destination3 },
    { id: 4, city: 'Sydney', country: 'Australia', image: destination4 },
    { id: 5, city: 'Cape Town', country: 'South Africa', image: destination5 },
];

const Destinations = () => {
    return (
        <section className="py-8">
            <div className="max-w-6xl mx-auto px-2">
                <h2 className="text-xl font-bold mb-1">Trending Destinations</h2>
                <p className=" mb-6 text-black text-md  font-semi-bold">Explore some of the most beautiful places around the world!</p>
                <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-4">
                    {destinations.map(dest => (
                        <div key={dest.id} className="relative overflow-hidden rounded-lg shadow-lg">
                            <img src={dest.image} alt={dest.city} className="w-full h-auto object-cover" />
                            <div className="absolute bottom-0 left-0 bg-custom-gradient bg-opacity-50 text-white p-4 w-full">
                                <h3 className="text-xl font-semi-bold">{dest.city}</h3>
                                <p className="text-md  font-light">{dest.country}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Destinations;
