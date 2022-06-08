import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
// import styles from "./index.less";
import styles from './index.module.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import {
  Card,
  Layout,
  Table,
  Descriptions,
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
  Divider,
  Tag,
  Tooltip,
  Tree,
} from 'antd';
const { Option } = Select;
import moment from 'moment';
import { setTreeData } from '../../utils/index';
import CreateModal from './component/createModal';
import AddMember from './component/addMember';
import UserList from './component/userList';
import { qs } from '../../utils/index';

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
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
const timeShow = (d) => {
  return moment(d).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
};

const mapState2Props = ({ loading, organManage, global: { userInfo } }) => {
  return {
    loading,
    userInfo,
    busy:
      loading.effects['organManage/getOrganLists'] ||
      loading.effects['organManage/createOrgan'] ||
      loading.effects['organManage/getOrganInfo'] ||
      loading.effects['organManage/modifyOrganInfo'] ||
      loading.effects['organManage/deleteOrgan'] ||
      loading.effects['organManage/getOrganUserList'] ||
      loading.effects['organManage/addOrganUser'] ||
      loading.effects['organManage/deleteOrganUser'] ||
      false,
    ...organManage,
  };
};

@connect(mapState2Props)
export default class organManage extends Component {
  searchFormRef = React.createRef();
  myRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      // tenantId: 17,
      tenantId: '',
      isDeatil: false,
      organList: [], //机构List
      page: 1,
      total: '',
      createVisible: false,
      isEditOrgan: false,
      currentDetailData: {}, // 当前需要传递给子组件的数据，用于显示form表单初始值
      selectedRowKeys: [],
      selectedRows: [],
      detailVisible: false, //详情弹窗
      addMemberVisible: false, //添加成员
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      selectedItem: [],
      autoExpandParent: true,
      organUserList: {
        total: 0,
        current: 1,
        pageSize: 10,
        data: [],
      }, //机构下用户
    };
  }

  componentDidMount() {
    this.searchFormRef.current.setFieldsValue({});
    this.setState(
      {
        tenantId: sessionStorage.getItem('tenantId'),
      },
      () => {
        this.getOrganLists();
      }
    );
  }
  // 查询表单重置
  onReset = () => {
    this.searchFormRef.current.resetFields();
    this.searchUserists();
  };
  // 查询机构
  getOrganLists = () => {
    const { dispatch } = this.props;
    console.log('this.state.page::::::::', this.state.page);
    dispatch({
      type: 'organManage/getOrganLists',
      opt: {
        tenantId: this.state.tenantId,
        currentPage: this.state.page,
        pageSize: 100000,
      },
      callback: (res) => {
        this.setState({
          organList: res?.data?.data?.list,
          total: res?.data?.data?.totalCount,
          selectedKeys: [res?.data?.data?.list?.[0]?.id],
          selectedItem: res?.data?.data?.list?.[0],
        });
        this.searchUserists();
      },
    });
  };
  // 查询机构下用户列表
  searchUserists = () => {
    const { dispatch } = this.props;
    const { tenantId, selectedKeys, organUserList } = this.state;
    console.log('organUserList["current"]::', organUserList['current']);
    if (selectedKeys[0]) {
      dispatch({
        type: 'organManage/getOrganUserList',
        opt: {
          tenantId: tenantId,
          organizationId: selectedKeys[0],
          currentPage: organUserList['current'],
          pageSize: organUserList['pageSize'],
          ...this.searchFormRef.current.getFieldsValue(),
        },
        callback: (res) => {
          const organUserList = this.state.organUserList;
          organUserList['total'] = res?.data?.data?.totalCount;
          organUserList['data'] = res?.data?.data?.list;
          organUserList['current'] = res?.data?.data?.pagination?.currentPage;
          organUserList['pageSize'] = res?.data?.data?.pagination?.pageSize;
          this.setState({
            organUserList: organUserList,
          });
        },
      });
    }
  };
  onRef(ref) {
    this.CreateModal = ref;
  }

  // 分页
  handlePageChange = (pages) => {
    const organUserList = this.state.organUserList;
    organUserList['current'] = pages;

    this.setState(
      {
        organUserList: organUserList,
      },
      () => {
        this.searchUserists();
      }
    );
  };
  createOrgan = (val) => {
    this.setState({
      isEditOrgan: val == 'edit' ? true : false,
      isEditOrgan: val == 'edit' ? true : false,
      createVisible: true,
    });
  };
  // 新增机构
  handleSubmit = async (values) => {
    const { dispatch } = this.props;
    const { isEditOrgan } = this.state;
    const { organizationName, remark, parentID, organizationId } = values;
    const content = (
      <>
        <br />
        <h3>机构名称: &nbsp; {organizationName}</h3>
        {/* {!isEditOrgan &&
          <br />}
        {!isEditOrgan &&
          <h3>机构code: &nbsp; {groupCode}</h3>} */}
        <br />
        <h3>机构备注: &nbsp; {remark}</h3>
        <br />
      </>
    );
    if (!isEditOrgan) {
      // Modal.confirm({
      //   title: "请确认创建机构信息!",
      //   content,
      //   onOk: async () => {
      //     console.log(this)
      const res = await dispatch({
        type: 'organManage/createOrgan',
        opt: {
          organizationName,
          tenantId: this.state.tenantId,
          parentOrganizationId: parentID || 0,
          parentOrganizationCode: 'root',
          organizationParants: '',
          organizationDesc: {
            remark,
          },
        },
        callback: (res) => {
          if (res?.data?.status == 200) {
            message.success('创建机构成功');
            this.handleCancel();
            this.getOrganLists();
          } else {
            message.error(res?.data?.message || "创建机构失败!");
          }
        },
      });
      //   },
      // });
    } else {
      // Modal.confirm({
      //   title: "请确认编辑机构信息!",
      //   content,
      //   onOk: async () => {
      const res = await dispatch({
        type: 'organManage/modifyOrganInfo',
        opt: {
          organizationName,
          tenantId: this.state.tenantId,
          parentOrganizationId: parentID || 0,
          parentOrganizationCode: 'root',
          organizationParants: '',
          id: organizationId,
          organizationDesc: {
            remark,
          },
        },
        callback: (res) => {
          if (res.data.status == 200) {
            message.success('修改机构成功');
            this.handleCancel();
            this.getOrganLists();
          } else {
            message.error(res?.data?.message || "修改机构失败!");
          }

        },
      });
      //   },
      // });
    }
  };
  // 删除机构
  deleteOrgan = (val) => {
    console.log('aaa', val);
    const { dispatch } = this.props;
    dispatch({
      type: 'organManage/deleteOrgan',
      opt: {
        tenantId: this.state.tenantId,
        organizationId: val,
      },
      callback: (res) => {
        if (res?.data?.status == 200) {
          message.success('删除成功!');
          this.handleCancel();
          this.getOrganLists();
        } else {
          message.error(res?.data?.message || '删除失败!');
          this.handleCancel();
        }
      },
    });
  };

  // 编辑机构显示
  editOrgan = () => {
    this.createOrgan('edit');
  };
  // 新增成员
  showAddMemberModal = () => {
    this.setState({
      addMemberVisible: true,
    });
  };
  // 新增成员
  addOrganMember = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'organManage/addOrganUser',
      opt: {
        tenantId: this.state.tenantId,
        organizationId: this.state.selectedKeys?.[0],
        userIds: val,
      },
      callback: (res) => {
        if (res?.data?.status == 200) {
          message.success('添加成功!');
          this.handleCancel();
          this.searchUserists();
        } else {
          message.error(res?.data?.message || '添加失败!');
        }
      },
    });
  };
  handleCancel = () => {
    this.setState({
      createVisible: false,
      detailVisible: false,
      deleteVisible: false,
      addMemberVisible: false,
      currentDetailData: {},
    });
  };
  //批量删除成员
  handleDel = (val) => {
    const { dispatch } = this.props;
    const { selectedRows, selectedRowKeys, selectedKeys, tenantId } = this.state;
    const content = (
      <>
        {selectedRows.map((item, index) => {
          return <span key={index}>{item.username} </span>;
        })}
      </>
    );
    if (selectedRows && selectedRows.length > 0) {
      Modal.confirm({
        title: '请确认删除信息!',
        content,
        onOk: async () => {
          const res = await dispatch({
            type: 'organManage/deleteOrganUser',
            opt: {
              tenantId: tenantId,
              userIds: selectedRowKeys,
              organizationId: selectedKeys?.[0],
            },
            callback: () => {
              if (res?.data.status == 200) {
                message.success('删除成功!');
                this.setState(
                  {
                    selectedRowKeys: [],
                    selectedRows: [],
                  },
                  () => {
                    this.searchUserists();
                  }
                );
              } else {
                message.error(res?.data?.message || '删除失败!');
                this.handleCancel();
              }

            },
          });
        },
      });
    } else {
      message.error('请选择要删除的成员!');
    }
  };
  // 详情
  showDetailModal = async (record) => {
    const { dispatch } = this.props;
    const res = await dispatch({
      type: 'organManage/getOrganInfo',
      opt: {
        organizationId: record.id,
      },
      callback: (res) => {
        this.setState({
          detailVisible: true,
          currentDetailData: res?.data?.data,
        });
      },
    });
  };
  handleDetailSubmit = () => {
    this.handleCancel();
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
  // 点击机构
  onSelect = (selectedKeysValue, info) => {
    console.log(this.state.organUserList);

    console.log(
      'selectedKeys',
      this.state.selectedKeys,
      this.state.selectedItem,
      this.state.selectedRows
    );
    this.setState(
      {
        selectedKeys: selectedKeysValue,
        selectedItem: info.node,
        selectedRows: [],
        selectedRowKeys: [],
      },
      () => {
        const organUserList = this.state.organUserList;
        organUserList['current'] = 1;

        this.searchUserists();
      }
    );
  };

  render() {
    const {
      tenantId,
      organList,
      organUserList,
      createVisible,
      isEditOrgan,
      addMemberVisible,
      currentDetailData,
      selectedItem,
      selectedRowKeys,
      expandedKeys,
      checkedKeys,
      selectedKeys,
      autoExpandParent,
    } = this.state;
    const { busy } = this.props;
    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows,
        });
      },
    };
    return (
      <div className={cx('organManage')}>
        <Card
          title="机构管理"
          extra={
            <>
              <Button className={cx('organizationBtn')} type="primary" onClick={this.createOrgan}>
                创建机构
              </Button>
              <Button
                className={cx('organizationBtn')}
                style={{ marginLeft: '8px' }}
                type="primary"
                onClick={this.editOrgan}
              >
                编辑机构
              </Button>
            </>
          }
        >
          <Row>
            <Col span={6}>
              <div className={cx('organizationTreeCard')}>
                <Tree
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={this.onSelect}
                  selectedKeys={selectedKeys}
                  treeData={setTreeData(organList, 'organizationName', 'parentOrganizationId')}
                />
              </div>
            </Col>
            <Col span={18} style={{ borderLeft: '1px solid #c4bcbc' }}>
              <div className={cx('table-box')}>
                <Card
                  // title="机构成员"
                  extra={
                    <Form
                      {...formItemLayout}
                      ref={this.searchFormRef}
                      layout="inline"
                      name="control-ref"
                      onFinish={this.searchUserists}
                    >
                      <Form.Item name="nickName" label="姓名">
                        <Input style={{width: '120px'}}  />
                      </Form.Item>
                      <Form.Item name="phoneNumber" label="手机号">
                        <Input style={{width: '170px'}}/>
                      </Form.Item>
                      <Button type="primary" htmlType="submit">
                        查询
                      </Button>
                      <Button
                        htmlType="button"
                        style={{ marginLeft: '8px' }}
                        onClick={this.onReset}
                      >
                        清空
                      </Button>
                      <Button
                        className={cx('organizationBtn')}
                        style={{ marginLeft: '8px' }}
                        type="primary"
                        danger
                        onClick={this.handleDel}
                      >
                        批量删除
                      </Button>
                      <Button
                        className={cx('organizationBtn')}
                        style={{ marginLeft: '8px' }}
                        type="primary"
                        onClick={this.showAddMemberModal}
                      >
                        添加成员
                      </Button>
                    </Form>
                  }
                >
                  <UserList
                    selectedRowKeys={selectedRowKeys}
                    rowSelection={rowSelection}
                    dataSource={organUserList}
                    handlePageChange={this.handlePageChange}
                    searchUserists={this.searchUserists}
                  />
                </Card>
              </div>
            </Col>
          </Row>
        </Card>
        <CreateModal
          ref={this.myRef}
          visible={createVisible}
          isEditOrgan={isEditOrgan}
          submitMap={this.handleSubmit}
          onCancel={this.handleCancel}
          deleteOrgan={this.deleteOrgan}
          dataList={organList}
          _this={this}
        />
        <AddMember
          tenantId={tenantId}
          visible={addMemberVisible}
          submitMap={this.addOrganMember}
          selectedItem={selectedItem}
          onCancel={this.handleCancel}
        />
      </div>
    );
  }
}
