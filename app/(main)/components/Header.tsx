'use client';

import { CiSearch } from 'react-icons/ci';
import { RiVideoUploadLine } from 'react-icons/ri';
import { FaRegUser } from 'react-icons/fa';

import Link from 'next/link';
import Image from 'next/image';

import { useAuth } from '@/contexts/AuthContext';

const Header: React.FC = () => {
	const { user } = useAuth();

	return (
		<div className='shadow-lg'>
			<header className='flex items-center justify-between p-4 bg-white max-w-screen-xl w-full mx-auto'>
				{/* Logo */}
				<Link href='/'>
					<div className='flex items-center'>
						<Image
							src='lavela.svg'
							alt='Lavela logo'
							className='h-16 w-auto object-cover'
							width={20}
							height={20}
						/>
					</div>
				</Link>

				{/* Search Bar */}
				<div className='hidden md:block md:flex-1 mx-4 max-w-screen-sm'>
					<form className='flex'>
						<input
							type='text'
							placeholder='Search'
							className='w-full px-4 py-2 border border-gray-300 rounded-l-full focus:outline-none focus:ring-2 focus:ring-blue-500'
						/>
						<button
							type='submit'
							className='px-4 py-2 bg-blue-500 text-white rounded-r-full hover:bg-blue-600'
						>
							<CiSearch className='h-5 w-5' />
						</button>
					</form>
				</div>

				{/* User Actions */}
				<div className='flex items-center space-x-4'>
					<Link href='/upload'>
						<div className='flex items-center px-3 py-2 bg-red-600 text-white rounded-full hover:bg-red-700'>
							<RiVideoUploadLine className='h-5 w-5' />
						</div>
					</Link>
					{user ? (
						<div className='flex items-center space-x-2'>
							<Image
								src='/images/default-avatar.png'
								alt='User Avatar'
								className='h-8 w-8 rounded-full'
								width={10}
								height={10}
							/>
							<span>User</span>
						</div>
					) : (
						<Link href='/signin'>
							<div className='flex items-center px-3 py-2 bg-blue-500 text-white rounded-full hover:bg-blue-600'>
								<FaRegUser className='h-5 w-5' />
								<span className='ml-2'>Sign In</span>
							</div>
						</Link>
					)}
				</div>
			</header>
		</div>
	);
};

export default Header;
