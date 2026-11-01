"use client";

import React, { useState, useRef, ChangeEvent, DragEvent } from "react";
import { Upload, Camera, RefreshCw, Trash2, CheckCircle2, AlertCircle, Info, Image as ImageIcon } from "lucide-react";

interface PhotoUploadProps {
  onPhotoSelected: (dataUrl: string | null) => void;
  permissionConfirmed: boolean;
  onPermissionChange: (confirmed: boolean) => void;
}

export function PhotoUpload({
  onPhotoSelected,
  permissionConfirmed,
  onPermissionChange,
}: PhotoUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [dragActive, setDragActive] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const cameraInputRef = useRef<HTMLInputElement | null>(null);

  const processFile = (file: File) => {
    setErrorMsg(null);

    // Validate mime type
    const validTypes = ["image/jpeg", "image/jpg", "image/png", "image/webp"];
    if (!validTypes.includes(file.type.toLowerCase())) {
      setErrorMsg("Please upload a valid image (JPG, JPEG, PNG, or WEBP).");
      return;
    }

    // Validate size (max 15MB)
    if (file.size > 15 * 1024 * 1024) {
      setErrorMsg("File size exceeds 15MB. Please choose a smaller photograph.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreview(result);
      onPhotoSelected(result);
    };
    reader.onerror = () => {
      setErrorMsg("Failed to read image file. Please try again.");
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleDrag = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleRemove = () => {
    setPreview(null);
    onPhotoSelected(null);
    if (fileInputRef.current) fileInputRef.current.value = "";
    if (cameraInputRef.current) cameraInputRef.current.value = "";
  };

  return (
    <div className="w-full">
      {/* Hidden File Inputs */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/png, image/jpeg, image/jpg, image/webp"
        onChange={handleFileChange}
        className="hidden"
      />
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*"
        capture="user"
        onChange={handleFileChange}
        className="hidden"
      />

      {errorMsg && (
        <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-500/40 text-red-200 text-sm flex items-center gap-2">
          <AlertCircle className="w-4 h-4 text-red-400 shrink-0" />
          <span>{errorMsg}</span>
        </div>
      )}

      {!preview ? (
        /* Empty Upload State */
        <div
          onDragEnter={handleDrag}
          onDragLeave={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-2xl p-8 sm:p-12 text-center transition-all cursor-pointer flex flex-col items-center justify-center relative overflow-hidden group ${
            dragActive
              ? "border-amber-400 bg-amber-950/40 scale-[1.01]"
              : "border-amber-500/30 hover:border-amber-400/70 bg-stone-950/40 hover:bg-amber-950/20"
          }`}
        >
          {/* Subtle background ambient pulse */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-500/20 to-red-500/10 blur-xl absolute pointer-events-none group-hover:scale-150 transition-transform" />

          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-amber-400/20 to-amber-950/40 border border-amber-400/30 flex items-center justify-center mb-4 text-amber-300 shadow-[0_0_20px_rgba(255,215,0,0.15)] group-hover:scale-110 transition-transform">
            <Upload className="w-8 h-8" />
          </div>

          <h3 className="text-xl sm:text-2xl font-bold text-amber-100 mb-2 font-serif">
            Upload Your Photograph
          </h3>
          <p className="text-sm text-amber-200/70 max-w-sm mb-6">
            Drag & drop your photo here, or click to browse from your device.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                fileInputRef.current?.click();
              }}
              className="btn-gold-glow px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <ImageIcon className="w-4 h-4" />
              <span>Choose Photo</span>
            </button>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                cameraInputRef.current?.click();
              }}
              className="btn-secondary-festive px-5 py-2.5 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 cursor-pointer"
            >
              <Camera className="w-4 h-4 text-amber-400" />
              <span>Take Selfie</span>
            </button>
          </div>

          <div className="mt-6 flex items-center gap-4 text-xs text-amber-300/50">
            <span>JPG, JPEG, PNG, WEBP</span>
            <span>•</span>
            <span>Up to 15MB</span>
          </div>
        </div>
      ) : (
        /* Preview State */
        <div className="p-6 rounded-2xl bg-stone-950/70 border border-amber-500/30 flex flex-col sm:flex-row items-center gap-6">
          <div className="relative w-40 h-48 rounded-2xl overflow-hidden border-2 border-amber-400/60 shadow-[0_10px_30px_rgba(0,0,0,0.8),0_0_20px_rgba(255,215,0,0.25)] shrink-0 group">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={preview}
              alt="Uploaded portrait"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
            <div className="absolute bottom-2 left-2 flex items-center gap-1 text-[11px] font-semibold text-emerald-400 bg-black/60 px-2 py-0.5 rounded-md backdrop-blur-sm">
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Photo Ready</span>
            </div>
          </div>

          <div className="flex-1 text-center sm:text-left">
            <h4 className="text-lg font-bold text-amber-100 mb-1">
              Photograph Selected Successfully
            </h4>
            <p className="text-xs text-amber-200/70 mb-4 max-w-md">
              Your photo is ready to be transformed into your festive Diwali collection. You can replace it or use the camera to capture another.
            </p>

            <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="btn-secondary-festive px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3.5 h-3.5 text-amber-300" />
                <span>Replace Photo</span>
              </button>

              <button
                type="button"
                onClick={handleRemove}
                className="px-4 py-2 rounded-xl text-xs font-semibold bg-red-950/40 hover:bg-red-900/60 text-red-300 border border-red-500/30 transition-all flex items-center gap-1.5 cursor-pointer"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span>Remove</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Clear Guidance Tips Box */}
      <div className="mt-4 p-4 rounded-xl bg-amber-950/20 border border-amber-500/20 text-xs text-amber-200/80 flex items-start gap-3">
        <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-semibold text-amber-300">Pro Tip for Best Results:</span>{" "}
          Upload a clear, front-facing photograph with natural or well-lit facial lighting. Portraits with a clean background render most majestically into our royal palace archways and golden bokeh scenes.
        </div>
      </div>

      {/* Mandatory User Permission Confirmation Checkbox */}
      <div className="mt-5 p-4 rounded-xl bg-stone-900/40 border border-amber-500/20">
        <label className="flex items-start gap-3 cursor-pointer select-none">
          <input
            type="checkbox"
            checked={permissionConfirmed}
            onChange={(e) => onPermissionChange(e.target.checked)}
            className="mt-1 w-4 h-4 rounded border-amber-400/50 bg-stone-950 text-amber-500 focus:ring-amber-400 focus:ring-offset-0 cursor-pointer accent-amber-500"
          />
          <span className="text-xs sm:text-sm text-amber-100/90 leading-snug">
            I confirm that I own or have legal permission to use this photograph for Diwali poster generation, and I consent to ephemeral in-browser rendering.
          </span>
        </label>
      </div>
    </div>
  );
}
