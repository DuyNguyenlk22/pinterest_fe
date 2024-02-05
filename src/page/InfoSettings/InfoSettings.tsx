import { Button, Input } from "antd";
import React, { useEffect } from "react";
import { Form, Image } from "antd";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const onFinish = (values: any) => {
  console.log("😐 ~ onFinish ~ values:👉", values);
};

export const InfoSettings: React.FC = () => {
  const [form] = Form.useForm();

  // useEffect(() => {
  //   form.setFieldsValue({
  //     email:
  //   })
  //  },[])

  return (
    <div className='flex justify-between'>
      <div className='w-[20%]'>
        <h1>Chỉnh sửa hồ sơ</h1>
        <h1>Quản lý tài khoản</h1>
        <h1>Bảo mật</h1>
      </div>
      <div className='w-[70%]'>
        <h1>Chỉnh sửa hồ sơ</h1>
        <p>
          Hãy giữ riêng tư thông tin cá nhân của bạn. Thông tin bạn thêm vào đây hiển thị cho bất kỳ
          ai có thể xem hồ sơ của bạn.
        </p>
        <div>
          <Form
            {...formItemLayout}
            form={form}
            name='register'
            onFinish={onFinish}
            style={{ maxWidth: 600 }}
            scrollToFirstError
            labelAlign='left'>
            <Form.Item>
              <input type='file' accept='image/*' required />
              <Image preview={false} width={100} height={100} className='rounded-full' />
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
              <Input placeholder='Email' />
            </Form.Item>

            <Form.Item
              name='mat_khau'
              label='Password'
              rules={[
                {
                  required: true,
                  message: "Please input your password!",
                },
              ]}
              hasFeedback>
              <Input.Password placeholder='Create a password' />
            </Form.Item>

            <Form.Item
              name='ho_ten'
              label='Nickname'
              rules={[
                { required: true, message: "Please input your nickname!", whitespace: true },
              ]}>
              <Input placeholder='Create a nickname' />
            </Form.Item>

            <Form.Item
              name='tuoi'
              label='Age'
              rules={[{ required: true, message: "Please input your age!", whitespace: true }]}>
              <Input placeholder='Age' />
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
    </div>
  );
};
