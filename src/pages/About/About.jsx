import React from 'react';
import { motion } from 'framer-motion';
import { Users, Lightbulb, Heart, Target, ArrowRight } from 'lucide-react';
import { Link } from 'react-router';

const About = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const stats = [
        { label: "Active Clubs", value: "500+" },
        { label: "Members", value: "10k+" },
        { label: "Universities", value: "50+" },
        { label: "Events Hosted", value: "2k+" }
    ];

    const valueCards = [
        {
            icon: <Users className="w-8 h-8 text-primary" />,
            title: "Community First",
            description: "We believe in the power of connection. Every feature we build is designed to bring people together."
        },
        {
            icon: <Lightbulb className="w-8 h-8 text-secondary" />,
            title: "Innovation",
            description: "Pushing boundaries to create the best possible experience for club leaders and members."
        },
        {
            icon: <Heart className="w-8 h-8 text-accent" />,
            title: "Inclusivity",
            description: "A safe, welcoming space for everyone to share their passions and find their tribe."
        },
        {
            icon: <Target className="w-8 h-8 text-primary" />,
            title: "Growth",
            description: "Empowering individuals to learn, lead, and grow through extracurricular engagement."
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 font-sans">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-base-100 py-20 lg:py-32">
                <div className="absolute top-0 right-0 w-96 h-96 bg-primary/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />
                <div className="absolute bottom-0 left-0 w-80 h-80 bg-secondary/10 rounded-full blur-[80px] translate-y-1/2 -translate-x-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.6 }}
                        className="text-center max-w-3xl mx-auto"
                    >
                        <h1 className="text-5xl md:text-7xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
                            Empowering Communities
                        </h1>
                        <p className="text-xl text-base-content/70 leading-relaxed mb-10">
                            Club Sphere is the ultimate platform for students to discover, join, and manage clubs.
                            We bridge the gap between passion and community.
                        </p>
                    </motion.div>
                </div>
            </div>

            {/* Stats Section */}
            <div className="bg-base-200/50 py-16">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                        {stats.map((stat, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, scale: 0.5 }}
                                whileInView={{ opacity: 1, scale: 1 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1, duration: 0.5 }}
                                className="text-center"
                            >
                                <div className="text-4xl md:text-5xl font-bold text-primary mb-2">{stat.value}</div>
                                <div className="text-sm md:text-base text-base-content/60 font-medium uppercase tracking-wider">{stat.label}</div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Mission Section */}
            <div className="py-24 px-4 sm:px-6 lg:px-8">
                <div className="max-w-7xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 40 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="grid lg:grid-cols-2 gap-16 items-center"
                    >
                        <div className="space-y-8">
                            <h2 className="text-4xl font-bold text-base-content">Our Mission</h2>
                            <p className="text-lg text-base-content/70 leading-relaxed">
                                At Club Sphere, we envision a world where every student can easily find their place.
                                University life is about more than just academics; it's about the connections you make
                                and the passions you pursue.
                            </p>
                            <p className="text-lg text-base-content/70 leading-relaxed">
                                We provide the tools for club leaders to thrive and for members to engage meaningfully.
                                From seamless event management to instant communication, we handle the logistics so you
                                can focus on the community.
                            </p>
                        </div>
                        <div className="relative">
                            <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl rotate-3 hover:rotate-0 transition-transform duration-500">
                                <img
                                    src="https://images.unsplash.com/photo-1523580494863-6f3031224c94?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80"
                                    alt="Students collaboration"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            <div className="absolute -bottom-6 -left-6 z-[-1] w-full h-full rounded-3xl border-2 border-primary/20"></div>
                        </div>
                    </motion.div>
                </div>
            </div>

            {/* Values Section */}
            <div className="py-24 bg-base-100 relative">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-center mb-16"
                    >
                        <h2 className="text-4xl font-bold mb-4">Core Values</h2>
                        <p className="text-base-content/60 max-w-2xl mx-auto">
                            The principles that guide every feature we build and every interaction we facilitate.
                        </p>
                    </motion.div>

                    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {valueCards.map((card, index) => (
                            <motion.div
                                key={index}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: index * 0.1 }}
                                className="p-8 rounded-3xl bg-base-200/40 hover:bg-base-200 transition-colors duration-300 border border-transparent hover:border-primary/10 group"
                            >
                                <div className="mb-6 p-4 rounded-2xl bg-base-100 w-fit shadow-sm group-hover:scale-110 transition-transform duration-300">
                                    {card.icon}
                                </div>
                                <h3 className="text-xl font-bold mb-3">{card.title}</h3>
                                <p className="text-base-content/70 leading-relaxed">
                                    {card.description}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </div>

            {/* CTA Section */}
            <div className="py-24">
                <div className="max-w-5xl mx-auto px-4">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="relative rounded-[3rem] overflow-hidden bg-primary text-primary-content text-center py-20 px-8"
                    >
                        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-10"></div>
                        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-white/10 to-transparent"></div>

                        <div className="relative z-10">
                            <h2 className="text-4xl md:text-5xl font-bold mb-6">Ready to find your circle?</h2>
                            <p className="text-lg md:text-xl opacity-90 mb-10 max-w-2xl mx-auto">
                                Join thousands of students who are already part of the Club Sphere community.
                            </p>
                            <Link
                                to="/register"
                                className="btn btn-lg bg-white text-primary hover:bg-white/90 border-none rounded-full px-10 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300"
                            >
                                Get Started Now
                                <ArrowRight size={20} />
                            </Link>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
};

export default About;
