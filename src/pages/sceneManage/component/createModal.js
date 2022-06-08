import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import moment from "moment";
const { TextArea } = Input;
const CreateModal = ({ visible, submitMap, onCancel }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  const dateFormat = "YYYY/MM/DD";
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        submitMap(values);
      })
      .catch((info) => {
        console.log("校验失败:", info);
      });
  };
  const cancel = () => {
    form.resetFields();
    form.setFieldsValue({});
    onCancel();
  };
  let btnArr = [
    <Button onClick={cancel}>取消</Button>,
    <Button key="submit" type="primary" onClick={handleSubmit}>
      确认
    </Button>,
  ];
  return (
    <Modal
      visible={visible}
      title="新建场景"
      onCancel={cancel}
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

export default CreateModal;
