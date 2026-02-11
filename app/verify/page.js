import fs from "fs";
import path from "path";
import Image from "next/image";

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
            <Page>
                <div className="warning-card">
                    <span className="warning-icon">⚠️</span>
                    <h2 className="warning-title">Invalid Verification Link</h2>
                    <p className="warning-message">
                        No certificate ID was provided. Please scan the QR code on your
                        certificate or use a valid verification link.
                    </p>
                    <p className="warning-message" style={{ marginTop: 12 }}>
                        Expected format:<br />
                        <span className="warning-code">/verify?id=HB3-2026-0001</span>
                    </p>
                </div>
            </Page>
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
            <Page>
                <div className="error-card">
                    <span className="error-icon">❌</span>
                    <h2 className="error-title">Certificate Not Found</h2>
                    <p className="error-message">
                        No certificate was found matching the ID{" "}
                        <span className="error-id">{id}</span>.
                        Please check the link or scan the QR code again.
                    </p>
                </div>
            </Page>
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
        <Page>
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

                {/* Card Body — Flex Layout */}
                <div className="card-body">
                    <div className="details-flex">
                        <div className="detail-row">
                            <span className="detail-icon">👤</span>
                            <div className="detail-content">
                                <div className="detail-label">Participant Name</div>
                                <div className="detail-value">{certificate.name}</div>
                            </div>
                        </div>

                        <div className="detail-row">
                            <span className="detail-icon">🎓</span>
                            <div className="detail-content">
                                <div className="detail-label">Workshop</div>
                                <div className="detail-value">{certificate.workshop}</div>
                            </div>
                        </div>

                        <div className="detail-row">
                            <span className="detail-icon">📅</span>
                            <div className="detail-content">
                                <div className="detail-label">Event Date</div>
                                <div className="detail-value">{certificate.date}</div>
                            </div>
                        </div>

                        <div className="detail-row">
                            <span className="detail-icon">🏛️</span>
                            <div className="detail-content">
                                <div className="detail-label">College</div>
                                <div className="detail-value">{certificate.college}</div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Card Footer */}
                <div className="card-footer">
                    <div className="verification-timestamp">
                        <span className="timestamp-icon">🕐</span>
                        Verified on {verifiedAt} IST
                    </div>
                </div>
            </div>
        </Page>
    );
}

/* ============================================
   Page Wrapper with Header + Footer
   ============================================ */
function Page({ children }) {
    return (
        <>
            <div className="page-bg" />
            <div className="app-container">
                <div className="content-wrapper">
                    <header className="header">
                        <Image
                            src="/hackbells-logo.png"
                            alt="Hackbells 3.0"
                            width={240}
                            height={240}
                            className="logo-img"
                            priority
                        />
                        <div className="header-badge">🔒 Certificate Verification</div>
                        <p className="header-subtitle">
                            Official verification portal for Hackbells 3.0 workshop certificates
                        </p>
                    </header>

                    {children}

                    <footer className="page-footer">
                        <hr className="footer-line" />
                        <p className="footer-text">
                            © 2026 Hackbells · Sree Buddha College of Engineering, Pattoor
                            <br />
                            <a href="https://www.hackbells.in" className="footer-link" target="_blank" rel="noopener noreferrer">
                                hackbells.in
                            </a>
                        </p>
                    </footer>
                </div>
            </div>
        </>
    );
}
