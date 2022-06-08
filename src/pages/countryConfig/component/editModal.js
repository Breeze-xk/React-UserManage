import React, { useState, useEffect } from 'react';
import {
  Button,
  Modal,
  Form,
  Input,
  Checkbox,
  Radio,
  Divider,
  Row,
  Col,
  Card,
  InputNumber,
  Select,
  message,
  Space,
} from 'antd';
import { v4 as uuidv4 } from 'uuid';
import _ from 'lodash';
import {
  DeleteTwoTone,
  PlusOutlined,
  MinusCircleOutlined,
  FormOutlined,
  MinusCircleFilled,
  PlusCircleFilled,
} from '@ant-design/icons';
const { Option } = Select;
import styles from '../index.module.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
// const SYMBOL_MAP = [
//   {
//     value: "EQU",
//     text: "等于",
//     symbol: "=",
//   },
//   {
//     value: "GTR",
//     text: "大于",
//     symbol: ">",
//   },
//   {
//     value: "GEQ",
//     text: "大于等于",
//     symbol: "≥",
//   },
//   {
//     value: "LSS",
//     text: "小于",
//     symbol: "<",
//   },
//   {
//     value: "LEQ",
//     text: "小于等于",
//     symbol: "≤",
//   },
// ];

// const selectBefore = (
//   <Select defaultValue="EQU" showArrow={false} showSearch>
//     {SYMBOL_MAP.map((item) => (
//       <Option key={item.value} value={item.value}>
//         {item.symbol}
//       </Option>
//     ))}
//   </Select>
// );
// 产品的单个项数据
const specificationConfigItem = {
  // productLimit: { // 产品限制
  //   heighlimitType: 'HEIGH', // 产品高度限制类型 HEIGH 高度 FLOOR 层数
  //   heighLimit: [], // 产品高度限制 [最小值, 最大值]
  //   floorLimit: []  // 产品层数限制 [最小值, 最大值]
  // },
  // productName: '', // 产品名称
  // alongStreet: false, // 是否沿街 Boolean
  // lateralSpacing: '', // 侧向间距
  // maxHouseWidth: '', // 最大面宽
  // rotationAngle: '', // 旋转角度
  // widthlimitType: 'AREA', // 产品面宽限制类型 AREA 面宽 HEIHGWIDTHRATIO 高宽比
  // forwardSpacing: [
  //   {
  //     areaWidthLimit: [], // 产品面宽限制[最小值, 最大值]
  //     heighWidthRatio: [], // 产品高宽比限[最小值, 最大值]
  //     heighRatio: '', // 高度系数
  //     areaRatio: '', // 面宽系数
  //     minInterval: '' // 最小间距
  //   }
  // ],

  productLimit: {
    // 产品限制
    // heighlimitType: 'FLOOR', // 产品高度限制类型 HEIGH 高度 FLOOR 层数
    heighLimit: ['', ''], // 产品高度限制 [最小值, 最大值]
    floorLimit: ['', ''], // 产品层数限制 [最小值, 最大值]
  },
  alongStreet: false, // 是否沿街布置
  lateralSpacing: '', // 侧向边距
  maxHouseWidth: '', // 最大面宽
  rotationAngle: '', // 旋转角度
  widthlimitTypeFlag: false, // 不同点 后端不需要 面宽设置-----------------
  widthlimitType: 'AREA', // 是否选择面宽范围
  faceWideRangeSetting: {
    // 不同点 后端要数组形式---------------
    areaWidthLimit: ['', ''], // 产品面宽限制[最小值, 最大值]
    heighRatio: '',
    heighRatioCheck: false,
    areaRatio: '',
    areaRatioCheck: false,
    minInterval: '',
    minIntervalCheck: false,
  },
  forwardSpacing: [
    {
      areaWidthLimit: ['', ''], // 产品面宽限制[最小值, 最大值]
      heighWidthRatio: ['', ''], // 产品高宽比限[最小值, 最大值]
      heighRatio: '',
      heighRatioCheck: false,
      areaRatio: '',
      areaRatioCheck: false,
      minInterval: '',
      minIntervalCheck: false,
    },
  ],
  // convertCoefficient: '1'
};
// 正向间距单项数据
const forwardListItem = {
  areaWidthLimit: ['', ''], // 产品面宽限制[最小值, 最大值]
  heighWidthRatio: ['', ''], // 产品高宽比限[最小值, 最大值]
  heighRatio: '',
  heighRatioCheck: false,
  areaRatio: '',
  areaRatioCheck: false,
  minInterval: '',
  minIntervalCheck: false,
};
const EditModal = ({ visible, submitMap, onCancel, currentDetailData }) => {
  const [form] = Form.useForm();
  const [ary, setAry] = useState('decimal');
  const [householdChecked, setHouseholdChecked] = useState(false);
  const [radioValue, setRadioValue] = useState('1');

  useEffect(() => {
    let initValues =
      currentDetailData == undefined || Object.keys(currentDetailData).length == 0
        ? {}
        : {
            ...currentDetailData?.standardDesc,
            countryName: currentDetailData?.countryName,
            id: currentDetailData?.id,
          };
    // console.log("initValues",initValues)
    if (initValues?.supportingInfo?.residentialType) {
      setRadioValue('2');
      setHouseholdChecked(true);
    } else {
      setRadioValue('1');
      setHouseholdChecked(false);
    }
    setAry('decimal'); // 日照选中第一个
    if (
      initValues?.supportingInfo?.specificationConfig == undefined &&
      Object.keys(initValues).length != 0 || initValues?.supportingInfo?.specificationConfig.length == 0 &&
      Object.keys(initValues).length != 0
    ) {
      initValues.supportingInfo.specificationConfig = [];
      initValues.supportingInfo.specificationConfig.push({}, {});
    }
    form.setFieldsValue({ ...initValues });
  }, [visible]);
  const unitShowFun = (type) => {
    const unit = form.getFieldValue(type);
    return unit;
  };

  // 添加产品方法
  const addProduct = () => {
    const { specificationConfig } = form.getFieldsValue(['specificationConfig']);
    const obj = _.cloneDeep(specificationConfigItem);
    specificationConfig.push(obj);
    form.setFieldsValue({ specificationConfig });
  };
  // 移除产品方法
  const removeProduct = (index) => {
    const { specificationConfig } = form.getFieldsValue(['specificationConfig']);
    specificationConfig.splice(index, 1);
    form.setFieldsValue({ specificationConfig });
  };
  // 添加正向间距方法
  const addForward = (fieldKey) => {
    const { specificationConfig } = form.getFieldsValue(['specificationConfig']);
    const { forwardSpacing } = specificationConfig[fieldKey];
    forwardSpacing.push(forwardListItem);
    specificationConfig[fieldKey]['forwardSpacing'] = forwardSpacing;
    form.setFieldsValue({ specificationConfig });
  };
  // 移除正向间距方法
  const removeForward = (fieldKey, index) => {
    const { specificationConfig } = form.getFieldsValue(['specificationConfig']);
    const { forwardSpacing } = specificationConfig[fieldKey];
    if (forwardSpacing.length == 1) {
      message.error('最少保留一个正向间距');
      return;
    }
    forwardSpacing.splice(index, 1);
    specificationConfig[fieldKey]['forwardSpacing'] = forwardSpacing;
    form.setFieldsValue({ specificationConfig });
  };

  const valueChange = (e) => {
    const { specificationConfig } = form.getFieldsValue(['specificationConfig']);
    form.setFieldsValue({ specificationConfig });
  };

  const preValidateFields = () => {
    let { specificationConfig, heighlimitType } = form.getFieldsValue(true);
    let flag = false;
    let errorMessage = '';
    let length = specificationConfig.length;
    let type = heighlimitType == 'HEIGH' ? 'heighLimit' : 'floorLimit';
    let typeStr = heighlimitType == 'HEIGH' ? '高度' : '层数';
    // 校验产品楼层和高度
    for (let i = 0; i < length; i++) {
      if (length == 1 && specificationConfig[i]['forwardSpacing'].length == 1) {
        break;
      }
      if (i <= length - 2) {
        let currentMax = specificationConfig[i]['productLimit'][type][1];
        let nextMin = specificationConfig[i + 1]['productLimit'][type][0];
        if (currentMax > nextMin) {
          flag = true;
          errorMessage = `产品${i + 2}的${typeStr}最小值不能小于产品${i + 1}的${typeStr}最大值`;
          break;
        }
      }
      // 'AREA', // 产品面宽限制类型 AREA 面宽 HEIHGWIDTHRATIO 高宽比
      let forwardSpacingType =
        specificationConfig[i]['widthlimitType'] == 'AREA' ? 'areaWidthLimit' : 'heighWidthRatio';
      let forwardSpacingTypeStr =
        specificationConfig[i]['widthlimitType'] == 'AREA' ? '面宽范围' : '高宽比';
      let forwardSpacing = specificationConfig[i]['forwardSpacing'];
      let forwardSpacingLength = forwardSpacing.length;
      let forwardSpacingFlag = false;
      for (let j = 0; j < forwardSpacingLength; j++) {
        let currentMax = forwardSpacing[j][forwardSpacingType][1];
        if (
          currentMax > specificationConfig[i]['maxHouseWidth'] &&
          specificationConfig[i]['widthlimitType'] == 'AREA'
        ) {
          forwardSpacingFlag = true;
          errorMessage = `产品${i + 1}正向间距第${
            j + 1
          }个的${forwardSpacingTypeStr}最大值不能大于最大面宽`;
          break;
        }
        // if (!forwardSpacing[j]['heighRatioCheck'] && !forwardSpacing[j]['areaRatioCheck'] && !forwardSpacing[j]['minIntervalCheck']) {
        //   forwardSpacingFlag = true;
        //   errorMessage = `产品${i + 1}正向间距第${j + 1}个的高度系数、面宽系数、最小间距至少选一项`;
        //   break;
        // }
        if (forwardSpacingLength == 1) {
          break;
        }
        if (j <= forwardSpacingLength - 2) {
          let nextMin = forwardSpacing[j + 1][forwardSpacingType][0];
          if (currentMax > nextMin) {
            forwardSpacingFlag = true;
            errorMessage = `产品${i + 1}正向间距第${
              j + 2
            }个的${forwardSpacingTypeStr}最小值不能小于正向间距第${
              j + 1
            }个的${forwardSpacingTypeStr}最大值`;
            break;
          }
        }
      }
      if (forwardSpacingFlag) {
        flag = true;
        break;
      }
    }
    return {
      errorMessage,
      flag,
    };
  };
  const aryOnChange = (e) => {
    setAry(e.target.value);
  };
  const onChanges = (checkedValues) => {
    console.log('checked = ', checkedValues);
    if (checkedValues.target.value == '1') {
      console.log('11111');
      setRadioValue(checkedValues.target.value);
      setHouseholdChecked(false);
    } else {
      console.log('111112');
      setRadioValue(checkedValues.target.value);
      setHouseholdChecked(checkedValues.target.checked);
    }
  };
  const resolveData = (values) => {
    let { specificationConfig, heighlimitType } = values;
    let length = specificationConfig.length;
    // 校验产品楼层和高度
    for (let i = 0; i < length; i++) {
      let widthlimitTypeFlag = specificationConfig[i]['widthlimitTypeFlag'];
      // 如果开启了面宽设置
      if (!widthlimitTypeFlag) {
        specificationConfig[i]['faceWideRangeSetting']['areaWidthLimit'] = [
          0,
          specificationConfig[i]['maxHouseWidth'],
        ];
        specificationConfig[i]['forwardSpacing'] = [
          { ...specificationConfig[i]['faceWideRangeSetting'] },
        ];
      }
      // 产品里面加产品定义类型
      specificationConfig[i]['heighlimitType'] = heighlimitType;
    }
    return values;
  };

  const onValuesChange = (a) => {
    // debugger;
  };
  const onFieldsChange = (a) => {
    // debugger;
  };
  const handleSubmit = () => {
    form
      .validateFields()
      .then((values) => {
        let preValidate = preValidateFields();
        if (preValidate.flag) {
          message.error(preValidate.errorMessage);
          return;
        }
        // form.resetFields();
        // 生成产品id  residentialParking specificationConfig
        values.supportingInfo.residentialType = householdChecked;
        if (householdChecked && values.supportingInfo?.residentialParking != undefined) {
          console.log('选中住宅停车配比(辆/户)');
          delete values.supportingInfo.residentialParking;
        } else if (!householdChecked && values.supportingInfo?.specificationConfig != undefined) {
          console.log('选中住宅停车配比(辆/100㎡)');
          delete values.supportingInfo.specificationConfig;
        }
        // 转换经纬度
        let longsecond = 0;
        let latsecond = 0;
        if (ary == 'hexadecimal') {
          let Numberx =
            values.baseConfig.longhour + values.baseConfig.longminute / 60 + longsecond / 3600; //度+分/60+秒/3600 为转化为十进制的公式
          values.baseConfig.longitude = Number(Numberx).toFixed(2);

          let Numbers =
            values.baseConfig.lathour + values.baseConfig.latminute / 60 + latsecond / 3600; //度+分/60+秒/3600 为转化为十进制的公式
          values.baseConfig.latitude = Number(Numbers).toFixed(2);
        }
        values.specificationConfig.forEach((pro, index) => {
          pro['id'] = index;
        });

        let data = resolveData(values);
        submitMap({ ...data });
        form.resetFields();
      })
      .catch((info) => {
        console.log('校验失败:', info);
      });
  };
  let btnArr = [
    <Button
      onClick={() => {
        onCancel(), form.resetFields();
      }}
    >
      取消
    </Button>,
    <Button key="submit" type="primary" onClick={handleSubmit}>
      确认
    </Button>,
  ];
  const formItemLayout = {
    labelCol: { span: 10 },
    wrapperCol: { span: 16 },
  };
  return (
    <Modal
      visible={visible}
      title="编辑城市"
      onCancel={() => {
        onCancel(), form.resetFields();
      }}
      width="1200px"
      destroyOnClose={true}
      footer={btnArr}
    >
      <Form
        form={form}
        name="createCountry"
        // initialValues={{
        //   baseConfig,
        //   specificationConfig,
        //   supportingInfo,
        //   heighlimitType,
        //   id: initValues?.id,
        // }}
        onValuesChange={onValuesChange}
        onFieldsChange={onFieldsChange}
      >
        <Form.Item
          label="id"
          name="id"
          rules={[
            {
              required: true,
              message: 'id',
            },
          ]}
          style={{ display: 'none' }}
        ></Form.Item>
        <Form.Item
          label="城市名称"
          name="countryName"
          // name={["baseConfig", "countryName"]}
          rules={[
            {
              required: true,
              message: '请输入城市名称',
            },
          ]}
          hasFeedback
        >
          <Input style={{ width: '180px' }} placeholder="请输入城市名称" />
        </Form.Item>

        <Divider orientation="left">日照信息</Divider>
        <Row>
          <Radio.Group value={ary} onChange={aryOnChange}>
            <Radio value={'decimal'}>十进制</Radio>
            <Radio value={'hexadecimal'}>六十进制</Radio>
          </Radio.Group>
        </Row>

        <Row gutter={[32, 32]}>
          <Col span={10}>
            {ary == 'decimal' ? (
              <Form.Item
                label="城市经度(E)"
                name={['baseConfig', 'longitude']}
                rules={[
                  {
                    required: true,
                    message: '请输入城市经度',
                  },
                ]}
                hasFeedback
              >
                <InputNumber
                  min={0}
                  controls={false}
                  style={{ width: '180px' }}
                  placeholder="请输入城市经度"
                />
                {/* <Input style={{ width: '180px' }} placeholder="请输入城市经度" /> */}
              </Form.Item>
            ) : (
              <div style={{ display: 'flex' }}>
                <Form.Item
                  label="城市经度(E)"
                  name={['baseConfig', 'longhour']}
                  rules={[
                    {
                      required: true,
                      message: '请输入城市经度',
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    controls={false}
                    style={{ width: '80px' }}
                    placeholder="请输入城市经度"
                  />
                </Form.Item>
                <span style={{ margin: '6px' }}> 度</span>
                <Form.Item
                  label=""
                  name={['baseConfig', 'longminute']}
                  rules={[
                    {
                      required: true,
                      message: '请输入度',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value > 59) {
                          return Promise.reject(new Error('最大值不能大于59'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={59}
                    controls={false}
                    style={{ width: '80px' }}
                    placeholder="请输入分"
                  />
                </Form.Item>
                <span style={{ margin: '6px' }}>分</span>
              </div>
            )}
          </Col>
          <Col span={10}>
            <Form.Item
              label="日照标准"
              name={['baseConfig', 'sunshineStandard']}
              rules={[
                {
                  required: true,
                  message: '请输入日照标准',
                },
              ]}
              hasFeedback
            >
              <Radio.Group>
                <Radio value="GREAT_COLD">大寒</Radio>
                <Radio value="WINTER_SOLSTICE">冬至</Radio>
              </Radio.Group>
            </Form.Item>
          </Col>
        </Row>
        <Row gutter={[32, 32]}>
          <Col span={10}>
            {ary == 'decimal' ? (
              <Form.Item
                label="城市纬度(N)"
                name={['baseConfig', 'latitude']}
                rules={[
                  {
                    required: true,
                    message: '请输入城市纬度',
                  },
                ]}
                hasFeedback
              >
                {/* <Input style={{ width: '180px' }} placeholder="请输入城市纬度" /> */}
                <InputNumber
                  min={0}
                  controls={false}
                  style={{ width: '180px' }}
                  placeholder="请输入城市纬度"
                />
              </Form.Item>
            ) : (
              <div style={{ display: 'flex' }}>
                <Form.Item
                  label="城市纬度(N)"
                  name={['baseConfig', 'lathour']}
                  rules={[
                    {
                      required: true,
                      message: '请输入城市纬度',
                    },
                  ]}
                >
                  <InputNumber
                    min={0}
                    controls={false}
                    style={{ width: '80px' }}
                    placeholder="请输入城市纬度"
                  />
                </Form.Item>
                <span style={{ margin: '6px' }}> 度</span>
                <Form.Item
                  label=""
                  name={['baseConfig', 'latminute']}
                  rules={[
                    {
                      required: true,
                      message: '请输入度',
                    },
                    ({ getFieldValue }) => ({
                      validator(_, value) {
                        if (value > 59) {
                          return Promise.reject(new Error('最大值不能大于59'));
                        }
                        return Promise.resolve();
                      },
                    }),
                  ]}
                >
                  <InputNumber
                    min={0}
                    max={59}
                    controls={false}
                    style={{ width: '80px' }}
                    placeholder="请输入分"
                  />
                </Form.Item>
                <span style={{ margin: '6px' }}>分</span>
              </div>
            )}
          </Col>
          <Col span={10}>
            <Form.Item
              label="标准时长(h)"
              name={['baseConfig', 'hours']}
              rules={[
                {
                  required: true,
                  message: '请输入标准时长(单位:h)',
                },
              ]}
              hasFeedback
            >
              <InputNumber
                min={0}
                style={{ width: '180px' }}
                placeholder="请输入标准时长(单位:h)"
              />
            </Form.Item>
          </Col>
        </Row>

        <Divider orientation="left">建筑定义及规范配置</Divider>
        <div style={{ display: 'flex', alignItems: 'baseline' }}>
          <Form.Item
            label="产品定义"
            name={['heighlimitType']}
            rules={[{ required: true, message: '请选择产品定义' }]}
          >
            <Select style={{ width: '200px' }} onChange={valueChange}>
              <Option value={'HEIGH'}>高度</Option>
              <Option value={'FLOOR'}>层数</Option>
            </Select>
          </Form.Item>
          <div style={{ margin: '0 20px', color: 'red', fontSize: '12px' }}>
            (请由低到高依次录入)
          </div>
        </div>
        <Form.List name="specificationConfig">
          {(fields, { add, remove }) => (
            <>
              {fields.map(({ key, name, fieldKey, ...restField }) => (
                <Card
                  size="small"
                  key={key}
                  title={`产品${fieldKey + 1}`}
                  style={{ padding: '0 20px', marginBottom: '20px' }}
                  extra={
                    <DeleteTwoTone
                      style={{ fontSize: '18px' }}
                      onClick={() => removeProduct(fieldKey)}
                    />
                  }
                >
                  {/* 产品定义 */}
                  <Row gutter={[32, 32]}>
                    <Col span={24}>
                      <div style={{ display: 'flex' }}>
                        {/* <Form.Item
                          label="产品定义"
                          {...restField}
                          name={[name, "productLimit", "heighlimitType"]}
                          fieldKey={[fieldKey, "productLimit", "heighlimitType"]}
                          rules={[
                            { required: true, message: "请选择产品定义" },
                          ]}
                        >
                          <Select
                            style={{ width: "200px" }}
                            onChange={valueChange}
                            >
                            <Option value={"HEIGH"}>高度</Option>
                            <Option value={"FLOOR"}>层数</Option>
                          </Select>
                        </Form.Item> */}
                        <Form.Item>
                          {unitShowFun(['heighlimitType']) == 'HEIGH' ? '高度' : '层数'}：
                        </Form.Item>
                        <div
                          style={{ display: 'flex', marginLeft: '10px', alignItems: 'baseline' }}
                        >
                          <Form.Item style={{ display: 'flex' }} label="" {...restField}>
                            {unitShowFun(['heighlimitType']) == 'HEIGH' && (
                              <>
                                <Form.Item
                                  name={[name, 'productLimit', 'heighLimit', 0]}
                                  rules={[
                                    { required: true, message: '请输入最小值' },
                                    // ({ getFieldValue }) => ({
                                    //   validator(_, value) {
                                    //     console.log('高度最大值', getFieldValue(['specificationConfig', fieldKey, "productLimit", "heighLimit", 1]));
                                    //     console.log('高度最小值', value);
                                    //     if (getFieldValue(['specificationConfig', fieldKey, "productLimit", "heighLimit", 1]) > value) {
                                    //       return Promise.resolve();
                                    //     }
                                    //     return Promise.reject(new Error('高度最小值不能大于最大值'));
                                    //   },
                                    // }),
                                  ]}
                                  noStyle
                                >
                                  <InputNumber
                                    min={0}
                                    style={{ width: '90px' }}
                                    placeholder="最小值"
                                  />
                                </Form.Item>
                                <span>&nbsp;&nbsp;米</span>
                              </>
                            )}
                            {unitShowFun(['heighlimitType']) == 'FLOOR' && (
                              <>
                                <Form.Item
                                  name={[name, 'productLimit', 'floorLimit', 0]}
                                  rules={[
                                    { required: true, message: '请输入最小值' },
                                    // ({ getFieldValue }) => ({
                                    //   validator(_, value) {
                                    //     console.log('楼层最大值', getFieldValue(['specificationConfig', fieldKey, "productLimit", "floorLimit", 1]));
                                    //     console.log('楼层最小值', value);
                                    //     if (getFieldValue(['specificationConfig', fieldKey, "productLimit", "floorLimit", 1]) > value) {
                                    //       return Promise.resolve();
                                    //     }
                                    //     return Promise.reject(new Error('楼层最小值不能大于最大值'));
                                    //   },
                                    // }),
                                  ]}
                                  noStyle
                                >
                                  <InputNumber
                                    min={0}
                                    style={{ width: '90px' }}
                                    placeholder="最小值"
                                  />
                                </Form.Item>
                                <span>&nbsp;&nbsp;层</span>
                              </>
                            )}
                          </Form.Item>
                          <div style={{ padding: '0 10px' }}>~</div>
                          <Form.Item style={{ display: 'inline-block' }} label="" {...restField}>
                            {unitShowFun(['heighlimitType']) == 'HEIGH' && (
                              <>
                                <Form.Item
                                  name={[name, 'productLimit', 'heighLimit', 1]}
                                  rules={[
                                    { required: true, message: '请输入最大值' },
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        console.log(
                                          '高度最小值',
                                          getFieldValue([
                                            'specificationConfig',
                                            fieldKey,
                                            'productLimit',
                                            'heighLimit',
                                            0,
                                          ])
                                        );
                                        console.log('高度最大值', value);
                                        if (
                                          getFieldValue([
                                            'specificationConfig',
                                            fieldKey,
                                            'productLimit',
                                            'heighLimit',
                                            0,
                                          ]) < value
                                        ) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          new Error('高度最大值不能小于最小值')
                                        );
                                      },
                                    }),
                                  ]}
                                  noStyle
                                >
                                  <InputNumber
                                    min={0}
                                    style={{ width: '90px' }}
                                    placeholder="最大值"
                                  />
                                </Form.Item>
                                <span>&nbsp;&nbsp;米</span>
                              </>
                            )}
                            {unitShowFun(['heighlimitType']) == 'FLOOR' && (
                              <>
                                <Form.Item
                                  name={[name, 'productLimit', 'floorLimit', 1]}
                                  rules={[
                                    { required: true, message: '请输入最大值' },
                                    ({ getFieldValue }) => ({
                                      validator(_, value) {
                                        console.log(
                                          '楼层最小值',
                                          getFieldValue([
                                            'specificationConfig',
                                            fieldKey,
                                            'productLimit',
                                            'floorLimit',
                                            0,
                                          ])
                                        );
                                        console.log('楼层最大值', value);
                                        if (
                                          getFieldValue([
                                            'specificationConfig',
                                            fieldKey,
                                            'productLimit',
                                            'floorLimit',
                                            0,
                                          ]) < value
                                        ) {
                                          return Promise.resolve();
                                        }
                                        return Promise.reject(
                                          new Error('楼层最大值不能小于最小值')
                                        );
                                      },
                                    }),
                                  ]}
                                  noStyle
                                >
                                  <InputNumber
                                    min={0}
                                    style={{ width: '90px' }}
                                    placeholder="最大值"
                                  />
                                </Form.Item>
                                <span>&nbsp;&nbsp;层</span>
                              </>
                            )}
                          </Form.Item>
                          <div style={{ margin: '0 20px', color: 'red', fontSize: '12px' }}>
                            不包含最小值
                          </div>
                          {/* <div style={{margin: '0 20px',color: 'red', fontSize: '12px'}}>
                            （<span>{"最小值<"}</span>
                            <span>&nbsp;&nbsp;{unitShowFun(['heighlimitType']) == 'HEIGH' ? '高度' : '层数'}&nbsp;&nbsp;</span>
                            <span>{"<=最大值"}</span>）
                          </div> */}
                        </div>
                      </div>
                    </Col>
                  </Row>
                  {/* 产品名称 */}
                  <Row gutter={[32, 32]}>
                    <Col span={12}>
                      <Form.Item
                        label="产品名称"
                        {...restField}
                        name={[name, 'productName']}
                        fieldKey={[fieldKey, 'productName']}
                        rules={[{ required: true, message: '请输入产品名称' }]}
                      >
                        <Input style={{ width: '200px' }} placeholder="请输入产品名称" />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="是否沿街布置"
                        {...restField}
                        name={[name, 'alongStreet']}
                        fieldKey={[fieldKey, 'alongStreet']}
                        valuePropName="checked"
                      >
                        <Checkbox></Checkbox>
                      </Form.Item>
                    </Col>
                  </Row>
                  {/* 侧向边距---最大面宽---旋转角度 */}
                  <Row gutter={[32, 32]}>
                    <Col span={12}>
                      <Form.Item
                        label="侧向边距"
                        {...restField}
                        name={[name, 'lateralSpacing']}
                        fieldKey={[fieldKey, 'lateralSpacing']}
                        rules={[{ required: true, message: '请输入侧向边距' }]}
                      >
                        <InputNumber
                          min={0}
                          style={{ width: '200px' }}
                          placeholder="请输入侧向边距"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}>
                      <Form.Item
                        label="最大面宽"
                        {...restField}
                        name={[name, 'maxHouseWidth']}
                        fieldKey={[fieldKey, 'maxHouseWidth']}
                        rules={[{ required: true, message: '请输入最大面宽' }]}
                      >
                        <InputNumber
                          min={0}
                          style={{ width: '200px' }}
                          placeholder="请输入最大面宽"
                        />
                      </Form.Item>
                    </Col>
                  </Row>

                  <Row gutter={[32, 32]}>
                    <Col span={12}>
                      <Form.Item
                        label="旋转角度"
                        {...restField}
                        name={[name, 'rotationAngle']}
                        fieldKey={[fieldKey, 'rotationAngle']}
                        rules={[{ required: true, message: '请输入旋转角度' }]}
                      >
                        <InputNumber
                          min={-360}
                          max={360}
                          style={{ width: '200px' }}
                          placeholder="请输入旋转角度"
                        />
                      </Form.Item>
                    </Col>
                    <Col span={12}></Col>
                  </Row>
                  <Divider style={{ margin: '10px 0' }} />
                  {/* 面宽设置 */}
                  <Form.Item
                    label="是否开启面宽影响"
                    {...restField}
                    name={[name, 'widthlimitTypeFlag']}
                    fieldKey={[fieldKey, 'widthlimitTypeFlag']}
                    valuePropName="checked"
                  >
                    <Checkbox onChange={valueChange}></Checkbox>
                  </Form.Item>
                  {/* 面宽范围---高宽比 */}
                  {unitShowFun(['specificationConfig', fieldKey, 'widthlimitTypeFlag']) && (
                    <Row gutter={[32, 32]}>
                      <Col span={24}>
                        <div style={{ display: 'flex' }}>
                          <Form.Item
                            label="面宽设置项"
                            {...restField}
                            name={[name, 'widthlimitType']}
                            fieldKey={[fieldKey, 'widthlimitType']}
                            rules={[{ required: true, message: '请选择面宽设置项' }]}
                          >
                            <Select style={{ width: '200px' }} onChange={valueChange}>
                              <Option value={'AREA'}>面宽范围</Option>
                              <Option value={'HEIHGWIDTHRATIO'}>高宽比</Option>
                            </Select>
                          </Form.Item>
                          {unitShowFun(['specificationConfig', fieldKey, 'widthlimitType']) ==
                            'AREA' && (
                            <Form.Item>
                              <span style={{ margin: '0 20px', color: 'red', fontSize: '12px' }}>
                                面宽范围的最大值受最大面宽影响
                              </span>
                            </Form.Item>
                          )}
                          {/* <Button
                            type="primary"
                            onClick={addFaceWideRangeSetting}
                            block
                            icon={<PlusOutlined />}
                            style={{ width: "120px" }}
                          >
                            新增{widthlimitType == '面宽范围' ? '面宽范围' : '高宽比'}
                          </Button> */}
                        </div>
                        <Form.List name={[name, 'forwardSpacing']}>
                          {(_fields, { add, remove }) => (
                            <>
                              {_fields.map(
                                ({ key: _key, name: _name, fieldKey: _fieldKey, ...restField }) => (
                                  <div
                                    key={_fieldKey + 'key'}
                                    style={{
                                      border: '1px solid #d3d3d3',
                                      padding: '10px',
                                      margin: '0 0 10px 0',
                                    }}
                                  >
                                    <div
                                      style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                      }}
                                    >
                                      <div
                                        style={{
                                          display: 'flex',
                                          marginLeft: '10px',
                                          alignItems: 'baseline',
                                        }}
                                      >
                                        {unitShowFun([
                                          'specificationConfig',
                                          fieldKey,
                                          'widthlimitType',
                                        ]) == 'AREA' && <Form.Item label="面宽范围"></Form.Item>}
                                        {unitShowFun([
                                          'specificationConfig',
                                          fieldKey,
                                          'widthlimitType',
                                        ]) == 'HEIHGWIDTHRATIO' && (
                                          <Form.Item label="宽高比"></Form.Item>
                                        )}
                                        
                                        <Form.Item
                                          style={{ display: 'flex' }}
                                          label=""
                                          {...restField}
                                        >
                                          {unitShowFun([
                                            'specificationConfig',
                                            fieldKey,
                                            'widthlimitType',
                                          ]) == 'AREA' && (
                                            <>
                                              <Form.Item
                                                name={[_name, 'areaWidthLimit', 0]}
                                                rules={[
                                                  { required: true, message: '请输入最小值' },
                                                  // ({ getFieldValue }) => ({
                                                  //   validator(_, value) {
                                                  //     console.log('面宽范围最大值', getFieldValue(['specificationConfig', fieldKey, "forwardSpacing", _fieldKey, "areaWidthLimit", 1]));
                                                  //     console.log('面宽范围最小值', value);
                                                  //     if (getFieldValue(['specificationConfig', fieldKey, "forwardSpacing", _fieldKey, "areaWidthLimit", 1]) > value) {
                                                  //       return Promise.resolve();
                                                  //     }
                                                  //     return Promise.reject(new Error('面宽范围最小值不能大于最大值'));
                                                  //   },
                                                  // })
                                                ]}
                                                noStyle
                                              >
                                                <InputNumber
                                                  min={0}
                                                  style={{ width: '90px' }}
                                                  placeholder="最小值"
                                                />
                                              </Form.Item>
                                              <span>&nbsp;&nbsp;米</span>
                                            </>
                                          )}
                                          {unitShowFun([
                                            'specificationConfig',
                                            fieldKey,
                                            'widthlimitType',
                                          ]) == 'HEIHGWIDTHRATIO' && (
                                            <>
                                              <Form.Item
                                                name={[_name, 'heighWidthRatio', 0]}
                                                rules={[
                                                  { required: true, message: '请输入最小值' },
                                                  // ({ getFieldValue }) => ({
                                                  //   validator(_, value) {
                                                  //     console.log('高宽比最大值', getFieldValue(['specificationConfig', fieldKey, "forwardSpacing", _fieldKey, "heighWidthRatio", 1]));
                                                  //     console.log('高宽比最小值', value);
                                                  //     if (getFieldValue(['specificationConfig', fieldKey, "forwardSpacing", _fieldKey, "heighWidthRatio", 1]) > value) {
                                                  //       return Promise.resolve();
                                                  //     }
                                                  //     return Promise.reject(new Error('高宽比最小值不能大于最大值'));
                                                  //   },
                                                  // })
                                                ]}
                                                noStyle
                                              >
                                                <InputNumber
                                                  min={0}
                                                  style={{ width: '90px' }}
                                                  placeholder="最小值"
                                                />
                                              </Form.Item>
                                              <span>&nbsp;&nbsp;</span>
                                            </>
                                          )}
                                        </Form.Item>
                                        <div style={{ padding: '0 10px' }}>~</div>
                                        <Form.Item
                                          style={{ display: 'inline-block' }}
                                          label=""
                                          {...restField}
                                          rules={[{ required: true, message: '请输入最大值' }]}
                                        >
                                          {unitShowFun([
                                            'specificationConfig',
                                            fieldKey,
                                            'widthlimitType',
                                          ]) == 'AREA' && (
                                            <>
                                              <Form.Item
                                                name={[_name, 'areaWidthLimit', 1]}
                                                rules={[
                                                  { required: true, message: '请输入最大值' },
                                                  ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                      console.log(
                                                        '面宽范围最小值',
                                                        getFieldValue([
                                                          'specificationConfig',
                                                          fieldKey,
                                                          'forwardSpacing',
                                                          _fieldKey,
                                                          'areaWidthLimit',
                                                          0,
                                                        ])
                                                      );
                                                      console.log('面宽范围最大值', value);
                                                      if (
                                                        getFieldValue([
                                                          'specificationConfig',
                                                          fieldKey,
                                                          'forwardSpacing',
                                                          _fieldKey,
                                                          'areaWidthLimit',
                                                          0,
                                                        ]) < value
                                                      ) {
                                                        return Promise.resolve();
                                                      }
                                                      return Promise.reject(
                                                        new Error('面宽范围最大值不能小于最小值')
                                                      );
                                                    },
                                                  }),
                                                ]}
                                                noStyle
                                              >
                                                <InputNumber
                                                  min={0}
                                                  style={{ width: '90px' }}
                                                  placeholder="最大值"
                                                />
                                              </Form.Item>
                                              <span>&nbsp;&nbsp;米</span>
                                            </>
                                          )}
                                          {unitShowFun([
                                            'specificationConfig',
                                            fieldKey,
                                            'widthlimitType',
                                          ]) == 'HEIHGWIDTHRATIO' && (
                                            <>
                                              <Form.Item
                                                name={[_name, 'heighWidthRatio', 1]}
                                                rules={[
                                                  { required: true, message: '请输入最大值' },
                                                  ({ getFieldValue }) => ({
                                                    validator(_, value) {
                                                      console.log(
                                                        '高宽比最小值',
                                                        getFieldValue([
                                                          'specificationConfig',
                                                          fieldKey,
                                                          'forwardSpacing',
                                                          _fieldKey,
                                                          'heighWidthRatio',
                                                          0,
                                                        ])
                                                      );
                                                      console.log('高宽比最大值', value);
                                                      if (
                                                        getFieldValue([
                                                          'specificationConfig',
                                                          fieldKey,
                                                          'forwardSpacing',
                                                          _fieldKey,
                                                          'heighWidthRatio',
                                                          0,
                                                        ]) < value
                                                      ) {
                                                        return Promise.resolve();
                                                      }
                                                      return Promise.reject(
                                                        new Error('高宽比最大值不能小于最小值')
                                                      );
                                                    },
                                                  }),
                                                ]}
                                                noStyle
                                              >
                                                <InputNumber
                                                  min={0}
                                                  style={{ width: '90px' }}
                                                  placeholder="最大值"
                                                />
                                              </Form.Item>
                                              <span>&nbsp;&nbsp;</span>
                                            </>
                                          )}
                                        </Form.Item>
                                        {/* <div style={{margin: '0 20px',color: 'red', fontSize: '12px'}}>
                                      （<span>{"最小值<"}</span>
                                      <span>&nbsp;&nbsp;{unitShowFun(['specificationConfig', fieldKey, "widthlimitType"]) == 'AREA' ? '面宽范围' : '高宽比'}&nbsp;&nbsp;</span>
                                      <span>{"<=最大值"}</span>）
                                    </div> */}
                                      </div>
                                      <DeleteTwoTone
                                        style={{ fontSize: '18px' }}
                                        onClick={() => removeForward(fieldKey, _fieldKey)}
                                      />
                                    </div>
                                    <Row gutter={[32, 32]}>
                                      <Col span={3}>
                                        <Form.Item>正向间距:</Form.Item>
                                      </Col>
                                      <Col span={7}>
                                        <div style={{ display: 'flex' }}>
                                          <Form.Item
                                            name={[_name, 'heighRatioCheck']}
                                            valuePropName="checked"
                                          >
                                            <Checkbox onChange={valueChange}></Checkbox>
                                          </Form.Item>
                                          <Form.Item
                                            style={{ marginLeft: '10px' }}
                                            label="高度系数法"
                                            {...restField}
                                            fieldKey={[_fieldKey, 'heighRatio']}
                                          >
                                            <div style={{ display: 'flex' }}>
                                              <Form.Item>L = h *</Form.Item>
                                              <Form.Item
                                                style={{ marginLeft: '10px' }}
                                                name={[_name, 'heighRatio']}
                                                rules={[
                                                  {
                                                    required: unitShowFun([
                                                      'specificationConfig',
                                                      fieldKey,
                                                      'forwardSpacing',
                                                      _fieldKey,
                                                      'heighRatioCheck',
                                                    ]),
                                                    message: '请输入高度',
                                                  },
                                                ]}
                                              >
                                                <InputNumber
                                                  min={0}
                                                  style={{ width: '90px' }}
                                                  placeholder="请输入高度"
                                                />
                                              </Form.Item>
                                            </div>
                                          </Form.Item>
                                        </div>
                                      </Col>
                                      <Col span={7}>
                                        <div style={{ display: 'flex' }}>
                                          <Form.Item
                                            name={[_name, 'areaRatioCheck']}
                                            valuePropName="checked"
                                          >
                                            <Checkbox onChange={valueChange}></Checkbox>
                                          </Form.Item>
                                          <Form.Item
                                            style={{ marginLeft: '10px' }}
                                            label="面宽系数法"
                                            {...restField}
                                            fieldKey={[_fieldKey, 'areaRatio']}
                                          >
                                            <div style={{ display: 'flex' }}>
                                              <Form.Item>L = w *</Form.Item>
                                              <Form.Item
                                                style={{ marginLeft: '10px' }}
                                                name={[_name, 'areaRatio']}
                                                rules={[
                                                  {
                                                    required: unitShowFun([
                                                      'specificationConfig',
                                                      fieldKey,
                                                      'forwardSpacing',
                                                      _fieldKey,
                                                      'areaRatioCheck',
                                                    ]),
                                                    message: '请输入面宽',
                                                  },
                                                ]}
                                              >
                                                <InputNumber
                                                  min={0}
                                                  style={{ width: '90px' }}
                                                  placeholder="请输入面宽"
                                                />
                                              </Form.Item>
                                            </div>
                                          </Form.Item>
                                        </div>
                                      </Col>
                                      <Col span={7}>
                                        <div style={{ display: 'flex' }}>
                                          <Form.Item
                                            name={[_name, 'minIntervalCheck']}
                                            valuePropName="checked"
                                          >
                                            <Checkbox onChange={valueChange}></Checkbox>
                                          </Form.Item>
                                          <Form.Item
                                            style={{ marginLeft: '10px' }}
                                            label="最小间距法"
                                            {...restField}
                                            fieldKey={[_fieldKey, 'minInterval']}
                                          >
                                            <div style={{ display: 'flex' }}>
                                              <Form.Item>L =</Form.Item>
                                              <Form.Item
                                                style={{ marginLeft: '10px' }}
                                                name={[_name, 'minInterval']}
                                                rules={[
                                                  {
                                                    required: unitShowFun([
                                                      'specificationConfig',
                                                      fieldKey,
                                                      'forwardSpacing',
                                                      _fieldKey,
                                                      'minIntervalCheck',
                                                    ]),
                                                    message: '请输入最小间距',
                                                  },
                                                ]}
                                              >
                                                <InputNumber
                                                  min={0}
                                                  style={{ width: '90px' }}
                                                  placeholder="请输入最小间距"
                                                />
                                              </Form.Item>
                                            </div>
                                          </Form.Item>
                                        </div>
                                      </Col>
                                    </Row>
                                  </div>
                                )
                              )}
                              <Button
                                type="primary"
                                onClick={() => addForward(fieldKey)}
                                block
                                icon={<PlusOutlined />}
                                style={{ width: '150px' }}
                              >
                                新增
                                {unitShowFun(['specificationConfig', fieldKey, 'widthlimitType']) ==
                                'AREA'
                                  ? '面宽范围'
                                  : '高宽比'}
                              </Button>
                            </>
                          )}
                        </Form.List>
                      </Col>
                    </Row>
                  )}
                  {/* 高度系数法---面宽系数法---最小间距法 */}
                  {!unitShowFun(['specificationConfig', fieldKey, 'widthlimitTypeFlag']) && (
                    <Row gutter={[32, 32]}>
                      <Col span={3}>
                        <Form.Item>正向间距:</Form.Item>
                      </Col>
                      <Col span={7}>
                        <div style={{ display: 'flex' }}>
                          <Form.Item
                            name={[name, 'faceWideRangeSetting', 'heighRatioCheck']}
                            valuePropName="checked"
                          >
                            <Checkbox onChange={valueChange}></Checkbox>
                          </Form.Item>
                          <Form.Item
                            style={{ marginLeft: '10px' }}
                            label="高度系数法"
                            {...restField}
                            fieldKey={[fieldKey, 'faceWideRangeSetting', 'heighRatio']}
                          >
                            <div style={{ display: 'flex' }}>
                              <Form.Item>L = h *</Form.Item>
                              <Form.Item
                                style={{ marginLeft: '10px' }}
                                name={[name, 'faceWideRangeSetting', 'heighRatio']}
                                rules={[
                                  {
                                    required: unitShowFun([
                                      'specificationConfig',
                                      fieldKey,
                                      'faceWideRangeSetting',
                                      'heighRatioCheck',
                                    ]),
                                    message: '请输入高度',
                                  },
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  style={{ width: '90px' }}
                                  placeholder="请输入高度"
                                />
                              </Form.Item>
                            </div>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={7}>
                        <div style={{ display: 'flex' }}>
                          <Form.Item
                            name={[name, 'faceWideRangeSetting', 'areaRatioCheck']}
                            valuePropName="checked"
                          >
                            <Checkbox onChange={valueChange}></Checkbox>
                          </Form.Item>
                          <Form.Item
                            style={{ marginLeft: '10px' }}
                            label="面宽系数法"
                            {...restField}
                            fieldKey={[fieldKey, 'faceWideRangeSetting', 'areaRatio']}
                          >
                            <div style={{ display: 'flex' }}>
                              <Form.Item>L = w *</Form.Item>
                              <Form.Item
                                style={{ marginLeft: '10px' }}
                                name={[name, 'faceWideRangeSetting', 'areaRatio']}
                                rules={[
                                  {
                                    required: unitShowFun([
                                      'specificationConfig',
                                      fieldKey,
                                      'faceWideRangeSetting',
                                      'areaRatioCheck',
                                    ]),
                                    message: '请输入面宽',
                                  },
                                ]}
                              >
                                <InputNumber
                                  style={{ width: '90px' }}
                                  min={0}
                                  placeholder="请输入面宽"
                                />
                              </Form.Item>
                            </div>
                          </Form.Item>
                        </div>
                      </Col>
                      <Col span={7}>
                        <div style={{ display: 'flex' }}>
                          <Form.Item
                            name={[name, 'faceWideRangeSetting', 'minIntervalCheck']}
                            valuePropName="checked"
                          >
                            <Checkbox onChange={valueChange}></Checkbox>
                          </Form.Item>
                          <Form.Item
                            style={{ marginLeft: '10px' }}
                            label="最小间距法"
                            {...restField}
                            fieldKey={[fieldKey, 'faceWideRangeSetting', 'minInterval']}
                          >
                            <div style={{ display: 'flex' }}>
                              <Form.Item>L =</Form.Item>
                              <Form.Item
                                style={{ marginLeft: '10px' }}
                                name={[name, 'faceWideRangeSetting', 'minInterval']}
                                rules={[
                                  {
                                    required: unitShowFun([
                                      'specificationConfig',
                                      fieldKey,
                                      'faceWideRangeSetting',
                                      'minIntervalCheck',
                                    ]),
                                    message: '请输入最小间距',
                                  },
                                ]}
                              >
                                <InputNumber
                                  min={0}
                                  style={{ width: '90px' }}
                                  placeholder="请输入最小间距"
                                />
                              </Form.Item>
                            </div>
                          </Form.Item>
                        </div>
                      </Col>
                    </Row>
                  )}
                  <Divider style={{ margin: '10px 0' }} />
                </Card>
              ))}
              <Form.Item>
                <Button
                  type="primary"
                  onClick={() => addProduct()}
                  block
                  icon={<PlusOutlined />}
                  style={{ width: '120px' }}
                >
                  新增产品
                </Button>
              </Form.Item>
            </>
          )}
        </Form.List>
        <Divider orientation="left">配套信息</Divider>
        <Row>
          <Col span={14}>
            <Radio.Group onChange={onChanges} value={radioValue}>
              <div
                style={{
                  display: 'flex',
                  height: '32px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    height: '32px',
                    alignItems: 'center',
                  }}
                >
                  <Radio value="1"></Radio>
                </div>
                <Form.Item
                  label="住宅停车配比(辆/100㎡):"
                  name={['supportingInfo', 'residentialParking']}
                >
                  {!householdChecked && (
                    <InputNumber min={0} style={{ width: '180px' }} placeholder="请输入住宅停车" />
                  )}
                </Form.Item>
              </div>
              <div
                style={{
                  display: 'flex',
                  height: '32px',
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    height: '32px',
                    alignItems: 'center',
                  }}
                >
                  <Radio value="2"></Radio>
                </div>
                <Form.Item label="住宅停车配比(辆/户):"></Form.Item>
              </div>
              {householdChecked && (
                <Form.List
                  className={cx('formList')}
                  name={['supportingInfo', 'specificationConfig']}
                >
                  {(fields, { add, remove }) => (
                    <>
                      {fields.map((field, index) => (
                        <Space
                          key={field.key}
                          style={{ display: 'flex', marginBottom: 8 }}
                          align="baseline"
                        >
                          <Form.Item
                            fieldKey={[field.fieldKey, 'acreage']}
                            name={[field.name, 'acreage']}
                            label="户型面积(㎡):"
                            rules={[
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  let arr = getFieldValue().supportingInfo.specificationConfig;
                                  let length = arr.length;
                                  console.log(arr);
                                  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
                                  var regNeg =
                                    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                                  if (regPos.test(value) || regNeg.test(value)) {
                                    console.log(Number(arr[index].acreage));
                                    if (index != 0) {
                                      if (
                                        Number(value) < Number(arr[index - 1].acreage) ||
                                        Number(value) < Number(arr[index - 1].max)
                                      ) {
                                        return Promise.reject(new Error('当前值不能小于前面的值'));
                                      } else {
                                        return Promise.resolve();
                                      }
                                    } else {
                                      return Promise.resolve();
                                    }
                                  } else {
                                    if (value == '' || value == undefined) {
                                      return Promise.resolve();
                                    } else {
                                      return Promise.reject(new Error('请输入数字'));
                                    }
                                  }
                                },
                              }),
                            ]}
                          >
                            <Input
                              style={{ width: '60px' }}
                              placeholder=""
                              onChange={(e) => {
                                console.log(e.target.value, field);
                              }}
                            />
                          </Form.Item>
                          <div
                            style={{
                              width: '14px',
                              height: '1px',
                              backgroundColor: '#CCCCCC',
                            }}
                          ></div>
                          <Form.Item
                            name={[field.name, 'max']}
                            fieldKey={[field.fieldKey, 'max']}
                            label=""
                            rules={[
                              ({ getFieldValue }) => ({
                                validator(_, value) {
                                  let arr = getFieldValue().supportingInfo.specificationConfig;
                                  let length = arr.length;
                                  var regPos = /^\d+(\.\d+)?$/; //非负浮点数
                                  var regNeg =
                                    /^(-(([0-9]+\.[0-9]*[1-9][0-9]*)|([0-9]*[1-9][0-9]*\.[0-9]+)|([0-9]*[1-9][0-9]*)))$/; //负浮点数
                                  if (regPos.test(value) || regNeg.test(value)) {
                                    if (Number(value) < Number(arr[index].acreage)) {
                                      return Promise.reject(new Error('不可以小于前面的值'));
                                    } else {
                                      console.log('11111111111');
                                      return Promise.resolve();
                                    }
                                  } else {
                                    console.log('0000', value);
                                    if (value == '' || value == undefined) {
                                      return Promise.resolve();
                                    } else {
                                      return Promise.reject(new Error('请输入数字'));
                                    }
                                  }
                                },
                              }),
                            ]}
                          >
                            <Input
                              style={{ width: '60px' }}
                              placeholder=""
                              onChange={(e) => {
                                console.log(e.target.value, field);
                              }}
                            />
                          </Form.Item>

                          <Form.Item
                            label="停车配比(辆/户)"
                            name={[field.name, 'matching']}
                            fieldKey={[field.fieldKey, 'matching']}
                          >
                            <Input style={{ width: '60px' }} placeholder="" />
                          </Form.Item>
                          {fields.length - 1 == index && (
                            <>
                              <MinusCircleFilled
                                className={cx('FormOutlined')}
                                style={{ fontSize: '16px' }}
                                onClick={() => remove(index)}
                              />
                              <PlusCircleFilled
                                className={cx('FormOutlined')}
                                style={{ fontSize: '16px' }}
                                onClick={() => {
                                  console.log('fieldsfields', fields), add();
                                }}
                              />
                            </>
                          )}
                        </Space>
                      ))}
                    </>
                  )}
                </Form.List>
              )}
            </Radio.Group>
          </Col>
          <Col span={10}>
            <Form.Item
              {...formItemLayout}
              label="配套停车配比(辆/100㎡)"
              name={['supportingInfo', 'supportingParking']}
              rules={[
                {
                  required: true,
                  message: '请输入配套停车配比(辆/100㎡)',
                },
              ]}
              hasFeedback
            >
              <InputNumber
                min={0}
                style={{ width: '180px' }}
                placeholder="请输入配套停车配比(辆/100㎡)"
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="地面最大停车比例(%):"
              name={['supportingInfo', 'groundStoppingRatio']}
              rules={[
                {
                  required: true,
                  message: '请输入地面最大停车比例(%):',
                },
              ]}
              hasFeedback
            >
              <InputNumber
                min={0}
                style={{ width: '180px' }}
                placeholder="请输入地面最大停车比例(%):"
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="地面停车效率(㎡/辆)"
              name={['supportingInfo', 'undergroundParkingEfficiency']}
              rules={[
                {
                  required: true,
                  message: '请输入地面停车效率(㎡/辆)',
                },
              ]}
              hasFeedback
            >
              <InputNumber
                min={0}
                style={{ width: '180px' }}
                placeholder="请输入地面停车效率(㎡/辆)"
              />
            </Form.Item>
            <Form.Item
              {...formItemLayout}
              label="户均人口"
              name={['supportingInfo', 'worthOfPopulation']}
              rules={[
                {
                  required: false,
                  message: '请输入户均人口',
                },
              ]}
            >
              <InputNumber min={0} style={{ width: '180px' }} placeholder="请输入户均人口" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default EditModal;
