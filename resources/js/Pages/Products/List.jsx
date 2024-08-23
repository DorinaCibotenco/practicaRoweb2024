import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function List({products}) {
    const {delete: deleteEntry} = useForm({});

    const handleDelete = (id) => {
        deleteEntry(route('products.delete', [id]), {
            onFinish: () => {
                router.reload({only: ['products']});
            },
        });
    };

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, { preserveState: true });
        }
    };

    return (
        <AuthenticatedLayout>
            <Head title="Product list"/>
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Products</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('products.create')} className='border-2 rounded-lg border-green-500 py-2 px-2 font-bold text-white bg-green-500 hover:bg-green-400'>
                            <FontAwesomeIcon icon={faPlus}/> Add new product
                        </Link>
                    </div>

                    <div className="relative inline-block text-left">
        <div>
        <button id="dropdownButton" className="border-2 text-blue px-4 py-2 rounded-md flex items-center space-x-2 bg-blue">
        <i className="fa-solid fa-caret-down"></i>
                <span>Filter by category</span>
            </button>
        </div>

    </div>


                    <div className="mt-6 py-4 px-2 bg-stone-300 shadow-lg bg-zinc-100 mb-2">
                        <div className={'grid grid-cols-5'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Category</div>
                            <div className={'font-bold mb-3'}>Price</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {products.data.map((product, index) => {
                                return <Fragment key={index}>
                                    <div className={'mb-2 py-2 px-2 bg-zinc-50'}>{product.id}</div>
                                    <div className={'mb-2 bg-zinc-50'}>{product.name}</div>
                                    <div className={'mb-2 bg-zinc-50'}>{product.category.name}</div>
                                    <div className={'mb-2 bg-zinc-50'}>{product.price}</div>
                                    <div className={'mb-2 bg-zinc-50'}>
                                        <Link href={route('products.update', [product.id])}>
                                            <FontAwesomeIcon icon={faPencil} className={'text-green-500'}/>
                                        </Link>

                                        <Link className={"ml-2"} onClick={() => handleDelete(product.id)}>
                                            <FontAwesomeIcon icon={faTrash} className={'text-red-600'}/>
                                        </Link>
                                    </div>
                                </Fragment>
                            })}
                        </div>
                    </div>
                    <div className="flex justify-center items-center mt-4 space-x-4">
                        <button
                            onClick={() => router.get(products.prev_page_url)}
                            disabled={!products.prev_page_url}
                            className="border-2 rounded-full px-4 py-2 text-white bg-slate-700 hover:bg-slate-600"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button
                            onClick={() => router.get(products.next_page_url)}
                            disabled={!products.next_page_url}
                            className="border-2 rounded-full px-4 py-2 text-white bg-slate-700 hover:bg-slate-600"
                        >
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}