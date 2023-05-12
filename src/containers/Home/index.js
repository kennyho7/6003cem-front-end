import React, { useEffect, useContext, useState } from "react";
import { PetsContext, UserContext } from "../../App";
import {
  Container,
  PetsCard,
  FilterRow,
  PetsRow,
  SearchButton,
  ResetButton,
} from "./styles";
import { Input } from "antd";

const defaultValue = {
  breed: undefined,
  age: undefined,
  minAge: undefined,
  maxAge: undefined,
};

export default function HomePage() {
  const { pets = [], getPets } = useContext(PetsContext);
  const { user } = useContext(UserContext);

  const [filter, setFilter] = useState(defaultValue);

  function handleChangeFilter(key, input) {
    const value = input.target.value;
    setFilter({ ...filter, [key]: value });
  }

  useEffect(() => {
    getPets();
  }, []);

  return (
    <Container>
      <FilterRow>
        <Input
          placeholder="breed"
          value={filter.breed}
          onChange={(e) => handleChangeFilter("breed", e)}
        ></Input>
        <Input
          placeholder="location"
          value={filter.location}
          onChange={(e) => handleChangeFilter("location", e)}
        ></Input>
        <Input
          placeholder="minAge"
          type="number"
          value={filter.minAge}
          onChange={(e) => handleChangeFilter("minAge", e)}
        ></Input>
        <Input
          placeholder="maxAge"
          type="number"
          value={filter.maxAge}
          onChange={(e) => handleChangeFilter("maxAge", e)}
        ></Input>

        <ResetButton
          onClick={() => {
            setFilter(defaultValue);
            getPets(user?.token, defaultValue);
          }}
        >
          Reset
        </ResetButton>
        <SearchButton onClick={() => getPets(user?.token, filter)}>
          Search
        </SearchButton>
      </FilterRow>

      <PetsRow>
        {pets.map((e) => {
          return (
            <PetsCard key={e.id}>
              <p>name : {e?.name}</p>
              <p>age : {e?.age}</p>
              <p>location : {e?.location}</p>
              <p>breed : {e?.breed}</p>
            </PetsCard>
          );
        })}
      </PetsRow>
    </Container>
  );
}
