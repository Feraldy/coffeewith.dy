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
  maxWidth: '55vw',
  width: selected ? '18rem' : '8rem',
  maxHeight: '50vh',
  filter: selected ? 'none' : 'blur(0.2rem)',
  transition: 'filter 0.4s ease-in-out, transform 0.4s ease-in-out, opacity 0.4s ease-in-out, box-shadow 0.2s ease-in-out',
  transform: selected ? 'scale(1.5) translateY(-0.8rem)' : 'scale(0.5)  translateX(${position * 5}rem)',
  opacity: visible ? 1 : 0,
  display: visible ? 'flex' : 'none',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '5.5rem 1rem',
  position: 'relative',
  zIndex: selected ? 10 : 0,
  '&:hover': {
    transform: selected ? 'scale(1.6)' : 'scale(1)',
    cursor: 'pointer'
  },
}));

interface CoffeeDripperCarouselProps {
  onDripperConfirm: (dripperName: Dripper) => void; 
  onDripperChange: (dripperName: Dripper) => void; 

}

const CoffeeDripperCarousel: React.FC<CoffeeDripperCarouselProps> = ({ onDripperConfirm, onDripperChange }) => {
  const [selectedIndex, setSelectedIndex] = useState(1);
  const dripperCarouselRef = useRef<HTMLDivElement>(null);


  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onDripperChange(drippers[index])
    if(index ===  selectedIndex ){
      onDripperConfirm(drippers[index]);}
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

      if (Math.abs(deltaX) > 30) {
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
      <Stack spacing={2} alignItems="center" height="100vh" justifyContent="center" >
        <Typography variant="h4" style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins' }} maxWidth="80vw">
          <span style={{ fontSize: "clamp(1rem, 3vmin, 3rem)", fontWeight: 300 }}>What coffee </span> 
          <strong style={{ fontSize: "clamp(1.5rem, 3.5vmin, 3.5rem)", fontWeight: 700, color: 'black' }}>
            dripper
          </strong> 
          <span style={{ fontSize: "clamp(1rem, 3vmin, 3rem)", fontWeight: 300 }}> do you use?</span>
        </Typography>
        <Stack direction="row" ref={dripperCarouselRef}> 
          {displayedDrippers.map((dripper, index) => (
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
                    width: '14rem',
                    height: '14rem',
                    objectFit: 'contain',
                  }}
                  loading="lazy"
                />
              </DripperItem>
          ))}
        </Stack>
      </Stack>
    </Container>
  );
};

export default CoffeeDripperCarousel;