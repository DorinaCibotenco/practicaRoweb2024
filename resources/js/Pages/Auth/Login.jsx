import Checkbox from '@/Components/Checkbox';
import GuestLayout from '@/Layouts/GuestLayout';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            <div className='mb-2 text-center text-2xl font-bold mt-7 text-teal-500 '>
                Sign in

            </div>

                <div  className=' flex justify-center space-x-6 mt-3 mb-2'>
                <div class="flex items-center justify-center"><a href=""><i class="fa-brands fa-instagram fa-2x hover:border-2 border-gray-950 p-1 rounded-full"></i></a></div>
                <div class="flex items-center justify-center"><a href=""><i class="fa-brands fa-facebook fa-2x hover:border-2 border-gray-950 p-1 rounded-full"></i></a></div>
                <div class="flex items-center justify-center"><a href=""><i class="fa-brands fa-google fa-2x hover:border-2 border-gray-950 p-1 rounded-full"></i></a></div>
                </div>
                <div className='text-center mt-2 text-gray-400 text-sm'>
                    or use your email account:
                </div>

            {status && <div className="mb-4 font-medium text-sm text-green-600">{status}</div>}


            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4 ">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="block mt-4 flex justify-between items-center">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) => setData('remember', e.target.checked)}
                        />
                        <span className="ms-2 text-sm text-gray-600  hover:text-gray-900 ">Remember me</span>
                    </label>
                    {canResetPassword && (
                    <Link
                    href={route('password.request')}
                    className="mt-2 self-end text-sm text-gray-600 hover:text-gray-900 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 hover:underline">
                       Forgot your password?
                    </Link>
                )}
                </div>

                

                <div className="flex flex-col items-center mt-4">
                <PrimaryButton className="bg-teal-500 rounded-full hover:bg-teal-700 mt-5 mb-5" disabled={processing}>
                    Sign in
                </PrimaryButton>
                </div>

                <div class="mb-6 text-center">
                   <div class="text-sm"> Don't have account?
                   <Link
                     href={route('register')}
                     className=" ml-3 text-teal-500 text-sm font-semibold hover:underline hover:text-teal-700 ">
                        Sign Up
                    </Link>
                   </div>
                </div>
            </form>
            
        </GuestLayout>
    );
}
