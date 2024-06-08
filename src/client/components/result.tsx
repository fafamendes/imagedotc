import { useFileContext } from "@Contexts/file-context";

export const Result = () => {

  const { imageDotC, file, reset } = useFileContext();

  return (
    <div className="w-full flex items-center justify-space-between gap-40 ">
      <div className="flex flex-col items-center justify-center flex-grow gap-8">
        <img className="max-h-[30vh]" src={file ? URL.createObjectURL(file) : ''} alt="image preview" />
        <button
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded justify-center flex items-center"
          onClick={() => reset()}>
          Trocar imagem
          <span className="material-symbols-outlined">refresh</span>
        </button>
      </div>

      <div className="flex justify-left flex-grow max-h-[50vh] overflow-auto">
        <pre>
          <code>
            {imageDotC}
          </code>
        </pre>
      </div>
    </div>
  )
}