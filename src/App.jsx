import AppRoutes from '@app/routes/AppRoutes';
import React from "react";
import PaymentPage from "./components/Payment/PaymentPage/PaymentPage";

import React from "react";
import AboutUs from "./components/AboutUs";

  

// ─────────────────────────────────────────────────────────────
//  App — Top-level routing container
//  BrowserRouter is provided in main.jsx
// ─────────────────────────────────────────────────────────────
export default function App() {
  return <AppRoutes />;
   return <PaymentPage />;
    return <AboutUs />;
}
