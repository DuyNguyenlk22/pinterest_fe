import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Avatar, ConfigProvider, Dropdown, Input, Tooltip } from "antd";
import { UserOutlined, DownOutlined, SearchOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { getImgSearch } from "../../redux/slice/searchImgSlice";
import { localService } from "../../services/localService";
import type { MenuProps } from "antd";
import { URL_IMG_AVA } from "../../services/config";

export const Header: React.FC = () => {
  const dispatch = useDispatch<any>();
  const navigate = useNavigate();
  const [isMobileWidth, setIsMobileWidth] = useState(window.innerWidth > 992);
  let { infoUser } = useSelector((state: any) => state.userSlice);
  const handleChange: React.ChangeEventHandler<HTMLInputElement> = (e) => {
    navigate("/");
    dispatch(getImgSearch(e.target.value));
  };
  useEffect(() => {
    const handleResize = () => {
      setIsMobileWidth(window.innerWidth > 992);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const items: MenuProps["items"] = [
    {
      label: (
        <div>
          <p>Đang đăng nhập</p>
          <div className='flex items-center mt-3'>
            <div className='w-8 h-8 rounded-full mr-3'>
              {infoUser.anh_dai_dien ? (
                <img src={`${URL_IMG_AVA}/${infoUser.anh_dai_dien}`} alt='avatar' className='w-8 h-8 rounded-full' />
              ) : (
                <Avatar size={30} icon={<UserOutlined />} />
              )}
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
          className='text-semibold w-full'
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
      <div>
        {isMobileWidth ? (
          <div className='flex items-center h-14 space-x-3'>
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
                {infoUser.anh_dai_dien ? (
                  <img src={`${URL_IMG_AVA}/${infoUser.anh_dai_dien}`} alt='avatar' className='w-8 h-8 rounded-full' />
                ) : (
                  <Avatar size={30} icon={<UserOutlined />} />
                )}
              </NavLink>
              <button>
                <Tooltip placement='bottom' fresh={true}>
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <a onClick={(e) => e.preventDefault()}>
                      <DownOutlined />
                    </a>
                  </Dropdown>
                </Tooltip>
              </button>
            </div>
          </div>
        ) : (
          <div className='flex justify-between items-center h-14'>
            <NavLink to={"/"}>
              <img src='/img/icons-pinterest.png' alt='logo' className='w-[30px] h-[30px]' />
            </NavLink>
            <div className='min-w-[80px] flex-auto ml-3'>
              <ConfigProvider
                theme={{
                  token: {
                    colorBgContainer: "#E1E1E1",
                  },
                }}>
                <Input size='middle' placeholder='Tìm kiếm' prefix={<SearchOutlined />} onChange={handleChange} />
              </ConfigProvider>
            </div>
            <div className='flex items-center space-x-4 w-[10rem] justify-end text-[#5F5F5F]'>
              <i className='fa-solid fa-bell w-6 text-2xl '></i>
              <i className='fa-solid fa-comment-dots w-6 text-2xl'></i>
              <NavLink to={"/personal"}>
                {infoUser.anh_dai_dien ? (
                  <img src={`${URL_IMG_AVA}/${infoUser.anh_dai_dien}`} alt='avatar' className='w-8 h-8 rounded-full' />
                ) : (
                  <Avatar size={30} icon={<UserOutlined />} />
                )}
              </NavLink>
              <button>
                <Tooltip placement='bottom' title={<p>Tài khoản và các tuỳ chọn khác</p>}>
                  <Dropdown menu={{ items }} trigger={["click"]}>
                    <button onClick={(e) => e.preventDefault()}>
                      <DownOutlined />
                    </button>
                  </Dropdown>
                </Tooltip>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
