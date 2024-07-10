import { useState } from "react";
import { tabdata } from "./tab-data";

export default function Tabs() {
  const [selectedKey, setSelectedKey] = useState<string | null>(null);

  function toggleCropSelection(key: string) {
    setSelectedKey(selectedKey === key ? null : key);
  }

  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      {tabdata.map((value) => (
        <li className="me-2" key={value.key}>
          <a
            href="#"
            className={`inline-block px-4 py-3 rounded-lg ${
              selectedKey === value.key
                ? "text-white bg-blue-600"
                : "text-gray-500"
            }`}
            onClick={() => toggleCropSelection(value.key)}
          >
            {value.name}
          </a>
        </li>
      ))}

      {selectedKey && (
        <section className="text-left mt-4">
          <p>{tabdata.find((tab) => tab.key === selectedKey)?.description}</p>
        </section>
      )}
    </ul>
  );
}
