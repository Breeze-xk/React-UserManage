// 用户注册

import React, { Component, PureComponent } from "react";
import { connect } from "dva";
import styles from "../index.less";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
import {
  Modal,
  Input,
  Form,
  message,
  Select,
  Row,
  Col,
  Radio,
  Checkbox,
  Button,
  AutoComplete,
} from "antd";
const { Option } = Select;
import PermissionList from "./permissionList";

const mapState2Props = ({ global, addPermission }) => ({
  global,
  addPermission,
});
@connect(mapState2Props)
export default class AddPermission extends Component {
  constructor(props) {
    super(props);
    this.state = {
      permissionList: [],
      selectedKeys: [],
    };
  }
  componentDidMount() {
    this.searchPermissionList();
  }
  onCancel = () => {};
  // 查询权限列表
  searchPermissionList = () => {
    const { dispatch, tenantId } = this.props;
    dispatch({
      type: "roleManage/getPermissionList",
      opt: {
        tenantId: tenantId,
        currentPage: this.state.permissionList["current"],
        pageSize: 10,
      },
      callback: (res) => {
        const permissionList = this.state.permissionList;
        permissionList["total"] = res?.data?.data?.totalCount;
        permissionList["data"] = res?.data?.data?.list;
        this.setState({
          permissionList: permissionList,
        });
      },
    });
  };
  // 分页
  handlePageChange = (pages) => {
    const permissionList = this.state.permissionList;
    permissionList["current"] = pages;
    this.setState({
      permissionList: permissionList,
    });
    this.searchPermissionList();
  };
  render() {
    const { visible, onCancel, submitMap, selectedItem } = this.props;
    const { permissionList, selectedRowKeys, selectedRows } = this.state;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows,
        });
      },
    };
    return (
      <Modal
        visible={visible}
        title="添加权限"
        onCancel={onCancel}
        width={800}
        destroyOnClose={true}
        onOk={(val) => {
          submitMap(selectedRowKeys);
        }}
      >
        <Form.Item label="权限名称">
          <Input disabled={true} value={selectedItem?.roleName} />
        </Form.Item>
        <PermissionList
          rowSelection={rowSelection}
          dataSource={permissionList}
          handlePageChange={this.handlePageChange}
        />
      </Modal>
    );
  }
}
