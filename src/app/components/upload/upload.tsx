"use client";

import React, { ChangeEvent, FormEvent, useState } from "react";
import { onUpload } from "../../utils/uploadHelper";
import { UploadComponentProps } from "../../interfaces/upload-image";

export default function UploadComponent({
  cta,
  heading,
}: Readonly<UploadComponentProps>) {
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedFileName, setSelectedFileName] = useState<string | null>(null);

  const handleUpload = (event: FormEvent<HTMLFormElement>) => {
    onUpload({
      event,
      setUploadedImageId,
      setUploadedImageUrl,
      setError,
    });
  };
  console.log(uploadedImageId, "ididid");

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFileName(event.target.files[0].name);
    }
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>{heading}</h2>
      <label
        className="flex gap-2 cursor-pointer"
        id="upload-file-label"
        htmlFor="upload"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          height="24px"
          viewBox="0 -960 960 960"
          width="24px"
          fill="currentColor"
        >
          <path d="M160-80v-80h640v80H160Zm200-160v-280H200l280-360 280 360H600v280H360Zm80-80h80v-280h76L480-750 364-600h76v280Zm40-280Z" />
        </svg>
        Upload Asset
      </label>
      <input
        onChange={handleFileChange}
        type="file"
        name="file"
        id="upload"
        required
        hidden
      />
      {selectedFileName && <p>Selected File: {selectedFileName}</p>}
      <button
        // className={uploadedImageId == null ? "hidden" : "block"}
        type="submit"
      >
        {cta}
      </button>
      {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" />}
      {error && <p>{error}</p>}
    </form>
  );
}
