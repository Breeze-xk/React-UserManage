import React, { PureComponent } from 'react';
import { Button, Modal, Form, Row, Col, Input, message, Spin, Card } from 'antd';
import styles from './index.module.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
import { connect } from 'dva';
import { SmileTwoTone } from '@ant-design/icons';
import AceEditor from 'react-ace';

import 'ace-builds/src-noconflict/mode-json';
import 'ace-builds/src-noconflict/theme-github';

class JsonConfig extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: {},
      listKey: [],
      formValue: {},
    };
    this.formRef = React.createRef();
  }
  componentDidMount() {
    this.getList();
  }

  getList = () => {
    this.props.dispatch({
      type: 'jsonConfig/getList',
      opt: {},
      callback: (res) => {
        if (res?.data?.status == 200) {
          const Data = res?.data?.data || {};
          const objArr = [];
          Object.keys(Data).forEach(function (key) {
            objArr.push(key);
          });
          this.setState({
            listKey: objArr,
            list: Data,
          });
        } else {
          message.error(res?.data?.message || '服务器报错!');
        }
      },
    });
  };

  onFinish = (values) => {
    console.log('完成values----', values);
    console.log('values----', JSON.stringify(values.configDesc));
    this.props.dispatch({
      type: 'jsonConfig/create',
      opt: {
        configDesc: {},
        ...values,
      },
      callback: (res) => {
        if (res?.data?.status == 200) {
          message.success(res?.data?.message || '创建成功!');
          this.getList();
          const obj = {
            configCode: '',
            configDesc: '',
            configKey: '',
            configName: '',
          };
          this.formRef.current.setFieldsValue({ ...obj });
        } else {
          message.error(res?.data?.message || '服务器报错!');
        }
      },
    });
  };

  handleClick = (items) => {
    console.log('items----', JSON.stringify(items.configDesc));
    const CONFIG_DESC = JSON.stringify(items.configDesc);
    this.setState({
      formValue: { configDesc: CONFIG_DESC, ...items },
    });
    this.formRef.current.setFieldsValue({ ...this.state.formValue, ...items });
  };

  onChangeText = (newValue) => {
    console.log('newValue----', newValue);
  };

  render() {
    const { list, listKey, formValue } = this.state;
    console.log('listKey,', listKey);

    console.log('formValue----', formValue);

    return (
      <div className={cx('jsonConfig')}>
        <Card style={{ width: '26%' }}>
          {listKey.length &&
            listKey.map((item, idx) => {
              return (
                <div className={cx('list-item-box')} key={idx}>
                  <span style={{ fontWeight: '900', fontSize: '14px' }}>类型: {item}</span>
                  <div>
                    {list[item].map((items) => {
                      return (
                        <p
                          className={cx('items')}
                          key={items.updatedTime}
                          onClick={() => this.handleClick(items)}
                        >
                          <SmileTwoTone style={{ fontSize: '14px' }} /> {items.configName}
                        </p>
                      );
                    })}
                  </div>
                </div>
              );
            })}
        </Card>

        <Card style={{ width: '74%' }}>
          <Form
            name="basic"
            ref={this.formRef}
            labelCol={{ span: 5 }}
            wrapperCol={{ span: 18 }}
            onFinish={this.onFinish}
            initialValues={formValue}
          >
            <Row>
              <Col>
                <Form.Item
                  label="类型"
                  name="configCode"
                  rules={[{ required: true, message: '请输入类型' }]}
                  style={{ width: '260px' }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="名称"
                  name="configName"
                  rules={[{ required: true, message: '请输入名称' }]}
                  style={{ width: '260px' }}
                >
                  <Input />
                </Form.Item>
              </Col>
              <Col>
                <Form.Item
                  label="key"
                  name="configKey"
                  rules={[{ required: true, message: '请输入key' }]}
                  style={{ width: '260px' }}
                >
                  <Input />
                </Form.Item>
              </Col>
            </Row>

            <Form.Item
              // label="key"
              // name={["configDesc"]}
              // name="configDesc"
              rules={[{ required: false, message: '请输入key' }]}
              style={{ width: '100%' }}
            >
              <AceEditor
                mode="json"
                theme="xcode"
                name="blah2"
                fontSize={14}
                onChange={this.onChangeText}
                name="UNIQUE_ID_OF_DIV"
                editorProps={{ $blockScrolling: true }}
                style={{ width: '100%',}}
              />
            </Form.Item>

            <Form.Item style={{ position: 'absolute', top: '16px', right: '10px' }}>
              <Button type="primary" htmlType="submit">
                保存
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    );
  }
}

const mapStateToProps = ({ global, jsonConfig }) => ({
  global,
  jsonConfig,
});
export default connect(mapStateToProps)(JsonConfig);
