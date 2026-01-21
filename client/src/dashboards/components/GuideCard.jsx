// GuideCard.jsx - Card for displaying a guide's info and Book button
import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import StarIcon from '@mui/icons-material/Star';

// Layout logic: Shows guide image, name, location, languages, price, rating, description, tags, and Book button
export default function GuideCard({ guide, onBook }) {
  return (
    <Card sx={{ borderRadius: 4, boxShadow: 2, minWidth: 320, maxWidth: 340, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
      <CardMedia
        component="img"
        height="140"
        image={guide.avatar}
        alt={guide.name}
        sx={{ borderTopLeftRadius: 16, borderTopRightRadius: 16 }}
      />
      <CardContent>
        <Typography variant="h6" fontWeight={700} gutterBottom>
          {guide.name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {guide.location}
        </Typography>
        <Stack direction="row" spacing={1} mt={1} mb={1}>
          {guide.languages.map((lang) => (
            <Chip key={lang} label={lang} size="small" />
          ))}
        </Stack>
        <Typography variant="body2" color="text.secondary" mb={1}>
          ${guide.price}/day
        </Typography>
        <Typography variant="body2" color="text.secondary" mb={1}>
          {guide.description}
        </Typography>
        <Stack direction="row" spacing={1} mb={1}>
          {guide.tags.map((tag) => (
            <Chip key={tag} label={tag} size="small" variant="outlined" />
          ))}
        </Stack>
        <Chip
          icon={<StarIcon sx={{ color: 'gold' }} />}
          label={guide.rating}
          size="small"
          sx={{ fontWeight: 600, background: '#fffbe6' }}
        />
      </CardContent>
      <Box sx={{ px: 2, pb: 2 }}>
        <Button fullWidth variant="contained" color="primary" sx={{ borderRadius: 2 }} onClick={() => onBook(guide)}>
          Book Guide
        </Button>
      </Box>
    </Card>
  );
}
