'use client'

import { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";
import prettyBytes from "pretty-bytes";
import { useFileContext } from "@Contexts/file-context";

export const UploadArea = () => {

  const [preview, setPreview] = useState<string | null>(null);
  const { file, setFile, setImageDotC } = useFileContext();

  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0) {
      setFile(acceptedFiles[0]);
      setPreview(URL.createObjectURL(acceptedFiles[0]));
    }

  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/jpeg': ['.jpg', '.jpeg'],
      'image/png': ['.png'],
      'image/webp': ['.webp'],
    },
    maxFiles: 1
  });

  const onRemove = useCallback((ev: React.MouseEvent) => {
    ev.stopPropagation();
    ev.preventDefault();
    setFile(null);
    setPreview(null);
  }, []);

  const handleClick = useCallback(async (ev: React.MouseEvent) => {
    ev.bubbles = false;
    ev.stopPropagation();
    ev.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('image', file);
      const res = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });
      const data = await res.json();
      setImageDotC(data.imageDotC);
    }
  }, [file]);

  return (
    <div className="w-full flex items-center justify-center flex-grow">
      <div className="flex flex-col items-center justify-center border rounded-lg
      border-dashed gap-4 border-gray-400 p-8 w-full md:w-1/4 hover:cursor-pointer min-h-[200px]"
        style={{ borderColor: isDragActive ? '#00ff00' : 'gray', borderStyle: isDragActive || preview ? 'solid' : 'dashed', borderWidth: isDragActive ? '3px' : '1px' }}
        {...getRootProps()}>
        {
          preview && !isDragActive ?
            <div className="flex gap-4 w-full justify-evenly border-b border-gray-400 p-2 p-b-4 relative">
              <span className="absolute top-0 right-[-10px] material-symbols-outlined cursor-pointer text-red-500"
                onClick={onRemove}>close</span>
              <div className="w-[100px] h-[100px] relative">
                <img src={preview} className="w-full h-full object-cover" />
              </div>
              <div>
                <p>{file?.name}</p>
                <p>{prettyBytes(file?.size || 0)}</p>
              </div>
            </div>
            :
            isDragActive ?
              <p className="text-gray-400 ">Solte o arquivo aqui</p>
              :
              <>
                <p className="text-gray-400 "><span className="font-bold">Click</span> ou <span className="font-bold">arraste</span> até aqui para fazer o upload</p>
                <p className="text-gray-400 ">JPG, PNG ou WEBP</p>
              </>
        }
        <input {...getInputProps()} type="file" accept="image/*" className="hidden" />
        {file && <button className="text-white bg-blue-500 rounded-lg p-2" onClick={handleClick} >Upload</button>}
      </div>
    </div>
  );
}