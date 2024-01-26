import { repository } from '@/services/shared/repository';

export class MicroEntrepreneurshipService {
  collection = '/microentrepreneurship';

  async find({ searchParams = {}, abortController, jwt }) {
    const path = this.collection + '/all';

    return await repository.find({ path, searchParams, abortController, jwt });
  }

  async findByName({ searchParams = {}, abortController, jwt }) {
    const path = this.collection + '/find';

    return await repository.find({ path, searchParams, abortController, jwt });
  }

  async findOne({ id, abortController, jwt }) {
    const path = this.collection + '/' + id;

    return await repository.find({ path, abortController, jwt });
  }

  //get microentrepreneurships by category.
  async findByCategory({ categoryDataId, abortController, jwt }) {
    const path = this.collection + `/find/category/${categoryDataId}`;

    return await repository.find({ path, abortController, jwt });
  }

  async findLatest({ searchParams = {}, abortController, jwt }) {
    const path = this.collection + '/count';

    return await repository.find({ path, searchParams, abortController, jwt });
  }

  async create({ formData, payload, abortController, jwt }) {
    const path = this.collection + '/save';

    return repository.save({ path, formData, payload, abortController, jwt });
  }

  async update({ id, formData, payload, abortController, jwt }) {
    id = this.collection + '/' + id;

    return repository.update({ id, formData, payload, abortController, jwt });
  }

  async delete({ id, abortController, jwt }) {
    id = this.collection + '/' + id;

    return repository.delete({ id, abortController, jwt });
  }

  async findManaged({ searchParams = {}, abortController, jwt }) {
    const path = this.collection + '/count/active';

    return await repository.find({ path, searchParams, abortController, jwt });
  }

  async hidde({ id, formData, payload, abortController, jwt }) {
    id = this.collection + `/${id}/hide`;

    return await repository.patch({ id, formData, payload, abortController, jwt });
  }

  async findUnmanaged({ searchParams = {}, abortController, jwt }) {
    const path = this.collection + '/count/notactive';

    return await repository.find({ path, searchParams, abortController, jwt });
  }

  async findCountByCategory({ searchParams = {}, abortController, jwt }) {
    const path = this.collection + '/count/categories';

    return await repository.find({ path, searchParams, abortController, jwt });
  }
}
