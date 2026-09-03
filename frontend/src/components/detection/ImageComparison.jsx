import { useState } from "react";
import {
  Image,
  ScanSearch,
  Download,
  Maximize2,
  X,
} from "lucide-react";

const API = "http://127.0.0.1:8000";

export default function ImageComparison({
  original,
  annotated,
}) {
  const [fullscreen, setFullscreen] = useState(false);
  const [selectedImage, setSelectedImage] = useState("");

  // Build correct URL
  const annotatedUrl =
    annotated?.startsWith("http")
      ? annotated
      : `${API}${annotated}`;

  function openImage(src) {
    setSelectedImage(src);
    setFullscreen(true);
  }

  function downloadImage() {
    const link = document.createElement("a");
    link.href = annotatedUrl;
    link.download = "VisionDesk_Result.jpg";
    link.click();
  }

  return (
    <>
      <div className="mt-10 grid gap-8 lg:grid-cols-2">

        {/* Original */}

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl">

          <div className="flex items-center justify-between border-b border-slate-800 p-5">

            <div className="flex items-center gap-3">
              <Image className="text-blue-400" size={28} />
              <h2 className="text-2xl font-bold text-white">
                Original Image
              </h2>
            </div>

            <button
              onClick={() => openImage(original)}
              className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
            >
              <Maximize2 className="text-white" />
            </button>

          </div>

          <img
            src={original}
            alt="Original"
            className="h-[450px] w-full object-contain"
            onClick={() => openImage(original)}
          />

        </div>

        {/* Detection */}

        <div className="overflow-hidden rounded-3xl border border-slate-800 bg-gradient-to-br from-slate-900 to-slate-950 shadow-xl">

          <div className="flex items-center justify-between border-b border-slate-800 p-5">

            <div className="flex items-center gap-3">
              <ScanSearch className="text-green-400" size={28} />
              <h2 className="text-2xl font-bold text-white">
                AI Detection
              </h2>
            </div>

            <div className="flex gap-3">

              <button
                onClick={downloadImage}
                className="rounded-lg bg-green-600 p-2 hover:bg-green-700"
              >
                <Download className="text-white" />
              </button>

              <button
                onClick={() => openImage(annotatedUrl)}
                className="rounded-lg bg-slate-800 p-2 hover:bg-slate-700"
              >
                <Maximize2 className="text-white" />
              </button>

            </div>

          </div>

          <img
            src={annotatedUrl}
            alt="Detection"
            className="h-[450px] w-full object-contain"
            onClick={() => openImage(annotatedUrl)}
            onError={(e) => {
              console.log("Broken image URL:", annotatedUrl);
              e.target.style.border = "2px solid red";
            }}
          />

        </div>

      </div>

      {fullscreen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/90">

          <button
            onClick={() => setFullscreen(false)}
            className="absolute right-8 top-8 rounded-full bg-red-600 p-3"
          >
            <X className="text-white" />
          </button>

          <img
            src={selectedImage}
            className="max-h-[90%] max-w-[90%]"
          />

        </div>
      )}
    </>
  );
}