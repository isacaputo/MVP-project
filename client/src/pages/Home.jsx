import * as React from "react";
import Container from "@mui/material/Container";
import { Paper, Box, Grid, Typography, Button } from "@mui/material";
import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  return (
    <Paper
      sx={{
        position: "relative",
        color: "#fff",
        mb: 4,
        borderRadius: 0,
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url("./public/images/home.png")`,
        display: "flex",
        alignItems: "center",
        height: 750,
      }}
    >
      <img style={{ display: "none" }} src="./public/images/home.png" />
      <Grid container sx={{ justifyContent: "center", textAlign: "center" }}>
        <Box
          sx={{
            position: "absolute",
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            backgroundColor: "rgba(0,0,0,.45)",
          }}
        />
        <Grid item md={6}>
          <Box
            sx={{
              position: "relative",
              p: { xs: 3, md: 6 },
            }}
          >
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{ fontFamily: "Oooh Baby", fontSize: 80 }}
            >
              Fromageria Tesilli
            </Typography>
            <Typography
              component="h1"
              variant="h3"
              color="inherit"
              gutterBottom
              sx={{ fontFamily: "Verdana", fontSize: 20 }}
            >
              Queijos • Sabores • Afetos
            </Typography>
            <br />
            <Button variant="contained" onClick={() => navigate("/products")}>
              Conheça nossos queijos
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Paper>
  );
}
