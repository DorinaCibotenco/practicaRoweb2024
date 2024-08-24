import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, router, useForm} from '@inertiajs/react';
import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';


export default function List({products, categories = [], selectedCategoryId }) {
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

    const handleCategoryChange = (e) => {
        const category = e.target.value;
        router.get(route('products.list'), { category }, { preserveState: true });
    };

    const categoryMap = categories.reduce((acc, category) => {
        acc[category.id] = category.name;
        return acc;
    }, {});


    return (
        <AuthenticatedLayout>
            <Head title="Product list"/>
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold bg-white px-10 py-6 rounded-lg'}>Products</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('products.create')} className='border-2 rounded-lg border-green-500 py-2 px-2 font-bold text-white bg-green-500 hover:bg-green-400'>
                            <FontAwesomeIcon icon={faPlus}/> Add new product
                        </Link>
                    </div>

                    <div className="relative inline-block text-left">
                        <select
                            onChange={handleCategoryChange}
                            className="border-2 rounded-md px-4 py-2 pr-8 bg-white text-black "
                            value={selectedCategoryId || ''}
                        >
                            <option value="">All Categories</option>
                            {categories.map((category) => (
                                <option key={category.id} value={category.id}>
                                    {category.name}
                                </option>
                            ))}
                        </select>
                    </div>




                    <div className="mt-6 py-4 px-2 bg-stone-300 shadow-lg rounded-lg bg-zinc-100 mb-2">
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
                                    <div className={'mb-2 bg-zinc-50'}> {product.category_id ? categoryMap[product.category_id] : 'No Category'}</div>
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
                            className="border-2 rounded-full px-4 py-2 text-white bg-violet-700 hover:bg-violet-600"
                        >
                            <i className="fa-solid fa-chevron-left"></i>
                        </button>
                        <button
                            onClick={() => router.get(products.next_page_url)}
                            disabled={!products.next_page_url}
                            className="border-2 rounded-full px-4 py-2 text-white bg-violet-700 hover:bg-violet-600"
                        >
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>

                </div>
            </div>
        </AuthenticatedLayout>
    );
}