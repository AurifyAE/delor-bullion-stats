import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "40% 20% 20% 20%",
  alignItems: "center",
  padding: "1vw",
  borderRadius: "10px",
  background: "#4b0f1f",
  color: "white",
};

const headerStyle = {
  display: "grid",
  gridTemplateColumns: "40% 20% 20% 20%",
  background: "#f0cfa0",
  padding: "1vw",
  borderRadius: "6px",
  color: "#4a0d1c",
  fontWeight: "700",
};

const CommodityTable = () => {
  const { goldData, silverData } = useSpotRate();

  const data = [
    {
      name: "GOLD",
      purity: "24k",
      weight: "1 GM",
      bid: 569.64,
      ask: 570.71,
    },
    {
      name: "GOLD",
      purity: "995",
      weight: "1 KG",
      bid: 566795,
      ask: 567852,
    },
    {
      name: "GOLD",
      purity: "9999",
      weight: "1 KG",
      bid: 569643,
      ask: 570705,
    },
    {
      name: "GOLD",
      purity: "TEN TOLA",
      weight: "1 TTB",
      bid: 66377,
      ask: 66500,
    },
    {
      name: "SILVER",
      purity: "",
      weight: "1 KG",
      bid: 11082,
      ask: 11144,
    },
    {
      name: "SILVER",
      purity: "",
      weight: "1 GM",
      bid: 10.16,
      ask: 10.19,
    },
  ];

  return (
    <Box sx={{ width: "100%" }}>
      {/* HEADER */}
      <Box sx={headerStyle}>
        <Typography fontWeight={700} fontSize="1.3vw">COMMODITY</Typography>
        <Typography fontWeight={700} fontSize="1.3vw" textAlign="center">WEIGHT</Typography>
        <Typography fontWeight={700} fontSize="1.3vw" textAlign="center">
          BID <span style={{ fontSize: "1vw" }}>AED</span>
        </Typography>
        <Typography fontWeight={700} fontSize="1.3vw" textAlign="center">
          ASK <span style={{ fontSize: "1vw" }}>AED</span>
        </Typography>
      </Box>

      <Box sx={{ height: "0.6vw" }} />

      {/* ROWS */}
      {data.map((row, i) => (
        <Box key={i}>
          <Box sx={rowStyle}>
            {/* COMMODITY */}
            <Typography fontSize="1.3vw" fontWeight="700">
              {row.name}
              {row.purity && (
                <sup
                  style={{
                    fontSize: "1vw",
                    marginLeft: "0.4vw",
                  }}
                >
                  {row.purity}
                </sup>
              )}
            </Typography>

            {/* WEIGHT */}
            <Typography
              fontSize="1.3vw"
              fontWeight="700"
              textAlign="center"
            >
              {row.weight}
            </Typography>

            {/* BID */}
            <Typography
              fontSize="1.3vw"
              fontWeight="700"
              textAlign="center"
            >
              {row.bid.toLocaleString()}
            </Typography>

            {/* ASK */}
            <Typography
              fontSize="1.3vw"
              fontWeight="700"
              textAlign="center"
            >
              {row.ask.toLocaleString()}
            </Typography>
          </Box>

          <Box sx={{ height: "0.5vw" }} />
        </Box>
      ))}
    </Box>
  );
};

export default CommodityTable;
