import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import styles from '../index.less';
import classnames from 'classnames/bind';
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
} from 'antd';
const { Option } = Select;
import UserList from './userList';

const mapState2Props = ({ global, addMember }) => ({ global, addMember });
@connect(mapState2Props)
export default class AddMember extends Component {
  constructor(props) {
    super(props);
    this.state = {
      organUserList: [],
      selectedKeys: [],
    };
  }
  componentDidMount() {
    this.searchUserists();
  }
  // 查询用户列表
  searchUserists = () => {
    const { dispatch, tenantId } = this.props;
    dispatch({
      type: 'organManage/getOrganUserList',
      opt: {
        tenantId: sessionStorage.getItem('tenantId'),
        currentPage: this.state.organUserList['current'],
        pageSize: 10,
      },
      callback: (res) => {
        const organUserList = this.state.organUserList;
        organUserList['total'] = res?.data?.data?.totalCount;
        organUserList['data'] = res?.data?.data?.list;
        this.setState({
          organUserList: organUserList,
        });
      },
    });
  };
  // 分页
  handlePageChange = (pages) => {
    const organUserList = this.state.organUserList;
    organUserList['current'] = pages;
    this.setState({
      organUserList: organUserList,
    });
    this.searchUserists();
  };
  render() {
    const { visible, onCancel, submitMap, selectedItem } = this.props;
    const { organUserList, selectedRowKeys, selectedRows } = this.state;
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
        title="添加组员"
        onCancel={onCancel}
        width={800}
        destroyOnClose={true}
        onOk={(val) => {
          submitMap(selectedRowKeys);
        }}
      >
        <Form.Item label="机构名称">
          <Input
            style={{
              width: '100px',
              border: 'none',
              backgroundColor: '#fff',
              color: '#000',
            }}
            disabled={true}
            value={selectedItem?.organizationName}
          />
        </Form.Item>
        <UserList
          rowSelection={rowSelection}
          dataSource={organUserList}
          handlePageChange={this.handlePageChange}
        />
      </Modal>
    );
  }
}
