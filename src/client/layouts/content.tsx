'use client'

import { Result, UploadArea } from "@Components/index";
import { useFileContext } from "@Contexts/file-context";

export const Content = () => {

  const { imageDotC } = useFileContext();

  return (
    <div className="w-full flex items-center justify-center flex-grow">
      {imageDotC ? <Result /> : <UploadArea />}
    </div>
  )
}