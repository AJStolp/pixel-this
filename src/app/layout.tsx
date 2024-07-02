import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import SideBar from "./components/sidebar/sidebar";
import UploadComponent from "./components/upload/upload";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Pixel This",
  description: "Transform your media",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="p-4 sm:ml-64 bg-background">
        {/* <UploadComponent cta={"Upload"} heading={"Upload Images"} /> */}
        <SideBar />
        {children}
      </body>
    </html>
  );
}
