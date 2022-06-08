import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, TreeSelect } from "antd";
import { setTreeData } from "../../../utils/index";

const CreateModal = ({
  visible,
  submitMap,
  deleteOrgan,
  onCancel,
  isEditOrgan,
  _this,
  dataList,
}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  let initValues = {};
  const [organizationId, setOrganizationId] = React.useState("");

  const onChange = async (val) => {
    if (isEditOrgan) {
      const { dispatch } = _this.props;
      const res = await dispatch({
        type: "organManage/getOrganInfo",
        opt: {
          organizationId: val,
        },
        callback: (res) => {
          const values = {
            remark: res?.data?.data?.organizationDesc?.remark,
            ...res?.data?.data,
          };
          setOrganizationId(values.id);
          form.setFieldsValue(values);
        },
      });
    } else {
      return;
    }
  };
  const handledeleteOrgan = () => {
    deleteOrgan(organizationId);
    form.resetFields();
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        form.setFieldsValue({
          organizationDesc: { remark: values.remark },
          organizationId,
          ...values,
        });
        console.log({
          organizationDesc: { remark: values.remark },
          organizationId,
          ...values,
        });
        form.resetFields();
        submitMap({
          organizationDesc: { remark: values.remark },
          organizationId,
          ...values,
        });
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

  form.setFieldsValue(initValues);
  let btnArr = [
    <Button onClick={cancel}>取消</Button>,
    <Button key="submit" type="primary" onClick={handleSubmit}>
      确认
    </Button>,
  ];
  if (isEditOrgan && btnArr.length == 2) {
    btnArr.push(
      <Button type="danger" onClick={handledeleteOrgan}>
        删除
      </Button>
    );
  } else if (!isEditOrgan && btnArr.length == 3) {
    btnArr.pop();
  }
  return (
    <Modal
      visible={visible}
      title={isEditOrgan ? "编辑机构" : "新建机构"}
      onCancel={cancel}
      destroyOnClose={true}
      footer={btnArr}
    >
      <Form
        form={form}
        {...layout}
        name="createOrgan"
        initialValues={initValues}
      >
        <Form.Item
          help={isEditOrgan ? "选择机构" : "选择父级机构"}
          label={isEditOrgan ? "选择机构" : "选择父级机构"}
          name="parentID"
          rules={[
            {
              required: true,
              message: "请选择机构",
            },
          ]}
        >
          <TreeSelect
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={setTreeData(
              dataList,
              "organizationName",
              "parentOrganizationId"
            )}
            placeholder="请选择父级机构"
            treeDefaultExpandAll
            allowClear
            onChange={onChange}
          />
        </Form.Item>

        <Form.Item
          label="新机构名称"
          name="organizationName"
          rules={[
            {
              required: true,
              message: "请输入机构名称",
            },
          ]}
        >
          <Input placeholder="请输入新机构名称" />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入机构备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
