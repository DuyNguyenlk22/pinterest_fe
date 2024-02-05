import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { addComment, getDetailImg, imgSaved, getCommentImg } from "../../services/api";
import { DetailImgProps, ImgProp } from "../../model/imageInterface";
import { useDispatch, useSelector } from "react-redux";
import { ThunkDispatch } from "@reduxjs/toolkit";
import { getAllImg } from "../../redux/slice/listImgSlice";
import { ListComment } from "./ListComment";
import { Input } from "antd";
import { BASE_URL_IMG } from "../../services/config";
import { CommentProps } from "../../model/commentInterface";

export const InfoImage: React.FC = () => {
  const { id } = useParams<string>();
  const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
  const [value, setValue] = useState<string>("");
  const [isSaved, setIsSaved] = useState<boolean>(false);
  const [infoImg, setInfoImg] = useState<DetailImgProps | null>(null);
  const [comment, setComment] = useState<CommentProps[] | null>(null);
  let { listImg } = useSelector((state: any) => state.listImgSlice);

  let getComment = async () => {
    try {
      let res = await getCommentImg(id);
      setComment(res.data.content);
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };

  const getInfoImg = async () => {
    try {
      let res = await getDetailImg(id);
      setInfoImg(res.data.content);
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };
  const getImgSaved = async () => {
    try {
      let res = await imgSaved(id);
      setIsSaved(res.data.content);
    } catch (error: any) {
      throw new Error(`${error.message}`);
    }
  };

  const postComment = async (e: any) => {
    e.preventDefault();
    let dataComment = {
      hinh_id: Number(id),
      noi_dung: value,
    };
    try {
      await addComment(dataComment);
      if (value) {
        setValue("");
        getComment();
      }
    } catch (error) {
      console.log("😐 ~ onFinish ~ error:👉", error);
    }
  };

  useEffect(() => {
    getInfoImg();
    getImgSaved();
    getComment();
    dispatch(getAllImg());
  }, [dispatch, id]);

  return (
    <div className='my-10'>
      <div className='containerInfo  rounded-3xl shadow-xl'>
        <div className='grid grid-cols-2 '>
          <img
            src={
              infoImg?.duong_dan.includes(".com")
                ? infoImg?.duong_dan
                : `${BASE_URL_IMG}/${infoImg?.duong_dan}`
            }
            alt={infoImg?.duong_dan}
            className='rounded-s-3xl w-full'
          />
          <div className='flex flex-col justify-between'>
            <div className='flex flex-col space-y-8 p-8'>
              <div className='flex justify-between items-center sticky top-0 bg-white z-10'>
                <div className='text-2xl font-bold'>
                  <i className='fa-solid fa-arrow-up-from-bracket'></i>
                  <i className='fa-solid fa-ellipsis ml-6'></i>
                </div>
                <div className='flex space-x-3 items-center font-semibold'>
                  <p>
                    Hồ sơ <i className='fa-solid fa-chevron-down text-xs'></i>
                  </p>
                  <button
                    className={`text-white px-4 py-3 rounded-3xl duration-300 font-semibold ${
                      !isSaved ? `bg-red-600 hover:bg-red-800` : `bg-black`
                    }`}>
                    {isSaved ? <p>Đã lưu</p> : <p>Lưu</p>}
                  </button>
                </div>
              </div>
              <div>
                <h1 className='text-2xl font-semibold'>{infoImg?.ten_hinh}</h1>
              </div>
              <div className='flex items-center justify-between '>
                <div className='flex items-center justify-between'>
                  <img
                    src={infoImg?.nguoi_dung.anh_dai_dien}
                    alt='avatar'
                    className='rounded-full w-10 h-10 mr-3'
                  />
                  <p>{infoImg?.nguoi_dung.ho_ten}</p>
                </div>
                <button className='px-4 py-3 font-semibold bg-slate-100 hover:bg-slate-200 duration-300 rounded-3xl'>
                  Theo dõi
                </button>
              </div>
              <ListComment comment={comment} />
            </div>
            <div className='bg-white border-t-2 border-gray-100 p-8 sticky bottom-0 rounded-ee-3xl'>
              <p className='text-xl font-semibold'>{comment?.length} Nhận xét</p>
              <div className='flex space-x-3 mt-4'>
                <img
                  src='https://i.pinimg.com/736x/c1/7d/fd/c17dfd78bd446e3da742212566411f95.jpg'
                  alt='...'
                  className='rounded-full w-10 h-10 '
                />
                <form onSubmit={postComment} className='flex items-center w-full'>
                  <Input
                    onChange={(e) => setValue(e.target.value)}
                    value={value}
                    placeholder='Thêm nhận xét'
                  />
                  <button type='submit' className='ml-2'>
                    <i className='fa-solid fa-paper-plane'></i>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className='my-8 text-center font-semibold text-2xl'>Thêm nội dung để khám phá</h1>
      <div className='columns-5'>
        {listImg &&
          listImg.map((item: ImgProp, index: number) => {
            return (
              <NavLink to={`/info-img/${item.hinh_id}`} key={index}>
                <img
                  loading='lazy'
                  src={
                    item.duong_dan.includes(".com")
                      ? item.duong_dan
                      : `${BASE_URL_IMG}/${item.duong_dan}`
                  }
                  alt={item.ten_hinh}
                  className='p-2 w-full rounded-2xl'
                />
              </NavLink>
            );
          })}
      </div>
    </div>
  );
};
