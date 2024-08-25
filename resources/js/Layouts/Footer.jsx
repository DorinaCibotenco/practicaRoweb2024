import { Link } from '@inertiajs/react';

export default function Footer() {
    return (
        <footer className="py-8 px-10 text-center text-sm text-black dark:text-white/70 bg-cyan-100" >
                        <div className='space-x-4 mb-4'>
                            <Link className='hover:underline' >BLOG</Link>
                            <Link className='hover:underline' >EXPLORE</Link>
                            <Link className='hover:underline' >KNOW MORE</Link>
                            <Link className='hover:underline' >ABOUT</Link>
                            <i className="fa-brands fa-instagram  hover:border-2 border-gray-950 p-1 rounded-full"></i>
                            <i className="fa-brands fa-facebook hover:border-2 border-gray-950 p-1 rounded-full"></i>
                            <i className="fa-solid fa-phone hover:border-2 border-gray-950 p-1 rounded-full"></i>
                            
                        </div>
                    
                        </footer>
    );
}