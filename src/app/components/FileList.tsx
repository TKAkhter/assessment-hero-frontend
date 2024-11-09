// src/components/FileList.tsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface File {
  _id: string;
  name: string;
  tags: string[];
  filePath: string;
  createdAt: Date;
}

const FileList: React.FC = () => {
  const [files, setFiles] = useState<File[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    // Fetch all files when the component mounts
    const fetchFiles = async () => {
      try {
        const response = await axios.get(`${process.env.REACT_APP_API_URL}/${process.env.REACT_APP_API_PATH}/files/`); // Adjust the URL based on your backend
        if (response.data) {
          setFiles(response.data);
        }
      } catch (err) {
        setError('Failed to fetch files');
      } finally {
        setLoading(false);
      }
    };

    fetchFiles();
  }, []);

  if (loading) return <div>Loading files...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div>
      <h2>All Uploaded Files</h2>
      <div>
        {files.length === 0 ? (
          <p>No files found.</p>
        ) : (
          <ul>
            {files.map((file) => (
              <li key={file._id}>
                <h3>{file.name}</h3>
                <p>Tags: {file.tags.join(', ')}</p>
                <p>Uploaded on: {new Date(file.createdAt).toLocaleDateString()}</p>
                <a href={`/uploads/${file.filePath}`} target="_blank" rel="noopener noreferrer">
                  View File
                </a>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FileList;