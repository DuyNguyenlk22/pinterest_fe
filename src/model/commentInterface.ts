import { UserProps } from "./userInterface";

export interface CommentProps {
    binh_luan_id: number,
    nguoi_dung_id: number,
    hinh_id: number | string,
    ngay_binh_luan: string,
    noi_dung: string,
    anh_dinh_kem: string,
    nguoi_dung: UserProps
}


