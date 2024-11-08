import React, { useState } from "react";
import imageCompression from "browser-image-compression";
import JSZip from "jszip";
import { saveAs } from "file-saver";

function MultipleImageCompressor({ load, setLoad }) {
  const [compressedImages, setCompressedImages] = useState([]);

  const handleImageUpload = async (event) => {
    const files = Array.from(event.target.files);
    const compressedFiles = [];

    setLoad(true);

    try {
      for (const file of files) {
        const options = {
          maxSizeMB: 1,
          maxWidthOrHeight: 800,
          useWebWorker: true,
          fileType: "image/webp",
        };

        const compressedFile = await imageCompression(file, options);
        compressedFiles.push({
          name: file.name.replace(/\.[^/.]+$/, ".webp"),
          file: compressedFile,
          url: URL.createObjectURL(compressedFile),
        });
      }
    } catch (error) {
      console.error("Erro ao comprimir a imagem:", error);
    } finally {
      setCompressedImages(compressedFiles);
      setLoad(false);
    }
  };

  const handleDownloadZip = async () => {
    const zip = new JSZip();

    compressedImages.forEach((image) => {
      zip.file(image.name, image.file);
    });

    try {
      const zipBlob = await zip.generateAsync({ type: "blob" });
      saveAs(zipBlob, "compressed_images.zip");
    } catch (error) {
      console.error("Erro ao gerar o arquivo zip:", error);
    }
  };

  return (
    <div className="p-6 mx-auto bg-[#1c1f20] w-full min-h-screen shadow-md text-white flex items-center flex-col">
      <h2 className="text-4xl font-semibold mb-4 text-center">
        Comprimir imagens
      </h2>
      <input
        type="file"
        accept="image/*"
        multiple
        onChange={handleImageUpload}
        className="p-2 border border-gray-300 rounded cursor-pointer max-w-[352px] max-h-[48px] w-full h-full"
      />

      {load && <span className="mt-10">Loading...</span>}

      {compressedImages.length > 0 && (
        <div className="mt-10">
          <h3 className="text-lg font-medium mb-8">Imagens Comprimidas:</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6 h-[300px] overflow-auto p-10">
            {compressedImages.map((image, index) => (
              <img
                key={index}
                src={image.url}
                alt={`Comprimida ${index + 1}`}
                className="w-24 h-24 object-cover rounded-md shadow"
              />
            ))}
          </div>
          <button
            onClick={handleDownloadZip}
            className="mt-4 px-4 py-2 w-full bg-orange-500 text-white font-medium rounded-lg hover:bg-orange-600 focus:outline-none"
          >
            Baixar
          </button>
        </div>
      )}
    </div>
  );
}

export default MultipleImageCompressor;
