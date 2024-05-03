import React from 'react';

import {  signOut, onAuthStateChanged } from "firebase/auth";
import { auth } from '@/app/firebase/config';
import { useRouter } from 'next/navigation';
import Link from 'next/link';



interface LayoutProps {
  children: React.ReactNode;
}

const year = new Date().getFullYear();

const Layout: React.FC<LayoutProps> = ({ children }) => {
  const router = useRouter();

  onAuthStateChanged(auth, (authenticatedUser) => {
		if (!authenticatedUser) {
			return router.push('/');
		}
  });

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };


  return (
    <div className="flex flex-col min-h-screen">
      <header className="flex flex-row  justify-between bg-indigo-600 px-8 py-4">
        <Link href="/home">
          <h1 className="text-white text-xl font-bold">User Albums and Photos</h1>
        </Link>
        <button onClick={handleLogout} className='bg-white text-black/70 rounded-md px-4 py-2 hover:bg-slate-500'>Logout</button>
      </header>
      <main className="flex-grow">{children}</main>
      <footer className="bg-indigo-600 text-white p-4 text-center">
        &copy; {year} Made with ❤️
      </footer>
    </div>
  );
};

export default Layout;
