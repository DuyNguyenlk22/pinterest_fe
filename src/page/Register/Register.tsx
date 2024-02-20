import { useNavigate, NavLink } from "react-router-dom";
import { Button, Form, Input, message } from "antd";
import { register } from "../../services/api";
import React from "react";

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};
type FieldType = {
  email: string;
  mat_khau: string;
  ho_ten: string;
  tuoi: number;
};

export const Register: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onFinish = (values: any) => {
    let handleRegister = async () => {
      let newData = { ...values, tuoi: Number(values.tuoi) };
      try {
        await register(newData);
        message.success("Đăng ký thành công");
        setTimeout(() => {
          navigate("/auth/login");
        }, 1500);
      } catch (error: any) {
        message.error("Đăng ký thất bại");
        throw new Error(`${error.message}`);
      }
    };
    handleRegister();
  };

  return (
    <section className='register flex items-center justify-center h-screen'>
      <div className='overlay fixed top-0 left-0 bottom-0 right-0 h-full w-full bg-[#00000080] z-[-1]'></div>
      <div className='flex flex-col items-center justify-center space-y-4 bg-white rounded-3xl shadow-2xl p-5 w-[95%] md:w-[75%] lg:w-[30%]'>
        <img src='../../../public/img/icons-pinterest.png' alt='logo' className='w-1/5' />
        <div className='text-center'>
          <h1 className='text-[32px] font-semibold text-[#333333]'>Welcome to Pinterest</h1>
          <p>Find new ideas to try</p>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
          labelAlign='left'>
          <Form.Item<FieldType>
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

          <Form.Item<FieldType>
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

          <Form.Item<FieldType>
            name='ho_ten'
            label='Nickname'
            rules={[{ required: true, message: "Please input your nickname!", whitespace: true }]}>
            <Input placeholder='Create a nickname' />
          </Form.Item>

          <Form.Item<FieldType>
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
              Continue
            </Button>
          </Form.Item>
          <div className='text-center'>
            <p>
              If you already have an account, click{" "}
              <NavLink className='text-blue-400 hover:text-blue-600' to={"/auth/login"}>
                HERE
              </NavLink>
            </p>
          </div>
        </Form>
      </div>
    </section>
  );
};
