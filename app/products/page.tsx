"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { collection, getDocs } from "firebase/firestore";
import { useRouter } from "next/navigation";

export default function ProductsPage() {
  const [products, setProducts] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProducts = async () => {
      const querySnapshot = await getDocs(collection(db, "products"));
      const items = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setProducts(items);
    };

    fetchProducts();
  }, []);

  // 상품 이름을 기반으로 로컬 이미지 경로 생성
  const getImagePath = (name: string) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "-"); // 예: "감자 10kg" -> "감자-10kg"
    return `/images/${formattedName}.jpg`;
  };

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold mb-6">상품 목록</h1>
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            onClick={() => router.push(`/products/${product.id}`)}
            className="border rounded-lg p-4 shadow-md bg-white cursor-pointer"
          >
            <img
              src={getImagePath(product.name)}
              alt={product.name}
              className="w-full h-40 object-cover rounded-lg"
              onError={(e) => (e.currentTarget.src = "/images/default.png")} // 이미지 없을 경우 기본 이미지
            />
            <h2 className="text-lg font-semibold mt-2">{product.name}</h2>
            <p className="text-gray-600">{product.price.toLocaleString()}원</p>
          </div>
        ))}
      </div>
    </div>
  );
}
