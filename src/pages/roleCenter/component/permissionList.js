// 用户注册

import React, { Component, PureComponent } from "react";
import { connect } from "dva";
import styles from "../index.module.less";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
import {
  Table,
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
const mapState2Props = ({ global, addMember }) => ({ global, addMember });
@connect(mapState2Props)
export default class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {};

    this.columns = [
      {
        title: "序号",
        key: "id",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
        render: (text, record, index) => (
          <>
            <span>{index + 1}</span>
          </>
        ),
      },
      {
        title: "权限名称",
        dataIndex: "permissionName",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
        key: "permissionName",
      },
      {
        title: "权限Code",
        dataIndex: "permissionCode",
        key: "permissionCode",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
      },
    ];
  }
  componentDidMount() {}
  onCancel = () => {};
  render() {
    const { dataSource, rowSelection, handlePageChange, selectedRowKeys } =
      this.props;
    return (
      <Table
        rowSelection={{
          type: "checkbox",
          selectedRowKeys: selectedRowKeys,
          ...rowSelection,
        }}
        rowKey="id"
        scroll={{ x: true }}
        dataSource={dataSource.data}
        columns={this.columns}
        pagination={{
          pageSize: dataSource?.pageSize,
          total: dataSource?.total,
          onChange: handlePageChange,
        }}
      />
    );
  }
}
