import React from 'react';
import Logo from '../assets/WEBSYNK.jpg'
import { FaInstagram, FaEnvelope, FaPhoneAlt } from 'react-icons/fa';

export default function Footer() {
    return (
        <footer className="bg-black text-white py-6">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    {/* Logo and Copyright - Using text logo with styling that matches your header */}
                    <div className="flex items-center mb-4 md:mb-0">
                        <div className="flex items-center">
                            <img
                                src={Logo}
                                alt="WebSynk Logo"
                                className="h-8 mr-2"
                            />
                        </div>
                        <div className="hidden md:block border-l border-blue-400 h-6 mx-4"></div>
                        <p className="text-sm hidden md:block">
                            &copy; {new Date().getFullYear()} All rights reserved
                        </p>
                    </div>

                    {/* Mobile Copyright */}
                    <p className="md:hidden text-sm mb-4">
                        &copy; {new Date().getFullYear()} All rights reserved by WebSynk
                    </p>

                    {/* Contact Info */}
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
                        <a href="https://www.instagram.com/websynk_official" target="_blank" rel="noopener noreferrer"
                            className="flex items-center hover:text-blue-200 transition-colors text-sm">
                            <FaInstagram className="mr-2" /> @websynk
                        </a>
                        <a href="mailto:websynkofficial@gmail.com"
                            className="flex items-center hover:text-blue-200 transition-colors text-sm">
                            <FaEnvelope className="mr-2" /> websynkofficial@gmail.com
                        </a>
                        <a href="tel:+917990879645"
                            className="flex items-center hover:text-blue-200 transition-colors text-sm">
                            <FaPhoneAlt className="mr-2" /> +(91) 79908 79645
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
}