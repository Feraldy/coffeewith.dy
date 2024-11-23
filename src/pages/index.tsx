import CoffeeDripperCarousel from "@/components/coffeeDripperCarousel";
import CoffeeScale from "@/components/coffeeScale";
import RecipeCard from "@/components/recipeCard";
import {gsap} from 'gsap';
import { useEffect, useRef, useState } from "react";
import { ScrollTrigger } from 'gsap/dist/ScrollTrigger';
import { ScrollToPlugin } from 'gsap/dist/ScrollToPlugin';
import FullRecipe from "@/components/fullRecipe";
import WaterRatio from "@/components/waterRatio";
import { CardRecipe, Dripper } from "@/utils/types";
import { Stack, styled, Typography } from "@mui/material";

function Home() {
  const [selectedDripper, setSelectedDripper] = useState<Dripper | null>(null);
  const [selectedRecipe, setSelectedRecipe] = useState<CardRecipe | null>(null);
  const [coffeeWeight, setCoffeeWeight] = useState(0); 
  const [water, setWaterLevel] = useState(0);
  const [ratio, setRatio] = useState(0); 
  const [showCarousel, setShowCarousel] = useState<boolean | null>(false);
  const [showScale, setShowScale] = useState<boolean | null>(false);
  const [showWaterRatio, setShowWaterRatio] = useState<boolean | null>(false);
  const [showFullRecipe, setShowFullRecipe] = useState<boolean | null>(false);
  const carouselRef = useRef(null);
  const waterRatioRef = useRef(null);
  const scaleRef = useRef(null);
  const fullRecipeRef = useRef(null);
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  useEffect(() => {
    // This effect will run after the component renders and refs are assigned
    if (showCarousel && carouselRef.current) {
      gsap.to(window, { duration: 2, scrollTo: carouselRef.current });
    }
    if (showScale && scaleRef.current) {
      gsap.to(window, { duration: 2, scrollTo: scaleRef.current });
    }
    if (showWaterRatio && waterRatioRef.current) {
      gsap.to(window, { duration: 2, scrollTo: waterRatioRef.current });
    }
    if (showFullRecipe && fullRecipeRef.current) {
      gsap.to(window, { duration: 2, scrollTo: fullRecipeRef.current });
    }
  }, [showCarousel, showScale, showWaterRatio, showFullRecipe]);

  const handleRecipeSelect = (recipeCard: CardRecipe) => {
    setSelectedRecipe(recipeCard);
    setShowCarousel(false); 
    setShowScale(false); 
    setShowWaterRatio(false);
    setShowFullRecipe(false);
  };

  const handleRecipeConfirm = (recipeCard: CardRecipe) => {
    setSelectedRecipe(recipeCard);
    setShowCarousel(true); 
    if (recipeCard.id !== 'custom'){
      setShowWaterRatio(false);
      setShowCarousel(false); 
    }
    if (showCarousel && carouselRef.current) {
      gsap.to(window, { duration: 2, scrollTo: carouselRef.current });
    }

  }

  const handleDripperSelect = (dripperName: Dripper) => {
    setSelectedDripper(dripperName);
    setShowScale(true); 
    if (showScale && scaleRef.current) {
      gsap.to(window, { duration: 2, scrollTo: scaleRef.current });
    }
  };

  const handleScaleChange = (weight: number) => {
    setCoffeeWeight(weight);
  };

  const handleScaleConfirm = (weight: number) => {
    setCoffeeWeight(weight);
    if (selectedRecipe?.id === "custom") {
      setShowWaterRatio(true);
      if (showWaterRatio && waterRatioRef.current) {
        gsap.to(window, { duration: 2, scrollTo: waterRatioRef.current });
      }
    } else if (coffeeWeight > 0) {
      setShowFullRecipe(true);
      if (showFullRecipe && fullRecipeRef.current) {
        gsap.to(window, { duration: 2, scrollTo: fullRecipeRef.current });
      }
    }

    if (showFullRecipe && fullRecipeRef.current) {
      gsap.to(window, { duration: 2, scrollTo: fullRecipeRef.current });
    }
  }

  const handleWaterRatioChange = (water: number, ratio: number) => {
    setWaterLevel(water);
    setRatio(ratio);
  };

  const handleWaterRatioConfirm = (water: number, ratio: number) => {
    setWaterLevel(water);
    setRatio(ratio);
    setShowFullRecipe(true);
    if (showFullRecipe && fullRecipeRef.current) {
      gsap.to(window, { duration: 2, scrollTo: fullRecipeRef.current });
    }
  }
  
  const Container = styled(Stack)({
    backgroundColor: '#D9D9D9',
    height: '30vh', 
    justifyContent: 'center',
  });

  return (
    <div>
      <div>
        <RecipeCard
          onRecipeSelect={handleRecipeSelect}
          onDripperSelect={handleDripperSelect}
          onWaterRatioChange={handleWaterRatioChange}
          onRecipeConfirm={handleRecipeConfirm}
        />
      </div>
      <Container></Container>
      {showCarousel && ( // Conditionally render based on state
        <div ref={carouselRef}>
          <CoffeeDripperCarousel onDripperSelect={handleDripperSelect} />
          <Container></Container>
        </div>
      )}
      {showScale && ( // Conditionally render based on state
        <div ref={scaleRef}>
          <CoffeeScale onScaleChange={handleScaleChange} onScaleConfirm={handleScaleConfirm} coffeeWeight={coffeeWeight}/>
          <Container></Container>
        </div>
      )}
      {showWaterRatio && ( // Conditionally render based on state
        <div ref={waterRatioRef}>
          <WaterRatio onWaterRatioChange={handleWaterRatioChange} onWaterRatioConfirm={handleWaterRatioConfirm} coffeeWeight={coffeeWeight} water={water} ratio={ratio}/>
          <Container></Container>
        </div>
      )}
      {showFullRecipe && selectedRecipe && selectedDripper &&( // Conditionally render based on state
        <div ref={fullRecipeRef}>
          <FullRecipe
            selectedDripper={selectedDripper}
            selectedRecipe={selectedRecipe}
            coffeeWeight={coffeeWeight}
            ratio={ratio}
            water={water}
          />
          <Container></Container> 
          <Container></Container> 
        </div>
      )}   
      
    </div>
  );
}

export default Home;