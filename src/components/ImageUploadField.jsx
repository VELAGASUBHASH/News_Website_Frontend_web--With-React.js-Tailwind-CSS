import { useState } from "react";
import { uploadImage } from "../services/uploadService";
import { getPlaceholderImage } from "../utils/placeholderImage";

const ImageUploadField = ({ value, onChange }) => {
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState(null);

  const handleFileChange = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);
    try {
      const data = await uploadImage(file);
      onChange(data.image?.url ?? "");
    } catch (err) {
      setError(err.response?.data?.message || "Image upload failed. Please try again.");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium text-ink mb-1">Cover Image</label>
      <div className="flex items-center gap-4">
        <img
          src={value || getPlaceholderImage("No image")}
          alt="Cover preview"
          className="w-24 h-16 object-cover rounded-md border border-gray-200 bg-gray-50"
        />
        <label className="cursor-pointer text-sm font-medium text-primary hover:underline">
          {uploading ? "Uploading..." : "Upload Image"}
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={uploading}
            className="hidden"
          />
        </label>
      </div>
      {error && <p className="text-sm text-primary mt-1">{error}</p>}
    </div>
  );
};

export default ImageUploadField;