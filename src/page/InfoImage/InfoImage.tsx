import React, { useEffect, useState } from "react";
import { useParams, NavLink } from "react-router-dom";
import { getDetailImg } from "../../services/api";
import { imgProp } from "../../model/imageInterface";
import type { CollapseProps } from "antd";
import { Collapse, ConfigProvider, Input } from "antd";
import { useSelector } from "react-redux";

const text = `
  A dog is a type of domesticated animal.
  Known for its loyalty and faithfulness,
  it can be found as a welcome guest in many households across the world.
`;

const items: CollapseProps["items"] = [
  {
    key: "1",
    label: "This is panel header 1",
    children: (
      <>
        <p>{text}</p>
        <p>{text}</p>
        <p>{text}</p>
      </>
    ),
  },
];

export const InfoImage: React.FC = () => {
  const { id } = useParams<string>();
  const [infoImg, setInfoImg] = useState<imgProp | null>(null);
  const { listImg } = useSelector((state: any) => state.listImgSlice);
  console.log("😐 ~ infoImg:👉", infoImg);

  useEffect(() => {
    let getInfoImg = async () => {
      try {
        let res = await getDetailImg(id);
        setInfoImg(res.data.content);
      } catch (error: any) {
        throw new Error(`${error.message}`);
      }
    };
    getInfoImg();
  }, [id]);

  const onChange = (key: string | string[]) => {
    console.log(key);
  };

  return (
    <div className='my-10'>
      <div className='containerInfo max-h-[1200px] rounded-3xl shadow-xl'>
        <div className='grid grid-cols-2'>
          <img
            src='https://i.pinimg.com/736x/c1/7d/fd/c17dfd78bd446e3da742212566411f95.jpg'
            alt='img'
            className='rounded-s-3xl'
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
                  <button className='text-white px-4 py-3 rounded-3xl bg-red-600 hover:bg-red-800 duration-300 font-semibold'>
                    <p>Lưu</p>
                  </button>
                </div>
              </div>
              <div className='flex items-center justify-between '>
                <div className='flex items-center justify-between'>
                  <img
                    src='https://i.pinimg.com/736x/c1/7d/fd/c17dfd78bd446e3da742212566411f95.jpg'
                    alt='...'
                    className='rounded-full w-10 h-10 mr-3'
                  />
                  <p>Tên</p>
                </div>
                <button className='px-4 py-3 font-semibold bg-slate-100 hover:bg-slate-200 duration-300 rounded-3xl'>
                  Theo dõi
                </button>
              </div>
              <div>
                <ConfigProvider
                  theme={{
                    components: {
                      Collapse: {
                        headerPadding: "0px",
                        contentPadding: "0px",
                      },
                    },
                  }}>
                  <Collapse
                    expandIconPosition='end'
                    items={items}
                    ghost
                    onChange={onChange}
                    expandIcon={(e) => {
                      const { isActive } = e;
                      return (
                        <span>
                          {isActive ? (
                            <i className='angle fa-solid fa-angle-up font-bold text-xl'></i>
                          ) : (
                            <i className='angle fa-solid fa-angle-down font-bold text-xl'></i>
                          )}
                        </span>
                      );
                    }}
                  />
                </ConfigProvider>
              </div>
            </div>
            <div className='bg-white border-t-2 border-gray-100 p-8 sticky bottom-0 rounded-ee-3xl'>
              <p className='text-xl font-semibold'>4 Nhận xét</p>
              <div className='flex space-x-3 mt-4'>
                <img
                  src='https://i.pinimg.com/736x/c1/7d/fd/c17dfd78bd446e3da742212566411f95.jpg'
                  alt='...'
                  className='rounded-full w-10 h-10 '
                />
                <Input placeholder='Thêm nhận xét' suffix={<span className='text-xl'>😀</span>} />
              </div>
            </div>
          </div>
        </div>
      </div>
      <h1 className='my-8 text-center font-semibold text-2xl'>Thêm nội dung để khám phá</h1>
      <div className='columns-5'>
        {listImg?.map((item: imgProp) => {
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
    </div>
  );
};
