import { Button, Form, Input, message } from "antd";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import React from "react";
import "./style.css";
import { FirebaseLoginService } from "../../firebase";
const LoginForm: React.FC = () => {
  const [form] = Form.useForm();
  const auth = getAuth();
  const firebase = new FirebaseLoginService();

  const onFinish = async () => {
    const values = await form.validateFields();
    await signInWithEmailAndPassword(auth, values?.email, values?.password)
      .then((userCredential) => {
        const user = userCredential?.user;
        console.log(user, "usercredential");
      })
      .catch((error) => {
        console.error("login failed", error);
      });
  };

  return (
    <Form
      className="login-form"
      layout="vertical"
      form={form}
      name="login-form"
      onFinish={onFinish}
    >
      <Form.Item
        name="email"
        label="Email"
        rules={[
          {
            required: true,
            message: "Enter your Email",
          },
          {
            type: "email",
            message: "Enter a Valid E-mail",
          },
        ]}
      >
        <Input placeholder="Enter Email" />
      </Form.Item>
      <Form.Item
        name="password"
        label={
          <div>
            <span>Password</span>
          </div>
        }
        rules={[
          {
            required: true,
            message: "Enter your Password",
          },
        ]}
      >
        <Input.Password placeholder="Enter Password" />
      </Form.Item>
      <Button type="primary" htmlType="submit" block>
        Sign In
      </Button>
    </Form>
  );
};

export default LoginForm;
