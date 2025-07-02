import '@/styles/common.css';

export default function Loading() {
  return (
    <div className="loading_page">
      <div className="loading_content">
        <span
          className="spinner-border loading_spinner"
          role="status"
          aria-label="Loading"
        />
        <div className="loading_heading">
          Loading...
        </div>
        <div className="loading_desc">
          Please wait while we load the content for you.
        </div>
      </div>
    </div>
  );
} 