import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { Navbar, Footer } from "./components/layout"; // Assuming you have Navbar and Footer components
import Home from "./pages/home";
import Movies from "./pages/movies";
import TvShows from "./pages/tvshow";
import AboutUs from "./pages/aboutus";

import "./index.css";

import MovieDetail from "./pages/moviedetail";
import SeriesDetail from "./pages/seriesdetail";

// Create the router with all routes
const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <>
        <Navbar />
        <Home />
        <Footer />
      </>
    ),
  },
  {
    path: "/movies",
    element: (
      <>
        <Navbar />
        <Movies />
        <Footer />
      </>
    ),
  },
  {
    path: "/tvshows",
    element: (
      <>
        <Navbar />
        <TvShows />
        <Footer />
      </>
    ),
  },

  {
    path: "/aboutus",
    element: (
      <>
        <Navbar />
        <AboutUs />
        <Footer />
      </>
    ),
  },
  {
    path: "/movie/:id",
    element: (
      <>
        <Navbar />
        <MovieDetail />
        <Footer />
      </>
    ),
  },
  {
    path: "/series/:id",
    element: (
      <>
        <Navbar />
        <SeriesDetail />
        <Footer />
      </>
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
