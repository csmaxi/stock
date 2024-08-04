import { useState } from "react";
import { Producto } from "@/types";

interface StockManagerProps {
  fetchProductos: () => void;
}

const StockManager: React.FC<StockManagerProps> = ({ fetchProductos }) => {
  const [nombre, setNombre] = useState<string>("Manzana"); // Default value
  const [cantidad, setCantidad] = useState<number>(0);
  const [error, setError] = useState<string | null>(null);

  const añadirStock = async () => {
    try {
      const res = await fetch("/api/stock", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ nombre, cantidad }),
      });
      if (!res.ok) {
        throw new Error("Error en la respuesta de la API");
      }
      const data = await res.json();
      alert(data.mensaje);
      fetchProductos(); // Actualiza la lista de productos
    } catch (error) {
      console.error("Error adding stock:", error);
      setError("Error al añadir stock");
    }
  };

  return (
    <div className="w-full max-w-md mx-auto bg-white shadow-md rounded-lg p-6">
      <h2 className="text-xl font-semibold mb-4">Añadir Stock</h2>
      {error && <p className="text-red-500">{error}</p>}
      <select
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      >
        <option value="Manzana">Manzana</option>
        <option value="Banana">Banana</option>
        <option value="Pera">Pera</option>
        <option value="Frutilla">Frutilla</option>
      </select>
      <input
        type="number"
        placeholder="Cantidad"
        value={cantidad}
        onChange={(e) => setCantidad(Number(e.target.value))}
        className="w-full p-2 border border-gray-300 rounded mb-4"
      />
      <button
        onClick={añadirStock}
        className="w-full bg-blue-500 text-white p-2 rounded"
      >
        Añadir Stock
      </button>
    </div>
  );
};

export default StockManager;
