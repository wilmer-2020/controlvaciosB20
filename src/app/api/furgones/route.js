import { prisma } from "@/libs/prisma"; // Asegúrate de que tu carpeta se llame 'libs' o 'lib'
import { NextResponse } from "next/server";

// 🚨 OBLIGATORIO PARA VERCEL: Evita que se cachee la respuesta
export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const furgones = await prisma.furgon.findMany({
      orderBy: { createdAt: 'desc' } // Ordenar por fecha de creación (más nuevo primero)
    });
    return NextResponse.json(furgones);
  } catch (error) {
    return NextResponse.json({ error: 'Error fetching furgones' }, { status: 500 });
  }   
}

export async function POST(request) {
  try {
    const { placa, estado, falla } = await request.json();
    
    const nuevoFurgon = await prisma.furgon.create({
       data: {
         placa,
         estado,
         // Si falla viene vacío o undefined, guardamos null
         falla: falla || null, 
       },
    });
    return NextResponse.json(nuevoFurgon, { status: 201 });
    
  } catch (error) {
    // Código P2002 de Prisma = Violación de restricción única (Placa duplicada)
    if (error.code === 'P2002') {
        return NextResponse.json(
            { error: "Ese número de placa ya está registrado." }, 
            { status: 409 } // 409 Conflict
        );
    }
    
    return NextResponse.json({ error: 'Error creating furgon' }, { status: 500 });
  }
}