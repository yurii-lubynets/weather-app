import SearchIcon from '@mui/icons-material/Search';
import {
  Box,
  Checkbox,
  FormControlLabel,
  IconButton,
  TextField,
} from '@mui/material';
import { FC } from 'react';

interface SearchControlProps {
  value: string;
  setValue: React.Dispatch<React.SetStateAction<string>>;
  isForecast: boolean;
  setIsForecast: React.Dispatch<React.SetStateAction<boolean>>;
  handleSearch: () => void;
}

const SearchControl: FC<SearchControlProps> = ({
  value,
  isForecast,
  setIsForecast,
  setValue,
  handleSearch,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        direction: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        mb: 2,
      }}
    >
      <Box display="flex" alignItems="start">
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            width: 250,
          }}
        >
          <TextField
            id="search-bar"
            onInput={(e: any) => setValue(e.target.value)}
            variant="outlined"
            placeholder="Enter a city name"
            size="small"
          />
          <FormControlLabel
            control={
              <Checkbox
                name="forecast"
                checked={isForecast}
                onClick={() => setIsForecast((isChecked) => !isChecked)}
              />
            }
            label="5 days forecast"
          />
        </Box>
        <IconButton
          aria-label="search"
          onClick={handleSearch}
          disabled={!value}
        >
          <SearchIcon />
        </IconButton>
      </Box>
    </Box>
  );
};

export default SearchControl;
