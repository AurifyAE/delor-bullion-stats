import React, { useState, useEffect } from "react";
import { fetchScreenSliders } from "../api/api";

const ParentCarousel = () => {
  const [slider1Images, setSlider1Images] = useState([]);
  const [slider2Images, setSlider2Images] = useState([]);
  const [index1, setIndex1] = useState(0);
  const [index2, setIndex2] = useState(0);
  const [timeout1, setTimeout1] = useState(3000); // Default 3 sec
  const [timeout2, setTimeout2] = useState(3000); // Default 3 sec

  const adminId = import.meta.env.VITE_APP_ADMIN_ID;

  // Function to fetch and sort images
  const fetchOrderedImages = async (adminId) => {
    try {
      const response = await fetchScreenSliders(adminId);
      const { slider1, slider2 } = response.data.sliders;

      // Sorting function that ensures correct order
      const sortImages = (images, isSlider1 = false) => {
        return images.sort((a, b) => {
          const fileA = a.split("-").pop();
          const fileB = b.split("-").pop();

          const numA = parseInt(fileA.match(/\d+/)[0], 10);
          const numB = parseInt(fileB.match(/\d+/)[0], 10);

          if (isSlider1) {
            const isImageA = fileA.includes("image");
            const isImageB = fileB.includes("image");
            if (isImageA && !isImageB) return -1;
            if (!isImageA && isImageB) return 1;
          }

          return numA - numB;
        });
      };

      console.log(slider1.timeout)
      // Set sorted images and timeout values
      setSlider1Images(sortImages([...slider1.images], true));
      setSlider2Images(sortImages([...slider2.images], false));
      setTimeout1(slider1.timeout * 1000 || 3000); // Convert to milliseconds
      setTimeout2(slider2.timeout * 1000 || 3000);
    } catch (error) {
      console.error("Error fetching and sorting images:", error);
    }
  };

  useEffect(() => {
    fetchOrderedImages(adminId);
  }, [adminId]);

  // Slideshow effect for Slider 1
  useEffect(() => {
    if (slider1Images.length === 0) return;
    const interval = setInterval(() => {
      setIndex1((prev) => (prev + 1) % slider1Images.length);
    }, timeout1);
    return () => clearInterval(interval);
  }, [slider1Images, timeout1]);

  // Slideshow effect for Slider 2
  useEffect(() => {
    if (slider2Images.length === 0) return;
    const interval = setInterval(() => {
      setIndex2((prev) => (prev + 1) % slider2Images.length);
    }, timeout2);
    return () => clearInterval(interval);
  }, [slider2Images, timeout2]);

  return (
    <div className="flex flex-row items-center justify-between w-full">
      <div
        style={{
          width: "18vw",
          height: "14vw",
          marginTop: "1.5vw",
          marginBottom: "2.5vw",
        }}
      >
        {slider1Images.length > 0 && (
          <img
            src={slider1Images[index1]}
            alt="Slider 1"
            className="w-full rounded-xl mb-3 object-fit"
          />
        )}
      </div>
      <div
        style={{
          width: "18vw",
          height: "14vw",
          marginTop: "1.5vw",
          marginBottom: "2.5vw",
        }}
      >
        {slider2Images.length > 0 && (
          <img
            src={slider2Images[index2]}
            alt="Slider 2"
            className="w-full rounded-xl mb-3 object-fit"
          />
        )}
      </div>
    </div>
  );
};

export default ParentCarousel;
