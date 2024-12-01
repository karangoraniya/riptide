"use client";

import { useState } from "react";
import Image from "next/image";

interface GameImageGalleryProps {
  images: string[];
  title: string;
}

export default function GameImageGalleryComponent({
  images,
  title,
}: GameImageGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0);

  return (
    <div>
      <div className="aspect-w-16 aspect-h-9 w-full overflow-hidden rounded-lg bg-muted mb-4">
        <Image
          src={images[selectedImage]}
          alt={`${title} - Image ${selectedImage + 1}`}
          width={600}
          height={400}
          className="h-full w-full object-cover object-center"
        />
      </div>
      <div className="grid grid-cols-4 gap-2">
        {images.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`aspect-w-16 aspect-h-9 overflow-hidden rounded-lg bg-muted ${
              selectedImage === index ? "ring-2 ring-primary" : ""
            }`}
          >
            <Image
              src={image}
              alt={`${title} - Thumbnail ${index + 1}`}
              width={150}
              height={100}
              className="h-full w-full object-cover object-center"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
