'use client'

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Layout from '../components/Layout';

interface User {
  id: number;
  name: string;
  albumsCount: number;
}


const Home: React.FC = () => {
	const [users, setUsers] = useState<User[]>([]);
	const router = useRouter();

	useEffect(() => {
		// Fetch users and albums data
		const fetchData = async () => {
			try {
				const response = await fetch('https://jsonplaceholder.typicode.com/users');
				const usersData = await response.json();

				// Fetch albums for each user
				const usersWithAlbums = await Promise.all(usersData.map(async (user: User) => {
					const albumsResponse = await fetch(`https://jsonplaceholder.typicode.com/users/${user.id}/albums`);
					const albumsData = await albumsResponse.json();
					user.albumsCount = albumsData.length;
					return user;
				}));

				setUsers(usersWithAlbums);
			} catch (error) {
				console.error('Error fetching data:', error);
			}
		};

		fetchData();
	}, []);

  return (
	<Layout>
		<div className="mx-4 md:mx-12">
			<h2 className="mt-4 text-2xl font-bold">Users and Albums</h2>
			<table className="table-auto my-4 mx-4 bg-white rounded-md border-collapse">
				<thead className='px-4'>
					<tr>
						<th className="px-4 py-2 text-left">User</th>
						<th className="px-4 py-2 text-left">No. of Albums</th>
					</tr>
				</thead>
				<tbody>
					{users.map((user) => (
						<tr key={user.id} onClick={() => router.push(`/users/${user.id}`)} className={user.id % 2 === 0 ? "bg-gray-100 cursor-pointer" : "bg-white cursor-pointer"}>
							<td className="border px-4 py-2">{user.name}</td>
							<td className="border px-4 py-2">{user.albumsCount}</td>
						</tr>

					))}
				</tbody>
			</table>
      	</div>
    </Layout>
  );
};

export default Home;
