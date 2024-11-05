import { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "../Pages/Home/Home";
import Converter from "../Pages/Converter/Converter";
import Compress from "../Pages/Compress/Compress";
import Header from "../Components/Header/Header";
import Footer from "../Components/Footer/Footer";
import WebpToPng from "../Pages/WebpToPng/WebpToPng";
import JpgToPng from "../Pages/JpgToPng/JpgToPng";

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
        <Route
          path="/WebpToPng"
          element={<WebpToPng load={load} setLoad={setLoad} />}
        />
        <Route
          path="/JpgToPng"
          element={<JpgToPng load={load} setLoad={setLoad} />}
        />
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}
