import axiosInstance from "../api/axiosInstance";

export const uploadImage = async (file) => {
  const formData = new FormData();
  formData.append("image", file);

  const { data } = await axiosInstance.post("/uploads", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return data;
};

export const deleteUploadedImage = async (publicId) => {
  const { data } = await axiosInstance.delete("/uploads", { data: { publicId } });
  return data;
};