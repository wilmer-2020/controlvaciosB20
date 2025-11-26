import { prisma } from "@/libs/prisma"; // Asegúrate que la ruta a 'libs' o 'lib' sea la correcta
import { NextResponse } from "next/server";

export async function GET(request, { params }) {
  const { id } = await params;
  try {
    const furgon = await prisma.furgon.findUnique({
      where: { id: Number(id) },
    });
    if (!furgon) {
      return NextResponse.json({ error: 'Furgón no encontrado' }, { status: 404 });
    }
    return NextResponse.json(furgon);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching furgón' }, { status: 500 });
  }
}

export async function PUT(request, { params }) {
  const { id } = await params;
    try {
    const { placa, estado, falla } = await request.json();
    const updatedFurgon = await prisma.furgon.update({
      where: { id: Number(id) },
      data: {
        placa,
        estado,
        falla,
      },
    });
    return NextResponse.json(updatedFurgon);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error updating furgón' }, { status: 500 });
  }
}

export async function DELETE(request, {params}) {
    const { id } = await params
    try {
        const deleteFurgon = await prisma.furgon.delete({
            where:{
                id: Number(id)
            }
        })
        return NextResponse(deleteFurgon)
    } catch (error) {
        if (error.code === 'P2025') {
        return NextResponse.json({ error: 'Furgón no encontrado' }, { status: 404 });
    }

    console.error(error);
    return NextResponse.json({ error: 'Error deleting furgón' }, { status: 500 });
  }
}