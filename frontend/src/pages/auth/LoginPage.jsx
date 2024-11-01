import { Link } from "react-router-dom";
import LoginForm from "../../components/auth/LoginForm";

const LoginPage = () => {
	return (
		<div className="w-full max-w-sm mx-auto p-6 bg-secondary rounded-lg shadow-lg text-center mt-20">
			<h2 className="text-3xl font-bold text-white mb-6">Sign in to your account</h2>

			{/* Login Form */}
			<LoginForm />

			{/* Divider */}
			<div className="relative mt-6 bg-red">
				<div className="absolute inset-0 flex items-center">
					<div className="w-full border-t border-gray-700"></div>
				</div>
				<div className="py-5"></div>
				<div className="relative bg-transparent px-3 text-info text-sm">New to UltimateDuty?</div>
			</div>

			{/* Join Now Button */}
			<Link
				to="/signup"
				className="mt-4 inline-block w-full py-2 px-4 bg-primary hover:bg-primary-dark text-white font-medium rounded transition"
			>
				Join now
			</Link>
		</div>
	);
};

export default LoginPage;
