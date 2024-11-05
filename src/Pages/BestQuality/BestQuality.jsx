import React, { useState } from "react";
import JSZip from "jszip";

function MelhorQualidade() {
  const [improvedImages, setImprovedImages] = useState([]);
  const [load, setLoad] = useState(false);

  const enhanceImageQuality = (imageFile) => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(imageFile);

      reader.onload = (event) => {
        const img = new Image();
        img.src = event.target.result;

        img.onload = () => {
          const canvas = document.createElement("canvas");
          canvas.width = img.width;
          canvas.height = img.height;
          const ctx = canvas.getContext("2d");

          ctx.drawImage(img, 0, 0);

          const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
          const data = imageData.data;

          const contrastFactor = 1.2;
          const brightnessFactor = 20;

          for (let i = 0; i < data.length; i += 4) {
            data[i] = Math.min(
              255,
              data[i] * contrastFactor + brightnessFactor
            );
            data[i + 1] = Math.min(
              255,
              data[i + 1] * contrastFactor + brightnessFactor
            );
            data[i + 2] = Math.min(
              255,
              data[i + 2] * contrastFactor + brightnessFactor
            );
          }

          ctx.putImageData(imageData, 0, 0);

          const pngDataUrl = canvas.toDataURL("image/png", 0.92);
          resolve(pngDataUrl);
        };

        img.onerror = () => {
          reject("Erro ao carregar a imagem.");
        };
      };

      reader.onerror = () => {
        reject("Erro ao ler o arquivo.");
      };
    });
  };

  const handleFilesUpload = async (event) => {
    const files = Array.from(event.target.files);
    const enhancedImages = [];
    setLoad(true);

    try {
      for (const file of files) {
        const enhancedDataUrl = await enhanceImageQuality(file);
        const nameWithoutExtension = file.name.replace(/\.[^.]+$/, "");
        enhancedImages.push({
          name: nameWithoutExtension,
          url: enhancedDataUrl,
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setImprovedImages(enhancedImages);
      setLoad(false);
    }
  };

  const downloadAllAsZip = async () => {
    const zip = new JSZip();

    improvedImages.forEach((image) => {
      const base64Data = image.url.split(",")[1];
      zip.file(`${image.name}.png`, base64Data, { base64: true });
    });

    const zipBlob = await zip.generateAsync({ type: "blob" });
    const link = document.createElement("a");
    link.href = URL.createObjectURL(zipBlob);
    link.download = "imagens_melhoradas.zip";
    link.click();
  };

  return (
    <div className="flex flex-col items-center space-y-6 bg-[#1c1f20] text-white w-full min-h-screen h-full p-6">
      <h1 className="text-4xl font-bold">Melhorar Qualidade da Imagem</h1>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleFilesUpload}
        className="p-2 border border-gray-300 rounded cursor-pointer max-w-[352px] max-h-[48px] w-full h-full"
      />
      {load && <span className="mt-10">Carregando...</span>}

      <div className="max-[734px w-full]">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-[300px] overflow-auto p-10">
          {improvedImages.map((image, index) => (
            <div
              key={index}
              className="flex flex-col items-center space-y-2 max-w-[200px] max-h-[395px] w-full"
            >
              <img
                src={image.url}
                alt={`Imagem PNG ${index + 1}`}
                className="max-w-[300px] max-h-[300px] w-full h-full rounded-lg shadow-lg"
              />
              <a href={image.url} download={`${image.name}.png`}>
                <button className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 line-clamp-1 max-w-[200px] h-[38px] w-full">
                  Baixar {image.name}
                </button>
              </a>
            </div>
          ))}
        </div>
        {improvedImages.length > 0 && (
          <button
            onClick={downloadAllAsZip}
            className="px-4 py-2 w-full mt-10 bg-orange-500 text-white rounded hover:bg-orange-400"
          >
            Baixar Todas as Imagens
          </button>
        )}
      </div>
    </div>
  );
}

export default MelhorQualidade;
