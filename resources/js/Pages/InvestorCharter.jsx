import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";
import { Helmet } from "react-helmet";

const MarketGridBG = ({ className = "" }) => (
    <svg
        className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
        viewBox="0 0 1200 800"
        preserveAspectRatio="none"
    >
        <defs>
            <pattern
                id="grid"
                width="60"
                height="60"
                patternUnits="userSpaceOnUse"
            >
                <path
                    d="M 60 0 L 0 0 0 60"
                    fill="none"
                    stroke="#1A4B9B"
                    strokeOpacity="0.05"
                    strokeWidth="1"
                />
            </pattern>
            <linearGradient id="fade" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="1" />
            </linearGradient>
        </defs>
        <rect width="1200" height="800" fill="url(#grid)" />
        <polyline
            points="0,560 90,520 180,580 270,460 360,500 450,360 540,420 630,300 720,340 810,220 900,260 990,150 1080,190 1200,110"
            fill="none"
            stroke="#F36E21"
            strokeOpacity="0.14"
            strokeWidth="3"
        />
        <polyline
            points="0,620 90,600 180,640 270,610 360,650 450,590 540,610 630,560 720,580 810,520 900,540 990,480 1080,500 1200,460"
            fill="none"
            stroke="#1A4B9B"
            strokeOpacity="0.12"
            strokeWidth="3"
        />
        <rect width="1200" height="800" fill="url(#fade)" />
    </svg>
);

