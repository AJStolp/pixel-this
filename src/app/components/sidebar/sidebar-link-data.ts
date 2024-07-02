import { ResizeCropIcon, LibraryIcon } from "../../icons/icon";
import UploadComponent from "../upload/upload";

export const SIDEBARLINKS = [
  {
    key: "upload",
    name: "Upload",
    icon: "",
    component: UploadComponent,
    href: "",
  },
  {
    key: "lib",
    name: "Library",
    icon: LibraryIcon,
    href: "/asset-library",
  },
  {
    key: "re",
    name: "Resize & Crop",
    icon: ResizeCropIcon,
    href: "resize-crop",
  },
];
