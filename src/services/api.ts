import { https } from "./config";

export const getListImg = () => {
  return https.get("/get-all-img");
};

export const searchImg = (tuKhoa: string) => {
  return https.get(`/search-img/${tuKhoa}`)
} 