import { prisma } from "@/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
 try {
    const furgones = await prisma.furgon.findMany();
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
        falla,
       },
    });
    return NextResponse.json(nuevoFurgon, { status: 201 });
 } catch (error) {
    return NextResponse.json({ error: 'Error creating furgon' }, { status: 500 });
 }
}