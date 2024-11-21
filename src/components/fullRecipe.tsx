// components/FullRecipe.tsx
import { CardRecipe, Dripper } from "@/utils/types";
import { Box, Stack, Typography } from "@mui/material";
import { styled } from "@mui/system";

const Container = styled(Stack)({
  backgroundColor: "#D9D9D9",
  height: "100vh",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
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
      <Box
        position= "absolute"
        width= "400px"
        height= "auto"
        component="img"
        src="scale.png"
        style={{ top: "30%", left: "22%", width: "200px", rotate: "-25deg" }}
        alt="Scale"
      />
      <Box
        position= "absolute"
        width= "400px"
        height= "auto"
        component="img"
        src={selectedRecipe?.image}
        style={{
          top: "10%",
          right: "25%",
          width: "230px",
          borderRadius: "20px",
          rotate: "25deg",
        }}
        alt="Dripper"
      />
      <Box
        position= "absolute"
        width= "400px"
        height= "auto"
        component="img"
        src={selectedDripper?.image}
        style={{ bottom: "5%", left: "60%", rotate: "45deg" }}
        alt="V60 Filter"
      />

      <Typography variant="h5" sx={{ fontFamily: "Poppins" }}>
        Here is your <strong>recipe</strong>!
      </Typography>
      <Box
        className="glass"
        display="flex"
        alignContent="center"
        justifyContent="center"
        height="40rem"
        width="50rem"
        padding="5rem"
        sx={{ position: "relative", zIndex: 1 }}
      >
        <Stack
          width="35rem"
          sx={{ justifyContent: "space-evenly", color: "black" }}
          spacing={4}
        >
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            spacing={2}
          >
            <Stack>
              <Typography variant="h4" fontWeight="900">
                {selectedRecipe?.recipeName}
              </Typography>
              <Typography variant="h6">
                by {selectedRecipe?.name}
              </Typography>
            </Stack>
            <Typography variant="subtitle1">
              {selectedDripper?.name} Dripper
            </Typography>
          </Stack>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            spacing={2}
          >
            <Stack alignItems="center">
              <Typography variant="h4">Coffee</Typography>
              <Typography variant="h6">{coffeeWeight}gr</Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="h4">Water</Typography>
              <Typography variant="h6">{water? water : Math.round(coffeeWeight*ratio)} ml</Typography>
            </Stack>
            <Stack alignItems="center">
              <Typography variant="h4">Ratio</Typography>
              <Typography variant="h6">1:{ratio.toFixed(0)}</Typography>
            </Stack>
          </Stack>
          <Typography variant="h4" fontWeight="900">
            Pouring Recipe
          </Typography>
          <Stack
            direction="row"
            sx={{ justifyContent: "space-between", alignItems: "center" }}
            spacing={2}
          >
            <Stack spacing={2}>
              {selectedRecipe.recipeVar.time.map((time, index) => {
                if (index < selectedRecipe.recipeVar.time.length - 1) {
                  return (
                    <Typography variant="h6" key={index}>
                      {time} - {selectedRecipe.recipeVar.time[index + 1]}
                    </Typography>
                  );
                }
                return null;
              })}
            </Stack>
            <Stack spacing={2}>
              {pour.map((p, index) => (
                <Typography variant="h6" key={index}>
                  {Number(p) % 1 === 0 ? p : Number(p).toFixed(0)} ml
                </Typography>
              ))}
            </Stack>
            <Stack spacing={2}>
              {pour.map((p, index) => {
                const totalPour = pour.slice(0, index + 1).reduce((a, b) => Number(a) + Number(b), 0);
                return (
                  <Typography variant="h6" key={index}>
                    {totalPour % 1 === 0 ? totalPour : totalPour.toFixed(0)} ml
                  </Typography>
                );
              })}
            </Stack>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
};

export default FullRecipe;