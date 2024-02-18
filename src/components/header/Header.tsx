import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, ConfigProvider, Dropdown, Input, Tooltip } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getImgSearch } from "../../redux/slice/searchImgSlice";
import { localService } from "../../services/localService";
import type { MenuProps } from "antd";

export const Header: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  let { infoUser } = useSelector((state: any) => state.userSlice);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    dispatch(getImgSearch(e.target.value));
  };
  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <p>Đang đăng nhập</p>
          <div className='flex items-center mt-3'>
            <div className='w-8 h-8 rounded-full mr-3'>
              <Avatar size={30} icon={<UserOutlined />} />
            </div>
            <div>
              <p>{infoUser?.ho_ten}</p>
              <p>Cá nhân</p>
              <p>{infoUser?.email}</p>
            </div>
            <div>
              <i className='fa-solid fa-check'></i>
            </div>
          </div>
        </div>
      ),
      key: "0",
    },
    {
      label: (
        <button
          className='text-semibold'
          onClick={() => {
            localService.remove();
            window.location.reload();
            setTimeout(() => {
              navigate("/auth/login");
            }, 1500);
          }}>
          Đăng xuất
        </button>
      ),
      key: "1",
    },
  ];

  return (
    <div className='py-2 px-4 sticky top-0 left-0 right-0 z-[100] bg-white '>
      <div className=' flex items-center h-14 space-x-3'>
        <NavLink to={"/"}>
          <img src='/img/icons-pinterest.png' alt='logo' className='w-[30px] h-[30px]' />
        </NavLink>
        <NavLink to={"/"}>
          <div className='bg-black text-white font-bold p-3 rounded-3xl'>Trang chủ</div>
        </NavLink>
        <div className='font-semibold'>
          <NavLink to={"/createImg"}>Tạo</NavLink>
        </div>
        <div className='min-w-[407px] flex-auto'>
          <ConfigProvider
            theme={{
              token: {
                colorBgContainer: "#E1E1E1",
              },
            }}>
            <Input size='large' placeholder='Tìm kiếm' prefix={<SearchOutlined />} onChange={handleChange} />
          </ConfigProvider>
        </div>
        <div className='flex items-center space-x-4 w-[10rem] justify-end text-[#5F5F5F]'>
          <i className='fa-solid fa-bell w-6 text-2xl '></i>
          <i className='fa-solid fa-comment-dots w-6 text-2xl'></i>
          <NavLink to={"/personal"}>
            <Avatar size={30} icon={<UserOutlined />} />
          </NavLink>
          <button>
            <Tooltip placement='bottom' title={<p>Tài khoản và các tuỳ chọn khác</p>}>
              <Dropdown menu={{ items }} trigger={["click"]}>
                <a onClick={(e) => e.preventDefault()}>
                  <DownOutlined />
                </a>
              </Dropdown>
            </Tooltip>
          </button>
        </div>
      </div>
    </div>
  );
};
