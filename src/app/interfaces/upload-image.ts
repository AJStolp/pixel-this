// interfaces/upload-image.ts
import { FormEvent } from "react";

export interface OnUploadParams {
  event: FormEvent<HTMLFormElement>;
  setUploadedImageId: (id: string) => void;
  setUploadedImageUrl: (url: string) => void;
  setError: (message: string) => void;
}

export interface UploadComponentProps {
  cta: string;
  heading: string;
}
