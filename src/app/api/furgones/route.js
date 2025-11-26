import { prisma } from "@/libs/prisma"; // (O @/lib/prisma según tu carpeta)
import { NextResponse } from "next/server";

// 🚨 1. ESTO ES LO MÁS IMPORTANTE: Desactiva el caché de Vercel
export const dynamic = 'force-dynamic';
export const revalidate = 0;

export async function GET() {
  try {
    const furgones = await prisma.furgon.findMany({
        orderBy: { createdAt: 'desc' } // Los más nuevos primero
    });
    
    // 🚨 2. ESTO EVITA QUE EL NAVEGADOR GUARDE LA RESPUESTA
    return NextResponse.json(furgones, {
        headers: {
            'Cache-Control': 'no-store, no-cache, must-revalidate, proxy-revalidate',
            'Pragma': 'no-cache',
            'Expires': '0',
        }
    });
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
         falla: falla || null,
       },
    });
    return NextResponse.json(nuevoFurgon, { status: 201 });
  } catch (error) {
    if (error.code === 'P2002') {
        return NextResponse.json({ error: "Ese número de placa ya existe." }, { status: 409 });
    }
    return NextResponse.json({ error: 'Error creating furgon' }, { status: 500 });
  }
}