import React from "react";
import { Box, Typography } from "@mui/material";

const NewsTicker = ({ newsItems = [] }) => {


  return (
    <Box
      sx={{
        width: "100%",
        height: "3.5vw",
        overflow: "hidden",
        background: "#4a0d1c",
        borderRadius: "6px",
        display: "flex",
        alignItems: "center",
        padding: "2.5vw 1.5vw",
        // mt:"auto"
        mt: "1vw"
      }}
    >
      {/* Scrolling Container */}
      <Box
        sx={{
          whiteSpace: "nowrap",
          display: "inline-block",
          animation: "ticker 60s linear infinite",
        }}
      >
        {newsItems.map((item, index) => (
          <Typography
            key={index}
            component="span"
            sx={{
              color: "#ffffff",
              fontSize: "2vw",
              fontStyle: "italic",
              fontWeight: 500,
              marginRight: "6vw",
            }}
          >
            {item.description}
          </Typography>
        ))}
      </Box>

      {/* Animation */}
      <style>
        {`
          @keyframes ticker {
            0% {
              transform: translateX(30%);
            }
            100% {
              transform: translateX(-100%);
            }
          }
        `}
      </style>
    </Box>
  );
};

export default NewsTicker;
