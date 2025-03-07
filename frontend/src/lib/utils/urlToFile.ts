export const urlToFile = async (imageUrl: string, filename: string) => {
  const response = await fetch(imageUrl);
  const blob = await response.blob();
  const mimeType = blob.type || "image/jpeg"; 
  return new File([blob], filename, { type: mimeType });
};
