import React, { useEffect, useState } from "react";
import { getListImg } from "../../services/api";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Skeleton } from "antd";
import { imgProp } from "../../model/imageInterface";
import { getAllImg } from "../../redux/slice/listImgSlice";
import { ThunkDispatch } from "@reduxjs/toolkit";

const HomePage: React.FC = () => {
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  let [loading, setLoading] = useState<boolean>(true);
  // let [listImg, setListImg] = useState<Array<imgProp>>([]);
  let { imgSearch, isSearch } = useSelector((state: any) => state.searchImgSlice);
  let { listImg } = useSelector((state: any) => state.listImgSlice);
  console.log("😐 ~ listImg:👉", listImg);

  let data = isSearch ? imgSearch : listImg;

  // useEffect(() => {
  //   let listImg = async () => {
  //     try {
  //       let res = await getListImg();
  //       dispatch(setListImage(res.data.content));
  //       setTimeout(() => {
  //         setListImg(res.data.content);
  //         setLoading(false);
  //       }, 2000);
  //     } catch (error: any) {
  //       throw new Error(`${error.message}`);
  //     }
  //   };
  //   listImg();
  // }, []);
  useEffect(() => {
    dispatch(getAllImg());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  return (
    <div className='columns-5'>
      {loading
        ? Array.from({ length: 50 }, (_, index: number) => {
            return <Skeleton active key={index} />;
          })
        : data?.map((item: imgProp) => {
            return (
              <NavLink to={`/info-img/${item.hinh_id}`} key={item.hinh_id}>
                <img
                  loading='lazy'
                  src={item.duong_dan}
                  alt={item.ten_hinh}
                  className='p-2 w-full rounded-2xl'
                />
              </NavLink>
            );
          })}
    </div>
  );
};

export default HomePage;
