import React, { useEffect, useContext, useState, useMemo } from "react";
import { PetsContext, UserContext } from "../../App";
import { Container } from "./styles";
import { Button } from "antd";
import { FileAddOutlined } from "@ant-design/icons";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import ToastMessageHandler from "../../components/ToastMessage";
import EditAndAddModal from "./containers/EditAndAddModal";
import Filter from "./containers/Filter";
import Pets from "./containers/Pets";

const defaultValue = {
  name: "",
  age: 0,
  location: "",
  breed: "",
  image: "",
};

export default function HomePage() {
  const { getPets, createPet, editPet, deletePet } = useContext(PetsContext);
  const { user, getFavorite, addFavourite, deleteFavourite } =
    useContext(UserContext);

  const methods = useForm({
    defaultValues: defaultValue,
    resolver: yupResolver(
      yup.object().shape({
        name: yup.string().required("Required"),
        age: yup.string().required("Required"),
        location: yup.string().required("Required"),
        breed: yup.string().required("Required"),
      })
    ),
  });
  const { setValue, reset } = methods;

  const [filter, setFilter] = useState(defaultValue);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selected, setSelected] = useState(null);

  const token = useMemo(() => user?.token, [user]);
  const userId = useMemo(() => user?.userData?.userId, [user]);
  const role = useMemo(
    () => (user?.userData?.roles ? user?.userData?.roles[0] : undefined),
    [user]
  );

  function handleChangeFilter(key, input) {
    const value = input.target.value;
    setFilter({ ...filter, [key]: value });
  }

  async function handleDelete(id) {
    try {
      await deletePet(id, token);
      await getPets();
      ToastMessageHandler("Deleted", "success");
    } catch (error) {
      ToastMessageHandler(error?.message, "error");
    }
  }

  async function handleCreate(data) {
    try {
      await createPet(data, token);
      await getPets();
      ToastMessageHandler("Added", "success");
      setIsModalOpen(false);
    } catch (error) {
      ToastMessageHandler(error?.message, "error");
    }
  }

  async function handleEdit(data) {
    try {
      await editPet({ ...data, id: selected.id }, token);
      await getPets();

      ToastMessageHandler("Updated", "success");
      setIsModalOpen(false);
    } catch (error) {
      ToastMessageHandler(error?.message, "error");
    }
  }

  const handleFavoriteClick = async (id, isFavorite) => {
    try {
      if (isFavorite) {
        await deleteFavourite(id);
      } else {
        await addFavourite({ userId: userId, petId: id });
      }

      await getFavorite(userId);
      ToastMessageHandler(isFavorite ? "Deleted" : "Added", "success");
    } catch (error) {
      ToastMessageHandler(error?.message, "error");
    }
  };

  async function onSubmit(data) {
    if (selected) {
      handleEdit(data);
      return;
    }
    handleCreate(data);
  }

  function handleEditButtonClick(pet) {
    setIsModalOpen(true);
    setSelected(pet);
    Object.entries(pet).forEach(([key, value]) => {
      setValue(key, value);
    });
  }

  useEffect(() => {
    getPets();
    if (userId) {
      getFavorite(userId);
    }
  }, [userId]);

  return (
    <Container>
      <Filter
        handleChangeFilter={handleChangeFilter}
        filter={filter}
        setFilter={setFilter}
      />

      {token && role === "admin" && (
        <Button
          icon={<FileAddOutlined />}
          type="primary"
          onClick={() => {
            reset({ name: "", age: 0, location: "", breed: "" });
            setIsModalOpen(true);
          }}
        >
          Add
        </Button>
      )}

      <Pets
        handleFavoriteClick={handleFavoriteClick}
        handleEditButtonClick={handleEditButtonClick}
        handleDelete={handleDelete}
      />

      <EditAndAddModal
        selected={selected}
        isModalOpen={isModalOpen}
        onSubmit={onSubmit}
        setIsModalOpen={setIsModalOpen}
        setSelected={setSelected}
        methods={methods}
      />
    </Container>
  );
}
