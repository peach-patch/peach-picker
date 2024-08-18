import React, { useRef } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function CropImage({ imageSrc, onCropComplete }) {
  const cropperRef = useRef(null);

  const getCroppedImage = () => {
    if (cropperRef.current) {
      const cropper = cropperRef.current.cropper;
      const croppedCanvas = cropper.getCroppedCanvas();
      onCropComplete(croppedCanvas.toDataURL());
    }
  };

  return (
    <div>
      <Cropper
        src={imageSrc}
        style={{ height: 400, width: "100%" }}
        aspectRatio={1} // 정사각형 비율
        viewMode={1}
        guides={false}
        ref={cropperRef}
      />
      <button onClick={getCroppedImage}>Crop Image</button>
    </div>
  );
}
