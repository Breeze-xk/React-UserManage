import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio } from "antd";
import moment from "moment";
const { TextArea } = Input;
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
      title="新建租户"
      onCancel={cancel}
      destroyOnClose={true}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.setFieldsValue(values);
            submitMap(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log("校验失败:", info);
          });
      }}
    >
      <Form
        form={form}
        {...layout}
        name="createLessee"
        initialValues={{ gender: 0 }}
      >
        <Form.Item
          label="租户名称"
          name="tenantName"
          rules={[
            {
              required: true,
              message: "请输入租户名称",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入租户名称" />
        </Form.Item>
        <Form.Item
          label="租户code"
          name="tenantCode"
          rules={[
            {
              required: true,
              message: "请输入租户code",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入租户code" />
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <TextArea rows={4} placeholder="请输入备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
