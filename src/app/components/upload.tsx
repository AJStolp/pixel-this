import UploadProps from "../interfaces/upload-image";

export default function UploadForm({
  children,
  onUpload,
  cta,
  heading,
}: Readonly<UploadProps>) {
  return (
    <form onSubmit={onUpload}>
      <h2>{heading}</h2>
      {children}
      <button type="submit">{cta}</button>
    </form>
  );
}
