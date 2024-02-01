import React from "react";
import { Button, Form, Input, message } from "antd";
import { useNavigate } from "react-router-dom";
import { login } from "../../services/api";
import { localService } from "../../services/localService";
import { useDispatch } from "react-redux";
import { setInfo } from "../../redux/slice/userSlice";
const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

export const Login: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const onFinish = (values: any) => {
    let handleLogin = async () => {
      try {
        let res = await login(values);
        message.success("Đăng nhập thành công");
        localService.set(res.data.content);
        dispatch(setInfo(res.data.content));
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } catch (error) {
        console.log("😐 ~ handleLogin ~ error:👉", error);
      }
    };
    handleLogin();
  };
  return (
    <section className='register flex items-center justify-center h-screen'>
      <div className='overlay fixed top-0 left-0 bottom-0 right-0 h-screen w-screen bg-[#00000080] z-[-1]'></div>
      <div className='flex flex-col items-center space-y-4 bg-white rounded-3xl shadow-2xl p-5 w-[30%]'>
        <img src='../../../public/img/icons-pinterest.png' alt='logo' className='w-10' />
        <div className='text-center'>
          <h1 className='text-[32px] font-semibold text-[#333333]'>Welcome to Pinterest</h1>
        </div>
        <Form
          {...formItemLayout}
          form={form}
          name='register'
          onFinish={onFinish}
          style={{ maxWidth: 600 }}
          scrollToFirstError
          labelAlign='left'>
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

          <Form.Item>
            <Button
              htmlType='submit'
              type='default'
              style={{
                border: "none",
                color: "white",
              }}
              className='w-full border-none bg-red-500 hover:bg-red-700 duration-300 text-white font-semibold'>
              Log In
            </Button>
          </Form.Item>
        </Form>
      </div>
    </section>
  );
};
