const { Storage } = require('@google-cloud/storage');

const storage = new Storage({
  projectId: process.env.PROJECT_ID || "tactical-codex-448305-v5",
  keyFilename: './tactical-codex-448305-v5-6c8882c85443.json' // or use GOOGLE_APPLICATION_CREDENTIALS
});

const bucket = storage.bucket(process.env.GCS_BUCKET_NAME || "social-app-images");

module.exports = { storage, bucket };
