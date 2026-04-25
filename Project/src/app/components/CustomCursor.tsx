import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "motion/react";

type CursorType = "default" | "drag" | "view" | "link";

export function CustomCursor() {
  const [position, setPosition] = useState({ x: -100, y: -100 });
  const [cursorType, setCursorType] = useState<CursorType>("default");
  const [isVisible, setIsVisible] = useState(false);
  const positionRef = useRef({ x: -100, y: -100 });

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      positionRef.current = { x: e.clientX, y: e.clientY };
      setPosition({ x: e.clientX, y: e.clientY });

      const target = e.target as HTMLElement;
      const cursorEl = target.closest("[data-cursor]") as HTMLElement | null;
      const cursorValue = cursorEl?.dataset?.cursor as CursorType | undefined;
      setCursorType(cursorValue || "default");
    };

    const handleEnter = () => setIsVisible(true);
    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", handleMove);
    document.addEventListener("mouseenter", handleEnter);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", handleMove);
      document.removeEventListener("mouseenter", handleEnter);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  if (!isVisible) return null;

  return (
    <>
      {/* Outer trailing ring */}
      <motion.div
        className="fixed pointer-events-none z-[9998] rounded-full border border-[#674D66]/30"
        animate={{
          x: position.x - 20,
          y: position.y - 20,
          width: cursorType !== "default" ? 64 : 40,
          height: cursorType !== "default" ? 64 : 40,
          opacity: isVisible ? 1 : 0,
        }}
        transition={{
          x: { type: "spring", stiffness: 200, damping: 28, mass: 0.5 },
          y: { type: "spring", stiffness: 200, damping: 28, mass: 0.5 },
          width: { duration: 0.2 },
          height: { duration: 0.2 },
        }}
      />

      {/* Inner dot / label */}
      <motion.div
        className="fixed pointer-events-none z-[9999] flex items-center justify-center"
        animate={{
          x: position.x,
          y: position.y,
        }}
        transition={{
          type: "spring",
          stiffness: 500,
          damping: 35,
          mass: 0.3,
        }}
      >
        <AnimatePresence mode="wait">
          {cursorType === "default" && (
            <motion.div
              key="dot"
              className="rounded-full bg-[#674D66]"
              style={{ width: 8, height: 8, marginLeft: -4, marginTop: -4 }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
          {cursorType === "drag" && (
            <motion.div
              key="drag"
              className="rounded-full bg-[#674D66] text-[#EBD6DC] flex items-center justify-center gap-1 whitespace-nowrap"
              style={{
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
                marginLeft: -36,
                marginTop: -16,
                fontSize: 10,
                letterSpacing: "0.08em",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              DRAG ↑
            </motion.div>
          )}
          {cursorType === "view" && (
            <motion.div
              key="view"
              className="rounded-full bg-[#674D66] text-white flex items-center justify-center whitespace-nowrap"
              style={{
                paddingLeft: 12,
                paddingRight: 12,
                paddingTop: 6,
                paddingBottom: 6,
                marginLeft: -36,
                marginTop: -16,
                fontSize: 10,
                letterSpacing: "0.08em",
                fontFamily: "DM Sans, sans-serif",
                fontWeight: 500,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              VIEW →
            </motion.div>
          )}
          {cursorType === "link" && (
            <motion.div
              key="link"
              className="rounded-full bg-[#EBD6DC] border border-[#674D66]"
              style={{
                width: 14,
                height: 14,
                marginLeft: -7,
                marginTop: -7,
              }}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0, opacity: 0 }}
              transition={{ duration: 0.15 }}
            />
          )}
        </AnimatePresence>
      </motion.div>
    </>
  );
}
