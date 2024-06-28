"use client";

import { FormEvent, useState } from "react";

export default function Page() {
  const [error, setError] = useState<string | null>(null);

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = "ml_default";

  async function getSignature() {
    const response = await fetch("http://localhost:3001/get-signature", {
      method: "GET",
    });
    if (!response.ok) {
      throw new Error("Failed to get signature");
    }
    const data = await response.json();
    return data;
  }

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);
    const { signature, timestamp } = await getSignature();

    // Add the upload preset, signature, timestamp, and api_key to the FormData
    formData.append("upload_preset", UPLOAD_PRESET);
    formData.append("timestamp", timestamp.toString());
    formData.append("signature", signature);
    formData.append(
      "api_key",
      process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY || ""
    );

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      console.log(data, "returned");
    } catch (error) {
      setError("Upload failed");
      console.error("Error uploading to Cloudinary:", error);
    }
  }

  return (
    <section>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={onSubmit}>
        <input type="file" name="file" required />{" "}
        <button type="submit">Upload</button>
      </form>
    </section>
  );
}
