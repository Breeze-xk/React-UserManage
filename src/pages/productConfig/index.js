// 租户注册

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
} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
import moment from 'moment';

import CreateModal from './component/createModal';
import EditModal from './component/editModal';
const timeShow = (d) => {
  return moment(d).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
};
const mapState2Props = ({ global, productConfig }) => ({
  global,
  productConfig,
});

@connect(mapState2Props)
export default class productConfig extends Component {
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
      serviceInfo: '', //当前服务信息
      createVisible: false, // 新增弹窗
      editInfo: {},
      serviceLists: [],
    };
  }

  componentDidMount() {
    this.getServiceLists();
  }
  // 查询服务
  getServiceLists = (values) => {
    const { dispatch } = this.props;
    const { dataSource } = this.state;
    dispatch({
      type: 'productConfig/getServiceLists',
      opt: {
        currentPage: dataSource.currentPage || 1,
        pageSize: dataSource.pageSize,
      },
      callback: (res) => {
        const serviceLists = res?.data?.data?.list;
        this.setState({
          serviceLists: serviceLists,
          serviceListTotal: res?.data?.data?.totalCount || 0,
        });
      },
    });
  };
  // 分页
  changePage = (current, pageSize) => {
    this.setState(
      {
        dataSource: {
          currentPage: current,
          pageSize: pageSize,
        },
      },
      () => {
        this.getServiceLists();
      }
    );
  };
  // 展示弹窗
  showFormModal(type, data) {
    console.log('data', data);
    if (type == 'edit') {
      this.setState({
        editVisible: true,
        editInfo: data,
      });
    } else if (type == 'del') {
      this.setState({
        delVisible: true,
        serviceInfo: data,
      });
    }
  }
  // 新增服务
  handleAddSubmit = async (values) => {
    const { dispatch } = this.props;
    const { serviceName, descibe, description, serviceStatus, baseEquip } = values;
    const content = (
      <>
        <br />
        <h3>服务名称: &nbsp; {serviceName}</h3>
        <br />
        <h3>业务名称: &nbsp; {descibe}</h3>
        <br />
        <h3>服务描述: &nbsp; {description}</h3>
        <br />
      </>
    );
    // Modal.confirm({
    //   title: "请确认创建服务信息!",
    //   content,
    //   onOk: async () => {
    const res = await dispatch({
      type: 'productConfig/saveServiceInfo',
      opt: {
        serviceName,
        serviceDesc: {
          descibe,
          description,
          serviceStatus,
          baseEquip,
        },
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success('创建业务成功');
          this.handleCancel();
          this.getServiceLists();
        } else {
          message.error(res?.data?.message ||  `添加失败，请重新尝试!`);
        }
        //   },
        // });
      },
    });
  };
  handleAddVisible = () => {
    this.setState({
      createVisible: true,
    });
  };
  // 删除租户
  handleDelService = () => {
    const { serviceInfo } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'productConfig/deleteServiceInfo',
      opt: {
        serviceId: serviceInfo.id,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success('删除服务成功');
          this.handleCancel();
          this.getServiceLists();
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
      serviceInfo: {},
    });
  };
  handleEdit = async (values) => {
    const { dispatch } = this.props;
    const { serviceName, descibe, description, serviceStatus, baseEquip } = values;
    const content = (
      <>
        <br />
        <h3>服务名称: &nbsp; {serviceName}</h3>
        <br />
        <h3>业务名称: &nbsp; {descibe}</h3>
        <br />
        <h3>服务描述: &nbsp; {description}</h3>
        <br />
      </>
    );
    // Modal.confirm({
    //   title: "请确认编辑服务信息!",
    //   content,
    //   onOk: async () => {
    const res = await dispatch({
      type: 'productConfig/modifyServiceInfo',
      opt: {
        id: this.state.editInfo.id,
        serviceCode: this.state.editInfo.serviceCode,
        serviceName,
        serviceDesc: {
          descibe,
          serviceStatus,
          baseEquip,
          description,
        },
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success('修改服务成功');
          this.handleCancel();
          this.getServiceLists();
        } else {
          message.error(res?.data?.message || `修改失败，请重新尝试!`);
        }
      },
    });
    console.log('res:::', res);
    //   },
    // });
  };

  render() {
    const {
      delVisible,
      createVisible,
      serviceLists,
      serviceInfo,
      editVisible,
      editInfo,
      serviceListTotal,
    } = this.state;
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
        title: '服务名',
        dataIndex: 'serviceName',
        width: 200,
        textWrap: 'word-break',
        ellipsis: true,
        key: 'serviceName',
      },
      {
        title: '业务名称',
        dataIndex: 'serviceDesc',
        key: 'serviceDesc',
        width: 200,
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => (
          <>
            <span>{record?.serviceDesc?.descibe}</span>
          </>
        ),
      },
      {
        title: '服务描述',
        dataIndex: 'description',
        key: 'description',
        width: 200,
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => (
          <>
            <span>{record?.serviceDesc?.description}</span>
          </>
        ),
      },
      {
        title: '服务状态',
        dataIndex: 'serviceStatus',
        key: 'serviceStatus',
        width: 200,
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => (
          <>
            <span>{record?.serviceDesc?.serviceStatus == '0' ? '已上线' : '未上线'}</span>
          </>
        ),
      },
      {
        title: '服务配置',
        dataIndex: 'baseEquip',
        key: 'baseEquip',
        width: 200,
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => (
          <>
            <span>{record?.serviceDesc?.baseEquip?.join(',')}</span>
          </>
        ),
      },
      {
        title: '操作',
        dataIndex: 'id',
        width: 160,
        key: 'id',
        render: (text, record) => (
          <>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              onClick={() => this.showFormModal('edit', record)}
              type="primary"
            >
              编辑
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              onClick={() => this.showFormModal('del', record)}
              type="danger"
            >
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <div className={cx('productConfig')}>
        <Card
          title="服务管理"
          extra={
            <>
              <Button
                style={{ marginLeft: '10px' }}
                size="small"
                className={cx('addLesseeBtn')}
                onClick={this.handleAddVisible}
                type="primary"
              >
                新增
              </Button>
            </>
          }
        >
          <div className={cx('table-box')}>
            <Table
              scroll={{ x: true }}
              dataSource={serviceLists}
              columns={columns}
              rowKey={(record) => record.id}
              pagination={{
                total: serviceListTotal,
                onChange: this.changePage,
              }}
            />
          </div>
        </Card>
        <Modal
          title="删除租户"
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
          <div>即将删除{serviceInfo.serviceName}!</div>
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
