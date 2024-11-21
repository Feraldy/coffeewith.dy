import React, { useEffect, useRef, useState } from 'react';
import { Box, Card, CardActionArea, CardContent, CardMedia, Link, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';
import { CardRecipe, Dripper } from '@/utils/types';
import { cardRecipes } from '@/utils/recipes';

const Container = styled(Stack)({
  backgroundColor: '#D9D9D9',
  height: '100vh',
  justifyContent: 'center',
});

const CardItem = styled(Card)<{ selected: boolean; visible: boolean; hovered: boolean }>(
  ({ selected, visible, hovered }) => ({
    width: selected ? '250px' : '200px',
    position: 'relative',
    filter: selected ? 'none' : 'blur(4px)',
    transition: 'filter 0.4s ease, transform 0.4s ease, opacity 0.4s ease, box-shadow 0.2s ease',
    transform: selected ? 'scale(1.5)' : 'scale(0.5) translateX(${position * 50}px)',
    opacity: visible ? 1 : 0,
    display: visible ? 'flex' : 'none',
    flexDirection: 'column',
    alignItems: 'center',
    margin: '0 10px',
    zIndex: selected ? 10 : 0,
    boxShadow: hovered && selected ? '0px 0px 20px rgba(0, 0, 0, 0.3)' : 'none',
    '&:hover': {
      transform: selected ? 'scale(1.6)' : 'scale(0.6) translateX(${position * 50}px)',
    },
  })
);

interface CardRecipeCarouselProps {
  onRecipeSelect: (cardName: CardRecipe) => void;
  onDripperSelect: (dripperName: Dripper) => void;
  onWaterRatioChange: (water:number, ratio:number) => void;
  onRecipeConfirm: (cardName: CardRecipe) => void;
}

const CardRecipeCarousel: React.FC<CardRecipeCarouselProps> = ({ onRecipeSelect, onDripperSelect, onWaterRatioChange, onRecipeConfirm }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);
  const recipeCarouselRef = useRef<HTMLDivElement>(null);

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
    }
  };

  const handleKeyDown = (event: KeyboardEvent) => {
    if (isInViewport(recipeCarouselRef.current)) {
      if (event.key === 'ArrowRight') {
        handleClick((selectedIndex + 1) % cardRecipes.length);
      } else if (event.key === 'ArrowLeft') {
        handleClick((selectedIndex - 1 + cardRecipes.length) % cardRecipes.length);
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
          handleClick((selectedIndex - 1 + cardRecipes.length) % cardRecipes.length);
        } else {
          handleClick((selectedIndex + 1) % cardRecipes.length);
        }
      }
    };

    const carouselElement = recipeCarouselRef.current;
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

  const displayedCard = [
    cardRecipes[(selectedIndex - 1 + cardRecipes.length) % cardRecipes.length], 
    cardRecipes[selectedIndex], 
    cardRecipes[(selectedIndex + 1) % cardRecipes.length], 
  ];

  return (
    <Container spacing={2} alignItems="center" height="100vh">
      <Typography style={{ textAlign: 'left', color: 'black', fontFamily: 'Poppins' }}>CoffeeWith.Dy</Typography>
      <Stack spacing={2} alignItems="center" height="60%" justifyContent="space-between" ref={recipeCarouselRef}>
        <Typography variant="h4" style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins' }}>
          <span style={{ fontWeight: 300 }}>Which </span>
          <strong style={{ fontSize: '1.5em', fontWeight: 700, color: 'black' }}>
            Recipe
          </strong>
          <span style={{ fontWeight: 300 }}> do you use?</span>
        </Typography>
        <Box display="flex" justifyContent="center" height="400px">
          {displayedCard.map((cardRecipe, index) => (
            <Stack alignItems="center" justifyContent="space-between" key={cardRecipe.id} height="100%">
              <CardItem className='glass'
                selected={selectedIndex === (selectedIndex + index - 1 + cardRecipes.length) % cardRecipes.length}
                visible={true}
                onClick={() => handleClick((selectedIndex + index - 1 + cardRecipes.length) % cardRecipes.length)}
                hovered={false}>
                <CardActionArea>
                  <CardMedia
                    component="img"
                    height="140"
                    src={cardRecipe.image}
                    sx={{ objectFit: 'cover' }} />
                  <CardContent sx={{
                    position: 'relative',
                    bottom: 0,
                    left: 0,
                    width: '100%',
                    color: 'black'
                  }}>
                    <Typography gutterBottom component="div" style={{ fontSize: '1rem', fontFamily: 'Poppins', fontWeight: 700 }}>
                      {cardRecipe.recipeName}
                    </Typography>
                    <Typography variant="overline" component="div" style={{ fontSize: '0.7rem', fontFamily: 'Poppins' }}>
                      by {cardRecipe.name}
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