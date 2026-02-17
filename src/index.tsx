import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { KiramLp } from "./screens/KiramLp";

createRoot(document.getElementById("app") as HTMLElement).render(
  <StrictMode>
    <KiramLp />
  </StrictMode>,
);
