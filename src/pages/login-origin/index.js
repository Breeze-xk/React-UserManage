// 首页欢迎页面

import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import { Button, Input, Form, message, Modal, Radio, Row, Col, Statistic } from 'antd';
// import styles from "./index.less";
import styles from './index.module.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import { qs, encryptorPassword, decryptVerify } from '../../utils/index';
const { Countdown } = Statistic;
import serverEnvConfig from 'serverEnvConfig';
import ReactSimpleVerify from 'react-simple-verify';
import './react-simple-verify.css';

const mapState2Props = ({ global, login }) => ({ global, login });

@connect(mapState2Props)
export default class Login extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      ID: '', //身份ID
      userID: '',
      identifyCode: '',
      lesseeList: [],
      visible: false,
      tenantId: '',
      isVerification: true,
      isForgetPwd: false,
      getVerificationCode: false, //获取验证码中
      smsCode: '',
      isVerify: true,
      flagVerify: 'false',
      isVerifyDisable: true,
      userKey: '',
      username: '',
      oldUserName: '',
    };
  }
  formRef = React.createRef();
  verify = React.createRef();
  componentDidMount() {
    console.log('this:::', this);
    // this.getType();
  }

  // 获取登录方式，目前第一版本先不区分，第二版本在做区分优化
  async getType() {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/getLoginType',
      opt: {
        configCode: 'LOGIN_AUTH',
        configKey: 'authedDesc',
      },
      callback: (res) => {
        console.log(res);
      },
    });
  }
  // 获取租户ID
  getLessee = async () => {
    const { ID } = this.state;
    const { dispatch, history } = this.props;
    await dispatch({
      type: 'login/getLessee',
      opt: {
        identifyId: ID,
      },
      callback: (res) => {
        sessionStorage.removeItem('tenantId');
        const Data = res?.data?.data;
        if (Data.length > 1) {
          this.setState({
            lesseeList: res?.data?.data,
            visible: res?.data?.data.length > 1 ? true : false,
          });
        } else {
          sessionStorage.setItem('tenantId', res?.data?.data[0]?.id);
          this.getUserId(res?.data?.data[0]?.id);
        }
      },
    });
  };
  // 获取用户ID
  getUserId = async (tenantId) => {
    sessionStorage.setItem('tenantId', tenantId);
    const { ID } = this.state;
    const { dispatch, history, location } = this.props;
    const res = await dispatch({
      type: 'login/getuserId',
      opt: {
        identifyId: ID,
        tenantId: tenantId,
      },
    });
    if (res?.data?.status == 200) {
      const userId = res?.data?.data?.id;
      sessionStorage.removeItem('userId');
      sessionStorage.setItem('userId', userId);
      const perRes = await dispatch({
        type: 'login/getPermission',
      });
      message.success('登录成功!');
      sessionStorage.setItem('permission', perRes?.data?.data?.permissions);
      sessionStorage.setItem('inOrganizationFlag', perRes?.data?.data?.inOrganizationFlag);
      // 判断进入页面的来源
      const queryObj = qs(location?.search);

      if (queryObj?.form == 'home') {
        if (
          (perRes?.data?.data?.permissions || []).indexOf(
            'permisionBusinessMember-operateProfit-3'
          ) > -1
        ) {
          window.open(`${serverEnvConfig.baseIP}/cloud-design/#/create`, '_self');
        } else {
          window.open(
            `${serverEnvConfig.baseIP}/cloud-design/#/customerHome`,
            // `${serverEnvConfig.baseIP}/#/home`,
            // `http://localhost:8080/#/home?userId=${userId}&tenantId=${tenantId}`,
            '_self'
          );
        }
      } else {
        history.push(`/personalCenter`);
      }
    } else {
      message.error(res?.data?.message || '登录失败!');
    }
  };

  onFinish = async (values) => {
    console.log(values);
    const { dispatch, history } = this.props;
    const { isVerification, isForgetPwd } = this.state;
    if (isForgetPwd) {
      await dispatch({
        type: 'login/checkCode',
        opt: {
          username: values.username,
          authValue: values.smsCode,
        },
        callback: (res) => {
          if (res?.data?.status == 200) {
            dispatch({
              type: 'login/updatPeassword',
              opt: {
                username: values.username,
                authValue: encryptorPassword(values?.password),
              },
              callback: (res) => {
                if (res?.data?.data) {
                  this.setState({
                    isForgetPwd: false,
                  });
                  this.formRef.current.setFieldsValue({
                    username: this.formRef.current.getFieldsValue().username,
                    password: '',
                  });
                  message.success('密码修改成功');
                }
              },
            });
          } else {
            message.error(res?.data?.data?.message || '验证码错误!');
          }
        },
      });
    } else {
      await dispatch({
        type: 'login/goLogin',
        opt: {
          authType: isVerification ? 'USERNAME' : 'PHONE',
          username: values.username,
          authValue: isVerification ? encryptorPassword(values?.password) : values.smsCode,
          codeType: 'login',
        },
        callback: (res) => {
          console.log('sdasdasda', res);
          if (res?.data?.status == 200) {
            this.setState(
              {
                ID: res?.data?.data?.id,
                identifyCode: res?.data?.data?.identifyCode,
              },
              () => {
                this.getLessee();
                // history.push(`/personalCenter?identifyCode=${res?.data?.data?.identifyCode}&tenantId=1`);
              }
            );
          } else {
            message.error(res?.data?.message?.message || '登录失败!');
            // 反回的 数据结构
            // data:{
            //     message: {stackTrace: Array(55), message: '账号或密码错误', suppressed: Array(0), localizedMessage: '账号或密码错误'}
            //     status: 500}
          }
        },
      });
    }
  };

  onFinishFailed = (errorInfo) => {
    console.log('Failed:', errorInfo);
  };

  handleRadio = (e) => {
    this.setState({
      tenantId: e.target.value,
    });
  };

  handleOk = async () => {
    const { tenantId, identifyCode } = this.state;
    if (tenantId) {
      await this.getUserId(tenantId);
      // this.props.history.push(
      //   `/personalCenter?identifyCode=${identifyCode}&tenantId=${tenantId}`
      // );
    } else {
      message.warn('请选择一个租户方可进入系统！');
    }
  };
  handleCancel = () => {
    this.setState({
      visible: false,
    });
  };
  reset() {
    this.verify?.current?.reset();
    this.formRef.current.resetFields();
    this.setState({
      isVerify: true,
      flagVerify: 'false',
      isVerifyDisable: true,
      getVerificationCode: false,
      oldUserName: '',
    });
  }
  // 获取验证码
  getVerification = () => {
    const { dispatch } = this.props;
    dispatch({
      type: 'login/getVerification',
      opt: {
        username: this.formRef.current.getFieldsValue().username,
        codeType: 'login',
        checkKey: encryptorPassword(
          decryptVerify(this.state.userKey).substring(
            0,
            decryptVerify(this.state.userKey).length - 4
          ) + this.state.flagVerify
        ),
      },
      callback: (res) => {
        if (res?.data?.status == 200) {
          this.setState({
            getVerificationCode: true,
          });
          setTimeout(() => {
            this.setState({
              getVerificationCode: false,
            });
          }, 60000);
        } else if (res?.data?.status == 500) {
          message.error(res?.data?.message);
          //密钥错误重新获取
          this.setState({
            flagVerify: 'false',
            isVerifyDisable: false,
            getVerificationCode: false,
          });
          this.verify?.current?.reset();
          this.getVerifyKey();
        } else {
          message.error(res?.data?.message);
        }
      },
    });
    this.setState({
      isVerifyDisable: true,
    });
  };
  forgetPwd = () => {
    this.setState({
      isForgetPwd: true,
    });
    this.formRef.current.setFieldsValue({
      username: this.formRef.current.getFieldsValue().username,
      password: '',
    });
  };
  handleOut = () => {
    window.open(`${serverEnvConfig.baseIP}/#/home`, '_self');
    sessionStorage.removeItem('userId');
    sessionStorage.removeItem('tenantId');
    sessionStorage.removeItem('permission');
    sessionStorage.removeItem('inOrganizationFlag');
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };
  getVerifyKey = () => {
    let reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    let username = this.formRef.current.getFieldsValue().username;
    if (reg.test(username)) {
      if (this.state.oldUserName != '' && username != this.state.oldUserName) {
        //更换手机号
        this.setState({
          flagVerify: 'false',
          isVerifyDisable: false,
          getVerificationCode: false,
        });
        this.verify?.current?.reset();
      } else {
        this.setState({
          isVerifyDisable: false,
          oldUserName: username,
        });
      }
      const { dispatch } = this.props;
      dispatch({
        type: 'login/checkKey',
        opt: {
          username: this.formRef.current.getFieldsValue().username,
        },
        callback: (res) => {
          if (res?.data?.status == 200) {
            let userKey = res?.data?.data?.username || '';
            this.setState({
              userKey: userKey,
            });
            this.setState({ isVerify: false });
          } else {
            message.error(res?.data?.message);
          }
        },
      });
    } else {
      //手机号格式不正确
      this.setState({
        isVerify: true,
        flagVerify: 'false',
        isVerifyDisable: true,
        getVerificationCode: false,
      });
      this.verify?.current?.reset();
    }
  };
  handleChangeNum = () => {};
  render() {
    const { history, location } = this.props;
    const {
      visible,
      lesseeList,
      isVerification,
      isForgetPwd,
      getVerificationCode,
      isVerify,
      flagVerify,
      isVerifyDisable,
    } = this.state;
    const renderButton = () => {
      if (isVerification) {
        return (
          <Button
            onClick={() => {
              this.setState(
                {
                  isVerification: false,
                },
                () => {
                  this.reset();
                }
              );
            }}
            type="text"
          >
            验证码登录
          </Button>
        );
      } else {
        return (
          <Button
            onClick={() => {
              this.setState(
                {
                  isVerification: true,
                },
                () => {
                  this.reset();
                }
              );
            }}
            type="text"
          >
            账号登录
          </Button>
        );
      }
    };
    const renderForm = () => {
      if (isVerification) {
        if (isForgetPwd) {
          return (
            <div>
              <Form.Item
                name="username"
                label="手机号"
                rules={[
                  {
                    required: true,
                    message: '请输入手机号',
                  },
                  {
                    pattern: /^1[3|4|5|6|7|8][0-9]{9}$/,
                    message: '请输入正确手机号!',
                  },
                ]}
                hasFeedback
              >
                <Input
                  placeholder="请输入手机号"
                  onchange={this.handleChangeNum}
                  onBlur={this.getVerifyKey}
                />
              </Form.Item>
              <Form.Item name="verify" label={<span className={cx('verifyLabel')}>校验</span>}>
                <div style={isVerifyDisable ? { pointerEvents: 'none' } : {}}>
                  <ReactSimpleVerify
                    ref={this.verify}
                    width={230}
                    success={() => {
                      this.setState({
                        flagVerify: 'true',
                      });
                    }}
                  />
                </div>
              </Form.Item>
              <Form.Item
                name="smsCode"
                label="验证码"
                rules={[
                  {
                    required: true,
                    message: '请输入验证码',
                  },
                ]}
                className={cx('verification')}
              >
                <Input placeholder="请输入验证码" />
              </Form.Item>
              <Button
                onClick={this.getVerification}
                style={{ width: '102px' }}
                disabled={getVerificationCode || isVerify || flagVerify == 'false'}
              >
                {getVerificationCode && (
                  <>
                    <Countdown format={'s'} value={Date.now() + 60 * 1000}></Countdown>秒
                  </>
                )}
                {!getVerificationCode && '获取验证码'}
              </Button>
              <Form.Item
                label="密码"
                name="password"
                rules={[
                  {
                    required: true,
                    message: '请输入新密码!',
                  },
                  {
                    max: 20,
                    message: '最长20位!',
                  },
                  {
                    min: 4,
                    message: '至少4位!!',
                  },
                  {
                    pattern: /^[A-Za-z\d_]+$/,
                    message: '只能包含字母数字下划线字符!',
                  },
                ]}
              >
                <Input.Password placeholder="请输入新密码" />
              </Form.Item>
              <Form.Item
                label="确认密码"
                name="confirm"
                rules={[
                  {
                    required: true,
                    message: '再次请输入新密码!',
                  },
                  {
                    max: 20,
                    message: '最长20位!',
                  },
                  {
                    min: 4,
                    message: '至少4位!!',
                  },
                  {
                    pattern: /^[A-Za-z\d_]+$/,
                    message: '只能包含字母数字下划线字符!',
                  },
                  ({ getFieldValue }) => ({
                    validator(_, value) {
                      if (!value || getFieldValue('password') === value) {
                        return Promise.resolve();
                      }
                      return Promise.reject(new Error('两次密码输入不一致!'));
                    },
                  }),
                ]}
              >
                <Input.Password placeholder="再次请输入新密码" />
              </Form.Item>
            </div>
          );
        } else {
          return (
            <div>
              <Form.Item
                label="账号"
                name="username"
                rules={[
                  {
                    required: true,
                    message: '请输入账号!',
                  },
                ]}
              >
                <Input placeholder="请输入账号" />
              </Form.Item>
              <Form.Item
                label="密码"
                name="password"
                className={cx('forgetPwd')}
                rules={[
                  {
                    required: true,
                    message: '请输入密码!',
                  },
                  {
                    max: 20,
                    message: '最长20位!',
                  },
                  {
                    min: 4,
                    message: '至少4位!!',
                  },
                  {
                    pattern: /^[A-Za-z\d_]+$/,
                    message: '只能包含字母数字下划线字符!',
                  },
                ]}
              >
                <Input.Password placeholder="请输入密码" />
              </Form.Item>
              <Button onClick={this.forgetPwd}>忘记密码</Button>
            </div>
          );
        }
      } else {
        return (
          <div>
            <Form.Item
              name="username"
              label="手机号"
              rules={[
                {
                  required: true,
                  message: '请输入手机号',
                },
                {
                  pattern: /^1[3|4|5|6|7|8][0-9]{9}$/,
                  message: '请输入正确手机号!',
                },
              ]}
              hasFeedback
            >
              <Input placeholder="请输入手机号" onBlur={this.getVerifyKey} />
            </Form.Item>
            <Form.Item name="verify" label={<span className={cx('verifyLabel')}>校验</span>}>
              <div style={isVerifyDisable ? { pointerEvents: 'none' } : {}}>
                <ReactSimpleVerify
                  ref={this.verify}
                  width={230}
                  success={() => {
                    this.setState({
                      flagVerify: 'true',
                    });
                  }}
                />
              </div>
            </Form.Item>

            <Form.Item
              name="smsCode"
              label="验证码"
              rules={[
                {
                  required: true,
                  message: '请输入验证码',
                },
              ]}
              className={cx('verification')}
            >
              <Input placeholder="请输入验证码" />
            </Form.Item>
            <Button
              onClick={this.getVerification}
              style={{ width: '102px' }}
              disabled={getVerificationCode || isVerify || flagVerify == 'false'}
            >
              {getVerificationCode && (
                <>
                  <Countdown format={'s'} value={Date.now() + 60 * 1000}></Countdown>秒
                </>
              )}
              {!getVerificationCode && '获取验证码'}
            </Button>
          </div>
        );
      }
    };

    const isHome = qs(location?.search)?.form == 'home';
    return (
      <div className={cx('login')}>
        <Row className={cx('center-box')}>
          {/* <div className={cx("left")}>
            {
              isHome ? <img width="100%" height="100%" src="http://www.tenio.com/upload/201811/1541153391175657.jpg" />
                : <img width="100%" height="100%" src="http://www.tenio.com/upload/201811/1541153391175657.jpg" />
            }
            
          </div> */}
          <Col span="14" className={cx('mod-new-reg')}>
            <h2
              className={cx('mod-new-reg-logo')}
              onClick={() => {
                this.handleOut();
              }}
            >
              图零科技
            </h2>
            <div className={cx('mod-new-reg-text')}>
              <h3>用科技</h3>
              <p>让复杂的世界更简单</p>
            </div>
          </Col>
          <Col span="10" className={cx('registerBox')}>
            <div className={cx('register_box')} style={{ height: isForgetPwd ? '500px' : '400px' }}>
              <h3>用户登录</h3>
              {isHome ? <p>图零科技---用户信息中心管理系统</p> : <p>内部页面专用</p>}
              <div className={cx('login-box')}>
                <Form
                  ref={this.formRef}
                  name="login"
                  onFinish={this.onFinish}
                  onFinishFailed={this.onFinishFailed}
                >
                  {renderForm()}
                  <div className={cx('register-btn')}>
                    <Button
                      onClick={() => {
                        history.push('/register');
                      }}
                      type="text"
                    >
                      注册
                    </Button>
                    {isForgetPwd && (
                      <Button
                        onClick={() => {
                          this.setState({
                            isForgetPwd: false,
                          });
                        }}
                        type="text"
                      >
                        返回登录
                      </Button>
                    )}
                    {renderButton()}
                  </div>
                  <div className={cx('login-btn')}>
                    {isForgetPwd ? (
                      <Button size="large" type="primary" htmlType="submit">
                        修改密码
                      </Button>
                    ) : (
                      <Button size="large" type="primary" htmlType="submit">
                        登录
                      </Button>
                    )}
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
        <Modal
          title="请选择您已拥有的其中一个租户，方可进入系统"
          visible={visible}
          onOk={this.handleOk}
          onCancel={this.handleCancel}
          okText="确定"
          cancelText="取消"
        >
          <Radio.Group
            // defaultValue={lesseeList[0][id]}
            onChange={this.handleRadio}
            buttonStyle="solid"
          >
            {lesseeList.map((item) => {
              return <Radio value={item.id}>{item.tenantName}</Radio>;
            })}
          </Radio.Group>
        </Modal>
      </div>
    );
  }
}
