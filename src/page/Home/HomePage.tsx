import { getAllImg } from "../../redux/slice/listImgSlice";
import { localService } from "../../services/localService";
import { useDispatch, useSelector } from "react-redux";
import { ImgProp } from "../../model/imageInterface";
import { BASE_URL_IMG } from "../../services/config";
import { ThunkDispatch } from "@reduxjs/toolkit";
import React, { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import { Skeleton } from "antd";

const HomePage: React.FC = () => {
  useEffect(() => {
    if (!localService.get()) {
      window.location.href = "/auth/register";
    }
  }, []);
  let [loading, setLoading] = useState<boolean>(true);
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  let { listImg } = useSelector((state: any) => state.listImgSlice);
  let { imgSearch, isSearch } = useSelector((state: any) => state.searchImgSlice);

  let data = isSearch ? imgSearch : listImg;

  useEffect(() => {
    dispatch(getAllImg());
    setTimeout(() => {
      setLoading(false);
    }, 2000);
  }, [dispatch]);

  return (
    <div className='columns-2 md:columns-3 lg:columns-5'>
      {loading
        ? Array.from({ length: 50 }, (_, index: number) => {
            return <Skeleton active key={index} />;
          })
        : data?.map((item: ImgProp) => {
            return (
              <NavLink to={`/info-img/${item.hinh_id}`} key={item.hinh_id}>
                <img
                  loading='lazy'
                  src={item.duong_dan.includes(".com") ? item.duong_dan : `${BASE_URL_IMG}/${item.duong_dan}`}
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
