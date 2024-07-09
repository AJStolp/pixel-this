import { useState } from "react";
import { tabdata } from "./tab-data";

export default function Tabs() {
  const [toggleCropType, setToggleCropType] = useState<boolean>(false);
  function toggleCropSelection() {
    setToggleCropType(!toggleCropType);
  }
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      {tabdata.map((value) => (
        <li className="me-2">
          <a
            href="#"
            className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active"
            aria-current="page"
          >
            {value.name}
          </a>
        </li>
      ))}
    </ul>
  );
}
