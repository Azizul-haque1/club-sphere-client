import React from 'react';
import { motion } from 'framer-motion';

const Loader = ({ fullScreen = false }) => {
    // Variants for the core pulsating circle
    const coreVariants = {
        animate: {
            scale: [1, 1.2, 1],
            opacity: [0.8, 1, 0.8],
            transition: {
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut"
            }
        }
    };

    // Variants for the orbiting ring
    const orbitVariants = {
        animate: {
            rotate: 360,
            transition: {
                duration: 3,
                repeat: Infinity,
                ease: "linear"
            }
        }
    };

    // Variants for floating particles
    const particleVariants = (delay) => ({
        animate: {
            y: [-10, 10, -10],
            x: [-10, 10, -10],
            opacity: [0, 1, 0],
            transition: {
                duration: 2,
                repeat: Infinity,
                delay: delay,
                ease: "easeInOut"
            }
        }
    });

    return (
        <div className={`${fullScreen ? 'fixed inset-0 z-50 bg-base-100/80 backdrop-blur-sm' : 'w-full h-full  min-h-[800px]'} flex items-center justify-center`}>
            <div className="relative flex items-center justify-center w-32 h-32">
                {/* Outer Orbit Ring */}
                <motion.div
                    className="absolute w-24 h-24 border-4 border-t-primary border-r-secondary border-b-primary/30 border-l-secondary/30 rounded-full"
                    variants={orbitVariants}
                    animate="animate"
                />

                {/* Counter-rotating Inner Ring */}
                <motion.div
                    className="absolute w-16 h-16 border-2 border-t-secondary border-l-primary/50 border-b-transparent border-r-transparent rounded-full"
                    animate={{ rotate: -360 }}
                    transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
                />

                {/* Core Sphere */}
                <motion.div
                    className="absolute w-8 h-8 bg-gradient-to-tr from-primary to-secondary rounded-full shadow-[0_0_20px_rgba(0,0,0,0.3)]"
                    variants={coreVariants}
                    animate="animate"
                />

                {/* Floating Particles/Satellites */}
                {[...Array(3)].map((_, i) => (
                    <motion.div
                        key={i}
                        className="absolute w-2 h-2 bg-accent rounded-full"
                        style={{
                            top: `${50 + (Math.sin(i * 2) * 50)}%`,
                            left: `${50 + (Math.cos(i * 2) * 50)}%`,
                        }}
                        variants={particleVariants(i * 0.5)}
                        animate="animate"
                    />
                ))}
            </div>

            {/* Loading Text */}
            <motion.p
                className="absolute mt-40 text-sm font-semibold tracking-widest uppercase text-base-content/70"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
            >
                Loading
            </motion.p>
        </div>
    );
};

export default Loader;
