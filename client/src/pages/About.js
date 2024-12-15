import React from "react";

const About = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center pt-8 px-4">
            <h1 className="text-4xl font-bold mb-6">About Us</h1>
            <div className="bg-white shadow-lg rounded-lg p-8 w-full max-w-4xl">
                <p className="text-gray-700 leading-relaxed">
                    Welcome to <span className="font-bold">CollabNest</span>, your go-to platform for seamless collaboration with your colleagues! 
                    Our mission is to provide tools and features that make teamwork effortless, efficient, and enjoyable. 
                    Whether you're organizing events, managing groups, or simply staying connected, CollabNest has got you covered.
                </p>
                <h2 className="text-2xl font-bold mt-6">Our Vision</h2>
                <p className="text-gray-700 leading-relaxed mt-2">
                    We aim to empower individuals and teams to collaborate effectively, fostering innovation and creativity in the workplace.
                </p>
                <h2 className="text-2xl font-bold mt-6">Meet Our Team</h2>
                <p className="text-gray-700 leading-relaxed mt-2">
                    Behind CollabNest is a passionate team of developers, designers, and visionaries dedicated to making your collaboration experience unparalleled.
                </p>
            </div>
        </div>
    );
};

export default About;
