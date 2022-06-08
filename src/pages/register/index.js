// 用户注册

import React, { Component, PureComponent } from 'react';
import { connect } from 'dva';
import styles from './index.module.less';
import classnames from 'classnames/bind';

const cx = classnames.bind(styles);
import {
  Form,
  Input,
  Statistic,
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
const { Countdown } = Statistic;
import { qs, encryptorPassword, decryptVerify } from '../../utils/index';
import serverEnvConfig from 'serverEnvConfig';
import ReactSimpleVerify from 'react-simple-verify';
import 'react-simple-verify/dist/react-simple-verify.css';
import md5 from 'js-md5';

import { v4 as uuidv4 } from 'uuid';

const mapState2Props = ({ global, register }) => ({ global, register });
@connect(mapState2Props)
export default class Register extends Component {
  formRef = React.createRef();
  verify = React.createRef();

  constructor(props) {
    super(props);
    this.state = {
      smsCode: '',
      isTeam: false,
      getVerificationCode: false,
      isVerify: true,
      flagVerify: 'false',
      oldUserName: '',
      isVerifyDisable: true,
      userKey: '',
    };
  }
  componentDidMount() {}
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
  reset() {
    this.verify?.current?.reset();
    this.formRef?.current?.resetFields();
    this.setState({
      isVerify: true,
      userKey: '',
      isVerifyDisable: true,
      getVerificationCode: false,
      flagVerify: 'false',
      oldUserName: '',
    });
  }
  getVerifyKey = () => {
    let reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    let username = this.formRef.current.getFieldsValue().username;
    if (reg.test(username)) {
      if (this.state.oldUserName != '' && username != this.state.oldUserName) {
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
        type: 'register/checkKey',
        opt: {
          username: this.formRef.current.getFieldsValue().username,
        },
        callback: (res) => {
          if (res?.data?.status == 200) {
            console.log(res?.data?.data?.username);
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
      this.setState({
        isVerify: true,
        flagVerify: 'false',
        getVerificationCode: false,
        isVerifyDisable: true,
      });
      this.verify?.current?.reset();
    }
  };
  render() {
    const { isTeam, getVerificationCode, isVerify, isVerifyDisable, flagVerify } = this.state;
    const onFinish = async (values) => {
      const { dispatch, history } = this.props;
      const res = await dispatch({
        type: 'register/goRegister',
        opt: {
          username: values.username,
          nickName: values?.nickName,
          phoneNumber: values.username,
          smsCode: values.smsCode,
          groupCode: values.groupCode,
          // tenantId: serverEnvConfig.tenantId,
          tenantId: 3,
          authValue: encryptorPassword(values?.password),
          codeType: 'register',
          userDesc: {
            remark: '',
          },
        },
      });

      if (res.data.status === 200) {
        sessionStorage.clear();
        message.success(`注册成功`);
        // sessionStorage.setItem('tenantId', serverEnvConfig.tenantId);
        sessionStorage.setItem('tenantId', 3);
        sessionStorage.setItem('userId', res?.data?.data);
        const perRes = await dispatch({
          type: 'register/getPermission',
        });
        sessionStorage.setItem('permission', perRes?.data?.data?.permissions);
        sessionStorage.setItem('inOrganizationFlag', perRes?.data?.data?.inOrganizationFlag);
        // 判断进入页面的来源
        const queryObj = qs(this.props.location?.search);
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
        message.error(res.data?.message);
      }
    };
    const getVerification = () => {
      const { dispatch } = this.props;
      dispatch({
        type: 'register/getVerification',
        opt: {
          username: this.formRef.current.getFieldsValue().username,
          codeType: 'register',
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
    };

    const renderButton = () => {
      return (
        <div style={{margin: "0 0 20px 25px"}}>
          <Button
            type={isTeam ? "text" : "link"}
            className={cx('signup-btn')}
            onClick={() => {
              this.setState({
                isTeam: false,
              });
              this.reset();
            }}
          >
            游客注册
          </Button>
          <span style={{fontSize: 30, marginRight: 20}}>/</span>
          <Button
            type={isTeam ? "link" : "text"}
            className={cx('signup-btn')}
            onClick={() => {
              this.setState({
                isTeam: true,
              });
              this.reset();
            }}
          >
            团队注册
          </Button>
        </div>
      )
    };

    const registerBoxStyle = () => {
      if (isTeam) {
        return {
          height: '620px'
        }
      } else {
        return {
          height: '560px'
        }
      }
    }
    return (
      <div className={cx('registerContainer')}>
        <Row style={{ height: '100%' }}>
          <Col span="14" className={cx('mod-new-reg')}>
            <div
              className={cx('mod-new-reg-logo')}
            >
              <div
                className={cx('mod-new-reg-logo-box')}
                onClick={() => {
                  this.handleOut();
                }}
              >
                <h3>WELCOME.</h3>
                <h3>&lt;欢迎来到&gt;</h3>
                <h3 style={{fontSize: 54}}>图零科技<span className={cx("twinkle")}>_</span></h3>
              </div>
            </div>
          </Col>

          <Col span="10" className={cx('registerBox')}>
            <div className={cx('register-box')} style={registerBoxStyle()}>
              <div className={cx('new-reg-guide-login')}>
                <h3 style={{marginLeft: 25}}>SIGN UP.</h3>
                <Form ref={this.formRef} name="register" labelAlign="left" onFinish={onFinish} scrollToFirstError>
                  {renderButton()}
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
                    <div
                      style={{
                        pointerEvents: isVerifyDisable ? 'none' : 'auto',
                      }}
                    >
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
                    type="primary"
                    onClick={() => {
                      getVerification();
                    }}
                    style={{ width: '102px', marginLeft: 8 }}
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
                    name="nickName"
                    label="姓名"
                    rules={[
                      {
                        required: true,
                        message: '请输入姓名',
                      },
                      {
                        pattern: /^([\u4e00-\u9fa5]{1,20}|[a-zA-Z\.\s]{1,20})$/,
                        message: '请输入正确姓名!',
                      },
                    ]}
                    hasFeedback
                  >
                    <Input placeholder="请输入姓名" />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    label="密码"
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
                    hasFeedback
                  >
                    <Input.Password />
                  </Form.Item>

                  <Form.Item
                    name="confirm"
                    label="确认密码"
                    dependencies={['password']}
                    hasFeedback
                    rules={[
                      {
                        required: true,
                        message: '请确认密码!',
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
                    <Input.Password />
                  </Form.Item>
                  {isTeam && (
                    <Form.Item
                      name="groupCode"
                      label="团队邀请码"
                      rules={[
                        {
                          required: true,
                          message: '请输入团队邀请码',
                        },
                      ]}
                    >
                      <Input placeholder="请输入团队邀请码" />
                    </Form.Item>
                  )}
                  <div className={cx("register-btn-box")}>
                    <Button
                      type="default"
                      onClick={() => {
                        this.props.history.push('/login');
                      }}
                    >
                      登录
                    </Button>
                    <Button style={{ marginLeft: '20px' }} type="primary" htmlType="submit" className={cx('submitBtn')}>
                      注册
                    </Button>
                  </div>
                </Form>
              </div>
            </div>
          </Col>
        </Row>
      </div>
    );
  }
}
