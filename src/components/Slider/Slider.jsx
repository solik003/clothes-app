
import { ArrowLeftOutlined, ArrowRightOutlined } from '@mui/icons-material';
import { Box, Typography, Button as MuiButton, IconButton } from '@mui/material';
import React, { useState } from 'react';
import { sliderItems } from '../../data';

export function Slider() {
  const [slideIndex, setSlideIndex] = useState(0);

  const handleClick = (direction) => {
    if (direction === "left") {
      setSlideIndex(slideIndex > 0 ? slideIndex - 1 : 2);
    } else {
      setSlideIndex(slideIndex < 2 ? slideIndex + 1 : 0);
    }
  };

  return (
    <Box
      sx={{
        width: '100%',
        height: '100vh',
        display: { xs: 'none', sm: 'flex' },
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <IconButton
        onClick={() => handleClick("left")}
        sx={{
          width: 50,
          height: 50,
          backgroundColor: '#fff7f7',
          borderRadius: '50%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          left: 10,
          m: 'auto',
          opacity: 0.5,
          zIndex: 2,
        }}
      >
        <ArrowLeftOutlined />
      </IconButton>

      <Box
        sx={{
          height: '100%',
          display: 'flex',
          transition: 'all 1.5s ease',
          transform: `translateX(${slideIndex * -100}vw)`,
        }}
      >
        {sliderItems.map((item) => (
          <Box
            key={item.id}
            sx={{
              width: '100vw',
              height: '100vh',
              display: 'flex',
              alignItems: 'center',
              backgroundColor: item.bg,
            }}
          >
            <Box sx={{ flex: 1, height: '100%' }}>
              <Box
                component="img"
                src={item.img}
                alt={item.title}
                sx={{ height: '80%' }}
              />
            </Box>

            <Box sx={{ flex: 1, p: 6 }}>
              <Typography variant="h1" sx={{ fontSize: 70 }}>
                {item.title}
              </Typography>
              <Typography
                sx={{
                  my: 5,
                  fontSize: 20,
                  fontWeight: 500,
                  letterSpacing: 3,
                }}
              >
                {item.desc}
              </Typography>
              <MuiButton
                sx={{
                  p: 1,
                  fontSize: 20,
                  backgroundColor: 'transparent',
                  border: '1px solid black',
                  cursor: 'pointer',
                }}
              >
                SHOW NOW
              </MuiButton>
            </Box>
          </Box>
        ))}
      </Box>

      <IconButton
        onClick={() => handleClick("right")}
        sx={{
          width: 50,
          height: 50,
          backgroundColor: '#fff7f7',
          borderRadius: '50%',
          position: 'absolute',
          top: 0,
          bottom: 0,
          right: 10,
          m: 'auto',
          opacity: 0.5,
          zIndex: 2,
        }}
      >
        <ArrowRightOutlined />
      </IconButton>
    </Box>
  );
}
