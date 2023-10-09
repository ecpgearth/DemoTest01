"use client";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import ProfilePrivew from "./profile-picture-priview-modal";

const ProfilePictureChange = () => {
  // State to store the selected image file, the image preview URL, and the previous profile image URL
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

  // Function to handle file input change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Display a preview of the selected image
      const imageURL = URL.createObjectURL(file);
      setPreviewImage(imageURL);
      setSelectedImage(file);
    }
  };

  // Function to upload the selected image through an API
  const handleImageUpload = async () => {
    if (selectedImage) {
      try {
        setLoading(true);
        const formData = new FormData();
        formData.append("image", selectedImage);

        // Replace 'your-api-endpoint' with the actual API endpoint to upload the image
        const response = await fetch("/api/edit/profile-picture", {
          method: "POST",

          body: formData,
        });

        const result = await response.json();

        console.log(response);
        if (response.status === 200) {
          // Handle successful image upload
          console.log(result);
        } else {
          console.log(result);
        }
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
        setSelectedImage(null);
        setPreviewImage(null);
      }
    }
  };

  return (
    <div className="flex flex-col items-center justify-center mt-8">
      <Image
        src="/next.svg"
        height={96}
        priority
        width={96}
        alt="eg-demo"
        className="mb-4 rounded-lg shadow-md object-contain"
      />
      <span>
        Edit Profile Picture?{" "}
        <label
          htmlFor="edit"
          className="text-red-600 font-medium hover:underline cursor-pointer"
        >
          Edit
        </label>
      </span>
      {previewImage && (
        <>
          <ProfilePrivew
            loading={isLoading}
            imagePre={previewImage}
            handleUpload={handleImageUpload}
            setPreviewImage={setPreviewImage}
          />
        </>
      )}
      <input
        type="file"
        accept="image/*"
        className="mb-4 hidden"
        id="edit"
        onChange={handleImageChange}
      />
    </div>
  );
};

export default ProfilePictureChange;
