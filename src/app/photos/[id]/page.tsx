'use client'

import { usePathname, useRouter } from 'next/navigation';
import {  onAuthStateChanged } from "firebase/auth";
import { auth } from '@/app/firebase/config';
import Layout from '@/app/components/Layout';
import { useEffect, useState } from "react";
import Image from 'next/image';


interface Photo {
  	albumId: number;
  	id: number;
	title: string;
	url: string;
	thumbnailUrl: string;
}

const PhotoPage: React.FC = () => {
	const pathname = usePathname()
	const photoId = parseInt(pathname.split('/')[2]);
	const [photo, setPhoto] = useState<Photo | null>(null);
	const [newTitle, setNewTitle] = useState('');

	const router = useRouter();

	onAuthStateChanged(auth, (authenticatedUser) => {
		if (!authenticatedUser) {
			return router.push('/');
		}
	});

	useEffect(() => {
        const fetchData = async () => {
            try {
                if (photoId) {
                    const res = await fetch(`https://jsonplaceholder.typicode.com/photos/${photoId}`);
                    const photoData = await res.json();

                    setPhoto(photoData);
                }
            } catch (error) {
                console.error(error);
            }
        };

        fetchData();
    }, [photoId]);

	console.log(photo);

	if (!photo ) {
		return (
			<Layout>
				<div className="text-center">Loading...</div>
			</Layout>
		);
	}


	const handleUpdateTitle = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/photos/1', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          title: newTitle,
        }),
      });

      if (response.ok) {
        console.log('Title updated successfully');

      } else {
        console.error('Failed to update title');

      }
    } catch (error) {
      console.error('Error:', error);

    }
  };


	return (
		<Layout>
			<div className='flex flex-col justify-center items-center'>
				<h1>{photo.title}</h1>
				<Image
					src='/image.jpg'
					className='m-4'
					width={215}
					height={215}
					alt={photo.title}
				/>

				<div className="m-4">
					<input
						type="text"
						className='p-4 rounded-md border-1 border-black/70'
						value={newTitle}
						onChange={(e) => setNewTitle(e.target.value)}
						placeholder={photo.title}
					/>
					<button className='mx-2 p-4 rounded-md text-white bg-sky-400  hover:bg-sky-600' onClick={handleUpdateTitle}>Update Title</button>
				</div>
			</div>
		</Layout>

	)

}
export default PhotoPage;