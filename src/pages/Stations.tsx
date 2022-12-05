import { Box, Container, Divider } from "@mui/material";
import type { FC } from "react";
import AddStationForm from "src/components/AddStationForm";
import StationsList from "src/components/StationsList";

const Stations: FC = () => {
  return (
    <Box
      sx={{
        backgroundColor: "background.paper",
        minHeight: "100%",
        py: 6,
      }}
    >
      <Container maxWidth="lg">
        <AddStationForm />
        <Divider />
        <StationsList />
      </Container>
    </Box>
  );
};

export default Stations;
