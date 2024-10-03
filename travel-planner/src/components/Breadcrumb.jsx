// src/components/Breadcrumb.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Breadcrumb = ({ current }) => {
    return (
        <nav className="mb-4">
            <ul className="flex space-x-2">
                <li>
                    <Link to="/" className="text-blue-500 hover:underline">Home</Link>
                </li>
                <li>
                    <Link to="/destinations" className="text-blue-500 hover:underline">Destinations</Link>
                </li>
                <li className="text-gray-500">{current}</li>
            </ul>
        </nav>
    );
};

export default Breadcrumb;
