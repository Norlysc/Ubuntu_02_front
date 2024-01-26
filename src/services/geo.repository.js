import { repository } from '@/services/shared/repository';

export class GeoService {
  collection = '/geo';

  async findCountries({ abortController, jwt }) {
    const path = this.collection + '/paises';

    return await repository.find({ path, abortController, jwt });
  }

  async findProvinces({ country, abortController, jwt }) {
    const path = this.collection + `/provincias/${country}`;

    return await repository.find({ path, abortController, jwt });
  }
}
