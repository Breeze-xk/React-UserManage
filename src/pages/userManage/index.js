// 用户注册

import React, { Component, PureComponent } from "react";
import { connect } from "dva";
import styles from "./index.module.less";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
import {
  Card,
  Table,
  Descriptions,
  Pagination,
  Tag,
  Divider,
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
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
const mapState2Props = ({ global, userManage }) => ({ global, userManage });

import moment from "moment";
import CreateModal from "./component/createModal";
@connect(mapState2Props)
export default class UserManage extends Component {
  searchFormRef = React.createRef();
  userFormRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      isModalVisible: false, // 用户弹窗状态
      isDeatil: false,
      dataSource: {
        dataList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }, //用户List
      modalTitle: "", //用户弹窗title
      delUserVisible: false, //删除弹窗状态
      userInfo: {}, //当前用户信息
      createVisible: false, // 新增弹窗
      currentDetailData: {}, //往组件弹窗传参
      tenantList: [], //租户列表
      defaultValue: [], //已加入租户
    };
  }

  componentDidMount() {
    // this.searchFormRef.current.setFieldsValue({
    //   member: "all",
    // });
    this.setState({
      tenantId:sessionStorage.getItem('tenantId')
    },()=>{
      this.searchUserists(this.searchFormRef.current.getFieldsValue());
    })
  }
  // 查询表单重置
  onReset = () => {
    this.searchFormRef.current.resetFields();
    this.searchUserists()
  };
  // 查询
  searchUserists = (values) => {
    const { dispatch } = this.props;
    const { dataSource } = this.state;
    dispatch({
      type: "userManage/getUserLists",
      opt: {
        currentPage: !values?.phoneNumber ? dataSource.currentPage || 1 : 1,
        pageSize: dataSource.pageSize,
        ...this.searchFormRef.current.getFieldValue()
      },
      callback: (res) => {
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
      dataSource["currentPage"] = current;
    } else {
      dataSource["currentPage"] = 1;
    }
    dataSource["pageSize"] = pageSize;
    this.setState({
      dataSource: dataSource,
    }, ()=>{
      this.searchUserists(this.searchFormRef.current.getFieldsValue());
    });
  };
  // 展示弹窗
  showFormModal(data, type) {
    if (type == "edit") {
      this.getUserInfo(data, type);
      this.setState({
        modalTitle: "编辑用户",
      });
      this.getTenantList(data);
    } else if (type == "detail") {
      this.setState({
        isDeatil: true,
        modalTitle: "查看详情",
      });
      this.getUserInfo(data, type);
    } else if (type == "del") {
      this.setState({
        delUserVisible: true,
        userInfo: data,
        modalTitle: "删除用户",
      });
    }
  }
  // 获取用户信息
  getUserInfo = (userInfo, type) => {
    const { dispatch } = this.props;
    dispatch({
      type: "userManage/getUserInfo",
      opt: {
        identifyCode: userInfo.identifyCode,
      },
      callback: (res) => {
        const dataSource = res?.data?.data;
        if (!this.state.isDeatil) {
          dataSource["birthday"] = moment(dataSource?.birthday);
        }
        this.setState({
          userInfo: dataSource,
          isModalVisible: true,
        });
        if(type == 'edit') {
          this.userFormRef.current.setFieldsValue({
            ...this.state.userInfo, userDesc: { remark: dataSource.remark }, ...dataSource
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
        type: "userManage/modifyUserInfo",
        opt: {
          ...Opts,
          userDesc: { remark: Opts.remark }
        },
        callback: (res) => {
          if (res.data.status == 200) {
            message.success(`修改成功!`);
            this.searchUserists(this.searchFormRef.current.getFieldsValue());
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
  // 新增用户
  handleAddSubmit = (values) => {
    const { dispatch } = this.props;
    console.log("ascs", values);
    dispatch({
      type: "userManage/saveUserInfo",
      opt: {
        username: values.username,
        nickName: values.nickName,
        phoneNumber: values.phoneNumber,
        emailAddress: values.emailAddress,
        gender: values.gender,
        birthday: values.birthday,
        sourceCode: "addByPost",
        userDesc: {
          remark: values.remark,
        },
      },
      callback: (res) => {
        console.log(res);
        if (res.data.status == 200) {
          message.success(`添加成功!`);
          this.searchUserists();
        } else {
          message.error(res?.data?.message || `添加失败，请重新尝试!`);
        }
      },
    });
    this.handleCancel();
  };
  handleAddVisible = () => {
    this.setState({
      createVisible: true,
      // currentDetailData:
    });
  };
  // 删除用户
  handleDelUserInfo = () => {
    const { userInfo } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: "userManage/deleteUserInfo",
      opt: {
        identifyCode: userInfo.identifyCode,
      },
      callback: (res) => {
        this.searchUserists(this.searchFormRef.current.getFieldsValue());
      },
    });
    this.handleCancel();
  };

  // 详情弹窗取消
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      delUserVisible: false,
      isDeatil: false,
      createVisible: false,
      userInfo: {},
    });
  };

  // 租户列表
  getTenantList = (userInfo) => {
    const { dispatch } = this.props;
    dispatch({
      type: "userManage/getTenantList",
      opt: {
        identifyId: userInfo.id,
      },
      callback: (res) => {
        let tenantList = res?.data?.data?.list;
        if (tenantList && tenantList.length > 0) {
          tenantList.map((temp, index) => {
            temp.createdTime1 = this.timeShow(temp.createdTime);
          });
        }
        this.setState({
          tenantList: tenantList,
        });
      },
    });
  };
  timeShow = (d) => {
    return moment(d).utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
  };
  onClick = (temp) => {
    const content = (
      <>
        <br />
        <h3>租户名称: &nbsp; {temp.tenantName}</h3>
      </>
    );
    if (temp.relId) {
      Modal.confirm({
        title: "请确认退出租户信息!",
        content,
        onOk: async () => {
          this.handleDelTenant(temp);
        },
      });
    } else {
      Modal.confirm({
        title: "请确认加入租户信息!",
        content,
        onOk: async () => {
          this.handleAddTenant(temp);
        },
      });
    }
  };
  // 添加租户
  handleAddTenant = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: "userManage/handleSaveUser",
      opt: {
        tenantId: val.id,
        identifyId: this.state.userInfo.id,
        userDesc: this.state.userInfo.userDesc,
        userCode: this.state.userInfo.userCode,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`已提交申请，审核通过后即可进入新租户!`);
          this.getTenantList(this.state.userInfo);
        } else {
          message.error(res?.data?.message || `提交申请失败，请重新尝试!`);
        }
      },
    });
  };
  // 删除租户
  handleDelTenant = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: "userManage/handleDelUser",
      opt: {
        userId: val.relId,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`删除成功!`);
          this.getTenantList(this.state.userInfo);
        } else {
          message.error(res?.data?.message || `删除失败，请重新尝试!`);
        }
      },
    });
  };
  render() {
    const {
      isModalVisible,
      tenantList,
      defaultValue,
      delUserVisible,
      createVisible,
      isDeatil,
      dataSource,
      currentDetailData,
      modalTitle,
      userInfo,
    } = this.state;
    const dateFormat = "YYYY/MM/DD";
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
        title: "序号",
        key: "id",
        textWrap: "word-break",
        ellipsis: true,
        fixed: "left",
        render: (text, record, index) => (
          <>
            <span>{index + 1}</span>
          </>
        ),
      },
      {
        title: "账号",
        textWrap: "word-break",
        ellipsis: true,
        fixed: "left",
        dataIndex: "username",
        key: "username",
      },
      {
        title: "姓名",
        textWrap: "word-break",
        ellipsis: true,
        dataIndex: "nickName",
        key: "nickName",
      },
      // {
      //   title: "性别",
      //   textWrap: "word-break",
      //   ellipsis: true,
      //   dataIndex: "gender",
      //   key: "gender",
      //   render: (text, record) => (
      //     <>
      //       <span>{record?.gender == 0 ? "男" : "女"}</span>
      //     </>
      //   ),
      // },
      {
        title: "手机号",
        textWrap: "word-break",
        ellipsis: true,
        dataIndex: "phoneNumber",
        key: "phoneNumber",
      },
      {
        title: "邮箱",
        textWrap: "word-break",
        ellipsis: true,
        dataIndex: "emailAddress",
        key: "emailAddress",
      },
      {
        title: "邀请码",
        textWrap: "word-break",
        ellipsis: true,
        dataIndex: "sourceCode",
        key: "sourceCode",
      },
      // {
      //   title: "被邀请码",
      //   textWrap: "word-break",
      //   ellipsis: true,
      //   dataIndex: "userStatus",
      //   key: "userStatus",
      // },
      {
        title: "操作",
        textWrap: "word-break",
        ellipsis: true,
        key: "updatedTime",
        fixed: "right",
        render: (text, record) => (
          <>
            <Button
              size="small"
              type="primary"
              onClick={() => this.showFormModal(record, "detail")}
            >
              查看
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              size="small"
              type="primary"
              onClick={() => this.showFormModal(record, "edit")}
            >
              编辑
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              size="small"
              type="danger"
              onClick={() => this.showFormModal(record, "del")}
            >
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <div>
        <Card className={cx("searchForm")} title="身份管理(内部)">
          <Form
            {...formItemLayout}
            ref={this.searchFormRef}
            layout="inline"
            name="control-ref"
            onFinish={this.searchUserists}
          >
            {/* <Form.Item name="username" label="账号">
              <Input />
            </Form.Item> */}
            <Form.Item name="phoneNumber" label="手机号">
              <Input />
            </Form.Item>
            {/* <Form.Item name="member" label="会员">
              <Select allowClear>
                <Option value="all">全部</Option>
                <Option value="member">会员</Option>
                <Option value="other">非会员</Option>
              </Select>
            </Form.Item> */}
            <Form.Item {...tailLayout}>
              <Button type="primary" htmlType="submit">
                查询
              </Button>
              <Button
                htmlType="button"
                style={{ margin: "0 8px" }}
                onClick={this.onReset}
              >
                清空
              </Button>
            </Form.Item>
          </Form>
        </Card>
        <Card className={cx("userLists")}>
          <Button
            className={cx("addUserBtn")}
            onClick={this.handleAddVisible}
            type="primary"
          >
            新增
          </Button>
          <Table
            scroll={{ x: true }}
            rowKey={(record) => record.id}
            dataSource={dataSource.dataList}
            columns={columns}
            pagination={false}
          />
          <Pagination
            style={{ marginTop: '10px'}}
            showSizeChanger
            scroll={{ x: true }}
            onChange={this.changePage}
            defaultCurrent={dataSource.currentPage}
            total={dataSource.total}
          />
        </Card>

        <Modal
          className={cx("userInfoModal")}
          title={modalTitle}
          width={800}
          visible={isModalVisible}
          footer={
            !isDeatil
              ? [
                <Button onClick={this.handleCancel}> 取消 </Button>,
                <Button
                  key="submit"
                  type="primary"
                  onClick={this.handleUserInfo}
                >
                  确认
                </Button>,
              ]
              : null
          }
          onCancel={this.handleCancel}
        >
          {isDeatil ? (
            <Descriptions column={2}>
              <Descriptions.Item label="账号">
                {userInfo.username}
              </Descriptions.Item>
              <Descriptions.Item label="姓名">
                {userInfo.nickName}
              </Descriptions.Item>
              <Descriptions.Item label="手机号">
                {userInfo.phoneNumber}
              </Descriptions.Item>
              <Descriptions.Item label="邮箱">
                {userInfo.emailAddress}
              </Descriptions.Item>
              {/* <Descriptions.Item label="性别">
                {userInfo.gender == 0 ? "男" : "女"}
              </Descriptions.Item>
              <Descriptions.Item label="邀请码">
                {userInfo.sourceCode}
              </Descriptions.Item>
              <Descriptions.Item label="出生日期">
                {userInfo.birthday}
              </Descriptions.Item> */}
              <Descriptions.Item label="备注">
                {userInfo?.userDesc?.remark}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <div>
              <Form
                {...formItemLayout}
                ref={this.userFormRef}
                initialValues={userInfo}
                layout="inline"
                onFinish={this.onFinish}
              >
                <Form.Item
                  name="username"
                  label="账号"
                  rules={[
                    {
                      required: true,
                      message: "请输入账号",
                    },
                   
                  ]}
                >
                  <Input/>
                </Form.Item>
                <Form.Item
                  name="nickName"
                  label="姓名"
                  rules={[
                    {
                      required: false,
                      message: "请输入姓名",
                    },
                  ]}
                >
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
                </Form.Item>
                <Form.Item
                  name="birthday"
                  label="出生日期"
                  rules={[
                    {
                      required: true,
                      message: "请输入出生日期",
                    },
                  ]}
                >
                  <DatePicker
                    format={dateFormat}
                    placeholder="请输入出生日期"
                  />
                </Form.Item> */}
                <Form.Item
                  name="sourceCode"
                  label="邀请码"
                  rules={[
                    {
                      required: true,
                      message: "请输入邀请码",
                    },
                  ]}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  name="phoneNumber"
                  label="手机号"
                  rules={[
                    {
                      required: true,
                      message: "请输入手机号",
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
                      type: "email",
                      message: "这不是个正确的邮箱",
                    },
                    {
                      required: false,
                      message: "请确认邮箱",
                    },
                  ]}
                >
                  <Input placeholder="请输入邮箱" />
                </Form.Item>
                <Form.Item name="remark" label="备注">
                  <TextArea rows={4} placeholder="请输入备注" />
                </Form.Item>
              </Form>
              <Divider />
              <div>租户列表</div>
              <div className={cx("tenantList")}>
                {tenantList.map((temp, index) => {
                  return (
                    <Card
                      className={cx("tenantCard")}
                      title={temp.tenantName}
                      onClick={() => this.onClick(temp)}
                      key={temp.id}
                    >
                      <p>{temp.createdTime1}</p>
                      <p>{temp.relId && <Tag color="magenta">已关联</Tag>}</p>
                    </Card>
                  );
                })}
              </div>
            </div>
          )}
        </Modal>
        <Modal
          title="删除用户"
          visible={delUserVisible}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={this.handleDelUserInfo}
            >
              确认
            </Button>,
            <Button onClick={this.handleCancel}>取消</Button>,
          ]}
          onOk={this.handleDelUserInfo}
          onCancel={this.handleCancel}
        >
          <div>即将删除{userInfo.username}!</div>
        </Modal>
        <CreateModal
          visible={createVisible}
          submitMap={this.handleAddSubmit}
          onCancel={this.handleCancel}
          currentDetailData={currentDetailData}
        />
      </div>
    );
  }
}
