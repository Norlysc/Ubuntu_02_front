import { repository } from '@/services/shared/repository';

export class CategoryService {
  collection = '/category';

  async find({ abortController, jwt }) {
    const path = this.collection + '/all';

    return await repository.find({ path, abortController, jwt });
  }
}
