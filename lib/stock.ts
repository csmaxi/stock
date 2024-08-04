import { Producto } from "@/types";
import { productos } from "./data";

export function mostrarStock(): Producto[] {
  return productos;
}

export function añadirStock(nombre: string, cantidad: number): string {
  const producto = productos.find((p) => p.nombre === nombre);
  if (producto) {
    producto.stock += cantidad;
    return `Añadido ${cantidad} cajones de ${nombre}. Stock actual: ${producto.stock} cajones.`;
  } else {
    return `Producto ${nombre} no encontrado.`;
  }
}

export function venderProducto(nombre: string, cantidad: number): string {
  const producto = productos.find((p) => p.nombre === nombre);
  if (producto) {
    if (producto.stock >= cantidad) {
      producto.stock -= cantidad;
      return `Vendidos ${cantidad} de ${nombre}. Stock actual: ${producto.stock}`;
    } else {
      return `No hay suficiente stock de ${nombre}. Stock actual: ${producto.stock}`;
    }
  } else {
    return `Producto ${nombre} no encontrado.`;
  }
}
