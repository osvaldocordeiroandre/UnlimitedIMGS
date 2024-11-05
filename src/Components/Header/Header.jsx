import React from "react";
import { NavLink } from "react-router-dom";

import { IoInfinite } from "react-icons/io5";

export default function Header() {
  return (
    <div className="bg-[#181a1b] w-full text-white p-6 flex items-center justify-between">
      <div>
        <NavLink to="/">
          <h1 className="flex items-center gap-2 text-2xl">
            <IoInfinite /> IMGS
          </h1>
        </NavLink>
      </div>

      <ul className="flex  gap-4">
        <NavLink to="/Compress">
          <li className="cursor-pointer">COMPRIMIR IMAGEM</li>
        </NavLink>
        <NavLink to="/Converter">
          <li className="cursor-pointer">CONVERTER WEBP TO JPG</li>
        </NavLink>
      </ul>
    </div>
  );
}
