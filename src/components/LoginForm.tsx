"use client";
import Link from "next/link";
import { ChangeEvent, FormEvent, useState } from "react";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { loginSchema } from "@/lib/schemas";

function LoginForm() {
    const [credentials, setCredentials] = useState({ email: "", password: "" });
    const [errors, setErrors] = useState<{ [key: string]: string }>({});
    const [isLoading, setIsLoading] = useState(false);
    const router = useRouter();

    const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
        setCredentials({ ...credentials, [e.target.name]: e.target.value });
        // Limpiar errores cuando el usuario empiece a escribir
        if (errors[e.target.name]) {
            setErrors({ ...errors, [e.target.name]: "" });
        }
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setErrors({});
        setIsLoading(true);
        
        // Validar con Zod
        const result = loginSchema.safeParse(credentials);
        if (!result.success) {
            const newErrors: { [key: string]: string } = {};
            result.error.issues.forEach(issue => {
                if (issue.path[0]) {
                    newErrors[issue.path[0] as string] = issue.message;
                }
            });
            setErrors(newErrors);
            setIsLoading(false);
            return;
        }

        try {
            const response = await signIn("credentials", {
                email: credentials.email,
                password: credentials.password,
                redirect: false,
            });

            if (response?.error) {
                setErrors({ general: "Credenciales inválidas" });
            } else if (response?.ok) {
                // Verificar la sesión y redirigir
                const session = await getSession();
                if (session) {
                    router.push("/dashboard");
                }
            }
        } catch (error) {
            console.error("Error en login:", error);
            setErrors({ general: "Error al iniciar sesión" });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="max-w-md mx-auto mt-8 p-6 bg-white rounded-lg shadow-lg">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Welcome Back</h2>
            
            {errors.general && (
                <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg">
                    {errors.general}
                </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <input 
                        type="email" 
                        name="email" 
                        placeholder="Email" 
                        value={credentials.email}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition duration-200 ${
                            errors.email ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        disabled={isLoading}
                        required
                    />
                    {errors.email && (
                        <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                    )}
                </div>
                <div>
                    <input 
                        type="password" 
                        name="password" 
                        placeholder="Password" 
                        value={credentials.password}
                        onChange={handleChange}
                        className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:border-transparent outline-none transition duration-200 ${
                            errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-blue-500'
                        }`}
                        disabled={isLoading}
                        required
                    />
                    {errors.password && (
                        <p className="mt-1 text-sm text-red-600">{errors.password}</p>
                    )}
                </div>
                <button 
                    type="submit"
                    disabled={isLoading}
                    className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed text-white font-semibold py-2 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                >
                    {isLoading ? "Iniciando sesión..." : "Login"}
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