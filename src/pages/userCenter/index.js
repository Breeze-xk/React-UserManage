// 用户注册

import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import {
  Card,
  Table,
  Descriptions,
  Pagination,
  Form,
  Modal,
  Input,
  DatePicker,
  message,
  Select,
  Row,
  Col,
  Radio,
  Checkbox,
  Button,
  AutoComplete,
  Tag,
} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import { qs } from '../../utils/index';
import moment from 'moment';

const mapState2Props = ({ global, userCenter }) => ({ global, userCenter });

@connect(mapState2Props)
export default class UserCenter extends Component {
  searchFormRef = React.createRef();
  userFormRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      tenantId: Number(qs(props.location?.search).tenantId),
      isModalVisible: false, // 用户弹窗状态
      isDeatil: false,
      dataSource: {
        dataList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }, //用户List
      modalTitle: '', //用户弹窗title
      delUserVisible: false, //删除弹窗状态
      userInfo: {}, //当前用户信息
    };
  }

  componentDidMount() {
    this.searchFormRef.current.setFieldsValue({
      member: 'all',
    });
    this.setState(
      {
        tenantId: sessionStorage.getItem('tenantId'),
      },
      () => {
        this.searchUserists(this.searchFormRef.current.getFieldsValue());
      }
    );
  }
  // 查询表单重置
  onReset = () => {
    this.searchFormRef.current.resetFields();
    this.searchUserists();
  };

  // 查询
  searchUserists = (values) => {
    const { dispatch, location } = this.props;
    const { dataSource, tenantId } = this.state;
    dispatch({
      type: 'userCenter/getUserLists',
      opt: {
        currentPage: dataSource.currentPage || 1,
        pageSize: dataSource.pageSize || 10,
        tenantId: tenantId,
        ...this.searchFormRef.current.getFieldValue(),
      },
      callback: (res) => {
        console.log(res);
        const dataSource = res?.data?.data;
        this.setState({
          dataSource: {
            dataList: dataSource.list,
            total: dataSource.totalCount,
            currentPage: dataSource.currentPage,
            pageSize: dataSource.pageSize,
          },
        });
      },
    });
  };
  // 分页
  changePage = (current, pageSize) => {
    let dataSource = this.state.dataSource;
    if (current) {
      dataSource['currentPage'] = current;
    } else {
      dataSource['currentPage'] = 1;
    }
    dataSource['pageSize'] = pageSize;
    this.setState({
      dataSource: dataSource,
    });
    this.searchUserists(this.searchFormRef.current.getFieldsValue());
  };
  // 展示弹窗
  showFormModal(data, type) {
    if (type == 'edit') {
      this.getUserInfo(data, type);
      this.setState({
        modalTitle: '编辑用户',
      });
    } else if (type == 'detail') {
      this.setState({
        isDeatil: true,
        modalTitle: '查看详情',
      });
      this.getUserInfo(data, type);
    } else if (type == 'del') {
      this.setState({
        delUserVisible: true,
        userInfo: data,
        modalTitle: '删除用户',
      });
    }
  }
  timeShow = (d) => {
    return moment(d).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
  };
  timeShow2 = (d) => {
    return moment(d);
  };
  // 获取用户信息
  getUserInfo = (userInfo, type) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'userCenter/getUserInfo',
      opt: {
        userId: userInfo.id,
        getUserId: userInfo.id,
      },
      callback: (res) => {
        const dataSource = res?.data?.data;
        dataSource['remark'] = dataSource['userDesc'].remark;
        // if (type == "edit") {
        //   dataSource["birthday"] = moment(dataSource["birthday"]);
        // }
        this.setState({
          userInfo: dataSource,
          isModalVisible: true,
        });
        if (type == 'edit') {
          this.userFormRef.current.setFieldsValue({
            ...this.state.userInfo,
            userDesc: { remark: dataSource.remark },
            ...dataSource,
          });
        }
      },
    });
  };
  // 修改用户信息
  handleUserInfo = () => {
    const { dispatch } = this.props;
    const Opts = this.userFormRef.current.getFieldValue();
    this.userFormRef.current
      .validateFields()
      .then((values) => {
        dispatch({
          type: 'userCenter/modifyUserInfo',
          opt: {
            ...Opts,
            userDesc: { remark: Opts.remark },
          },
          callback: (res) => {
            console.log(res?.data?.data);
            if (res.data.status == 200) {
              message.success(`修改成功!`);
              this.searchUserists();
                  
            } else {
              message.error(res?.data?.message || `修改失败，请重新尝试!`);
            }
          },
        });

        this.handleCancel();
      })
      .catch((info) => {
        console.log('校验失败:', info);
      });
  };
  // 删除用户
  handleDelUserInfo = () => {
    const { userInfo } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'userCenter/deleteUserInfo',
      opt: {
        userId: userInfo.id,
      },
      callback: (res) => {
        console.log(res);
 
        if (res.data.status == 200) {
          message.success(`删除成功!`);
          this.searchUserists(this.searchFormRef.current.getFieldsValue());
          this.handleCancel();
              
        } else {
          message.error(res?.data?.message || `删除失败，请重新尝试!`);
        }
      },
    });
 
  };
  // 详情弹窗取消
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      delUserVisible: false,
      isDeatil: false,
    });
  };
  render() {
    const { isModalVisible, delUserVisible, isDeatil, dataSource, modalTitle, userInfo } =
      this.state;

    const dateFormat = 'YYYY/MM/DD';
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 5,
        },
        md: {
          span: 5,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 16,
        },
      },
    };
    const tailLayout = {
      wrapperCol: { offset: 4, span: 20 },
    };
    const columns = [
      {
        title: '序号',
        key: 'id',
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record, index) => (
          <>
            <span>{index + 1}</span>
          </>
        ),
      },
      {
        title: '账号',
        dataIndex: 'username',
        key: 'username',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '姓名',
        dataIndex: 'nickName',
        key: 'nickName',
        textWrap: 'word-break',
        ellipsis: true,
      },
      // {
      //   title: "性别",
      //   dataIndex: "gender",
      //   key: "gender",
      //   textWrap: "word-break",
      //   ellipsis: true,
      //   render: (text, record) => (
      //     <>
      //       <span>{record?.gender == 0 ? "男" : "女"}</span>
      //     </>
      //   ),
      // },
      {
        title: '手机号',
        dataIndex: 'phoneNumber',
        key: 'phoneNumber',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '邮箱',
        dataIndex: 'emailAddress',
        key: 'emailAddress',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '角色',
        dataIndex: 'roles',
        key: 'roles',
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => {
          return (
            <>
              {(text || []).map((item) => {
                return (
                  <Tag color="magenta" key={item.id}>
                    {item.roleName}
                  </Tag>
                );
              })}
            </>
          );
        },
      },
      // {
      //   title: "邀请码",
      //   dataIndex: "sourceCode",
      //   key: "sourceCode",
      //   textWrap: "word-break",
      //   ellipsis: true,
      // },
      // {
      //   title: "被邀请码",
      //   dataIndex: "userStatus",
      //   key: "userStatus",
      //   textWrap: "word-break",
      //   ellipsis: true,
      // },
      {
        title: '操作',
        key: 'updatedTime',
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => (
          <>
            <Button
              size="small"
              type="primary"
              onClick={() => this.showFormModal(record, 'detail')}
            >
              查看
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              type="primary"
              onClick={() => this.showFormModal(record, 'edit')}
            >
              编辑
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              danger
              type="primary"
              onClick={() => this.showFormModal(record, 'del')}
            >
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <div className={cx('userCenter')}>
        <Card className={cx('searchForm')} title="用户管理">
          <Form
            {...formItemLayout}
            ref={this.searchFormRef}
            layout="inline"
            name="control-ref"
            onFinish={this.searchUserists}
          >
            <Form.Item name="nickName" label="姓名">
              <Input />
            </Form.Item>
            <Form.Item name="phoneNumber" label="手机号">
              <Input />
            </Form.Item>
            {/* <Form.Item  name="member" label="会员">
              <Select defaultValue="all" allowClear>
                <Option value="all">全部</Option>
                <Option value="member">会员</Option>
                <Option value="other">非会员</Option>
              </Select>
            </Form.Item> */}
            <Button type="primary" htmlType="submit">
              搜索
            </Button>
            <Button htmlType="button" style={{ margin: '0 8px' }} onClick={this.onReset}>
              清空
            </Button>
          </Form>
        </Card>
        <Card className={cx('userLists')}>
          <Table
            scroll={{ x: true }}
            rowKey={(record) => record.id}
            dataSource={dataSource.dataList}
            columns={columns}
            pagination={false}
          />
          <Pagination
            showSizeChanger
            onChange={this.changePage}
            defaultCurrent={dataSource.currentPage}
            total={dataSource.total}
          />
        </Card>
        <Modal
          className={cx('userInfoModal')}
          title={modalTitle}
          visible={isModalVisible}
          footer={
            !isDeatil
              ? [
                  <Button onClick={this.handleCancel}>取消</Button>,
                  <Button key="submit" type="primary" onClick={this.handleUserInfo}>
                    确认
                  </Button>,
                ]
              : null
          }
          onCancel={this.handleCancel}
        >
          {isDeatil ? (
            <Descriptions column={2}>
              <Descriptions.Item label="账号">{userInfo.username}</Descriptions.Item>
              <Descriptions.Item label="姓名">{userInfo.nickName}</Descriptions.Item>
              <Descriptions.Item label="手机号">{userInfo.phoneNumber}</Descriptions.Item>
              <Descriptions.Item label="邮箱">{userInfo.emailAddress}</Descriptions.Item>
              {/* <Descriptions.Item label="性别">
                {userInfo.gender == 0 ? "男" : "女"}
              </Descriptions.Item>
              <Descriptions.Item label="邀请码">
                {userInfo.sourceCode}
              </Descriptions.Item> */}
              {/* <Descriptions.Item label="出生日期">
                {this.timeShow(userInfo.birthday)}
              </Descriptions.Item> */}
              <Descriptions.Item label="备注">{userInfo.remark}</Descriptions.Item>
            </Descriptions>
          ) : (
            <Form
              {...formItemLayout}
              initialValues={userInfo}
              ref={this.userFormRef}
              layout="inline"
              onFinish={this.onFinish}
            >
              <Form.Item name="username" label="账号">
                <Input disabled />
              </Form.Item>
              <Form.Item name="nickName"  rules={[
                  {
                    pattern: /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/,
                    message: "请输入正确姓名!",
                  },
                ]} label="姓名">
                <Input />
              </Form.Item>
              {/* <Form.Item
                name="gender"
                label="性别"
                rules={[
                  {
                    required: true,
                    message: "请选择性别",
                  },
                ]}
              >
                <Radio.Group>
                  <Radio key={1} value={0}>
                    男
                  </Radio>
                  <Radio key={2} value={1}>
                    女
                  </Radio>
                </Radio.Group>
              </Form.Item> */}
              {/* <Form.Item
                name="birthday"
                label="出生日期"
                rules={[
                  {
                    required: true,
                    message: "请输入出生日期",
                  },
                ]}
              >
                <DatePicker format={dateFormat} placeholder="请输入出生日期" />
              </Form.Item> */}
              <Form.Item
                name="sourceCode"
                label="邀请码"
                // rules={[
                //   {
                //     required: true,
                //     message: '请输入邀请码',
                //   },
                // ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="phoneNumber"
                label="手机号"
                rules={[
                  {
                    required: false,
                    message: '请输入手机号',
                  },
                  {
                    pattern: /^1[3|4|5|6|7|8][0-9]{9}$/,
                    message: "请输入正确手机号!",
                  },
                ]}
              >
                <Input placeholder="请输入手机号" />
              </Form.Item>

              <Form.Item
                name="emailAddress"
                label="邮箱"
                rules={[
                  {
                    type: 'email',
                    message: '这不是个正确的邮箱',
                  },
                  {
                    required: false,
                    message: '请确认邮箱',
                  },
                ]}
              >
                <Input placeholder="请输入邮箱" />
              </Form.Item>
              <Form.Item name="remark" label="备注">
                <TextArea rows={4} placeholder="请输入备注" />
              </Form.Item>
            </Form>
          )}
        </Modal>
        <Modal
          title="删除用户"
          visible={delUserVisible}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleDelUserInfo}>
              确认
            </Button>,
            <Button onClick={this.handleCancel}>取消</Button>,
          ]}
          onOk={this.handleDelUserInfo}
          onCancel={this.handleCancel}
        >
          <div>即将删除{userInfo.username}!</div>
        </Modal>
      </div>
    );
  }
}
