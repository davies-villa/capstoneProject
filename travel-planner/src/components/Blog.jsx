import React from 'react';
import profile1 from '../assets/tadiwa.png'; 
import profile2 from '../assets/davies.png'; 

// Example blog data with imported images
const blogs = [
    {
        id: 1,
        author: 'Tadiwa Choga',
        title: 'Exploring the Wilderness',
        quote: '"There is no better therapy than nature, and hiking is one of the purest ways to experience it."',
        image: profile1, 
    },
    {
        id: 2,
        author: 'Davies Gotosa',
        title: 'A Journey Through History',
        quote: '"Understanding the past is key to shaping the future, and history has so much to teach us."',
        image: profile2, 
    },
];

const Blog = () => {
    return (
        <section className="py-12 bg-gray-50">
            <div className="max-w-6xl mx-auto px-4">
                <h2 className="text-3xl font-bold text-center mb-8">Latest Blogs</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {blogs.map((blog) => (
                        <div key={blog.id} className="bg-white rounded-lg shadow-lg p-6 flex flex-col items-center text-center">
                            {/* Blog Author Image in Circle */}
                            <div className="w-24 h-24 mb-4">
                                <img
                                    src={blog.image}
                                    alt={blog.author}
                                    className="w-full h-full object-cover rounded-full border-4 border-gray-200 shadow-lg"
                                />
                            </div>
                            {/* Author Name */}
                            <h4 className="text-lg font-medium">{blog.author}</h4>
                            {/* Blog Title */}
                            <h3 className="text-lg font-bold mt-2">{blog.title}</h3>
                            {/* Short Quote */}
                            <p className="text-gray-600 text-md mt-4 italic">{blog.quote}</p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Blog;
