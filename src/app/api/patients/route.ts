import { NextRequest, NextResponse } from 'next/server';
import { connectDB } from '@/utils/mongoose';
import Patient from '@/models/Patient';
import { patientSchema } from '@/lib/schemas';

/**
 * GET /api/patients
 * Retrieves all patients from the database
 * @param request - NextRequest object containing the incoming request
 * @returns NextResponse with array of all patients in JSON format
 */
export async function GET(request: NextRequest) {
  await connectDB();
  const patients = await Patient.find();

  return NextResponse.json(patients);
}

/**
 * POST /api/patients
 * Creates a new patient record in the database
 * @param request - NextRequest object containing the incoming request with patient data
 * @returns NextResponse with created patient data or error message
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar con Zod
    const validationResult = patientSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0]?.message || 'Datos inválidos' },
        { status: 400 }
      );
    }
    
    await connectDB();
    const patient = new Patient(validationResult.data);
    const savedPatient = await patient.save();
    console.log(savedPatient);

    return NextResponse.json(savedPatient);
  } catch (error) {
    const message = error instanceof Error ? error.message : 'An error occurred';
    return NextResponse.json({ error: message }, { status: 400 });
  }
}