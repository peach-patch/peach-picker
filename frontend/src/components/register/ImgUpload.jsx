import React, { useState } from "react";
import CropImage from "./croppedImg";

export default function ImageUploadAndCrop() {
  const [imageSrc, setImageSrc] = useState(null);
  const [croppedImage, setCroppedImage] = useState(null);
  const [showCropper, setShowCropper] = useState(false);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setImageSrc(reader.result);
      setShowCropper(true);
    };
    reader.readAsDataURL(file);
  };

  const handleCropComplete = (croppedImageDataUrl) => {
    setCroppedImage(croppedImageDataUrl);
    setShowCropper(false);
  };

  return (
    <div>
      <input type="file" onChange={handleImageUpload} />
      {showCropper && imageSrc && (
        <CropImage imageSrc={imageSrc} onCropComplete={handleCropComplete} />
      )}
      {croppedImage && <img src={croppedImage} alt="Cropped" />}
    </div>
  );
}
