import React, { useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { CardRecipe, Dripper } from '@/utils/types';
import { cardRecipes } from '@/utils/recipes';

const Container = styled(Stack)({
  backgroundColor: '#D9D9D9', // Set the background color
  height: '100vh', // Full viewport height
  justifyContent: 'center',
});

const CardItem = styled(Card)<{ selected: boolean; visible: boolean }>(({ selected, visible }) => ({
    width: selected ? '250px' : '200px', // Adjust size as needed
    position: 'relative',
    filter: selected ? 'none' : 'blur(4px)',
    transition: 'filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease',
    transform: selected ? 'scale(1.5)' : 'scale(0.5) translateX(${position * 50}px)',
    opacity: visible ? 1 : 0,
    display: visible ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 10px',
    zIndex: selected ? 1 : 0, // Ensure selected item is above others
}));

interface CardRecipeCarouselProps {
  onRecipeSelect: (cardName: CardRecipe) => void;
  onDripperSelect: (dripperName: Dripper) => void;
  onWaterRatioChange: (water:number, ratio:number) => void;
  onRecipeConfirm: (cardName: CardRecipe) => void;
}

const CardRecipeCarousel: React.FC<CardRecipeCarouselProps> = ({ onRecipeSelect, onDripperSelect, onWaterRatioChange, onRecipeConfirm }) => {
  const [selectedIndex, setSelectedIndex] = useState(0); // Start with V60 in the middle

  const handleClick = (index: number) => {
    setSelectedIndex(index);
    onRecipeSelect(cardRecipes[index])
    if(index ===  selectedIndex ){
      onRecipeConfirm(cardRecipes[index]);
      if (cardRecipes[index].id !== 'custom')
      {
        onDripperSelect(cardRecipes[index].dripper)
        onWaterRatioChange(cardRecipes[index].recipeVar.water,cardRecipes[index].recipeVar.ratio)
      }
      else{

      }
    }
  };

  const displayedCard = [
    cardRecipes[(selectedIndex - 1 + cardRecipes.length) % cardRecipes.length], // Left
    cardRecipes[selectedIndex], // Center
    cardRecipes[(selectedIndex + 1) % cardRecipes.length], // Right
  ];

  return (
    <Container spacing={2} alignItems="center">
      <Stack spacing={2} alignItems="center" height="100vh" justifyContent="center" gap="15px">
        <Typography variant="h4" style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins' }}>
          <span style={{ fontWeight: 300 }}>Which </span>
          <strong style={{ fontSize: '1.5em', fontWeight: 700, color: 'black' }}>
            Recipe
          </strong>
          <span style={{ fontWeight: 300 }}> do you use?</span>
        </Typography>
        <Box display="flex" justifyContent="center" height="400px"> {/* Fixed height for the dripper display */}
          {displayedCard.map((cardRecipe, index) => (
            <Stack alignItems="center" justifyContent="center" key={cardRecipe.name}>
              <CardItem className='glass'
                selected={selectedIndex === (selectedIndex + index - 1 + cardRecipes.length) % cardRecipes.length}
                visible={true} // Always show the three drippers
                onClick={() => handleClick((selectedIndex + index - 1 + cardRecipes.length) % cardRecipes.length)} // Update selectedIndex based on position
              >
                <CardActionArea>
                    <CardMedia
                        component="img"
                        height="140"
                        src={cardRecipe.image}
                        sx={{objectFit: 'cover'}}
                    />
                    <CardContent sx={{
                        position: 'relative',
                        bottom: 0,
                        left: 0,
                        width: '100%',
                        color: 'black'}}>
                        <Typography gutterBottom component="div" style={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 700 }}>
                            {cardRecipe.name}
                        </Typography>
                        <Typography variant="body2" sx={{ fontSize: '0.7rem', fontWeight: 500, fontFamily: 'Poppins' }}>
                            {cardRecipe.description}
                        </Typography>
                    </CardContent>
                </CardActionArea>
              </CardItem>
            </Stack>
          ))}
        </Box>
      </Stack>
    </Container>
  );
};

export default CardRecipeCarousel;