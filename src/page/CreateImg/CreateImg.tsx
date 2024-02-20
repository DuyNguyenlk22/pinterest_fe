import React, { useState } from "react";
import { Button, Form, Image, Input, message } from "antd";
import { uploadImg } from "../../services/api";

type FieldType = {
  ten_hinh: string;
  mo_ta?: string;
  duong_dan: string;
};

export const CreateImg: React.FC = () => {
  const [selectedImg, setSelectedImg] = useState<any>(null);
  const [imgSrc, setImgSrc] = useState<string>();
  const [form] = Form.useForm();

  const handleChangeFile = (e: any) => {
    let file = e.target.files[0];
    setSelectedImg(file);
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (e: any) => {
      setImgSrc(e.target.result);
    };
  };
  const onFinish = async (values: any) => {
    const formData = new FormData();
    for (let key in values) {
      if (key !== "duong_dan") {
        formData.append(key, values[key]);
      }
    }
    if (selectedImg) {
      formData.append("duong_dan", selectedImg, selectedImg.name);
    }
    try {
      let res = await uploadImg(formData);
      message.success(res.data.message);
      setSelectedImg(null);
      setImgSrc("");
      form.resetFields();
    } catch (error: any) {
      message.error(error.data.message);
    }
  };
  return (
    <section id='createImg'>
      <Form form={form} name='basic' onFinish={onFinish} autoComplete='off'>
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
        <div className='my-32'>
          <div className='containerInfo flex justify-center lg:justify-between items-center flex-wrap lg:flex-nowrap'>
            <Form.Item<FieldType> name='duong_dan' className='w-full lg:w-1/2'>
              <input type='file' accept='image/*' required onChange={handleChangeFile} />
              {selectedImg ? (
                <Image preview={false} src={imgSrc} width={380} height={420} className='rounded-3xl' />
              ) : (
                <div className='upload__img w-full h-[250px] lg:w-[380px] lg:h-[420px] flex flex-col justify-between items-center px-4 space-y-7 rounded-3xl bg-[#E9E9E9]'>
                  <div></div>
                  <div className='text-center'>
                    <i className='fa-solid fa-circle-up text-4xl'></i>
                  </div>
                  <div>
                    <p className='text-center'>Bạn nên sử dụng tập tin .jpg chất lượng cao có kích thước dưới 10MB</p>
                  </div>
                </div>
              )}
            </Form.Item>

            <div className='w-full lg:w-1/2'>
              <Form.Item<FieldType> label='Tiêu đề' name='ten_hinh'>
                <Input />
              </Form.Item>

              <Form.Item<FieldType> label='Mô tả' name='mo_ta'>
                <Input.TextArea />
              </Form.Item>
            </div>
          </div>
        </div>
      </Form>
    </section>
  );
};
