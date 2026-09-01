import React, { cache, useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";
import { useSearchParams } from "react-router-dom";
import axios from "axios";

/* ---------- Background: faint market grid + ticking price lines (matches rest of site) ---------- */

/* ---------- File upload box with preview ---------- */

export default function ClientConsentForm() {
    const [searchParams] = useSearchParams();

    const token = searchParams.get("token");

    console.log("Token:", token);

    const [isLoading, setIsLoading] = useState(true);

    const [params, setParams] = useState({
        tab: "phone",
        url: "",
        phone: "",
        lockPhone: false,
    });

    const [errors, setErrors] = useState({});

    const fetchTokenData = async (token) => {
        try {
            const response = await fetch(
                `/api/kyc/get-token-data?token=${token}`,
                {
                    method: "GET",
                    headers: {
                        "Content-Type": "application/json",
                    },
                },
            );

            if (!response.ok) {
                throw new Error("Failed to fetch token data");
            }
            const data = await response.json();
            if (data.status == "success") {
                setParams({
                    tab: "phone",
                    url: data.url,
                    phone: data.phone,
                    lockPhone: true,
                });
            } else {
                setParams({
                    tab: "",
                });
            }
        } catch (error) {
            console.error("Error fetching token data:", error);
            setParams({
                tab: "",
            });
        } finally {
            setIsLoading(false);
        }
    };
    useEffect(() => {
        if (token) fetchTokenData(token);
    }, [token]);

    const changeValue = (e) => {
        const { value, name } = e.target;
        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: "",
        }));
        setParams((prevParams) => ({
            ...prevParams,
            [name]: value,
        }));
    };

    const getOtp = async () => {

        if(params.phone.length < 10){
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: "Phone number must be 10 digits"
            }));
            return;
        }
        try {

            const response =await axios.post("/api/kyc/checkphone", {
                phone: params.phone,
                url: params.url,
            });

           if(response.data.status == "success"){


            const fields=response.data.fields;
            console.log("fields",fields)
                setParams((prevParams) => ({
                    ...prevParams,
                    tab: "otp",
                }));
           }
        } catch (e) {

            console.log("errror",e)
        } finally {
        }
    };



    const verifyOtp = async () => {

        if(params.phone.length < 10){
            setErrors((prevErrors) => ({
                ...prevErrors,
                phone: "Phone number must be 10 digits"
            }));
            return;
        }

        if(params.otp.length < 4) {
            setErrors((prevErrors) => ({
                ...prevErrors,
                otp: "OTP must be 4 digits"
            }));
            return;
        }
        try {

            const response =await axios.post("/api/kyc/verify-otp", {
                phone: params.phone,
                url: params.url,
                otp: params.otp,
            });

           if(response.data.status == "success"){


            // const fields=response.data.fields;
            // console.log("fields",fields)
            //     setParams((prevParams) => ({
            //         // ...prevParams,
            //         tab: "otp",
            //     }));
           }
        } catch (e) {

            console.log("errror",e)
        } finally {
        }
    };

    

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            {isLoading ? (
                <div className="flex items-center justify-center h-screen">
                    <p className="text-lg font-semibold">Loading...</p>
                </div>
            ) : params.tab === "phone" ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Please verify your phone number
                        </h1>
                    </div>

                    <div>
                        <label htmlFor="">Enter Phone</label>
                        <input
                            type="tel"
                            name="phone"
                            value={params.phone}
                            disabled={params.lockPhone}
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            onChange={(e) => changeValue(e)}
                        />
                    </div>
                    <div>
                        <button onClick={getOtp} disabled={isLoading}>
                            GET OTP
                        </button>
                    </div>
                </div>
            ) : params.tab === "otp" ? (
                <div className="flex items-center justify-center h-screen">
                    <div className="text-center">
                        <h1 className="text-2xl font-bold mb-4">
                            Please enter the OTP sent to your phone
                        </h1>
                    </div>
                    <div>
                        <label htmlFor="">Enter OTP</label>
                        <input
                            type="tel"
                            name="otp"
                            value={params.otp}
                        
                            className="border border-gray-300 rounded px-4 py-2 w-full"
                            onChange={(e) => changeValue(e)}
                        />
                    </div>
                    <div>
                        <button onClick={verifyOtp} disabled={isLoading}>
                            VERIFY OTP
                        </button>
                    </div>
                </div>
            ) : null}
        </main>
    );
}
