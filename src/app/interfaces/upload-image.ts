import { FormEventHandler } from "react";

export default interface UploadProps {
  heading: string;
  onUpload: FormEventHandler<HTMLFormElement>;
  cta: string;
  children: React.ReactNode;
}
