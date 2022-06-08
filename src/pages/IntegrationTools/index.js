import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import { connect } from 'dva';
import { message, Radio, Spin, Row, Col, Modal, Form, Input, Card, Button } from 'antd';
const { TextArea } = Input;

import { ExclamationCircleOutlined } from '@ant-design/icons';
import classnames from 'classnames/bind';
import styles from './index.module.less';

const cx = classnames.bind(styles);
import _ from 'lodash';
const mapStateToProps = ({ global, integrationTools }) => ({
  global,
  integrationTools,
});
import CreateModal from './component/createModal';
@connect(mapStateToProps)
export default class IntegrationTools extends Component {
  constructor(props) {
    super(props);
    this.state = {
      spinLoad: false,
      visible: false,
      businessList: [],
      businessType: '',
      businessTypeList: [],
    };
  }

  componentDidMount() {
    this.setState({
      spinLoad: true,
    });
    this.getBusinessType();
  }
  getBusinessType = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'integrationTools/getBusinessType',
      opt: {},
      callback: (res) => {
        console.log('wwww', res?.data?.data);
        if (res?.data?.status == 200) {
          this.setState(
            {
              businessTypeList: res?.data?.data || [],
              businessType: res?.data?.data?.[0]?.businessType || '',
            },
            () => {
              this.getBusinessList();
            }
          );
        } else {
          this.setState({
            spinLoad: false,
          });
          message.error(res?.data?.message);
        }
      },
    });
  };
  // 初始化页面高度
  initHeight = () => {
    const spinDom = ReactDOM.findDOMNode(this.viewWrapperRefzh.current);
    let height = window.innerHeight - spinDom?.getBoundingClientRect()?.top;
    if (height && height > 450) {
      this.setState({
        viewerBoxHeight: height - 60,
      });
    }
  };
  changeBusinessType=(businessType)=>{
    this.setState({
      businessType:businessType
    },()=>{
      this.getBusinessList()
    })
  }
  getBusinessList = () => {
    const { dispatch } = this.props;
    const { businessType } = this.state;
    dispatch({
      type: 'integrationTools/getBusinessList',
      opt: {
        productDefinitionId: '10',
        businessType: businessType,
      },
      callback: (res) => {
        console.log('333333', res);
        if (res?.data?.status == 200) {
          this.setState({
            spinLoad: false,
            businessList: res?.data?.data?.list || [],
          });
        } else {
          this.setState({
            spinLoad: false,
          });
          message.error(res?.data?.message || '服务端错误！');
        }
      },
    });
  };
  addBusinessList = (values) => {
    console.log('eeeee', values);
    const { dispatch } = this.props;
    dispatch({
      type: 'integrationTools/addBusinessList',
      opt: {
        businessName: values?.businessName,
        businessType: values?.businessType,
        productDefinitionId: 10,
        businessDesc: {
          ...values,
        },
      },
      callback: (res) => {
        console.log('444', res);
        if (res?.data?.status == 200) {
          this.addModalCancel();
          this.getBusinessType();
        } else {
          this.addModalCancel();
          message.error(res?.data?.message || '服务端错误！');
        }
      },
    });
  };
  deleteBusinessList = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'integrationTools/deleteBusinessList',
      opt: {
        productDefinitionId: '10',
      },
      callback: (res) => {
        console.log('555', res);
      },
    });
  };
  showAddModal = () => {
    this.setState({
      visible: true,
    });
  };
  addModalCancel = () => {
    this.setState({
      visible: false,
    });
  };
  // 上架，下架
  storeUpDefinition = (storeUpFlag, business) => {
    this.setState({
      spinLoad: true,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'integrationTools/storeUpDefinition',
      opt: {
        storeUpFlag: storeUpFlag,
        businessDefinitionId: business?.id,
      },
      callback: (res) => {
        if (res?.data?.status == 200) {
          this.getBusinessList();
        } else {
          this.setState({
            spinLoad: false,
          });
          message.error(res?.data?.message || '服务端错误！');
        }
        console.log('555', res);
      },
    });
  };
  render() {
    const { spinLoad, businessList, visible, businessTypeList } = this.state;
    const { readOnly, dispatch } = this.props;

    return (
      <div className={cx('IntegrationTools_box')}>
        <Spin spinning={spinLoad} size="large" className={cx('spin')}>
          <Button onClick={this.showAddModal}>自定义应用</Button>
          <div className={cx('businessType-list')}>
            {businessTypeList?.map((item, index) => {
              return <Button type="text" className={cx('businessTypeSpan')} onClick={()=>{this.changeBusinessType(item?.businessType)}} key={index}>{item?.businessType == ''?"空字符串":item?.businessType}</Button>;
            })}
          </div>
          <Row className={cx('businessList')}>
            {businessList?.map((business) => {
              return (
                <Col span={12}>
                  <Card className={cx('IntegrationTools_Card')}>
                    <div className={cx('card-cover')}>
                      <img
                        alt="example"
                        src={business?.businessDesc?.logo}
                      />
                    </div>
                    <div className={cx('card-body')}>
                      <div className={cx('cardTitleRow')}>
                        <span className={cx('card-title')}>{business?.businessName}</span>
                        <span className={cx('btn-span')}>
                          <Button
                            disabled={business?.businessStatus == 0}
                            onClick={() => {
                              this.storeUpDefinition(0, business);
                            }}
                          >
                            上架
                          </Button>
                          <Button
                            disabled={business?.businessStatus == 1}
                            onClick={() => {
                              this.storeUpDefinition(1, business);
                            }}
                          >
                            下架
                          </Button>
                        </span>
                      </div>
                      <div className={cx('card-content')}>
                        <p className={cx('card-price')}>${business?.businessDesc?.price}</p>
                        <p className={cx('businessDescribe')}>{business?.businessDesc?.businessDescribe}</p>
                      </div>
                    </div>
                  </Card>
                </Col>
              );
            })}
          </Row>
          <CreateModal
            visible={visible}
            dispatch={this.props.dispatch}
            addModalCancel={this.addModalCancel}
            addBusinessList={this.addBusinessList}
          />
        </Spin>
      </div>
    );
  }
}
