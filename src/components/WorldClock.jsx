import React, { useEffect, useState } from "react";
import { Box, Typography } from "@mui/material";
import uaeFlag from "../assets/uae-flag.png";
import londonFlag from "../assets/london-flag.png";
import newYorkFlag from "../assets/newyork-flag.png";


const cities = [
    {
        label: "United Arab Emirates",
        timeZone: "Asia/Dubai",
        flag: uaeFlag,
    },
    {
        label: "LONDON",
        timeZone: "Europe/London",
        flag: londonFlag,
    },
    {
        label: "NEW YORK",
        timeZone: "America/New_York",
        flag: newYorkFlag,
    },
];


const WorldClock = () => {
    const [time, setTime] = useState(new Date());

    useEffect(() => {
        const timer = setInterval(() => {
            setTime(new Date());
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    const formatTime = (tz) =>
        time.toLocaleTimeString("en-US", {
            timeZone: tz,
            hour: "2-digit",
            minute: "2-digit",
            second: "2-digit",
            hour12: true,
        });

    const formatDate = (tz) =>
        time.toLocaleDateString("en-GB", {
            timeZone: tz,
            day: "2-digit",
            month: "short",
            year: "numeric",
        }).toUpperCase();

    const formatDay = (tz) =>
        time.toLocaleDateString("en-US", {
            timeZone: tz,
            weekday: "long",
        }).toUpperCase();

    return (
        <Box
            sx={{
                display: "grid",
                gridTemplateColumns: "repeat(3, 1fr)",
                gap: "1.5vw",
                width: "100%",
                marginBottom:'1vw'
            }}
        >
            {cities.map((city) => (
                <Box
                    key={city.label}
                    sx={{
                        borderRadius: "10px",
                        overflow: "hidden",
                        color: "#f5d29c",
                        background: '#481120'
                    }}
                >
                    {/* Header */}
                    <Box
                        sx={{
                            backgroundColor: "#f0cfa0",
                            textAlign: "center",
                            padding: "0.4vw",
                            fontWeight: 700,
                            fontSize: "1vw",
                            color: "#4a0d1c",
                        }}
                    >
                        {city.label}
                    </Box>

                    {/* Body */}
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: "1vw",
                            padding: "0.5vw 1.5vw",
                        }}
                    >
                        {/* Flag */}
                        <Box
                            sx={{
                                width: "25%",
                                maxWidth:"4vw"
                            }}
                        >

                            <img src={city.flag} alt="" />

                        </Box>

                        {/* Time */}
                        <Box>
                            <Typography
                                sx={{
                                    fontSize: "1.2vw",
                                    fontWeight: 700,
                                    lineHeight: 1.2,
                                }}
                            >
                                {formatTime(city.timeZone)}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "1vw",
                                    opacity: 0.7,
                                }}
                            >
                                {formatDate(city.timeZone)}
                            </Typography>

                            <Typography
                                sx={{
                                    fontSize: "1.1vw",
                                }}
                            >
                                {formatDay(city.timeZone)}
                            </Typography>
                        </Box>
                    </Box>
                </Box>
            ))}
        </Box>
    );
};

export default WorldClock;
