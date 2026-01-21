// ChatPanel.jsx - Chat UI for messaging guides
import React, { useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import SendOutlinedIcon from '@mui/icons-material/SendOutlined';

// Dummy guides and messages
const guides = [
  {
    name: 'Rajesh Kumar',
    avatar: 'https://randomuser.me/api/portraits/men/12.jpg',
    location: 'Agra, India',
  },
  {
    name: 'Marie Dubois',
    avatar: 'https://randomuser.me/api/portraits/women/34.jpg',
    location: 'Paris, France',
  },
  {
    name: 'Carlos Rodriguez',
    avatar: 'https://randomuser.me/api/portraits/men/56.jpg',
    location: 'Cusco, Peru',
  },
  {
    name: 'Sarah Johnson',
    avatar: 'https://randomuser.me/api/portraits/women/45.jpg',
    location: 'Arizona, USA',
  },
  {
    name: 'Li Wei',
    avatar: 'https://randomuser.me/api/portraits/men/78.jpg',
    location: 'Beijing, China',
  },
  {
    name: 'Elena Papadakis',
    avatar: 'https://randomuser.me/api/portraits/women/67.jpg',
    location: 'Cyclades, Greece',
  },
];

const initialMessages = {
  'Rajesh Kumar': [
    {
      sender: 'Demo Tourist',
      text: 'hii',
      time: '10:35:51 AM',
    },
  ],
};

export default function ChatPanel() {
  const [selectedGuide, setSelectedGuide] = useState(guides[0]);
  const [messages, setMessages] = useState(initialMessages);
  const [input, setInput] = useState('');

  const handleSelectGuide = (guide) => {
    setSelectedGuide(guide);
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const guideName = selectedGuide.name;
    const newMsg = {
      sender: 'Demo Tourist',
      text: input,
      time: new Date().toLocaleTimeString(),
    };
    setMessages((prev) => ({
      ...prev,
      [guideName]: prev[guideName] ? [...prev[guideName], newMsg] : [newMsg],
    }));
    setInput('');
  };

  const guideMessages = messages[selectedGuide.name] || [];

  return (
    <Box sx={{ display: 'flex', height: '70vh', bgcolor: 'background.default', borderRadius: 3, boxShadow: 1 }}>
      {/* Guide List */}
      <Box sx={{ width: 280, borderRight: '1px solid #f0f0f0', bgcolor: '#fafaf9', p: 2, borderRadius: 3 }}>
        <Typography variant="subtitle1" fontWeight={600} mb={2}>
          Your Guides
        </Typography>
        {guides.map((guide) => (
          <Box
            key={guide.name}
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              p: 1.2,
              mb: 1,
              borderRadius: 2,
              cursor: 'pointer',
              bgcolor: selectedGuide.name === guide.name ? '#eafbe7' : 'transparent',
              transition: 'background 0.2s',
            }}
            onClick={() => handleSelectGuide(guide)}
          >
            <Avatar src={guide.avatar} alt={guide.name} sx={{ width: 40, height: 40 }} />
            <Box>
              <Typography fontWeight={600} fontSize={16}>{guide.name}</Typography>
              <Typography fontSize={13} color="text.secondary">{guide.location}</Typography>
            </Box>
          </Box>
        ))}
      </Box>
      {/* Chat Window */}
      <Box sx={{ flex: 1, display: 'flex', flexDirection: 'column', bgcolor: '#fff', borderRadius: 3, p: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2, bgcolor: '#eafbe7', p: 2, borderRadius: 2 }}>
          <Avatar src={selectedGuide.avatar} alt={selectedGuide.name} sx={{ width: 40, height: 40, mr: 2 }} />
          <Box>
            <Typography fontWeight={600}>{selectedGuide.name}</Typography>
            <Typography fontSize={13} color="text.secondary">{selectedGuide.location}</Typography>
          </Box>
        </Box>
        <Box sx={{ flex: 1, overflowY: 'auto', mb: 2, px: 1 }}>
          {guideMessages.map((msg, idx) => (
            <Box key={idx} sx={{ display: 'flex', justifyContent: 'flex-end', mb: 1 }}>
              <Box sx={{ bgcolor: 'primary.main', color: '#fff', px: 2, py: 1, borderRadius: 2, maxWidth: 320 }}>
                <Typography fontWeight={600} fontSize={14}>{msg.sender}</Typography>
                <Typography fontSize={15}>{msg.text}</Typography>
                <Typography fontSize={11} sx={{ mt: 0.5, textAlign: 'right' }}>{msg.time}</Typography>
              </Box>
            </Box>
          ))}
        </Box>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            bgcolor: '#fafaf9',
            p: 1.5,
            borderRadius: 2,
            border: '1.5px solid #f0f0f0',
            boxShadow: '0 1px 4px 0 rgba(76,175,80,0.04)',
            mt: 'auto',
          }}
        >
          <TextField
            fullWidth
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            variant="standard"
            InputProps={{
              disableUnderline: true,
              sx: {
                bgcolor: 'transparent',
                fontSize: '1rem',
                px: 1,
                '&:focus-within': {
                  boxShadow: '0 0 0 2px #4caf50',
                  borderRadius: 2,
                  background: '#f4fff6',
                },
              },
            }}
            sx={{
              bgcolor: 'transparent',
              fontSize: '1rem',
              px: 1,
              transition: 'box-shadow 0.2s',
            }}
          />
          <IconButton
            color="primary"
            sx={{ ml: 1, borderRadius: 2, bgcolor: '#256029', color: '#fff', '&:hover': { bgcolor: '#388e3c' } }}
            onClick={handleSend}
          >
            <SendOutlinedIcon />
          </IconButton>
        </Box>
      </Box>
    </Box>
  );
}
