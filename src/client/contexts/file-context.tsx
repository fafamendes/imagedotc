'use client'
import { createContext, useContext, useState } from "react";

export interface FileContext {
  file: File | null;
  setFile: React.Dispatch<React.SetStateAction<File | null>>;
  imageDotC: string;
  setImageDotC: React.Dispatch<React.SetStateAction<string>>
  reset: () => void
}

export interface FileContextProviderProps {
  children: React.ReactNode;
}

const UserContext = createContext<FileContext>({} as FileContext);
export const useFileContext = () => useContext(UserContext);

export const FileContextProvider = ({ children }: FileContextProviderProps) => {
  const [file, setFile] = useState<File | null>(null);
  const [imageDotC, setImageDotC] = useState<string>('');

  const reset = () => {
    setFile(null);
    setImageDotC('');
  }

  return (
    <UserContext.Provider value={{ file, setFile, imageDotC, setImageDotC, reset }}>
      {children}
    </UserContext.Provider>
  );
};

