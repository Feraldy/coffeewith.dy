// components/CoffeeDripperCarousel.tsx
import React, { useState } from 'react';
import { Box, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { Dripper } from '@/utils/types';
import { drippers } from '@/utils/drippers';

const Container = styled(Stack)({
  backgroundColor: '#D9D9D9', // Set the background color
  height: '100vh', // Full viewport height
  justifyContent: 'center',
});

const DripperItem = styled(Box)<{ selected: boolean; visible: boolean }>(({ selected, visible }) => ({
  width: selected ? '250px' : '200px', // Adjust size as needed
  height: '250px', // Fixed height
  filter: selected ? 'none' : 'blur(4px)',
  transition: 'filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease',
  transform: selected ? 'scale(1.5)' : 'scale(0.5) translateX(${position * 50}px)',
  opacity: visible ? 1 : 0,
  display: visible ? 'flex' : 'none',
  flexDirection: 'column',
  alignItems: 'center',
  margin: '0 10px',
  position: 'relative', // Add position relative to stack items
  zIndex: selected ? 1 : 0, // Ensure selected item is above others
}));

interface CoffeeDripperCarouselProps {
  onDripperSelect: (dripperName: Dripper) => void; 
}

const CoffeeDripperCarousel: React.FC<CoffeeDripperCarouselProps> = ({ onDripperSelect }) => {
  const [selectedIndex, setSelectedIndex] = useState(1); // Start with V60 in the middle

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    if(index ===  selectedIndex ){onDripperSelect(drippers[index]);}
  };

  // Calculate the indexes to show based on the selectedIndex
  const displayedDrippers = [
    drippers[(selectedIndex - 1 + drippers.length) % drippers.length], // Left
    drippers[selectedIndex], // Center
    drippers[(selectedIndex + 1) % drippers.length], // Right
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
        <Box display="flex" justifyContent="center" height="400px"> {/* Fixed height for the dripper display */}
          {displayedDrippers.map((dripper, index) => (
            <Stack alignItems="center" justifyContent="center" key={dripper.name} spacing={2}>
              <DripperItem
                alignItems="center"
                selected={selectedIndex === (selectedIndex + index - 1 + drippers.length) % drippers.length}
                visible={true} // Always show the three drippers
                onClick={() => handleClick((selectedIndex + index - 1 + drippers.length) % drippers.length)} // Update selectedIndex based on position
              >
                <img
                  src={dripper.image}
                  alt={dripper.name}
                  style={{ 
                    width: '250px',  // Fixed width
                    height: '250px', // Fixed height
                    objectFit: 'contain', // Maintain aspect ratio
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