export default function InvestorCharter() {
    useEffect(() => {
        AOS.init({ duration: 700, once: true, offset: 60 });
    }, []);

    return (
        <main className="relative w-full bg-white font-sans overflow-x-hidden text-gray-800">
            <Helmet>
                <title>Rightzone Research | Investor Charter</title>
                <meta
                    name="description"
                    content="Investor Charter of Rightzone Research outlining investor rights, responsibilities, services offered, and grievance redressal as per SEBI guidelines."
                />
            </Helmet>
            <section
                className="relative pt-20 sm:pt-24 pb-14 sm:pb-20 px-4 text-center overflow-hidden border-b border-gray-100"
                style={{
                    background:
                        "linear-gradient(135deg, #eaf1ff 0%, #fff3e9 100%)",
                }}
            >
                <MarketGridBG className="opacity-80" />
                <div
                    className="absolute -top-24 -right-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: "#1A4B9B" }}
                />
                <div
                    className="absolute -bottom-24 -left-24 w-72 h-72 rounded-full blur-3xl opacity-30 pointer-events-none"
                    style={{ background: "#F36E21" }}
                />

                <div
                    className="max-w-3xl mx-auto relative z-10"
                    data-aos="fade-up"
                >
                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-[#1A4B9B] leading-tight mb-5 tracking-tight">
                        Investor <span className="text-[#F36E21]">Charter</span>
                    </h1>
                    <div className="w-16 h-1 bg-[#1A4B9B] mx-auto rounded-full mb-6" />
                </div>
            </section>

            {/* ── CONTENT ── */}
            <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12 sm:py-16">
                {/* Section heading */}
                <div className="mb-10">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800 uppercase tracking-wide border-b-2 border-[#1A4B9B] pb-3 inline-block">
                        Investor Charter in Respect of RA's
                    </h2>
                </div>

                <div className="space-y-10">
                    {/* ── A ── */}
                    <div>
                        <h5 className="text-base font-bold text-gray-900 mb-3">
                            A. Vision and Mission Statements for Investors
                        </h5>
                        <p className="mb-2 text-md text-gray-700 leading-relaxed">
                            <strong>Vision:</strong> To empower every investor
                            with trusted research, informed insights, and
                            disciplined investment strategies that promote
                            confident, secure, and long-term wealth creation.
                        </p>
                        <p className="text-md text-gray-700 leading-relaxed">
                            <strong>Mission:</strong> To deliver reliable,
                            research-driven investment solutions that help
                            investors identify suitable opportunities, make
                            informed financial decisions, effectively manage
                            their portfolios, and achieve their long-term
                            financial goals with confidence and transparency.
                        </p>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ── B ── */}
                    <div>
                        <h5 className="text-base font-bold text-gray-900 mb-3">
                            B. Details of Business Transacted by the Research
                            Analyst with Respect to the Investors
                        </h5>
                        <ul className="space-y-2 text-md text-gray-700 leading-relaxed list-disc pl-5">
                            <li>
                                To publish research report based on the research
                                activities of the RA.
                            </li>
                            <li>
                                To provide an independent unbiased view on
                                securities.
                            </li>
                            <li>
                                To offer unbiased recommendation, disclosing the
                                financial interests in recommended securities.
                            </li>
                            <li>
                                To provide research recommendation, based on
                                analysis of publicly available information and
                                known observations.
                            </li>
                            <li>To conduct audit annually.</li>
                            <li>
                                To ensure that all advertisements are in
                                adherence to the provisions of the Advertisement
                                Code for Research Analysts.
                            </li>
                            <li>
                                To maintain records of interactions, with all
                                clients including prospective clients (prior to
                                onboarding), where any conversation related to
                                the research services has taken place.
                            </li>
                        </ul>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ── C ── */}
                    <div>
                        <h5 className="text-base font-bold text-gray-900 mb-3">
                            C. Details of Services Provided to Investors (No
                            Indicative Timelines)
                        </h5>
                        <div className="text-md text-gray-700 leading-relaxed space-y-4">
                            <div>
                                <p className="font-semibold text-gray-800 mb-2">
                                    Onboarding of Clients:
                                </p>
                                <ul className="space-y-1.5 list-disc pl-5">
                                    <li>
                                        Sharing of terms and conditions of
                                        research services.
                                    </li>
                                    <li>
                                        Completing KYC of fee-paying clients.
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-gray-800 mb-2">
                                    Disclosure to Clients:
                                </p>
                                <ul className="space-y-1.5 list-disc pl-5">
                                    <li>
                                        To disclose information that is material
                                        for the client to make an informed
                                        decision, including details of its
                                        business activity, disciplinary history,
                                        terms and conditions of research
                                        services, details of associates, risks,
                                        and conflicts of interest, if any.
                                    </li>
                                    <li>
                                        To disclose the extent of use of
                                        Artificial Intelligence tools in
                                        providing research services.
                                    </li>
                                    <li>
                                        To disclose, while distributing a
                                        third-party research report, any
                                        material conflict of interest of such
                                        third-party research provider or provide
                                        a web address that directs a recipient
                                        to the relevant disclosures.
                                    </li>
                                    <li>
                                        To disclose any conflict of interest of
                                        the activities of providing research
                                        services with other activities of the
                                        research analyst.
                                    </li>
                                    <li>
                                        In case of any grievance/complaint, an
                                        investor may approach the concerned
                                        Research Analyst who shall strive to
                                        redress the grievance immediately, but
                                        not later than the time specified by
                                        SEBI.
                                    </li>
                                    <li>
                                        To distribute research reports and
                                        recommendations to the clients without
                                        discrimination.
                                    </li>
                                    <li>
                                        To maintain confidentiality with respect
                                        to publication of the research report
                                        until made available in the public
                                        domain.
                                    </li>
                                    <li>
                                        To respect data privacy rights of
                                        clients and take measures to protect
                                        unauthorized use of their confidential
                                        information.
                                    </li>
                                    <li>
                                        To disclose the timelines for the
                                        services provided by the research
                                        analyst to clients and ensure adherence
                                        to the said timelines.
                                    </li>
                                    <li>
                                        To provide clear guidance and adequate
                                        caution notice to clients when providing
                                        recommendations for dealing in complex
                                        and high-risk financial
                                        products/services.
                                    </li>
                                    <li>
                                        To treat all clients with honesty and
                                        integrity.
                                    </li>
                                    <li>
                                        To ensure confidentiality of information
                                        shared by clients unless such
                                        information is required to be provided
                                        in furtherance of discharging legal
                                        obligations or a client has provided
                                        specific consent to share such
                                        information.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ── D ── */}
                    <div>
                        <h5 className="text-base font-bold text-gray-900 mb-3">
                            D. Details of Grievance Redressal Mechanism and How
                            to Access It
                        </h5>
                        <p className="text-md text-gray-700 mb-3">
                            Investor can lodge complaint/grievance against
                            Research Analyst in the following ways:
                        </p>
                        <ul className="space-y-3 text-md text-gray-700 leading-relaxed list-disc pl-5">
                            <li>
                                <strong className="text-gray-900">
                                    Complaint to Investment Adviser:
                                </strong>{" "}
                                Grievances can be filed directly with the
                                Research Analyst. Redressal should occur within
                                21 days of the receipt of the grievance.
                            </li>
                            <li>
                                <strong className="text-gray-900">
                                    Complaint via SCORES 2.0:
                                </strong>{" "}
                                <a
                                    href="https://scores.sebi.gov.in"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-[#1A4B9B] hover:underline"
                                >
                                    https://scores.sebi.gov.in
                                </a>
                                <br />
                                SCORES is a web-based centralized grievance
                                redressal system of SEBI that facilitates
                                effective redressal in a time-bound manner.
                                <br />
                                <span className="block mt-1">
                                    <strong>
                                        Two-level review for complaint/grievance
                                        against Research Analyst:
                                    </strong>
                                    <br />
                                    • First review by Research Analyst
                                    Administration and Supervisory Body (RAASB)
                                    <br />• Second review by SEBI
                                </span>
                            </li>
                            <li>
                                <strong className="text-gray-900">
                                    Email:
                                </strong>{" "}
                                Complaints can be sent to the designated email
                                ID of RAASB.
                            </li>
                            <li>
                                <strong className="text-gray-900">
                                    SMARTODR Platform:
                                </strong>{" "}
                                If the investor is not satisfied with the
                                resolution provided by the Research Analyst, the
                                complaint can be escalated to the SMARTODR
                                platform for resolution through online
                                conciliation or arbitration.
                            </li>
                            <li>
                                <strong className="text-gray-900">
                                    Physical Complaints:
                                </strong>{" "}
                                Investors may send their physical complaints to:
                                <br />
                                <span className="block mt-1 text-gray-600 not-normal">
                                    Office of Investor Assistance and Education,
                                    <br />
                                    Securities and Exchange Board of India,
                                    <br />
                                    SEBI Bhavan, Plot No. C4-A, 'G' Block,
                                    <br />
                                    Bandra-Kurla Complex, Bandra (E),
                                    <br />
                                    Mumbai - 400 051
                                </span>
                            </li>
                        </ul>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ── E ── */}
                    <div>
                        <h5 className="text-base font-bold text-gray-900 mb-3">
                            E. Rights of Investors
                        </h5>
                        <ul className="space-y-2 text-md text-gray-700 leading-relaxed list-disc pl-5">
                            <li>Right to Transparent Practices</li>
                            <li>Right to Fair and Equitable Treatment</li>
                            <li>Right to Adequate Information</li>
                            <li>
                                Right to Initial and Continuing Disclosure —
                                Right to receive information about all the
                                statutory and regulatory disclosures
                            </li>
                            <li>Right to Fair &amp; True Advertisement</li>
                            <li>
                                Right to Awareness about Service Parameters and
                                Turnaround Times
                            </li>
                            <li>
                                Right to be informed of the timelines for each
                                service
                            </li>
                            <li>
                                Right to be Heard and Satisfactory Grievance
                                Redressal
                            </li>
                            <li>Right to have timely redressal</li>
                            <li>
                                Right to Exit from Financial Product or Service
                                in accordance with the terms and conditions
                                agreed with the research analyst
                            </li>
                            <li>
                                Right to receive clear guidance and caution
                                notice when dealing in Complex and High-Risk
                                Financial Products and Services
                            </li>
                            <li>
                                Additional Rights to Vulnerable Consumers —
                                Right to get access to services in a suitable
                                manner even if differently abled
                            </li>
                            <li>
                                Right to Provide Feedback on the Financial
                                Products and Services Used
                            </li>
                            <li>
                                Right Against Coercive, Unfair, and One-Sided
                                Clauses in Financial Agreements
                            </li>
                        </ul>
                    </div>

                    <hr className="border-gray-100" />

                    {/* ── F ── */}
                    <div>
                        <h5 className="text-base font-bold text-gray-900 mb-3">
                            F. Expectations from the Investors (Responsibilities
                            of Investors)
                        </h5>
                        <div className="text-md text-gray-700 leading-relaxed space-y-5">
                            <div>
                                <p className="font-semibold text-[#1A4B9B] mb-2">
                                    Do's:
                                </p>
                                <ul className="space-y-1.5 list-disc pl-5">
                                    <li>
                                        Always deal with SEBI registered
                                        Research Analyst.
                                    </li>
                                    <li>
                                        Ensure that the Research Analyst has a
                                        valid registration certificate.
                                    </li>
                                    <li>
                                        Check for SEBI registration number.
                                        Please refer to the list of all SEBI
                                        registered Research Analyst which is
                                        available on SEBI website in the
                                        following link:{" "}
                                        <a
                                            href="https://www.sebi.gov.in/sebiweb/other/OtherAction.do?doRecognisedFpi=yes&intmId=14"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-[#1A4B9B] hover:underline"
                                        >
                                            Click here
                                        </a>
                                        .
                                    </li>
                                    <li>
                                        Always pay attention towards disclosures
                                        made in the research reports before
                                        investing.
                                    </li>
                                    <li>
                                        Pay your Research Analyst through
                                        banking channels only and maintain duly
                                        signed receipts mentioning the details
                                        of your payments. You may make payment
                                        of fees through Centralized Fee
                                        Collection Mechanism (CeFCoM) of RAASB
                                        if research analyst has opted for the
                                        mechanism. (Applicable for fee paying
                                        clients only)
                                    </li>
                                    <li>
                                        Before buying/selling securities or
                                        applying in public offer, check for the
                                        research recommendation provided by your
                                        Research Analyst.
                                    </li>
                                    <li>
                                        Ask all relevant questions and clear
                                        your doubts with your Research Analyst
                                        before acting on recommendation.
                                    </li>
                                    <li>
                                        Seek clarifications and guidance on
                                        research recommendations from your
                                        Research Analyst, especially if it
                                        involves complex and high risk financial
                                        products and services.
                                    </li>
                                    <li>
                                        Always be aware that you have the right
                                        to stop availing the service of a
                                        Research Analyst as per the terms of
                                        service agreed between you and your
                                        Research Analyst.
                                    </li>
                                    <li>
                                        Always be aware that you have the right
                                        to provide feedback to your Research
                                        Analyst in respect of the services
                                        received.
                                    </li>
                                    <li>
                                        Always be aware that you will not be
                                        bound by any clause, prescribed by the
                                        research analyst, which is contravening
                                        any regulatory provisions.
                                    </li>
                                    <li>
                                        Inform SEBI about Research Analyst
                                        offering assured or guaranteed returns.
                                    </li>
                                </ul>
                            </div>
                            <div>
                                <p className="font-semibold text-[#F36E21] mb-2">
                                    Don'ts:
                                </p>
                                <ul className="space-y-1.5 list-disc pl-5">
                                    <li>
                                        Do not provide funds for investment to
                                        the Research Analyst.
                                    </li>
                                    <li>
                                        Don't fall prey to luring advertisements
                                        or market rumors.
                                    </li>
                                    <li>
                                        Do not get attracted to limited period
                                        discounts or other incentives, gifts,
                                        etc. offered by the Research Analyst.
                                    </li>
                                    <li>
                                        Do not share login credentials and
                                        passwords of your trading, demat, or
                                        bank accounts with the Research Analyst.
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </main>
    );
}
