import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link, useForm} from '@inertiajs/react';
import {Fragment} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faPencil, faPlus, faTrash} from "@fortawesome/free-solid-svg-icons";


export default function List({categories}) {
    const {delete: deleteCategory} = useForm({});

    // const handleDelete = (id) => {
    //     console.log(id);
    //
    //     deleteCategory(route('categories.delete', [id]));
    // }

    return (
        <AuthenticatedLayout>
            <Head title="Category list"/>
            <div className="w-full">
                <div className="py-4 px-4">
                    <div className={'text-xl font-bold'}>Categories</div>

                    <div className={'flex justify-end my-2'}>
                        <Link href={route('categories.create')} className='border-2 rounded-lg border-green-500 py-2 px-2 font-bold text-white bg-green-500'>
                            <FontAwesomeIcon icon={faPlus} /> Add new category
                        </Link>
                    </div>


                    <div className="mt-6 py-4 px-2 bg-stone-300 shadow-lg bg-zinc-100 mb-2">
                        <div className={'grid grid-cols-4'}>
                            <div className={'font-bold mb-3'}>ID</div>
                            <div className={'font-bold mb-3'}>Name</div>
                            <div className={'font-bold mb-3'}>Order</div>
                            <div className={'font-bold mb-3'}>Actions</div>

                            {categories.map((category, index) => {
                                return <Fragment key={index}>
                                    <div className={'mb-2 py-2 px-2 bg-zinc-50'}>{category.id}</div>
                                    <div className={'mb-2 bg-zinc-50'}>{category.name}</div>
                                    <div className={'mb-2 bg-zinc-50'}>{category.order}</div>
                                    <div className={'mb-2 bg-zinc-50'}>
                                        <Link href={route('categories.update', [category.id])} className="rounded-lg py-1 px-2">
                                            <FontAwesomeIcon  icon={faPencil} className={'text-green-500'}/>
                                        </Link>

                                        {/*TODO as form*/}
                                        {/*<Link className={"ml-2"} onClick={() => handleDelete(category.id)}>*/}
                                        {/*    <FontAwesomeIcon icon={faTrash} className={'text-red-600'}/>*/}
                                        {/*</Link>*/}
                                    </div>
                                </Fragment>
                            })}
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}