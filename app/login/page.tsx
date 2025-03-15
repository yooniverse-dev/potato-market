"use client";
import { useEffect, useState } from "react";
import { auth } from "@/lib/firebaseConfig";
import { GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged } from "firebase/auth";

export default function LoginPage() {
  const [user, setUser] = useState(null); // 현재 로그인한 사용자 정보

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // 로그인 상태 업데이트
    });
    return () => unsubscribe(); // Cleanup (이벤트 리스너 해제)
  }, []);

  const loginWithGoogle = async () => {
    try {
      const provider = new GoogleAuthProvider();
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Login Error:", error);
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Logout Error:", error);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen">
      {user ? (
        <div className="text-center">
          <h2 className="text-2xl font-bold">로그인 되었습니다</h2>
          <p className="text-gray-600">{user.email}</p>
          <button
            onClick={handleLogout}
            className="bg-red-500 text-white px-4 py-2 rounded mt-4"
          >
            로그아웃
          </button>
        </div>
      ) : (
        <button
          onClick={loginWithGoogle}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Google 로그인
        </button>
      )}
    </div>
  );
}
