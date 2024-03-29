import axios from "axios";
import { localService } from "./localService";

export const BASE_URL = "http://localhost:8080";
export const BASE_URL_IMG = 'http://localhost:8080/public/img/newFeed'
export const URL_IMG_AVA = 'http://localhost:8080/public/img/avatar'

export const TOKEN =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuZ3VvaV9kdW5nX2lkIjoyNCwiaWF0IjoxNzAyNTI2NzA3LCJleHAiOjE4NjAzMTQ3MDd9.t6spyvtHnTtYaxB69KUFMONO4eOXg1I4Y0JxmyrXkMA";

// axios instance
export const https = axios.create({
  baseURL: BASE_URL,
  headers: {
    token: localService.get()?.accessToken
  },
});
