import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import CareerConnect from "./App";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <CareerConnect />
  </StrictMode>
);