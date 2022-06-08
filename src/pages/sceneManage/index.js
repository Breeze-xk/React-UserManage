// 场景注册

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
  Tag
} from "antd";
const { Option } = Select;
const { TextArea } = Input;
import moment from "moment";

import CreateModal from "./component/createModal";
import EditModal from "./component/editModal";
const timeShow = (d) => {
  return moment(d)
    .utcOffset(8)
    .format("YYYY-MM-DD HH:mm:ss");
};
const mapState2Props = ({ global, sceneManage }) => ({ global, sceneManage });

@connect(mapState2Props)
export default class SceneManage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      editVisible: false,
      dataSource: {
        currentPage: 1,
        pageSize: 10,
      }, //用户List
      serviceListTotal: 0,
      delVisible: false, //删除弹窗状态
      sceneInfo: "", //当前场景信息
      createVisible: false, // 新增弹窗
      editInfo: {},
      sceneLists: [],
    };
  }

  componentDidMount() {
    this.getSceneLists();
  }
  // 查询场景
  getSceneLists = () => {
    const { dispatch } = this.props;
    const { dataSource } = this.state;
    dispatch({
      type: "sceneManage/getSceneLists",
      opt: {
        currentPage: dataSource.currentPage || 1,
        pageSize: dataSource.pageSize,
      },
      callback: (res) => {
        const sceneLists = res?.data?.data;
        this.setState(
          {
            sceneLists: sceneLists,
            sceneListTotal: res?.data?.data?.totalCount || 0,
          }
        );
      },
    });
  };
  // 分页
  changePage = (current, pageSize) => {
    this.setState({
      dataSource: {
        currentPage: current,
        pageSize: pageSize
      },
    }, () => {
      this.getSceneLists()
    });
  };
  // 展示弹窗
  showFormModal(type, data) {
    if (type == "edit") {
      this.setState({
        editVisible: true,
        editInfo: data
      });
    } else if (type == "del") {
      this.setState({
        delVisible: true,
        sceneInfo: data,
      });
    }
  }
  // 新增场景
  handleAddSubmit = async (values) => {
    const { dispatch } = this.props;
    const { sceneName, sceneCode } = values;
    const content = (
      <>
        <br />
        <h3>场景名称: &nbsp; {sceneName}</h3>
        <br />
        <h3>场景code: &nbsp; {sceneCode}</h3>
        <br />
      </>
    );
    // Modal.confirm({
    //   title: "请确认创建场景信息!",
    //   content,
    //   onOk: async () => {
        const res = await dispatch({
          type: "sceneManage/saveSceneInfo",
          opt: {
            sceneCode: sceneCode,
            sceneName: sceneName,
          },
          callback: (res) => {
            if (res.data.status == 200) {
              message.success("创建业务成功");
              this.handleCancel();
              this.getSceneLists();
            } else {
              message.error(`添加失败，请重新尝试!`);
            }
          },
        });
    //   },
    // });
  };
  handleAddVisible = () => {
    this.setState({
      createVisible: true,
    });
  };
  // 删除场景
  handleDelService = () => {
    const { sceneInfo } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: "sceneManage/deleteSceneInfo",
      opt: {
        sceneId: sceneInfo.id,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success("删除场景成功");
          this.handleCancel();
          this.getSceneLists();
        } else {
          message.error(`删除失败，请重新尝试!`);
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
      sceneInfo: {}
    });
  };
  handleEdit = async (values) => {
    const { dispatch } = this.props;
    const { sceneName, sceneCode,  } = values;
    const content = (
      <>
        <br />
        <h3>场景名称: &nbsp; {sceneName}</h3>
        <br />
        <h3>业务名称: &nbsp; {sceneCode}</h3>
        <br />
      </>
    );
    // Modal.confirm({
    //   title: "请确认编辑场景信息!",
    //   content,
    //   onOk: async () => {
        const res = await dispatch({
          type: "sceneManage/modifySceneInfo",
          opt: {
            id: this.state.editInfo.id,
            sceneName: sceneName,
            sceneCode: sceneCode,
           
          },
          callback: (res) => {
            if (res.data.status == 200) {
              message.success("修改场景成功");
              this.handleCancel();
              this.getSceneLists();
            } else {
              message.error(`修改失败，请重新尝试!`);
            }
          },
        });
    //   },
    // });
  };

  render() {
    const {
      delVisible,
      createVisible,
      sceneLists,
      sceneInfo,
      editVisible,
      editInfo,
      serviceListTotal
    } = this.state;
    const columns = [
      {
        title: "序号",
        key: "id",
        width:60,
        render: (text, record, index) => (
          <>
            <span>{index + 1}</span>
          </>
        ),
      },
      {
        title: "场景名",
        dataIndex: "sceneName",
        textWrap: "word-break",
        ellipsis: true,
        key: "sceneName",
      },
      {
        title: "添加时间",
        dataIndex: "createdTime",
        key: "createdTime",
        width: 200,
        textWrap: "word-break",
        ellipsis: true,
      },
      {
        title: "场景code",
        dataIndex: "sceneCode",
        key: "sceneCode",
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
      <div className={cx("sceneManage")}>
        <Card
          title="场景管理"
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
              dataSource={sceneLists}
              columns={columns}
              rowKey={(record) => record.id}
              pagination={{ total: serviceListTotal, onChange: this.changePage }}
            />
          </div>
        </Card>
        <Modal
          title="删除场景"
          visible={delVisible}
          footer={[
            <Button
              key="submit"
              type="primary"
              onClick={this.handleDelService}
            >
              确认
            </Button>,
            <Button onClick={this.handleCancel}>取消</Button>,
          ]}
          onOk={this.handleDelService}
          onCancel={this.handleCancel}
        >
          <div>即将删除{sceneInfo.serviceName}!</div>
        </Modal>
        <CreateModal
          visible={createVisible}
          submitMap={this.handleAddSubmit}
          onCancel={this.handleCancel}
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
