/* eslint-disable react-hooks/exhaustive-deps */
import FormikController from '@/components/form/FormikController';
import useFetch from '@/hooks/useFetch';
import useGeo from '@/hooks/useGeo';
import { microentrepreneurshipSchema } from '@/schemas/formsSchema';
import { CategoryService } from '@/services/category.repository';
import { Box, Button } from '@mui/material';
import { Form, Formik } from 'formik';
import { useEffect } from 'react';

export default function LoadForm({
  initialValues = {
    name: '',
    category: '',
    subcategory: '',
    country: '',
    state: '',
    city: '',
    description: '',
    moreInfo: '',
    images: [],
  },
  onSubmit,
}) {
  const instance = new CategoryService();
  let { countries, provinces, changeCountry } = useGeo();

  let { data: categories } = useFetch({
    queryFn: ({ abortController }) => instance.find({ abortController }),
  });

  countries = countries && countries.map((item) => ({ value: item.name, label: item.name }));
  provinces = provinces && provinces.map((item) => ({ value: item.name, label: item.name }));
  categories = categories && categories.map((item) => ({ value: item.id, label: item.name }));

  useEffect(() => {
    if (initialValues.country) {
      changeCountry(initialValues.country);
    }
  }, [initialValues.country]);

  return (
    <Box mt='1.5rem'>
      <Formik
        initialValues={initialValues}
        validationSchema={microentrepreneurshipSchema}
        onSubmit={onSubmit}
        isInitialValid={false}
      >
        {({ errors, touched, values, isSubmitting, isValid, setFieldValue }) => (
          <Form>
            <FormikController
              id='name'
              control='text'
              label='Nombre del Microemprendimiento*'
              name='name'
              error={touched.name && Boolean(errors.name)}
              helperText={'Se visualizará en el título de la publicación'}
            />
            <FormikController
              id='category'
              control='select'
              label='Categoría'
              name='category'
              error={touched.category && Boolean(errors.category)}
              helperText={'Seleccioná la categoría del Microemprendimiento'}
              options={categories ? categories : []}
            />
            <FormikController
              id='subcategory'
              control='text'
              label='Subcategoría*'
              name='subcategory'
              error={touched.subcategory && Boolean(errors.subcategory)}
              helperText={'Escribi la subcategoría del Microemprendimiento'}
            />
            <FormikController
              id='country'
              control='select'
              label='Pais*'
              name='country'
              error={touched.country && Boolean(errors.country)}
              helperText={'Seleccioná un País de la lista'}
              options={countries ? countries : []}
              onChange={({ target }) => (
                changeCountry(target.value), setFieldValue('country', target.value)
              )}
            />
            <FormikController
              id='state'
              control='select'
              label='Provincia/Estado*'
              name='state'
              error={touched.state && Boolean(errors.state)}
              helperText={'Seleccioná una Provincia/Estado de la lista'}
              options={provinces ? provinces : []}
            />
            <FormikController
              id='city'
              control='text'
              label='Ciudad*'
              name='city'
              error={touched.city && Boolean(errors.city)}
              helperText={'Sin abreviaturas, nombre completo'}
            />
            <FormikController
              value={values.description}
              id='description'
              control='textarea'
              label='Descripción del microemprendimiento*'
              name='description'
              error={touched.description && Boolean(errors.description)}
              helperText={'Máximo 300 caracteres'}
              maxLength={300}
            />
            <FormikController
              value={values.moreInfo}
              id='moreInfo'
              control='textarea'
              label='Mas información del Microemprendedor*'
              name='moreInfo'
              error={touched.moreInfo && Boolean(errors.moreInfo)}
              helperText={'Máximo 300 caracteres'}
              maxLength={300}
            />
            <FormikController
              values={values.images}
              control='file'
              id='images'
              name='images'
              error={Boolean(errors.images)}
              setFieldValue={setFieldValue}
            />
            <Button
              type='submit'
              variant='contained'
              sx={{ textTransform: 'none' }}
              fullWidth
              disableElevation
              disabled={isSubmitting || !isValid}
            >
              {initialValues?.name != ''
                ? 'Editar Microemprendimiento'
                : 'Cargar Microemprendimiento'}
            </Button>
          </Form>
        )}
      </Formik>
    </Box>
  );
}
