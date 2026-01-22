import React, { useState, useEffect } from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const SpotRate = () => {
  const { goldData, silverData } = useSpotRate();

  // --------------------------
  // Previous values & direction
  // --------------------------
  const [prevGoldBid, setPrevGoldBid] = useState(null);
  const [goldBidDir, setGoldBidDir] = useState("normal");
  const [prevGoldAsk, setPrevGoldAsk] = useState(null);
  const [goldAskDir, setGoldAskDir] = useState("normal");

  const [prevSilverBid, setPrevSilverBid] = useState(null);
  const [silverBidDir, setSilverBidDir] = useState("normal");
  const [prevSilverAsk, setPrevSilverAsk] = useState(null);
  const [silverAskDir, setSilverAskDir] = useState("normal");

  // --------------------------
  // Compute direction for flash effect
  // --------------------------
  const computeDirection = (prev, current) => {
    if (prev === null) return "normal";
    if (current > prev) return "up";
    if (current < prev) return "down";
    return "normal";
  };

  useEffect(() => {
    if (goldData.bid != null) {
      const dir = computeDirection(prevGoldBid, goldData.bid);
      setGoldBidDir(dir);
      setPrevGoldBid(goldData.bid);
      if (dir !== "normal") setTimeout(() => setGoldBidDir("normal"), 500);
    }
  }, [goldData.bid]);

  useEffect(() => {
    if (goldData.ask != null) {
      const dir = computeDirection(prevGoldAsk, goldData.ask);
      setGoldAskDir(dir);
      setPrevGoldAsk(goldData.ask);
      if (dir !== "normal") setTimeout(() => setGoldAskDir("normal"), 500);
    }
  }, [goldData.ask]);

  useEffect(() => {
    if (silverData.bid != null) {
      const dir = computeDirection(prevSilverBid, silverData.bid);
      setSilverBidDir(dir);
      setPrevSilverBid(silverData.bid);
      if (dir !== "normal") setTimeout(() => setSilverBidDir("normal"), 500);
    }
  }, [silverData.bid]);

  useEffect(() => {
    if (silverData.ask != null) {
      const dir = computeDirection(prevSilverAsk, silverData.ask);
      setSilverAskDir(dir);
      setPrevSilverAsk(silverData.ask);
      if (dir !== "normal") setTimeout(() => setSilverAskDir("normal"), 500);
    }
  }, [silverData.ask]);

  // --------------------------
  // Rate box with dynamic style
  // --------------------------
  const getRateStyles = (dir) => {
    switch (dir) {
      case "up":
        return { backgroundColor: "#1bbf4a", border: "1px solid #1bbf4a", color: "#fff" };
      case "down":
        return { backgroundColor: "#c20000", border: "1px solid #c20000", color: "#fff" };
      default:
        return { backgroundColor: "transparent", border: "1px solid #f0cfa0", color: "#fff" };
    }
  };

  const priceBox = (value, direction) => (
    <Box
      sx={{
        fontSize: "2vw",
        fontWeight: 700,
        padding: "0.6vw 1.2vw",
        borderRadius: "6px",
        minWidth: "10vw",
        textAlign: "center",
        transition: "all 0.3s ease",
        ...getRateStyles(direction),
      }}
    >
      {value}
    </Box>
  );

  const renderRow = (label, data, bidDir, askDir) => (
    <Box
      sx={{
        display: "grid",
        gridTemplateColumns: "1fr 1fr 1fr",
        gap: "20px",
        alignItems: "center",
        border: "1px solid #f0cfa0",
        borderRadius: "4px",
        padding: "1vw",
      }}
    >
      <Typography sx={{ fontSize: "2vw", fontWeight: 700 }}>{label}</Typography>
      <Box textAlign="center">{priceBox(data.bid, bidDir)}</Box>
      <Box textAlign="center">{priceBox(data.ask, askDir)}</Box>
    </Box>
  );

  return (
    <Box sx={{ padding: "2vw", color: "#fff" }}>
      <Typography
        sx={{
          textAlign: "center",
          fontSize: "2.2vw",
          fontWeight: 800,
          color: "#e7c27a",
          pb: "1vw",
          borderBottom: "1px solid #a7a7a7",
        }}
      >
        SPOT RATE
      </Typography>

      <Box display="flex" justifyContent="space-around" mb="1.5vw" mt="1.2vw">
        <Box alignItems="center" display="flex" gap="0.5vw">
          <Box sx={{ background: "#c20000", px: "0.8vw", borderRadius: "4px", fontSize: "1.2vw" }}>
            Low
          </Box>

          <Box sx={{ width: "1.2vw", aspectRatio: "1 / 1" }}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" > <circle cx="12" cy="12" r="11" fill="none" stroke="#c20000" strokeWidth="2" /> <path d="M7.41 8.59 12 13.17l4.59-4.58L18 10l-6 6-6-6z" fill="#c20000" /> </svg> </Box>
          <Typography sx={{ fontSize: "1.2vw" }}>{goldData.low}</Typography>
        </Box>

        <Box display="flex" alignItems="center" gap="0.5vw">
          <Box sx={{ background: "#00a000", px: "0.8vw", borderRadius: "4px", fontSize: "1.2vw" }}>
            High
          </Box>
          <Box sx={{ width: "1.2vw", aspectRatio: "1 / 1" }}> <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="100%" height="100%" preserveAspectRatio="xMidYMid meet" > <circle cx="12" cy="12" r="11" fill="none" stroke="#1bbf4a" stroke-width="2" /> <path d="M7.41 15.41 12 10.83l4.59 4.58L18 14l-6-6-6 6z" fill="#1bbf4a" /> </svg> </Box>
          <Typography sx={{ fontSize: "1.2vw" }}>{goldData.high}</Typography>
        </Box>
      </Box>

      <Box display="flex" justifyContent='space-around' gap="0.5vw">
        <Typography sx={{ fontSize: "1.2vw", color: "#e7c27a", mb: "1vw", width: "15%" }}>
        </Typography>
        <Typography sx={{ fontSize: "1.2vw", color: "#e7c27a", mb: "1vw", fontWeight: '700' }}>
          <span className="bg-[#f0cfa0] text-[#330411] px-1.5 mx-2 rounded-md">
            $</span>

          BID Oz
        </Typography>
        <Typography sx={{ fontSize: "1.2vw", color: "#e7c27a", mb: "1vw", fontWeight: '700' }}>
          <span className="bg-[#f0cfa0] text-[#330411] px-1.5 mx-2 rounded-md">
            $</span>
          ASK Oz
        </Typography>
      </Box>

      {renderRow("GOLD", goldData, goldBidDir, goldAskDir)}
      {renderRow("SILVER", silverData, silverBidDir, silverAskDir)}
    </Box>
  );
};

export default SpotRate;
