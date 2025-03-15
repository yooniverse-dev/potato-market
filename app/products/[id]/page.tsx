"use client";
import { useEffect, useState } from "react";
import { db } from "@/lib/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useParams } from "next/navigation";

export default function ProductDetailPage() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      if (!id) return;
      const docRef = doc(db, "products", id);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setProduct(docSnap.data());
      } else {
        console.error("No such document!");
      }
    };

    fetchProduct();
  }, [id]);

  if (!product) {
    return <p className="text-center mt-10 text-gray-600">상품 정보를 불러오는 중...</p>;
  }

  const getImagePath = (name: string) => {
    const formattedName = name.toLowerCase().replace(/\s+/g, "-");
    return `/images/${formattedName}.jpg`;
  };

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <img
        src={getImagePath(product.name)}
        alt={product.name}
        className="w-full h-64 object-cover rounded-lg"
        onError={(e) => (e.currentTarget.src = "/images/default.png")}
      />
      <h1 className="text-3xl font-bold mt-4">{product.name}</h1>
      <p className="text-xl text-gray-600 mt-2">{product.price.toLocaleString()}원</p>
      <p className="mt-4 text-gray-700">{product.description || "상품 설명이 없습니다."}</p>
    </div>
  );
}
