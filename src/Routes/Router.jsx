import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Converter from "../Pages/Converter/Converter";
import Compress from "../Pages/Compress/Compress";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";

export default function Router() {
  const [load, setLoad] = useState(false);

  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/Converter"
          element={<Converter load={load} setLoad={setLoad} />}
        />
        <Route
          path="/Compress"
          element={<Compress load={load} setLoad={setLoad} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
