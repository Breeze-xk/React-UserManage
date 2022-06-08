import React, { useState } from 'react';
import { Button, Modal, Select, Form, Input } from 'antd';
const { TextArea } = Input;
const { Option } = Select;
const CreateModal = ({
  visible,
  submitMap,
  onCancel,
  groupList,
  productList,
  userList,
  currentData,
  Screening,
  cancelUserList,
}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  let initValues =
    currentData == undefined || currentData.length == 0
      ? {}
      : { ...currentData, remark: currentData?.solverDesc?.remark };
  form.setFieldsValue(initValues);
  return (
    <Modal
      visible={visible}
      title="编辑产品"
      onCancel={() => {
        form.resetFields();
        onCancel();
        cancelUserList();
      }}
      destroyOnClose={true}
      onOk={() => {
        form
          .validateFields()
          .then((values) => {
            form.resetFields();
            submitMap(values);
            cancelUserList();
          })
          .catch((info) => {
            console.log('校验失败:', info);
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
              message: '请输入解决方名称',
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
              message: '请选择团队',
            },
          ]}
          hasFeedback
        >
          <Select
            allowClear
            showSearch
            // onChange={(newValue) => {
            //   Screening(newValue);
            // }}
            filterOption={(input, option) =>
              option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
            }
          >
            {(groupList || [])?.map((item, index) => {
              console.log(index,item);
              return <Option value={item.id}>{item.groupName}</Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="主管"
          name="administrator"
          rules={[
            {
              required: true,
              message: '请选择用户',
            },
          ]}
          hasFeedback
        >
          <Select allowClear showSearch>
            {(userList || []).map((item, index) => {
              return <Option value={item.id}>{item?.nickName || item?.username}</Option>;
            })}
          </Select>
        </Form.Item>

        <Form.Item
          label="产品"
          name="businessType"
          rules={[
            {
              required: true,
              message: '请选择产品',
            },
          ]}
          hasFeedback
        >
          <Select allowClear showSearch>
            {(productList || [])?.map((item, index) => {
              return <Option value={item.serviceCode}>{item.serviceName}</Option>;
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
