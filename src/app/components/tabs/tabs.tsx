import { tabdata } from "./tab-data";

export default function Tabs() {
  return (
    <ul className="flex flex-wrap text-sm font-medium text-center text-gray-500 dark:text-gray-400">
      {tabdata.map((value) => (
        <li className="me-2">
          <a
            href="#"
            className="inline-block px-4 py-3 text-white bg-blue-600 rounded-lg active"
            aria-current="page"
          >
            {value}
          </a>
        </li>
      ))}
    </ul>
  );
}
