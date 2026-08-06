import React, { useEffect, useState } from "react";

function Preloader() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

    if (!loading) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center bg-white">
            <div className="flex flex-col items-center">
                <img
                    src="/assets/logoicon.png"
                    alt="Loading..."
                    className="w-20 h-20 animate-pulse"
                />
                <div className="mt-4 w-32 h-1 bg-gray-200 rounded-full overflow-hidden">
                    <div className="h-full bg-[#F36E21] animate-[loading_2s_ease-in-out] rounded-full" style={{ width: '100%' }} />
                </div>
            </div>
            <style>{`
                @keyframes loading {
                    0% { width: 0%; }
                    100% { width: 100%; }
                }
            `}</style>
        </div>
    );
}

export default Preloader;
