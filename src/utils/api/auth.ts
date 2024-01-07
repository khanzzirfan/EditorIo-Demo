import { api, getAuthHeaders } from './api';
import { AuthInfoDTO } from '../../interfaces/user';

export async function fetchAuthInfo(token: string) {
  return api
    .get<AuthInfoDTO>('/me', {
      headers: await getAuthHeaders(token),
    })
    .then(({ data }) => data);
}
