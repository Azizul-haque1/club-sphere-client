import React from "react";
import { Link } from "react-router";
import { Facebook, Twitter, Instagram, Linkedin, Heart, X } from "lucide-react";

const Footer = () => {
    return (
        <footer className="bg-base-300 text-base-content pt-16 pb-8">
            <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12">
                {/* Brand Section */}
                <div className="space-y-4">
                    <div className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                        ClubSphere
                    </div>
                    <p className="text-base-content/70 text-sm leading-relaxed">
                        Connecting communities, sparking passions, and creating local experiences. Join the movement today.
                    </p>
                </div>

                {/* Quick Links 1 */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-primary">Discover</h3>
                    <ul className="space-y-2 text-sm text-base-content/80">
                        <li><Link to="/clubs" className="hover:text-primary transition">Find Clubs</Link></li>
                        <li><Link to="/events" className="hover:text-primary transition">Upcoming Events</Link></li>
                        <li><a href="#categories" className="hover:text-primary transition">Categories</a></li>
                        <li><Link to="/cities" className="hover:text-primary transition">Cities</Link></li>
                    </ul>
                </div>

                {/* Quick Links 2 */}
                <div>
                    <h3 className="font-bold text-lg mb-4 text-secondary">Company</h3>
                    <ul className="space-y-2 text-sm text-base-content/80">
                        <li><Link to="/about" className="hover:text-secondary transition">About Us</Link></li>
                        <li><Link to="/careers" className="hover:text-secondary transition">Careers</Link></li>
                        <li><Link to="/blog" className="hover:text-secondary transition">Blog</Link></li>
                        <li><Link to="/contact" className="hover:text-secondary transition">Contact</Link></li>
                    </ul>
                </div>

                {/* Social & Newsletter */}
                <div>
                    <h3 className="font-bold text-lg mb-4">Stay Connected</h3>
                    <div className="flex gap-4 mb-6">
                        <a href="#" className="p-2 bg-base-100 rounded-full hover:bg-primary hover:text-white transition shadow-sm">
                            <Facebook size={20} />
                        </a>
                        <a href="#" className="p-2 bg-base-100 rounded-full hover:bg-primary hover:text-white transition shadow-sm">
                            <X size={20} />
                        </a>
                        <a href="#" className="p-2 bg-base-100 rounded-full hover:bg-primary hover:text-white transition shadow-sm">
                            <Instagram size={20} />
                        </a>
                        <a href="#" className="p-2 bg-base-100 rounded-full hover:bg-primary hover:text-white transition shadow-sm">
                            <Linkedin size={20} />
                        </a>
                    </div>
                    <p className="text-xs text-base-content/60">
                        © {new Date().getFullYear()} ClubSphere. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-base-content/10 mt-12 pt-8 text-center text-sm text-base-content/50 flex flex-col md:flex-row justify-center items-center gap-2">
                <span>Made with</span>
                <Heart size={16} className="text-red-500 fill-red-500" />
                <span>for communities everywhere.</span>
            </div>
        </footer>
    );
};

export default Footer;
