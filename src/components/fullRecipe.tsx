// components/FullRecipe.tsx
import { CardRecipe, Dripper } from "@/utils/types";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Stack)({
  backgroundColor: "#D9D9D9",
  height: "100vh",
  justifyContent: "center",
  position: "relative",
  color: "black", 
});

interface FullRecipeProps {
  selectedDripper: Dripper; 
  selectedRecipe: CardRecipe;
  coffeeWeight: number;
  ratio: number;
  water: number;
}

const FullRecipe: React.FC<FullRecipeProps> = ({
  selectedDripper,
  selectedRecipe,
  coffeeWeight,
  ratio,
  water,
}) => {
  const pour = selectedRecipe.recipeVar.pour.map((pourFn:any) => pourFn(ratio*coffeeWeight));

  return (
    <Container spacing={2} alignItems="center">
      

      <Typography variant="h5" sx={{ fontFamily: "Poppins", zIndex:1 }}>
        Here is your <strong>recipe</strong>!
      </Typography>
      <Stack position="relative">
      <Box
        className="glass"
        display="flex"
        justifyContent="center"
        maxHeight="80vh"
        height="100%"
        maxWidth="90vw"
        width="55rem"
        padding="5vw"
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Stack
          width="55rem"
          sx={{ justifyContent: "center", color: "black" }}
          spacing={2}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            spacing={2}
          >
            <Stack>
              <Typography fontFamily="Poppins" fontSize="clamp(3vh, 2vmin, 1.7rem)" fontWeight="700">
                {selectedRecipe?.recipeName}
              </Typography>
              <Typography fontFamily="Poppins" fontSize="clamp(2vh, 2vmin, 1.7rem)" fontWeight="300">
                by {selectedRecipe?.name}
              </Typography>
            </Stack>
            <Typography fontFamily="Poppins" fontSize="clamp(1.5vh, 2vmin, 1rem)">
              {selectedDripper?.name} Dripper
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            spacing={2}
          >
            <Stack alignItems="center">
              <Typography fontSize="clamp(3vh, 2vmin, 1.7rem)" fontWeight="700" fontFamily="Poppins">Coffee</Typography>
              <Typography fontSize="clamp(2vh, 2vmin, 1.7rem)" fontFamily="Poppins">{coffeeWeight}gr</Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography fontSize="clamp(3vh, 2vmin, 1.7rem)" fontWeight="700" fontFamily="Poppins">Water</Typography>
              <Typography fontSize="clamp(2vh, 2vmin, 1.7rem)" fontFamily="Poppins">{water? water : Math.round(coffeeWeight*ratio)} ml</Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography fontSize="clamp(3vh, 2vmin, 1.7rem)" fontWeight="700" fontFamily="Poppins">Ratio</Typography>
              <Typography fontSize="clamp(2vh, 2vmin, 1.7rem)" fontFamily="Poppins">1:{ratio.toFixed(0)}</Typography>
            </Stack>
          </Stack>
          <Typography fontSize="clamp(3vh, 2vmin, 1.7rem)" fontWeight="700" fontFamily="Poppins">
            Pouring Recipe
          </Typography>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            spacing={2}
          >
            <Stack spacing={1}>
              {selectedRecipe.recipeVar.time.map((time, index) => {
                if (index < selectedRecipe.recipeVar.time.length - 1) {
                  return (
                    <Typography variant="h6" fontSize="clamp(2vh, 2vmin, 1.7rem)" key={index} fontFamily="Poppins" fontWeight="400">
                      {time} - {selectedRecipe.recipeVar.time[index + 1]}
                    </Typography>
                  );
                }
                return null;
              })}
            </Stack>
            <Stack spacing={1}>
              {pour.map((p, index) => (
                <Typography variant="h6" fontSize="clamp(2vh, 2vmin, 1.7rem)" key={index} fontFamily="Poppins" fontWeight="400">
                  {Number(p) % 1 === 0 ? p : Number(p).toFixed(0)} ml
                </Typography>
              ))}
            </Stack>
            <Stack spacing={1}>
              {pour.map((p, index) => {
                const totalPour = pour.slice(0, index + 1).reduce((a, b) => Number(a) + Number(b), 0);
                return (
                  <Typography variant="h6" fontSize="clamp(2vh, 2vmin, 1.7rem)" key={index} fontFamily="Poppins" fontWeight="400">
                    {totalPour % 1 === 0 ? totalPour : totalPour.toFixed(0)} ml
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Box>
      <Box
        position= "absolute"
        maxWidth= "14rem"
        component="img"
        src="scale.png"
        style={{ top: "10rem", left: "-12rem", rotate: "-25deg" }}
        alt="Scale"
      />
      <Box
        position= "absolute"
        maxWidth= "15rem"
        component="img"
        src={selectedRecipe?.image}
        style={{
          top: "-3rem",
          right: "-10rem",
          borderRadius: "20px",
          rotate: "25deg",
        }}
        alt="Dripper"
      />
      <Box
        position= "absolute"
        maxWidth= "20rem"
        component="img"
        src={selectedDripper?.image}
        style={{ top: "25rem", right: "-10rem", rotate: "45deg" }}
        alt="V60 Filter"
      />
      </Stack>
    </Container>
  );
};

export default FullRecipe;