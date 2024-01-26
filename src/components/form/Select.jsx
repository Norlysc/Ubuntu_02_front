import { ErrorMessage, Field } from 'formik';
import {
  FormControl,
  FormHelperText,
  InputLabel,
  Select as MUISelect,
  MenuItem,
} from '@mui/material';

export default function Select({ id, name, label, error, type, options, helperText, ...rest }) {
  return (
    <FormControl fullWidth sx={{ my: '0.5rem' }}>
      <InputLabel>{label}</InputLabel>
      <Field
        as={MUISelect}
        fullWidth
        type={type}
        id={id}
        name={name}
        error={error}
        label={label}
        {...rest}
      >
        {options.map(({ value, label }) => (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        ))}
      </Field>
      {error ? (
        <ErrorMessage component={FormHelperText} name={name} sx={{ color: 'error.main' }} />
      ) : (
        <FormHelperText>{helperText}</FormHelperText>
      )}
    </FormControl>
  );
}
