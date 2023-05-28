/* eslint-disable react/prop-types */

import React, { useContext, useMemo } from "react";
import { PetsContext, UserContext } from "../../../App";
import { FilterRow } from "../styles";
import { Button, Input } from "antd";
import { SearchOutlined, RedoOutlined } from "@ant-design/icons";

const defaultValue = {
  name: "",
  age: 0,
  location: "",
  breed: "",
  image: "",
};

export default function Filter({ handleChangeFilter, filter, setFilter }) {
  const { getPets } = useContext(PetsContext);
  const { user } = useContext(UserContext);

  const token = useMemo(() => user?.token, [user]);

  return (
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

      <Button
        onClick={() => {
          setFilter(defaultValue);
          getPets(token, defaultValue);
        }}
        icon={<RedoOutlined />}
      >
        Reset
      </Button>
      <Button
        icon={<SearchOutlined />}
        type="primary"
        onClick={() => getPets(token, filter)}
      >
        Search
      </Button>
    </FilterRow>
  );
}
