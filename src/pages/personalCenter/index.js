import React from "react";
import classnames from 'classnames/bind'
import styles from './index.module.less'
const cx = classnames.bind(styles)
import serverEnvConfig from "serverEnvConfig";

export default class Index extends React.Component {
  constructor(props) {
    super(props);
  }

  componentDidMount() {
  }

  render() {
    return (
       <iframe className={cx('ifream-box')} src={`${serverEnvConfig.baseIP}/cloud-design/#/person?form=work`}></iframe>
    );
  }
}
