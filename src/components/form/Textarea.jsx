import { FormControl, FormHelperText, TextField, Typography } from '@mui/material';
import { Field } from 'formik';
import { useEffect } from 'react';
import { useState } from 'react';

export default function Textarea({
  id,
  name,
  label,
  error,
  type,
  helperText,
  value,
  maxLength,
  rows = 6,
  ...rest
}) {
  const [count, setCount] = useState(value.length);

  useEffect(() => {
    setCount(value.length);
  }, [value]);

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
        multiline
        rows={rows}
        {...rest}
      />
      <FormHelperText
        component={'span'}
        sx={{ display: 'flex', justifyContent: 'space-between', color: error && 'error.main' }}
      >
        <Typography variant='caption'>{helperText}</Typography>
        <Typography variant='caption'>
          {count}/{maxLength}
        </Typography>
      </FormHelperText>
    </FormControl>
  );
}
