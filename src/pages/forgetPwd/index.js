import React from 'react';
import { connect } from 'dva';
import { Steps, Statistic, Modal, Form, Input, Button, message, Row, Col, Card } from 'antd';
const { Step } = Steps;
const { Countdown } = Statistic;

// import styles from "./index.less";
import styles from './index.module.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import ReactSimpleVerify from 'react-simple-verify';
import 'react-simple-verify/dist/react-simple-verify.css';
import { qs, encryptorPassword, decryptVerify } from '../../utils/index';

const mapState2Props = ({ loading, forgetPwd, global }) => ({
  global,
  forgetPwd,
  loading,
});
@connect(mapState2Props)
export default class ForgetPwd extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
      getVerificationCode: false,
      isVerify: true,
      isVerifyDisable: true,
      flagVerify: 'false',
      userKey: '',
    };
  }
  verificationRef = React.createRef();
  resetRef = React.createRef();
  verify = React.createRef();

  componentDidMount() {
    console.log('sss', this.props.userInfo);
    this.verificationRef.current.setFieldsValue({
      username: this.props.userInfo.username,
    });
    this.getVerifyKey();
  }
  // 手机号验证成功
  verificationFinish = (values) => {
    this.props.verificationFinish(values);
  };
  // 修改密码
  resetFinish = (values) => {
    const { username } = this.state;
    console.log('username',username)
    this.props.changePwd({
      authValue: values?.authValue,
      username: username,
    });
  };
  getVerifyKey = () => {
    let reg = /^1[3|4|5|6|7|8][0-9]{9}$/;
    let username = this.props.userInfo.username;
    if (reg.test(username)) {
      this.setState({
        isVerifyDisable: false,
      });

      const { dispatch } = this.props;
      dispatch({
        type: 'personalCenter/checkKey',
        opt: {
          username: username,
        },
        callback: (res) => {
          if (res?.data?.status == 200) {
            let userKey = res?.data?.data?.username || '';
            this.setState({
              userKey: userKey,
            });
            this.setState({ isVerify: false });
            console.log('userKey');
          } else {
            message.error(res?.data?.message);
          }
        },
      });
    } else {
      this.setState({
        isVerify: true,
        flagVerify: 'false',
        isVerifyDisable: true,
        getVerificationCode: false,
      });
      this.verify?.current?.reset();
    }
  };
  // 获取验证码
  getVerification = () => {
    this.setState({
      username: this.verificationRef.current.getFieldsValue().username,
    });
    const { dispatch } = this.props;
    dispatch({
      type: 'personalCenter/getVerification',
      opt: {
        username: this.verificationRef.current.getFieldsValue().username,
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
        } else {
          message.error(res?.data?.message);
        }
      },
    });
  };
  render() {
    const { current } = this.props;
    const { getVerificationCode, isVerifyDisable, isVerify, flagVerify } = this.state;
    return (
      <div className={cx('verificationContainer')}>
        <Steps size="small" current={current}>
          <Step title="验证" />
          <Step title="重置" />
          <Step title="完成" />
        </Steps>
        <div className={cx('stepContainer')}>
          {current == 0 && (
            <>
              <p className={cx('tips')}>
                请输入与您的账号关联的电话号码，我们会给您发送验证码来重置密码｡
              </p>
              <Form ref={this.verificationRef} name="login" onFinish={this.verificationFinish}>
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
                  <Input placeholder="请输入手机号" disabled />
                </Form.Item>
                <Form.Item name="verify" label={<span className={cx('verifyLabel')}>校验</span>}>
                  <div
                    style={{
                      pointerEvents: isVerifyDisable ? 'none' : 'auto',
                    }}
                  >
                    <ReactSimpleVerify
                      ref={this.verify}
                      width={352}
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
                  className={cx('verificationBtn')}
                  onClick={this.getVerification}
                  disabled={getVerificationCode || isVerify || flagVerify == 'false'}
                >
                  {getVerificationCode && (
                    <>
                      <Countdown format={'s'} value={Date.now() + 60 * 1000}></Countdown>
                      秒
                    </>
                  )}
                  {!getVerificationCode && '获取验证码'}
                </Button>
                <div>
                  <Button size="large" type="primary" htmlType="submit" className={cx('nextBtn')}>
                    下一步
                  </Button>
                </div>
              </Form>
            </>
          )}
          {current == 1 && (
            <>
              <Form ref={this.resetRef} name="login" onFinish={this.resetFinish}>
                <Form.Item
                  label="密码"
                  name="authValue"
                  rules={[
                    {
                      required: true,
                      message: '请输新入密码!',
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
                  <Input.Password placeholder="请输新入密码" />
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
                        if (!value || getFieldValue('authValue') === value) {
                          return Promise.resolve();
                        }
                        return Promise.reject(new Error('两次密码输入不一致!'));
                      },
                    }),
                  ]}
                >
                  <Input.Password placeholder="再次请输入新密码" />
                </Form.Item>
                <div>
                  <Button size="large" type="primary" htmlType="submit" className={cx('nextBtn')}>
                    下一步
                  </Button>
                </div>
              </Form>
            </>
          )}
          {current == 2 && (
            <>
              <div className={cx('successbox')}>密码重置成功！</div>
            </>
          )}
        </div>
      </div>
    );
  }
}
