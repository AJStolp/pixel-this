"use client";

import { FormEvent, useState } from "react";
import { fill } from "@cloudinary/url-gen/actions/resize";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(
    null
  );

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

  async function onUpload(event: FormEvent<HTMLFormElement>) {
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

      setUploadedImageId(data.public_id);
      setUploadedImageUrl(data.secure_url);
    } catch (error) {
      setError("Upload failed");
      console.error("Error uploading to Cloudinary:", error);
    }
  }

  async function onCrop(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!uploadedImageId) {
      setError("No imaged uploaded to transform");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const croppingMode = formData.get("cropping") as string;
    const dimensions = formData.get("dimensions") as string;

    const transformationUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_${croppingMode}${dimensions}/${uploadedImageId}`;

    setTransformedImageUrl(transformationUrl);
  }

  return (
    <section>
      {error && <div style={{ color: "red" }}>{error}</div>}
      <form onSubmit={onUpload}>
        <input type="file" name="file" required />{" "}
        <button type="submit">Upload</button>
      </form>
      <section>
        <h2>Uploaded Image:</h2>
        {uploadedImageUrl && (
          <div className="max-w-md">
            <img src={uploadedImageUrl} alt="" />
          </div>
        )}
      </section>
      <form onSubmit={onCrop}>
        <h2>Cropping Mode</h2>
        <select name="cropping" id="cropping" className="text-black">
          <option value="fill">Fill</option>
          <option value="limitFill">Limit Fill</option>
          <option value="fillPad">Fill with Padding</option>
          <option value="crop">Crop</option>
        </select>
        <h2>Cropping/viewport Dimensions</h2>
        <select
          className="text-black"
          id="dimensions"
          name="dimensions"
          data-jcf='{"maxVisibleItems": 12}'
        >
          <option value=",h_169,w_300">
            Small landscape (16:9) (h_169,w_300)
          </option>
          <option value=",h_366,w_650">
            Large landscape (16:9) (h_366,w_650)
          </option>
          <option value=",h_300,w_225">
            Small portrait (3:4) (h_300,w_225)
          </option>
          <option value=",h_650,w_488">
            Large portrait (3:4) (h_650,w_488)
          </option>
          <option value=",h_300,w_300">Small square (h_300,w_300)</option>
          <option value=",h_650,w_650">Large square (h_650,w_650)</option>
          <option value="">Specify no dimensions</option>
        </select>
        <button type="submit">Apply Transformation</button>
      </form>
      {transformedImageUrl && (
        <div>
          <h2>Transformed Image:</h2>
          <img src={transformedImageUrl} alt="" />
        </div>
      )}
    </section>
  );
}
