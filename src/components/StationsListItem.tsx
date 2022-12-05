import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton, ListItem, ListItemText, Typography } from '@mui/material';
import { FC, useCallback } from 'react';
import {
  StationResponse,
  useDeleteStationMutation,
} from 'src/services/weatherService';

interface StationsListItemProps {
  station: StationResponse;
}

const StationsListItem: FC<StationsListItemProps> = ({ station }) => {
  const [deleteStation] = useDeleteStationMutation();

  const handleClick = useCallback(
    () => deleteStation(station.id),
    [deleteStation, station.id]
  );

  return (
    <ListItem
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="delete-station"
          onClick={handleClick}
        >
          <DeleteIcon />
        </IconButton>
      }
    >
      <ListItemText
        primary={
          <Typography variant="h2" color="textPrimary" sx={{ mr: 1 }}>
            {station.name}
          </Typography>
        }
        secondary={
          <>
            <Typography
              component="span"
              variant="body2"
              color="text.primary"
              sx={{ mr: 1 }}
            >
              Altitude: {station.altitude}m
            </Typography>
            <Typography variant="caption" color="textSecondary">
              ({station.longitude}, {station.latitude})
            </Typography>
          </>
        }
      />
    </ListItem>
  );
};

export default StationsListItem;
