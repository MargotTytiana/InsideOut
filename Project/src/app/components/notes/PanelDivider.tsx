import { useRef, useCallback, type MutableRefObject, type MouseEvent as ReactMouseEvent } from "react";
import { motion } from "motion/react";
import { Lock, Unlock, ChevronLeft, ChevronRight } from "lucide-react";

interface PanelDividerProps {
  onResize: (newPct: number) => void;
  onCollapseLeft: () => void;
  onCollapseRight: () => void;
  onExpandBoth: () => void;
  isLeftCollapsed: boolean;
  isRightCollapsed: boolean;
  isLocked: boolean;
  onToggleLock: () => void;
  containerRef: MutableRefObject<HTMLDivElement | null>;
}

export function PanelDivider({
  onResize,
  onCollapseLeft,
  onCollapseRight,
  onExpandBoth,
  isLeftCollapsed,
  isRightCollapsed,
  isLocked,
  onToggleLock,
  containerRef,
}: PanelDividerProps) {
  const isDragging = useRef(false);

  const handleMouseDown = useCallback(
    (e: ReactMouseEvent) => {
      if (isLocked) return;
      e.preventDefault();
      isDragging.current = true;

      const onMouseMove = (ev: MouseEvent) => {
        if (!isDragging.current || !containerRef.current) return;
        const rect = containerRef.current.getBoundingClientRect();
        const newPct = ((ev.clientX - rect.left) / rect.width) * 100;
        onResize(Math.max(18, Math.min(82, newPct)));
      };

      const onMouseUp = () => {
        isDragging.current = false;
        window.removeEventListener("mousemove", onMouseMove);
        window.removeEventListener("mouseup", onMouseUp);
      };

      window.addEventListener("mousemove", onMouseMove);
      window.addEventListener("mouseup", onMouseUp);
    },
    [isLocked, onResize, containerRef]
  );

  return (
    <motion.div
      onMouseDown={handleMouseDown}
      style={{
        width: 28,
        flexShrink: 0,
        background: "#1E2E3E",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 6,
        cursor: isLocked ? "default" : "col-resize",
        position: "relative",
        zIndex: 20,
        borderLeft: "1px solid rgba(86, 124, 141, 0.18)",
        borderRight: "1px solid rgba(86, 124, 141, 0.18)",
        userSelect: "none",
      }}
      whileHover={{
        background: "rgba(86, 124, 141, 0.15)",
      }}
      transition={{ duration: 0.2 }}
    >
      {/* Subtle drag dots */}
      {[0, 1, 2].map((i) => (
        <div
          key={i}
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(200, 217, 230, 0.25)",
          }}
        />
      ))}

      {/* Controls cluster — centered */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          padding: "6px 0",
          background: "rgba(15, 27, 39, 0.8)",
          borderRadius: 8,
          border: "1px solid rgba(86, 124, 141, 0.2)",
        }}
      >
        {/* Collapse left */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            if (isLeftCollapsed) onExpandBoth();
            else onCollapseLeft();
          }}
          style={{
            width: 22,
            height: 22,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isLeftCollapsed ? "#567C8D" : "rgba(200, 217, 230, 0.5)",
            borderRadius: 4,
          }}
          whileHover={{ color: "#C8D9E6", background: "rgba(86,124,141,0.2)" }}
          title={isLeftCollapsed ? "Expand left panel" : "Collapse left panel"}
        >
          <ChevronLeft size={13} />
        </motion.button>

        {/* Lock */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            onToggleLock();
          }}
          style={{
            width: 22,
            height: 22,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isLocked ? "#567C8D" : "rgba(200, 217, 230, 0.4)",
            borderRadius: 4,
          }}
          whileHover={{ color: "#C8D9E6", background: "rgba(86,124,141,0.2)" }}
          title={isLocked ? "Unlock panel sizes" : "Lock panel sizes"}
        >
          {isLocked ? <Lock size={11} /> : <Unlock size={11} />}
        </motion.button>

        {/* Collapse right */}
        <motion.button
          onClick={(e) => {
            e.stopPropagation();
            if (isRightCollapsed) onExpandBoth();
            else onCollapseRight();
          }}
          style={{
            width: 22,
            height: 22,
            background: "transparent",
            border: "none",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            color: isRightCollapsed ? "#567C8D" : "rgba(200, 217, 230, 0.5)",
            borderRadius: 4,
          }}
          whileHover={{ color: "#C8D9E6", background: "rgba(86,124,141,0.2)" }}
          title={isRightCollapsed ? "Expand right panel" : "Collapse right panel"}
        >
          <ChevronRight size={13} />
        </motion.button>
      </div>

      {/* More drag dots below */}
      {[0, 1, 2].map((i) => (
        <div
          key={`b-${i}`}
          style={{
            width: 3,
            height: 3,
            borderRadius: "50%",
            background: "rgba(200, 217, 230, 0.25)",
          }}
        />
      ))}
    </motion.div>
  );
}