import React from "react";
import {
  Box,
  Typography,
} from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "25% 25% 25% 25%",
  alignItems: "center",
  padding: "0.2vw 1vw",
  // borderRadius: "10px",
  background: "#4b0f1f",
  color: "white",
};

const headerStyle = {
  display: "grid",
  gridTemplateColumns: "25% 25% 25% 25%",
  background: "#f0cfa0",
  padding: "0.2vw 1vw",
  // borderRadius: "6px",
  color: "#4a0d1c",
  fontWeight: "700",
};

const CommodityTable = () => {
  const { goldData, silverData } = useSpotRate();

  const buildTableData = () => {
    if (!goldData || !silverData) return [];

    const AED_CONVERSION = 3.674;
    const OUNCE = 31.103;

    const rows = [];

    const pushRow = ({
      name,
      purity,
      weightLabel,
      unitMultiplier,
      spot,
    }) => {
      const bid = (spot.bid / OUNCE) * AED_CONVERSION * unitMultiplier;
      const ask = (spot.ask / OUNCE) * AED_CONVERSION * unitMultiplier;

      rows.push({
        name,
        purity,
        weight: weightLabel,
        bid,
        ask,
      });
    };

    /* ---------- GOLD ---------- */
    pushRow({
      name: "GOLD",
      purity: "24k",
      weightLabel: "1 GM",
      unitMultiplier: 1,
      spot: goldData,
    });

    pushRow({
      name: "GOLD",
      purity: "995",
      weightLabel: "1 KG",
      unitMultiplier: 1000 * 0.995,
      spot: goldData,
    });

    pushRow({
      name: "GOLD",
      purity: "9999",
      weightLabel: "1 KG",
      unitMultiplier: 1000 * 0.9999,
      spot: goldData,
    });

    pushRow({
      name: "GOLD",
      purity: "TEN TOLA",
      weightLabel: "1 TTB",
      unitMultiplier: 116.64,
      spot: goldData,
    });

    /* ---------- SILVER ---------- */
    pushRow({
      name: "SILVER",
      purity: "",
      weightLabel: "1 KG",
      unitMultiplier: 1000,
      spot: silverData,
    });

    pushRow({
      name: "SILVER",
      purity: "",
      weightLabel: "1 GM",
      unitMultiplier: 1,
      spot: silverData,
    });

    return rows;
  };
  const data = buildTableData();


  return (
    <Box sx={{ width: "100%", marginTop: '3vw' }}>
      {/* HEADER */}
      <Box sx={headerStyle}>
        <Typography fontWeight={700} fontSize="2vw" textAlign="start">COMMODITY</Typography>
        <Typography fontWeight={700} fontSize="2vw" textAlign="center">WEIGHT</Typography>
        <Typography fontWeight={700} fontSize="2vw" textAlign="center">
          BID <span style={{ fontSize: "1vw" }}>AED</span>
        </Typography>
        <Typography fontWeight={700} fontSize="2vw" textAlign="center">
          ASK <span style={{ fontSize: "1vw" }}>AED</span>
        </Typography>
      </Box>

      <Box sx={{ height: "0.6vw" }} />

      {/* ROWS */}
      {data.map((row, i) => (
        <Box key={i}>
          <Box sx={rowStyle}>
            {/* COMMODITY */}
            <Typography fontSize="2vw" fontWeight="700" textAlign="start">
              {row.name}
              {row.purity && (
                <sub
                  style={{
                    fontSize: "0.8vw",
                    marginLeft: "0.4vw",
                  }}
                >
                  {row.purity}
                </sub>
              )}
            </Typography>

            {/* WEIGHT */}
            <Typography
              fontSize="2vw"
              fontWeight="700"
              textAlign="center"
            >
              {row.weight}
            </Typography>

            {/* BID */}
            <Typography
              fontSize="2vw"
              fontWeight="700"
              textAlign="center"
            >
              {row.bid ? Math.round(row.bid).toLocaleString() : "--"}

            </Typography>

            {/* ASK */}
            <Typography
              fontSize="2vw"
              fontWeight="700"
              textAlign="center"
            >
              {row.ask ? Math.round(row.ask).toLocaleString() : "--"}
            </Typography>
          </Box>

          <Box sx={{ height: "0.4vw" }} />
        </Box>
      ))}
    </Box>
  );
};

export default CommodityTable;
