import React from "react";
import { Box, Typography } from "@mui/material";

const BuyersSellersBar = ({
  buyersPercent = 0,
  sellersPercent = 0,
  logo,
}) => {
  const linkUrl = "https://www.aurify.ae";

  return (
    <Box
      sx={{
        width: "100%",
        background: "#4a0d1c",
        borderRadius: "8px",
        padding: "1.2vw 2vw",
        color: "#fff",
      }}
    >
      {/* Top Row */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: "0.6vw",
        }}
      >
        <Typography sx={{ fontSize: "1.2vw", fontWeight: 700 }}>
          BUYERS
        </Typography>

        <Typography
          sx={{
            fontSize: "1.3vw",
            fontWeight: 700,
            color: "#ff4d4d",
          }}
        >
          {buyersPercent}%
        </Typography>

        <Typography sx={{ fontSize: "1.2vw", fontWeight: 700 }}>
          SELLERS
        </Typography>
      </Box>

      {/* Progress Bar */}
      <Box
        sx={{
          width: "100%",
          height: "0.35vw",
          backgroundColor: "#ff4d4d",
          borderRadius: "10px",
          mb: "0.8vw",
        }}
      />

      {/* Bottom Row */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Typography
          sx={{ fontSize: "1vw", color: "#00ff6a", fontWeight: 600 }}
        >
          {buyersPercent}%
        </Typography>

        {/* Center Logo (Clickable) */}
        <Box
          sx={{
            width: "7vw",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {logo && (
            <a
              href={linkUrl}
              target="_blank"
              rel="noopener noreferrer"
              style={{ display: "block", width: "100%" }}
            >
              <img
                src={logo}
                alt="aurify-logo"
                style={{ width: "100%", height: "auto" }}
              />
            </a>
          )}
        </Box>

        <Typography
          sx={{ fontSize: "1vw", color: "#ff4d4d", fontWeight: 600 }}
        >
          {sellersPercent}%
        </Typography>
      </Box>

      {/* Footer Link */}
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "0.9vw",
          opacity: 0.8,
          mt: "0.2vw",
          letterSpacing: "0.15em",
        }}
      >
        <a
          href={linkUrl}
          target="_blank"
          rel="noopener noreferrer"
          style={{
            color: "inherit",
            textDecoration: "none",
          }}
        >
          www.aurify.ae
        </a>
      </Typography>
    </Box>
  );
};

export default BuyersSellersBar;
