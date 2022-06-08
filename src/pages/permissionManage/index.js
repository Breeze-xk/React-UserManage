// 权限注册

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
const mapState2Props = ({ global, permissionManage }) => ({
  global,
  permissionManage,
});
import { setTreeData } from "../../utils/index";
import moment from "moment";
import CreateModal from "./component/createModal";
import { qs ,timeShow} from "../../utils/index";

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

@connect(mapState2Props)
export default class PermissionManage extends Component {
  searchFormRef = React.createRef(); //查询
  permissionFormRef = React.createRef(); // 编辑

  constructor(props) {
    super(props);
    this.state = {
      tenantId: '',
      isModalVisible: false, // 权限弹窗状态
      isDeatil: false,
      isEdit: false,
      dataSource: {
        dataList: [],
        total: 20,
        currentPage: 1,
        pageSize: 10,
      }, //权限List
      modalTitle: "", //权限弹窗title
      delPermissionVisible: false, //删除弹窗状态
      permissionInfo: "", //当前权限信息
      createVisible: false, // 新增弹窗
      currentDetailData: {}, //往组件弹窗传参
      productList: [],
      productId: "",
      productName: "",
    };
  }

  columns = [
    {
      title: "序号",
      key: "id",
      render: (text, record, index) => (
        <>
          <span>{index + 1}</span>
        </>
      ),
    },
    {
      title: "权限名称",
      dataIndex: "permissionName",
      key: "permissionName",
    },
    {
      title: "权限Code",
      dataIndex: "permissionCode",
      key: "permissionCode",
    },
    {
      title: "操作",
      key: "updatedTime",
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
            danger
            type="primary"
            onClick={() => this.showFormModal(record, "del")}
          >
            删除
          </Button>
        </>
      ),
    },
  ];

  componentDidMount() {
    this.searchFormRef.current.setFieldsValue({
      member: "all",
    });
    this.setState({
      tenantId:sessionStorage.getItem('tenantId')
    },()=>{
      this.getProduct();
      this.searchPermissionList();
    })
  }
  // 查询表单重置
  onReset = () => {
    this.searchFormRef.current.resetFields();
  };

  getProduct = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "permissionManage/getProduct",
      opt: {
        currentPage: 1,
        pageSize: 10,
      },
      callback: (res) => {
        console.log("res-------", res);
        if (res?.data?.status == 200) {
          this.setState(
            {
              productList: res?.data?.data?.list || [],
              productId: res?.data?.data?.list[0]?.id || "",
              productName: res?.data?.data?.list[0]?.productName || "",
            },
            () => {
              this.searchPermissionList(
                this.searchFormRef.current.getFieldsValue()
              );
            }
          );
        }
      },
    });
  };

  handleSelect = (value) => {
    console.log(value);
    this.setState(
      {
        productId: Number(value.split("-")[0]),
        productName: value.split("-")[1],
      },
      () => {
        this.searchPermissionList();
      }
    );
  };

  // 查询
  searchPermissionList = (values) => {
    const { dispatch } = this.props;
    const { dataSource, tenantId, productId } = this.state;
    dispatch({
      type: "permissionManage/getPermissionLists",
      opt: {
        currentPage: dataSource.currentPage || 1, 
        tenantId: tenantId,
        pageSize: dataSource.pageSize || 10,
        productId,
        ...this.searchFormRef.current.getFieldsValue()
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
    // console.log('1111',dataSource)
    this.setState({
      dataSource: dataSource,
    });
    this.searchPermissionList(this.searchFormRef.current.getFieldsValue());
  };
  // 展示弹窗
  showFormModal(data, type) {
    if (type == "edit") {
      this.setState(
        {
          modalTitle: "编辑权限",
          isEdit: true,
          isModalVisible: true,
        },
        () => {
          this.getPermissionInfo(data);
        }
      );
    } else if (type == "detail") {
      this.setState(
        {
          isDeatil: true,
          modalTitle: "查看详情",
          isModalVisible: true,
        },
        () => {
          this.getPermissionInfo(data);
        }
      );
    } else if (type == "del") {
      this.setState({
        delPermissionVisible: true,
        permissionInfo: data,
        modalTitle: "删除权限",
      });
    }
  }
  // 获取权限信息
  getPermissionInfo = (permissionInfo) => {
    const { dispatch } = this.props;
    dispatch({
      type: "permissionManage/getPermissionInfo",
      opt: {
        permissionId: permissionInfo.id,
      },
      callback: (res) => {
        this.setState({
          permissionInfo: {
            ...res?.data?.data,
            createdTime:timeShow(res?.data?.data?.createdTime),
            remark: res?.data?.data?.permissionDesc?.remark,
          },
        });
        if (this.state.isEdit) {
          this.permissionFormRef.current.setFieldsValue({
            ...res?.data?.data,
            remark: res?.data?.data?.permissionDesc?.remark,
          });
        }
      },
    });
  };
  // 修改权限信息
  handlepermissionInfo = () => {
    const { dispatch } = this.props;
    dispatch({
      type: "permissionManage/modifyPermissionInfo",
      opt: {
        ...this.permissionFormRef.current.getFieldValue(),
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`修改成功!`);
          this.searchPermissionList(
            this.searchFormRef.current.getFieldsValue()
          );
        } else {
          message.error(res?.data?.message || `修改失败，请重新尝试!`);
        }
      },
    });

    this.handleCancel();
  };
  // 新增权限
  handleAddSubmit = (values) => {
    const { dispatch } = this.props;
    const { tenantId, productId } = this.state;

    dispatch({
      type: "permissionManage/savePermissionInfo",
      opt: {
        tenantId: tenantId,
        parentPermissonId: values.parentID || "",
        permissionName: values.permissionName,
        permissionDesc: {
          remark: values.remark,
        },
        productId,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`添加成功!`);
          this.searchPermissionList();
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
      isEdit: false,
    });
  };
  // 删除权限
  handleDelPermissionInfo = () => {
    const { permissionInfo } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: "permissionManage/deletePermissionInfo",
      opt: {
        permissionId: permissionInfo.id,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`删除成功!`);
          this.searchPermissionList();
        } else {
          message.error(res?.data?.message || `删除失败，请重新尝试!`);
        }
      },
    });
    this.handleCancel();
  };
  // 详情弹窗取消
  handleCancel = () => {
    this.setState({
      isModalVisible: false,
      delPermissionVisible: false,
      isDeatil: false,
      isEdit: false,
      createVisible: false,
    });
  };
  render() {
    const {
      isModalVisible,
      delPermissionVisible,
      createVisible,
      permissionInfo,
      isEdit,
      isDeatil,
      dataSource,
      currentDetailData,
      modalTitle,
      productList,
      productName,
    } = this.state;

    return (
      <div className={cx('permissionManage')}>
        <Card className={cx("searchForm")} title="权限管理">
          <Form
            {...formItemLayout}
            ref={this.searchFormRef}
            layout="inline"
            name="control-ref"
            onFinish={this.searchPermissionList}
          >
            <Form.Item name="permissionName" label="权限名称">
              <Input />
            </Form.Item>
            <Form.Item name="permissionCode" label="权限Code">
              <Input />
            </Form.Item>
            
            <Form.Item {...tailLayout}>
              <div style={{display:'flex'}}>
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
              </div>
            </Form.Item>
          </Form>
        </Card>
        <Card className={cx("permissionLists")}>
          <span>产品名称 : </span>
          <Select
            style={{ width: 200, margin: "0 50px 0 10px" }}
            value={productName}
            showSearch
            onChange={this.handleSelect}
          >
            {(productList || []).map((item) => {
              return (
                <Option value={`${item.id}-${item.productName}`}>
                  {item.productName}
                </Option>
              );
            })}
          </Select>
          <Button
            className={cx("addPerssionrBtn")}
            onClick={this.handleAddVisible}
            type="primary"
          >
            新增
          </Button>
          <Table
            scroll={{ x: true }}
            dataSource={setTreeData(
              dataSource.dataList,
              "permissionName",
              "parentPermissonId"
            )}
            rowKey={(record) => record.id}
            columns={this.columns}
            pagination={false}
          />
          <Pagination
            showSizeChanger
            scroll={{ x: true }}
            total={dataSource.total}
            onChange={this.changePage}
            defaultPageSize={dataSource.pageSize}
            defaultCurrent={dataSource.currentPage}
          />
        </Card>
        <Modal
          className={cx("perssionInfoModal")}
          title={modalTitle}
          visible={isModalVisible}
          footer={
            !isDeatil
              ? [
                  <Button
                    key="submit"
                    type="primary"
                    onClick={this.handlepermissionInfo}
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
              <Descriptions.Item label="权限名">
                {permissionInfo.permissionName}
              </Descriptions.Item>
              <Descriptions.Item label="创建时间">
                {permissionInfo.createdTime}
              </Descriptions.Item>
              <Descriptions.Item label="备注">
                {permissionInfo?.permissionDesc?.remark}
              </Descriptions.Item>
            </Descriptions>
          ) : (
            <Form
              ref={this.permissionFormRef}
              {...formItemLayout}
              name="editPermission"
            >
              <Form.Item
                label="权限名称"
                name="permissionName"
                rules={[
                  {
                    required: true,
                    message: "请输入权限名称",
                  },
                ]}
              >
                <Input placeholder="请输入权限名称" />
              </Form.Item>

              <Form.Item
                label="权限code"
                name="permissionCode"
                rules={[
                  {
                    required: true,
                    message: "请输入权限code",
                  },
                ]}
              >
                <Input placeholder="请输入权限code" />
              </Form.Item>

              <Form.Item label="备注" name="remark">
                <Input placeholder="请输入权限备注" />
              </Form.Item>
            </Form>
          )}
        </Modal>
        <Modal
          title="删除权限"
          visible={delPermissionVisible}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={this.handleDelPermissionInfo}
            >
              确认
            </Button>,
            <Button onClick={this.handleCancel}>取消</Button>,
          ]}
          onOk={this.handleDelPermissionInfo}
          onCancel={this.handleCancel}
        >
          <div>即将删除{permissionInfo.permissionName}!</div>
        </Modal>
        <CreateModal
          visible={createVisible}
          isEdit={isEdit}
          submitMap={this.handleAddSubmit}
          onCancel={this.handleCancel}
          dataList={dataSource.dataList}
          currentDetailData={currentDetailData}
        />
      </div>
    );
  }
}
