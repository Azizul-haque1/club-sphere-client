
import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import gsap from 'gsap';
import { Calendar, Users } from 'lucide-react';
import { Link } from 'react-router';

const HeroSection = () => {
    const heroRef = useRef(null);
    const shape1Ref = useRef(null);
    const shape2Ref = useRef(null);

    // GSAP Animation for background shapes
    useEffect(() => {
        const tl = gsap.timeline({ repeat: -1, yoyo: true });

        // Random floating movement
        tl.to(shape1Ref.current, {
            y: -30,
            x: 20,
            rotation: 10,
            duration: 4,
            ease: "sine.inOut"
        }, 0)
            .to(shape2Ref.current, {
                y: 40,
                x: -20,
                rotation: -10,
                duration: 5,
                ease: "sine.inOut"
            }, 0);

        // Initial entrance
        gsap.fromTo(heroRef.current,
            { opacity: 0 },
            { opacity: 1, duration: 1, ease: "power2.out" }
        );
    }, []);

    // Framer Motion variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: { staggerChildren: 0.2, delayChildren: 0.3 }
        }
    };

    const itemVariants = {
        hidden: { y: 20, opacity: 0 },
        visible: {
            y: 0,
            opacity: 1,
            transition: { type: "spring", stiffness: 100 }
        }
    };

    return (
        <section
            ref={heroRef}
            className="relative mx-4 md:mx-auto
            rounded-xl py-20 flex items-center justify-center overflow-hidden bg-gradient-to-br from-primary/30 to-secondary/10 text-base-content"
        >
            {/* Background Shapes for GSAP */}
            <div
                ref={shape1Ref}
                className="absolute top-[10%] left-[10%] w-[300px] h-[300px] rounded-full bg-primary/20 blur-3xl z-0"
            />
            <div
                ref={shape2Ref}
                className="absolute bottom-[15%] right-[10%] w-[250px] h-[250px] rounded-full bg-secondary/20 blur-3xl z-0"
            />

            {/* Content for Framer Motion */}
            <motion.div
                className="relative z-10 text-center px-8 max-w-4xl"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
            >
                <motion.div variants={itemVariants}>
                    <div className="badge badge-lg badge-outline gap-2 bg-primary/10 border-primary/20 text-primary mb-6">
                        <Users size={16} />
                        Community First
                    </div>
                </motion.div>

                <motion.h1 className="text-5xl md:text-7xl font-extrabold mb-6 text-base-content" variants={itemVariants}>
                    Discover & Join <br />
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                        Local Clubs Near You
                    </span>
                </motion.h1>

                <motion.p className="text-lg md:text-xl text-base-content/80 mb-10 max-w-2xl mx-auto leading-relaxed" variants={itemVariants}>
                    Photography, tech, sports, culture, and more — all in one platform.
                    Connect with like-minded people and attend amazing events.
                </motion.p>

                <motion.div className="flex flex-wrap gap-4 justify-center items-center" variants={itemVariants}>
                    <Link to="/clubs">
                        <motion.button
                            className="btn btn-primary btn-lg gap-2 shadow-lg hover:shadow-xl border-none text-white"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Users size={20} />
                            Join a Club
                        </motion.button>
                    </Link>

                    <Link to="/events">
                        <motion.button
                            className="btn btn-outline btn-primary btn-lg gap-2 hover:bg-primary hover:text-white hover:border-primary"
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Calendar size={20} />
                            Join an Event
                        </motion.button>
                    </Link>
                </motion.div>
            </motion.div>
        </section>
    );
};

export default HeroSection;
