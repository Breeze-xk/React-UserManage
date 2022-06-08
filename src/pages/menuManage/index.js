// 菜单管理
import React, { Component, PureComponent } from "react";
import { connect } from "dva";
// import styles from "./index.less";
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
  Popconfirm,
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
  Tabs,
} from "antd";
const { Option } = Select;
const { TabPane } = Tabs;
import moment from "moment";
import CreateModal from "./components/createModal";
import { qs, setTreeData } from "../../utils/index";

const timeShow = (d) => {
  return moment(d)
    .utcOffset(8)
    .format("YYYY-MM-DD HH:mm:ss");
};

const mapState2Props = ({ loading, menuManage, global: { userInfo } }) => {
  return {
    loading,
    userInfo,
    ...menuManage,
  };
};

@connect(mapState2Props)
export default class menuManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      tenantId: '',
      createVisible: false,
      editVisible: false,
      editInfo: {},
      productList: [],
      productId: "",
      productName: "",
      expandedKeys: [],
      checkedKeys: [],
      selectedKeys: [],
      selectedItem: [],
      isEditMenu: false,
      permissionList: [],
      expandedKeysPer: [],
      checkedKeysPer: [],
      selectedKeysPer: [],
      selectedItemPer: [],
      autoExpandParentPer: true,
    };
  }

  componentDidMount() {
    this.setState({
      tenantId: sessionStorage.getItem('tenantId')
    }, () => {
      this.getProduct();
    })
  }

  getProduct = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "menuManage/getProduct",
      opt: {
        currentPage: 1,
        pageSize: 1000,
      },
      callback: (res) => {
        if (res?.data?.status == 200) {
          this.setState(
            {
              productList: res?.data?.data?.list || [],
              productId: res?.data?.data?.list[0]?.id || "",
              productName: res?.data?.data?.list[0]?.productName || "",
            },
            () => {
              this.getList();
            }
          );
        }
      },
    });
  };

  columns = [
    {
      title: "序号",
      key: "id",
      dataIndex: "id",
    },
    {
      title: "菜单名称",
      dataIndex: "menuName",
      key: "menuName",
    },
    {
      title: "创建时间",
      dataIndex: "createdTime",
      key: "createdTime",
      render: (text) => (text ? timeShow(text) : 0),
    },
    {
      title: "更新时间",
      dataIndex: "updatedTime",
      key: "updatedTime",
      render: (text) => (text ? timeShow(text) : 0),
    },
    {
      title: "操作",
      key: "id",
      render: (text, record) => (
        <>
          <Button
            style={{ marginLeft: "10px" }}
            size="small"
            type="primary"
            onClick={() => this.showEditModal(record)}
          >
            编辑
          </Button>
          <Popconfirm
            title="确定删除该菜单?"
            onConfirm={() => this.confirm(record)}
            onCancel={this.handleCancel}
            okText="确定"
            cancelText="取消"
          >
            <Button
              style={{ marginLeft: "10px" }}
              size="small"
              danger
              type="primary"
            >
              删除
            </Button>
          </Popconfirm>
        </>
      ),
    },
  ];

  getList = () => {
    const { dispatch } = this.props;
    const { tenantId, productId, selectedKeys } = this.state;
    dispatch({
      type: "menuManage/getMenuLists",
      opt: {
        tenantId: tenantId,
        productId,
      },
      callback: (res) => {
        this.setState(
          {
            selectedKeys: [res?.data?.data?.list?.[0]?.id],
          },
          () => {
            this.getPermission();
          }
        );
      },
    });
  };

  handleCreate = () => {
    this.setState({
      createVisible: true,
      isEditMenu: false,
    });
  };

  handleAddSubmit = (values) => {
    const { dispatch } = this.props;
    const { isEditMenu, tenantId, productId, editInfo } = this.state;
    const { menuName, menuCode, parentID, menuId } = values;
    const Type = isEditMenu
      ? "menuManage/updateMenuLists"
      : "menuManage/createMenuLists";
    const newObj = { ...editInfo, ...values };
    dispatch({
      type: Type,
      opt: {
        menuCode,
        menuName,
        tenantId,
        parentMenuId: parentID, // 父级菜单id
        productId, // 产品id
        id: menuId,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success("创建菜单成功");
          this.handleCancel();
          this.getList();
        } else {
          message.error(`添加失败，请重新尝试!`);
        }
      },
    });
  };

  showEditModal = (val) => {
    this.setState({
      editVisible: true,
      editInfo: val,
    });
  };

  handleEditSubmit = (values) => {
    const { dispatch } = this.props;
    const { editInfo } = this.state;
    const newObj = { ...editInfo, ...values };
    const { menuName } = values;
    const content = (
      <>
        <br />
        <h3>菜单名称: &nbsp; {menuName}</h3>
      </>
    );
    Modal.confirm({
      title: "请确认修改菜单信息!",
      content,
      onOk: async () => {
        const res = await dispatch({
          type: "menuManage/updateMenuLists",
          opt: {
            ...newObj,
          },
          callback: (res) => {
            if (res.data.status == 200) {
              message.success("修改菜单成功");
              this.handleCancel();
              this.getList();
            } else {
              message.error(`修改失败，请重新尝试!`);
            }
          },
        });
      },
    });
  };

  confirm = (record) => {
    this.props.dispatch({
      type: "menuManage/delMenuLists",
      opt: {
        menuInfoId: record.id,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success("删除菜单成功");
          this.handleCancel();
          this.getList();
        } else {
          message.error(`删除失败，请重新尝试!`);
        }
      },
    });
  };

  handleCancel = () => {
    this.setState({
      createVisible: false,
      editVisible: false,
      editInfo: {},
    });
  };

  getPermission = () => {
    const { selectedKeys, tenantId, productId } = this.state;
    if (selectedKeys[0]) {
      this.props.dispatch({
        type: "menuManage/getPermission",
        opt: {
          tenantId,
          menuId: selectedKeys[0],
          currentPage: 1,
          pageSize: 1000,
          productId,
        },
        callback: (res) => {
          const permissionList = res?.data?.data?.list || [];
          let Keys = [];
          permissionList.map((item) => {
            if (item.relId) {
              Keys.push(item.id);
            }
          });
          this.setState({
            permissionList: permissionList,
            selectedRowKeys: [],
            checkedKeysPer: Keys,
          });
        },
      });
    } else {
      this.setState({
        permissionList: [],
        selectedRowKeys: [],
      });
    }
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
        this.getPermission();
      }
    );
  };

  handleSelect = (value) => {
    this.setState(
      {
        productId: Number(value.split("-")[0]),
        productName: value.split("-")[1],
      },
      () => {
        this.getList();
      }
    );
  };

  editMenu = () => {
    this.setState({
      createVisible: true,
      isEditMenu: true,
    });
  };

  delMenu = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: "menuManage/delMenuLists",
      opt: {
        tenantId: this.state.tenantId,
        menuInfoId: val,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success("删除菜单成功");
          this.handleCancel();
          this.getList();
        } else {
          message.error(`删除失败，请重新尝试!`);
        }
      },
    });
  };

  onPerExpand = (expandedKeysValue) => {
    this.setState({
      expandedKeysPer: expandedKeysValue,
      autoExpandParentPer: false,
    });
  };

  onPerCheck = (checkedKeysValue) => {
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
        this.getPermission();
      }
    );
  };

  addPermission = () => {
    const { dispatch } = this.props;
    const { tenantId, selectedKeys, checkedKeysPer } = this.state;
    if (checkedKeysPer.length > 0) {
      dispatch({
        type: "menuManage/addRolePermission",
        opt: {
          tenantId,
          menuInfoId: selectedKeys[0],
          permissionIds: checkedKeysPer,
        },
        callback: (res) => {
          if (res?.data?.status == 200) {
            message.success("修改成功!");
            this.handleCancel();
            this.getPermission();
          } else {
            message.error("修改失败!");
          }
        },
      });
    }else{
      message.warn("请选择权限!");
    }

  };

  render() {
    const {
      createVisible,
      editVisible,
      editInfo,
      expandedKeys,
      checkedKeys,
      selectedKeys,
      selectedItem,
      productList,
      productName,
      isEditMenu,
      expandedKeysPer,
      checkedKeysPer,
      selectedKeysPer,
      selectedItemPer,
      autoExpandParentPer,
      permissionList,
    } = this.state;
    const { List } = this.props;

    return (
      <div className={cx('menuManage')}>
        <Card
          title="菜单管理"
          extra={
            <>
              <span>产品名称 : </span>
              <Select
                style={{ width: 200, margin: "0 50px 0 10px" }}
                value={productName}
                showSearch
                onChange={this.handleSelect}
              >
                {productList.map((item) => {
                  return (
                    <Option value={`${item.id}-${item.productName}`}>
                      {item.productName}
                    </Option>
                  );
                })}
              </Select>
              <Button onClick={this.handleCreate} type="primary">
                创建菜单
              </Button>
              <Button
                style={{ marginLeft: "8px" }}
                type="primary"
                onClick={this.editMenu}
              >
                编辑菜单
              </Button>
            </>
          }
        >
          {/* <Table
            dataSource={List}
            columns={this.columns}
            key="id"
            pagination={true}
            bordered
          /> */}
          <Row>
            <Col span={8}>
              <Tree
                // checkable
                onExpand={this.onExpand}
                expandedKeys={expandedKeys}
                autoExpandParent={true}
                onCheck={this.onCheck}
                checkedKeys={checkedKeys}
                onSelect={this.onSelect}
                selectedKeys={selectedKeys}
                treeData={setTreeData(List, "menuName", "parentMenuId")}
              />
            </Col>
            <Col
              span={16}
              style={{ borderLeft: "1px solid #c4bcbc", padding: "0 30px" }}
            >
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
                  permissionList,
                  "permissionName",
                  "parentPermissonId"
                )}
              />
              <Button
                style={{ margin: "30px 0 0 8px" }}
                type="primary"
                onClick={this.addPermission}
              >
                修改权限
              </Button>
            </Col>
          </Row>
        </Card>

        <CreateModal
          visible={createVisible}
          isEditMenu={isEditMenu}
          submitMap={this.handleAddSubmit}
          onCancel={this.handleCancel}
          delMenu={this.delMenu}
          dataList={List}
          _this={this}
        />
      </div>
    );
  }
}
