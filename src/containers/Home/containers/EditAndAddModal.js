/* eslint-disable react/prop-types */

import React, { useState } from "react";
import { Button, Input, Modal, Upload, message } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { Controller } from "react-hook-form";

export default function HomeEditAndAddModalPage({
  selected,
  isModalOpen,
  onSubmit,
  setIsModalOpen,
  setSelected,
  methods,
}) {
  const {
    watch,
    handleSubmit,
    control,
    formState: { errors },
    setValue,
  } = methods;

  const [fileList, setFileList] = useState([]);

  const props = {
    fileList: fileList,
    multiple: false,
    name: "image",
    action: `${process.env.REACT_APP_HOST}/pets/upload`,
    headers: {
      authorization: "authorization-text",
    },
    onChange(info) {
      let newFileList = [...info.fileList];

      newFileList = newFileList.slice(-2);

      newFileList = newFileList.map((file) => {
        if (file.response) {
          const imageUrl = file.response.imagePath
            ? file.response.imagePath.replace(
                ".",
                `${process.env.REACT_APP_HOST}`
              )
            : "";
          file.url = imageUrl;
          file.thumbUrl = imageUrl;
        }
        return file;
      });
      setFileList(newFileList);

      if (info.file.status === "done") {
        setValue("image", info?.file?.response?.imagePath);
        message.success(`${info.file.name} file uploaded successfully`);
      } else if (info.file.status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
  };

  return (
    <Modal
      title={selected ? "Edit Model" : "Add Model"}
      open={isModalOpen}
      onCancel={() => {
        setIsModalOpen(false);
        setSelected(null);
        setFileList([]);
      }}
      okButtonProps={{ htmlType: "submit" }}
      onOk={() => handleSubmit(onSubmit)()}
    >
      <form
        onSubmit={handleSubmit(onSubmit)}
        style={{ display: "flex", flexDirection: "column", gap: 10 }}
      >
        {watch("image") && (
          <div>
            <p>Image :</p>
            {
              <img
                src={watch("image").replace(
                  ".",
                  `${process.env.REACT_APP_HOST}`
                )}
                style={{ width: 200, height: "auto" }}
              ></img>
            }
          </div>
        )}

        <Upload {...props}>
          <Button htmlType="button" icon={<UploadOutlined />}>
            Click to Upload
          </Button>
        </Upload>

        <div>
          <span>Name :</span>
          <Controller
            name="name"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="name"
                status={errors.name ? "error" : ""}
              />
            )}
          />
        </div>

        <div>
          <span>Age :</span>
          <Controller
            name="age"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                type="number"
                placeholder="age"
                status={errors.age ? "error" : ""}
              />
            )}
          />
        </div>

        <div>
          <span>Location :</span>
          <Controller
            name="location"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="location"
                status={errors.location ? "error" : ""}
              />
            )}
          />
        </div>

        <div>
          <span>Breed :</span>
          <Controller
            name="breed"
            control={control}
            render={({ field }) => (
              <Input
                {...field}
                placeholder="breed"
                status={errors.breed ? "error" : ""}
              />
            )}
          />
        </div>
      </form>
    </Modal>
  );
}
