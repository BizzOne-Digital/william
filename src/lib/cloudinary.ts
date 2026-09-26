import { v2 as cloudinary } from "cloudinary";

export function configureCloudinary() {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
    secure: true,
  });
  return cloudinary;
}

export async function uploadImageBuffer(buffer: Buffer, folder: string) {
  const cld = configureCloudinary();
  return new Promise<string>((resolve, reject) => {
    const stream = cld.uploader.upload_stream(
      { folder: `intense-dropz/${folder}`, resource_type: "image" },
      (err, result) => {
        if (err || !result?.secure_url) reject(err ?? new Error("Upload failed"));
        else resolve(result.secure_url);
      },
    );
    stream.end(buffer);
  });
}
