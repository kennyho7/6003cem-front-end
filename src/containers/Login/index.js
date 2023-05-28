import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Button, Input } from "antd";
import { Form, Container, Card, Title } from "./styles";
import { UserOutlined, LockOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import ToastMessageHandler from "../../components/ToastMessage";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const [isLoading, setIsLoading] = useState(false);

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
      setIsLoading(true);
      await login(data);
      ToastMessageHandler("Welcome!", "success");
      navigate("/");
    } catch (error) {
      ToastMessageHandler("Incorrect username or password", "error");
    } finally {
      setIsLoading(false);
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

          <Button
            style={{ marginTop: 20 }}
            loading={isLoading}
            htmlType="submit"
            type="primary"
          >
            Login
          </Button>
        </Card>
      </Container>
    </Form>
  );
}
