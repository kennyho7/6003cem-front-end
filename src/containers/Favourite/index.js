import React, { useEffect, useContext, useState } from "react";
import { PetsContext, UserContext } from "../../App";
import { Container, PetsCard, PetsRow, ButtonRow } from "./styles";
import { Button } from "antd";
import { HeartOutlined } from "@ant-design/icons";

export default function FavouritePage() {
  const { pets = [], getPets } = useContext(PetsContext);
  const { user } = useContext(UserContext);

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Container>
      <PetsRow>
        {pets.map((pet) => {
          return (
            <PetsCard key={pet.id}>
              <p>name : {pet?.name}</p>
              <p>age : {pet?.age}</p>
              <p>location : {pet?.location}</p>
              <p>breed : {pet?.breed}</p>
              <ButtonRow>
                <Button icon={<HeartOutlined />} />
              </ButtonRow>
            </PetsCard>
          );
        })}
      </PetsRow>
    </Container>
  );
}
