import React, { useState } from "react";
import { Button, Modal, Form, Input, message, TreeSelect } from "antd";
import { setTreeData,isEmpty } from "../../../utils/index";

const CreateModal = ({
  visible,
  submitMap,
  delMenu,
  onCancel,
  isEditMenu,
  _this,
  dataList,
}) => {
  const [form] = Form.useForm();
  const layout = {
    labelCol: { span: 5 },
    wrapperCol: { span: 18 },
  };
  let initValues = {};
  const [menuId, setMenuId] = React.useState("");
  const onChange = async (val) => {
    if (isEditMenu) {
      const { dispatch } = _this.props;
      const res = await dispatch({
        type: "menuManage/getMenuInfo",
        opt: {
          menuInfoId: val,
        },
        callback: (res) => {
          const values = {
            ...res?.data?.data,
          };
          setMenuId(values.id);
          form.setFieldsValue(values);
        },
      });
    } else {
      return;
    }
  };
  const onSelect = async (val,nodes) => {
    if(!isEmpty(nodes?.parentRoleId) && !isEditMenu){
      message.error('请选择一级角色!');
      form.setFieldsValue({parentID:''})
    }
  };
  const handleDelMenu = () => {
    delMenu(menuId);
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
      
        form.setFieldsValue({
          menuId,
          ...values,
        });
        form.resetFields();
        console.log({ menuId, ...values });
        submitMap({ menuId, ...values });
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
  if (isEditMenu && btnArr.length == 2) {
    btnArr.push(
      <Button type="danger" onClick={handleDelMenu}>
        删除
      </Button>
    );
  } else if (!isEditMenu && btnArr.length == 3) {
    btnArr.pop();
  }
  return (
    <Modal
      visible={visible}
      title={isEditMenu ? "编辑菜单" : "新建菜单"}
      onCancel={cancel}
      destroyOnClose={true}
      footer={btnArr}
    >
      <Form
        form={form}
        {...layout}
        name="createMenu"
        initialValues={initValues}
      >
        <Form.Item
          help={isEditMenu ? "选择菜单" : "不选就是一级菜单"}
          label={isEditMenu ? "选择菜单" : "选择父级菜单"}
          placeholder="选择父级菜单"
          name="parentID"
          rules={[
            {
              required: false,
              message: "请选择菜单",
            },
          ]}
        >
          <TreeSelect
            style={{ width: "100%" }}
            dropdownStyle={{ maxHeight: 400, overflow: "auto" }}
            treeData={setTreeData(dataList, "menuName", "parentMenuId")}
            placeholder="Please select"
            showSearch
            allowClear
            onChange={onChange}
            onSelect={onSelect}
          />
        </Form.Item>
        <Form.Item
          label="菜单名称"
          name="menuName"
          rules={[
            {
              required: true,
              message: "请输入菜单名称",
            },
          ]}
        >
          <Input placeholder="请输入菜单名称" />
        </Form.Item>
        <Form.Item 
          label="菜单code" 
          name="menuCode"
          rules={[
            {
              required: true,
              message: "请输入菜单code",
            },
          ]}
        >
          <Input placeholder="请输入菜单code" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default CreateModal;
