export const uploadToCloudinary = async (
  file: {
    uri: string;
    name: string;
    type: string;
  },
  uploadPreset: string,
  cloudName: string
): Promise<string> => {
  try {
    const formData = new FormData();

    formData.append("file", {
      uri: file.uri,
      name: file.name,
      type: file.type, // MUST be like "image/jpeg" or "video/mp4"
    } as any);

    formData.append("upload_preset", uploadPreset);

    const response = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/auto/upload`,
      {
        method: "POST",
        body: formData,
        // 🔥 DO NOT set headers — Expo sets them automatically for FormData
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error("Cloudinary error response:", data);
      throw new Error(data?.error?.message || "Upload failed");
    }

    return data.secure_url;
  } catch (error: any) {
    console.error("Cloudinary upload error:", error.message);
    throw error;
  }
};




