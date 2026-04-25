import { useState } from "react";
import { motion } from "motion/react";

interface ImageSkeletonProps {
  src: string;
  alt: string;
  className?: string;
  style?: React.CSSProperties;
}

export function ImageSkeleton({ src, alt, className = "", style }: ImageSkeletonProps) {
  const [loaded, setLoaded] = useState(false);

  return (
    <div className={`relative overflow-hidden ${className}`} style={style}>
      {/* Skeleton shimmer */}
      {!loaded && (
        <motion.div
          className="absolute inset-0"
          style={{
            background: "linear-gradient(110deg, #EBD6DC 30%, #F5E6EA 50%, #EBD6DC 70%)",
            backgroundSize: "200% 100%",
          }}
          animate={{
            backgroundPosition: ["200% 0", "-200% 0"],
          }}
          transition={{
            duration: 1.8,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      )}
      <motion.img
        src={src}
        alt={alt}
        className="w-full h-full object-cover"
        initial={{ opacity: 0 }}
        animate={{ opacity: loaded ? 1 : 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        onLoad={() => setLoaded(true)}
      />
    </div>
  );
}
