import { Messages } from "../helpers/constants";
import { KeyExists } from "../helpers/errors";
import { AddKeyRequest } from "../interfaces/key/addKey.interface";
import { getAllKeys, getKey } from "../utils/dynamo/get";
import { putKey } from "../utils/dynamo/put";
import { updateKey } from "../utils/dynamo/update";

class KeyService {
  async addKey(request: AddKeyRequest) {
    const resposeFind = await getKey(request.original);
    if (resposeFind.Item) {
      throw KeyExists();
    }
    await putKey(request.original, request.translated);
    return { message: Messages.saved };
  }

  async updateKey(request: AddKeyRequest) {
    await updateKey(request.original, request.translated);
    return { message: Messages.updated };
  }

  async getKeys() {
    const { Items } = await getAllKeys();
    return Items;
  }
}
export default new KeyService();
