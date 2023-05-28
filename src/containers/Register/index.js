import React, { useContext, useState } from "react";
import { UserContext } from "../../App";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Input, Button } from "antd";
import { Form, Container, Card, Title } from "./styles";
import { useNavigate } from "react-router-dom";
import ToastMessageHandler from "../../components/ToastMessage";

export default function Register() {
  const navigate = useNavigate();
  const { signUp } = useContext(UserContext);

  const [isLoading, setIsLaoding] = useState(false);

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    defaultValues: {
      username: "",
      password: "",
      firstName: "",
      lastName: "",
      role: "user",
    },
    resolver: yupResolver(
      yup.object().shape({
        username: yup.string().required("Required"),
        password: yup.string().required("Required"),
        firstName: yup.string().required("Required"),
        lastName: yup.string().required("Required"),
      })
    ),
  });

  async function onSubmit(data) {
    try {
      setIsLaoding(true);
      await signUp(data);
      ToastMessageHandler("Registration Successful!", "success");
      navigate("/login");
    } catch (error) {
      ToastMessageHandler("Service Error!", "error");
    } finally {
      setIsLaoding(false);
    }
  }

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Container>
        <Card>
          <Title>Registration</Title>

          <Controller
            name="username"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="User Name"
                status={errors.username ? "error" : ""}
              />
            )}
          />

          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="First Name"
                status={errors.firstName ? "error" : ""}
              />
            )}
          />

          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="Last Name"
                status={errors.lastName ? "error" : ""}
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
            Register
          </Button>
        </Card>
      </Container>
    </Form>
  );
}
