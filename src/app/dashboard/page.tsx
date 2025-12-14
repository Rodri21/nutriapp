"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import PatientTable from '@/components/PatientTable';
import LogoutButton from '@/components/LogoutButton';
import { useAuth } from '@/hooks/useAuth';

export default function Dashboard() {
  const { user, isAuthenticated, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return; // Aún cargando

    if (!isAuthenticated) {
      router.push("/login");
    }
  }, [isAuthenticated, isLoading, router]);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Cargando...</p>
        </div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return null; // o podrías mostrar un mensaje de "no autenticado"
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header con información del usuario */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-6">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
              <p className="text-gray-600">Bienvenido, {user?.name || user?.email}</p>
            </div>
            <LogoutButton />
          </div>
        </div>
      </header>

      {/* Contenido principal */}
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <div className="px-4 py-6 sm:px-0">
          <div className="border-4 border-dashed border-gray-200 rounded-lg p-6">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">Pacientes</h2>
            {/* Aquí puedes agregar PatientTable cuando esté listo para usar con datos dinámicos */}
            <p className="text-gray-600">
              Lista de pacientes aparecerá aquí.
            </p>
            {/* <PatientTable patients={[]} /> */}
          </div>
        </div>
      </main>
    </div>
  );
}