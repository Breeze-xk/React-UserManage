// 解决方

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
} from 'antd';
const { Option } = Select;
const { TextArea } = Input;
const mapState2Props = ({ global, solutionManage }) => ({
  global,
  solutionManage,
});
import CreateModal from './compoment/createModal';
import EditModal from './compoment/editModal';

import moment from 'moment';
@connect(mapState2Props)
export default class solutionManage extends Component {
  searchFormRef = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      tenantId: sessionStorage.getItem('tenantId'),
      dataSource: {
        dataList: [],
        total: 0,
        currentPage: 1,
        pageSize: 10,
      }, //解决方List
      delSolutionVisible: false, //删除弹窗状态
      solutionInfo: {}, //当前解决方信息
      showAddModal: false, //添加弹窗
      showEditModal: false, //编辑弹窗
      groupList: [],
      userList: [],
      productList: [],
    };
  }

  componentDidMount() {
    this.searchFormRef.current.setFieldsValue({
      member: 'all',
    });
    this.searchSolutionList(this.searchFormRef.current.getFieldsValue());
    // this.getUserInfoList();
    this.getProductLists();
    this.getGroupLists();
  }
  // 查询表单重置
  onReset = () => {
    this.searchFormRef.current.resetFields();
  };
  // 点击取消清空 数据UserList
  cancelUserList = () => {
    this.setState({
      userList: [],
    });
  };
  // 查询
  searchSolutionList = (values) => {
    const { dispatch } = this.props;
    const { dataSource } = this.state;
    dispatch({
      type: 'solutionManage/getSolverLists',
      opt: {
        ...values,
        currentPage: dataSource?.currentPage,
        pageSize: dataSource?.pageSize,
      },
      callback: (res) => {
        const dataSource = res?.data?.data;
        this.setState({
          dataSource: {
            dataList: dataSource?.list || [],
            total: dataSource?.totalCount,
            currentPage: dataSource?.pagination?.currentPage,
            pageSize: dataSource?.pagination?.pageSize,
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
    this.searchSolutionList(this.searchFormRef.current.getFieldsValue());
  };
  // 展示弹窗
  showFormModal(type, data) {
    if (type == 'del') {
      this.setState({
        delSolutionVisible: true,
        solutionInfo: data,
      });
    } else if (type == 'add') {
      this.setState({
        showAddModal: true,
      });
    }
  }
  timeShow = (d) => {
    return moment(d).utcOffset(8).format('YYYY-MM-DD HH:mm:ss');
  };
  timeShow2 = (d) => {
    return moment(d);
  };
  // 修改解决方信息
  handleEditSolver = (values) => {
    const { dispatch } = this.props;
    const { solutionInfo } = this.state;
    const { administrator, solverName, groupId, productId, remark } = values;
    dispatch({
      type: 'solutionManage/modifySolverInfo',
      opt: {
        administrator,
        groupId,
        productId,
        solverName,
        id: solutionInfo.id,
        solverDesc: {
          remark: remark,
        },
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`修改成功!`);
        } else {
          message.error(res?.data?.message || `修改失败，请重新尝试!`);
        }
        this.searchSolutionList(this.searchFormRef.current.getFieldsValue());
      },
    });

    this.handleCancel();
  };
  // 删除解决方
  handleDelSolver = () => {
    const { solutionInfo } = this.state;
    const { dispatch } = this.props;
    dispatch({
      type: 'solutionManage/deleteSolverInfo',
      opt: {
        solverInfoId: solutionInfo.id,
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`删除成功!`);
        } else {
          message.error(res?.data?.message || `删除失败，请重新尝试!`);
        }
        this.searchSolutionList(this.searchFormRef.current.getFieldsValue());
      },
    });
    this.handleCancel();
  };
  // 弹窗取消
  handleCancel = () => {
    this.setState({
      delSolutionVisible: false,
      showAddModal: false,
      showEditModal: false,
      currentData: {},
    });
  };
  // 根据 团队id筛选 主管
  Screening = (val) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'solutionManage/getGroupUserList',
      opt: {
        groupId: val,
        tenantId: sessionStorage.getItem('tenantId'),
      },
      callback: (res) => {
        this.setState({
          userList: res?.data?.data?.list || [],
        });
      },
    });
  };
  // 添加
  handleAddSolver = (val) => {
    const { administrator, solverName, groupId, productId, remark } = val;
    const { dispatch } = this.props;
    dispatch({
      type: 'solutionManage/addSolverInfo',
      opt: {
        administrator,
        groupId,
        productId,
        solverName,
        businessType: 'UNDERGROUND_GARAGE',
        solverDesc: {
          remark: remark,
        },
      },
      callback: (res) => {
        if (res.data.status == 200) {
          message.success(`添加成功!`);
        } else {
          message.error(res?.data?.message || `添加失败，请重新尝试!`);
        }
        this.searchSolutionList(this.searchFormRef.current.getFieldsValue());
      },
    });
    this.handleCancel();
  };
  // 获取解决方信息  编辑
  getSolverInfo = (val) => {
    const { dispatch } = this.props;
    const { tenantId } = this.state;
    console.log('1111111111', val);
    this.Screening(val.groupId);
    dispatch({
      type: 'solutionManage/getSolverInfo',
      opt: {
        solverInfoId: val.id,
        tenantId: tenantId,
      },
      callback: (res) => {
        this.setState({
          showEditModal: true,
          solutionInfo: res?.data?.data || {},
        });
      },
    });
  };
  // 获取用户
  getUserInfoList = () => {
    const { dispatch } = this.props;
    const { tenantId } = this.state;
    dispatch({
      type: 'solutionManage/getUserInfoList',
      opt: {
        currentPage: 1,
        pageSize: 1000,
        tenantId: tenantId,
      },
      callback: (res) => {
        this.setState({
          userList: res?.data?.data?.list || [],
        });
      },
    });
  };
  // 获取产品
  getProductLists = () => {
    const { dispatch } = this.props;
    const { tenantId } = this.state;
    dispatch({
      type: 'solutionManage/getProductLists',
      opt: {
        currentPage: 1,
        pageSize: 1000,
      },
      callback: (res) => {
        this.setState({
          productList: res?.data?.data?.list || [],
        });
      },
    });
  };
  // 获取团队
  getGroupLists = () => {
    const { dispatch } = this.props;
    const { tenantId } = this.state;
    dispatch({
      type: 'solutionManage/getGroupLists',
      opt: {
        currentPage: 1,
        pageSize: 1000,
        userId: sessionStorage.getItem('userId'),
        tenantId: tenantId,
      },
      callback: (res) => {
        this.setState({
          groupList: res?.data?.data?.list || [],
        });
      },
    });
  };
  render() {
    const {
      showEditModal,
      userList,
      productList,
      groupList,
      showAddModal,
      delSolutionVisible,
      dataSource,
      solutionInfo,
    } = this.state;
    const formItemLayout = {
      labelCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 6,
        },
        md: {
          span: 6,
        },
      },
      wrapperCol: {
        xs: {
          span: 24,
        },
        sm: {
          span: 18,
        },
        md: {
          span: 18,
        },
      },
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
        title: '解决方案名称',
        dataIndex: 'solverName',
        key: 'solverName',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '团队主管',
        dataIndex: 'administratorName',
        key: 'administratorName',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '团队名称',
        dataIndex: 'groupName',
        key: 'groupName',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '产品名称',
        dataIndex: 'businessName',
        key: 'businessName',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '创建时间',
        dataIndex: 'createdTime',
        key: 'createdTime',
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => (
          <>
            <span>{this.timeShow(record.createdTime)}</span>
          </>
        ),
      },

      {
        title: '操作',
        key: 'updatedTime',
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => (
          <>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              type="primary"
              onClick={() => this.getSolverInfo(record)}
            >
              编辑
            </Button>
            <Button
              style={{ marginLeft: '10px' }}
              size="small"
              type="danger"
              onClick={() => this.showFormModal('del', record)}
            >
              删除
            </Button>
          </>
        ),
      },
    ];
    return (
      <div className={cx('solution')}>
        <Card className={cx('searchForm')} title="解决方管理">
          <Form
            {...formItemLayout}
            ref={this.searchFormRef}
            layout="inline"
            name="control-ref"
            onFinish={this.searchSolutionList}
          >
            <Form.Item name="solverName" label="解决方名">
              <Input />
            </Form.Item>
            <Form.Item name="groupId" label="团队名称">
              <Select
                allowClear
                showSearch
                optionFilterProp="children"
                filterOption={(input, option) => {
                  console.log(option, 'ddd');
                  return option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0;
                }}
              >
                {groupList?.map((item, index) => {
                  return (
                    <Option value={item.id} key={index}>
                      {item.groupName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Form.Item name="businessType" label="产品名称">
              <Select allowClear showSearch>
                {productList?.map((item, index) => {
                  return (
                    <Option value={item.serviceCode} key={index}>
                      {item.serviceName}
                    </Option>
                  );
                })}
              </Select>
            </Form.Item>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button htmlType="button" style={{ margin: '0 8px' }} onClick={this.onReset}>
              清空
            </Button>
          </Form>
        </Card>
        <Card className={cx('userLists')}>
          <Button key="submit" type="primary" onClick={() => this.showFormModal('add')}>
            添加
          </Button>
          <Table
            scroll={{ x: true }}
            rowKey={(record) => record.id}
            dataSource={dataSource.dataList}
            columns={columns}
            pagination={{ total: dataSource.total, onChange: this.changePage }}
          />
          {/* <Pagination
            showSizeChanger
            onChange={this.changePage}
            defaultCurrent={dataSource.currentPage}
            total={dataSource.total}
          /> */}
        </Card>
        <Modal
          title="删除解决方"
          visible={delSolutionVisible}
          footer={[
            <Button key="submit" type="primary" onClick={this.handleDelSolver}>
              确认
            </Button>,
            <Button onClick={this.handleCancel}>取消</Button>,
          ]}
          onOk={this.handleDelSolver}
          onCancel={this.handleCancel}
        >
          <div>即将删除{solutionInfo.solverName}!</div>
        </Modal>
        <CreateModal
          visible={showAddModal}
          onCancel={this.handleCancel}
          submitMap={this.handleAddSolver}
          Screening={this.Screening}
          cancelUserList={this.cancelUserList}
          currentData={solutionInfo}
          userList={userList}
          productList={productList}
          groupList={groupList}
        ></CreateModal>
        <EditModal
          visible={showEditModal}
          onCancel={this.handleCancel}
          submitMap={this.handleEditSolver}
          Screening={this.Screening}
          cancelUserList={this.cancelUserList}
          currentData={solutionInfo}
          userList={this.state.userList}
          productList={productList}
          groupList={groupList}
        ></EditModal>
      </div>
    );
  }
}
