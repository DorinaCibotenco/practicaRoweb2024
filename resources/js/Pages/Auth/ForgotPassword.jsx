import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function ForgotPassword({ status }) {
    const { data, setData, post, processing, errors } = useForm({
        email: '',
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('password.email'));
    };

    return (
        <GuestLayout>
            <Head title="Forgot Password" />

            <div className="mb-4 text-sm text-gray-600">
            If you've forgotten your password, don't worry. 
            Simply provide your email address, and we'll send you a link to reset your password and choose a new one.
            </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}

            <form onSubmit={submit}>
                <TextInput
                    id="email"
                    type="email"
                    name="email"
                    value={data.email}
                    className="mt-1 block w-full"
                    isFocused={true}
                    onChange={(e) => setData('email', e.target.value)}
                />

                <InputError message={errors.email} className="mt-2" />

                <div className="flex items-center mt-4 space-x-20">
                <Link 
                href={route('login')}
                className=" mr-9 text-gray-400 text-sm text-start hover:underline hover:text-gray-500">
                       Sign In
                    </Link>
                    <PrimaryButton className="ms-4 bg-teal-500 hover:bg-teal-700" disabled={processing}>
                        Email Password Reset Link
                    </PrimaryButton>
                </div>    
            </form>
        </GuestLayout>
    );
}
