import { motion } from "motion/react";
import { ArrowRight } from "lucide-react";
import { EnvelopeCard } from "../components/EnvelopeCard";
import { projects } from "../data/projects";

const titleWords = ["Projects", "Exhibition"];

const VISIBLE_COUNT = 3;

export function Home() {
  const visibleProjects = projects.slice(0, VISIBLE_COUNT);
  const hiddenProjects = projects.slice(VISIBLE_COUNT);

  return (
    <div
      style={{
        minHeight: "100vh",
        background: "linear-gradient(170deg, #FAF0F3 0%, #F5E8ED 40%, #EFE0E6 100%)",
        fontFamily: "DM Sans, sans-serif",
      }}
    >
      {/* ─── Hero ─── */}
      <section
        style={{
          paddingTop: "clamp(110px, 16vw, 180px)",
          paddingBottom: "clamp(48px, 8vw, 80px)",
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "clamp(24px, 6vw, 80px)",
          maxWidth: 1200,
          margin: "0 auto",
        }}
      >
        {/* Eyebrow */}
        <motion.p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.72rem",
            color: "#674D66",
            letterSpacing: "0.18em",
            textTransform: "uppercase",
            opacity: 0.65,
            marginBottom: 20,
          }}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 0.65, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          ✦ &nbsp; Creative Engineering &nbsp; · &nbsp; 2024 – 2025
        </motion.p>

        {/* Big title */}
        <h1
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "clamp(3.2rem, 8vw, 7.2rem)",
            color: "#3D2B3C",
            lineHeight: 1.05,
            margin: "0 0 24px",
            display: "flex",
            flexWrap: "wrap",
            gap: "0 0.3em",
          }}
        >
          {titleWords.map((word, wi) => (
            <motion.span
              key={word}
              style={{ display: "inline-block", overflow: "hidden" }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.01, delay: 0.2 + wi * 0.05 }}
            >
              <motion.span
                style={{ display: "inline-block" }}
                initial={{ y: "105%" }}
                animate={{ y: 0 }}
                transition={{
                  duration: 0.75,
                  delay: 0.25 + wi * 0.14,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                {wi === 1 ? (
                  <em style={{ fontStyle: "italic", color: "#674D66" }}>{word}</em>
                ) : (
                  word
                )}
              </motion.span>
            </motion.span>
          ))}
        </h1>

        {/* Subtitle + rule */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 24,
            maxWidth: 540,
          }}
        >
          <motion.div
            style={{
              flex: "0 0 40px",
              height: 1,
              background: "rgba(103, 77, 102, 0.35)",
            }}
            initial={{ scaleX: 0, originX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 0.7, ease: [0.22, 1, 0.36, 1] }}
          />
          <motion.p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.88rem",
              color: "#674D66",
              opacity: 0.7,
              lineHeight: 1.75,
              margin: 0,
            }}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 0.7, x: 0 }}
            transition={{ duration: 0.7, delay: 0.75 }}
          >
            A curated collection of interactive tools, visualizations, and creative
            experiments built with care.
          </motion.p>
        </div>

        {/* Scroll hint */}
        <motion.div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 8,
            marginTop: 40,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 0.6 }}
        >
          <motion.div
            style={{
              width: 1,
              height: 36,
              background: "rgba(103, 77, 102, 0.3)",
              borderRadius: 1,
            }}
            animate={{ scaleY: [1, 0.4, 1] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
          />
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.7rem",
              color: "#674D66",
              opacity: 0.45,
              letterSpacing: "0.1em",
              textTransform: "uppercase",
            }}
          >
            Scroll to explore
          </span>
        </motion.div>
      </section>

      {/* ─── Decorative separator ─── */}
      <motion.div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "clamp(24px, 6vw, 80px)",
          display: "flex",
          alignItems: "center",
          gap: 16,
          marginBottom: 64,
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
      >
        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(103,77,102,0.25), rgba(103,77,102,0.06))",
          }}
        />
        <span
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "0.75rem",
            color: "#674D66",
            opacity: 0.4,
            letterSpacing: "0.15em",
            textTransform: "uppercase",
          }}
        >
          {projects.length} Projects
        </span>
        <div
          style={{
            flex: 1,
            height: 1,
            background:
              "linear-gradient(90deg, rgba(103,77,102,0.06), rgba(103,77,102,0.25))",
          }}
        />
      </motion.div>

      {/* ─── Cards grid ─── */}
      <section
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "clamp(24px, 6vw, 80px)",
          paddingBottom: 120,
        }}
      >
        {/* Instruction hint */}
        <motion.p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.72rem",
            color: "#674D66",
            opacity: 0.45,
            letterSpacing: "0.08em",
            marginBottom: 32,
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.45 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            style={{
              display: "inline-flex",
              width: 18,
              height: 18,
              borderRadius: "50%",
              border: "1px solid rgba(103,77,102,0.35)",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "0.6rem",
              flexShrink: 0,
            }}
          >
            ↑
          </span>
          Drag the purple flap upward to peek inside each project
        </motion.p>

        {/* Cards + right panel */}
        <div style={{ display: "flex", alignItems: "flex-start", gap: 32 }}>

          {/* 3 visible cards */}
          <div
            style={{
              flex: 1,
              display: "grid",
              gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 320px), 1fr))",
              gap: 28,
              minWidth: 0,
            }}
          >
            {visibleProjects.map((project, index) => (
              <EnvelopeCard key={project.id} project={project} index={index} />
            ))}
          </div>

          {/* Right panel — compact hidden projects + more arrow */}
          <motion.div
            style={{
              width: 100,
              flexShrink: 0,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              gap: 24,
              paddingTop: 48,
            }}
            initial={{ opacity: 0, x: 16 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.45 }}
          >
            {/* Vertical "more" label */}
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.58rem",
                color: "rgba(103, 77, 102, 0.3)",
                letterSpacing: "0.22em",
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              more
            </span>

            {/* Connector */}
            <div
              style={{
                width: 1,
                height: 20,
                background: "linear-gradient(to bottom, rgba(103,77,102,0.08), rgba(103,77,102,0.22))",
              }}
            />

            {/* Mini badges for hidden projects */}
            {hiddenProjects.map((p) => (
              <motion.div
                key={p.id}
                whileHover={{ scale: 1.06, opacity: 0.9 }}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 7,
                  cursor: "pointer",
                  opacity: 0.45,
                }}
              >
                <div
                  style={{
                    width: 48,
                    height: 48,
                    borderRadius: "50%",
                    border: "1px solid rgba(103, 77, 102, 0.2)",
                    background: `linear-gradient(135deg, ${p.accentColor}28, rgba(103,77,102,0.06))`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: "1.2rem",
                  }}
                >
                  {p.icon}
                </div>
                <span
                  style={{
                    fontFamily: "DM Sans, sans-serif",
                    fontSize: "0.56rem",
                    color: "rgba(103, 77, 102, 0.45)",
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    textAlign: "center",
                  }}
                >
                  {p.number}
                </span>
                <span
                  style={{
                    fontFamily: "Playfair Display, serif",
                    fontSize: "0.7rem",
                    color: "rgba(103, 77, 102, 0.6)",
                    textAlign: "center",
                    lineHeight: 1.3,
                  }}
                >
                  {p.title}
                </span>
              </motion.div>
            ))}

            {/* Connector to arrow */}
            <div
              style={{
                width: 1,
                flex: 1,
                minHeight: 28,
                background: "linear-gradient(to bottom, rgba(103,77,102,0.2), rgba(103,77,102,0.06))",
              }}
            />

            {/* More projects arrow */}
            <motion.div
              whileHover={{ x: 5, scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              style={{
                width: 56,
                height: 56,
                borderRadius: "50%",
                border: "1.5px solid rgba(103, 77, 102, 0.28)",
                background: "rgba(103, 77, 102, 0.05)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                color: "rgba(103, 77, 102, 0.7)",
                flexShrink: 0,
              }}
              transition={{ duration: 0.2 }}
            >
              <ArrowRight size={20} strokeWidth={1.5} />
            </motion.div>

            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.56rem",
                color: "rgba(103, 77, 102, 0.35)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                textAlign: "center",
                lineHeight: 1.5,
              }}
            >
              all
              <br />
              projects
            </span>
          </motion.div>
        </div>
      </section>

      {/* ─── Footer ─── */}
      <footer
        style={{
          borderTop: "1px solid rgba(103, 77, 102, 0.1)",
          paddingTop: 36,
          paddingBottom: 40,
          paddingLeft: "clamp(24px, 6vw, 80px)",
          paddingRight: "clamp(24px, 6vw, 80px)",
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <span
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "0.88rem",
            color: "#674D66",
            opacity: 0.55,
            fontStyle: "italic",
          }}
        >
          Made with care &amp; a cozy vibe
        </span>
        <span
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.72rem",
            color: "#674D66",
            opacity: 0.35,
            letterSpacing: "0.08em",
          }}
        >
          © 2025
        </span>
      </footer>
    </div>
  );
}
