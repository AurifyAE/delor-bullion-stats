import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import image1 from "../assets/1.png";
import image2 from "../assets/2.jpg";
import image3 from "../assets/3.png";
import image4 from "../assets/4.png";
import image5 from "../assets/5.png";
import image6 from "../assets/6.png";
import image7 from "../assets/7.png";
import image8 from "../assets/8.png";
import image9 from "../assets/9.png";
import image10 from "../assets/10.png";

const images = [image1, image2, image3, image4, image5, image6, image7, image8, image9, image10,];

const Carousel2 = ({ currentIndex }) => {
  // const [currentIndex, setCurrentIndex] = useState(0);

  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  //   }, 3000); // Change image every 3 seconds

  //   return () => clearInterval(interval); // Cleanup interval on component unmount
  // }, []);

  return (
    <Box
      className="flex flex-row items-center justify-center relative w-full"
      sx={{
        width: "16vw",
        height: "12vw",
        marginTop: "2.5vw",
        marginBottom: "2.5vw",
      }}
    >
      <img
        src={images[currentIndex]}
        alt={`Carousel image ${currentIndex + 1}`}
        className="w-full rounded-xl mb-3 object-fit"
      />
    </Box>
  );
};

export default Carousel2;
