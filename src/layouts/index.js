import React, { Component } from 'react';
import { Layout, Menu } from 'antd';
const { Header, Content, Sider } = Layout;
import { connect } from 'dva';
import { Link, routerRedux, Redirect } from 'dva/router';
import styles from './index.less';
import classnames from 'classnames/bind';
const cx = classnames.bind(styles);
const { SubMenu } = Menu;
import { qs } from '../utils/index';

const mapState2Props = ({ loading, global }) => {
  return {
    loading,
    ...global,
  };
};

@connect(mapState2Props)
export default class Admin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      menuList: [],
      menuKey: '',
      formWork: false,
      selectedKeys: '',
    };
  }
  go = ({ item, key, keyPath, domEvent }) => {
    //onClik那里虽然看不到传值,但是默认会传过来四个参数,详见官网
    // this.props.history.push(key); //编程式导航
    // this.props._this.props.history.push(key); //编程式导航
    // console.log('item, key, keyPath, domEvent', item, key, keyPath, domEvent);
    // console.log('layout:::::object:::::::::', this.props);
  };

  componentDidMount() {
    console.log('layout-----this::::', this);
    console.log(this.props.dispatch);
    // routerRedux.push('/login')
    // this.props.dispatch(routerRedux.push('/login'));
    // this.props.dispatch({
    //   type: 'global/goLogin',
    //   opt: {
    //   }
    // })
    // this.props.menuList
    const isFrom = qs(this.props.location?.search)?.form == 'work' ? true : false;
    this.setState({
      formWork: isFrom,
      menuKey: this.props.location.pathname,
      menuList: [
        // {
        //   name: '个人信息',
        //   path: '/personalCenter',
        // },
        // {
        //   name: '团队管理',
        //   path: '/groupManage',
        // },
        // {
        //   name: "消息管理",
        //   path: "/messageCenter",
        // },
        {
          name: '用户管理(内部)',
          path: '/userCenter', //用户租户关系
        },
        {
          name: '机构管理(内部)',
          path: '/organManage',
        },
        {
          name: '权限管理(内部)',
          path: '/permissionManage',
        },
        {
          name: '角色管理(内部)',
          path: '/roleCenter',
        },
        {
          name: '表单引擎(内部)',
          path: '/formEngine',
        },
        {
          name: '解决方管理(内部)',
          path: '/solution', //用户
        },
        {
          name: '身份管理(内部)',
          path: '/userManage', //用户
        },
        {
          name: '租户管理(内部)',
          path: '/lesseeManage', //租户
        },
        {
          name: '菜单管理(内部)',
          path: '/menuManage',
        },
        {
          name: '服务管理(内部)',
          path: '/productConfig',
        },
        {
          name: '场景管理(内部)',
          path: '/sceneManage',
        },
        {
          name: '城市配置(内部)',
          path: '/countryConfig',
        },
        // {
        //   name: 'json配置(内部)',
        //   path: '/jsonConfig',
        // },
        {
          name: '系统集成工具',
          path: '/IntegrationTools',
        }
      ],
    });

    if (!this.props.userInfo.id) {
      // return <Link to="/login" />
    }
  }

  handleMenuClick(e) {
    this.setState({
      menuKey: e.key,
    });
    this.props.dispatch(routerRedux.push(e.key));
  }

  render() {
    const { menuList, menuKey, formWork, selectedKeys } = this.state;
    return (
      <Layout style={{ borderRight: 0 }}>
        {formWork ? null : (
          <Header style={{ backgroundColor: '#011529', color: '#fff' }}>
            <span style={{ fontSize: '22px', fontWeight: '900' }}>
              图零科技---用户信息中心管理系统
            </span>
          </Header>
        )}

        <Layout>
          {formWork ? null : (
            <Sider width={170} style={{ background: '#fff', }}>
              <Menu
                theme="dark"
                mode="inline"
                selectedKeys={[menuKey]}
                style={{
                  height: 'calc(100vh - 64px)',
                  fontWeight: '900',
                  fontSize: '14px',
                  textAlign: 'center',
                }}
                onClick={(e) => this.handleMenuClick(e, history)}
              >
                {/* {this.props.children?.map((item) => {
                return (
                  <Menu.Item item={item.props.path} key={item.key}>
                    <Link to={item.props.path} key={item.key}>
                      {item.props.detail.name}
                    </Link>
                  </Menu.Item>
                );
              })} */}
                {menuList.map((item, mInd) => {
                  if (item.path) {
                    return (
                      <Menu.Item item={item.path} key={item.path}>
                        <Link
                          to={item.path}
                          key={item.path}
                          onClick={() => {
                            console.log(item,'item')
                            this.setState({
                              selectedKeys: item.path,
                            });
                          }}
                        >
                          {item.name}
                        </Link>
                      </Menu.Item>
                    );
                  } else {
                    return (
                      <SubMenu key={mInd} title={item.name}>
                        {item.children.map((child, cInd) => {
                          return <Menu.Item key={child.path}> 测试菜单</Menu.Item>;
                        })}
                      </SubMenu>
                    );
                  }
                })}
              </Menu>
            </Sider>
          )}
          <Content
            style={
              (selectedKeys != '/groupManage' && selectedKeys != '/personalCenter')
                ? {
                    // background: "#F5F6F7",
                    margin: 0,
                    maxHeight: 'calc(100vh - 64px)',
                    overflow: 'hidden',
                    overflowY: 'auto',
                    padding: '0 20px',
                  }
                : {
                    margin: 0,
                    maxHeight: 'calc(100vh - 64px)',
                    overflowY: 'hidden',
                    padding: '0 20px',
                  }
            }
          >
            {this.props.children}
          </Content>
        </Layout>
      </Layout>
    );
  }
}
