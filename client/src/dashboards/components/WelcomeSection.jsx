// Welcome section with user name and inspirational quote
// Layout logic: Greets the user by name and displays a random inspirational travel quote. Uses MUI Typography and Framer Motion for smooth entrance animation.
import React from 'react';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { motion } from 'framer-motion';

const quotes = [
  "Travel is the only thing you buy that makes you richer.",
  "The world is a book, and those who do not travel read only one page.",
  "Adventure awaits. Go find it!",
  "Collect moments, not things.",
  "To travel is to live.",
];

export default function WelcomeSection({ user }) {
  const quote = quotes[Math.floor(Math.random() * quotes.length)];
  return (
    <Box sx={{ mb: 4, mt: 2 }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <Typography variant="h4" fontWeight={700} gutterBottom>
          Welcome back, {user?.name || 'Traveler'}!
        </Typography>
        <Typography variant="h6" color="text.secondary" fontStyle="italic">
          {quote}
        </Typography>
      </motion.div>
    </Box>
  );
}
