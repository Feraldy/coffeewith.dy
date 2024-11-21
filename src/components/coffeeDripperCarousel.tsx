import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { Dripper } from '@/utils/types';
import { drippers } from '@/utils/drippers';

const Container = styled(Stack)({
  backgroundColor: '#D9D9D9',
  height: '100vh',
  justifyContent: 'center',
});

const DripperItem = styled(Box)<{ selected: boolean; visible: boolean }>(({ selected, visible }) => ({
  width: selected ? '250px' : '200px', 
  height: '250px',
  filter: selected ? 'none' : 'blur(4px)',
  transition: 'filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease',
  transform: selected ? 'scale(1.5)' : 'scale(0.5) translateX(${position * 50}px)',
  opacity: visible ? 1 : 0,
  display: visible ? 'flex' : 'none',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 10px',
  position: 'relative',
  zIndex: selected ? 1 : 0, 
}));

interface CoffeeDripperCarouselProps {
  onDripperSelect: (dripperName: Dripper) => void; 
}

const CoffeeDripperCarousel: React.FC<CoffeeDripperCarouselProps> = ({ onDripperSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const dripperCarouselRef = useRef<HTMLDivElement>(null);


  const handleClick = (index: number) => {
    setSelectedIndex(index);
    if(index ===  selectedIndex ){onDripperSelect(drippers[index]);}
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isInViewport(dripperCarouselRef.current)) {
      if (event.key === 'ArrowRight') {
        handleClick((selectedIndex + 1) % drippers.length);
      } else if (event.key === 'ArrowLeft') {
        handleClick((selectedIndex - 1 + drippers.length) % drippers.length);
      } else if (event.key === 'Enter'){
        handleClick(selectedIndex)
      }
    }
  };

  useEffect(() => {
    let touchStartX = 0;

    const handleTouchStart = (event: TouchEvent) => {
      touchStartX = event.touches[0].clientX;
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const touchEndX = event.changedTouches[0].clientX;   
      const deltaX = touchEndX - touchStartX;   

      if (Math.abs(deltaX) > 50) {
        if (deltaX > 0) {
          handleClick((selectedIndex - 1 + drippers.length) % drippers.length);
        } else {
          handleClick((selectedIndex + 1) % drippers.length);
        }
      }
    };

    const carouselElement = dripperCarouselRef.current;
    if (carouselElement) {
      carouselElement.addEventListener('touchstart', handleTouchStart);
      carouselElement.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      if (carouselElement) {
        carouselElement.removeEventListener('touchstart', handleTouchStart);
        carouselElement.removeEventListener('touchend', handleTouchEnd);   
      }
    };
  }, [selectedIndex]);

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
  }, [selectedIndex]);

  const displayedDrippers = [
    drippers[(selectedIndex - 1 + drippers.length) % drippers.length],
    drippers[selectedIndex],
    drippers[(selectedIndex + 1) % drippers.length], 
  ];

  return (
    <Container spacing={2} alignItems="center">
      <Stack spacing={2} alignItems="center" height="100vh" justifyContent="center" gap="15px">
        <Typography variant="h4" style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins' }}>
          <span style={{ fontWeight: 300 }}>What coffee </span> 
          <strong style={{ fontSize: '1.5em', fontWeight: 700, color: 'black' }}>
            dripper
          </strong> 
          <span style={{ fontWeight: 300 }}> do you use?</span>
        </Typography>
        <Box display="flex" justifyContent="center" height="400px"> 
          {displayedDrippers.map((dripper, index) => (
            <Stack alignItems="center" justifyContent="center" key={dripper.name} spacing={2} ref={dripperCarouselRef}>
              <DripperItem
                alignItems="center"
                selected={selectedIndex === (selectedIndex + index - 1 + drippers.length) % drippers.length}
                visible={true} 
                onClick={() => handleClick((selectedIndex + index - 1 + drippers.length) % drippers.length)}
              >
                <img
                  src={dripper.image}
                  alt={dripper.name}
                  style={{ 
                    width: '250px',
                    height: '250px',
                    objectFit: 'contain',
                    borderRadius: '8px' 
                  }}
                />
              </DripperItem>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default CoffeeDripperCarousel;