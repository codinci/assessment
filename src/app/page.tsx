'use client'
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import { signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { useRouter } from 'next/navigation';
import { auth } from './firebase/config';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';


const LandingPage = () => {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [signInWithEmailAndPassword] = useSignInWithEmailAndPassword(auth);
  const router = useRouter();

  const provider = new GoogleAuthProvider();


  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value);
  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		try {
			const res = await signInWithEmailAndPassword(email, password);
			console.log(res);

			setEmail('')
      setPassword('')
      router.push('/home')
		} catch (err) {
			console.error(err);
		}
  };

  const handleGoogleSignIn = async (e: React.MouseEvent<HTMLButtonElement>) => {
    try {
      const res = await signInWithPopup(auth, provider);
      console.log(res);

      router.push('/home')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <main className="bg-gray-100 min-h-screen flex flex-col justify-center items-center">
      <div className="max-w-md w-full p-6 bg-white shadow-md rounded-md">
        <h2 className="text-2xl font-bold mb-4">Welcome to our Photo Storage Web App</h2>
        <p className="text-gray-600 mb-4">Store and organize your photos securely online.</p>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <div className="mt-1">
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={email}
                onChange={handleEmailChange}
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">
              Password
            </label>
            <div className="mt-1">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                className="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-md font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Sign In
            </button>
          </div>
        </form>

        <div className="mt-6">
          <p className="text-center text-md text-gray-600">
              Do not have an account?{' '}
            <Link href="/sign-up" className="font-medium text-indigo-600 hover:text-indigo-500">
              Sign up
            </Link>
          </p>
          <p className="my-4 text-center text-gray-600">Or</p>
          <button
            type="button"
            onClick={handleGoogleSignIn} 
            className="w-full flex justify-center py-2 px-4 border border-1 border-black rounded-md shadow-sm text-md font-medium text-black/70 bg-white/70 "
          >
            <Image
              src="/google.png"
              className='mx-4'
              width={25}
              height={25}
              alt="Google Logo"
            />
            <span className="">Sign in with Google</span>
          </button>
        </div>
      </div>
    </main>
  );
}

export default LandingPage;
