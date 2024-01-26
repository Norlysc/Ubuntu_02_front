import { repository } from '@/services/shared/repository';

export class MessageService {
  collection = '/message';

  // no 'all messages' endpoint created so far.
  async find({ searchParams = {}, abortController, jwt }) {
    const path = this.collection + '/all';

    return await repository.find({ path, searchParams, abortController, jwt });
  }

  async findOne({ id, abortController, jwt }) {
    id = this.collection + `/getMessage/${id}`;

    return await repository.findOne({ id, abortController, jwt });
  }

  //get messages by microentrepreneurships.
  async findByMicroentrepreneurship({ microentrepreneurshipId, abortController, jwt }) {
    const path =
      this.collection + `/getMessagesByMicroentrepreneurshipId/${microentrepreneurshipId}`;

    return await repository.find({ path, abortController, jwt });
  }

  //creates messages assigned to a microentrepreneurship
  async create({ payload, microentrepreneurshipId, abortController, jwt }) {
    const path = this.collection + `/save/${microentrepreneurshipId}`;

    return repository.save({ path, payload, abortController, jwt });
  }

  async update({ id, payload, token, abortController, jwt }) {
    id = this.collection + `/${id}/change`;
    const authenticatedPayload = { ...payload, token };

    return repository.update({ id, authenticatedPayload, abortController, jwt });
  }

  //no 'delete messages' endpoint created so far.
  // async delete({ id, abortController }) {
  //   id = this.collection + '/' + id;

  //   return repository.delete({ id, abortController });
  // }
}
