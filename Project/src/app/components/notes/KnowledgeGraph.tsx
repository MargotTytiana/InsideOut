import { useState, useRef, useCallback, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { X, BookOpen, Link2, ArrowUpRight } from "lucide-react";
import { graphNodes, graphEdges, type GraphNode } from "../../data/graphData";
import { books } from "../../data/booksData";

const C = {
  bg: "#0D1B27",
  grid: "rgba(86, 124, 141, 0.07)",
  hub: "#C8D9E6",
  category: "#7AAFC4",
  book: "#567C8D",
  concept: "#8BAFC0",
  edgeDefault: "rgba(86, 124, 141, 0.22)",
  edgeActive: "rgba(200, 217, 230, 0.55)",
  labelDefault: "rgba(200, 217, 230, 0.65)",
  labelActive: "#C8D9E6",
  nodeGlow: "rgba(86, 124, 141, 0.35)",
  navy: "#2F4156",
  teal: "#567C8D",
  skyBlue: "#C8D9E6",
};

function nodeColor(n: GraphNode, isHovered: boolean, isSelected: boolean, isRelated: boolean, hasActive: boolean): string {
  const base =
    n.type === "hub"
      ? C.hub
      : n.type === "category"
      ? C.category
      : n.type === "book"
      ? C.book
      : C.concept;
  if (isSelected) return "#EBF3FA";
  if (isHovered) return "#A8CFDF";
  if (isRelated) return "#7BBBD4";
  if (hasActive && !isSelected && !isHovered && !isRelated) return "rgba(86,124,141,0.25)";
  return base;
}

function nodeRadius(n: GraphNode, isHovered: boolean, isSelected: boolean): number {
  const base = n.r;
  if (isSelected) return base * 1.6;
  if (isHovered) return base * 1.35;
  return base;
}

/** Simple bezier midpoint offset for curved edges */
function edgePath(from: GraphNode, to: GraphNode): string {
  const dx = to.x - from.x;
  const dy = to.y - from.y;
  const mx = (from.x + to.x) / 2 - dy * 0.15;
  const my = (from.y + to.y) / 2 + dx * 0.15;
  return `M ${from.x} ${from.y} Q ${mx} ${my} ${to.x} ${to.y}`;
}

// Build adjacency set for quick lookup
function buildAdjacency(): Map<string, Set<string>> {
  const adj = new Map<string, Set<string>>();
  graphNodes.forEach((n) => adj.set(n.id, new Set()));
  graphEdges.forEach((e) => {
    adj.get(e.from)?.add(e.to);
    adj.get(e.to)?.add(e.from);
  });
  return adj;
}
const adjacency = buildAdjacency();

// ── Node Detail Panel ──────────────────────────────────────────────────────
function NodeDetailPanel({
  node,
  onClose,
}: {
  node: GraphNode;
  onClose: () => void;
}) {
  const relatedBooks = (node.detail?.relatedBooks ?? [])
    .map((id) => books.find((b) => b.id === id))
    .filter(Boolean);

  const matchedBook = node.bookId
    ? books.find((b) => b.id === node.bookId)
    : null;

  return (
    <motion.div
      key="node-detail"
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 8 }}
      transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
      style={{
        flex: 1,
        background: "rgba(13, 27, 39, 0.97)",
        backdropFilter: "blur(12px)",
        overflowY: "auto",
        padding: "20px 22px",
        borderTop: "1px solid rgba(86, 124, 141, 0.25)",
      }}
    >
      {/* Header */}
      <div
        style={{
          display: "flex",
          alignItems: "flex-start",
          justifyContent: "space-between",
          marginBottom: 14,
        }}
      >
        <div>
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.6rem",
              color: "rgba(200,217,230,0.45)",
              letterSpacing: "0.14em",
              textTransform: "uppercase",
              display: "block",
              marginBottom: 4,
            }}
          >
            {node.type === "hub"
              ? "Collection Hub"
              : node.type === "category"
              ? "Category"
              : node.type === "book"
              ? "Book Node"
              : "Concept"}
          </span>
          <h3
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "1.1rem",
              color: C.skyBlue,
              margin: 0,
              lineHeight: 1.25,
            }}
          >
            {node.label}
          </h3>
        </div>
        <motion.button
          onClick={onClose}
          style={{
            background: "rgba(86,124,141,0.15)",
            border: "1px solid rgba(86,124,141,0.25)",
            borderRadius: "50%",
            width: 28,
            height: 28,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            cursor: "pointer",
            color: "rgba(200,217,230,0.7)",
            flexShrink: 0,
          }}
          whileHover={{ background: "rgba(86,124,141,0.3)", color: C.skyBlue }}
        >
          <X size={13} />
        </motion.button>
      </div>

      {/* Description */}
      {node.detail?.description && (
        <p
          style={{
            fontFamily: "DM Sans, sans-serif",
            fontSize: "0.79rem",
            color: "rgba(200,217,230,0.75)",
            lineHeight: 1.7,
            margin: "0 0 16px",
          }}
        >
          {node.detail.description}
        </p>
      )}

      {/* Quote (for book nodes) */}
      {node.detail?.quote && (
        <blockquote
          style={{
            margin: "0 0 16px",
            paddingLeft: 12,
            borderLeft: `2px solid ${C.teal}`,
          }}
        >
          <p
            style={{
              fontFamily: "Playfair Display, serif",
              fontSize: "0.82rem",
              color: "rgba(200,217,230,0.7)",
              fontStyle: "italic",
              lineHeight: 1.6,
              margin: 0,
            }}
          >
            "{node.detail.quote}"
          </p>
        </blockquote>
      )}

      {/* Matched book cover */}
      {matchedBook && (
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "10px 12px",
            background: "rgba(86,124,141,0.1)",
            border: "1px solid rgba(86,124,141,0.2)",
            borderRadius: 8,
            marginBottom: 14,
          }}
        >
          <img
            src={matchedBook.cover}
            alt={matchedBook.title}
            style={{
              width: 36,
              height: 50,
              objectFit: "cover",
              borderRadius: 4,
              flexShrink: 0,
            }}
          />
          <div>
            <p
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "0.82rem",
                color: C.skyBlue,
                margin: "0 0 2px",
              }}
            >
              {matchedBook.title}
            </p>
            <p
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.65rem",
                color: "rgba(200,217,230,0.45)",
                margin: 0,
              }}
            >
              {matchedBook.author} · {matchedBook.readingProgress}% read
            </p>
          </div>
          <ArrowUpRight size={14} color="rgba(200,217,230,0.4)" style={{ marginLeft: "auto" }} />
        </div>
      )}

      {/* Related books */}
      {relatedBooks.length > 0 && (
        <div>
          <p
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.62rem",
              color: C.teal,
              letterSpacing: "0.12em",
              textTransform: "uppercase",
              margin: "0 0 8px",
              display: "flex",
              alignItems: "center",
              gap: 5,
            }}
          >
            <Link2 size={10} />
            Connected Books
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {relatedBooks.map(
              (b) =>
                b && (
                  <div
                    key={b.id}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: 8,
                    }}
                  >
                    <BookOpen size={11} color={C.teal} />
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.74rem",
                        color: "rgba(200,217,230,0.7)",
                      }}
                    >
                      {b.title}
                    </span>
                    <span
                      style={{
                        fontFamily: "DM Sans, sans-serif",
                        fontSize: "0.62rem",
                        color: "rgba(200,217,230,0.35)",
                      }}
                    >
                      — {b.author}
                    </span>
                  </div>
                )
            )}
          </div>
        </div>
      )}
    </motion.div>
  );
}

