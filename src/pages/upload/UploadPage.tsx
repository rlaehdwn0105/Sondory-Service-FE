import { useRef, useState } from "react";
import { UploadCloud, Pencil } from "lucide-react";
import { axiosInstance } from "@/lib/axios";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const extractAudioDuration = (file: File): Promise<number> => {
  return new Promise((resolve, reject) => {
    const audio = document.createElement("audio");
    audio.preload = "metadata";

    const reader = new FileReader();
    reader.onload = (e) => {
      audio.src = e.target?.result as string;
    };
    reader.onerror = () => reject("File read failed");

    audio.onloadedmetadata = () => resolve(audio.duration);
    audio.onerror = () => reject("Audio metadata load failed");

    reader.readAsDataURL(file);
  });
};

const formatDuration = (duration: number) => {
  const minutes = Math.floor(duration / 60);
  const seconds = Math.floor(duration % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
};

const UploadPage = () => {
  const audioInputRef = useRef<HTMLInputElement | null>(null);
  const imageInputRef = useRef<HTMLInputElement | null>(null);

  const [audioFile, setAudioFile] = useState<File | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [duration, setDuration] = useState<number | null>(null);
  const [isUploading, setIsUploading] = useState(false);

  const audioTypes = [
    "audio/wav", "audio/flac", "audio/aiff", "audio/x-aiff", "audio/x-alac",
    "audio/mp3", "audio/mpeg", "audio/aac", "audio/ogg", "audio/wma", "audio/amr",
  ];
  const imageTypes = ["image/jpeg", "image/png", "image/webp", "image/gif"];

  const handleAudioSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) await validateAudio(file);
  };

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) validateImage(file);
  };

  const handleAudioDrop = async (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) await validateAudio(file);
  };

  const handleImageDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const file = e.dataTransfer.files?.[0];
    if (file) validateImage(file);
  };

  const validateAudio = async (file: File) => {
    if (!audioTypes.includes(file.type)) {
      toast.error("Invalid audio format.");
      return;
    }
    setAudioFile(file);

    try {
      const extractedDuration = await extractAudioDuration(file);
      setDuration(extractedDuration);
    } catch {
      toast.error("Failed to extract duration.");
    }
  };

  const validateImage = (file: File) => {
    if (!imageTypes.includes(file.type)) {
      toast.error("Invalid image format.");
      return;
    }
    setImageFile(file);
  };

  const uploadToS3 = async () => {
    if (!audioFile || !imageFile) {
      toast.error("Please select both audio and image files.");
      return;
    }

    setIsUploading(true);
    try {
      const audioRes = await axiosInstance.post("/upload/presign", {
        filename: audioFile.name,
        contentType: audioFile.type,
        type: "audio",
      });
      const { presignedUrl: audioUrl } = audioRes.data;
      await axios.put(audioUrl, audioFile, {
        headers: { "Content-Type": audioFile.type },
      });

      const imageRes = await axiosInstance.post("/upload/presign", {
        filename: imageFile.name,
        contentType: imageFile.type,
        type: "image",
      });
      const { presignedUrl: imageUrl } = imageRes.data;

      await axios.put(imageUrl, imageFile, {
        headers: { "Content-Type": imageFile.type },
      });

      const coverKey = imageRes.data.key;
      const songkey = audioRes.data.key;

      await axiosInstance.post("/user/upload", {
        title: audioFile.name.split(".")[0],
        coverUrl: coverKey,
        songUrl: songkey,
        duration: Math.floor(duration || 0),
      });

      toast.success("Upload successful");

      setAudioFile(null);
      setImageFile(null);
      setDuration(null);
    } catch (err) {
      console.error("Upload error:", err);
      toast.error("Upload failed");
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center px-4 py-8">
      <Link
        to="/"
        className="self-start mb-4 ml-2 text-sm text-yellow-400 hover:text-yellow-500 font-semibold"
      >
        ← Home
      </Link>

      <div className="max-w-xl w-full text-center">
        <h1 className="text-3xl font-bold mb-4">Upload your audio and cover image</h1>
        <p className="text-gray-400 mb-6 text-sm leading-relaxed">
          For best quality, upload stereo files in WAV, FLAC, AIFF, or ALAC format. <br />
          Maximum file size is 4GB (uncompressed).
        </p>

        <div
          onClick={() => audioInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleAudioDrop}
          className="border-2 border-dashed border-gray-600 rounded-lg px-6 py-6 cursor-pointer hover:border-yellow-500 transition-all"
        >
          <div className="flex flex-col items-center">
            <UploadCloud className="w-10 h-10 mb-2 text-gray-400" />
            <p className="text-gray-300 text-sm">Upload audio file</p>
            <button
              className="mt-2 px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold rounded"
              onClick={() => audioInputRef.current?.click()}
            >
              Choose Audio
            </button>
            {audioFile && (
              <div className="mt-2 text-sm text-gray-300">
                {audioFile.name}
                <button
                  className="ml-2 text-yellow-400 hover:text-yellow-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    audioInputRef.current?.click();
                  }}
                >
                  <Pencil size={14} />
                </button>
                {duration !== null && (
                  <p className="mt-1 text-yellow-400">
                    Duration: {formatDuration(duration)}
                  </p>
                )}
              </div>
            )}
          </div>
          <input
            ref={audioInputRef}
            type="file"
            accept="audio/*"
            onChange={handleAudioSelect}
            className="hidden"
          />
        </div>

        <div
          onClick={() => imageInputRef.current?.click()}
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleImageDrop}
          className="border-2 border-dashed border-gray-600 rounded-lg px-6 py-6 cursor-pointer hover:border-yellow-500 transition-all mt-6"
        >
          <div className="flex flex-col items-center">
            <UploadCloud className="w-10 h-10 mb-2 text-gray-400" />
            <p className="text-gray-300 text-sm">Upload cover image</p>
            <button
              className="mt-2 px-4 py-1 bg-yellow-500 hover:bg-yellow-600 text-black text-sm font-semibold rounded"
              onClick={() => imageInputRef.current?.click()}
            >
              Choose Image
            </button>
            {imageFile && (
              <p className="mt-2 text-sm text-gray-300">
                {imageFile.name}
                <button
                  className="ml-2 text-yellow-400 hover:text-yellow-500"
                  onClick={(e) => {
                    e.stopPropagation();
                    imageInputRef.current?.click();
                  }}
                >
                  <Pencil size={14} />
                </button>
              </p>
            )}
          </div>
          <input
            ref={imageInputRef}
            type="file"
            accept="image/*"
            onChange={handleImageSelect}
            className="hidden"
          />
        </div>

        <button
          onClick={uploadToS3}
          disabled={isUploading}
          className="mt-6 px-6 py-3 bg-yellow-500 hover:bg-yellow-600 text-black font-semibold rounded"
        >
          {isUploading ? "Uploading..." : "Upload"}
        </button>
      </div>
    </div>
  );
};

export default UploadPage;
