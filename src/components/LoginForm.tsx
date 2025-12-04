"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";

function LoginForm() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => setCredentials({ ...credentials, [e.target.name]: e.target.value });

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted: ", credentials);

        fetch('api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(credentials),
        })
        .then(response => response.json())
        .then(data => {
            console.log('Success:', data);
        })
    }

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                        required
                    />
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange}
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200"
                        required
                    />
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Login
                </button>
                <div className="text-center mt-4">
                    <p className="text-gray-600">Don't have an account?</p>
                    <Link 
                        href="/register" 
                        className="text-blue-600 hover:text-blue-700 font-medium transition duration-200"
                    >
                        Create one here
                    </Link>
                </div>
            </form>
        </div>
    );
}   
  
export default LoginForm;