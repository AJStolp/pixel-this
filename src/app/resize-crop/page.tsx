"use client";

import { FormEvent, useState } from "react";

export default function ResizeCrop() {
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(
    null
  );

  async function onCrop(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!uploadedImageId) {
      setError("No image uploaded to transform");
      return;
    }

    const formData = new FormData(event.currentTarget);
    const croppingMode = formData.get("cropping") as string;
    const gravity = formData.get("gravity") as string;
    const dimensions = formData.get("dimensions") as string;
    const customDimensions = formData.get("custom-dimensions") as string;

    let transformationDimensions = dimensions;
    if (customDimensions) {
      const dimensionPattern = /^((h_\d+)|(w_\d+))(,((h_\d+)|(w_\d+)))*$/;
      if (!dimensionPattern.test(customDimensions)) {
        setError(
          "Invalid dimensions format. Please use h_<height>,w_<width> format."
        );
        return;
      }
      transformationDimensions = `,${customDimensions}`;
    }

    const transformationUrl = `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/c_${croppingMode}${gravity}${transformationDimensions}/${uploadedImageId}`;

    setTransformedImageUrl(transformationUrl);
  }
  return (
    <form onSubmit={onCrop}>
      <h2>Gravity</h2>
      <select className="select-gravity text-black" id="gravity" name="gravity">
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
        <option value=",h_300,w_225">Small portrait (3:4) (h_300,w_225)</option>
        <option value=",h_650,w_488">Large portrait (3:4) (h_650,w_488)</option>
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
    </form>
  );
}
