import React from "react";
import { Button, Form, Input } from "antd";
import Dragger from "antd/es/upload/Dragger";

const onFinish = (values: any) => {
  console.log("Success:", values);
};

type FieldType = {
  ten_hinh?: string;
  mo_ta?: string;
  duong_dan?: string;
};

export const CreateImg: React.FC = () => {
  return (
    <div>
      <Form name='basic' onFinish={onFinish} autoComplete='off'>
        <div className='flex justify-between sticky top-[4.5rem] left-0 right-0 bg-white p-8 border-gray-300 border-2 z-50'>
          <h1 className='font-semibold text-[20px]'>Tạo Ghim</h1>
          <Form.Item style={{ marginBottom: "0px" }}>
            <Button
              htmlType='submit'
              type='default'
              className='bg-red-500 hover:bg-red-600 hover:text-white font-semibold text-white rounded-3xl'>
              Đăng
            </Button>
          </Form.Item>
        </div>
        <div className='my-32 '>
          <div className='containerInfo flex justify-between items-center'>
            <Dragger>
              <div className='upload__img w-[380px] h-[420px] flex flex-col justify-between items-center px-4 space-y-7 rounded-3xl bg-[#E9E9E9]'>
                <div></div>
                <div className='text-center'>
                  <i className='fa-solid fa-circle-up text-3xl'></i>
                  <p>Chọn 1 tệp hoặc kéo và thả 1 tệp ở đây</p>
                </div>
                <div>
                  <p className='text-center'>
                    Bạn nên sử dụng tập tin .jpg chất lượng cao có kích thước dưới 10MB
                  </p>
                </div>
              </div>
            </Dragger>
            <div className='w-1/2'>
              <Form.Item<FieldType> label='Tiêu đề' name='ten_hinh'>
                <Input />
              </Form.Item>

              <Form.Item<FieldType> label='Mô tả' name='mo_ta'>
                <Input.TextArea />
              </Form.Item>
              <Form.Item<FieldType> label='Liên kết' name='duong_dan'>
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </div>
  );
};
