import Axios from "axios";

const instance = Axios.create({
  withCredentials: true, //цепляется cookies
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
  getProfile(userId) { //получаем данные для вывода на profile
    return profileAPI.getProfile(userId)
  }
}

export const profileAPI = {
  getProfile(userId) { //получаем данные для вывода на profile
    return instance.get(`profile/` + userId)
  },
  getStatus(userId) {
    return instance.get(`profile/status/` + userId)
  },
  updateStatus(status) {
    return instance.put(`profile/status`, { status: status})
  },
  savePhoto(photoFile) {
    let formData = new FormData();
    formData.append("image", photoFile);
    return instance.put(`profile/photo`, formData, {
      headres: {
        'Content-Type': 'multipart/form-data'
      }
    });
  },
  saveProfile(profile) {
    return instance.put(`profile`, profile ) //отправляем профайл на сервер
  }
}

export const authAPI = {
  getMe() { //если залогинин то сетаем данные
    return instance.get(`auth/me`);
  },
  login(email, password, rememberMe = false, captcha = null) {
    return instance.post(`auth/login`, { email, password, rememberMe, captcha });
  },
  logout() {
    return instance.delete(`auth/login`);
  }
}

export const securityAPI = {
  getCaptchaUrl() { //если залогинин то сетаем данные
    return instance.get(`security/get-captcha-url`);
  }
}