import fs from "fs";
import path from "path";
import Link from "next/link";

export const metadata = {
    title: "Verify Certificate — Hackbells 3.0",
    description:
        "Verify the authenticity of a Hackbells 3.0 workshop certificate using its unique certificate ID.",
};

function getCertificateData() {
    const filePath = path.join(process.cwd(), "data", "certificates.json");
    const raw = fs.readFileSync(filePath, "utf-8");
    return JSON.parse(raw);
}

export default async function VerifyPage({ searchParams }) {
    const params = await searchParams;
    const id = params?.id;

    // State 1: No ID provided
    if (!id) {
        return (
            <>
                <div className="page-bg" />
                <div className="app-container">
                    <div className="content-wrapper">
                        <Header />
                        <div className="warning-card">
                            <span className="warning-icon">⚠️</span>
                            <h2 className="warning-title">Invalid Verification Link</h2>
                            <p className="warning-message">
                                No certificate ID was provided. Please scan the QR code on your
                                certificate or use a valid verification link.
                            </p>
                            <p className="warning-message" style={{ marginBottom: 0 }}>
                                <strong>Expected format:</strong>
                                <br />
                                <code style={{ color: "#c084fc", fontSize: 13 }}>
                                    /verify?id=HB3-2026-0001
                                </code>
                            </p>
                        </div>
                        <ScanAnotherButton />
                        <Footer />
                    </div>
                </div>
            </>
        );
    }

    // Look up certificate
    const certificates = getCertificateData();
    const certificate = certificates.find(
        (cert) => cert.id.toUpperCase() === id.toUpperCase()
    );

    // State 2: Certificate not found
    if (!certificate) {
        return (
            <>
                <div className="page-bg" />
                <div className="app-container">
                    <div className="content-wrapper">
                        <Header />
                        <div className="error-card">
                            <span className="error-icon">❌</span>
                            <h2 className="error-title">Certificate Not Found</h2>
                            <p className="error-message">
                                No certificate was found matching the ID{" "}
                                <strong style={{ color: "#f87171", fontFamily: "'JetBrains Mono', monospace" }}>
                                    {id}
                                </strong>
                                . Please check the link or scan the QR code again.
                            </p>
                            <ScanAnotherButton />
                        </div>
                        <Footer />
                    </div>
                </div>
            </>
        );
    }

    // State 3: Certificate verified ✅
    const verifiedAt = new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
    });

    return (
        <>
            <div className="page-bg" />
            <div className="app-container">
                <div className="content-wrapper">
                    <Header />

                    <div className="verify-card">
                        {/* Card Header */}
                        <div className="card-header">
                            <div className="cert-id-section">
                                <div className="cert-id-label">Certificate ID</div>
                                <div className="cert-id-value">{certificate.id}</div>
                            </div>
                            <div className="status-badge status-verified">
                                <span className="status-icon">✅</span>
                                Verified
                            </div>
                        </div>

                        {/* Card Body */}
                        <div className="card-body">
                            <div className="details-grid">
                                <div className="detail-item full-width">
                                    <div className="detail-label">
                                        <span className="detail-label-icon">👤</span>
                                        Participant Name
                                    </div>
                                    <div className="detail-value">{certificate.name}</div>
                                </div>

                                <div className="detail-item full-width">
                                    <div className="detail-label">
                                        <span className="detail-label-icon">🎓</span>
                                        Workshop
                                    </div>
                                    <div className="detail-value">{certificate.workshop}</div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-label">
                                        <span className="detail-label-icon">📅</span>
                                        Event Date
                                    </div>
                                    <div className="detail-value">{certificate.date}</div>
                                </div>

                                <div className="detail-item">
                                    <div className="detail-label">
                                        <span className="detail-label-icon">🏛️</span>
                                        College
                                    </div>
                                    <div className="detail-value">{certificate.college}</div>
                                </div>
                            </div>
                        </div>

                        {/* Card Footer */}
                        <div className="card-footer">
                            <div className="verification-timestamp">
                                Verified on {verifiedAt} IST
                            </div>
                        </div>
                    </div>

                    <div style={{ textAlign: "center" }}>
                        <ScanAnotherButton />
                    </div>

                    <Footer />
                </div>
            </div>
        </>
    );
}

/* ============================================
   Sub-components
   ============================================ */

function Header() {
    return (
        <header className="header">
            <Link href="/" style={{ textDecoration: "none" }}>
                <div className="logo-section">
                    <div className="logo-icon">⚡</div>
                    <span className="logo-text">HACKBELLS</span>
                </div>
            </Link>
            <div className="header-badge">Certificate Verification</div>
            <p className="header-title">
                Official verification portal for Hackbells 3.0 workshop certificates
            </p>
        </header>
    );
}

function ScanAnotherButton() {
    return (
        <Link href="/" className="scan-another-btn">
            🔍 Scan Another Certificate
        </Link>
    );
}

function Footer() {
    return (
        <footer className="page-footer">
            <hr className="footer-divider" />
            <p className="footer-text">
                © 2026 Hackbells · Sree Buddha College of Engineering, Pattoor
                <br />
                <span style={{ opacity: 0.6 }}>
                    This is an official verification page. If you suspect fraud, contact{" "}
                    <a href="mailto:hackbells@sbce.ac.in" className="footer-link">
                        hackbells@sbce.ac.in
                    </a>
                </span>
            </p>
        </footer>
    );
}
