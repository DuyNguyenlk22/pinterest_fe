import React from "react";
import { NavLink } from "react-router-dom";
import { Avatar, ConfigProvider, Input } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch } from "react-redux";
import { getImgSearch } from "../../redux/slice/searchImgSlice";

export const Header: React.FC = () => {
  const dispatch = useDispatch<any>();
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(getImgSearch(e.target.value));
  };

  return (
    <div className='py-2 px-4'>
      <div className=' flex items-center h-14 space-x-3'>
        <NavLink to={"/"}>
          <img src='/img/icons-pinterest.png' alt='logo' className='w-[30px] h-[30px]' />
        </NavLink>
        <div className='bg-black text-white font-bold p-3 rounded-3xl'>
          <NavLink to={"/"}>Trang chủ</NavLink>
        </div>
        <div className='font-semibold'>
          <NavLink to={"/"}>Tạo</NavLink>
        </div>
        <div className='min-w-[407px] flex-auto'>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#E1E1E1",
              },
            }}>
            <Input
              size='large'
              placeholder='Tìm kiếm'
              prefix={<SearchOutlined />}
              onChange={handleChange}
            />
          </ConfigProvider>
        </div>
        <div className='flex items-center space-x-4 w-[10rem] justify-end text-[#5F5F5F]'>
          <i className='fa-solid fa-bell w-6 text-2xl '></i>
          <i className='fa-solid fa-comment-dots w-6 text-2xl'></i>
          <Avatar size={30} icon={<UserOutlined />} />
          <button>
            <DownOutlined />
          </button>
        </div>
      </div>
    </div>
  );
};
