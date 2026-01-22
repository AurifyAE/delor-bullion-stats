import React, { useCallback, useEffect, useState } from "react";
import { Grid, Paper, Typography, Box, useMediaQuery } from "@mui/material";
import LimitExceededModal from "../components/LimitExceededModal";
import SpotRate from "../components/SpotRate";
import CommodityTable from "../components/CommodityTable";
import NewsTicker from "../components/News";
import DelorLogo from "../assets/delor-logo.png";
import AurifyLogo from "../assets/aurify-logo.png";

import {
  fetchSpotRates,
  fetchServerURL,
  fetchNews,
  fetchTVScreenData,
} from "../api/api";
import io from "socket.io-client";
import { useSpotRate } from "../context/SpotRateContext";
// import Clock from "../components/Clock";
import Carousel from "../components/Carousel";
import Carousel2 from "../components/Carousel2";
import ParentCarousel from "../components/ParentCarousel";
import WorldClock from "../components/WorldClock";
import BuyersSellersBar from "../components/BuyersSellerBar";

function TvScreen() {
  const [showLimitModal, setShowLimitModal] = useState(false);
  const [dateTime, setDateTime] = useState(new Date());
  const [serverURL, setServerURL] = useState("");
  const [news, setNews] = useState([]);
  const [marketData, setMarketData] = useState({});
  const [commodities, setCommodities] = useState([]);
  const [goldBidSpread, setGoldBidSpread] = useState("");
  const [goldAskSpread, setGoldAskSpread] = useState("");
  const [silverBidSpread, setSilverBidSpread] = useState("");
  const [silverAskSpread, setSilverAskSpread] = useState("");
  const [symbols, setSymbols] = useState(["GOLD", "SILVER"]);
  const [error, setError] = useState(null);

  const { updateMarketData } = useSpotRate();

  const adminId = import.meta.env.VITE_APP_ADMIN_ID;

  updateMarketData(
    marketData,
    goldBidSpread,
    goldAskSpread,
    silverBidSpread,
    silverAskSpread
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [spotRatesRes, serverURLRes, newsRes] = await Promise.all([
          fetchSpotRates(adminId),
          fetchServerURL(),
          fetchNews(adminId),
        ]);

        // Handle Spot Rates
        const {
          commodities,
          goldBidSpread,
          goldAskSpread,
          silverBidSpread,
          silverAskSpread,
        } = spotRatesRes.data.info;
        setCommodities(commodities);
        setGoldBidSpread(goldBidSpread);
        setGoldAskSpread(goldAskSpread);
        setSilverBidSpread(silverBidSpread);
        setSilverAskSpread(silverAskSpread);

        // Handle Server URL
        const { serverURL } = serverURLRes.data.info;
        setServerURL(serverURL);

        // Handle News
        setNews(newsRes.data.news.news);

        console.log(newsRes);

      } catch (error) {
        console.error("Error fetching data:", error);
        setError("An error occurred while fetching data");
      }
    };

    fetchData();

    // Fetch TV screen data (you can leave this as a separate call)
    fetchTVScreenData(adminId)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          // Allow TV screen view
          setShowLimitModal(false);
        }
      })
      .catch((error) => {
        if (error.response && error.response.status === 403) {
          setShowLimitModal(true); // Show the modal on 403 status
        } else {
          console.error("Error:", error.message);
          alert("An unexpected error occurred.");
        }
      });
  }, [adminId]);

  // Function to Fetch Market Data Using Socket
  useEffect(() => {
    if (serverURL) {
      const socket = io(serverURL, {
        query: { secret: import.meta.env.VITE_APP_SOCKET_SECRET_KEY },
        transports: ["websocket"],
        withCredentials: true,
      });

      socket.on("connect", () => {
        console.log("Connected to WebSocket server");
        socket.emit("request-data", symbols);
      });

      socket.on("disconnect", () => {
        console.log("Disconnected from WebSocket server");
      });

      socket.on("market-data", (data) => {
        if (data && data.symbol) {
          setMarketData((prevData) => ({
            ...prevData,
            [data.symbol]: {
              ...prevData[data.symbol],
              ...data,
            },
          }));
        } else {
          console.warn("Received malformed market data:", data);
        }
      });

      socket.on("error", (error) => {
        console.error("WebSocket error:", error);
        setError("An error occurred while receiving data");
      });

      // Cleanup function to disconnect the socket
      return () => {
        socket.disconnect();
      };
    }
  }, [serverURL, symbols]);

  useEffect(() => {
    const interval = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const getFormattedDateParts = (date) => {
    const options = {
      weekday: "long",
      day: "2-digit",
      month: "long",
      year: "numeric",
    };

    const day = date.toLocaleDateString("en-GB", { weekday: "long" });
    const dayOfMonth = date.toLocaleDateString("en-GB", { day: "2-digit" });
    const month = date
      .toLocaleDateString("en-GB", { month: "long" })
      .toUpperCase();
    const year = date.toLocaleDateString("en-GB", { year: "numeric" });

    return {
      day,
      date: dayOfMonth,
      month,
      year,
    };
  };

  const getFormattedTimeWithoutSeconds = (date) => {
    return date.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getOrdinalSuffix = (date) => {
    const j = date % 10,
      k = date % 100;
    if (j === 1 && k !== 11) {
      return "st";
    }
    if (j === 2 && k !== 12) {
      return "nd";
    }
    if (j === 3 && k !== 13) {
      return "rd";
    }
    return "th";
  };

  const currentDate = new Date();
  const { day, date, month, year } = getFormattedDateParts(currentDate);

  return (
    <Box sx={{ minHeight: "100vh", color: "white", padding: "20px" }}>
      {/* Grid */}
      <Grid
        container
        spacing={4}
        direction="row"
        // alignItems="flex-start"
        justifyContent="space-between"
      >
        {/* Side: SpotRate & Date Time */}
        <Grid item xs={12} md={5}>
          <Box className="flex flex-row items-center justify-center ">
            <Box
              className="flex flex-row items-center justify-between"
              sx={{
                height: "auto",
                width: "15vw",
                top: "0",
              }}
            >






              <img src={DelorLogo} alt="" />
            </Box>

          </Box>

          {/* SpotRate Component */}
          <SpotRate />
          {/* <BuyersSellersBar
            buyersPercent={0}
            sellersPercent={0}
            logo={AurifyLogo}
          /> */}
        </Grid>

        {/* Side: Commodity Table */}
        <Grid item xs={12} md={7}
        >
          <WorldClock />
          <CommodityTable commodities={commodities} />
          {/* <NewsTicker newsItems={news} /> */}
          <NewsTicker
            newsItems={[
              { description: "Trump’s Greenland Taco Sees Gold Halve Rally" },
              { description: "Gold prices steady amid global uncertainty" },
              { description: "Silver gains on industrial demand outlook" },
            ]}
          />

        </Grid>
      </Grid>

    </Box>
  );
}

export default TvScreen;
