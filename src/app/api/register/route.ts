import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import { connectDB } from '@/utils/mongoose';
import User from '@/models/User';
import { registerSchema } from '@/lib/schemas';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validar con Zod
    const validationResult = registerSchema.safeParse(body);
    if (!validationResult.success) {
      return NextResponse.json(
        { error: validationResult.error.issues[0]?.message || 'Datos inválidos' },
        { status: 400 }
      );
    }
    
    const { email, password, name } = validationResult.data;

    // Conectar a la base de datos
    await connectDB();

    // Verificar si el usuario ya existe
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { error: 'El usuario ya existe' },
        { status: 400 }
      );
    }

    // Hashear la contraseña
    const hashedPassword = await bcrypt.hash(password, 12);

    // Crear nuevo usuario
    const newUser = await User.create({
      email,
      password: hashedPassword,
      name: name || email.split('@')[0],
    });

    // Retornar respuesta sin la contraseña
    return NextResponse.json(
      {
        message: 'Usuario creado exitosamente',
        user: {
          id: newUser._id,
          email: newUser.email,
          name: newUser.name,
        },
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error en registro:', error);
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    );
  }
}