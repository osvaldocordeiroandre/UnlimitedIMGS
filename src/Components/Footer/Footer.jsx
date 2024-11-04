import React from "react";

export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <div className="bg-[#1c1f20] text-white p-6 flex justify-center">
      <span className="text-xl text-gray-300">
        © all rights reserved by Unlimited IMGS - {year}
      </span>
    </div>
  );
}
