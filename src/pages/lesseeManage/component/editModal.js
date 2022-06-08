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
      : { ...currentDetailData, remark: currentDetailData?.tenantDesc?.remark };

  form.setFieldsValue(initValues);
  // <Button
  //                 style={{ marginLeft: '10px' }}
  //                 size="small"
  //                 danger
  //                 type="primary"
  //                 onClick={() => this.showFormModal(record, 'del')}
  //               >
  //                 删除
  //               </Button>
  return (
    <Modal
      visible={visible}
      title="编辑租户"
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
    >
      <Form
        form={form}
        {...layout}
        name="EditLessee"
        initialValues={initValues}
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

export default EditModal;
