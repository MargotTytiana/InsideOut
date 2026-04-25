import { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link, useLocation } from "react-router";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isDetail = location.pathname !== "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between"
      style={{
        paddingLeft: 32,
        paddingRight: 32,
        paddingTop: 14,
        paddingBottom: 14,
        background: scrolled
          ? "rgba(250, 240, 243, 0.88)"
          : "rgba(250, 240, 243, 0.0)",
        backdropFilter: scrolled ? "blur(16px)" : "none",
        boxShadow: scrolled
          ? "0 1px 24px rgba(103, 77, 102, 0.07)"
          : "none",
        transition: "background 0.4s ease, backdrop-filter 0.4s ease, box-shadow 0.4s ease",
      }}
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {/* Logo / name */}
      <Link
        to="/"
        data-cursor="link"
        style={{
          fontFamily: "Playfair Display, serif",
          fontSize: "0.95rem",
          color: "#3D2B3C",
          letterSpacing: "0.02em",
          textDecoration: "none",
          opacity: 0.85,
        }}
      >
        {isDetail ? (
          <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
            <span style={{ fontSize: "0.8rem", opacity: 0.5 }}>←</span> Portfolio
          </span>
        ) : (
          "Portfolio"
        )}
      </Link>

      {/* Nav links */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: 28,
        }}
      >
        {["Work", "About", "Contact"].map((item) => (
          <a
            key={item}
            href="#"
            data-cursor="link"
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.78rem",
              color: "#674D66",
              letterSpacing: "0.06em",
              textDecoration: "none",
              opacity: 0.7,
              textTransform: "uppercase",
              transition: "opacity 0.2s",
            }}
            onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "1")}
            onMouseLeave={(e) =>
              ((e.target as HTMLElement).style.opacity = "0.7")
            }
          >
            {item}
          </a>
        ))}
      </div>
    </motion.nav>
  );
}
