import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Product = {
  _id: string;
  title: string;
  description: string;
  price: number;
};

export default function App() {
  const [products, setProducts] = useState<Product[]>([]);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");

  useEffect(() => {
    fetch("/api/products")
      .then((res) => res.json())
      .then(setProducts);
  }, []);

  async function addProduct(e: FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ title, description, price: Number(price) }),
    });
    const product = await res.json();
    setProducts([...products, product]);
    setTitle("");
    setDescription("");
    setPrice("");
  }

  return (
    <main>
      <h1>My Products</h1>
      <form onSubmit={addProduct}>
        <input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          placeholder="Price"
          type="number"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
        <button>Add</button>
      </form>
      <ul>
        {products.map((p) => (
          <li key={p._id}>
            {p.title} - {p.description} - {p.price}
          </li>
        ))}
      </ul>
    </main>
  );
}
