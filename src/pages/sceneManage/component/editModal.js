import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
const { TextArea } = Input;
const EditModal = ({ visible, submitMap, onCancel, currentDetailData }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };

  let initValues =
    currentDetailData == undefined || currentDetailData.length == 0
      ? {}
      : { ...currentDetailData};

  form.setFieldsValue(initValues);
  const handleSubmit = () => {
    form
    .validateFields()
    .then((values) => {
      form.resetFields();
      form.setFieldsValue(values);
      submitMap(values);
    })
    .catch((info) => {
      console.log("校验失败:", info);
    });
  };
  let btnArr = [
    <Button onClick={onCancel}>取消</Button>,
    <Button key="submit" type="primary" onClick={handleSubmit}>
      确认
    </Button>,
  ];
  return (
    <Modal
      visible={visible}
      title="编辑租户"
      onCancel={onCancel}
      destroyOnClose={true}
      footer={btnArr}
    >
      <Form
        form={form}
        {...layout}
        name="createLessee"
        initialValues={{ gender: 0 }}
      >
       <Form.Item
          label="场景名称"
          name="sceneName"
          rules={[
            {
              required: true,
              message: "请输入场景名称",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入场景名称" />
        </Form.Item>
        <Form.Item
          label="场景code"
          name="sceneCode"
          rules={[
            {
              required: true,
              message: "请输入场景code",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入场景code" />
        </Form.Item>
      </Form>

    </Modal>
  );
};

export default EditModal;
