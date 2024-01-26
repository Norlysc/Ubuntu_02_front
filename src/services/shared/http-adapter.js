import instance from '@/helpers/axiosConfig';
// import microentrepreneurshipResponse from '@/mocks/microentrepreneurship.json';

// const DATA = {
//   '/microentrepreneurship': microentrepreneurshipResponse,
// };

// export class HttpAdapter {
//   #BASE_URL = 'https://e-commerce-api-dev.4.us-1.fl0.io/api';

//   async get({ path, searchParams, requestInit }) {
//     try {
//       const response = await fetch(
//         this.#BASE_URL + path + '?' + new URLSearchParams(searchParams),
//         requestInit,
//       );

//       const data = await response.json();

//       if (response.status < 200 && response.status > 299)
//         throw new Error('Ha ocurrido un error en la solicitud');

//       return data;
//     } catch (error) {
//       throw new Error(error.message);
//     }
//   }
// }

// export class HttpAdapter {
//   async get({ path, searchParams = {}, abortController }) {
//     const { signal } = abortController || new AbortController();
//     const { query } = searchParams;

//     return new Promise((resolve, reject) => {
//       let [, response] = Object.entries(DATA).find((item) => path.includes(item[0]));

//       if (query) {
//         const regex = new RegExp(query, 'i');
//         response = response.filter((item) => regex.test(item.nombre));
//       }

//       const id = path.split('/')[2];

//       if (id) {
//         response = response.find((item) => {
//           return item.nombre === id;
//         });
//       }

//       const timeout = setTimeout(() => {
//         if (response.length > 0 || response.nombre) resolve(response);
//         else reject(new Error('No se encotraron resultados'));
//       }, [500]);

//       signal.addEventListener('abort', () => {
//         clearTimeout(timeout);
//       });

//       if (signal.aborted) reject(new Error('Operación cancelada'));
//     });
//   }

//   async post({ payload, abortController }) {
//     return { payload, abortController };
//   }

//   async patch({ id, payload, abortController }) {
//     return { id, payload, abortController };
//   }

//   async delete({ id, abortController }) {
//     return { id, abortController };
//   }
// }

export class HttpAdapter {
  async get({ path, searchParams, abortController, jwt }) {
    try {
      const signal = abortController.signal || new AbortController().signal;
      const headers = jwt ? { Authorization: `Bearer ${jwt}` } : undefined;

      const { data } = await instance.get(path + '?' + new URLSearchParams(searchParams), {
        signal,
        headers,
      });

      return data;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        return;
      }

      throw new Error(error.response?.data?.Message || error.message);
    }
  }

  async post({ path, formData, payload, abortController, jwt }) {
    try {
      const contentType = formData ? 'multipart/form-data' : 'application/json';
      const headers = jwt
        ? { Authorization: `Bearer ${jwt}`, 'Content-Type': contentType }
        : { 'Content-Type': contentType };
      const signal = abortController.signal || new AbortController().signal;
      payload = formData || JSON.stringify(payload);

      const { data } = await instance.post(path, payload, {
        signal,
        headers,
      });

      return data;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        return;
      }

      throw new Error(error.response?.data?.Message || error.message);
    }
  }

  async put({ path, formData, payload, abortController, jwt }) {
    try {
      const contentType = formData ? 'multipart/form-data' : 'application/json';
      const headers = jwt
        ? { Authorization: `Bearer ${jwt}`, 'Content-Type': contentType }
        : { 'Content-Type': contentType };
      const signal = abortController.signal || new AbortController().signal;
      payload = formData || JSON.stringify(payload);

      const { data } = await instance.put(path, payload, {
        signal,
        headers,
      });

      return data;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        return;
      }

      throw new Error(error.response?.data?.Message || error.message);
    }
  }

  async patch({ path, formData, payload, abortController, jwt }) {
    try {
      const contentType = formData ? 'multipart/form-data' : 'application/json';
      const headers = jwt
        ? { Authorization: `Bearer ${jwt}`, 'Content-Type': contentType }
        : { 'Content-Type': contentType };
      const signal = abortController.signal || new AbortController().signal;
      payload = formData || JSON.stringify(payload);

      const { data } = await instance.patch(path, payload, {
        signal,
        headers,
      });

      return data;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        return;
      }

      throw new Error(error.response?.data?.Message || error.message);
    }
  }

  async delete({ path, abortController, jwt }) {
    try {
      const signal = abortController.signal || new AbortController().signal;

      const { data } = await instance.delete(path, {
        signal,
        headers: { Authorization: `Bearer ${jwt}` },
      });

      return data;
    } catch (error) {
      if (error.code === 'ERR_CANCELED') {
        return;
      }

      throw new Error(error.response?.data?.Message || error.message);
    }
  }
}
