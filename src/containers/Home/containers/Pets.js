/* eslint-disable react/prop-types */

import React, { useContext, useMemo } from "react";
import { PetsContext, UserContext } from "../../../App";
import { PetsCard, PetsRow, ButtonRow } from "../styles";
import { Button, Modal } from "antd";
import { HeartOutlined, EditOutlined, DeleteOutlined } from "@ant-design/icons";

export default function Pets({
  handleFavoriteClick,
  handleEditButtonClick,
  handleDelete,
}) {
  const { pets = [] } = useContext(PetsContext);
  const { favorite, user } = useContext(UserContext);

  const token = useMemo(() => user?.token, [user]);
  const role = useMemo(
    () => (user?.userData?.roles ? user?.userData?.roles[0] : undefined),
    [user]
  );

  return (
    <PetsRow>
      {pets.map((pet) => {
        const isFavorite = favorite.find((fav) => fav.petId === pet.id);
        const imageUrl = pet.image
          ? pet.image.replace(".", `${process.env.REACT_APP_HOST}`)
          : "";
        return (
          <PetsCard key={pet.id}>
            {imageUrl && (
              <img src={imageUrl} style={{ width: 200, height: "auto" }}></img>
            )}
            <p>name : {pet?.name}</p>
            <p>age : {pet?.age}</p>
            <p>location : {pet?.location}</p>
            <p>breed : {pet?.breed}</p>
            {token && (
              <ButtonRow>
                <Button
                  icon={
                    <HeartOutlined
                      style={{ color: isFavorite ? "red" : "#000" }}
                    />
                  }
                  onClick={() => {
                    handleFavoriteClick(pet.id, isFavorite);
                  }}
                />
                {role === "admin" && (
                  <Button
                    icon={<EditOutlined />}
                    onClick={() => {
                      handleEditButtonClick(pet);
                    }}
                  ></Button>
                )}
                {role === "admin" && (
                  <Button
                    icon={<DeleteOutlined />}
                    onClick={() => {
                      Modal.warning({
                        title: "Are you sure to delete this pet?",
                        okText: "DELETE",
                        onOk: () => {
                          handleDelete(pet.id, token);
                        },
                      });
                    }}
                  ></Button>
                )}
              </ButtonRow>
            )}
          </PetsCard>
        );
      })}
    </PetsRow>
  );
}
