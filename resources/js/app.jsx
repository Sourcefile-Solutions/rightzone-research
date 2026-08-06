import React, { useEffect } from "react";
import "../css/app.css";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";

import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Preloader from "./Components/Preloader";

import Home from "./Pages/Home";
import About from "./Pages/About";
import Services from "./Pages/Services";
import Pricing from "./Pages/Pricing";
import Reports from "./Pages/Reports";
import Contact from "./Pages/Contact";
import Payments from "./Pages/Payments";

import TermsandConditions from "./Pages/TermsandConditions";
import PrivacyPolicy from "./Pages/PrivacyPolicy";
import Disclosure from "./Pages/Disclosure";
import ClientConsentForm from "./Pages/ClientConsentForm";
import InvestorCharter from "./Pages/InvestorCharter";
import NSEHolidays from "./Pages/NSEHolidays";
import BSEHolidays from "./Pages/BSEHolidays";
import GrievanceRedressal from "./Pages/GrievanceRedressal";
import ComplaintBoard from "./Pages/ComplaintBoard";
import Disclaimer from "./Pages/Disclaimer";

import FundamentalResearch from "./Pages/Services/FundamentalResearch";
import DerivativesResearch from "./Pages/Services/DerivativesResearch";
import MarketMomentum from "./Pages/Services/MarketMomentum";
import InvestmentStrategy from "./Pages/Services/InvestmentStrategy";
import MarketIntelligence from "./Pages/Services/MarketIntelligence";

/* ── Scrolls to top on every route change ── */
function ScrollToTop() {
    const { pathname } = useLocation();
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);
    return null;
}

function App() {
    return (
        <BrowserRouter basename="">
            <ScrollToTop />
            <Preloader />
            <div
                className="app"
                style={{
                    display: "flex",
                    flexDirection: "column",
                    minHeight: "100vh",
                }}
            >
                <Header />

                <div className="content" style={{ flex: 1 }}>
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/services" element={<Services />} />
                        <Route path="/pricing" element={<Pricing />} />
                        <Route path="/reports" element={<Reports />} />
                        <Route path="/contact" element={<Contact />} />
                        <Route path="/payments" element={<Payments />} />

                        <Route
                            path="/terms"
                            element={<TermsandConditions />}
                        />
                        <Route
                            path="/privacy"
                            element={<PrivacyPolicy />}
                        />
                        <Route
                            path="/disclosure"
                            element={<Disclosure />}
                        />
                        <Route
                            path="/client-consent-form"
                            element={<ClientConsentForm />}
                        />
                        <Route
                            path="/investor-charter"
                            element={<InvestorCharter />}
                        />
                        <Route
                            path="/nse-holidays"
                            element={<NSEHolidays />}
                        />
                        <Route
                            path="/bse-holidays"
                            element={<BSEHolidays />}
                        />
                        <Route
                            path="/grievance-redressal"
                            element={<GrievanceRedressal />}
                        />
                        <Route
                            path="/complaint-board"
                            element={<ComplaintBoard />}
                        />
                        <Route
                            path="/disclaimer"
                            element={<Disclaimer />}
                        />

                        <Route
                            path="/fundamental-research"
                            element={<FundamentalResearch />}
                        />
                        <Route
                            path="/derivatives-research"
                            element={<DerivativesResearch />}
                            
                        />
                        <Route
                            path="/market-momentum"
                            element={<MarketMomentum />}
                        />
                        <Route
                            path="/investment-strategy"
                            element={<InvestmentStrategy />}
                        />
                        <Route
                            path="/market-intelligence"
                            element={<MarketIntelligence />}
                        />
                    </Routes>
                </div>

                <Footer />
            </div>
        </BrowserRouter>
    );
}

ReactDOM.createRoot(document.getElementById("app")).render(
    <React.StrictMode>
        <App />
    </React.StrictMode>,
);
