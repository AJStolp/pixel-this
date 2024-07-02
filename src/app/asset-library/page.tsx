"use client";

import { useEffect, useState } from "react";
import { fetchAllImages } from "../utils/cloudinaryUtils";
import FetchedAllAssets from "../interfaces/fetched-all-assets";

export default function AssetLibrary() {
  const [allImages, setAllImages] = useState<FetchedAllAssets[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);

  useEffect(() => {
    async function fetchImages() {
      try {
        const data = await fetchAllImages();
        setAllImages(data);
      } catch (error) {
        setError("Failed to fetch images");
      }
    }
    fetchImages();
  }, []);
  return (
    <section className="grid grid-cols-2 gap-4 lg:grid-cols-6 max-h-[550px] overflow-scroll">
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
    </section>
  );
}
