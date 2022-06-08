// 角色管理

import React, { Component, PureComponent } from "react";
import { connect } from "dva";
import styles from "./index.module.less";
import classnames from "classnames/bind";
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
} from "antd";
const { Option } = Select;
import moment from "moment";
import { qs, setTreeData } from "../../utils/index";
import CreateModal from "./component/createModal";
// import AddPermission from "./component/addPermission";
import PermissionList from "./component/permissionList";

const formItemLayout = {
  labelCol: {
    xs: {
      span: 24,
    },
    sm: {
      span: 7,
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
  return moment(d)
    .utcOffset(8)
    .format("YYYY-MM-DD HH:mm:ss");
};

const mapState2Props = ({ global, roleManage }) => ({ global, roleManage });

@connect(mapState2Props)
export default class roleManage extends Component {
  searchFormRef = React.createRef();
  formRef = React.createRef();
  constructor(props) {
    super(props);
    this.state = {
      // tenantId: 10,
      tenantId: Number(qs(props.location?.search).tenantId),
      isDeatil: false,
      page: 1,
      total: "",
      createVisible: false,
      isEditRole: false,
      currentDetailData: {}, // 当前需要传递给子组件的数据，用于显示form表单初始值
      selectedRowKeys: [],
      selectedRows: [],
      addRoleVisible: false, // 添加角色弹窗
      detailVisible: false, //详情弹窗
      addPermissionVisible: false, //添加权限
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      selectedItem: [],
      autoExpandParent: true,
      expandedKeysPer: [],
      checkedKeysPer: [],
      selectedKeysPer: [],
      selectedItemPer: [],
      autoExpandParentPer: true,
      permissionList: {
        total: 0,
        current: 1,
        pageSize: 1000,
        data: [],
      }, //团队下用户
      roleId: "", //被删除角色id
      roleList: [], //角色列表
    };
  }

  componentDidMount() {
    this.setState({
      tenantId:sessionStorage.getItem('tenantId')
    },()=>{
      this.getRoleLists();
    })
    
  }
  // 查询表单重置
  onReset = () => {
    this.searchFormRef.current.resetFields();
  };
  // 查询角色列表
  getRoleLists = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "roleManage/getRoleLists",
      opt: {
        tenantId: this.state.tenantId,
        currentPage: this.state.page,
        pageSize: 100000,
      },
      callback: (res) => {
        this.setState({
          roleList: res?.data?.data?.list,
          total: res?.data?.data?.totalCount,
          selectedKeys: [res?.data?.data?.list?.[0]?.id],
          selectedItem: res?.data?.data?.list?.[0],
        });
        this.searchPermissionList();
      },
    });
  };
  // 查询角色下权限列表
  searchPermissionList = () => {
    const { dispatch } = this.props;
    const { tenantId, selectedKeys, permissionList } = this.state;
    if (selectedKeys[0]) {
      dispatch({
        type: "roleManage/getPermissionList",
        opt: {
          tenantId: tenantId,
          roleId: selectedKeys[0],
          currentPage: permissionList["current"],
          pageSize: 1000,
        },
        callback: (res) => {
          const permissionList = this.state.permissionList;
          permissionList["total"] = res?.data?.data?.totalCount;
          permissionList["data"] = res?.data?.data?.list;
          let Keys = [];
          permissionList['data'].map(item=>{
            if(item.relId) {
              Keys.push(item.id)
            }
          })
          this.setState({
            permissionList: permissionList,
            selectedRowKeys: [],
            checkedKeysPer: Keys,
          });
        },
      });
    }
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
  createRole = (val) => {
    this.setState({
      isEditRole: val == "edit" ? true : false,
      createVisible: true,
    });
  };
  // 新增角色
  handleSubmit = async (values) => {
    const { dispatch } = this.props;
    const { isEditRole } = this.state;
    const { roleName, remark, parentID, roleId } = values;
    const content = (
      <>
        <br />
        <h3>角色名称: &nbsp; {roleName}</h3>
        <br />
        <h3>角色备注: &nbsp; {remark}</h3>
        <br />
      </>
    );
    if (!isEditRole) {
      // Modal.confirm({
      //   title: "请确认创建角色信息!",
      //   content,
      //   onOk: async () => {
          const res = await dispatch({
            type: "roleManage/createRole",
            opt: {
              roleName,
              tenantId: this.state.tenantId,
              parentRoleId: parentID || 0,
              RoleParants: "",
              roleDesc: {
                remark,
              },
            },
            callback: (res) => {
              if (res?.data?.status == 200) {
                message.success("创建角色成功");
                this.handleCancel();
                this.getRoleLists();
              } else {
                message.error(res?.data?.message || '创建角色失败!');
              }
            },
          });
      //   },
      // });
    } else {
      // Modal.confirm({
      //   title: "请确认编辑角色信息!",
      //   content,
      //   onOk: async () => {
          const res = await dispatch({
            type: "roleManage/modifyRoleInfo",
            opt: {
              roleName,
              tenantId: this.state.tenantId,
              parentRoleId: parentID || 0,
              roleParants: "",
              id: roleId,
              roleDesc: {
                remark,
              },
            },
            callback: (res) => {
              if (res?.data?.status == 200) {
                message.success("修改角色成功");
                this.handleCancel();
                this.getRoleLists();
              } else {
                message.error(res?.data?.message || '修改角色失败!');
              }
            },
          });
      //   },
      // });
    }
  };
  // 删除团队
  delRole = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: "roleManage/delRole",
      opt: {
        tenantId: this.state.tenantId,
        roleId: val,
      },
      callback: (res) => {
        if (res?.data.status == 200) {
          message.success("删除成功!");
          this.handleCancel();
          this.getRoleLists();
        } else {
          message.error(res?.data?.message || "删除失败!");
        }
      },
    });
  };

  // 编辑团队显示
  editRole = () => {
    this.createRole("edit");
  };
  // 新增权限
  showAddPermissionModal = () => {
    // this.setState({
    //   addPermissionVisible: true,
    // });
  };
  // 新增权限
  addRolePermission = (val) => {
    // const { dispatch } = this.props;
    // console.log('val::::', val);
    // console.log('this.state.selectedKeys[0]:', this.state.selectedKeys[0]);
    // dispatch({
    //   type: "roleManage/addRolePermission",
    //   opt: {
    //     tenantId: this.state.tenantId,
    //     roleId: this.state.selectedKeys[0],
    //     permissionIds: val,
    //   },
    //   callback: (res) => {
    //     if (res?.status == 200) {
    //       message.success("添加成功!");
    //       this.handleCancel();
    //       this.searchPermissionList();
    //     }
    //   },
    // });
  };
  handleCancel = () => {
    this.setState({
      createVisible: false,
      detailVisible: false,
      deleteVisible: false,
      addRoleVisible: false,
      addPermissionVisible: false,
      currentDetailData: {},
    });
  };
  //批量删除权限
  // handleDel = (val) => {
  //   const { dispatch } = this.props;
  //   const {
  //     selectedRows,
  //     selectedRowKeys,
  //     selectedKeys,
  //     tenantId,
  //   } = this.state;
  //   const content = (
  //     <>
  //       {selectedRows.map((item, index) => {
  //         return <span key={index}>{item.permissionName} </span>;
  //       })}
  //     </>
  //   );
  //   if (selectedRows && selectedRows.length > 0) {
  //     Modal.confirm({
  //       title: "请确认删除信息!",
  //       content,
  //       onOk: async () => {
  //         const res = await dispatch({
  //           type: "roleManage/deleteRolePermission",
  //           opt: {
  //             tenantId: tenantId,
  //             permissionIds: selectedRowKeys,
  //             roleId: selectedKeys?.[0],
  //           },
  //           callback: () => {
  //             message.success("删除成功!");

  //             this.searchPermissionList();
  //           },
  //         });
  //       },
  //     });
  //   } else {
  //     message.error("请选择要删除的权限!");
  //   }
  // };
 
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
  // 点击团队
  onSelect = (selectedKeysValue, info) => {
    this.setState(
      {
        selectedKeys: selectedKeysValue,
        selectedItem: info.node,
      },
      () => {
        this.searchPermissionList();
      }
    );
  };
  closeTag = (collapsed) => {
    this.setState(
      {
        roleId: collapsed.id,
      },
      () => {
        this.deleteRoleRole();
      }
    );
  };

  handleAddRole = () => {
    this.setState({ addRoleVisible: true });
    this.getRoleList();
  };

  onPerExpand = (expandedKeysValue) => {
    this.setState({
      expandedKeysPer: expandedKeysValue,
      autoExpandParentPer: false,
    });
  };

  onPerCheck = (checkedKeysValue) => {
    console.log("checkedKeysValuePer:::::", checkedKeysValue);
    this.setState({ checkedKeysPer: checkedKeysValue });
  };
  // 点击团队
  onPerSelect = (selectedKeysValue, info) => {
    this.setState(
      {
        selectedKeysPer: selectedKeysValue,
        selectedItemPer: info.node,
      },
      () => {
        this.searchPermissionList();
      }
    );
  };

  addPermission = () => {
    const { dispatch } = this.props;
    const { tenantId, selectedKeys, checkedKeysPer } = this.state;
    dispatch({
      type: "roleManage/addRolePermission",
      opt: {
        tenantId: tenantId,
        roleId: selectedKeys[0],
        permissionIds: checkedKeysPer,
      },
      callback: (res) => {
        if (res?.data.status == 200) {
          message.success("修改成功!");
          this.handleCancel();
          this.searchPermissionList();
        } else {
          message.success(res?.data?.message || "修改失败!");
        }
      },
    });
  }
  // 批量删除权限
  handleDel = async () => {
    const { dispatch } = this.props;
    const {
      selectedKeys,
      tenantId,
      checkedKeysPer
    } = this.state;
    console.log('checkedKeysPer:::', checkedKeysPer);
    await dispatch({
      type: "roleManage/deleteRolePermission",
      opt: {
        tenantId: tenantId,
        permissionIds: checkedKeysPer,
        roleId: selectedKeys?.[0],
      },
      callback: (res) => {
        if (res?.data.status == 200) {
          message.success("删除成功!");
          this.handleCancel();
          this.searchPermissionList();
        }else {
          message.success(res?.data?.message || "删除失败!");
        }
      },
    });
  };

  render() {
    const {
      tenantId,
      roleList,
      permissionList,
      createVisible,
      isEditRole,
      addRoleVisible,
      addPermissionVisible,
      currentDetailData,
      selectedItem,
      selectedRowKeys,
      expandedKeys,
      checkedKeys,
      selectedKeys,
      autoExpandParent,
      expandedKeysPer,
      checkedKeysPer,
      selectedKeysPer,
      selectedItemPer,
      autoExpandParentPer,
    } = this.state;

    const rowSelection = {
      onChange: (selectedRowKeys, selectedRows) => {
        this.setState({
          selectedRowKeys: selectedRowKeys,
          selectedRows: selectedRows,
        });
      },
    };

    return (
      <div className={cx('roleCenter')}>
        <Card
          title="角色管理"
          extra={
            <>
              <Button
                className={cx("roleBtn")}
                type="primary"
                onClick={this.createRole}
              >
                创建角色
              </Button>
              <Button
                className={cx("roleBtn")}
                style={{ marginLeft: "8px" }}
                type="primary"
                onClick={this.editRole}
              >
                编辑角色
              </Button>
            </>
          }
        >
          <Row>
            <Col span={8}>
              <div className={cx("roleTreeCard")}>
                <Tree
                  // checkable
                  onExpand={this.onExpand}
                  expandedKeys={expandedKeys}
                  autoExpandParent={autoExpandParent}
                  onCheck={this.onCheck}
                  checkedKeys={checkedKeys}
                  onSelect={this.onSelect}
                  selectedKeys={selectedKeys}
                  treeData={setTreeData(roleList, "roleName", "parentRoleId")}
                />
              </div>
            </Col>
            <Col span={16} style={{ borderLeft: "1px solid #c4bcbc" }}>
              <div className={cx("table-box")}>
                {/* <Card
                extra={
                  <Form
                    {...formItemLayout}
                    ref={this.searchFormRef}
                    layout="inline"
                    name="control-ref"
                    onFinish={this.searchPermissionList}
                  >
                    <Form.Item name="id" label="权限名称">
                      <Input />
                    </Form.Item>
                    <Form.Item name="roleName" label="权限Code">
                      <Input />
                    </Form.Item>
                    <Button type="primary" htmlType="submit">
                      查询
                    </Button>
                    <Button
                      htmlType="button"
                      style={{ marginLeft: "8px" }}
                      onClick={this.onReset}
                    >
                      清空
                    </Button>
                  </Form>
                }
                >
                  <PermissionList
                    selectedRowKeys={selectedRowKeys}
                    rowSelection={rowSelection}
                    // dataSource={permissionList}
                    dataSource={setTreeData(
                      permissionList.data,
                      "permissionName",
                      "parentPermissonId"
                    )}
                    handlePageChange={this.handlePageChange}
                  />

                </Card> */}
              </div>

              <div className={cx("tree-box")}>
                <Tree
                  checkable
                  onExpand={this.onPerExpand}
                  expandedKeys={expandedKeysPer}
                  autoExpandParent={autoExpandParentPer}
                  onCheck={this.onPerCheck}
                  checkedKeys={checkedKeysPer}
                  onSelect={this.onPerSelect}
                  selectedKeys={selectedKeysPer}
                  treeData={setTreeData(
                    permissionList.data,
                    "permissionName",
                    "parentPermissonId"
                  )}
                  className={cx("tree-node")}
                />
                <Button
                  className={cx("perBtn")}
                  style={{ marginLeft: "8px" }}
                  type="primary"
                  // onClick={this.showAddPermissionModal}
                  onClick={this.addPermission}
                >
                  修改权限
                </Button>
                {/* <Button
                  className={cx("perBtn")}
                  style={{ marginLeft: "8px" }}
                  type="primary"
                  danger
                  onClick={this.handleDel}
                >
                  批量删除权限
                </Button> */}
              </div>
            </Col>
          </Row>
        </Card>
        <CreateModal
          visible={createVisible}
          isEditRole={isEditRole}
          submitMap={this.handleSubmit}
          onCancel={this.handleCancel}
          delRole={this.delRole}
          dataList={roleList}
          _this={this}
        />
        {/* <AddPermission
          tenantId={tenantId}
          visible={addPermissionVisible}
          submitMap={this.addRolePermission}
          selectedItem={selectedItem}
          onCancel={this.handleCancel}
        /> */}
      </div>
    );
  }
}
