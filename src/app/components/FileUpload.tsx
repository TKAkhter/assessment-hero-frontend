import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import axios from "axios";
import { useHistory } from "react-router-dom";
import { toast } from "react-toastify";
import { LoadingAnimation } from "./LoadingAnimation";

const FileUpload: React.FC = () => {
  const [tags, setTags] = useState<string[]>([]);
  const [uploadedFiles, setUploadedFiles] = useState<File[]>([]);
  const [isUploading, setIsUploading] = useState(false); // To show spinner during upload
  const history = useHistory();

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
      setIsUploading(true); // Show spinner when upload starts
      try {
        for (const file of uploadedFiles) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("tags", tags.join(","));
          await axios.post(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PATH}/files/upload`, formData);
        }
        history.push("/files");
      } catch (error) {
        console.error("Login failed:", error);
        toast.error("Error uploading files.");
      } finally {
        setIsUploading(false); // Hide spinner after upload
      }
    }
  };

  return (
    <div>
      <div {...getRootProps()} style={{ border: "2px dashed #000", padding: "20px" }}>
        <input {...getInputProps()} />
        <p>Drag & drop some files here, or click to select files</p>
      </div>
      {uploadedFiles.length > 0 && (
        <div>
          <h4>Uploaded Files:</h4>
          {uploadedFiles.map((file, index) => (
            <div key={index}>{file.name}</div> // Show file name
          ))}
        </div>
      )}
      <div>
        <input
          type="text"
          placeholder="Tags (comma separated)"
          onChange={handleTagChange}
        />
        <button onClick={handleUpload} disabled={isUploading}>
          Upload Files
          {isUploading && <LoadingAnimation />}
        </button>
      </div>
    </div>
  );
};

export default FileUpload;