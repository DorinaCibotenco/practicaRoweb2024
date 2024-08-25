import { useState } from 'react';
import ApplicationLogo from '@/Components/ApplicationLogo';
import Dropdown from '@/Components/Dropdown';
import NavLink from '@/Components/NavLink';
import ResponsiveNavLink from '@/Components/ResponsiveNavLink';
import { Link } from '@inertiajs/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faBox } from '@fortawesome/free-solid-svg-icons';

export default function Authenticated({ user, header, children }) {
    const [showingNavigationDropdown, setShowingNavigationDropdown] = useState(false);

    const userName = user?.name || 'Guest';
    const userEmail = user?.email || '';

    return (
        <div className="min-h-screen flex bg-zinc-200">
            <nav className="w-64 bg-zinc-300 border-r border-zinc-100 min-h-screen p-4">
                <div className="flex flex-col h-full">
                    <div className="flex items-center mb-4">
                        <Link href="/">
                        <FontAwesomeIcon icon={faHome} className="text-white rounded-full bg-cyan-950 hover:bg-cyan-800 text-2xl py-3 px-3 mb-5 mr-2" />

                        </Link>
                    </div>
                    <Link
                        href={route('dashboard')}
                        className="py-3 px-4 text-white text-bold bg-cyan-950 rounded-lg hover:bg-cyan-800 mb-2"
                    >
                        <i className="fa-solid fa-table-columns pr-3"></i>
                        Dashboard
                    </Link>
                    <Link
                        href={route('categories.list')}
                        className="py-2 px-4 text-black hover:text-zinc-600 mb-2 mt-7"
                    >
                        <i className="fa-solid fa-list pr-3"></i>
                        Categories
                    </Link>
                    <Link
                        href={route('products.list')}
                        className="py-2 px-4 text-black hover:text-zinc-600 mb-2"
                    >
                        <i className="fa-solid fa-box pr-3"></i>
                        Products
                    </Link>

                    <div className="mt-auto">
                        <div className="relative">
                            <Dropdown>
                                <Dropdown.Trigger>
                                    <span className="inline-flex rounded-md">
                                        <button
                                            type="button"
                                            className="inline-flex items-center px-3 py-2 border border-transparent text-sm leading-4 font-medium rounded-md text-gray-500 bg-white hover:text-gray-700 focus:outline-none transition ease-in-out duration-150"
                                        >
                                            {userName}

                                            <svg
                                                className="ms-2 -me-0.5 h-4 w-4"
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 20 20"
                                                fill="currentColor"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </span>
                                </Dropdown.Trigger>

                                <Dropdown.Content>
                                    <Dropdown.Link href={route('profile.edit')}>Profile</Dropdown.Link>
                                    <Dropdown.Link href={route('logout')} method="post" as="button">
                                        Log Out
                                    </Dropdown.Link>
                                </Dropdown.Content>
                            </Dropdown>
                        </div>
                    </div>
                </div>
            </nav>

            <div className="flex-1">
                {header && (
                    <header className="bg-white shadow">
                        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">{header}</div>
                    </header>
                )}

                <main>{children}</main>
            </div>
        </div>
    );
}
