import React from "react";
import { Box, Typography } from "@mui/material";
import { useSpotRate } from "../context/SpotRateContext";

const headerStyle = {
  display: "grid",
  gridTemplateColumns: "34% 22% 22% 22%",
  background: "#f0cfa0",
  padding: "0.2vw 1vw",
  color: "#4a0d1c",
  fontWeight: "700",
};

const rowStyle = {
  display: "grid",
  gridTemplateColumns: "34% 22% 22% 22%",
  alignItems: "center",
  padding: "0.2vw 1vw",
  background: "#4b0f1f",
  color: "white",
};

const OUNCE = 31.103;
const AED = 3.674;

const UNIT_MULTIPLIER = {
  GM: 1,
  KG: 1000,
  TTB: 116.64,
  TOLA: 11.664,
  OZ: 31.103,
};

const CommodityTable = ({ commodities }) => {
  const { goldData, silverData } = useSpotRate();

  const getSpot = (metal) => {
    if (metal.includes("gold")) return goldData;
    if (metal.includes("silver")) return silverData;
    return null;
  };

  const purityFactor = (purity) =>
    purity ? purity / Math.pow(10, purity.toString().length) : 1;

  const buildTableData = () => {
    if (!commodities?.length) return [];

    return commodities.map((item) => {
      const spot = getSpot(item.metal.toLowerCase());
      if (!spot) return null;

      const multiplier = UNIT_MULTIPLIER[item.weight] || 1;
      const purity = purityFactor(item.purity);

      const bid =
        ((spot.bid / OUNCE) * AED * multiplier * item.unit * purity) +
        (parseFloat(item.buyCharge) || 0) +
        (parseFloat(item.buyPremium) || 0);

      const ask =
        ((spot.ask / OUNCE) * AED * multiplier * item.unit * purity) +
        (parseFloat(item.sellCharge) || 0) +
        (parseFloat(item.sellPremium) || 0);
      console.log(item.metal)

      return {


        name:
          item.metal === "Gold Ten TOLA"
            ? "Gold"
            // : item.metal.toUpperCase(),
            : item.metal,
        purity: item.metal === "Gold Ten TOLA"
          ? "TEN TOLA"
          : item.purity,
        weight: `${item.unit} ${item.weight}`,
        bid,
        ask,
      };
    }).filter(Boolean);
  };


  const data = buildTableData();

  return (
    <Box sx={{ width: "100%", marginTop: "1vw" }}>
      {/* HEADER */}
      <Box sx={headerStyle}>
        <Typography fontSize="2vw" fontWeight='600' textAlign='start'>COMMODITY</Typography>
        <Typography fontSize="2vw" fontWeight='600' textAlign="start">WEIGHT</Typography>
        <Typography fontSize="2vw" fontWeight='600' textAlign="start">
          BID <span style={{ fontSize: "1vw" }}>AED</span>
        </Typography>
        <Typography fontSize="2vw" fontWeight='600' textAlign="start">
          ASK <span style={{ fontSize: "1vw" }}>AED</span>
        </Typography>
      </Box>

      <Box sx={{ height: "0.6vw" }} />

      {/* ROWS */}
      {data.map((row, i) => (
        <Box key={i}>
          <Box sx={rowStyle}>
            <Typography fontSize="2vw" textAlign='start' fontWeight="700">
              {row.name}
              {row.purity && (
                <sub style={{ fontSize: "0.8vw", marginLeft: "0.4vw" }}>
                  {row.purity}
                </sub>
              )}
            </Typography>

            <Typography fontSize="2vw" textAlign="start" fontWeight='600'>
              {row.weight}

              {console.log(row.weight)}

            </Typography>

            <Typography fontSize="2vw" textAlign="start" fontWeight='600'>
              {/* {Math.round(row.bid).toLocaleString()} */}


              {row.name == 'Silver' && row.weight == '1 GM' ?

                row.bid.toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })

                :

                row.bid.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })

              }

            </Typography>

            <Typography fontSize="2vw" textAlign="start" fontWeight='600'>
              {/* {Math.round(row.ask).toLocaleString()} */}

              {row.name == 'Silver' && row.weight == '1 GM' ?

                row.ask.toLocaleString(undefined, {
                  minimumFractionDigits: 3,
                  maximumFractionDigits: 3,
                })

                :

                row.ask.toLocaleString(undefined, {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                })

              }
            </Typography>
          </Box>

          <Box sx={{ height: "0.4vw" }} />
        </Box>
      ))}
    </Box>
  );
};

export default CommodityTable;
