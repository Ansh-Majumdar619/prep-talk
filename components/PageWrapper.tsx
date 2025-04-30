'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';
import { ReactNode } from 'react';

type PageWrapperProps = {
  children: ReactNode;
};

const PageWrapper = ({ children }: PageWrapperProps) => {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, scale: 0.98 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.4, ease: 'easeInOut' }}
        className="min-h-screen w-full overflow-y-auto scroll-smooth"
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
};

export default PageWrapper;
