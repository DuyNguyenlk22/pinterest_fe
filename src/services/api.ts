import { AxiosResponse } from "axios";
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

export const addComment = (data: { hinh_id: string | number | undefined, noi_dung: string }) => {
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

export const uploadImg = (data: FormData) => {
  return https.post("/addImg/upload-img", data)
}

export const updateInfo = (data: FormData) => {
  return https.put("/personal/update-user-info", data)
}

export const deleteImg = (data: { hinh_id: number }): Promise<AxiosResponse<any>> => {
  return https.delete("/manage/delete-img-created", { data })
}

export const isSavedImg = (data: { hinh_id: number | undefined }): Promise<AxiosResponse<any>> => {
  return https.post("/detail/isSaveImg", data)
}