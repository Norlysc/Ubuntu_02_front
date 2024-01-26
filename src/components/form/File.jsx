/* eslint-disable react-hooks/exhaustive-deps */
import { EditIcon, TrashIcon, UploadIcon } from '@/components/icons';
import { urlToFile } from '@/helpers/urlToFile';
import {
  Box,
  Button,
  ButtonBase,
  ImageList,
  ImageListItem,
  Typography,
  styled,
} from '@mui/material';
import { useEffect, useState } from 'react';

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

export default function File({ setFieldValue, id, name, values, error, rows }) {
  const [touched, setTouched] = useState(false);
  const [formValues, setFormValues] = useState(values);

  const isValidValues = values.length >= 1 && !error;

  async function removeImage(image) {
    await setFieldValue(
      name,
      formValues.filter((value) => value.name !== image.name),
    );
  }

  async function changeImage(image, file) {
    const indexOfImage = formValues.findIndex((value) => value.name === image.name);
    const newValues = formValues.toSpliced(indexOfImage, 1, file);
    await setFieldValue(name, newValues);
  }

  useEffect(() => {
    const fetchImages = async () => {
      const results = await Promise.all(values.map(async (value) => await urlToFile(value)));
      setFormValues(results);
    };

    if (typeof values[0] !== 'object') fetchImages();
    else setFormValues(values);
  }, [values]);

  return (
    <Box my='2.5rem'>
      <Box
        display={isValidValues ? 'none' : 'flex'}
        flexDirection='column'
        justifyContent='flex-end'
        alignItems='flex-end'
      >
        <Box display='flex' flexDirection='column' maxWidth='10rem'>
          <Button
            component='label'
            variant='contained'
            startIcon={<UploadIcon />}
            disableElevation
            sx={{
              textTransform: 'none',
              p: '0.62rem 1rem ',
              fontWeight: '700',
              fontSize: '0.875rem',
              lineHeight: '1.25rem',
            }}
          >
            Subir imagen
            <VisuallyHiddenInput
              type='file'
              accept='image/*'
              multiple
              onChange={async ({ target }) => {
                await setFieldValue(name, Array.from(target.files));
                setTouched(true);
              }}
              name={name}
              id={id}
            />
          </Button>
          <Typography variant='caption' mt='0.5rem' color={touched && error && 'error.main'}>
            *Requerida al menos una imagen
          </Typography>
          <Typography variant='caption' mt='0.25rem' color={touched && error && 'error.main'}>
            Hasta 3 imágenes.
          </Typography>
          <Typography variant='caption' color={touched && error && 'error.main'}>
            Máximo 3Mb cada una
          </Typography>
        </Box>
      </Box>
      {isValidValues && (
        <ThumbnailContainer
          values={values}
          changeImage={changeImage}
          removeImage={removeImage}
          rows={rows}
        />
      )}
    </Box>
  );
}

function ThumbnailContainer({ values, changeImage, removeImage, rows = false }) {
  return (
    <ImageList cols={rows ? 1 : 3} gap={8} rowHeight={90}>
      {values.map((image, index) => (
        <Thumbnail key={index} image={image} changeImage={changeImage} removeImage={removeImage} />
      ))}
    </ImageList>
  );
}

function Thumbnail({ image, changeImage, removeImage }) {
  const imageURL = typeof image === 'object' ? URL.createObjectURL(image) : image;

  return (
    <ImageListItem sx={{ borderRadius: '0.5rem', overflow: 'hidden', position: 'relative' }}>
      <img src={imageURL} />
      <Box
        sx={{
          position: 'absolute',
          top: '0.5rem',
          right: '0.5rem',
          display: 'flex',
          gap: '0.25rem',
        }}
      >
        <ButtonBase sx={{ borderRadius: '50%' }} component='label'>
          <EditIcon />
          <VisuallyHiddenInput
            type='file'
            accept='image/*'
            onChange={({ target }) => changeImage(image, target.files[0])}
          />
        </ButtonBase>
        <ButtonBase sx={{ borderRadius: '50%' }} onClick={() => removeImage(image)}>
          <TrashIcon />
        </ButtonBase>
      </Box>
    </ImageListItem>
  );
}
