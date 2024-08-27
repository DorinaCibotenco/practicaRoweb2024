import { Link, Head } from '@inertiajs/react';
import { useState, useEffect } from 'react';
import Footer from '../Layouts/Footer.jsx';
import Navbar from '../Layouts/Navbar.jsx';
import {Fragment} from "react";

export default function Welcome({ auth, products = { data: [], links: [] } }) {
    console.log(products);
    const [displayedProducts, setDisplayedProducts] = useState(products.data);
    const handleProductsUpdate = (updatedProducts) => {
        setDisplayedProducts(updatedProducts);
    };
     products = {
        data: [
            {
                id: 1,
                name: 'MacBook 13',
                category: { name: 'Electronics' },
                price: 1500,
                images: [{ url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?fm=jpg&q=60&w=3000&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8bWFjYm9va3xlbnwwfHwwfHx8MA%3D%3D' }]
            },
            {
                id: 2,
                name: 'Lamp',
                category: { name: 'Home' },
                price: 7,
                images: [{ url: 'https://m.media-amazon.com/images/I/81dGkYK8BlL.jpg' }]
            },
            {
                id: 3,
                name: 'T-shirt',
                category: { name: 'Clothes' },
                price: 15,
                images: [{ url: 'https://img.freepik.com/free-vector/realistic-t-shirt-mockup-color-icon-set-white-black-pink-gray-yellow-red-green-orange-dark-green-blue-light-blue-purple-brown-colors-vector-illustration_1284-79574.jpg' }]
            }
        ],
        links: [
            { url: '/page/1', label: '1', active: true },
            { url: '/page/2', label: '2', active: false }
        ]
    };

    return (<>
        <Head title="Welcome"/>
        <div className="flex flex-col min-h-screen">
            <Navbar auth={auth}/>
            <main className="container flex-1 mx-auto">
                <h1 className={'text-3xl mt-6 mb-4'}>Products</h1>
                <div className="grid grid-cols-3">
                    {products.data.map((product) => (
                        <div className={'w-full p-4'} key={product.id}>
                            <div className={'bg-blue-300 border-4 border-blue-600 rounded-lg'}>
                                <div className="flex items-center justify-center overflow-hidden h-40">
                                    {product.images.length > 0 && <img src={product.images[0].url} alt={''} className={'w-full'} height={200}/>}
                                </div>
                                <div className='text-lg font-bold px-2 mt-2 leading-7'>{product.name}</div>
                                <div className={'px-2 mt-2 text-red-600 font-medium'}>#{product.category.name}</div>
                                <div className={'px-2 mt-2 font-medium'}>&euro;{product.price}</div>
                            </div>
                        </div>
                    ))}
                </div>
                
                <div className={'flex justify-center mt-4'}>
                    {products.links.map((link, key) => (
                        <Fragment key={key}>
                            {link.url && !link.active && <Link className={'bg-blue-500 p-2 text-white mr-2'} href={link.url}>
                                <span dangerouslySetInnerHTML={{__html: link.label}}/>
                            </Link>}
                            {link.url && link.active && <span className={'bg-gray-500 p-2 text-white mr-2'}>{link.label}</span>}
                        </Fragment>
                    ))}
                </div>
            </main>
            <Footer/>
        </div>
    </>);
};
