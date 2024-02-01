import { UserProps } from "./userInterface";

export interface ImgProp {
    hinh_id: number;
    ten_hinh: string;
    duong_dan: string;
    mo_ta: string;
    nguoi_dung_id: number;
}


export interface ListImgState {
    listImg: ImgProp[] | null
}

export interface DetailImgProps extends ImgProp {
    nguoi_dung: UserProps
}