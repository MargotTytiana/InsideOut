import { useState, useRef } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { ChevronLeft } from "lucide-react";
import { BookPanel } from "../components/notes/BookPanel";
import { KnowledgeGraph } from "../components/notes/KnowledgeGraph";
import { PanelDivider } from "../components/notes/PanelDivider";
import type { Book } from "../data/booksData";

export function CozyNotes() {
  const [leftPct, setLeftPct] = useState(50);
  const [isLeftCollapsed, setIsLeftCollapsed] = useState(false);
  const [isRightCollapsed, setIsRightCollapsed] = useState(false);
  const [isLocked, setIsLocked] = useState(false);
  const [selectedBook, setSelectedBook] = useState<Book | null>(null);
  const [highlightedBookId, setHighlightedBookId] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const collapseLeft = () => {
    setIsLeftCollapsed(true);
    setIsRightCollapsed(false);
  };
  const collapseRight = () => {
    setIsRightCollapsed(true);
    setIsLeftCollapsed(false);
  };
  const expandBoth = () => {
    setIsLeftCollapsed(false);
    setIsRightCollapsed(false);
  };

  // Compute actual widths
  const leftWidth = isLeftCollapsed ? 0 : isRightCollapsed ? 100 : leftPct;
  const rightWidth = 100 - leftWidth;

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        background: "#0D1B27",
        overflow: "hidden",
        fontFamily: "DM Sans, sans-serif",
        position: "relative",
      }}
    >
      {/* ── Minimal top bar ── */}
      <div
        style={{
          height: 44,
          flexShrink: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingLeft: 48,
          paddingRight: 24,
          background: "rgba(13, 27, 39, 0.92)",
          backdropFilter: "blur(12px)",
          borderBottom: "1px solid rgba(86, 124, 141, 0.12)",
          zIndex: 30,
        }}
      >
        {/* Left: project name */}
        <span
          style={{
            fontFamily: "Playfair Display, serif",
            fontSize: "0.82rem",
            color: "rgba(200, 217, 230, 0.55)",
            fontStyle: "italic",
            letterSpacing: "0.02em",
          }}
        >
          Cozy Notes
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.65rem",
              color: "rgba(200,217,230,0.25)",
              fontStyle: "normal",
              marginLeft: 10,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
            }}
          >
            Reading Journal
          </span>
        </span>

        {/* Right: nav links */}
        <div style={{ display: "flex", alignItems: "center", gap: 22 }}>
          {["Graph", "Notes", "Archive"].map((item) => (
            <a
              key={item}
              href="#"
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.72rem",
                color: "rgba(200, 217, 230, 0.45)",
                letterSpacing: "0.08em",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "color 0.2s",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(200,217,230,0.85)")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.color = "rgba(200,217,230,0.45)")
              }
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      {/* ── Main panels row ── */}
      <div
        ref={containerRef}
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* ─ Left panel (book grid) ─ */}
        <motion.div
          animate={{ width: `${leftWidth}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flexShrink: 0,
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {leftWidth > 0 && (
            <BookPanel
              selectedBook={selectedBook}
              onSelectBook={setSelectedBook}
              onBookHighlight={setHighlightedBookId}
            />
          )}
        </motion.div>

        {/* ─ Divider ─ */}
        {!isLeftCollapsed && !isRightCollapsed && (
          <PanelDivider
            onResize={setLeftPct}
            onCollapseLeft={collapseLeft}
            onCollapseRight={collapseRight}
            onExpandBoth={expandBoth}
            isLeftCollapsed={isLeftCollapsed}
            isRightCollapsed={isRightCollapsed}
            isLocked={isLocked}
            onToggleLock={() => setIsLocked((v) => !v)}
            containerRef={containerRef}
          />
        )}

        {/* Collapsed panel re-expand tabs */}
        {isLeftCollapsed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={expandBoth}
            style={{
              width: 22,
              flexShrink: 0,
              background: "rgba(86,124,141,0.12)",
              border: "none",
              borderRight: "1px solid rgba(86,124,141,0.18)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(200,217,230,0.4)",
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Books
            </span>
          </motion.button>
        )}

        {/* ─ Right panel (knowledge graph) ─ */}
        <motion.div
          animate={{ width: `${rightWidth}%` }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          style={{
            flex: rightWidth > 0 ? undefined : "0 0 0",
            flexGrow: 1,
            overflow: "hidden",
            minWidth: 0,
          }}
        >
          {rightWidth > 0 && (
            <KnowledgeGraph
              selectedBookId={selectedBook?.id ?? null}
              highlightedNodeId={highlightedBookId}
            />
          )}
        </motion.div>

        {isRightCollapsed && (
          <motion.button
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            onClick={expandBoth}
            style={{
              width: 22,
              flexShrink: 0,
              background: "rgba(86,124,141,0.12)",
              border: "none",
              borderLeft: "1px solid rgba(86,124,141,0.18)",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "rgba(200,217,230,0.4)",
            }}
          >
            <span
              style={{
                writingMode: "vertical-rl",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.6rem",
                letterSpacing: "0.1em",
                textTransform: "uppercase",
              }}
            >
              Graph
            </span>
          </motion.button>
        )}
      </div>

      {/* ── Back-to-home button — fixed left-center rectangle ── */}
      <motion.div
        style={{
          position: "fixed",
          left: 0,
          top: "50%",
          transform: "translateY(-50%)",
          zIndex: 50,
        }}
        initial={{ x: -44 }}
        animate={{ x: 0 }}
        transition={{ delay: 0.6, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      >
        <Link to="/" style={{ textDecoration: "none" }}>
          <motion.div
            style={{
              width: 36,
              height: 64,
              background: "#2F4156",
              borderRadius: "0 10px 10px 0",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              gap: 4,
              boxShadow: "2px 0 16px rgba(13,27,39,0.5)",
              cursor: "pointer",
            }}
            whileHover={{
              width: 52,
              background: "#567C8D",
            }}
            transition={{ duration: 0.2 }}
          >
            <ChevronLeft size={16} color="rgba(200,217,230,0.85)" />
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.48rem",
                color: "rgba(200,217,230,0.55)",
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                writingMode: "vertical-rl",
                transform: "rotate(180deg)",
              }}
            >
              Home
            </span>
          </motion.div>
        </Link>
      </motion.div>
    </div>
  );
}