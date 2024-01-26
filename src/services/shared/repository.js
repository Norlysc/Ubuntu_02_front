import { HttpAdapter } from '@/services/shared/http-adapter';

class Repository {
  #http = new HttpAdapter();

  async find({ path = '', searchParams = {}, abortController, jwt }) {
    return await this.#http.get({ path, searchParams, abortController, jwt });
  }

  async findOne({ id, abortController, jwt }) {
    return await this.#http.get({ path: id, abortController, jwt });
  }

  async save({ path, payload, formData, abortController, jwt }) {
    return await this.#http.post({ path, payload, formData, abortController, jwt });
  }

  async update({ id, formData, payload, abortController, jwt }) {
    return await this.#http.put({ path: id, formData, payload, abortController, jwt });
  }

  async patch({ id, formData, payload, abortController, jwt }) {
    return await this.#http.patch({ path: id, formData, payload, abortController, jwt });
  }

  async delete({ id, abortController, jwt }) {
    return await this.#http.delete({ path: id, abortController, jwt });
  }
}

export const repository = new Repository();
