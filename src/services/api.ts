import { CommentProps } from "../model/commentInterface";
import { UserProps } from "../model/userInterface";
import { https } from "./config";

export const getListImg = () => {
  return https.get("/get-all-img");
};

export const searchImg = (tuKhoa: string) => {
  return https.get(`/search-img/${tuKhoa}`)
}

export const getDetailImg = (id: string | undefined) => {
  return https.get(`/detail/get-img-detail/${id}`)
}

export const getCommentImg = (hinh_id: string | undefined) => {
  return https.get(`/detail/get-img-comment/${hinh_id}`)
}

export const addComment = (data: CommentProps) => {
  return https.post(`/detail/add-comment`, data)
}

export const register = (data: UserProps) => {
  return https.post("/auth/signup", data)
}

export const login = (data: UserProps) => {
  return https.post("/auth/login", data)
}

export const imgSaved = (hinh_id: string | undefined) => {
  return https.get(`/detail/get-img-is-saved/${hinh_id}`)
}

export const infoUser = () => {
  return https.get("/manage/get-info-user")
}