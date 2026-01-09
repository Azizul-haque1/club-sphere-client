import React from 'react';
import HeroSection from './HeroSection';
import HowItWorks from './HowItWorks';
import WhyJoin from './WhyJoin';
import Testimonials from './Testimonials';
import CTABanner from './CTABanner';
import Section from './Section';
import Footer from '../../../components/Footer';
import FeaturedClubs from './FeaturedClubs';

const Home = () => {
    return (
        <section>

            <section className=''>
                <HeroSection />
            </section>
            <section className='pt-10'>
                <FeaturedClubs></FeaturedClubs>
            </section>

            {/* feature sectionn */}
            <Section>
                <HowItWorks />
            </Section>
            <Section>
                <WhyJoin />

            </Section>
            <Section>


                <Testimonials />
            </Section>
            <Section>
                <CTABanner />
            </Section>

        </section>
    );
};

export default Home;