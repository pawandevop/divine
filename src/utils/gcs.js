const { Storage } = require('@google-cloud/storage');
let storage, bucket;

/**
 * Uploads a buffer to GCS and returns the public URL, or null if not configured.
 * @param {Buffer} buffer
 * @param {string} destination
 * @param {string} mimetype
 * @returns {Promise<string|null>}
 */
async function uploadBufferToGCS(buffer, destination, mimetype) {
  const GCLOUD_PROJECT_ID = process.env.GCLOUD_PROJECT_ID;
  const GCLOUD_BUCKET = process.env.GCLOUD_BUCKET;
  const GCLOUD_KEYFILE = process.env.GCLOUD_KEYFILE;

  // If not configured, just return null (no error thrown)
  if (!GCLOUD_PROJECT_ID || !GCLOUD_BUCKET) {
    // Optionally log a warning here
    return null;
  }

  // Use key file only if present (for local dev), otherwise use default credentials (for Cloud Run)
  if (!storage || !bucket) {
    const options = { projectId: GCLOUD_PROJECT_ID };
    if (GCLOUD_KEYFILE) options.keyFilename = GCLOUD_KEYFILE;
    storage = new Storage(options);
    bucket = storage.bucket(GCLOUD_BUCKET);
  }

  const file = bucket.file(destination);
  await file.save(buffer, {
    metadata: { contentType: mimetype },
    public: true,
    resumable: false,
  });
  await file.makePublic();
  return `https://storage.googleapis.com/${GCLOUD_BUCKET}/${destination}`;
}

/**
 * Deletes a file from GCS by its destination path (relative to the bucket root).
 * @param {string} destination
 * @returns {Promise<boolean>} true if deleted, false if not found or error
 */
async function deleteFromGCS(destination) {
  const GCLOUD_PROJECT_ID = process.env.GCLOUD_PROJECT_ID;
  const GCLOUD_BUCKET = process.env.GCLOUD_BUCKET;
  const GCLOUD_KEYFILE = process.env.GCLOUD_KEYFILE;

  if (!GCLOUD_PROJECT_ID || !GCLOUD_BUCKET) {
    return false;
  }

  if (!storage || !bucket) {
    const options = { projectId: GCLOUD_PROJECT_ID };
    if (GCLOUD_KEYFILE) options.keyFilename = GCLOUD_KEYFILE;
    storage = new Storage(options);
    bucket = storage.bucket(GCLOUD_BUCKET);
  }

  try {
    const file = bucket.file(destination);
    await file.delete();
    return true;
  } catch (err) {
    // File may not exist or other error
    return false;
  }
}

module.exports = { uploadBufferToGCS, deleteFromGCS }; 