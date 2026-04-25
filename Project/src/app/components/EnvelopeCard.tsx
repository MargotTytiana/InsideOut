import { useState, useRef } from "react";
import { motion, useMotionValue, animate } from "motion/react";
import type { PanInfo } from "motion/react";
import { ArrowRight, ChevronUp } from "lucide-react";
import { Link } from "react-router";
import type { Project } from "../data/projects";

interface EnvelopeCardProps {
  project: Project;
  index: number;
}

const FLAP_HEIGHT = 252;
const CARD_HEIGHT = 440;
const MIN_STUB = 56; // how much of the flap stays visible at top when "open"
const OPEN_Y = -(FLAP_HEIGHT - MIN_STUB); // -196

export function EnvelopeCard({ project, index }: EnvelopeCardProps) {
  const flapY = useMotionValue(0);
  const [isOpen, setIsOpen] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const wasDragging = useRef(false);

  const snapOpen = () => {
    animate(flapY, OPEN_Y, {
      type: "spring",
      stiffness: 280,
      damping: 30,
    });
    setIsOpen(true);
  };

  const snapClosed = () => {
    animate(flapY, 0, {
      type: "spring",
      stiffness: 280,
      damping: 30,
    });
    setIsOpen(false);
  };

  const handleDragStart = () => {
    wasDragging.current = true;
  };

  const handleDragEnd = (_: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
    const currentY = flapY.get();
    if (currentY < OPEN_Y / 2) {
      snapOpen();
    } else {
      snapClosed();
    }
    setTimeout(() => { wasDragging.current = false; }, 80);
  };

  const handleFlapClick = () => {
    if (wasDragging.current) return;
    if (!isOpen) snapOpen();
    else snapClosed();
  };

  return (
    <motion.div
      ref={cardRef}
      className="relative rounded-[28px] overflow-hidden select-none"
      style={{ height: CARD_HEIGHT }}
      initial={{ opacity: 0, y: 48 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{
        duration: 0.7,
        delay: index * 0.12,
        ease: [0.22, 1, 0.36, 1],
      }}
    >
      {/* ── Pink body (always underneath) ── */}
      <div
        className="absolute inset-0 flex flex-col"
        style={{
          background: "linear-gradient(160deg, #F0DDE4 0%, #EBD6DC 60%, #E4CBCF 100%)",
          padding: "28px 28px 28px 28px",
        }}
      >
        {/* Top content — revealed when flap slides up */}
        <div className="flex flex-col gap-3" style={{ paddingTop: 4 }}>
          <div className="flex items-center gap-2">
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.68rem",
                color: "#674D66",
                opacity: 0.55,
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              {project.number} · {project.year}
            </span>
          </div>

          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.55rem",
              color: "#3D2B3C",
              lineHeight: 1.25,
              margin: 0,
            }}
          >
            {project.title}
          </h3>

          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.82rem",
              color: "#674D66",
              opacity: 0.78,
              lineHeight: 1.7,
              margin: 0,
            }}
          >
            {project.shortDesc}
          </p>

          <div style={{ display: "flex", flexWrap: "wrap", gap: 6, marginTop: 4 }}>
            {project.tech.map((t) => (
              <span
                key={t}
                style={{
                  background: "rgba(103, 77, 102, 0.1)",
                  color: "#674D66",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.7rem",
                  padding: "3px 10px",
                  borderRadius: 999,
                  letterSpacing: "0.04em",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Bottom strip — always visible */}
        <div
          className="flex items-center justify-between mt-auto"
          style={{ paddingTop: 16 }}
        >
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.7rem",
              color: "#674D66",
              opacity: 0.5,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
            }}
          >
            {project.category}
          </span>

          <Link to={`/project/${project.id}`} data-cursor="view">
            <motion.button
              data-cursor="view"
              style={{
                display: "flex",
                alignItems: "center",
                gap: 7,
                background: "#674D66",
                color: "#EBD6DC",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.78rem",
                padding: "8px 18px",
                borderRadius: 999,
                border: "none",
                letterSpacing: "0.02em",
              }}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
            >
              View Project
              <ArrowRight size={13} />
            </motion.button>
          </Link>
        </div>
      </div>

      {/* ── Purple Flap (draggable) ── */}
      <motion.div
        data-cursor="drag"
        className="absolute left-0 right-0 top-0 rounded-[28px]"
        style={{
          height: FLAP_HEIGHT,
          y: flapY,
          background: `linear-gradient(145deg, ${project.accentColor} 0%, #674D66 60%, #7C5E7B 100%)`,
          zIndex: 10,
        }}
        drag="y"
        dragConstraints={{ top: OPEN_Y, bottom: 0 }}
        dragElastic={0.06}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
        onClick={handleFlapClick}
        whileTap={{ cursor: "grabbing" }}
      >
        <div
          className="flex flex-col h-full"
          style={{ padding: "24px 28px 20px 28px" }}
        >
          {/* Icon + title row */}
          <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
            {/* Round icon */}
            <div
              style={{
                width: 52,
                height: 52,
                borderRadius: "50%",
                background: "rgba(235, 214, 220, 0.18)",
                border: "1.5px solid rgba(235, 214, 220, 0.3)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "1.4rem",
                flexShrink: 0,
              }}
            >
              {project.icon}
            </div>

            <div style={{ flex: 1, minWidth: 0 }}>
              <p
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.67rem",
                  color: "rgba(235, 214, 220, 0.55)",
                  letterSpacing: "0.1em",
                  textTransform: "uppercase",
                  margin: "0 0 4px",
                }}
              >
                {project.category}
              </p>
              <p
                style={{
                  fontFamily: "Playfair Display, serif",
                  fontSize: "1.15rem",
                  color: "#EBD6DC",
                  margin: 0,
                  lineHeight: 1.3,
                }}
              >
                {project.title}
              </p>
            </div>
          </div>

          {/* Tags */}
          <div
            style={{
              display: "flex",
              flexWrap: "wrap",
              gap: 7,
              marginTop: "auto",
              paddingTop: 16,
            }}
          >
            {project.tags.map((tag) => (
              <span
                key={tag}
                style={{
                  background: "rgba(255, 255, 255, 0.12)",
                  color: "rgba(235, 214, 220, 0.85)",
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.68rem",
                  padding: "3px 11px",
                  borderRadius: 999,
                  letterSpacing: "0.04em",
                  border: "1px solid rgba(235, 214, 220, 0.15)",
                }}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Drag hint */}
          <motion.div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              paddingTop: 14,
            }}
            animate={{ opacity: isOpen ? 0 : 0.4 }}
            transition={{ duration: 0.3 }}
          >
            <ChevronUp
              size={11}
              color="rgba(235, 214, 220, 0.8)"
            />
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.65rem",
                color: "rgba(235, 214, 220, 0.8)",
                letterSpacing: "0.08em",
              }}
            >
              drag to reveal
            </span>
          </motion.div>
        </div>

        {/* Bottom edge of flap — subtle separator line */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 20,
            right: 20,
            height: 1,
            background:
              "linear-gradient(90deg, transparent, rgba(235,214,220,0.2), transparent)",
          }}
        />
      </motion.div>
    </motion.div>
  );
}
