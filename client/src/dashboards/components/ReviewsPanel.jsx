// ReviewsPanel.jsx - Reviews & Ratings UI for guides
import React, { useState, useEffect } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Rating from '@mui/material/Rating';
import api from '../../api';

export default function ReviewsPanel() {
  const [guides, setGuides] = useState([]);
  const [selectedGuide, setSelectedGuide] = useState(null);
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState('');
  const [search, setSearch] = useState('');
  const [reviews, setReviews] = useState([]);

  // Fetch guides from backend
  useEffect(() => {
    async function fetchGuides() {
      try {
        const res = await api.get('/guide');
        const realGuides = (res.data.guides || []).map(g => ({
          _id: g._id,
          userId: g.userId?._id,
          name: g.userId?.name,
          avatar: g.userId?.avatar || 'https://randomuser.me/api/portraits/men/1.jpg',
          rating: g.ratings || 0,
          reviews: 0 // will update after fetching reviews
        }));
        setGuides(realGuides);
        if (realGuides.length > 0) setSelectedGuide(realGuides[0]);
      } catch (err) {
        setGuides([]);
      }
    }
    fetchGuides();
  }, []);

  // Fetch reviews for selected guide
  useEffect(() => {
    async function fetchReviews() {
      if (!selectedGuide) return;
      try {
        const res = await api.get(`/review/guide/${selectedGuide.userId}/reviews`);
        setReviews(res.data.reviews || []);
      } catch (err) {
        setReviews([]);
      }
    }
    fetchReviews();
  }, [selectedGuide]);

  const handleSelectGuide = (guide) => {
    setSelectedGuide(guide);
    setRating(0);
    setReview('');
  };

  const handleSubmit = async () => {
    if (!selectedGuide || !rating || !review.trim()) return;
    try {
      await api.post('/review', {
        guideId: selectedGuide.userId,
        place: '', // Optionally add a place field if needed
        rating,
        comment: review
      });
      setRating(0);
      setReview('');
      // Refresh reviews after submit
      const res = await api.get(`/review/guide/${selectedGuide.userId}/reviews`);
      setReviews(res.data.reviews || []);
    } catch (err) {
      // Optionally show error message
    }
  };

  // Filter guides by search
  const filteredGuides = guides.filter(g => g.name?.toLowerCase().includes(search.toLowerCase()));

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h3" fontWeight={700} mb={1}>
        Reviews & Ratings
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Share your experience and read others' reviews
      </Typography>
      <Typography fontWeight={600} mb={1}>
        Select a Guide to Review
      </Typography>
      <Box sx={{ maxWidth: 340, mb: 2 }}>
        <TextField
          fullWidth
          placeholder="Search guide by name..."
          value={search}
          onChange={e => setSearch(e.target.value)}
          size="small"
          sx={{ bgcolor: '#fff', borderRadius: 2 }}
        />
      </Box>
      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, mb: 4 }}>
        {filteredGuides.map((guide) => (
          <Box
            key={guide.name}
            onClick={() => handleSelectGuide(guide)}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              px: 3,
              py: 2,
              minWidth: 260,
              borderRadius: 3,
              border: selectedGuide.name === guide.name ? '2px solid #b6e7c9' : '1.5px solid #ececec',
              bgcolor: selectedGuide.name === guide.name ? '#f6fef8' : '#fff',
              boxShadow: selectedGuide.name === guide.name ? 2 : 0,
              cursor: 'pointer',
              transition: 'all 0.18s',
            }}
          >
            <Avatar src={guide.avatar} alt={guide.name} sx={{ width: 44, height: 44, mr: 1 }} />
            <Box>
              <Typography fontWeight={600}>{guide.name}</Typography>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Rating value={guide.rating} precision={0.1} readOnly size="small" sx={{ color: '#FFD600' }} />
                <Typography fontSize={15} color="text.secondary" sx={{ ml: 0.5 }}>
                  {guide.rating} ({guide.reviews})
                </Typography>
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
      <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 1, p: 4, maxWidth: 900 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Write a Review
        </Typography>
        <Typography fontWeight={600} mb={1}>
          Rating
        </Typography>
        <Rating
          value={rating}
          onChange={(_, newValue) => setRating(newValue)}
          size="large"
          sx={{ color: '#FFD600', mb: 2 }}
        />
        <Typography fontWeight={600} mb={1}>
          Your Review
        </Typography>
        <TextField
          multiline
          minRows={4}
          fullWidth
          placeholder={`Share your experience with this guide...`}
          value={review}
          onChange={e => setReview(e.target.value)}
          sx={{ bgcolor: '#fcfdf8', borderRadius: 2, mb: 3 }}
        />
        <Button
          variant="contained"
          color="primary"
          size="large"
          sx={{ borderRadius: 3, px: 4, bgcolor: '#256029', '&:hover': { bgcolor: '#388e3c' } }}
          onClick={handleSubmit}
        >
          Submit Review
        </Button>
      </Box>
      <Box sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 1, p: 4, maxWidth: 900, mt: 4 }}>
        <Typography variant="h5" fontWeight={700} mb={2}>
          Reviews for {selectedGuide?.name}
        </Typography>
        {reviews.length === 0 ? (
          <Typography color="text.secondary">No reviews yet for this guide.</Typography>
        ) : (
          reviews.map((r, idx) => (
            <Box key={r._id || idx} sx={{ display: 'flex', alignItems: 'flex-start', gap: 2, mb: 3, p: 2, borderRadius: 3, boxShadow: 1, bgcolor: '#f9f9f9' }}>
              <Avatar src={r.userId?.avatar || ''} sx={{ width: 48, height: 48, mr: 2 }} />
              <Box>
                <Typography fontWeight={700}>{r.userId?.name || 'Tourist'}</Typography>
                <Rating value={r.rating} readOnly size="small" sx={{ mb: 0.5 }} />
                <Typography fontSize={13} color="text.secondary" sx={{ mb: 1 }}>{new Date(r.createdAt).toLocaleDateString()}</Typography>
                <Typography fontSize={16}>{r.comment}</Typography>
              </Box>
            </Box>
          ))
        )}
      </Box>
    </Box>
  );
}
