// ExploreGuides.jsx
import React, { useState, useEffect } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import Snackbar from '@mui/material/Snackbar';
import Alert from '@mui/material/Alert';

import GuideCard from './GuideCard';
import BookGuideDialog from './BookGuideDialog';
// import api from '././api'; //  MUST BE AT TOP

import api from "../../api"


export default function ExploreGuides() {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const [search, setSearch] = useState('');
  const [language, setLanguage] = useState('All Languages');
  const [minRating, setMinRating] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  // ✅ Fetch guides from backend
  useEffect(() => {
    async function fetchGuides() {
      try {
        const res = await api.get('/guide');
        // Store both Guide _id and referenced User _id
        const realGuides = (res.data.guides || [])
          .filter(g => g.approved && g.userId)
          .map(g => ({
            _id: g._id, // Guide document _id
            userId: g.userId._id, // Referenced User _id (for booking)
            name: g.userId.name,
            avatar: g.userId.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
            location: g.userId.country || '',
            languages: g.languages || [],
            price: g.price || 0,
            rating: g.ratings || 0,
            description: g.bio || '',
            tags: g.tags || [],
          }));
        setGuides(realGuides);
      } catch (err) {
        console.error(err);
        setGuides([]);
      }
    }
    fetchGuides();
  }, []);

  // Collect all languages
  const allLanguages = Array.from(new Set(guides.flatMap(g => g.languages)));

  // Filter logic
  const filteredGuides = guides.filter(guide => {
    const matchesSearch =
      guide.name.toLowerCase().includes(search.toLowerCase()) ||
      guide.location.toLowerCase().includes(search.toLowerCase()) ||
      guide.languages.some(lang =>
        lang.toLowerCase().includes(search.toLowerCase())
      );

    const matchesLanguage =
      language === 'All Languages' || guide.languages.includes(language);

    const matchesRating =
      !minRating || guide.rating >= parseFloat(minRating);

    const matchesPrice =
      !maxPrice || guide.price <= parseFloat(maxPrice);

    return matchesSearch && matchesLanguage && matchesRating && matchesPrice;
  });

  const handleBook = guide => {
    setSelectedGuide(guide);
    setDialogOpen(true);
  };

  const handleClose = () => {
    setDialogOpen(false);
    setSelectedGuide(null);
  };


  const handleConfirm = async ({ destination, startDate, endDate, totalPrice }) => {
    if (!selectedGuide || !startDate || !endDate) return;
    try {
      // Use the referenced User _id as guideId for booking
      const guideId = selectedGuide.userId;
      // Convert startDate to ISO string
      const date = startDate && startDate.toDate ? startDate.toDate().toISOString() : startDate;
      const response = await api.post('/booking/book', {
        guideId,
        date,
        destination,
        price: totalPrice
      });
      if (response.status === 201) {
        setSuccessMsg('Successfully booked guide!');
        setSnackbarSeverity('success');
      } else {
        const backendMsg = response?.data?.message || 'Booking failed. Please try again.';
        setSuccessMsg(`Booking failed: ${backendMsg}`);
        setSnackbarSeverity('error');
      }
    } catch (err) {
      // Show backend error message if available
      const backendMsg = err?.response?.data?.message || err.message || 'Booking failed. Please try again.';
      setSuccessMsg(`Booking failed: ${backendMsg}`);
      setSnackbarSeverity('error');
    } finally {
      setDialogOpen(false);
      setSelectedGuide(null);
    }
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        Find Your Guide
      </Typography>

      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Connect with expert local guides
      </Typography>

      {/* Filters */}
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 3 }}>
        <input
          type="text"
          placeholder="Search by name, location, or language"
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <select value={language} onChange={e => setLanguage(e.target.value)}>
          <option>All Languages</option>
          {allLanguages.map(lang => (
            <option key={lang}>{lang}</option>
          ))}
        </select>

        <input
          type="number"
          placeholder="Min Rating"
          value={minRating}
          onChange={e => setMinRating(e.target.value)}
        />

        <input
          type="number"
          placeholder="Max Price"
          value={maxPrice}
          onChange={e => setMaxPrice(e.target.value)}
        />
      </Box>

      <Typography variant="body2" color="text.secondary" mb={2}>
        {filteredGuides.length} guides found
      </Typography>

      <Grid container spacing={3}>
        {filteredGuides.map(guide => (
          <Grid item xs={12} sm={6} md={4} key={guide.name}>
            <GuideCard guide={guide} onBook={handleBook} />
          </Grid>
        ))}
      </Grid>

      <BookGuideDialog
        open={dialogOpen}
        guide={selectedGuide}
        onClose={handleClose}
        onConfirm={handleConfirm}
      />
      <Snackbar open={!!successMsg} autoHideDuration={3000} onClose={() => setSuccessMsg('')} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
        <Alert onClose={() => setSuccessMsg('')} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {successMsg}
        </Alert>
      </Snackbar>
    </Box>
  );
}
