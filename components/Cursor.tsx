/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const Cursor = () => {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springX = useSpring(mouseX, { stiffness: 120, damping: 20 });
  const springY = useSpring(mouseY, { stiffness: 120, damping: 20 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX - 25);
      mouseY.set(e.clientY - 25);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <motion.div
      style={{
        x: springX,
        y: springY,
      }}
      className="pointer-events-none fixed top-0 left-0 z-[9999]"
    >
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: 'linear',
        }}
        className="w-5 h-10 rounded-full border-2 mix-blend-difference opacity-80"
        style={{
          backgroundColor: '#e6dacd',
          boxShadow: '0 0 10px rgba(209, 193, 176, 0.6)',
          mixBlendMode: 'difference',
          opacity: 0.85,
          filter: 'url(#gooey)',

        }}
      >
        <svg width="0" height="0">
          <filter id="gooey">
            <feGaussianBlur in="SourceGraphic" stdDeviation="4" result="blur" />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  
                      0 1 0 0 0  
                      0 0 1 0 0  
                      0 0 0 18 -7"
              result="gooey"
            />
            <feComposite in="SourceGraphic" in2="gooey" operator="atop" />
          </filter>
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default Cursor;
