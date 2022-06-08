import React from 'react';
import { connect } from 'dva';
import { Table, Tree, Select, Modal, Form, Input, Button, message, Row, Col, Card } from 'antd';

import styles from './index.module.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import { setTreeData } from '../../utils/index';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  FolderOpenOutlined,
  FileOutlined,
} from '@ant-design/icons';
const { TreeNode } = Tree;

const mapState2Props = ({ global, formEngine }) => ({ global, formEngine });
import CreateModal from './component/createModal';
import ChildFormModal from './component/childFormModal';
import { v4 as uuidv4 } from 'uuid';

@connect(mapState2Props)
export default class formEngine extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      dataSource: [],
      isDetail: false,
      expandedKeys: [],
      autoExpandParent: true,
      checkedKeys: [],
      treeData: {}, //树
      procDefId: '', //流程id
      processList: [], // 流程list
      taskList: [], //关联任务
      userLists: [], //用户list
      groupLists: [], //群组
      isParent: true, //是否点击的父节点
      visibleChildFormModal: false, //新增子表单
    };
    this.columns = [
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
        title: 'instanceLabel',
        key: 'instanceLabel',
        dataIndex: 'instanceLabel',
      },
      {
        title: 'procDefId',
        key: 'procDefId',
        dataIndex: 'procDefId',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: 'procFormName',
        key: 'procFormName',
        dataIndex: 'procFormName',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: 'procFormType',
        key: 'procFormType',
        dataIndex: 'procFormType',
        textWrap: 'word-break',
        ellipsis: true,
      },
      {
        title: '操作',
        key: 'ee',
        textWrap: 'word-break',
        ellipsis: true,
        render: (text, record) => {
          return (
            <span
              onClick={() => {
                this.workflowDetail(text?.procDefId);
              }}
            >
              详情
            </span>
          );
        },
      },
    ];
  }
  formRef = React.createRef();
  formRefChildren = React.createRef();
  componentDidMount() {
    this.workflowList();
    this.getProcess();
    this.getUserLists();
    this.getGroupLists();
  }
  // 表单列表
  workflowList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'formEngine/workflowList',
      opt: {},
      callback: (res) => {
        const list = res?.data?.data || [];
        this.setState({
          dataSource: list?.list,
        });
      },
    });
  };
  // get表单详情
  workflowDetail = (procDefId) => {
    const { dispatch } = this.props;
    dispatch({
      type: 'formEngine/getWorkflow',
      opt: {
        procDefId: procDefId,
      },
      callback: (res) => {
        const data = res?.data?.data || [];
        let taskForms = data?.procFormDesc?.taskForms || [];
        let arr = [];
        taskForms?.map((item, index) => {
          arr.push({
            title: item?.formContent?.name,
            key: item?.formContent?.key,
          });
        });
        
        this.setState(
          {
            treeData: [
              {
                title: data?.instanceLabel,
                key: data?.procDefKey,
                isParent: true,
                children: arr,
              },
            ],
          },
          () => {
            this.setState(
              {
                isDetail: true,
                workflowData: data,
              },
              () => {
                this.formRef.current.setFieldsValue({
                  process: data?.procDefKey || '',
                  administrators: data?.authInfo?.managers?.[0].id || '',
                  visibleGroups: data?.authInfo?.authGroups?.[0]?.id || '',
                });
              }
            );
          }
        );
      },
    });
  };
  // 关联流程
  getProcess = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'formEngine/getProcess',
      opt: {},
      callback: (res) => {
        const list = res?.data?.data || [];
        this.setState(
          {
            processList: list,
            // procDefId: list[0]?.actProcdefId,
          }
          // () => {
          //   this.formRef.current.setFieldsValue({
          //     process: list[0]?.actProcdefId,
          //   });
          //   this.getNodes();
          // }
        );
      },
    });
  };
  // 通过流程获取任务
  getNodes = () => {
    const { dispatch } = this.props;
    const { procDefId } = this.state;
    dispatch({
      type: 'formEngine/getNodes',
      opt: {
        procDefId: procDefId,
      },
      callback: (res) => {
        const list = res?.data?.data || [];
        this.setState({
          taskList: list,
        });
      },
    });
  };
  // 用户列表
  getUserLists = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'formEngine/getUserLists',
      opt: {},
      callback: (res) => {
        const list = res?.data?.data || [];
        this.setState({
          userLists: list?.list,
        });
      },
    });
  };
  // 群组
  getGroupLists = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'formEngine/getGroupLists',
      opt: {},
      callback: (res) => {
        const list = res?.data?.data || [];
        this.setState({
          groupLists: list?.list,
        });
      },
    });
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
  // 点击树
  onSelect = (selectedKeysValue, info) => {
    this.setState({ selectedKeys: selectedKeysValue, isParent: info.node.isParent || false });
  };
  // 新增表单确认
  submitMap = (value) => {
    let managers = [],
      authGroups = [];
    value?.administrators?.forEach((element) => {
      let obj = this.state.userLists.filter((item) => item.id == value?.administrators)?.[0] || {};
      managers.push(obj);
    });
    value?.authGroups?.forEach((element) => {
      let obj = this.state.groupLists.filter((item) => item.id == value?.authGroups)?.[0] || {};
      authGroups.push(obj);
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'formEngine/saveWorkflow',
      opt: {
        procFormName: value?.formName,
        procDefKey: value?.process,
        procDefId: value?.process,
        instanceLabel: value?.formName,
        authInfo: { managers: managers, authGroups: authGroups },
        procFormDesc: {
          taskForms: [],
        },
      },
      callback: (res) => {
        this.onCancel();
        this.workflowList();
      },
    });
  }
  // 取消新增表单
  onCancel = () => {
    this.setState({
      visibleModal: false,
    });
  };
  renderTreeNodes = (data) => {
    let nodeArr = data.map((item) => {
      item.iconnode = (
        <>
          <span>{item.title}</span>
          {item?.isParent ? (
            <span>
              <PlusOutlined style={{ marginLeft: 10 }} onClick={() => this.showAddModa(item)} />
            </span>
          ) : (
            <span>
              <EditOutlined
                style={{ marginLeft: 10 }}
                onClick={() => this.showAddModa(item, 'edit')}
              />
              <DeleteOutlined
                style={{ marginLeft: 10 }}
                onClick={() => this.showAddModa(item, 'del')}
              />
            </span>
          )}
        </>
      );
      if (item.children) {
        return (
          <TreeNode title={item.iconnode} key={item.key} dataRef={item}>
            {this.renderTreeNodes(item.children)}
          </TreeNode>
        );
      }
      return <TreeNode title={item.iconnode} key={item.key} dataRef={item} />;
    });
    return nodeArr;
  };
  // 树节点icon
  showAddModa = (item, type) => {
    console.log('333', item, type);
    switch (type) {
      case 'edit':
        this.setState({
          visibleChildFormModal: true,
          initValues: {
            childFormName: item.title,
          },
        });
        break;
      case 'del':
        const { workflowData } = this.state;

        let ind = workflowData?.procFormDesc?.taskForms.findIndex((temp, index) => {
          console.log('temp', temp);
          return temp.formContent.key == item.key;
        });
        workflowData?.procFormDesc?.taskForms.splice(ind, 1);

        console.log('444', workflowData, ind);
        Modal.confirm({
          title: '确认删除？',
          okText: '继续',
          cancelText: '返回静态利润测算',
          onOk: async () => {
            const { dispatch } = this.props;
            dispatch({
              type: 'formEngine/saveWorkflow',
              opt: workflowData,
              callback: (res) => {
               this.setState({workflowData});
               this.workflowList();
              },
            });
          },
          onCancel() {},
        });
        break;
      default:
        this.setState({
          visibleChildFormModal: true,
        });
        break;
    }
  };
  // 新增子表单确认
  addChildForm = (data) => {
    const { dispatch } = this.props;
    const { workflowData } = this.state;
    workflowData?.procFormDesc?.taskForms.push({
      formContent: {
        name: data?.childFormName,
        key: uuidv4(),
      },
      taskDefKey: '',
      taskConfig: {
        candidate: [
          {
            type: '',
            relId: '',
          },
        ],
        assigeeSource: {
          type: 'CREATER',
          option: {
            groupIds: [],
          },
        },
      },
      formSource: 'CUSTOM',
      formConfig: {},
    });
    dispatch({
      type: 'formEngine/saveWorkflow',
      opt: workflowData,
      callback: (res) => {
        // const list = res?.data?.data || [];
        this.closeChildFormModal();
        this.workflowList();
      },
    });
  };
  // 取消新增子表单
  closeChildFormModal = () => {
    this.setState({
      visibleChildFormModal: false,
    });
  };
  render() {
    const {
      processList,
      groupLists,
      taskList,
      userLists,
      expandedKeys,
      autoExpandParent,
      selectedKeys,
      isDetail,
      treeData,
      isParent,
      dataSource,
      visibleModal,
      visibleChildFormModal,
      initValues,
    } = this.state;
    return (
      <>
        {isDetail ? (
          <div className={cx('detailFormBox')}>
            <Tree
              onExpand={this.onExpand}
              expandedKeys={expandedKeys}
              autoExpandParent={autoExpandParent}
              onSelect={this.onSelect}
              selectedKeys={selectedKeys}
              className={cx('formTree')}
            >
              {this.renderTreeNodes(treeData)}
            </Tree>
            {isParent ? (
              <Form ref={this.formRef} className={cx('searchForm')} layout="inline">
                <Form.Item label="关联流程" name="process">
                  <Select
                    placeholder="请选择服务状态"
                    allowClear
                    onChange={(value) => {
                      this.setState(
                        {
                          procDefId: value,
                        },
                        () => {
                          this.getNodes();
                        }
                      );
                    }}
                  >
                    {processList?.map((item) => {
                      return (
                        <Select.Option value={item?.actProcdefId}>{item?.defName}</Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="流程实例前缀" name="instancePrefix">
                  <Input placeholder="请输入流程实例前缀" />
                </Form.Item>
                <Form.Item label="管理员" name="administrators">
                  <Select placeholder="请选择管理员" allowClear showSearch>
                    {(userLists||[])?.map((item) => {
                      return (
                        <Select.Option value={item?.id} key={item?.id}>
                          {item?.username}
                        </Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="授权可见组" name="visibleGroups">
                  <Select placeholder="请选择授权可见组" allowClear showSearch>
                    {(groupLists||[])?.map((item) => {
                      return <Select.Option value={item?.id}>{item?.groupName}</Select.Option>;
                    })}
                  </Select> 
                 </Form.Item>
              </Form>
            ) : (
              <Form ref={this.formRefChildren} className={cx('searchForm')} layout="inline">
                <Form.Item label="处理人" name="handler">
                  <Select placeholder="请选择处理人" allowClear>
                    {(userLists||[])?.map((item) => {
                      return <Select.Option value={item?.id}>{item?.username}</Select.Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="候选组" name="candidateGroup">
                  <Select placeholder="请选择候选组" allowClear showSearch>
                    {(groupLists||[])?.map((item) => {
                      return <Select.Option value={item?.id}>{item?.groupName}</Select.Option>;
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="关联任务" name="associatedTask">
                  <Select placeholder="请选择关联任务" allowClear showSearch>
                    {(taskList||[])?.map((item) => {
                      return (
                        <Select.Option value={item?.taskDefKey}>{item?.taskDefName}</Select.Option>
                      );
                    })}
                  </Select>
                </Form.Item>
                <Form.Item label="表单选择" name="tenantCode">
                  <Input type="text" placeholder=""></Input>
                </Form.Item>
              </Form>
            )}
          </div>
        ) : (
          <>
            <Button
              type="primary"
              onClick={() => {
                this.setState({
                  visibleModal: true,
                });
              }}
            >
              新增
            </Button>
            <Table
              scroll={{ x: true }}
              style={{ marginTop: '20px' }}
              dataSource={dataSource}
              columns={this.columns}
              pagination={false}
              rowKey={(record) => record.id}
            />
          </>
        )}

        <CreateModal
          visible={visibleModal}
          processList={processList}
          userLists={userLists}
          groupLists={groupLists}
          onCancel={this.onCancel}
          submitMap={this.submitMap}
        ></CreateModal>
        <ChildFormModal
          visible={visibleChildFormModal}
          initValues={initValues}
          onCancel={this.closeChildFormModal}
          processList={processList}
          userLists={userLists}
          groupLists={groupLists}
          submitMap={this.addChildForm}
        />
      </>
    );
  }
}
