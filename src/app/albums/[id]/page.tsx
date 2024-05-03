'use client'

import { usePathname, useRouter } from 'next/navigation';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '@/app/firebase/config';
import Layout from '@/app/components/Layout';
import { useEffect, useState } from "react";
import PhotoCard from '@/app/components/PhotoCard';

interface Album {
  userId: number;
  id: number;
  title: string;
}

interface Photo {
  	albumId: number;
  	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}


const AlbumPage: React.FC  = () => {
	const pathname = usePathname()
	const albumId = parseInt(pathname.split('/')[2]);
	const [album, setAlbum] = useState<Album | null>(null);
	const [photos, setPhotos] = useState<Photo[] | null>(null);
	const router = useRouter();

	onAuthStateChanged(auth, (authenticatedUser) => {
		if (!authenticatedUser) {
			return router.push('/');
		}
	});


	useEffect(() => {
        const fetchData = async () => {
            try {
                if (albumId) {
                    const albumDataRes = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}`);
                    const albumData = await albumDataRes.json();

                    const photosDataRes = await fetch(`https://jsonplaceholder.typicode.com/albums/${albumId}/photos`);
                    const photosData = await photosDataRes.json();

                    setAlbum(albumData);
                    setPhotos(photosData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [albumId]);

	console.log(photos);

	if (!album || !photos) {
		return (
			<Layout>
				<div className="text-center">Loading...</div>
			</Layout>
		);
	}
	return (
		<Layout>
			<h1 className="text-lg font-bold my-4 text-center ">{album?.title} Photo Album</h1>
			<div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-4 mx-4">
				{photos.length > 0 ? (
					photos.map((photo) => (
						<PhotoCard key={photo.id} image={photo}/>
					))
				) : (
					<p className="text-red-400">Album currently has no photos</p>
				)}
			</div>
		</Layout>
	)
}

export default AlbumPage;