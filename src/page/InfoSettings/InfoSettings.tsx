import { URL_IMG_AVA } from "../../services/config";
import React, { useEffect, useState } from "react";
import { UserOutlined } from "@ant-design/icons";
import { updateInfo } from "../../services/api";
import { categories } from "./dataCategories";
import { Avatar, Button, Input } from "antd";
import { Form, Image, message } from "antd";
import { useSelector } from "react-redux";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export const InfoSettings: React.FC = () => {
  let { info } = useSelector((state: any) => state.infoUserSlice);
  const [selectedImg, setSelectedImg] = useState<any>(undefined);
  const [imgSrc, setImgSrc] = useState<string>("");
  const [form] = Form.useForm();

  useEffect(() => {
    form.setFieldsValue({
      email: info?.email,
      ho_ten: info?.ho_ten,
      mat_khau: "",
      tuoi: info?.tuoi,
    });
    // if (imgSrc) {
    setImgSrc(`${URL_IMG_AVA}/${info.anh_dai_dien}`);
    // }
  }, [info, form]);

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
      if (key !== "anh_dai_dien") {
        formData.append(key, values[key]);
        console.log(key, values[key]);
      }
    }
    if (selectedImg) {
      formData.append("anh_dai_dien", selectedImg, selectedImg.name);
    } else {
      formData.append("anh_dai_dien", selectedImg);
    }
    try {
      let res = await updateInfo(formData);
      message.success(res.data.message);
    } catch (error: any) {
      message.error(error.data.message);
    }
  };

  return (
    <div className='flex justify-center md:justify-between mt-10 relative'>
      <div className='w-[12%] ml-8 space-y-6 font-semibold hidden md:block'>
        {categories.map((item, index) => {
          return (
            <h1 key={index} className={index === 0 ? `inline-block border-b-2 border-black` : ""}>
              {item.name}
            </h1>
          );
        })}
      </div>
      <div className='w-[60%]'>
        <h1 className='text-3xl font-semibold'>Chỉnh sửa hồ sơ</h1>
        <p className='my-4'>
          Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào <br /> đây hiển thị cho bất kỳ ai có thể
          xem hồ sơ của bạn.
        </p>
        <div>
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            style={{ maxWidth: 400 }}
            scrollToFirstError
            labelAlign='left'>
            <Form.Item name='anh_dai_dien'>
              <div className='flex items-center space-x-4'>
                <div>
                  {imgSrc ? (
                    <Image preview={false} width={100} height={100} src={imgSrc} className='rounded-full' />
                  ) : (
                    <Avatar size={100} icon={<UserOutlined />} />
                  )}
                </div>
                <div>
                  <label htmlFor='upload-photo'>
                    <span className='px-3 py-2 bg-gray-200 hover:bg-gray-300 rounded-2xl cursor-pointer font-semibold'>
                      Thay đổi
                    </span>
                  </label>
                  <input
                    id='upload-photo'
                    type='file'
                    accept='image/*'
                    onChange={handleChangeFile}
                    className='opacity-0 absolute z-[-1]'
                  />
                </div>
              </div>
            </Form.Item>

            <Form.Item
              name='email'
              label='E-mail'
              rules={[
                {
                  type: "email",
                  message: "The input is not valid E-mail!",
                },
                {
                  required: true,
                  message: "Please input your E-mail!",
                },
              ]}>
              <Input disabled />
            </Form.Item>
            <Form.Item
              name='mat_khau'
              label='Password'
              rules={[
                {
                  message: "Please input your password!",
                },
              ]}
              hasFeedback>
              <Input.Password placeholder='Please input your new password if you want to change' />
            </Form.Item>

            <Form.Item name='ho_ten' label='Nickname' rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item name='tuoi' label='Age' rules={[{ required: true }]}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button
                htmlType='submit'
                type='default'
                style={{
                  border: "none",
                  color: "white",
                }}
                className='w-full border-none bg-red-500 hover:bg-red-700 duration-300 text-white font-semibold'>
                Lưu
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
      <div></div>
    </div>
  );
};
