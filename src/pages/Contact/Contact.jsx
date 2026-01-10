import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Phone, MapPin, Send, MessageCircle, HelpCircle } from 'lucide-react';

const Contact = () => {
    const fadeIn = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    const contactInfo = [
        {
            icon: <Mail className="w-6 h-6 text-primary" />,
            title: "Email Us",
            value: "hello@clubsphere.com",
            desc: "For general inquiries and support"
        },
        {
            icon: <Phone className="w-6 h-6 text-secondary" />,
            title: "Call Us",
            value: "+1 (555) 123-4567",
            desc: "Mon-Fri from 9am to 6pm"
        },
        {
            icon: <MapPin className="w-6 h-6 text-accent" />,
            title: "Visit Us",
            value: "123 Innovation Dr, Tech City",
            desc: "Come say hello at our office"
        }
    ];

    const faqs = [
        {
            question: "How do I start a new club?",
            answer: "Starting a club is easy! Just navigate to your dashboard and click 'Create Club'. You'll need to fill out some basic details and wait for admin approval."
        },
        {
            question: "Is Club Sphere free to use?",
            answer: "Yes! Club Sphere is completely free for students to join clubs. Some clubs may have their own membership fees."
        },
        {
            question: "Can I join multiple clubs?",
            answer: "Absolutely! There's no limit to how many communities you can be a part of. Explore as many as you like."
        }
    ];

    return (
        <div className="min-h-screen bg-base-100 font-sans">
            {/* Hero Section */}
            <div className="relative overflow-hidden bg-base-100 py-20 lg:py-28">
                <div className="absolute top-0 left-1/4 w-96 h-96 bg-primary/5 rounded-full blur-[100px] -translate-y-1/2" />
                <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-secondary/5 rounded-full blur-[80px] translate-y-1/2" />

                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
                    <motion.div
                        initial="hidden"
                        animate="visible"
                        variants={fadeIn}
                        transition={{ duration: 0.6 }}
                    >
                        <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary mb-6">
                            Get in Touch
                        </h1>
                        <p className="text-xl text-base-content/70 max-w-2xl mx-auto">
                            Have questions, suggestions, or just want to say hi? We'd love to hear from you.
                        </p>
                    </motion.div>
                </div>
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
                <div className="grid lg:grid-cols-3 gap-12">
                    {/* Contact Info & FAQ - Left Column */}
                    <div className="lg:col-span-1 space-y-12">
                        {/* Info Cards */}
                        <div className="space-y-6">
                            {contactInfo.map((info, index) => (
                                <motion.div
                                    key={index}
                                    initial={{ opacity: 0, x: -20 }}
                                    whileInView={{ opacity: 1, x: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="flex items-start gap-4 p-6 rounded-2xl bg-base-200/50 hover:bg-base-200 transition-colors"
                                >
                                    <div className="p-3 rounded-xl bg-base-100 shadow-sm">
                                        {info.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-lg">{info.title}</h3>
                                        <p className="text-primary font-medium">{info.value}</p>
                                        <p className="text-sm text-base-content/60 mt-1">{info.desc}</p>
                                    </div>
                                </motion.div>
                            ))}
                        </div>

                        {/* FAQ Section */}
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                        >
                            <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                                <HelpCircle className="w-6 h-6 text-primary" />
                                Frequently Asked
                            </h3>
                            <div className="join join-vertical w-full bg-base-200/30 rounded-2xl">
                                {faqs.map((faq, index) => (
                                    <div key={index} className="collapse collapse-arrow join-item border-base-300 border-b last:border-none">
                                        <input type="radio" name="my-accordion-4" defaultChecked={index === 0} />
                                        <div className="collapse-title text-base font-medium">
                                            {faq.question}
                                        </div>
                                        <div className="collapse-content">
                                            <p className="text-base-content/70">{faq.answer}</p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </motion.div>
                    </div>

                    {/* Contact Form - Right Column */}
                    <div className="lg:col-span-2">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            className="bg-base-100 p-8 md:p-10 rounded-[2.5rem] shadow-2xl border border-base-200 relative overflow-hidden"
                        >
                            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-[60px] translate-x-1/2 -translate-y-1/2" />

                            <h2 className="text-3xl font-bold mb-8 relative z-10">Send us a Message</h2>

                            <form className="space-y-6 relative z-10" onSubmit={(e) => {
                                e.preventDefault();
                                const form = e.target;
                                // Simple feedback demo
                                const btn = form.querySelector('button');
                                const originalText = btn.innerHTML;
                                btn.innerHTML = 'Message Sent!';
                                btn.classList.add('btn-success');
                                setTimeout(() => {
                                    btn.innerHTML = originalText;
                                    btn.classList.remove('btn-success');
                                    form.reset();
                                }, 3000);
                            }}>
                                <div className="grid md:grid-cols-2 gap-6">
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Your Name</span>
                                        </label>
                                        <input required type="text" placeholder="John Doe" className="input input-bordered rounded-xl bg-base-200/50 focus:bg-base-100 transition-colors" />
                                    </div>
                                    <div className="form-control">
                                        <label className="label">
                                            <span className="label-text font-medium">Email Address</span>
                                        </label>
                                        <input required type="email" placeholder="john@example.com" className="input input-bordered rounded-xl bg-base-200/50 focus:bg-base-100 transition-colors" />
                                    </div>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Subject</span>
                                    </label>
                                    <select defaultValue="" className="select select-bordered rounded-xl bg-base-200 focus:bg-base-100 transition-colors w-full">
                                        <option disabled value="">Select a topic</option>
                                        <option value="General Inquiry">General Inquiry</option>
                                        <option value="Technical Support">Technical Support</option>
                                        <option value="Feedback">Feedback</option>
                                        <option value="Partnership">Partnership</option>
                                    </select>
                                </div>

                                <div className="form-control">
                                    <label className="label">
                                        <span className="label-text font-medium">Message</span>
                                    </label>
                                    <textarea required className="textarea textarea-bordered h-40 w-full mt-1 rounded-xl bg-base-200/50 focus:bg-base-100 transition-colors resize-none" placeholder="How can we help you?"></textarea>
                                </div>

                                <button className="btn btn-primary btn-lg rounded-xl w-full md:w-auto px-10 shadow-lg hover:shadow-primary/30 transition-all">
                                    <Send size={20} />
                                    Send Message
                                </button>
                            </form>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
