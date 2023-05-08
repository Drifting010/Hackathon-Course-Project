import React, { useState, useEffect } from 'react'
import { getHackathonByTag } from '../../Components/firebase/firebaseFunction'
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { LinearProgress } from '@mui/material';

const initialFilters = { tag: null, offset: null, status: null }
// const limit = 10

// This is the main function that returns the hackathonList component
function HackathonList({ filters = initialFilters }) {
  // const [offset, setOffset] = useState(0)
  const [data, setData] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const Data = await getHackathonByTag(filters);
      setData(Data);
    }
    fetchData();
  }, [filters]);
  // const pages = Math.ceil(data.HackathonsCount / limit)

  return (
    <Box>
      <Container sx={{ py: 2 }} maxWidth="md">
        <Grid container spacing={4}>
          {data.map((card) => (
            <Grid item key={card} xs={12} sm={6} md={4}>
              <Card
                sx={{
                  height: "100%",
                  display: "flex",
                  flexDirection: "column",
                }}
                data-testid="card"
              >
                <CardMedia
                  component="img"
                  sx={{}}
                  image="https://source.unsplash.com/random"
                  alt="random"
                />
                <CardContent sx={{ flexGrow: 1 }}>
                  {card && (
                    <Typography gutterBottom variant="h5" component="h2">
                      {card.tag}
                    </Typography>
                  )}
                  <Typography>prize pool $1000</Typography>
                  <Stack direction="row" alignItems="center" spacing={2}>
                    <LinearProgress
                      sx={{ height: 10, width: "60%" }}
                      color="secondary"
                      variant="determinate"
                      value={50}
                    />
                    <Typography fontSize="10px">Apply in 30 days</Typography>
                  </Stack>
                  <Typography>ongoing</Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  )
}

export default HackathonList
