"use client";
import { useState } from 'react';
import { FiCheckCircle, FiX } from 'react-icons/fi';
import '@/styles/ImageUpload.css';

// Image Upload Component
function ImageUpload({ onUpload, fileTypes = ['image/png', 'image/jpeg', 'image/jpg', 'image/gif'], accept = "image/png,image/jpeg,image/jpg,image/gif", apiEndpoint = '/api/event/upload' }) {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [previews, setPreviews] = useState([]);
  const [captions, setCaptions] = useState([]);
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
    setCaptions(validFiles.map(() => ''));
    setUploadSuccess(false);
  }

  // Remove file
  function removeFile(idx) {
    const newFiles = [...selectedFiles];
    const newPreviews = [...previews];
    const newCaptions = [...captions];
    newFiles.splice(idx, 1);
    newPreviews.splice(idx, 1);
    newCaptions.splice(idx, 1);
    setSelectedFiles(newFiles);
    setPreviews(newPreviews);
    setCaptions(newCaptions);
  }

  // Handle caption change
  function handleCaptionChange(idx, value) {
    const newCaptions = [...captions];
    newCaptions[idx] = value;
    setCaptions(newCaptions);
  }

  // Handle upload
  async function handleUpload() {
    if (selectedFiles.length === 0) return;
    // Check for empty captions
    if (captions.some(caption => !caption.trim())) {
      setError('Please enter a caption for every image.');
      return;
    }
    setUploading(true);
    setUploadSuccess(false);

    const formData = new FormData();
    selectedFiles.forEach(file => {
      formData.append('files', file);
    });
    captions.forEach(caption => {
      formData.append('captions', caption);
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
        setCaptions([]);
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
        <div className="image-previews" style={{ display: 'flex', gap: 16, flexWrap: 'wrap', justifyContent: 'center' }}>
          {previews.map((src, i) => (
            <div key={i} className="image-caption-card">
              <div style={{ position: 'relative', width: '100%' }}>
                <img src={src} alt="preview" className="image-preview-img" style={{ width: '100%', height: 120, objectFit: 'cover', borderRadius: 8 }} />
                <button
                  type="button"
                  onClick={() => removeFile(i)}
                  className="image-remove-btn"
                  aria-label="Remove image"
                  disabled={uploading}
                  style={{ position: 'absolute', top: 6, right: 6 }}
                >
                  <FiX size={16} color="#b97a3a" />
                </button>
              </div>
              <label className="caption-label" htmlFor={`caption-input-${i}`}>Caption</label>
              <input
                id={`caption-input-${i}`}
                type="text"
                className="caption-input"
                placeholder="Enter caption"
                value={captions[i] || ''}
                onChange={e => handleCaptionChange(i, e.target.value)}
                maxLength={300}
                disabled={uploading}
                style={{ marginTop: 4 }}
              />
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