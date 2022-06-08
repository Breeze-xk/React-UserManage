import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, TreeSelect, message } from "antd";
import { setTreeData,isEmpty } from "../../../utils/index";

const CreateModal = ({
  visible,
  submitMap,
  currentDetailData,
  onCancel,
  isEdit,
  _this,
  dataList,
}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  let initValues =
    currentDetailData == undefined || currentDetailData.length == 0
      ? {}
      : {
          ...currentDetailData,
          parentID: currentDetailData?.parentPermissonId,
          remark: currentDetailData?.permissionDesc?.remark,
        };

  const [permissonId, setPermissoId] = React.useState("");
  const onChange = async (val,nodes) => {
    console.log('!isEmpty(nodes?.parentPermissonId)',!isEmpty(nodes?.parentPermissonId))
    if(!isEmpty(nodes?.parentPermissonId)){
      message.error('请选择一级权限!');
      form.setFieldsValue({parentID:''})
    }
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.resetFields();
        form.setFieldsValue({
          permissionDesc: { remark: values.remark },
          permissonId,
          ...values,
        });
        submitMap({
          permissionDesc: { remark: values.remark },
          permissonId,
          ...values,
        });
      })
      .catch((info) => {
        console.log("校验失败:", info);
      });
  };
  const cancel = () => {
    form.setFieldsValue({});
    onCancel();
  };
  form.setFieldsValue(initValues);
  return (
    <Modal
      visible={visible}
      title={isEdit ? "编辑权限" : "新增权限"}
      onCancel={cancel}
      destroyOnClose={true}
      footer={[
        <Button onClick={onCancel}>取消</Button>,
        <Button key="submit" type="primary" onClick={handleSubmit}>
          确认
        </Button>,
      ]}
    >
      <Form
        form={form}
        {...layout}
        name="createOrgan"
        initialValues={initValues}
      >
        <Form.Item
          help={isEdit ? "选择权限" : "不选就是一级权限"}
          label={isEdit ? "选择权限" : "选择父级权限"}
          name="parentID"
        >
          <TreeSelect
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={setTreeData(
              dataList,
              "permissionName",
              "parentPermissonId"
            )}
            showSearch
            placeholder="Please select"
            allowClear
            onSelect={onChange}
          />
        </Form.Item>
        
        <Form.Item
          label="权限名称"
          name="permissionName"
          rules={[
            {
              required: true,
              message: "请输入权限名称",
            },
          ]}
        >
          <Input placeholder="请输入权限名称" />
        </Form.Item>
        <Form.Item
          label="权限code"
          name="permissionCode"
          rules={[
            {
              required: true,
              message: "请输入权限code",
            },
          ]}
        >
          <Input placeholder="请输入权限code" />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入权限备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
