import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, DatePicker } from "antd";
import moment from "moment";
const CreateModal = ({ visible, submitMap, onCancel, currentDetailData }) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  const dateFormat = "YYYY/MM/DD";
  const cancel = () => {
    form.resetFields();

    onCancel();
  };
  return (
    <Modal
      visible={visible}
      title="新建用户"
      onCancel={cancel}
      destroyOnClose={true}
      onOk={() => {
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
      }}
    >
      <Form
        form={form}
        {...layout}
        name="createUser"
        initialValues={{ gender: 0 }}
      >
        <Form.Item
          label="账号"
          name="username"
          rules={[
            {
              required: true,
              message: "请输入账号",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入姓名称" />
        </Form.Item>
        <Form.Item
          label="姓名"
          name="nickName"
          rules={[
            {
              required: true,
              message: "请输入姓名",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入姓名" />
        </Form.Item>
        <Form.Item
          label="手机号"
          name="phoneNumber"
          validateStatus="warning"
          rules={[
            {
              required: true,
              message: "请输入手机号",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          label="邮箱"
          name="emailAddress"
          validateStatus="warning"
          rules={[
            {
              type: "email",
              message: "这不是个正确的邮箱",
            },
            {
              required: false,
              message: "请确认邮箱",
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请确认邮箱" />
        </Form.Item>
        {/* <Form.Item
          label="性别"
          name="gender"
          rules={[
            {
              required: true,
              message: "请选择性别",
            },
          ]}
          hasFeedback
        >
          <Radio.Group>
            <Radio value={0}>男</Radio>
            <Radio value={1}>女</Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          label="出生日期"
          name="birthday"
          rules={[
            {
              required: true,
              message: "请输入出生日期",
            },
          ]}
          hasFeedback
        >
          <DatePicker format={dateFormat} placeholder="请输入出生日期" />
        </Form.Item> */}
        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
