import type { SVGProps } from 'react';
import { motion } from 'framer-motion';

export const Icons = {
  logo: (props: SVGProps<SVGSVGElement>) => (
    <motion.svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}
    >
      <motion.path
        d="M12 2a10 10 0 0 0-9.4 13.7l-1.07 1.07a1 1 0 0 0 1.42 1.42l1.07-1.07A10 10 0 1 0 12 2Z"
        initial={{ pathLength: 0, opacity: 0 }}
        animate={{ pathLength: 1, opacity: 1 }}
        transition={{ duration: 1, ease: 'easeInOut' }}
      />
      <motion.path
        d="M7 13.5h2.5l1.5-3 1.5 3H15"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, ease: 'easeInOut', delay: 0.8 }}
      />
    </motion.svg>
  ),
};
