import React from "react";

import { FaCompressArrowsAlt } from "react-icons/fa";
import { FaFileImage } from "react-icons/fa";
import { NavLink } from "react-router-dom";

export default function Home() {
  return (
    <div className="bg-[#1c1f20] w-full h-screen text-white flex flex-col">
      <div className=" flex flex-col flex-wrap items-center mt-10 text-xl mx-auto">
        <h2 className="text-4xl">Ferramentas de imagens necessárias</h2>
        <h3 className="mt-2 text-gray-300">
          Compressor e convertor de imagens ilimitadas grátis!
        </h3>
      </div>

      <div className="mt-10 flex flex-wrap justify-center gap-6">
        <NavLink to={"/Compress"}>
          <div className="bg-[#181a1b] max-w-[320px] max-h-[202px] w-full h-full rounded-md flex flex-col p-6 border border-orange-50 hover:border-orange-300 cursor-pointer">
            <FaCompressArrowsAlt size={30} />
            <div className="mt-4">
              <span className="text-2xl">Comprimir IMAGENS</span>
              <div className="mt-2">
                <span className="text-gray-300">
                  Comprima imagens para economizar espaço e manter qualidade!
                </span>
              </div>
            </div>
          </div>
        </NavLink>

        <NavLink to="/Converter">
          <div className="bg-[#181a1b] max-w-[320px] max-h-[202px] w-full h-full rounded-md flex flex-col p-6 border border-orange-50 hover:border-orange-300 cursor-pointer">
            <FaFileImage size={30} />
            <div className="mt-4">
              <span className="text-2xl line-clamp-1">WEBP para JPG</span>
              <div className="mt-2">
                <span className="text-gray-300">
                  Comprima imagens para economizar espaço e manter qualidade!
                </span>
              </div>
            </div>
          </div>
        </NavLink>
      </div>

      <div className="bg-[#181a1b] w-full mt-10 flex flex-col justify-center items-center text-3xl p-10">
        <div>
          <h1>Ferramentas ilimitadas e grátis para todos</h1>
        </div>

        <div className="flex flex-wrap">
          <div className="max-w-[420px] max-h-[202px] w-full h-full text-base mt-10">
            <h2 className="text-3xl">Otimizar imagens</h2>
            <h3 className="text-xl mt-2 text-gray-300">
              Comprima várias imagens de uma vez e mantenha a qualidade de todas
              elas, assim podendo economizar espaços!
            </h3>
          </div>

          <div className="max-w-[420px] max-h-[202px] w-full h-full flex flex-wrap text-base mt-10">
            <h2 className="text-3xl">Converter imagens</h2>
            <h3 className="text-xl mt-2 text-gray-300">
              Converta várias imagens de uma vez e economize seu tempo, rápido e
              facil para todos!
            </h3>
          </div>
        </div>
      </div>
    </div>
  );
}
