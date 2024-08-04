import { NextResponse } from "next/server";
import { mostrarStock, añadirStock, venderProducto } from "../../../lib/stock";

export async function GET() {
  try {
    const productos = mostrarStock();
    return NextResponse.json(productos, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function POST(req: Request) {
  try {
    const { nombre, cantidad } = await req.json();
    if (nombre && cantidad) {
      const mensaje = añadirStock(nombre, cantidad);
      return NextResponse.json({ mensaje }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Nombre y cantidad son requeridos" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
  try {
    const { nombre, cantidad } = await req.json();
    if (nombre && cantidad) {
      const mensaje = venderProducto(nombre, cantidad);
      return NextResponse.json({ mensaje }, { status: 200 });
    } else {
      return NextResponse.json(
        { error: "Nombre y cantidad son requeridos" },
        { status: 400 }
      );
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Error interno del servidor" },
      { status: 500 }
    );
  }
}
