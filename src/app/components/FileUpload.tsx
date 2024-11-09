import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingAnimation } from "./LoadingAnimation";
import axiosInstance from "../common/axios";
import { useDispatch } from "react-redux";
import { setFileUploaded } from "../redux/slice";

const FileUpload: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const history = useHistory();
  const dispatch = useDispatch();

  
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'application/*': ['.pdf', '.doc', '.docx', '.xls', '.xlsx'],
      'image/*': ['.jpeg', '.jpg', '.png', '.gif'],
      'video/*': ['.mp4', '.mkv', '.avi']
    },
    onDrop: (acceptedFiles) => {
      setUploadedFiles(acceptedFiles);
    },
  });

  const handleTagChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = event.target.value;
    setTags(value.split(","));
  };

  const handleUpload = async () => {
    if (uploadedFiles.length > 0) {
      setIsUploading(true);
      try {
        for (const file of uploadedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", tags.join(","));
          await axiosInstance.post(`/files/upload`, formData);
        }
        toast.success("File Uploaded Successfully.");
        dispatch(setFileUploaded());
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Error uploading files.");
      } finally {
        setIsUploading(false);
      }
    }
  };

  return (
    <div className="grid mx-auto">
      <h2 className='text-xl my-3'>File Upload:</h2>
      <div {...getRootProps()} className="border-dashed border-2 border-gray-400 p-20">
        <input className="file-input file-input-bordered w-full max-w-xs" {...getInputProps()} />
        <p>Drag & drop some files here, or click to select file(s)</p>
      </div>
      {uploadedFiles.length > 0 && (
        <div>
          <h2 className="pt-4">Uploaded Files:</h2>
          {uploadedFiles.map((file, index) => (
            <div className="pt-2" key={index}>{file.name}</div>
          ))}
        </div>
      )}
      <div>
        <label className="input input-bordered flex items-center gap-2 my-8 justify-between">
          <input
            className="w-100 flex-1"
            type="grow"
            placeholder="Tags (comma separated)"
            onChange={handleTagChange}
          />
          <span className="badge badge-info">Optional</span>
        </label>
        <button className="btn btn-md" onClick={handleUpload} disabled={isUploading}>
          Upload Files
          {isUploading && <LoadingAnimation />}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;