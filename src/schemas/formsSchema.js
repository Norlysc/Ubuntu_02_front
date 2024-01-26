import * as yup from 'yup';

const phoneValidation = /^\+\d{13}$/;

const standartValidations = {
  selectInput: yup.string().required(),
  commonText: yup
    .string()
    .min(3, 'El texto debe tener al menos 3 caracteres')
    .max(40, 'El texto no debe exceder los 40 caracteres')
    .required('Este campo es obligatorio'),
  largeText: yup
    .string()
    .min(20, 'El texto debe tener al menos 20 caracteres')
    .max(300, 'Máximo 300 caracteres')
    .required('Requerido'),
  imagesFilter: yup
    .array()
    .min(1, 'Debe subir al menos 1 fotografía')
    .max(3, 'Solo se permiten hasta 3 fotografías')
    .test('fileSize', 'Una o más imágenes superan los 3MB', async (value) => {
      if (!value) return true;

      const sizeLimit = 3 * 1024 * 1024; // Tamaño máximo permitido: 3MB

      for (const file of value) {
        if (file.size > sizeLimit) {
          return false;
        }
      }
      return true;
    }),
};

export const contactSchema = yup.object().shape({
  fullName: standartValidations.commonText,
  email: yup
    .string()
    .email('Debe ser un correo electrónico válido')
    .required('Este campo es obligatorio'),
  phone: yup
    .string()
    .matches(phoneValidation, 'Ingrese un numero de teléfono válido')
    .required('Este campo es obligatorio'),
  message: standartValidations.largeText,
});

export const microentrepreneurshipSchema = yup.object().shape({
  name: standartValidations.commonText,
  category: standartValidations.selectInput,
  subcategory: standartValidations.commonText,
  country: standartValidations.selectInput,
  state: standartValidations.selectInput,
  city: standartValidations.commonText,
  description: standartValidations.largeText,
  moreInfo: standartValidations.largeText,
  images: standartValidations.imagesFilter,
});

export const publicationsSchema = yup.object().shape({
  title: standartValidations.commonText,
  description: yup
    .string()
    .min(20, 'El texto debe tener al menos 20 caracteres')
    .max(2000, 'El texto no debe exceder los 2000 caracteres')
    .required(),
  multipartImages: standartValidations.imagesFilter,
});
