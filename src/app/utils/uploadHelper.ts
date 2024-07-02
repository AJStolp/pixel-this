import { OnUploadParams } from "../interfaces/upload-image";

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const UPLOAD_PRESET = "ml_default";
const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

export async function getSignature() {
  const response = await fetch("http://localhost:3001/get-signature", {
    method: "GET",
  });
  if (!response.ok) {
    throw new Error("Failed to get signature");
  }
  const data = await response.json();
  return data;
}

export async function onUpload({
  event,
  setUploadedImageId,
  setUploadedImageUrl,
  setError,
}: OnUploadParams) {
  event.preventDefault();

  const formData = new FormData(event.currentTarget);
  const { signature, timestamp } = await getSignature();

  // Add the upload preset, signature, timestamp, and api_key to the FormData
  formData.append("upload_preset", UPLOAD_PRESET);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("api_key", API_KEY || "");

  try {
    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,
      {
        method: "POST",
        body: formData,
      }
    );

    const data = await response.json();

    setUploadedImageId(data.public_id);
    setUploadedImageUrl(data.secure_url);
  } catch (error) {
    setError("Upload failed");
    console.error("Error uploading to Cloudinary:", error);
  }
}
