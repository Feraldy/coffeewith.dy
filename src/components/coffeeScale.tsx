import React, { useEffect, useRef }  from 'react';
import { Box, FormControl,  Input, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';

  const Container = styled(Stack)({
    backgroundColor: '#D9D9D9',
    height: '100vh', 
    justifyContent: 'center',
  });

  interface CoffeeScaleProps {
    onScaleChange: (coffeeWeight: number) => void; 
    onScaleConfirm: (coffeeWeight: number) => void; 
    coffeeWeight:number
  }

const CoffeeScale: React.FC<CoffeeScaleProps> = ({ onScaleChange, onScaleConfirm, coffeeWeight }) => {
  const scaleRef = useRef<HTMLDivElement>(null);


  const handleKeyDown = (event: KeyboardEvent) => {
    if (isInViewport(scaleRef.current)) {
      if (event.key === 'ArrowRight') {
        handleIncrement();
      } else if (event.key === 'ArrowLeft') {
        handleDecrement();
      } else if (event.key === 'Enter'){
        onScaleConfirm(coffeeWeight)
      }
    }
  };

  const isInViewport = (element: HTMLElement | null) => {
    if (!element) return false;
    const rect = element.getBoundingClientRect();
    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth) 

    );
  };
  
  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  },);


  const handleDecrement = () => {
    onScaleChange(Math.max(0, coffeeWeight - 1));
  };

  const handleIncrement = () => {
    onScaleChange(coffeeWeight + 1);
  };

  return (
    <Container spacing={2} alignItems="center">
      <Stack spacing={2} alignItems="center" height="100vh" justifyContent="center" gap="1rem">
        <Typography variant="h4" maxWidth="80vw" style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins' }}>
          <span style={{ fontSize: "clamp(1rem, 3vmin, 3rem)",fontWeight: 300 }}>How much </span> 
          <strong style={{ fontSize: "clamp(1.5rem, 3.5vmin, 3.5rem)", fontWeight: 700, color: 'black' }}>
            Coffee
          </strong> 
          <span style={{ fontSize: "clamp(1rem, 3vmin, 3rem)", fontWeight: 300 }}> do you use?</span>
        </Typography>
        <Stack position="relative" sx={{'&:hover': {
                cursor: 'pointer',
                transform: 'scale(1.05)'
              }}}>
          <Box 
            ref={scaleRef}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center',
              alignItems: 'center',
              
            }}
          >
            <img 
              src="scale.png" 
              alt="Coffee scale" 
              style={{ 
                maxWidth: '100%', 
                maxHeight: '25rem', 
              }} 
              onClick={() => {
                onScaleConfirm(coffeeWeight);
              }}
            />
          </Box >
          <Stack direction="row" justifyContent="space-between" width="6.5rem" maxWidth="7rem" sx={{ position: "absolute", top: "20.2rem", left: "4.75rem"}}  overflow="hidden" spacing={1}>
            <Typography 
              sx={{ 
                fontFamily: 'var(--font-digital-7)',
                fontSize: '1.7rem',
                color: 'black',
              }}>
                  00:00
            </Typography>
            <Typography 
                sx={{ 
                  fontFamily: 'var(--font-digital-7)',
                  fontSize: '1.7rem',
                  color: 'black',
                }}>
                  {coffeeWeight}G
            </Typography>
          </Stack>
      </Stack>
        <Stack direction="row" alignItems="center" justifyContent='center' spacing={2}> 
          <Typography 
            paddingLeft="1.5rem"
            paddingRight="1.5rem"
            fontSize="1.3rem"
            style={{ textAlign: 'center', color: 'black', cursor: 'pointer' }} 
            onClick={handleDecrement}
            role="button"
          >
            -
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '8rem' }}>
          <Input
            id="standard-adornment-weight"
            aria-describedby="standard-weight-helper-text"
            value={coffeeWeight}
            onChange={(e) => onScaleChange(parseInt(e.target.value, 10) || 0)}
            inputProps={{
              'aria-label': 'weight',
              style: { textAlign: 'center' },
            }}
          />
        </FormControl>
          <Typography 
            paddingLeft="1.5rem"
            paddingRight="1.5rem"
            fontSize="1.3rem"
            style={{ textAlign: 'center', color: 'black', cursor: 'pointer' }} 
            onClick={handleIncrement}
            role="button"
          >
            +
          </Typography>
        </Stack>
      </Stack>
    </Container>
  );
};

export default CoffeeScale;