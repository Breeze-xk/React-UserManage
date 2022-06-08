import React, { Component } from 'react';
import styles from './index.module.less';
import classnames from 'classnames/bind';
import _ from 'lodash';
const cx = classnames.bind(styles);
import { connect } from 'dva';
import { Button, Modal, Form, Input, Select, InputNumber, message, Upload } from 'antd';
const { TextArea } = Input;
import serverEnvConfig from 'serverEnvConfig';

import { DeleteOutlined, PlusOutlined, FormOutlined } from '@ant-design/icons';

export default class CreateModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      logo: '',
      largeLogo: '',
      fileList: [],
      largrLileList: [],
    };
    this.formRef = React.createRef();
  }

  componentDidMount() {
    // this.initData();
  }
  cancel = () => {
    this.formRef.current.resetFields();
    this.setState({
      logo: '',
      largeLogo: '',
    });
    this.props.addModalCancel();
  };

  importFile = (file, type) => {
    console.log('rrr', new Blob([file]));
    const { dispatch } = this.props;
    dispatch({
      type: 'integrationTools/convertFile',
      opt: {
        file,
      },
      callback: (res) => {
        if (res?.data?.status == 200) {
          if (type == 'logo') {
            this.setState({
              logo: 'http://www.to0-ai.com' + '/' + res?.data?.data?.targetFileName,

              // logo:  serverEnvConfig.baseIP + '/' +res?.data?.data?.targetFileName,
            });
          } else {
            this.setState({
              largeLogo: 'http://www.to0-ai.com' + '/' + res?.data?.data?.targetFileName,
              // largeLogo: serverEnvConfig.baseIP + '/' +res?.data?.data?.targetFileName,
            });
          }
        } else {
          message.error(res?.data?.message);
        }
      },
    });
  };
  // 限制输入框输入小数为两位
  limitDecimals = (value) => {
    const reg = /^(\-)*(\d+)\.(\d\d).*$/;
    if (typeof value === 'string') {
      return !isNaN(Number(value)) ? value.replace(reg, '$1$2.$3') : 0;
    } else if (typeof value === 'number') {
      return !isNaN(value) ? String(value).replace(reg, '$1$2.$3') : 0;
    } else {
      return 0;
    }
  };
  render() {
    const { logo, largeLogo, fileList, largrLileList } = this.state;
    const { visible } = this.props;
    const btnArr = [
      <Button onClick={this.cancel}>取消</Button>,
      <Button
        onClick={() => {
          this.formRef.current
            .validateFields()
            .then((values) => {
              const { logo, largeLogo } = this.state;
              if (this.state.logo == '') {
                message.error(info.errorFields[0]?.errors[0]);
              } else {
                this.setState({
                  logo: '',
                  largeLogo: '',
                });
                this.props.addBusinessList({
                  ...values,
                  logo,
                  largeLogo,
                });
              }
            })
            .catch((info) => {
              console.log('校验失败:', info);
            });
        }}
      >
        确定
      </Button>,
    ];
    const layout = {
      labelCol: { span: 8 },
      wrapperCol: { span: 16 },
    };
    const uploadProps = {
      name: 'avatar',
      multiple: false,
      maxCount: 1,
      listType: 'picture-card',
      accept: '*',
      onPreview: (file) => {
        window.open(logo);
      },
      onRemove: (file) => {
        this.setState({
          fileList: [],
          logo: '',
        });
      },
      beforeUpload: (file, fileList) => {
        console.log('3333', file);
        this.importFile(file, 'logo');
        this.setState({
          fileList,
        });
        return false;
      },
    };
    const uploadProps2 = {
      name: 'avatar',
      multiple: false,
      maxCount: 1,
      listType: 'picture-card',
      accept: '*',
      onPreview: (file) => {
        window.open(largeLogo);
      },
      onRemove: (file) => {
        this.setState({
          largrLileList: [],
          largeLogo: '',
        });
      },
      beforeUpload: (file, fileList) => {
        this.importFile(file, 'largeLogo');
        this.setState({
          largrLileList: fileList,
        });
        return false;
      },
    };

    return (
      <Modal
        visible={visible}
        title="自定义应用"
        onCancel={this.cancel}
        fileList={fileList}
        destroyOnClose={true}
        footer={btnArr}
      >
        <Upload
          className={cx(fileList?.length == 0 ? 'uploadBox' : 'uploadBoxHid')}
          {...uploadProps}
        >
          {fileList?.length >= 1 ? null : '上传logo'}
        </Upload>
        <Upload
          className={cx(largrLileList?.length == 0 ? 'uploadBox' : 'uploadBoxHid')}
          {...uploadProps2}
        >
          {largrLileList?.length >= 1 ? null : '上传轮播图'}
        </Upload>

        <Form ref={this.formRef} {...layout} name="createBusiness" className={cx('createBusiness')} initialValues={{ gender: 0 }}>
          <Form.Item
            label="应用名称"
            name="businessName"
            rules={[
              {
                required: true,
                message: '请输入应用名称',
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input placeholder="请输入应用名称" />
          </Form.Item>
          <Form.Item
            label="应用定价"
            name="price"
            rules={[
              {
                required: true,
                message: '请输入应用定价',
              },
            ]}
            hasFeedback
          >
            <InputNumber
            className={cx('createBusiness-price')}

              placeholder="请输入应用定价"
              autoComplete="off"
              formatter={this.limitDecimals}
              parser={this.limitDecimals}
              min={0}
            />
          </Form.Item>

          <Form.Item
            label="应用类型"
            name="businessType"
            rules={[
              {
                required: true,
                message: '请输入应用类型',
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input placeholder="请输入应用类型" />
          </Form.Item>
          <Form.Item
            label="应用链接"
            name="link"
            rules={[
              {
                required: true,
                message: '请输入服务描述',
                whitespace: true,
              },
            ]}
            hasFeedback
          >
            <Input placeholder="请输入服务描述" />
          </Form.Item>
          <Form.Item
            label="应用介绍"
            rules={[
              {
                required: true,
                message: '请选择应用介绍',
              },
            ]}
            name="businessDescribe"
            hasFeedback
          >
            <TextArea placeholder="应用介绍" rows={4} />
          </Form.Item>
        </Form>
      </Modal>
    );
  }
}
