import React, { useRef, useState } from "react";
import Cropper from "react-cropper";
import "cropperjs/dist/cropper.css";

export default function croppedImg({ imageSrc, onCropComplete }) {
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
        aspectRatio={1}
        viewMode={1}
        guides={false}
        ref={cropperRef}
      />
      <button onClick={getCroppedImage}>Crop Image</button>
    </div>
  );
}
