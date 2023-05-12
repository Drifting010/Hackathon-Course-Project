import * as React from "react";
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";
import { tokens}from "../../Components/theme";
import theme from "../../Components/theme";
import LineChart from "../../Components/dataVisualization/LineChart";
import BarChart from "../../Components/dataVisualization/BarChart";
import { Box, Typography } from "@mui/material";

// This is the main function that returns the dataAnalytics component
export default function DataAnalytics() {
    const colours = tokens(theme.palette.mode);
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box m="20px">

        {/** Bar Chart To demonstrate the interest trendency of the new joined User*/}
        <Box
          display="grid"
          gridTemplateColumns="repeat(12, 1fr)"
          gridAutoRows="90px"
          gap="20px"
        >
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            backgroundColor="#0D1116"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              New users Joined in Platform Past 7 Days (Labeled by primary
              interest)
            </Typography>
            <Box height="250px" mt="-20px">
              <BarChart />
            </Box>
          </Box>

          {/* The line chart to represent the view of the recent created hackathon's type*/}
          <Box
            gridColumn="span 12"
            gridRow="span 3"
            backgroundColor="#0D1116"
            borderColor="#4474F1"
          >
            <Typography
              variant="h5"
              fontWeight="600"
              sx={{ padding: "30px 30px 0 30px" }}
            >
              Number of Hackathons that Created in Past 7 Days (Labeled by
              primary interest)
            </Typography>
            <Box height="250px" m="-20px 0 0 0">
              <LineChart/>
            </Box>
          </Box>
        </Box>
      </Box>
    </ThemeProvider>
  );
}
