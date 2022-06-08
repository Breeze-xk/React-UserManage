// 城市注册

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
  AutoComplete,
  Tag,
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
import moment from "moment";

import CreateModal from "./component/createModal";
import EditModal from "./component/editModal";
const timeShow = (d) => {
  return moment(d).utcOffset(8).format("YYYY-MM-DD HH:mm:ss");
};
const mapState2Props = ({ global, countryConfig }) => ({
  global,
  countryConfig,
});

@connect(mapState2Props)
export default class CountryConfig extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false,
      serviceListTotal: 0,
      delVisible: false, //删除弹窗状态
      countryInfo: "", //当前城市信息
      createVisible: false, // 新增弹窗
      editInfo: {},
      countryLists: [],
    };
  }

  componentDidMount() {
    this.getcountryLists();
  }
  // 查询城市
  getcountryLists = () => {
    const { dispatch } = this.props;
    const { dataSource } = this.state;
    dispatch({
      type: "countryConfig/getCountryLists",
      opt: {},
      callback: (res) => {
        if (res?.data?.status == 200) {
          this.setState({
            countryLists: res?.data?.data,
          });
        }
      },
    });
  };
  // 分页
  // changePage = (current, pageSize) => {
  //   this.setState(
  //     {
  //       dataSource: {
  //         currentPage: current,
  //         pageSize: pageSize,
  //       },
  //     },
  //     () => {
  //       this.getcountryLists();
  //     }
  //   );
  // };

  // 展示弹窗
  showFormModal = async (type, data) => {
    if (type == "edit") {
      await this.props.dispatch({
        type: "countryConfig/getCountry",
        opt: {
          cityStandardId: data.id,
        },
        callback: (res) => {
          if (res?.data?.status == 200) {
            this.state.editInfo = res.data.data
            this.state.editVisible = true
            this.setState({
              editInfo: res?.data?.data,
              editVisible: true,
            });
          }
        },
      });
    } else if (type == "del") {
      this.setState({
        delVisible: true,
        countryInfo: data,
      });
    }
  }
  // 新增城市
  handleAddSubmit = async (values) => {
    const { dispatch } = this.props;
    const {
      countryName,
      countryCode,
      baseConfig,
      specificationConfig,
      supportingInfo,
      heighlimitType
    } = values;
    console.log("values:::::", values);
    await dispatch({
      type: "countryConfig/saveCountryInfo",
      opt: {
        countryName,
        countryCode,
        standardDesc: {
          baseConfig,
          specificationConfig,
          supportingInfo,
          heighlimitType
        },
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success("创建城市成功");
          this.handleCancel();
          this.getcountryLists();
        } else {
          message.error(res?.data?.message || `添加失败，请重新尝试!`);
        }
      },
    });
  };
  handleAddVisible = () => {
    this.setState({
      createVisible: true,
    });
  };
  // 删除城市
  handleDelService = () => {
    const { countryInfo } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: "countryConfig/deleteCountryInfo",
      opt: {
        cityStandardId: countryInfo.id,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success("删除城市成功");
          this.handleCancel();
          this.getcountryLists();
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
      delVisible: false,
      createVisible: false,
      editVisible: false,
      editInfo: {},
      countryInfo: {},
      countryName: "",
    });
  };
  // 编辑城市
  handleEdit = async (values) => {
    const { dispatch } = this.props;
    console.log('values::::::', values);
    const {
      id,
      countryName,
      baseConfig,
      specificationConfig,
      supportingInfo,
      heighlimitType
    } = values;
    await dispatch({
      type: "countryConfig/modifyCountryInfo",
      opt: {
        id,
        countryName,
        standardDesc: {
          baseConfig,
          specificationConfig,
          supportingInfo,
          heighlimitType
        },
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success("修改城市成功");
          this.handleCancel();
          this.getcountryLists();
        } else {
          message.error(res?.data?.message || `修改失败，请重新尝试!`);
        }
      },
    });
  };

  render() {
    const {
      delVisible,
      createVisible,
      countryLists,
      countryInfo,
      editVisible,
      editInfo,
      serviceListTotal,
    } = this.state;
    const columns = [
      {
        title: "序号",
        key: "id",
        width: 60,
        render: (text, record, index) => (
          <>
            <span>{index + 1}</span>
          </>
        ),
      },
      {
        title: "城市名称",
        dataIndex: "countryName",
        textWrap: "word-break",
        ellipsis: true,
        key: "countryName",
      },
      {
        title: "城市code",
        dataIndex: "countryCode",
        key: "countryCode",
        textWrap: "word-break",
        ellipsis: true,
      },
      {
        title: "操作",
        dataIndex: "id",
        key: "id",
        width: 200,
        render: (text, record) => (
          <>
            <Button
              style={{ marginLeft: "10px" }}
              size="small"
              onClick={() => this.showFormModal("edit", record)}
              type="primary"
            >
              编辑
            </Button>
            <Button
              style={{ marginLeft: "10px" }}
              size="small"
              onClick={() => this.showFormModal("del", record)}
              type="danger"
            >
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <div className={cx('countryConfig')}>
        <Card
          title="城市配置"
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
          <div className={cx("table-box")}>
            <Table
              scroll={{ x: true }}
              dataSource={countryLists}
              columns={columns}
              rowKey={(record) => record.id}
              // pagination={{
              //   total: serviceListTotal,
              //   onChange: this.changePage,
              // }}
            />
          </div>
        </Card>
        <Modal
          title="删除城市"
          visible={delVisible}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleDelService}>
              确认
            </Button>,
            <Button onClick={this.handleCancel}>取消</Button>,
          ]}
          onOk={this.handleDelService}
          onCancel={this.handleCancel}
        >
          <div>即将删除{countryInfo.serviceName}!</div>
        </Modal>
        <CreateModal
          visible={createVisible}
          submitMap={this.handleAddSubmit}
          onCancel={this.handleCancel}
        />
        {/* {Object.keys(this.state.editInfo).length && <EditModal
          visible={this.state.editVisible}
          submitMap={this.handleEdit}
          onCancel={this.handleCancel}
          currentDetailData={this.state.editInfo}
        />} */}
        <EditModal
          visible={this.state.editVisible}
          submitMap={this.handleEdit}
          onCancel={this.handleCancel}
          currentDetailData={this.state.editInfo}
        />
      </div>
    );
  }
}
