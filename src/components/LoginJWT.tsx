import { Alert, Box, Button, FormHelperText, TextField } from '@mui/material';
import { Formik } from 'formik';
import { FC, useCallback } from 'react';
import useAuth from 'src/hooks/useAuth';
import useMounted from 'src/hooks/useMounted';
import * as Yup from 'yup';

const LoginJWT: FC = () => {
  const mounted = useMounted();
  const { login } = useAuth();

  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email('It must be a valid email.')
      .max(255)
      .required('Email is required.'),
    password: Yup.string().max(255).required('The password is required.'),
  });

  const onSubmit = useCallback(
    async (values, { setErrors, setStatus, setSubmitting }): Promise<void> => {
      try {
        await login(values.email, values.password);
        if (mounted.current) {
          setStatus({ success: true });
          setSubmitting(false);
        }
      } catch (err) {
        console.error(err);
        if (mounted.current) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
        }
      }
    },
    [login]
  );

  return (
    <Formik
      initialValues={{
        email: 'admin@example.com',
        password: 'test-password',
        submit: null,
      }}
      validationSchema={validationSchema}
      onSubmit={onSubmit}
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
            autoFocus
            error={Boolean(touched.email && errors.email)}
            fullWidth
            helperText={touched.email && errors.email}
            label="Email"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.password && errors.password)}
            fullWidth
            helperText={touched.password && errors.password}
            label="Password"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type="password"
            value={values.password}
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
              Login
            </Button>
          </Box>
          <Box sx={{ mt: 2 }}>
            <Alert severity="info">
              User <b>admin@example.com</b> and password <b>test-password</b>
            </Alert>
          </Box>
        </form>
      )}
    </Formik>
  );
};

export default LoginJWT;
