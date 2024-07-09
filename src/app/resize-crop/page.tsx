"use client";

import { FormEvent, useState } from "react";
import Tabs from "../components/tabs/tabs";

export default function ResizeCrop() {
  const [error, setError] = useState<string | null>(null);
  const [uploadedImageId, setUploadedImageId] = useState<string | null>(null);
  const [transformedImageUrl, setTransformedImageUrl] = useState<string | null>(
    null
  );

  const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;

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
    console.log("Form Data:", {
      croppingMode,
      gravity,
      dimensions,
      customDimensions,
    });

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

  function imageSelection(publicId: string) {
    setUploadedImageId(publicId);
  }

  console.log(transformedImageUrl, "transformedurl");

  return (
    <>
      <form onSubmit={onCrop}>
        <section>
          <label htmlFor="aspect-select">Aspect</label>
          <select className="text-black" id="dimensions" name="dimensions">
            <option value="custom">Custom</option>
            <option value="portrait-9-16">Portrait (9:16)</option>
            <option value="portrait-3-4">Portrait (3:4)</option>
            <option value="square-1-1">Square (1:1)</option>
            <option value="wide-16-9">Wide (16:9)</option>
            <option value="landscape-4-3">Landscape (4:3)</option>
          </select>
        </section>
        <section>
          <label htmlFor="width">Width:</label>
          <input type="number" min="1" />
          <label htmlFor="height">Height:</label>
          <input type="number" min="1" />
        </section>
        <section className="max-w-64">
          <Tabs />
          <div>
            <p>
              Resizes the image to fit inside the bounding box specified by the
              dimensions, maintaining the aspect ratio.
            </p>
            <p>
              Resizes the image to fill the specified dimensions without
              distortion. The image may be cropped as a result.
            </p>
            <p>
              Extracts a region of the specified dimensions from the original
              image without first resizing it.
            </p>
          </div>
        </section>
        {/* <h2>Gravity</h2>
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
        </select> */}
        {/* <h2>Cropping Mode</h2>
        <select name="cropping" id="cropping" className="text-black">
          <option value="fill">Fill</option>
          <option value="limit_fill">Limit Fill</option>
          <option value="fill_pad">Fill with Padding</option>
          <option value="crop">Crop</option>
        </select> */}
        {/* <h2>Custom Dimensions</h2>
        <input
          className="text-black"
          type="text"
          name="custom-dimensions"
          placeholder="h_300,w_400"
        /> */}
        {/* make sure concatenate h and w onto width and height */}
        <button className="block bg-white text-black mt-8" type="submit">
          Apply Transformation
        </button>
      </form>
      <section>
        {transformedImageUrl && (
          <div className="text-black">
            <h2>Transformed Image:</h2>
            <img src={transformedImageUrl} alt="" />
          </div>
        )}
      </section>
    </>
  );
}
