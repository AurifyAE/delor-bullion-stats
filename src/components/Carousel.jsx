import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import image1 from "../assets/image1.png";
import image2 from "../assets/image2.png";
import image3 from "../assets/image3.png";
import image4 from "../assets/image4.png";
import image5 from "../assets/image5.png";
import image6 from "../assets/image6.png";
import image7 from "../assets/image7.png";
import image8 from "../assets/image8.png";
import image9 from "../assets/image9.png";
import image10 from "../assets/image10.png";
import image11 from "../assets/image11.png";
import image12 from "../assets/image12.png";
import image13 from "../assets/11.png";
import image14 from "../assets/12.jpg";
import image15 from "../assets/13.png";
import image16 from "../assets/14.jpg";
import image17 from "../assets/15.png";
import image18 from "../assets/16.png";
import image19 from "../assets/17.png";
import image20 from "../assets/18.png";
import image21 from "../assets/19.png";
import image22 from "../assets/20.png";
import image23 from "../assets/21.png";

const images = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
  image16,
  image17,
  image18,
  image19,
  image20,
  image21,
  image22,
  image23,
];

const Carousel = ({ currentIndex }) => {
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

export default Carousel;
