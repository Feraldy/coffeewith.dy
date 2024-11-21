import React  from 'react';
import { Box, FormControl,  Input, Typography } from '@mui/material';
import { Stack, styled } from '@mui/system';



const Container = styled(Stack)({
    backgroundColor: '#D9D9D9', // Set the background color
    height: '100vh', // Full viewport height
    justifyContent: 'center',
  });

  interface CoffeeScaleProps {
    onScaleChange: (coffeeWeight: number) => void; 
    onScaleConfirm: (coffeeWeight: number) => void; 
    coffeeWeight:number
  }

const CoffeeScale: React.FC<CoffeeScaleProps> = ({ onScaleChange, onScaleConfirm, coffeeWeight }) => {
  //const [coffeeWeight, setWeight] = useState(0); 
  
  const handleDecrement = () => {
    onScaleChange(Math.max(0, coffeeWeight - 1)); // Decrement weight, minimum 0
  };

  const handleIncrement = () => {
    onScaleChange(coffeeWeight + 1); // Increment weight
  };

  return (
    <Container spacing={2} alignItems="center">
      <Stack spacing={2} alignItems="center" height="100vh" justifyContent="center" gap="20px">
        <Typography variant="h4" style={{ textAlign: 'center', color: 'black', fontFamily: 'Poppins' }}>
          <span style={{ fontWeight: 300 }}>How much </span> 
          <strong style={{ fontSize: '1.5em', fontWeight: 700, color: 'black' }}>
            Coffee
          </strong> 
          <span style={{ fontWeight: 300 }}> do you use?</span>
        </Typography>
        <Box 
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
      maxHeight: '400px', 
      borderRadius: '5px' 
    }} 
    onClick={() => {
      onScaleConfirm(coffeeWeight);
    }}
  />
</Box >
        <Stack direction="row" alignItems="center" justifyContent='center' spacing={2}> 
          <Typography 
            style={{ textAlign: 'center', color: 'black', cursor: 'pointer' }} 
            onClick={handleDecrement}
            role="button"
          >
            -
          </Typography>
          <FormControl variant="standard" sx={{ m: 1, mt: 3, width: '25ch' }}>
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
            style={{ textAlign: 'center', color: 'black', cursor: 'pointer' }} 
            onClick={handleIncrement}
            role="button"
          >
            +
          </Typography>
        </Stack>
      </Stack>
      <Stack direction="row" justifyContent="space-evenly" maxWidth="7rem" sx={{ position: "relative", top:"-34.1%"}}  overflow="hidden" spacing={1}>
      <Typography 
        sx={{ 
          fontFamily: 'var(--font-digital-7)',
          fontSize: '1.7rem',
          color: 'black',
        }}
>
            00:00
      </Typography>
      <Typography 
          sx={{ 
            fontFamily: 'var(--font-digital-7)', // Use the CSS variable here
            fontSize: '1.7rem',
            color: 'black',
          }}
>
            {coffeeWeight}G
      </Typography>
     
      </Stack>
    </Container>
  );
};

export default CoffeeScale;