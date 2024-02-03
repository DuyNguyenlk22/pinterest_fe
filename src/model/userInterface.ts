import { ImgProp } from "./imageInterface"

export interface UserProps {
    nguoi_dung_id: number,
    email: string,
    matKhau: string,
    ho_ten: string,
    tuoi: number,
    anh_dai_dien: string,
    refresh_token: string,
    hinh_anh: ImgProp[],
    luu_anh: SavedImg[]
}
interface SavedImg {
    hinh_id: number,
    nguoi_dung_id: number,
    ngay_luu: string,
    hinh_anh: ImgProp
}
