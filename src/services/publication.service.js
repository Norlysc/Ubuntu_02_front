import { repository } from '@/services/shared/repository';

export class PublicationService {
  collection = '/publication';

  async find({ abortController, jwt }) {
    const path = this.collection;

    return await repository.find({ path, abortController, jwt });
  }

  async findOne({ id, abortController, jwt }) {
    id = this.collection + `/${id}`;

    return await repository.findOne({ id, abortController, jwt });
  }

  async findActive({ abortController, jwt }) {
    const path = this.collection + '/activas';

    return await repository.find({ path, abortController, jwt });
  }

  async findLastTen({ abortController, jwt }) {
    const path = this.collection + '/ultimas10';

    return await repository.find({ path, abortController, jwt });
  }

  //creates a publication, auth token must be included.
  async create({ payload, abortController, jwt }) {
    const path = this.collection + `/create`;

    return repository.save({ path, payload, abortController, jwt });
  }

  //edits a publication, auth token must be included.
  async update({ id, token, formData, payload, abortController, jwt }) {
    const path = this.collection + `/change/${id}`;
    const authenticatedPayload = { ...payload, token };

    return repository.update({ path, formData, authenticatedPayload, abortController, jwt });
  }

  // deletes a publication, auth token must be included.No endpoint created so far.
  // async delete({ id, token, payload, abortController }) {
  //   const path = this.collection + `/delete/${id}`;
  //   const authenticatedPayload = [...payload, token];

  //   return repository.delete({ path, authenticatedPayload, abortController });
  // }
}
