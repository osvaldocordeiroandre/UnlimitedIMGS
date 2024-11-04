import React, { useState } from "react";
import JSZip from "jszip";

function WebPToJPGConverter() {
  const [jpgImages, setJpgImages] = useState([]);

  const convertWebPToJPG = (webpFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(webpFile);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");
          ctx.drawImage(img, 0, 0);

          const jpgDataUrl = canvas.toDataURL("image/jpeg", 0.92);
          resolve(jpgDataUrl);
        };

        img.onerror = () => {
          reject("Erro ao carregar a imagem WebP.");
        };
      };

      reader.onerror = () => {
        reject("Erro ao ler o arquivo WebP.");
      };
    });
  };

  const handleFilesUpload = async (event) => {
    const files = Array.from(event.target.files);
    const convertedImages = [];

    for (const file of files) {
      try {
        const jpgDataUrl = await convertWebPToJPG(file);

        const nameWithoutExtension = file.name.replace(/\.webp$/i, "");

        convertedImages.push({ name: nameWithoutExtension, url: jpgDataUrl });
      } catch (error) {
        console.error(error);
      }
    }

    setJpgImages(convertedImages);
  };

  const downloadAllAsZip = async () => {
    const zip = new JSZip();

    jpgImages.forEach((image, index) => {
      const base64Data = image.url.split(",")[1];
      zip.file(`${image.name}.jpg`, base64Data, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "imagens_convertidas.zip";
    link.click();
  };

  return (
    <div className="flex flex-col  items-center space-y-6 bg-[#1c1f20] text-white w-full min-h-screen h-full p-6">
      <h1 className="text-4xl font-bold">WebP para JPG</h1>

      <input
        type="file"
        accept="image/webp"
        multiple
        onChange={handleFilesUpload}
        className="p-2 border border-gray-300 rounded cursor-pointer max-w-[352px] max-h-[48px] w-full h-full"
      />

      {jpgImages.length > 0 && (
        <button
          onClick={downloadAllAsZip}
          className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-400"
        >
          Baixar Todas as Imagens
        </button>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-[300px] overflow-auto p-10">
        {jpgImages.map((image, index) => (
          <div
            key={index}
            className="flex flex-col items-center space-y-2 max-w-[200px] max-h-[395px]"
          >
            <img
              src={image.url}
              alt={`Imagem JPG ${index + 1}`}
              className="max-w-full h-auto rounded-lg shadow-lg"
            />
            <a href={image.url} download={`${image.name}.jpg`}>
              <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 line-clamp-1 min-w-[200px] h-[38px]">
                Baixar {image.name}
              </button>
            </a>
          </div>
        ))}
      </div>
    </div>
  );
}

export default WebPToJPGConverter;
