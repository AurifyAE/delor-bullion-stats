import React, { useState, useEffect } from "react";
import { Box, Typography, Grid } from "@mui/material";

const Clock = () => {
  const [time, setTime] = useState({
    newYork: "",
    london: "",
    india: "",
  });

  useEffect(() => {
    const updateTimes = () => {
      const now = new Date();

      // Get New York time (24-hour format)
      const newYorkTime = new Intl.DateTimeFormat("en-US", {
        timeZone: "America/New_York",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);

      // Get London time (24-hour format)
      const londonTime = new Intl.DateTimeFormat("en-GB", {
        timeZone: "Europe/London",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);

      // Get India time (24-hour format)
      const indiaTime = new Intl.DateTimeFormat("en-IN", {
        timeZone: "Asia/Kolkata",
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      }).format(now);

      setTime({
        newYork: newYorkTime,
        london: londonTime,
        india: indiaTime,
      });
    };

    // Update the time every minute
    const intervalId = setInterval(updateTimes, 60000);
    updateTimes(); // Initialize immediately

    return () => clearInterval(intervalId); // Cleanup on component unmount
  }, []);

  return (
    <Box className="mx-auto text-center mt-2">
      <Grid container spacing={3}>
        {/* New York Time */}
        <Grid item xs={12} sm={4}>
          <Box className="flex flex-col justify-center items-center">
            <Typography
              sx={{
                fontSize: "2.7vw",
                fontWeight: "bold",
                color: "#FFFFFF",
                fontFamily: "serif",
              }}
            >
              {time.newYork}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.7vw",
                fontWeight: "bold",
                color: "black",
                fontFamily: "serif",
                backgroundColor: "#DAB437",
                width: "max-content",
                padding: "0px 15px",
                borderRadius: "25px",
              }}
            >
              NEW YORK
            </Typography>
          </Box>
        </Grid>

        {/* London Time */}
        <Grid item xs={12} sm={4}>
          <Box className="flex flex-col justify-center items-center">
            <Typography
              sx={{
                fontSize: "2.7vw",
                fontWeight: "bold",
                color: "#FFFFFF",
                fontFamily: "serif",
              }}
            >
              {time.london}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.7vw",
                fontWeight: "bold",
                color: "black",
                fontFamily: "serif",
                backgroundColor: "#DAB437",
                width: "max-content",
                padding: "0px 15px",
                borderRadius: "25px",
              }}
            >
              LONDON
            </Typography>
          </Box>
        </Grid>

        {/* India Time */}
        <Grid item xs={12} sm={4}>
          <Box className="flex flex-col justify-center items-center">
            <Typography
              sx={{
                fontSize: "2.7vw",
                fontWeight: "bold",
                color: "#FFFFFF",
                fontFamily: "serif",
              }}
            >
              {time.india}
            </Typography>
            <Typography
              sx={{
                fontSize: "1.7vw",
                fontWeight: "bold",
                color: "black",
                fontFamily: "serif",
                backgroundColor: "#DAB437",
                width: "max-content",
                padding: "0px 15px",
                borderRadius: "25px",
              }}
            >
              INDIA
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Clock;
