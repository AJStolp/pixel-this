"use client";

import { FormEvent, useEffect, useState } from "react";
// import UploadForm from "./components/upload";
import FetchedAllAssets from "./interfaces/fetched-all-assets";
import { fetchAllImages } from "./utils/cloudinaryUtils";

export default function Page() {
  const [error, setError] = useState<string | null>(null);
  const [allImages, setAllImages] = useState<FetchedAllAssets[]>([]);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [uploadedImageUrl, setUploadedImageUrl] = useState<string | null>(null);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(
    null
  );

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const UPLOAD_PRESET = "ml_default";
  const API_KEY = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY;

  // useEffect(() => {
  //   async function fetchImages() {
  //     try {
  //       const data = await fetchAllImages();
  //       setAllImages(data);
  //     } catch (error) {
  //       setError("Failed to fetch images");
  //     }
  //   }
  //   fetchImages();
  // }, []);

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

  // async function onCrop(event: FormEvent<HTMLFormElement>) {
  //   event.preventDefault();

  //   if (!uploadedImageId) {
  //     setError("No image uploaded to transform");
  //     return;
  //   }

  //   const formData = new FormData(event.currentTarget);
  //   const croppingMode = formData.get("cropping") as string;
  //   const gravity = formData.get("gravity") as string;
  //   const dimensions = formData.get("dimensions") as string;
  //   const customDimensions = formData.get("custom-dimensions") as string;

  //   let transformationDimensions = dimensions;
  //   if (customDimensions) {
  //     const dimensionPattern = /^((h_\d+)|(w_\d+))(,((h_\d+)|(w_\d+)))*$/;
  //     if (!dimensionPattern.test(customDimensions)) {
  //       setError(
  //         "Invalid dimensions format. Please use h_<height>,w_<width> format."
  //       );
  //       return;
  //     }
  //     transformationDimensions = `,${customDimensions}`;
  //   }

  //   const transformationUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_${croppingMode}${gravity}${transformationDimensions}/${uploadedImageId}`;

  //   setTransformedImageUrl(transformationUrl);
  // }
  // console.log(uploadedImageId, "uploadedididid");

  // function imageSelection(publicId: string) {
  //   setUploadedImageId(publicId);
  // }

  return (
    <>
      {/* <section className="grid grid-cols-2 gap-4 lg:grid-cols-6 max-h-[550px] overflow-scroll">
        {allImages.map((image) => (
          <button
            key={image.public_id}
            onClick={() => setUploadedImageId(image.public_id)}
            className={
              image.public_id === uploadedImageId
                ? "bg-violet-500 hover:bg-violet-600 active:bg-violet-700 p-3"
                : " "
            }
          >
            <img className="max-w-50 max-h-50" src={image.secure_url} alt="" />
          </button>
        ))}
      </section> */}
      {error && <div style={{ color: "red" }}>{error}</div>}
      {/* <UploadForm
        heading={"Choose an image"}
        onUpload={onUpload}
        cta={"Upload"}
      >
        <input type="file" name="file" required />
      </UploadForm> */}
      <section>
        <h2>Uploaded Image:</h2>
        {uploadedImageUrl && (
          <div className="max-w-md">
            <img src={uploadedImageUrl} alt="" />
          </div>
        )}
      </section>
      {/* <form onSubmit={onCrop}>
        <h2>Gravity</h2>
        <select
          className="select-gravity text-black"
          id="gravity"
          name="gravity"
        >
          <option value="" id="none">
            None / Center
          </option>
          <option value=",g_north_west" id="northwest">
            Top left (g_north_west)
          </option>
          <option value=",g_auto" id="auto">
            Auto (g_auto)
          </option>
        </select>
        <h2>Cropping Mode</h2>
        <select name="cropping" id="cropping" className="text-black">
          <option value="fill">Fill</option>
          <option value="limit_fill">Limit Fill</option>
          <option value="fill_pad">Fill with Padding</option>
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
        <h2>Custom Dimensions</h2>
        <input
          className="text-black"
          type="text"
          name="custom-dimensions"
          placeholder="h_300,w_400"
        />
        <button className="block bg-white text-black mt-8" type="submit">
          Apply Transformation
        </button>
      </form> */}
      {transformedImageUrl && (
        <div>
          <h2>Transformed Image:</h2>
          <img src={transformedImageUrl} alt="" />
        </div>
      )}
    </>
  );
}
