import { Patient } from '../models/types/patient';

interface PatientTableProps {
  patients: Patient[];
}

export default function PatientTable({ patients }: PatientTableProps) {
  
  if (!patients || patients.length === 0) {
    return (
      <div className="mt-16 w-full">
        <p className="text-center text-gray-500">No hay pacientes para mostrar</p>
      </div>
    );
  }

  return (
    <table className="mt-16 w-full border-collapse">
      <thead>
        <tr>
          <th className="py-2 text-left border-b-2 border-gray-200">Paciente</th>
          <th className="py-2 text-left border-b-2 border-gray-200">Edad</th>
          <th className="py-2 text-left border-b-2 border-gray-200">Género</th>
        </tr>
      </thead>
      <tbody>
        {patients.map((patient: Patient) => (
          <tr key={patient._id} className="border-t hover:bg-gray-50 transition-colors">
            <td className="py-3 px-2 font-medium">{patient.name}</td>
            <td className="py-3 px-2">{patient.age}</td>
            <td className="py-3 px-2">{patient.gender}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}