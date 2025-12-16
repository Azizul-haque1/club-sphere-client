import React from 'react';
import { Link } from 'react-router';

const Logo = () => {
    return <Link to={'/'} className="text-3xl font-bold bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Club<span className='text-primary'>Sphere</span>
    </Link>

};

export default Logo;