// ── Main KnowledgeGraph ───────────────────────────────────────────────────
interface KnowledgeGraphProps {
  selectedBookId: string | null;
  highlightedNodeId: string | null;
}

export function KnowledgeGraph({
  selectedBookId,
  highlightedNodeId,
}: KnowledgeGraphProps) {
  const [hoveredId, setHoveredId] = useState<string | null>(null);
  const [selectedNode, setSelectedNode] = useState<GraphNode | null>(null);
  const [pan, setPan] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(0.92);
  const isPanning = useRef(false);
  const lastPan = useRef({ x: 0, y: 0 });
  const svgRef = useRef<SVGSVGElement>(null);

  // When a book is selected from left panel, highlight its node
  const activeNodeId =
    hoveredId ??
    selectedNode?.id ??
    (selectedBookId
      ? graphNodes.find((n) => n.bookId === selectedBookId)?.id ?? null
      : null) ??
    (highlightedNodeId
      ? graphNodes.find((n) => n.bookId === highlightedNodeId)?.id ?? null
      : null);

  const hasActive = activeNodeId !== null;
  const relatedIds = activeNodeId ? adjacency.get(activeNodeId) ?? new Set() : new Set<string>();

  // Pulse animation state
  const [pulseScale, setPulseScale] = useState(1);
  useEffect(() => {
    if (!activeNodeId) { setPulseScale(1); return; }
    const interval = setInterval(() => {
      setPulseScale((s) => (s === 1 ? 1.15 : 1));
    }, 900);
    return () => clearInterval(interval);
  }, [activeNodeId]);

  // Wheel zoom
  const handleWheel = useCallback((e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY < 0 ? 1.08 : 0.92;
    setZoom((z) => Math.max(0.3, Math.min(3, z * delta)));
  }, []);

  // Pan
  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    if ((e.target as SVGElement).closest("[data-node]")) return;
    isPanning.current = true;
    lastPan.current = { x: e.clientX, y: e.clientY };
  }, []);

  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!isPanning.current) return;
    const dx = e.clientX - lastPan.current.x;
    const dy = e.clientY - lastPan.current.y;
    lastPan.current = { x: e.clientX, y: e.clientY };
    setPan((p) => ({ x: p.x + dx, y: p.y + dy }));
  }, []);

  const handleMouseUp = useCallback(() => {
    isPanning.current = false;
  }, []);

  const handleNodeClick = useCallback((node: GraphNode) => {
    setSelectedNode((prev) => (prev?.id === node.id ? null : node));
  }, []);

  // World-to-SVG transform string
  const transform = `translate(${pan.x}, ${pan.y}) scale(${zoom})`;

  // Dot grid positions
  const dots: { cx: number; cy: number }[] = [];
  for (let x = -400; x <= 400; x += 50) {
    for (let y = -340; y <= 340; y += 50) {
      dots.push({ cx: x, cy: y });
    }
  }

  return (
    <div
      style={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        background: C.bg,
        overflow: "hidden",
      }}
    >
      {/* Graph area */}
      <motion.div
        animate={{ flex: selectedNode ? "0 0 55%" : "0 0 100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        style={{ position: "relative", overflow: "hidden", minHeight: 0 }}
      >
        {/* Header bar */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            zIndex: 5,
            padding: "12px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            background: "linear-gradient(to bottom, rgba(13,27,39,0.9) 0%, transparent 100%)",
          }}
        >
          <div>
            <span
              style={{
                fontFamily: "Playfair Display, serif",
                fontSize: "0.82rem",
                color: "rgba(200,217,230,0.6)",
                fontStyle: "italic",
              }}
            >
              Knowledge Graph
            </span>
          </div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 10,
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.6rem",
              color: "rgba(200,217,230,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            <span>{graphNodes.length} nodes</span>
            <span>·</span>
            <span>{graphEdges.length} links</span>
            <span>·</span>
            <span>scroll to zoom · drag to pan</span>
          </div>
        </div>

        {/* SVG Graph */}
        <svg
          ref={svgRef}
          viewBox="-450 -360 900 720"
          style={{
            width: "100%",
            height: "100%",
            cursor: isPanning.current ? "grabbing" : "grab",
          }}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          <defs>
            {/* Glow filter */}
            <filter id="node-glow" x="-60%" y="-60%" width="220%" height="220%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
            <filter id="node-glow-strong" x="-80%" y="-80%" width="260%" height="260%">
              <feGaussianBlur stdDeviation="7" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>

            {/* Edge gradient */}
            <linearGradient id="edge-grad" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="rgba(86,124,141,0.15)" />
              <stop offset="50%" stopColor="rgba(86,124,141,0.4)" />
              <stop offset="100%" stopColor="rgba(86,124,141,0.15)" />
            </linearGradient>

            {/* Background radial gradient */}
            <radialGradient id="bg-radial" cx="50%" cy="50%" r="50%">
              <stop offset="0%" stopColor="rgba(86,124,141,0.06)" />
              <stop offset="100%" stopColor="rgba(13,27,39,0)" />
            </radialGradient>
          </defs>

          {/* Background radial glow */}
          <ellipse cx="0" cy="0" rx="380" ry="300" fill="url(#bg-radial)" />

          <g transform={transform}>
            {/* Dot grid */}
            {dots.map((d, i) => (
              <circle
                key={i}
                cx={d.cx}
                cy={d.cy}
                r={1.2}
                fill="rgba(86,124,141,0.12)"
              />
            ))}

            {/* Edges */}
            {graphEdges.map((edge) => {
              const fromNode = graphNodes.find((n) => n.id === edge.from);
              const toNode = graphNodes.find((n) => n.id === edge.to);
              if (!fromNode || !toNode) return null;

              const isActive =
                hasActive &&
                (edge.from === activeNodeId ||
                  edge.to === activeNodeId ||
                  (relatedIds.has(edge.from) && relatedIds.has(edge.to)));

              const isDimmed = hasActive && !isActive;

              return (
                <path
                  key={edge.id}
                  d={edgePath(fromNode, toNode)}
                  fill="none"
                  stroke={
                    isDimmed
                      ? "rgba(86,124,141,0.05)"
                      : isActive
                      ? C.edgeActive
                      : "url(#edge-grad)"
                  }
                  strokeWidth={isActive ? 1.5 : 0.8}
                  strokeLinecap="round"
                  style={{ transition: "stroke 0.3s, stroke-width 0.3s" }}
                />
              );
            })}

            {/* Nodes */}
            {graphNodes.map((node) => {
              const isHovered = hoveredId === node.id;
              const isSelected = selectedNode?.id === node.id;
              const isRelated = relatedIds.has(node.id);
              const isDimmed = hasActive && !isSelected && !isHovered && !isRelated && node.id !== activeNodeId;
              const isHighlighted = node.id === activeNodeId;

              const r = nodeRadius(node, isHovered, isSelected);
              const color = nodeColor(node, isHovered, isSelected, isRelated, hasActive);

              const labelOffsetX = node.r + 6;
              const labelOffsetY = 4;
              const showLabel =
                node.type !== "concept" || isHovered || isRelated || isHighlighted;

              return (
                <g
                  key={node.id}
                  data-node="true"
                  style={{ cursor: "pointer" }}
                  onMouseEnter={() => setHoveredId(node.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNodeClick(node);
                  }}
                >
                  {/* Outer glow ring for hub / active nodes */}
                  {(node.type === "hub" || isSelected || isHighlighted) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r + 10}
                      fill="none"
                      stroke={
                        isSelected
                          ? "rgba(200,217,230,0.3)"
                          : node.type === "hub"
                          ? "rgba(200,217,230,0.15)"
                          : "rgba(86,124,141,0.3)"
                      }
                      strokeWidth={1}
                      style={{ transition: "r 0.3s" }}
                    />
                  )}

                  {/* Glow halo */}
                  {(isHovered || isSelected || isHighlighted) && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={r + 16}
                      fill={
                        isSelected
                          ? "rgba(200,217,230,0.08)"
                          : "rgba(86,124,141,0.1)"
                      }
                      filter="url(#node-glow)"
                    />
                  )}

                  {/* Main node circle */}
                  <circle
                    cx={node.x}
                    cy={node.y}
                    r={
                      isHighlighted && !isSelected
                        ? r * pulseScale
                        : r
                    }
                    fill={color}
                    opacity={isDimmed ? 0.18 : 1}
                    filter={isSelected || isHighlighted ? "url(#node-glow-strong)" : undefined}
                    style={{
                      transition: "r 0.25s, fill 0.25s, opacity 0.25s",
                    }}
                  />

                  {/* Hub inner ring */}
                  {node.type === "hub" && (
                    <circle
                      cx={node.x}
                      cy={node.y}
                      r={node.r * 0.55}
                      fill="none"
                      stroke="rgba(47,65,86,0.5)"
                      strokeWidth={1.5}
                    />
                  )}

                  {/* Label */}
                  {showLabel && (
                    <text
                      x={node.x + labelOffsetX}
                      y={node.y + labelOffsetY}
                      fontFamily="DM Sans, sans-serif"
                      fontSize={
                        node.type === "hub"
                          ? 11
                          : node.type === "category"
                          ? 10
                          : node.type === "book"
                          ? 9
                          : 8
                      }
                      fill={
                        isDimmed
                          ? "rgba(200,217,230,0.12)"
                          : isSelected || isHighlighted
                          ? C.labelActive
                          : C.labelDefault
                      }
                      style={{ transition: "fill 0.25s, opacity 0.25s" }}
                      pointerEvents="none"
                    >
                      {node.label}
                    </text>
                  )}
                </g>
              );
            })}
          </g>
        </svg>

        {/* Zoom controls */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            right: 16,
            display: "flex",
            flexDirection: "column",
            gap: 4,
            zIndex: 5,
          }}
        >
          {[
            { label: "+", action: () => setZoom((z) => Math.min(3, z * 1.2)) },
            { label: "○", action: () => { setZoom(0.92); setPan({ x: 0, y: 0 }); } },
            { label: "–", action: () => setZoom((z) => Math.max(0.3, z * 0.8)) },
          ].map(({ label, action }) => (
            <motion.button
              key={label}
              onClick={action}
              style={{
                width: 26,
                height: 26,
                background: "rgba(13,27,39,0.8)",
                border: "1px solid rgba(86,124,141,0.25)",
                borderRadius: 6,
                color: "rgba(200,217,230,0.65)",
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.75rem",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              whileHover={{ background: "rgba(86,124,141,0.2)", color: C.skyBlue }}
            >
              {label}
            </motion.button>
          ))}
        </div>

        {/* Legend */}
        <div
          style={{
            position: "absolute",
            bottom: 14,
            left: 16,
            zIndex: 5,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {[
            { color: C.hub, label: "Hub" },
            { color: C.category, label: "Category" },
            { color: C.book, label: "Book" },
            { color: C.concept, label: "Concept" },
          ].map(({ color, label }) => (
            <div key={label} style={{ display: "flex", alignItems: "center", gap: 5 }}>
              <div
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: color,
                }}
              />
              <span
                style={{
                  fontFamily: "DM Sans, sans-serif",
                  fontSize: "0.58rem",
                  color: "rgba(200,217,230,0.35)",
                  letterSpacing: "0.05em",
                }}
              >
                {label}
              </span>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Node detail panel — slides in below graph */}
      <AnimatePresence>
        {selectedNode && (
          <NodeDetailPanel
            key="detail"
            node={selectedNode}
            onClose={() => setSelectedNode(null)}
          />
        )}
      </AnimatePresence>

      {/* Bottom info bar when no node selected */}
      {!selectedNode && (
        <div
          style={{
            padding: "10px 18px",
            borderTop: "1px solid rgba(86,124,141,0.12)",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexShrink: 0,
          }}
        >
          <span
            style={{
              fontFamily: "DM Sans, sans-serif",
              fontSize: "0.64rem",
              color: "rgba(200,217,230,0.3)",
              letterSpacing: "0.06em",
            }}
          >
            Click any node to explore its connections
          </span>
          {activeNodeId && (
            <span
              style={{
                fontFamily: "DM Sans, sans-serif",
                fontSize: "0.64rem",
                color: "rgba(86,124,141,0.7)",
              }}
            >
              {relatedIds.size} linked nodes
            </span>
          )}
        </div>
      )}
    </div>
  );
}
