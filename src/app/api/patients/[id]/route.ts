import { NextRequest, NextResponse } from "next/server";
import { connectDB } from "@/utils/mongoose";
import Patient from "@/models/Patient";

interface Params {
    params: Promise<{
        id: string;
    }>
}

/**
 * GET /api/patients/:id
 * Retrieves a specific patient by ID from the database
 * @param request - NextRequest object containing the incoming request
 * @param params - Object containing route parameters, including patient ID
 * @returns NextResponse with patient data in JSON format or error message
 */
export async function GET(request: NextRequest, { params }: Params) {
    try {
        connectDB();
        const { id } = await params;
        const patient = await Patient.findById(id);

        if (!patient) return NextResponse.json({ error: "Patient not found" }, { status: 404 });        
        return NextResponse.json(patient);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json({error: message, status: 500});
    }
}


/** * PUT /api/patients/:id
 * Updates a specific patient by ID in the database
 * @param request - NextRequest object containing the incoming request with updated patient data
 * @param params - Object containing route parameters, including patient ID
 * @returns NextResponse with updated patient data or error message
 */
export async function PUT(request: NextRequest, { params }: Params) {
    try {
        const data = await request.json();
        const { id } = await params;
        const patient = await Patient.findByIdAndUpdate(id, data, { new: true });
        return NextResponse.json(patient);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json({error: message}, { status: 500 });
    }
}


/** * DELETE /api/patients/:id
 * Deletes a specific patient by ID from the database
 * @param request - NextRequest object containing the incoming request
 * @param params - Object containing route parameters, including patient ID
 * @returns NextResponse with deleted patient data or error message
 */
export async function DELETE(request: NextRequest, { params }: Params) {
    try {
        const { id } = await params;
        const patient = await Patient.findByIdAndDelete(id);

        if (!patient) return NextResponse.json({ error: "Patient not found" }, { status: 404 });
        return NextResponse.json(patient);
    } catch (error) {
        const message = error instanceof Error ? error.message : 'An error occurred';
        return NextResponse.json({error: message}, { status: 500 });
    }
}