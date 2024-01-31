import React, { useEffect, useState } from "react";
import { getListImg } from "../../services/api";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import { Skeleton } from "antd";
interface imgProp {
  hinh_id: number;
  ten_hinh: string;
  duong_dan: string;
  mo_ta: string;
  nguoi_dung_id: number;
}
const HomePage: React.FC = () => {
  let [listImg, setListImg] = useState<Array<imgProp>>([]);
  let { imgSearch, isSearch } = useSelector((state: any) => state.searchImgSlice);

  let data = imgSearch ? imgSearch : listImg;

  useEffect(() => {
    let listImg = async () => {
      try {
        let res = await getListImg();
        setListImg(res.data.content);
      } catch (error) {
        console.log("😐 ~ listImg ~ error:👉", error);
        throw new Error(`${error}`);
      }
    };
    listImg();
  }, []);

  return (
    <div className='columns-5'>
      {isSearch ? (
        <Skeleton active />
      ) : (
        setTimeout(() => {
          data.map((item: imgProp) => {
            return (
              <NavLink to={"/"} key={item.hinh_id}>
                <img src={item.duong_dan} alt={item.ten_hinh} className='p-2 w-full rounded-2xl' />
              </NavLink>
            );
          });
        }, 1500)
      )}
    </div>
  );
};

export default HomePage;
