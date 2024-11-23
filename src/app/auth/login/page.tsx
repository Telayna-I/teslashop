import { titleFont } from "@/config/fonts";
import { LoginForm } from "./ui/LoginForm";

export default function LoginPage() {
	return (
		<div className='flex flex-col min-h-screen pt-32 sm:pt-52'>
			<h1 className={`${titleFont.className} text-4xl mb-5`}>Ingresar</h1>

			<p className='bg-gradient-to-r from-violet-600 to-indigo-600 font-bold text-white p-2 mb-5'>
				Las credenciales ya estan cargadas, solo click en ingresar.
			</p>
			<LoginForm />
		</div>
	);
}
