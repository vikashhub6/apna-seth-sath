import { motion } from "framer-motion";
import { useState } from "react";

export default function Card3D({
  children,
  className = "",
  delay = 0,
  hover = true,
  ...props
}) {
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);

  const handleMouseMove = (e) => {
    if (!hover) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateXAngle = ((y - rect.height / 2) / rect.height) * 20;
    const rotateYAngle = ((x - rect.width / 2) / rect.width) * -20;

    setRotateX(rotateXAngle);
    setRotateY(rotateYAngle);
  };

  const handleMouseLeave = () => {
    setRotateX(0);
    setRotateY(0);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5, ease: "easeOut" }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transformStyle: "preserve-3d",
        transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
      }}
      className={`card transition-transform duration-200 ${className}`}
      {...props}
    >
      <div style={{ transformStyle: "preserve-3d" }} className="relative z-10">
        {children}
      </div>
      <div
        className="absolute inset-0 rounded-3xl opacity-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(circle at top left, rgba(108,60,225,0.1), transparent 80%)",
          transform: "translateZ(30px)",
        }}
      />
    </motion.div>
  );
}
