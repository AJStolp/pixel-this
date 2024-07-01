"use client";

import React, { FormEvent, useState } from "react";
import { onUpload } from "../../utils/uploadHelper";
import { UploadComponentProps } from "../../interfaces/upload-image";

export default function UploadComponent({
  cta,
  heading,
}: UploadComponentProps) {
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleUpload = (event: FormEvent<HTMLFormElement>) => {
    onUpload({
      event,
      setUploadedImageId,
      setUploadedImageUrl,
      setError,
    });
  };

  return (
    <form onSubmit={handleUpload}>
      <h2>{heading}</h2>
      <input type="file" name="file" required />
      <button type="submit">{cta}</button>
      {uploadedImageUrl && <img src={uploadedImageUrl} alt="Uploaded" />}
      {error && <p>{error}</p>}
    </form>
  );
}
