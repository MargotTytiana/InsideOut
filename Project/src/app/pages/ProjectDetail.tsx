import { useParams, useNavigate } from "react-router";
import { motion } from "motion/react";
import { ArrowLeft, ExternalLink, Github, Zap } from "lucide-react";
import { projects } from "../data/projects";
import { ImageSkeleton } from "../components/ImageSkeleton";

export function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const project = projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div
        style={{
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#FAF0F3",
          fontFamily: "Playfair Display, serif",
          color: "#674D66",
          fontSize: "1.5rem",
          fontStyle: "italic",
        }}
      >
        Project not found.
      </div>
    );
  }

  const others = projects.filter((p) => p.id !== project.id).slice(0, 3);

  return (
    <motion.div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(170deg, #FAF0F3 0%, #F5E8ED 50%, #EFE0E6 100%)",
        fontFamily: "DM Sans, sans-serif",
      }}
      initial={{ opacity: 0, x: 60 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -60 }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* ─── Back button ─── */}
      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 40,
          padding: "14px 32px",
          background: "rgba(250, 240, 243, 0.85)",
          backdropFilter: "blur(16px)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          boxShadow: "0 1px 24px rgba(103,77,102,0.06)",
        }}
      >
        <motion.button
          data-cursor="link"
          onClick={() => navigate(-1)}
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "transparent",
            border: "none",
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.8rem",
            color: "#674D66",
            letterSpacing: "0.04em",
            padding: 0,
            opacity: 0.75,
            cursor: "none",
          }}
          whileHover={{ opacity: 1, x: -2 }}
          transition={{ duration: 0.15 }}
        >
          <ArrowLeft size={15} />
          Back to all projects
        </motion.button>

        <span
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "0.88rem",
            color: "#3D2B3C",
            opacity: 0.6,
          }}
        >
          {project.number} / {String(projects.length).padStart(2, "0")}
        </span>
      </div>

      {/* ─── Hero image ─── */}
      <motion.div
        style={{
          paddingTop: 80,
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "clamp(24px, 6vw, 80px)",
          maxWidth: 1200,
          margin: "0 auto",
          paddingBottom: 0,
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      >
        <ImageSkeleton
          src={project.image}
          alt={project.title}
          style={{
            width: "100%",
            height: "clamp(260px, 42vw, 520px)",
            borderRadius: 24,
            overflow: "hidden",
            boxShadow: "0 24px 64px rgba(103,77,102,0.14)",
          }}
        />
      </motion.div>

      {/* ─── Content ─── */}
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "clamp(40px, 6vw, 72px) clamp(24px, 6vw, 80px) 80px",
          display: "grid",
          gridTemplateColumns: "1fr min(360px, 34%)",
          gap: "clamp(32px, 5vw, 72px)",
          alignItems: "start",
        }}
        className="detail-grid"
      >
        {/* ── Left column ── */}
        <div>
          {/* Category + number */}
          <motion.p
            style={{
              fontSize: "0.7rem",
              color: "#674D66",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.55,
              marginBottom: 12,
            }}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 0.55, y: 0 }}
            transition={{ delay: 0.25 }}
          >
            {project.category} · {project.year}
          </motion.p>

          {/* Title */}
          <motion.h1
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "clamp(2.4rem, 5vw, 4rem)",
              color: "#3D2B3C",
              lineHeight: 1.1,
              marginBottom: 28,
            }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            {project.title}
          </motion.h1>

          {/* Description */}
          <motion.p
            style={{
              fontSize: "0.95rem",
              color: "#674D66",
              lineHeight: 1.85,
              opacity: 0.82,
              maxWidth: 620,
              marginBottom: 40,
            }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 0.82, y: 0 }}
            transition={{ delay: 0.38 }}
          >
            {project.fullDesc}
          </motion.p>

          {/* Features */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                color: "#674D66",
                letterSpacing: "0.14em",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 18,
                display: "flex",
                alignItems: "center",
                gap: 8,
              }}
            >
              <Zap size={12} color="#674D66" />
              Key Features
            </p>
            <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 12 }}>
              {project.features.map((feat, i) => (
                <motion.li
                  key={i}
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: 12,
                    fontSize: "0.88rem",
                    color: "#4A3549",
                    lineHeight: 1.65,
                  }}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.07 }}
                >
                  <span
                    style={{
                      flexShrink: 0,
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: "rgba(103,77,102,0.12)",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: "0.6rem",
                      color: "#674D66",
                      marginTop: 2,
                    }}
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {feat}
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* CTA buttons */}
          <motion.div
            style={{ display: "flex", gap: 12, marginTop: 44, flexWrap: "wrap" }}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.75 }}
          >
            <motion.a
              href="#"
              data-cursor="view"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "#674D66",
                color: "#EBD6DC",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.82rem",
                padding: "12px 24px",
                borderRadius: 999,
                textDecoration: "none",
                letterSpacing: "0.02em",
              }}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
            >
              <ExternalLink size={14} />
              Live Demo
            </motion.a>
            <motion.a
              href="#"
              data-cursor="view"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 8,
                background: "transparent",
                color: "#674D66",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.82rem",
                padding: "12px 24px",
                borderRadius: 999,
                textDecoration: "none",
                border: "1.5px solid rgba(103,77,102,0.35)",
                letterSpacing: "0.02em",
              }}
              whileHover={{ scale: 1.03, borderColor: "rgba(103,77,102,0.7)" }}
              whileTap={{ scale: 0.97 }}
            >
              <Github size={14} />
              GitHub
            </motion.a>
          </motion.div>
        </div>

        {/* ── Right column (sidebar) ── */}
        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          {/* Tech stack card */}
          <div
            style={{
              background: "rgba(235, 214, 220, 0.45)",
              border: "1px solid rgba(103,77,102,0.12)",
              borderRadius: 20,
              padding: "24px 22px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                color: "#674D66",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Tech Stack
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tech.map((t) => (
                <span
                  key={t}
                  style={{
                    background: "#674D66",
                    color: "#EBD6DC",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.72rem",
                    padding: "5px 12px",
                    borderRadius: 999,
                    letterSpacing: "0.03em",
                  }}
                >
                  {t}
                </span>
              ))}
            </div>
          </div>

          {/* Tags card */}
          <div
            style={{
              background: "rgba(235, 214, 220, 0.3)",
              border: "1px solid rgba(103,77,102,0.1)",
              borderRadius: 20,
              padding: "24px 22px",
              marginBottom: 20,
            }}
          >
            <p
              style={{
                fontSize: "0.7rem",
                color: "#674D66",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                opacity: 0.55,
                marginBottom: 16,
              }}
            >
              Tags
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {project.tags.map((tag) => (
                <span
                  key={tag}
                  style={{
                    background: "rgba(103,77,102,0.1)",
                    color: "#674D66",
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.72rem",
                    padding: "5px 12px",
                    borderRadius: 999,
                    border: "1px solid rgba(103,77,102,0.2)",
                    letterSpacing: "0.03em",
                  }}
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Project number / icon */}
          <div
            style={{
              background: "#674D66",
              borderRadius: 20,
              padding: "24px 22px",
              display: "flex",
              alignItems: "center",
              gap: 16,
            }}
          >
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(235,214,220,0.18)",
                border: "1.5px solid rgba(235,214,220,0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              {project.icon}
            </div>
            <div>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.65rem",
                  color: "rgba(235,214,220,0.55)",
                  letterSpacing: "0.12em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                Project {project.number}
              </p>
              <p
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1rem",
                  color: "#EBD6DC",
                  margin: 0,
                  fontStyle: "italic",
                }}
              >
                {project.title}
              </p>
            </div>
          </div>
        </motion.div>
      </div>

      {/* ─── More projects ─── */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "0 clamp(24px, 6vw, 80px) 100px",
        }}
      >
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 40,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div
            style={{
              height: 1,
              width: 40,
              background: "rgba(103,77,102,0.3)",
            }}
          />
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.7rem",
              color: "#674D66",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              opacity: 0.55,
            }}
          >
            More Projects
          </span>
        </motion.div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 280px), 1fr))",
            gap: 20,
          }}
        >
          {others.map((p, i) => (
            <motion.div
              key={p.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            >
              <motion.a
                href={`/project/${p.id}`}
                data-cursor="view"
                style={{
                  display: "block",
                  borderRadius: 20,
                  overflow: "hidden",
                  textDecoration: "none",
                  background: "rgba(235,214,220,0.4)",
                  border: "1px solid rgba(103,77,102,0.1)",
                }}
                whileHover={{ scale: 1.02, y: -3 }}
                transition={{ duration: 0.25 }}
              >
                <ImageSkeleton
                  src={p.image}
                  alt={p.title}
                  style={{
                    width: "100%",
                    height: 160,
                    overflow: "hidden",
                  }}
                />
                <div style={{ padding: "16px 18px 18px" }}>
                  <p
                    style={{
                      fontFamily: "DM Sans, sans-serif",
                      fontSize: "0.65rem",
                      color: "#674D66",
                      opacity: 0.5,
                      letterSpacing: "0.1em",
                      textTransform: "uppercase",
                      marginBottom: 6,
                    }}
                  >
                    {p.category}
                  </p>
                  <p
                    style={{
                      fontFamily: "Playfair Display, serif",
                      fontSize: "1rem",
                      color: "#3D2B3C",
                      margin: 0,
                      lineHeight: 1.3,
                    }}
                  >
                    {p.title}
                  </p>
                </div>
              </motion.a>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Responsive grid fix */}
      <style>{`
        @media (max-width: 720px) {
          .detail-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>
    </motion.div>
  );
}
