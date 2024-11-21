import React, { useState, useEffect } from "react";
import {
  Box,
  Stack,
  Typography,
  InputAdornment,
  Slider,
  FormControl,
  Input,
} from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Stack)({
  backgroundColor: "#D9D9D9",
  height: "100vh",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  color: "black",
});

interface waterRatioProps {
    onWaterRatioChange: (water: number, ratio:number) => void; 
    onWaterRatioConfirm: (water: number, ratio:number) => void;
    coffeeWeight: number
    water: number
    ratio: number
  }

const WaterRatio: React.FC<waterRatioProps> =({onWaterRatioChange, onWaterRatioConfirm, coffeeWeight, water, ratio}) => {
  const [waveOffset, setWaveOffset] = useState(0);
  const [isFlipped, setIsFlipped] = useState(false);

  const handleWaterLevelChange = (event:any) => {
    const newWater = parseInt(event.target.value, 10) || 0; 
    const newRatio = newWater / coffeeWeight;
    onWaterRatioChange(newWater, Math.round(newRatio));
  };

  const calculateWaterHeight = () => {
    const maxHeight = 100; 
    return (water / 400) * maxHeight; //400 is the max ML
  };

  const calculateTotalWater = (event:any) => {
    const newRatio = parseInt(event.target.value, 10) || 0; 
    onWaterRatioChange(newRatio * coffeeWeight, newRatio);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      setWaveOffset((prevOffset) => (prevOffset + 0.1) % 1);
    }, 50);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => { 
    onWaterRatioChange(ratio * coffeeWeight, ratio);
  }, [coffeeWeight, ratio]); 

  const generateWavePoints = () => {
  const points = [];
  const width = 100; 
  const maxHeight = 200;
  const waterHeight = calculateWaterHeight();

  const amplitude = 10 * (1 - waterHeight / maxHeight); 

  for (let i = 0; i <= width; i++) {
    let y = amplitude * Math.sin((waveOffset * 2 * Math.PI) + (i / width) * 4 * Math.PI);

    y = (y + amplitude) * (waterHeight / maxHeight) + (100 - waterHeight); 
    y = Math.max(0, Math.min(100, y)); 
    points.push(`${i}% ${y}%`);
  }
  return points.join(", ");
};

const handleFlip = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <Container spacing={2} alignItems="center">
      <Stack>
        <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>
          How much <strong>Water</strong>?
        </Typography>
        <Typography
          variant="h5"
          align="right"
          sx={{ fontFamily: "Poppins", cursor: "pointer" }}
          onClick={handleFlip}
        >
          or <strong>Ratio</strong>?
        </Typography>
      </Stack>
      <Box
        onClick={() => {
          onWaterRatioConfirm(water, ratio); 
        }}        
        className="glass"
        display="flex"
        alignContent="center"
        justifyContent="center"
        height="23rem"
        width="20rem"
        padding="5rem"
        sx={{
          position: "relative",
          zIndex: 1,
          overflow: "hidden",
          border: "1rem solid #ccc",
          borderRadius: "1rem",
          transition: "transform 0.8s",
          transformStyle: "preserve-3d",
          transform: isFlipped ? "rotateY(180deg)" : "rotateY(0deg)",
        }}
      >
        <Box
          sx={{
            position: "absolute",
            backfaceVisibility: "hidden",
            backgroundColor: "lightblue",
            height: `${calculateWaterHeight()}%`,
            width: "100%",
            bottom: 0,
            transition: "height 0.5s ease",
            clipPath: `polygon(0% 100%, ${generateWavePoints()}, 100% 100%)`,
          }}
        />

        <Box
          sx={{
            position: "absolute",
            transform: "rotateY(180deg)",
            backfaceVisibility: "hidden",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
            height: "100%",
          }}
        >
          <FormControl variant="standard" sx={{ width: '4rem', '& .MuiInput-underline:before': { borderBottom: 'none' } }}>
            <Input
              inputProps={{
                'aria-label': 'ratio',
                style: { textAlign: 'center' },
              }}
            />
          </FormControl>
        </Box>
      </Box>
      {isFlipped ? (
        <FormControl variant="standard" sx={{ width: '5rem', '& .MuiInput-underline:before': { borderBottom: 'none' } }}>
            <Input
              value={ratio}
              onChange={calculateTotalWater}
              startAdornment={<InputAdornment position="start">1 : </InputAdornment>} 
              inputProps={{
                'aria-label': 'weight',
                style: { textAlign: 'center' },
              }}
            /> 
        </FormControl>
      ) : (
        <Stack direction="row" alignItems="center" spacing={2}>
          <Slider
            value={water}
            onChange={handleWaterLevelChange}
            min={0}
            max={400}
            step={10}
            sx={{ width: "13rem", color: "black" }}
          />
          <FormControl variant="standard" sx={{ width: '2rem', '& .MuiInput-underline:before': { borderBottom: 'none' } }}>
            <Input
              value={water}
              onChange={handleWaterLevelChange}
              inputProps={{
                'aria-label': 'weight',
                style: { textAlign: 'center' },
              }}
            />
          </FormControl>
        </Stack>
      )}
    </Container>
  );
};

export default WaterRatio;