"use client";

import Link from "next/link";

import {
	IoCloseOutline,
	IoLogInOutline,
	IoLogOutOutline,
	IoPeopleOutline,
	IoPersonOutline,
	IoSearchOutline,
	IoShirtOutline,
	IoTicketOutline,
} from "react-icons/io5";

import { useUIStore } from "@/store";
import clsx from "clsx";

export const Sidebar = () => {
	const isSideMenuOpen = useUIStore((state) => state.isSideMenuOpen);
	const closeMenu = useUIStore((state) => state.closeSideMenu);

	return (
		<div>
			{isSideMenuOpen && (
				<div className='fixed top-0 left-0 h-screen w-screen z-10 bg-black opacity-30' />
			)}
			{/* Background black */}

			{/* Blur */}
			{isSideMenuOpen && (
				<div
					onClick={closeMenu}
					className='fade-in fixed top-0 left-0 h-screen w-screen z-10 backdrop-filter backdrop-blur-sm'
				/>
			)}

			{/* Sidemenu */}
			<nav
				className={clsx(
					"fixed p-5 right-0 top-0 w-[300px] h-screen bg-white z-20 shadow-2xl transform transition-all duration-300",
					{ "translate-x-full": !isSideMenuOpen }
				)}>
				<IoCloseOutline
					size={30}
					className='absolute top-5 right-5 cursor-pointer'
					onClick={() => closeMenu()}
				/>

				{/* Input */}
				<div className='relative mt-14 '>
					<IoSearchOutline size={20} className='absolute top-1 left-2' />
					<input
						type='text'
						name=''
						id=''
						placeholder='Buscar'
						className='w-full bg-gray-50 rounded pl-10 py-1 pr-10 border-b-2 text-sm border-gray-200 focus:outline-none focus:border-blue-500'
					/>
				</div>

				<Link
					href={"/"}
					className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '>
					<IoPersonOutline size={22} />
					<span className='ml-3'>Perfil</span>
				</Link>

				<Link
					href={"/"}
					className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '>
					<IoTicketOutline size={22} />
					<span className='ml-3'>Ordenes</span>
				</Link>

				<Link
					href={"/"}
					className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '>
					<IoLogInOutline size={22} />
					<span className='ml-3'>Ingresar</span>
				</Link>

				<Link
					href={"/"}
					className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '>
					<IoLogOutOutline size={22} />
					<span className='ml-3'>Salir</span>
				</Link>

				<div className='w-full h-px  bg-gray-200 my-10' />
				<Link
					href={"/"}
					className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '>
					<IoShirtOutline size={22} />
					<span className='ml-3'>Productos</span>
				</Link>
				<Link
					href={"/"}
					className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '>
					<IoTicketOutline size={22} />
					<span className='ml-3'>Ordenes</span>
				</Link>
				<Link
					href={"/"}
					className='flex items-center mt-10 p-2 hover:bg-gray-100 rounded transition-all '>
					<IoPeopleOutline size={22} />
					<span className='ml-3'>Usuarios</span>
				</Link>
			</nav>
		</div>
	);
};
