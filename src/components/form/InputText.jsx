import { FormControl, FormHelperText, TextField } from '@mui/material';
import { ErrorMessage, Field } from 'formik';

export default function InputText({ id, name, label, error, type, helperText, ...rest }) {
  return (
    <FormControl fullWidth sx={{ my: '0.5rem' }}>
      <Field
        as={TextField}
        fullWidth
        type={type}
        id={id}
        name={name}
        error={error}
        label={label}
        {...rest}
      />
      {error ? (
        <ErrorMessage component={FormHelperText} name={name} sx={{ color: 'error.main' }} />
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
