import React, { useState } from "react";
import {
  Button,
  Modal,
  Form,
  Input,
  Radio,
  DatePicker,
  Divider,
  Tag,
} from "antd";
const { TextArea } = Input;
const EditModal = ({ visible, submitMap, onCancel, dataInfo, tenantList }) => {
  const [form] = Form.useForm();
  const dateFormat = "YYYY/MM/DD";

  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };

  console.log("dataInfo::::", dataInfo);

  // let initValues =
  //   dataInfo == undefined || dataInfo.length == 0
  //     ? {}
  //     : { ...dataInfo, remark: dataInfo?.userDesc?.remark };

  console.log("initValues::::::", dataInfo);
  form.setFieldsValue(dataInfo);

  return (
    <Modal
      visible={visible}
      title="编辑菜单"
      onCancel={onCancel}
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
      okText="确定"
      cancelText="取消"
    >
      <Form
        {...layout}
        initialValues={dataInfo}
        layout="inline"
        // onFinish={this.onFinish}
      >
        <Form.Item
          name="username"
          label="账号"
          rules={[
            {
              required: true,
              message: "请输入账号",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="nickName"
          label="姓名"
          rules={[
            {
              required: true,
              message: "请输入姓名",
            },
          ]}
        >
          <Input />
        </Form.Item>
        {/* <Form.Item
          name="gender"
          label="性别"
          rules={[
            {
              required: true,
              message: "请选择性别",
            },
          ]}
        >
          <Radio.Group>
            <Radio key={1} value={0}>
              男
            </Radio>
            <Radio key={2} value={1}>
              女
            </Radio>
          </Radio.Group>
        </Form.Item>
        <Form.Item
          name="birthday"
          label="出生日期"
          rules={[
            {
              required: true,
              message: "请输入出生日期",
            },
          ]}
        >
          <DatePicker format={dateFormat} placeholder="请输入出生日期" />
        </Form.Item> */}
        <Form.Item
          name="sourceCode"
          label="邀请码"
          rules={[
            {
              required: true,
              message: "请输入邀请码",
            },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="phoneNumber"
          label="手机号"
          rules={[
            {
              required: false,
              message: "请输入手机号",
            },
          ]}
        >
          <Input placeholder="请输入手机号" />
        </Form.Item>
        <Form.Item
          name="emailAddress"
          label="邮箱"
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
        >
          <Input placeholder="请输入邮箱" />
        </Form.Item>
        <Form.Item name="remark" label="备注">
          <TextArea rows={4} placeholder="请输入备注" />
        </Form.Item>
      </Form>
      <Divider />
      <div>租户列表</div>
      {/* <div className={cx("tenantList")}> */}
      <div>
        {tenantList.map((temp, index) => {
          return (
            <Card
              // className={cx("tenantCard")}
              title={temp.tenantName}
              onClick={() => this.onClick(temp)}
              key={temp.id}
            >
              <p>{temp.createdTime1}</p>
              <p>{temp.relId && <Tag color="magenta">已关联</Tag>}</p>
            </Card>
          );
        })}
      </div>
    </Modal>
  );
};

export default EditModal;
