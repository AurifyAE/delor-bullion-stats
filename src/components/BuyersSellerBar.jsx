import React from "react";
import { Box, Typography } from "@mui/material";

const BuyersSellersBar = ({ logo }) => {
  const linkUrl = "https://www.aurify.ae";

  return (
    <Box
      sx={{
        width: "100%",
        background: "#4a0d1c",
        borderRadius: "8px",
        padding: "0.5vw 2vw",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: "0.5vw",
        color: "#fff",
      }}
    >
      {/* Powered By Text */}
      <Typography
        sx={{
          fontSize: "0.9vw",
          fontWeight: 500,
          whiteSpace: "nowrap",
        }}
      >
        Powered by

        <a href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"> www.aurify.ae</a>
      </Typography>

      {/* Logo */}
      {logo && (
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{ display: "flex", alignItems: "center" }}
        >
          <img
            src={logo}
            alt="aurify-logo"
            style={{
              width: "6vw",
              height: "auto",
            }}
          />
        </a>
      )}
    </Box>
  );
};

export default BuyersSellersBar;
