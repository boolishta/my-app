import Axios from "axios";

const instance = Axios.create({
  withCredentials: true,
  baseURL: 'https://social-network.samuraijs.com/api/1.0/',
  headers: {
    "API-KEY": "6946ff38-638a-4018-ac8b-6ecca0f18517"
  }
})

export const usersAPI = {
  getUsers(currentPage = 1, pagesSize = 10)  { //запрос на сервер на всех юзеров, в параметры передаем то что раньше приходило через this.props
    return instance.get(`users?page=${currentPage}&count=${pagesSize}`)
      .then(Response => {
        return Response.data; //передаем в response не все а только data
    });
  },
  getUnfollow(userId) {
    return instance.delete(`follow/${userId}`).then(Response => {
      return Response.data
    })
  },
  getFollow(userId) {
    return instance.post(`follow/${userId}`).then(Response => {
      return Response.data
    })
  },
  getAuthLogin() { //если залогинин то сетаем данные
    return instance.get(`auth/me`)
  },
  getAuthMe(userId) { //получаем данные для вывода на profile
    return instance.get(`profile/` + userId)
  }
}

