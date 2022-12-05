import {
  Box,
  Button,
  FormHelperText,
  TextField,
  Typography,
  useMediaQuery,
} from '@mui/material';
import { useTheme } from '@mui/material/styles';
import { Formik } from 'formik';
import type { FC } from 'react';
import useMounted from 'src/hooks/useMounted';
import {
  StationForm,
  useCreateStationMutation,
} from 'src/services/weatherService';
import { makeId } from 'src/utils/makeId';
import * as Yup from 'yup';

const AddStationForm: FC = () => {
  const mounted = useMounted();
  const theme = useTheme();
  const mobileDevice = useMediaQuery(theme.breakpoints.down('sm'));

  const [createStation] = useCreateStationMutation();

  const validationSchema = Yup.object().shape({
    name: Yup.string().max(255).required('Name is required'),
    latitude: Yup.number().required('Latitude is required'),
    longitude: Yup.number().required('Longitude is required'),
    altitude: Yup.number().required('Altitude is required'),
  });

  const initialValues = {
    name: undefined,
    latitude: undefined,
    longitude: undefined,
    altitude: undefined,
    submit: null,
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        mb: 3,
        mx: 'auto',
        width: mobileDevice ? '100%' : '50%',
      }}
    >
      <Typography align="center" color="textPrimary" variant="h3">
        Create new station
      </Typography>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={async (
          values,
          { setErrors, setStatus, setSubmitting, resetForm }
        ): Promise<void> => {
          try {
            const stationValues: StationForm = {
              externalId: makeId(10),
              name: values.name,
              latitude: values.latitude,
              longitude: values.longitude,
              altitude: values.altitude,
            };
            await createStation(stationValues);
            if (mounted.current) {
              setStatus({ success: true });
              setSubmitting(false);
              resetForm();
            }
          } catch (err) {
            console.error(err);
            if (mounted.current) {
              setStatus({ success: false });
              setErrors({ submit: err.message });
              setSubmitting(false);
            }
          }
        }}
      >
        {({
          errors,
          handleBlur,
          handleChange,
          handleSubmit,
          isSubmitting,
          touched,
          values,
        }): JSX.Element => (
          <form noValidate onSubmit={handleSubmit}>
            <TextField
              error={Boolean(touched.name && errors.name)}
              fullWidth
              helperText={touched.name && errors.name}
              label="Station name"
              margin="normal"
              name="name"
              onBlur={handleBlur}
              onChange={handleChange}
              type="text"
              value={values.name || ''}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.latitude && errors.latitude)}
              fullWidth
              helperText={touched.latitude && errors.latitude}
              label="Latitude"
              margin="normal"
              name="latitude"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.latitude || ''}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.longitude && errors.longitude)}
              fullWidth
              helperText={touched.longitude && errors.longitude}
              label="Longitude"
              margin="normal"
              name="longitude"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.longitude || ''}
              variant="outlined"
            />
            <TextField
              error={Boolean(touched.altitude && errors.altitude)}
              fullWidth
              helperText={touched.altitude && errors.altitude}
              label="Altitude"
              margin="normal"
              name="altitude"
              onBlur={handleBlur}
              onChange={handleChange}
              type="number"
              value={values.altitude || ''}
              variant="outlined"
            />
            {errors.submit && (
              <Box sx={{ mt: 3 }}>
                <FormHelperText error>{errors.submit}</FormHelperText>
              </Box>
            )}
            <Box sx={{ mt: 2 }}>
              <Button
                color="primary"
                disabled={isSubmitting}
                fullWidth
                size="large"
                type="submit"
                variant="contained"
              >
                Create
              </Button>
            </Box>
          </form>
        )}
      </Formik>
    </Box>
  );
};

export default AddStationForm;
