"use client";

import { useState, useEffect } from "react";
import { Producto } from "../types";
import StockManager from "../components/StockManager";
import SalesManager from "../components/SalesManager";

export default function Home() {
  const [productos, setProductos] = useState<Producto[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchProductos = async () => {
    try {
      const res = await fetch("/api/stock");
      if (!res.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data: Producto[] = await res.json();
      setProductos(data);
    } catch (error) {
      console.error("Error fetching productos:", error);
      setError("Error al obtener los productos");
    }
  };

  useEffect(() => {
    fetchProductos();
  }, []);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-4xl font-bold text-center mb-8">
        Gestión de Productos
      </h1>
      {error && (
        <p className="text-red-500 text-center rounded-md mb-4">{error}</p>
      )}
      <div className="bg-white shadow-md rounded-lg p-6 mb-8">
        <h2 className="text-2xl font-semibold mb-4">Listado de Productos</h2>
        <ul>
          {productos.map((producto) => (
            <li
              key={producto.nombre}
              className="flex justify-between items-center border-b py-2"
            >
              <span className="font-medium">{producto.nombre}</span>
              <span>Stock: {producto.stock}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <StockManager fetchProductos={fetchProductos} />
        <SalesManager fetchProductos={fetchProductos} />
      </div>
    </div>
  );
}
