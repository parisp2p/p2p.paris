import { UploadedImage } from "@/utils/front/files";
import Image from "next/image";
import React, { useState } from "react";

export function UploadedFileItem({ id }: UploadedImage) {
  return (
    <li className="flex">
      <img src={`/api/images/${id}`} alt="" width={500} height={500} />
    </li>
  );
}

type DropzoneProps = {
  handleFileChange: (files: FileList) => void;
};

const Dropzone: React.FC<DropzoneProps> = ({ handleFileChange }) => {
  // Allow dropping items by preventing the default behavior in onDragOver
  const handleDragOver = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
  };

  // Grab dropped files from dataTransfer
  const handleDrop = (e: React.DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFileChange(e.dataTransfer.files);
      // Reset if you want to allow dropping again without re-dragging
      e.dataTransfer.clearData();
    }
  };

  // Grab files from the input when clicked
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFileChange(e.target.files);
    }
  };

  return (
    <div className="flex items-center justify-center w-full">
      <label
        htmlFor="dropzone-file"
        className="flex flex-col items-center justify-center w-full h-64 
                   border-2 border-gray-300 border-dashed rounded-lg cursor-pointer 
                   bg-gray-50 dark:hover:bg-gray-800 dark:bg-gray-700 hover:bg-gray-100 
                   dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600"
        onDragOver={handleDragOver}
        onDrop={handleDrop}
      >
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg
            className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 16"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 
                 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6
                 m0 0L8 8m2-2 2 2"
            />
          </svg>
          <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
            <span className="font-semibold">Click to upload</span> or drag and
            drop
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">
            SVG, PNG, JPG or GIF (MAX. 800x400px)
          </p>
        </div>
        {/* The actual file input is hidden — the label handles the click. */}
        <input
          id="dropzone-file"
          name="dropzone-file"
          type="file"
          className="hidden"
          onChange={handleChange}
        />
      </label>
    </div>
  );
};

const ImagePreview = ({
  file,
  onRemove,
  canRemove,
}: {
  file: File | null;
  onRemove: () => void;
  canRemove: boolean;
}) => {
  if (!file) return null;

  const url = URL.createObjectURL(file);

  return (
    <div className="mt-4 relative">
      <Image
        src={url}
        alt="Image Preview"
        width={400}
        height={400}
        className="max-w-xs max-h-xs"
      />
      {canRemove && (
        <button
          onClick={onRemove}
          className="underline underline-offset-4 text-white rounded"
          title="Remove image"
        >
          Change
        </button>
      )}
    </div>
  );
};

const ImagePicker = ({ onUpload }: { onUpload: (id: string) => void }) => {
  const [fileToUpload, setFileToUpload] = useState<File | null>(null);
  const [uploadedFile, setUploadedFile] = useState<UploadedImage | null>(null);

  const handleFileChange = (files: HTMLInputElement["files"]) => {
    if (files) {
      setFileToUpload(files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!fileToUpload) {
      alert("Please select a file");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileToUpload);

    const res = await fetch("/api/images", {
      method: "POST",
      body: formData,
    });

    const data = (await res.json()) as { files: UploadedImage[] };
    setUploadedFile(data.files[0]);
    onUpload(data.files[0].id);
  };

  const handleRemoveImage = () => {
    setFileToUpload(null);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          {fileToUpload ? (
            <ImagePreview
              file={fileToUpload}
              onRemove={handleRemoveImage}
              canRemove={uploadedFile === null}
            />
          ) : (
            <Dropzone handleFileChange={handleFileChange} />
          )}
        </div>
        {uploadedFile && <p>Saved!</p>}
        {!uploadedFile && fileToUpload && (
          <button type="submit" className="underline underline-offset-4">
            Upload
          </button>
        )}
      </form>
    </div>
  );
};

export default ImagePicker;
