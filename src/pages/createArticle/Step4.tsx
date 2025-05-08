import { useState } from "react";
import Button from "../../components/common/Button/Button";
import { AuthApi } from "../../api/auth";

const Step4 = ({ onNext, onBack }: { onNext: () => void; onBack: () => void }) => {
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [error, setError] = useState("");

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith("image/")) {
      setImageFile(file);
      setPreviewUrl(URL.createObjectURL(file));
      setError("");

      // ✅ Save image metadata to localStorage
      const imageMeta = {
        name: file.name,
        type: file.type,
        size: file.size,
        lastModified: file.lastModified,
      };
      localStorage.setItem("uploadedImageMeta", JSON.stringify(imageMeta));
      console.log("✅ Image metadata saved to localStorage:", imageMeta);
    } else {
      setError("Please upload a valid image.");
    }
  };

  const handleSubmit = async () => {
    console.log("🚀 Starting submission...");

    if (!imageFile) {
      setError("Image must be uploaded.");
      console.log("❌ No image file selected.");
      return;
    }

    try {
      // ✅ Get other data from localStorage
      const preferences = localStorage.getItem("step1-preferences");
      const title = localStorage.getItem("step2-title");
      const imageMeta = localStorage.getItem("uploadedImageMeta");
      const pdfMeta = localStorage.getItem("uploadedPdfMeta");

      console.log("📝 Retrieved step1-preferences:", preferences);
      console.log("📝 Retrieved step2-title:", title);
      console.log("📝 Retrieved uploadedImageMeta:", imageMeta);
      console.log("📝 Retrieved uploadedPdfMeta:", pdfMeta);

      if (!preferences || !title || !pdfMeta || !imageMeta) {
        console.error("❌ Missing required data in localStorage.");
        setError("Missing required data. Please complete all steps.");
        return;
      }

      // ✅ Build FormData
      const formData = new FormData();
      formData.append("title", title);
      formData.append("tags", JSON.parse(preferences)); // assuming preferences is JSON array
      formData.append("imageFile", imageFile);

      const pdfFileFromMeta = JSON.parse(pdfMeta);
      const pdfFileBlob = await fetch(pdfFileFromMeta.url).then(res => res.blob());
      const pdfFile = new File([pdfFileBlob], pdfFileFromMeta.name, { type: pdfFileFromMeta.type });
      formData.append("contentFile", pdfFile);

      console.log("✅ FormData prepared with:");
      console.log("- title:", title);
      console.log("- tags:", JSON.parse(preferences));
      console.log("- imageFile:", imageFile);
      console.log("- contentFile (from meta):", pdfFile);

      await AuthApi.uploadNews(formData);

      console.log("🎉 Upload successful!");
      onNext();
    } catch (err) {
      console.error("❌ Upload failed:", err);
      setError("Upload failed. Please try again.");
    }
  };

  return (
    <div className="fixed w-full inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-[2px]" />
      <div className="flex flex-col justify-center items-center relative z-10 w-full max-w-3xl mx-auto p-6 overflow-y-auto max-h-[90vh] bg-linear-65 from-[#f2f2f2] to-[#b2d1e8] shadow-xl rounded-2xl">
        <div className="flex flex-col gap-3 items-center justify-center">
          <div className="flex items-center gap-3">
            <img src="images/image_dark.png" alt="Add Cover" />
            <p>Add Cover</p>
          </div>
          <h1>Upload a cover image for your article</h1>
        </div>

        <div className="mt-4 w-full">
          {!imageFile ? (
            <div
              className="flex flex-col items-center justify-center border-2 border-black bg-linear-65 from-[#f2f2f2] to-[#a9bccb] rounded-lg w-full py-10 text-center cursor-pointer relative"
            >
              <p>Drag and Drop</p>
              <p>or</p>
              <label htmlFor="image-upload">
                <Button btnTheme="noBg" value="+ Add image" />
              </label>
              <input
                id="image-upload"
                type="file"
                accept="image/*"
                onChange={handleImageChange}
                className="absolute inset-0 opacity-0 cursor-pointer"
              />
              {error && <p className="text-red-600 text-sm mt-2">{error}</p>}
            </div>
          ) : (
            <div className="relative border-2 border-dashed border-black bg-white rounded-lg w-full py-10 px-6 text-center overflow-y-auto max-h-[300px]">
              <button
                onClick={() => {
                  setImageFile(null);
                  setPreviewUrl(null);
                  setError("");
                }}
                className="absolute top-2 right-4 text-red-600 text-sm underline hover:opacity-80"
              >
                Remove
              </button>

              <div className="mb-4 flex items-center gap-3 justify-center">
                <img
                  src="/images/image_dark.png"
                  alt="image-icon"
                  className="w-6 h-6"
                />
                <div>
                  <p className="text-sm font-medium">{imageFile?.name}</p>
                  <p className="text-xs text-gray-500">
                    {(imageFile?.size! / 1024).toFixed(1)} KB
                  </p>
                </div>
              </div>

              {previewUrl && (
                <div className="h-[300px] overflow-hidden rounded-md border border-gray-300 shadow">
                  <img
                    src={previewUrl}
                    alt="Cover Preview"
                    className="max-h-full w-full object-contain"
                  />
                </div>
              )}
            </div>
          )}
        </div>

        <div className="flex justify-between items-center w-full mt-6">
          <Button
            onClick={onBack}
            btnTheme="borderBlack"
            chevronPosition="left"
            value="Back"
          />
          <Button
            onClick={handleSubmit}
            disabled={!imageFile}
            btnTheme="blackBtn"
            chevronPosition="right"
            value="Submit"
            className={!imageFile ? "cursor-not-allowed opacity-50" : ""}
          />
        </div>
      </div>
    </div>
  );
};

export default Step4;
