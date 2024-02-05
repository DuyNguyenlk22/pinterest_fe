import { UserOutlined } from "@ant-design/icons";
import { Avatar, ConfigProvider, Tabs } from "antd";
import React, { useEffect, useState } from "react";
import { infoUser } from "../../services/api";
import { UserProps } from "../../model/userInterface";
import type { TabsProps } from "antd";
import { NavLink } from "react-router-dom";
import { BASE_URL_IMG } from "../../services/config";

export const InfoUser: React.FC = () => {
  let [info, setInfo] = useState<UserProps | null>(null);

  useEffect(() => {
    let getInfo = async () => {
      try {
        let res = await infoUser();
        setInfo(res.data.content);
      } catch (error) {
        console.log("😐 ~ getInfo ~ error:👉", error);
      }
    };
    getInfo();
  }, []);

  const handleRenderImgSaved = () => {
    if (info?.luu_anh) {
      return info?.luu_anh.map((item, index) => {
        return (
          <NavLink key={index} to={`/info-img/${item.hinh_id}`}>
            <img
              src={
                item.hinh_anh.duong_dan.includes(".com")
                  ? `${item.hinh_anh.duong_dan}`
                  : `${BASE_URL_IMG}/${item.hinh_anh.duong_dan}`
              }
              alt={item.hinh_anh.mo_ta}
              className='w-full rounded-xl'
            />
          </NavLink>
        );
      });
    } else {
      return (
        <div className='text-center mt-10'>
          <h3>Bạn chưa lưu Ghim nào</h3>
          <NavLink to={"/"}>
            <p className='mt-4 p-2 bg-gray-200 hover:bg-gray-300 hover:text-black font-semibold duration-300 rounded-3xl'>
              Tìm ý tưởng
            </p>
          </NavLink>
        </div>
      );
    }
  };

  const handleRenderImgCreated = () => {
    if (info?.hinh_anh) {
      return info?.hinh_anh.map((item, index) => {
        return (
          <NavLink key={index} to={`/info-img/${item.hinh_id}`}>
            <img
              src={
                item.duong_dan.includes(".com")
                  ? `${item.duong_dan}`
                  : `${BASE_URL_IMG}/${item.duong_dan}`
              }
              alt={item.mo_ta}
              className='w-full rounded-xl'
            />
          </NavLink>
        );
      });
    } else {
      return (
        <div className='text-center mt-10'>
          <h3>Chưa có gì để hiển thị! Ghim bạn tạo sẽ xuất hiện ở đây.</h3>
          <NavLink to={"/createImg"}>
            <p className='mt-4 py-2 px-3 inline-block bg-red-500 hover:bg-red-600 text-white hover:text-white font-semibold duration-300 rounded-3xl'>
              Tạo ghim
            </p>
          </NavLink>
        </div>
      );
    }
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: <p className='text-black font-semibold'>Đã tạo</p>,
      children: <div className='grid grid-cols-5 gap-4'>{handleRenderImgCreated()}</div>,
    },
    {
      key: "2",
      label: <p className='text-black font-semibold'>Đã lưu</p>,
      children: <div className='grid grid-cols-5 gap-4 '>{handleRenderImgSaved()}</div>,
    },
  ];

  return (
    <>
      <div className='flex flex-col items-center justify-center space-y-4'>
        <Avatar size={120} icon={<UserOutlined />} />
        <h1 className='text-[36px]'>{info?.ho_ten}</h1>
        <p>
          <i className='fa-brands fa-pinterest mr-2'></i>
          {info?.ho_ten}
        </p>
        <div>
          <button className='py-3 px-4 font-semibold bg-gray-200 hover:bg-gray-300 rounded-2xl duration-300 mr-5'>
            Chia sẻ
          </button>
          <NavLink
            to={"/settings"}
            className='py-3 px-4 font-semibold bg-gray-200 hover:bg-gray-300 rounded-2xl duration-300'>
            Chỉnh sửa hồ sơ
          </NavLink>
        </div>
      </div>
      <div className='mt-10 flex justify-center mb-24'>
        <ConfigProvider
          theme={{
            components: {
              Tabs: {
                inkBarColor: "#111111",
              },
            },
          }}>
          <Tabs centered defaultActiveKey='2' items={items} />
        </ConfigProvider>
      </div>
    </>
  );
};
