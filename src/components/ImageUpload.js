"use client";
import { useState } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import '@/styles/ImageUpload.css';

// Image Upload Component
function ImageUpload({ onUpload, fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'], accept = "image/png,image/jpeg,image/jpg,image/gif", apiEndpoint = '/api/event/upload' }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [uploading, setUploading] = useState(false);
  const [uploadSuccess, setUploadSuccess] = useState(false);
  const [error, setError] = useState(null);

  // Handle file change
  function handleChange(e) {
    const files = Array.from(e.target.files);
    const validFiles = files.filter(f => fileTypes.includes(f.type));
    if (validFiles.length !== files.length) {
      setError('Only PNG, JPG, and GIF images are allowed.');
      setTimeout(() => setError(null), 2500);
    }
    setSelectedFiles(validFiles);
    setPreviews(validFiles.map(f => URL.createObjectURL(f)));
    setUploadSuccess(false);
  }

  // Remove file
  function removeFile(idx) {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    newFiles.splice(idx, 1);
    newPreviews.splice(idx, 1);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
  }

  // Handle upload
  async function handleUpload() {
    if (selectedFiles.length === 0) return;
    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });

    try {
      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (data.success) {
        onUpload(data.files); // Pass the uploaded file paths to the parent
        setSelectedFiles([]);
        setPreviews([]);
        setUploadSuccess(true);
        setTimeout(() => setUploadSuccess(false), 2000);
      } else {
        console.error('Upload failed:', data.error);
        // Optionally, show an error message to the user
      }
    } catch (error) {
      console.error('An error occurred during upload:', error);
    } finally {
      setUploading(false);
    }
  }

  return (
    <div className="image-upload-container">
      <input
        id="image-upload-input"
        type="file"
        accept={accept}
        multiple
        onChange={handleChange}
        disabled={uploading}
        className="image-upload-input"
      />

      <label htmlFor="image-upload-input" className="image-upload-label">
        Select Images
      </label>

      {previews.length > 0 && (
        <div className="image-previews">
          {previews.map((src, i) => (
            <div key={i} className="image-preview-item">
              <img src={src} alt="preview" className="image-preview-img" />
              <button
                type="button"
                onClick={() => removeFile(i)}
                className="image-remove-btn"
                aria-label="Remove image"
                disabled={uploading}
              >
                <FiX size={16} color="#b97a3a" />
              </button>
            </div>
          ))}
        </div>
      )}

      <button
        className="image-upload-btn"
        onClick={handleUpload}
        disabled={selectedFiles.length === 0 || uploading}
      >
        {uploading ? 'Uploading...' : 'Upload'}
      </button>

      {uploadSuccess && (
        <div className="image-upload-success">
          <FiCheckCircle size={22} /> Uploaded!
        </div>
      )}

      {error && (
        <div className="image-upload-error" style={{ color: 'red', marginTop: 8, fontSize: '0.95rem' }}>{error}</div>
      )}
    </div>
  );
}

export default ImageUpload; 