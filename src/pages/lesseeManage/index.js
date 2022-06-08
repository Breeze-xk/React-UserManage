// 租户注册

import React, { Component, PureComponent } from "react";
import { connect } from "dva";
// import styles from "./index.less";
import styles from "./index.module.less";
import classnames from "classnames/bind";
const cx = classnames.bind(styles);
import {
  Card,
  Table,
  Descriptions,
  Pagination,
  Form,
  Modal,
  Input,
  Radio,
  message,
  Select,
  Row,
  Col,
  Tree,
  Checkbox,
  Button,
  Tag,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
import moment from "moment";

const timeShow = (d) => {
  return moment(d).utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
};

import CreateModal from "./component/createModal";
import EditModal from "./component/editModal";
import { setTreeData } from "../../utils/index";
const mapState2Props = ({ global, lesseeManage }) => ({ global, lesseeManage });

@connect(mapState2Props)
export default class LesseeManage extends Component {
  searchFormRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      id: null,
      isModalVisible: false, // 租户弹窗状态
      isDeatil: false,
      editVisible: false,
      dataSource: {
        dataList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }, //用户List
      userSource: {
        dataList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }, //未审核用户List
      modalTitle: "", //租户弹窗title
      delLesseeVisible: false, //删除弹窗状态
      lesseeInfo: "", //当前租户信息
      createVisible: false, // 新增弹窗
      currentDetailData: {}, //往组件弹窗传参
      editInfo: {},
      lesseeLists: [],
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      examineVisible: false,
    };
  }

  componentDidMount() {
    // this.searchFormRef.current.setFieldsValue({
    //   review: 0,
    // });
    this.searchLesseeists();
  }
  // 查询表单重置
  onReset = () => {
    const { dataSource } = this.state;
    console.log('datasource===',dataSource)
    // this.searchFormRef.current.resetFields();
    // this.searchLesseeists();
    this.searchFormRef.current.setFieldsValue({
      phoneNumber: '',
    });
    this.searchUserList(this.searchFormRef.current.getFieldsValue())
    
  };
  // 查询租户
  searchLesseeists = (values) => {
    const { dispatch } = this.props;
    const { dataSource,id } = this.state;
    dispatch({
      type: "lesseeManage/getLesseeLists",
      opt: {
        // currentPage: 1,
        currentPage: !values?.phoneNumber ? dataSource.currentPage || 1 : 1,
        pageSize: 10000,
      },
      callback: (res) => {
        const lesseeLists = res?.data?.data?.list;
        console.log("租户列表", lesseeLists);
        this.setState(
          {
            lesseeLists: lesseeLists,
            selectedKeys: id==null?[lesseeLists?.[0]?.id]:[id],
            selectedItem: lesseeLists?.[0],
          },
          () => {
            this.searchUserList(this.searchFormRef.current.getFieldsValue());
          }
        );
      },
    });
  };
  // 查询用户
  searchUserList = (values) => {
    const { dispatch } = this.props;
    const { dataSource, selectedKeys } = this.state;
    console.log("values?.phoneNumber,",values?.phoneNumber)
    if (selectedKeys[0]) {
      dispatch({
        type: "lesseeManage/getUserInfoList",
        opt: {
          currentPage: !values?.phoneNumber ? dataSource.currentPage || 1 : 1,
          pageSize: dataSource.pageSize,
          tenantId: selectedKeys?.[0],
          ...this.searchFormRef.current.getFieldValue(),
        },
        callback: (res) => {
          const dataSource = res?.data?.data;
          console.log("dataSourcedataSourcedataSource::::::", res?.data);
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
    }
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
    });
    this.searchUserList(this.searchFormRef.current.getFieldsValue());
  };
  // 展示弹窗
  showFormModal(type) {
    const data = {
      id: this.state.selectedKeys[0],
    };
    const { dispatch } = this.props;
    dispatch({
      type: "lesseeManage/getLesseeInfo",
      opt: {
        tenantId: data.id,
        id: data.id,
      },
      callback: (res) => {
        const dataSource = res?.data?.data;
        if (type == "edit") {
          this.setState({
            modalTitle: "编辑租户",
            editVisible: true,
            editInfo: dataSource,
          });
        } else if (type == "detail") {
          this.setState({
            isModalVisible: true,
            isDeatil: true,
            lesseeInfo: dataSource,
            modalTitle: "查看详情",
          });
        } else if (type == "del") {
          this.setState({
            delLesseeVisible: true,
            modalTitle: "删除租户",
            lesseeInfo: dataSource,
          });
        }
        // if (!this.state.isDeatil) {
        //   dataSource["birthday"] = moment(dataSource?.birthday);
        // }
      },
    });
  }
  // 新增租户
  handleAddSubmit = async (values) => {
    const { dispatch } = this.props;
    console.log("handleAddSubmit:::", values);
    const { tenantName, tenantCode, remark } = values;
    const content = (
      <>
        <br />
        <h3>租户名称: &nbsp; {tenantName}</h3>
        <br />
        <h3>租户code: &nbsp; {tenantCode}</h3>
        <br />
        <h3>租户备注: &nbsp; {remark}</h3>
        <br />
      </>
    );
    // Modal.confirm({
    //   title: "请确认创建团队信息!",
    //   content,
    //   onOk: async () => {
        const res = await dispatch({
          type: "lesseeManage/saveLesseeInfo",
          opt: {
            tenantCode: tenantCode,
            tenantName: tenantName,
            tenantDesc: {
              remark: remark,
            },
          },
          callback: (res) => {
            console.log(res);
            if (res.data.status == 200) {
              message.success(res?.data?.message ||  "创建租户成功");
              this.handleCancel();
              this.searchLesseeists();
            } else {
              message.error(res?.data?.message || `添加失败，请重新尝试!`);
            }
          },
        });
        console.log("res:::", res);
    //   },
    // });
  };
  handleAddVisible = () => {
    this.setState({
      createVisible: true,
      // currentDetailData:
    });
  };
  // 删除租户
  handleDelLesseeInfo = () => {
    // const { lesseeInfo } = this.state;
    // const { dispatch } = this.props;
    // dispatch({
    //   type: "lesseeManage/deleteLesseeInfo",
    //   opt: {
    //     tenantId: lesseeInfo.id,
    //   },
    //   callback: (res) => {
    //     this.searchLesseeists(this.searchFormRef.current.getFieldsValue());
    //   },
    // });
    this.handleCancel();
  };
  // 详情弹窗取消
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      delLesseeVisible: false,
      isDeatil: false,
      createVisible: false,
      editVisible: false,
      examineVisible: false,
      editInfo: {},
    });
  };

  handleEdit = async (values) => {
    const { dispatch } = this.props;
    console.log("handleAddSubmit:::", values);
    const { tenantName, tenantCode, remark } = values;
    const content = (
      <>
        <br />
        <h3>租户名称: &nbsp; {tenantName}</h3>
        <br />
        <h3>租户code: &nbsp; {tenantCode}</h3>
        <br />
        <h3>租户备注: &nbsp; {remark}</h3>
        <br />
      </>
    );
    // Modal.confirm({
    //   title: "请确认创建团队信息!",
    //   content,
    //   onOk: async () => {
        const res = await dispatch({
          type: "lesseeManage/modifyLesseeInfo",
          opt: {
            id: this.state.editInfo.id,
            tenantCode: tenantCode,
            tenantName: tenantName,
            tenantDesc: {
              remark: remark,
            },
          },
          callback: (res) => {
            console.log(res);
            if (res.data.status == 200) {
              message.success("修改租户成功");
              this.handleCancel();
              this.searchLesseeists();
            } else {
              message.error(`修改失败，请重新尝试!`);
            }
          },
        });
        console.log("res:::", res);
    //   },
    // });
  };

  onExpand = (expandedKeysValue) => {
    this.setState({
      expandedKeys: expandedKeysValue,
      autoExpandParent: false,
    });
  };

  onCheck = (checkedKeysValue) => {
    this.setState({ checkedKeys: checkedKeysValue });
  };
  // 点击租户
  onSelect = (selectedKeysValue, info) => {
    console.log('selectedKeysValue-----', selectedKeysValue);
    console.log('info-----', info);
    this.setState(
      { selectedKeys: selectedKeysValue, selectedItem: info.node ,id: info.node.id},
      () => {
        this.searchUserList();
      }
    );
  };
  showExamineModal() {
    this.setState({
      examineVisible: true,
    });
    this.queryUserList();
  }
  // 查询未审核用户List
  queryUserList = () => {
    const { dispatch } = this.props;
    const { userSource, selectedKeys } = this.state;
    dispatch({
      type: "lesseeManage/getUserInfoList",
      opt: {
        currentPage: userSource.currentPage,
        pageSize: userSource.pageSize,
        tenantId: selectedKeys?.[0],
        userStatus: 1,
      },
      callback: (res) => {
        const dataSource = res?.data?.data;
        this.setState({
          userSource: {
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
  changePage2 = (current, pageSize) => {
    let dataSource = this.state.userSource;
    if (current) {
      dataSource["currentPage"] = current;
    } else {
      dataSource["currentPage"] = 1;
    }
    dataSource["pageSize"] = pageSize;
    this.setState(
      {
        userSource: dataSource,
      },
      () => {
        this.queryUserList();
      }
    );
  };
  // 通过
  handleAddUser = (record) => {
    const { dispatch } = this.props;
    const { userSource, selectedKeys } = this.state;
    dispatch({
      type: "lesseeManage/accessUser",
      opt: {
        comment: {},
        tenantId: selectedKeys?.[0],
        userId: record.id,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`添加成功!`);
          this.queryUserList();
          this.searchUserList();
        } else {
          message.error(`添加失败，请重新尝试!`);
        }
      },
    });
  };
  // 拒绝
  handleDelUser = (record) => {
    const { dispatch } = this.props;
    const { userSource, selectedKeys } = this.state;
    dispatch({
      type: "lesseeManage/delUser",
      opt: {
        userId: record.id,
      },
      callback: (res) => {
        console.log("del", res);
        if (res.data.status == 200) {
          message.success(`删除成功!`);
          this.queryUserList();
        } else {
          message.error(`删除失败，请重新尝试!`);
        }
      },
    });
  };

  render() {
    const {
      isModalVisible,
      delLesseeVisible,
      createVisible,
      isDeatil,
      dataSource,
      currentDetailData,
      modalTitle,
      lesseeInfo,
      editVisible,
      expandedKeys,
      editInfo,
      checkedKeys,
      selectedKeys,
      autoExpandParent,
      lesseeLists,
      examineVisible,
      userSource,
    } = this.state;
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
      {
        title: "性别",
        dataIndex: "gender",
        key: "gender",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
        render: (text, record) => (
          <>
            <span>{record?.gender == 0 ? "男" : "女"}</span>
          </>
        ),
      },
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
    const column2 = [
      {
        title: "序号",
        key: "id",
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
        title: "邀请码",
        dataIndex: "sourceCode",
        key: "sourceCode",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
      },
      {
        title: "被邀请码",
        dataIndex: "userStatus",
        key: "userStatus",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
      },
      {
        title: "操作",
        key: "id",
        width: 200,
        fixed: "right",
        render: (text, record) => (
          <>
            <Button
              size="small"
              type="primary"
              onClick={() => {
                this.handleAddUser(record);
              }}
            >
              通过
            </Button>
            <Button
              size="small"
              type="danger"
              onClick={() => {
                this.handleDelUser(record);
              }}
            >
              拒绝
            </Button>
          </>
        ),
      },
    ];
    return (
      <div className={cx('lesseeManage')}>
        <Card
          title="租户管理"
          extra={
            <>
              <Button
                style={{ marginLeft: "10px" }}
                size="small"
                className={cx("addLesseeBtn")}
                onClick={this.handleAddVisible}
                type="primary"
              >
                新增
              </Button>
            </>
          }
        >
          <Row>
            <Col span={4}>
              <div className={cx("groupTreeCard")}>
                <Tree
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={this.onSelect}
                  selectedKeys={selectedKeys}
                  treeData={setTreeData(
                    lesseeLists,
                    "tenantName",
                    "parentTenantId"
                  )}
                />
              </div>
            </Col>
            <Col span={20} style={{ borderLeft: "1px solid #c4bcbc" }}>
              <div className={cx("table-box")}>
                <Button
                  size="small"
                  type="primary"
                  onClick={() => this.showFormModal("detail")}
                >
                  查看详情
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  size="small"
                  type="primary"
                  onClick={() => this.showExamineModal()}
                >
                  待审核
                </Button>
                <Button
                  style={{ marginLeft: "10px" }}
                  size="small"
                  type="primary"
                  onClick={() => this.showFormModal("edit")}
                >
                  编辑
                </Button>
                {/* <Button
                  style={{ marginLeft: "10px" }}
                  size="small"
                  type="primary"
                  danger
                  onClick={() => this.showFormModal("del")}
                >
                  删除
                </Button> */}
                <Form
                  {...formItemLayout}
                  ref={this.searchFormRef}
                  layout="inline"
                  name="control-ref"
                  onFinish={this.searchUserList}
                  style={{
                    margin: '15px 0'
                  }}
                >
                  {/* <Form.Item name="username" label="姓名">
                    <Input />
                  </Form.Item> */}
                  <Form.Item name="phoneNumber" label="手机号">
                    <Input />
                  </Form.Item>

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
                </Form>
                <Table
                  scroll={{ x: true }}
                  dataSource={dataSource.dataList}
                  columns={columns}
                  pagination={false}
                  rowKey={(record) => record.id}
                />
                <Pagination
                  style={{  marginTop: '10px'}}
                  showSizeChanger
                  scroll={{ x: true }}
                  onChange={this.changePage}
                  defaultCurrent={dataSource.currentPage}
                  total={dataSource.total}
                />
              </div>
            </Col>
          </Row>
        </Card>
        <Modal
          className={cx("lesseeInfoModal")}
          title={modalTitle}
          visible={isModalVisible}
          footer={
            !isDeatil
              ? [
                  <Button
                    key="submit"
                    type="primary"
                    onClick={this.handleLesseeInfo}
                  >
                    确认
                  </Button>,
                  <Button onClick={this.handleCancel}>取消</Button>,
                ]
              : null
          }
          onCancel={this.handleCancel}
        >
          {isDeatil ? (
            <Descriptions column={2}>
              <Descriptions.Item label="租户名">
                {lesseeInfo.tenantName}
              </Descriptions.Item>
              <Descriptions.Item label="姓名">
                {lesseeInfo.tenantCode}
              </Descriptions.Item>
              <Descriptions.Item label="备注">
                {lesseeInfo?.tenantDesc?.remark}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Form
              {...formItemLayout}
              initialValues={lesseeInfo}
              layout="inline"
              onFinish={this.onFinish}
            >
              <Form.Item
                name="tenantName"
                label="租户名"
                rules={[
                  {
                    required: true,
                    message: "请输入租户名",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                name="tenantCode"
                label="姓名"
                rules={[
                  {
                    required: true,
                    message: "请输入姓名",
                  },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item name="remark" label="备注">
                <TextArea rows={4} placeholder="请输入备注" />
              </Form.Item>
            </Form>
          )}
        </Modal>
        {/* <Modal
          title="删除租户"
          visible={delLesseeVisible}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={this.handleDelLesseeInfo}
            >
              确认
            </Button>,
            <Button onClick={this.handleCancel}>取消</Button>,
          ]}
          onOk={this.handleDelLesseeInfo}
          onCancel={this.handleCancel}
        >
          <div>即将删除{lesseeInfo.tenantName}!</div>
        </Modal> */}
        <Modal
          title="审核"
          visible={examineVisible}
          width={800}
          footer={[]}
          onCancel={this.handleCancel}
        >
          <Table
            scroll={{ x: true }}
            dataSource={userSource.dataList}
            columns={column2}
            pagination={false}
            rowKey={(record) => record.id}
          />
          <Pagination
            style={{  marginTop: '10px'}}
            showSizeChanger
            scroll={{ x: true }}
            onChange={this.changePage2}
            defaultCurrent={userSource.currentPage}
            total={userSource.total}
          />
        </Modal>
        <CreateModal
          visible={createVisible}
          submitMap={this.handleAddSubmit}
          onCancel={this.handleCancel}
          currentDetailData={currentDetailData}
        />
        <EditModal
          visible={editVisible}
          submitMap={this.handleEdit}
          onCancel={this.handleCancel}
          currentDetailData={editInfo}
        />
      </div>
    );
  }
}
