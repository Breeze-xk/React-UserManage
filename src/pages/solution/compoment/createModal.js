import React, { useState } from "react";
import { Button, Select, Modal, Form, Input } from "antd";
const { Option } = Select;
const { TextArea } = Input;

const CreateModal = ({
  visible,
  submitMap,
  userList,
  productList,
  groupList,
  onCancel,
  Screening,
  cancelUserList,
}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  return (
    <Modal
      visible={visible}
      title="新增解决方"
      onCancel={() => {
        form.resetFields();
        userList = []
        onCancel();
        cancelUserList()
      }}
      destroyOnClose={true}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            // form.setFieldsValue(values);
            submitMap(values);
            cancelUserList()
          })
          .catch((info) => {
            console.log("校验失败:", info);
          });
      }}
    >
      <Form form={form} {...layout} name="createLessee">
        <Form.Item
          label="解决方名称"
          name="solverName"
          rules={[
            {
              required: true,
              message: "请输入解决方名称",
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入解决方名称" />
        </Form.Item>
        <Form.Item
          label="团队"
          name="groupId"
          rules={[
            {
              required: true,
              message: "请选择团队",
            },
          ]}
          hasFeedback
        >
          <Select allowClear showSearch onChange={newValue => {
              Screening(newValue);
            }} filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >=
              0
            }>
            {(groupList || [])?.map((item, index) => {
              return (
                <Option value={item.id} key={index}>
                  {item.groupName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="主管"
          name="administrator"
          rules={[
            {
              required: true,
              message: "请选择用户",
            },
          ]}
          hasFeedback
        >
          <Select allowClear showSearch>
            {(userList || [])?.map((item, index) => {
              return (
                <Option value={item.id} key={index}>
                  {item.nickName || item?.username}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="产品"
          name="businessType"
          rules={[
            {
              required: true,
              message: "请选择产品",
            },
          ]}
          hasFeedback
        >
          <Select allowClear showSearch>
            {(productList || [])?.map((item, index) => {
              return (
                <Option value={item.serviceCode} key={index}>
                  {item.serviceName}
                </Option>
              );
            })}
          </Select>
        </Form.Item>
        <Form.Item label="备注" name="remark">
          <TextArea />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
