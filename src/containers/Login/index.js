import React, { useContext } from "react";
import { UserContext } from "../../App";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input } from "antd";
import { Form, Container, Card, Title, LoginButton } from "./styles";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ToastMessageHandler from "../../components/ToastMessage";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required("Required"),
        password: yup.string().required("Required"),
      })
    ),
  });

  async function onSubmit(data) {
    try {
      await login(data);
      ToastMessageHandler("Welcome!", "success");
      navigate("/");
    } catch (error) {
      ToastMessageHandler("Incorrect username or password", "error");
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Card>
          <Title>Welcome</Title>

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="User name"
                prefix={<UserOutlined />}
                status={errors.username ? "error" : ""}
              />
            )}
          />

          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="password"
                placeholder="Password"
                prefix={<LockOutlined />}
                status={errors.password ? "error" : ""}
              />
            )}
          />

          <LoginButton type="submit">Login</LoginButton>
        </Card>
      </Container>
    </Form>
  );
}
