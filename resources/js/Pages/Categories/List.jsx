import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link,router, useForm} from '@inertiajs/react';
import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";




export default function List({categories}) {
    const {delete: deleteCategory} = useForm({});

     const handleDelete = (id) => {
        console.log(id);
    
      deleteCategory(route('categories.delete', [id]));
     }

    const handlePageChange = (url) => {
        if (url) {
            router.get(url, { preserveState: true });
        }
    };

    const category = categories?.data || [];

    return (
        <AuthenticatedLayout>
            <Head title="Category list"/>
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold bg-white px-10 py-6 rounded-lg'}>Categories</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('categories.create')} className='border-2 rounded-lg border-green-500 py-2 px-2 font-bold text-white bg-green-500 hover:bg-green-400'>
                            <FontAwesomeIcon icon={faPlus} /> Add new category
                        </Link>
                    </div>


                    <div className="mt-6 py-4 px-2 bg-stone-300 shadow-lg rounded-lg bg-zinc-100 mb-2">
                        <div className={'grid grid-cols-4'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Order</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {categories.data.map((category, index) => {
                                return <Fragment key={index}>
                                    <div className={'mb-2 py-2 px-2 bg-zinc-50'}>{category.id}</div>
                                    <div className={'mb-2 bg-zinc-50'}>{category.name}</div>
                                    <div className={'mb-2 bg-zinc-50'}>{category.order}</div>
                                    <div className={'mb-2 bg-zinc-50'}>
                                        <Link href={route('categories.update', [category.id])} className="rounded-lg py-1 px-2">
                                            <FontAwesomeIcon  icon={faPencil} className={'text-green-500'}/>
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
                            onClick={() => router.get(categories.prev_page_url)}
                            disabled={!categories.prev_page_url}
                            className="border-2 rounded-full px-4 py-2 text-white bg-cyan-950 hover:bg-cyan-800"
                        >
                            <i class="fa-solid fa-chevron-left"></i>
                        </button>
                        <button
                            onClick={() => router.get(categories.next_page_url)}
                            disabled={!categories.next_page_url}
                            className="border-2 rounded-full px-4 py-2 text-white bg-cyan-950 hover:bg-cyan-800"
                        >
                            <i class="fa-solid fa-chevron-right"></i>
                        </button>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}