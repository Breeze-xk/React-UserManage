import React, { useState } from "react";
import { Button, Modal, Form, Input, Radio, TreeSelect, Empty ,message} from "antd";
import { setTreeData ,isEmpty} from "../../../utils/index";

const CreateModal = ({
  visible,
  submitMap,
  delRole,
  onCancel,
  isEditRole,
  _this,
  dataList,
}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  let initValues = {};
  const [roleId, setRoleId] = React.useState("");
  const onChange = async (val) => {
    if (isEditRole) {
      const { dispatch } = _this.props;
      const res = await dispatch({
        type: "roleManage/getRoleInfo",
        opt: {
          roleId: val,
        },
        callback: (res) => {
          const values = {
            remark: res?.data?.data?.roleDesc?.remark,
            ...res?.data?.data,
          };
          setRoleId(values.id);
          form.setFieldsValue(values);
        },
      });
    } else {
      return;
    }
  };
  const onSelect = async (val,nodes) => {
    if(!isEmpty(nodes?.parentRoleId) && !isEditRole){
      message.error('请选择一级角色!');
      form.setFieldsValue({parentID:''})
    }
  };
  const handleDelRole = () => {
    delRole(roleId);
    form.resetFields();
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        
        form.setFieldsValue({
          roleDesc: { remark: values.remark },
          roleId,
          ...values,
        });
        form.resetFields();
        console.log({ roleDesc: { remark: values.remark }, roleId, ...values });
        submitMap({ roleDesc: { remark: values.remark }, roleId, ...values });
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
  if (isEditRole && btnArr.length == 2) {
    btnArr.push(
      <Button type="danger" onClick={handleDelRole}>
        删除
      </Button>
    );
  } else if (!isEditRole && btnArr.length == 3) {
    btnArr.pop();
  }
  return (
    <Modal
      visible={visible}
      title={isEditRole ? "编辑角色" : "新建角色"}
      onCancel={cancel}
      destroyOnClose={true}
      footer={btnArr}
    >
      <Form
        form={form}
        {...layout}
        name="createRole"
        initialValues={initValues}
      >
        <Form.Item
          help={isEditRole ? "选择角色" : "不选就是一级角色"}
          label={isEditRole ? "选择角色" : "选择父级角色"}
          placeholder="选择父级角色"
          name="parentID"
          rules={[
            {
              required: false,
              message: "请选择角色",
            },
          ]}
        >
          <TreeSelect
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={setTreeData(dataList, "roleName", "parentRoleId")}
            placeholder="Please select"
            showSearch
            allowClear
            onChange={onChange}
            onSelect={onSelect}
          />
        </Form.Item>
        {/* {
          !isEditRole && <Form.Item label="团队code" name="roleCode">
            <Input placeholder="请输入团队code" />
          </Form.Item>
        } */}
        <Form.Item
          label="角色名称"
          name="roleName"
          rules={[
            {
              required: true,
              message: "请输入角色名称",
            },
          ]}
        >
          <Input placeholder="请输入角色名称" />
        </Form.Item>

        <Form.Item label="备注" name="remark">
          <Input placeholder="请输入角色备注" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
