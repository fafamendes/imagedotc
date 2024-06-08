import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { FileContextProvider } from "@Contexts/file-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "image.c",
  description: "Convert image to C bytes array.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-br">
      <head>
        <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200" />
      </head>
      <body className={inter.className}>
        <FileContextProvider>
          {children}
        </FileContextProvider>
      </body>
    </html>
  );
}
