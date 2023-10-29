import { api } from '@/utils/api'
import type { DataLoginType } from '@/types/AuthType'
import { errorCallback } from '@/helpers/service.helper'

type ParamsLogin = {
  email: string
  password: string
}

export class LoginService {
  static init() {
    return new LoginService()
  }

  login(data: ParamsLogin) {
    return api
      .post<DataLoginType>('/login', data)
      .then((response) => response.data)
      .catch(errorCallback)
  }
}
