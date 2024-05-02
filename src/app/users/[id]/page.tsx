'use client'

import { usePathname, useRouter } from 'next/navigation';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '@/app/firebase/config';
import Layout from '@/app/components/Layout';
import { useEffect, useState } from "react";

interface User {
  id: number;
  name: string;
}

interface Album {
  userId: number;
  id: number;
  title: string;
}


const UserPage: React.FC  = () => {
	const pathname = usePathname()
	const userId = parseInt(pathname.split('/')[2]);
	const [user, setUser] = useState<User | null>(null);
	const [albums, setAlbums] = useState<Album[] | null>(null);
	const router = useRouter();

	onAuthStateChanged(auth, (authenticatedUser) => {
		if (!authenticatedUser) {
			return router.push('/');
		}
	});


	useEffect(() => {
        const fetchData = async () => {
            try {
                if (userId) {
                    const userDataRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`);
                    const userData = await userDataRes.json();

                    const albumsDataRes = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}/albums`);
                    const albumsData = await albumsDataRes.json();

                    setUser(userData);
                    setAlbums(albumsData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [userId]);

	if (!user || !albums) {
		return (
			<Layout>
				<div className="text-center">Loading...</div>
			</Layout>
		);
	}
	return (
		<Layout>
			<h1 className="text-lg font-bold my-4 text-center ">{user?.name} Photo Albums</h1>
			<ul className="space-y-2 mb-4">
				{albums.length > 0 ? (
					albums.map((album) => (
						<li
							key={album.id}
							onClick={() => router.push(`/albums/${album.id}`)}
							className="bg-white rounded-md shadow-md p-4 mx-4 transition-colors duration-300 hover:bg-sky-500 hover:text-white cursor-pointer"
						>
							<p className="text-md text-center font-semibold">{album.title}</p>
						</li>
					))
				) : (
					<p className="text-red-400">User currently has no albums</p>
				)}
			</ul>
		</Layout>
	)
}

export default UserPage;