import React, { useEffect, useState } from 'react';
import api from '../../api';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import ReviewForm from './ReviewForm';
import Modal from '@mui/material/Modal';

export default function MyBookings() {
  const [bookings, setBookings] = useState([]);
  const [reviews, setReviews] = useState([]); // all reviews for this user
  const [openReview, setOpenReview] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [editReview, setEditReview] = useState(null);

  useEffect(() => {
    async function fetchBookingsAndReviews() {
      try {
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        if (!user._id) return;
        const res = await api.get(`/booking/tourist/${user._id}`);
        console.log('Bookings API response:', res.data.bookings);
        setBookings(res.data.bookings || []);
        // Fetch all reviews by this user
        const reviewsRes = await api.get(`/review/user/${user._id}`);
        setReviews(reviewsRes.data.reviews || []);
      } catch (err) {
        setBookings([]);
        setReviews([]);
      }
    }
    fetchBookingsAndReviews();
  }, []);

  // Helper: find review for a booking
  const getReviewForBooking = (bookingId) => reviews.find(r => r.bookingId === bookingId);

  // Open review modal
  const handleOpenReview = (booking) => {
    setSelectedBooking(booking);
    setEditReview(null);
    setOpenReview(true);
  };

  // Open edit review modal
  const handleEditReview = (booking, review) => {
    setSelectedBooking(booking);
    setEditReview(review);
    setOpenReview(true);
  };

  // Submit review
  const handleSubmitReview = async (reviewData) => {
    try {
      if (editReview) {
        // TODO: call update review endpoint
      } else {
        // Create new review
        await api.post('/review', reviewData);
      }
      setOpenReview(false);
      setSelectedBooking(null);
      setEditReview(null);
      // Refresh reviews
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      const reviewsRes = await api.get(`/review/user/${user._id}`);
      setReviews(reviewsRes.data.reviews || []);
    } catch (err) {
      // Optionally show error
    }
  };

  // Check if review can be edited (within 24h)
  const canEditReview = (review) => {
    if (!review) return false;
    const created = new Date(review.createdAt);
    const now = new Date();
    return (now - created) < 24 * 60 * 60 * 1000;
  };

  return (
    <Box sx={{ p: { xs: 1, sm: 2, md: 3 } }}>
      <Typography variant="h4" fontWeight={700} mb={2}>
        My Bookings
      </Typography>
      <Typography variant="subtitle1" color="text.secondary" mb={3}>
        Track and manage your tour bookings
      </Typography>
      {bookings.length === 0 ? (
        <Typography>No bookings found.</Typography>
      ) : (
        bookings.map((booking) => {
          const review = getReviewForBooking(booking._id);
          return (
            <Box key={booking._id} sx={{ bgcolor: '#fff', borderRadius: 3, boxShadow: 2, p: 3, mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box>
                <Typography fontWeight={700} fontSize={20} mb={1}>{booking.destination || 'Tour'}</Typography>
                <Chip label={booking.status} color={booking.status === 'pending' ? 'warning' : booking.status === 'confirmed' ? 'success' : booking.status === 'completed' ? 'info' : 'default'} size="small" sx={{ mb: 1 }} />
                <Typography fontSize={15} color="text.secondary">{new Date(booking.date).toLocaleDateString()} </Typography>
                <Typography fontSize={15} color="text.secondary">Guide: {booking.guideId?.name || booking.guideId}</Typography>
              </Box>
              <Box sx={{ textAlign: 'right' }}>
                <Typography fontWeight={700} color="green" fontSize={22}>${booking.price || 0}</Typography>
                <Typography fontSize={13} color="text.secondary">Total Price</Typography>
                {/* Review button logic */}
                {booking.status === 'completed' && !review && (
                  <Box mt={2}>
                    <button onClick={() => handleOpenReview(booking)} className="px-4 py-1 rounded bg-blue-600 text-white hover:bg-blue-700">Review</button>
                  </Box>
                )}
                {booking.status === 'completed' && review && canEditReview(review) && (
                  <Box mt={2}>
                    <button onClick={() => handleEditReview(booking, review)} className="px-4 py-1 rounded bg-yellow-600 text-white hover:bg-yellow-700">Edit Review</button>
                  </Box>
                )}
                {booking.status === 'completed' && review && !canEditReview(review) && (
                  <Box mt={2}>
                    <Chip label="Reviewed" color="success" size="small" />
                  </Box>
                )}
              </Box>
            </Box>
          );
        })
      )}
      <Modal open={openReview} onClose={() => setOpenReview(false)}>
        <Box sx={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', bgcolor: '#fff', borderRadius: 2, boxShadow: 4 }}>
          {selectedBooking && (
            <ReviewForm
              booking={selectedBooking}
              onSubmit={handleSubmitReview}
              onClose={() => setOpenReview(false)}
              initialReview={editReview}
              isEdit={!!editReview}
            />
          )}
        </Box>
      </Modal>
    </Box>
  );
}
