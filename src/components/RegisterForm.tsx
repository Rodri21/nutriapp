import Link from "next/link";
import { useState } from "react";
import { registerSchema } from "@/lib/schemas";

function RegisterForm() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // Limpiar errores cuando el usuario empiece a escribir
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        
        // Validar con Zod
        const result = registerSchema.safeParse(credentials);
        if (!result.success) {
            const newErrors: { [key: string]: string } = {};
            result.error.issues.forEach(issue => {
                if (issue.path[0]) {
                    newErrors[issue.path[0] as string] = issue.message;
                }
            });
            setErrors(newErrors);
            return;
        }
        
        // Aquí harías la llamada a la API
        console.log("Form submitted: ", result.data);
    }
    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Create Account</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                            errors.email ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition duration-200 ${
                            errors.password ? 'border-red-500' : 'border-gray-300'
                        }`}
                        required
                    />
                    {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
                </div>
                <button 
                    type="submit"
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    Register
                </button>
                <Link href="/" className="text-blue-600 hover:text-blue-700 font-medium transition duration-200 text-center block">Login</Link>
            </form>
        </div>
    );
}

export default RegisterForm;