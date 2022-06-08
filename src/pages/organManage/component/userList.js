// 用户注册

import React, { Component, PureComponent } from "react";
import { connect } from "dva";
import styles from "../index.less";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
import {
  Table,
  Input,
  Form,
  message,
  Select,
  Tag
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
        title: "账号",
        dataIndex: "username",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
        key: "username",
      },
      {
        title: "姓名",
        dataIndex: "nickName",
        key: "nickName",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
      },
      // {
      //   title: "性别",
      //   dataIndex: "gender",
      //   key: "gender",
      //   width: 200,
      //   textWrap: "word-break",
      //   ellipsis: true,
      //   render: (text, record) => (
      //     <>
      //       <span>{record?.gender == 0 ? "男" : "女"}</span>
      //     </>
      //   ),
      // },
      {
        title: "手机号",
        dataIndex: "phoneNumber",
        key: "phoneNumber",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
      },
      {
        title: "邮箱",
        dataIndex: "emailAddress",
        key: "emailAddress",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
      },
      {
        title: "角色",
        dataIndex: "roles",
        key: "roles",
        textWrap: "word-break",
        ellipsis: true,
        render: (text, record) => {
          return (
            <>
              {(text || []).map(item=>{
                return <Tag color="magenta" key={item?.id}>{item?.roleName}</Tag>
              })}
            </>
          )
        }
      },
      // {
      //   title: "邀请码",
      //   dataIndex: "sourceCode",
      //   key: "sourceCode",
      //   width: 200,
      //   textWrap: "word-break",
      //   ellipsis: true,
      // },
      // {
      //   title: "被邀请码",
      //   dataIndex: "userStatus",
      //   key: "userStatus",
      //   width: 200,
      //   textWrap: "word-break",
      //   ellipsis: true,
      // },
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
          ...rowSelection,
          selectedRowKeys: selectedRowKeys,
        }}
        rowKey="id"
        size="small"
        scroll={{ x: true }}
        dataSource={dataSource.data}
        columns={this.columns}
        pagination={{
          pageSize: dataSource?.pageSize,
          total: dataSource?.total,
          current:  dataSource?.current,
          onChange: handlePageChange,
        }}
      />
    );
  }
}
