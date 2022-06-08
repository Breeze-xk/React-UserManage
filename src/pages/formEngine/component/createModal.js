import React, { useState } from 'react';
import { Button, Modal, Form, Input, Select, Radio } from 'antd';
import moment from 'moment';
const { TextArea } = Input;
const CreateModal = ({ visible, submitMap, onCancel, processList, userLists, groupLists }) => {
  const [form] = Form.useForm();

  const dateFormat = 'YYYY/MM/DD';
  const cancel = () => {
    form.resetFields();
    onCancel();
  };
  return (
    <Modal
      visible={visible}
      title="新增流程表单"
      onCancel={cancel}
      destroyOnClose={true}
      onOk={() => {
        console.log('form', form.getFieldsValue());
        form
          .validateFields()
          .then((values) => {
            form.setFieldsValue(values);
            submitMap(values);
            form.resetFields();
          })
          .catch((info) => {
            console.log('校验失败:', info);
          });
      }}
    >
      <Form form={form} name="createLessee" initialValues={{ gender: 0 }}>
        <Form.Item
          label="表单名称"
          name="formName"
          rules={[
            {
              required: true,
              message: '请输入表单名称',
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Input placeholder="请输入表单名称" />
        </Form.Item>
        <Form.Item
          label="关联流程"
          name="process"
          rules={[
            {
              required: true,
              message: '请输入租户code',
              whitespace: true,
            },
          ]}
          hasFeedback
        >
          <Select
            placeholder="请选择服务状态"
            allowClear
            // onChange={(value) => {
            //   this.setState(
            //     {
            //       procDefId: value,
            //     },
            //     () => {
            //       this.getNodes();
            //     }
            //   );
            // }}
          >
            {processList?.map((item) => {
              return <Select.Option value={item?.actProcdefId}>{item?.defName}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="管理员"
          name="administrators"
          // rules={[
          //   {
          //     required: true,
          //     message: '请选择管理员',
          //     whitespace: true,
          //   },
          // ]}
          // hasFeedback
        >
          <Select placeholder="请选择管理员" allowClear mode="multiple">
            {userLists?.map((item) => {
              return <Select.Option value={item?.id}>{item?.username}</Select.Option>;
            })}
          </Select>
        </Form.Item>
        <Form.Item
          label="授权组"
          name="authGroups"
          // rules={[
          //   {
          //     required: true,
          //     message: '请选择授权组',
          //     whitespace: true,
          //   },
          // ]}
          // hasFeedback
        >
          {/* labelInValue={true} mode="multiple" */}
          <Select placeholder="请选择授权组" allowClear mode="multiple">
            {groupLists?.map((item) => {
              return <Select.Option value={item?.id}>{item?.groupName}</Select.Option>;
            })}
          </Select>
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
