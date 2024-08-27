import { useState, useEffect } from 'react';
import { Link, useForm } from '@inertiajs/react';
import ApplicationLogo from "@/Components/ApplicationLogo.jsx";
import axios from 'axios';

export default function Navbar({ auth, products = { data: [], links: [] }, categories = [], onProductsUpdate }) {
    const [searchQuery, setSearchQuery] = useState('');
    const [selectedCategoryId, setSelectedCategoryId] = useState('');
    const [filteredProducts, setFilteredProducts] = useState(products.data);
    
    const CATEGORIES = [
        { id: '1', name: 'Electronics' },
        { id: '2', name: 'Home' },
        { id: '3', name: 'Clothing' },
        { id: '4', name: 'Kitchen' },
        { id: '5', name: 'Tech' },
       
    ];

    const fetchProducts = async () => {
        try {
            const response = await axios.get('/search', {
                params: {
                    query: searchQuery,
                    category: selectedCategoryId
                }
            });

            if (response.data && response.data.products && response.data.products.data) {
                setFilteredProducts(response.data.products.data);
                if (onProductsUpdate) onProductsUpdate(response.data.products.data); 
            } else {
                setFilteredProducts([]);
                if (onProductsUpdate) onProductsUpdate([]);
            }
        } catch (error) {
            console.error("Eroare la preluarea produselor:", error);
            setFilteredProducts([]);
            if (onProductsUpdate) onProductsUpdate([]); 
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [searchQuery, selectedCategoryId]);

    const handleCategoryChange = (e) => {
        setSelectedCategoryId(e.target.value);
        setSearchQuery('');
    };

    const [navOpen, setNavOpen] = useState(false);

    const handleToggle = () => {
        setNavOpen(!navOpen);
    };

    const { post } = useForm({});

    const submit = (e) => {
        e.preventDefault();
        post(route('logout'));
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    return (
        <header className="bg-cyan-950">
            <div className="flex container mx-auto">
                <nav className="w-full relative">
                    <div className="flex flex-wrap items-center justify-between p-4">
                        <Link href="/">
                            <ApplicationLogo className="w-10 h-10 fill-current text-white" />
                        </Link>

                        <button
                            onClick={handleToggle}
                            type="button"
                            className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-white rounded-lg md:hidden hover:bg-cyan-800"
                            aria-controls="navbar-default"
                            aria-expanded={navOpen}
                        >
                            <span className="sr-only">Open main menu</span>
                            <svg
                                className="w-5 h-5"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 17 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="M1 1h15M1 7h15M1 13h15"
                                />
                            </svg>
                        </button>
                        <div
                            id="navbar-default"
                            className={`absolute top-full left-0 right-0 md:static md:block md:w-auto ${navOpen ? 'block' : 'hidden'} z-50`}
                        >
                            <ul className="font-bold flex flex-col p-4 md:p-0 md:flex-row md:space-x-8 bg-cyan-950">
                                <li>
                                    <Link
                                        href="/"
                                        className="block py-2 px-3 text-white rounded hover:bg-cyan-800"
                                    >
                                        <i className="fa-solid fa-house mr-2"></i>Home
                                    </Link>
                                </li>
                                {auth.user ? (
                                    <>
                                        <li>
                                            <Link
                                                href={route('dashboard')}
                                                className="block py-2 px-3 text-white rounded hover:bg-cyan-800"
                                            >
                                                Dashboard
                                            </Link>
                                        </li>
                                        <li>
                                            <form onSubmit={submit}>
                                                <button
                                                    className="block w-56 py-2 px-3 mx-auto text-white rounded hover:bg-rose-700 mb-6"
                                                >
                                                    Logout <i className="fa-solid fa-arrow-right-from-bracket ml-2"></i>
                                                </button>
                                            </form>
                                        </li>
                                    </>
                                ) : (
                                    <>
                                        <li>
                                            <Link
                                                href={route('login')}
                                                className="block py-2 px-3 text-white rounded hover:bg-cyan-800"
                                            >
                                                Login
                                            </Link>
                                        </li>
                                        <li>
                                            <Link
                                                href={route('register')}
                                                className="block py-2 px-3 text-white rounded hover:bg-cyan-800"
                                            >
                                                Register
                                            </Link>
                                        </li>
                                    </>
                                )}
                            </ul>                        
                        </div>
                    </div>               
                </nav>
                <form onSubmit={handleSearch} className="mb-4 flex items-center">
                    <input 
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Search by name"
                        className="p-2 border rounded-full mr-2"
                    />
                    <select
                        onChange={handleCategoryChange}
                        className="border-2 rounded-full px-4 py-2 pr-8 bg-white text-black mr-2"
                        value={selectedCategoryId || ''}
                    >
                        <option value="">Filter by category</option>
                        {CATEGORIES.map((category) => (
                            <option key={category.id} value={category.id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                    <button type="submit" className="bg-cyan-800 mr-5 text-white p-2 rounded-full">
                        <i className="fa-solid fa-magnifying-glass py-2 px-2"></i>
                    </button>
                </form>
            </div>
        </header>
    );
}
