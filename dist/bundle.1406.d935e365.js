"use strict";(self.webpackChunkt_zero_user_operation_frontend=self.webpackChunkt_zero_user_operation_frontend||[]).push([[1406],{51406:(e,n,t)=>{t.r(n),t.d(n,{default:()=>de}),t(45654);var o=t(39144),a=(t(90562),t(71230)),r=(t(62194),t(15746)),p=(t(56931),t(91665)),l=t(15861),i=(t(95352),t(37614)),c=(t(47610),t(55026)),s=(t(7816),t(93379)),d=t.n(s),u=t(73130);d()(u.Z,{insert:"head",singleton:!1}),u.Z.locals,t(58645);var m=t(4334);d()(m.Z,{insert:"head",singleton:!1}),m.Z.locals;var f=t(87462),v=t(29439),b=t(67294),g=t(94184),h=t.n(g),x=t(21770),y=t(68855),w=t(15105),k=t(69713),Z=t(71577),P=t(32413),_=t(42051),E=t(5767),I=t(65632),C=t(96159),M=t(33603),O=void 0,S=b.forwardRef((function(e,n){var t=(0,x.Z)(!1,{value:e.visible,defaultValue:e.defaultVisible}),o=(0,v.Z)(t,2),a=o[0],r=o[1],p=function(n,t){var o;r(n),null===(o=e.onVisibleChange)||void 0===o||o.call(e,n,t)},l=function(n){var t;p(!1,n),null===(t=e.onConfirm)||void 0===t||t.call(O,n)},i=function(n){var t;p(!1,n),null===(t=e.onCancel)||void 0===t||t.call(O,n)},c=b.useContext(I.E_).getPrefixCls,s=e.prefixCls,d=e.placement,u=e.children,m=e.overlayClassName,g=function(e,n){var t={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&n.indexOf(o)<0&&(t[o]=e[o]);if(null!=e&&"function"==typeof Object.getOwnPropertySymbols){var a=0;for(o=Object.getOwnPropertySymbols(e);a<o.length;a++)n.indexOf(o[a])<0&&Object.prototype.propertyIsEnumerable.call(e,o[a])&&(t[o[a]]=e[o[a]])}return t}(e,["prefixCls","placement","children","overlayClassName"]),y=c("popover",s),S=c("popconfirm",s),L=h()(S,m),K=b.createElement(_.Z,{componentName:"Popconfirm",defaultLocale:E.Z.Popconfirm},(function(n){return function(n,t){var o,a=e.okButtonProps,r=e.cancelButtonProps,p=e.title,c=e.cancelText,s=e.okText,d=e.okType,u=e.icon;return b.createElement("div",{className:"".concat(n,"-inner-content")},b.createElement("div",{className:"".concat(n,"-message")},u,b.createElement("div",{className:"".concat(n,"-message-title")},(o=p)?"function"==typeof o?o():o:null)),b.createElement("div",{className:"".concat(n,"-buttons")},b.createElement(Z.Z,(0,f.Z)({onClick:i,size:"small"},r),c||t.cancelText),b.createElement(Z.Z,(0,f.Z)({onClick:l},(0,P.n)(d),{size:"small"},a),s||t.okText)))}(y,n)})),j=c();return b.createElement(k.Z,(0,f.Z)({},g,{prefixCls:y,placement:d,onVisibleChange:function(n){e.disabled||p(n)},visible:a,overlay:K,overlayClassName:L,ref:n,transitionName:(0,M.m)(j,"zoom-big",e.transitionName)}),(0,C.Tm)(u,{onKeyDown:function(e){var n,t;b.isValidElement(u)&&(null===(t=null==u?void 0:(n=u.props).onKeyDown)||void 0===t||t.call(n,e)),function(e){e.keyCode===w.Z.ESC&&a&&p(!1,e)}(e)}}))}));S.defaultProps={placement:"top",trigger:"click",okType:"primary",icon:b.createElement(y.Z,null),disabled:!1};const L=S;var K=t(15671),j=t(43144),N=t(97326),T=t(79340),V=t(82963),D=t(61120),R=t(4942),z=(t(64008),t(51752)),B=(t(21384),t(16317)),F=t(87757),q=t.n(F),Y=t(55609),H=t(880);d()(H.Z,{insert:"head",singleton:!1});const W=H.Z.locals||{};var G=t(47166),X=t.n(G),A=t(5582),J=t.n(A),Q=(t(10534),t(20924)),U=(t(16458),t(12010)),$=(t(24713),t(82482)),ee=t(30944);function ne(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function te(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?ne(Object(t),!0).forEach((function(n){(0,R.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):ne(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}const oe=function(e){var n=e.visible,t=e.submitMap,o=e.delMenu,a=e.onCancel,r=e.isEditMenu,p=e._this,s=e.dataList,d=$.Z.useForm(),u=(0,v.Z)(d,1)[0],m={},g=b.useState(""),h=(0,v.Z)(g,2),x=h[0],y=h[1],w=function(){var e=(0,l.Z)(q().mark((function e(n){var t;return q().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!r){e.next=7;break}return t=p.props.dispatch,e.next=4,t({type:"menuManage/getMenuInfo",opt:{menuInfoId:n},callback:function(e){var n,t=te({},null==e||null===(n=e.data)||void 0===n?void 0:n.data);y(t.id),u.setFieldsValue(t)}});case 4:e.sent,e.next=8;break;case 7:return e.abrupt("return");case 8:case"end":return e.stop()}}),e)})));return function(n){return e.apply(this,arguments)}}(),k=function(){var e=(0,l.Z)(q().mark((function e(n,t){return q().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,ee.xb)(null==t?void 0:t.parentRoleId)||r||(c.ZP.error("请选择一级角色!"),u.setFieldsValue({parentID:""}));case 1:case"end":return e.stop()}}),e)})));return function(n,t){return e.apply(this,arguments)}}(),P=function(){u.resetFields(),u.setFieldsValue({}),a()};u.setFieldsValue(m);var _=[b.createElement(Z.Z,{onClick:P},"取消"),b.createElement(Z.Z,{key:"submit",type:"primary",onClick:function(){u.validateFields().then((function(e){u.setFieldsValue(te({menuId:x},e)),u.resetFields(),console.log(te({menuId:x},e)),t(te({menuId:x},e))})).catch((function(e){console.log("校验失败:",e)}))}},"确认")];return r&&2==_.length?_.push(b.createElement(Z.Z,{type:"danger",onClick:function(){o(x)}},"删除")):r||3!=_.length||_.pop(),b.createElement(i.Z,{visible:n,title:r?"编辑菜单":"新建菜单",onCancel:P,destroyOnClose:!0,footer:_},b.createElement($.Z,(0,f.Z)({form:u},{labelCol:{span:5},wrapperCol:{span:18}},{name:"createMenu",initialValues:m}),b.createElement($.Z.Item,{help:r?"选择菜单":"不选就是一级菜单",label:r?"选择菜单":"选择父级菜单",placeholder:"选择父级菜单",name:"parentID",rules:[{required:!1,message:"请选择菜单"}]},b.createElement(U.Z,{style:{width:"100%"},dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:(0,ee.wf)(s,"menuName","parentMenuId"),placeholder:"Please select",showSearch:!0,allowClear:!0,onChange:w,onSelect:k})),b.createElement($.Z.Item,{label:"菜单名称",name:"menuName",rules:[{required:!0,message:"请输入菜单名称"}]},b.createElement(Q.Z,{placeholder:"请输入菜单名称"})),b.createElement($.Z.Item,{label:"菜单code",name:"menuCode",rules:[{required:!0,message:"请输入菜单code"}]},b.createElement(Q.Z,{placeholder:"请输入菜单code"}))))};var ae,re;function pe(e,n){var t=Object.keys(e);if(Object.getOwnPropertySymbols){var o=Object.getOwnPropertySymbols(e);n&&(o=o.filter((function(n){return Object.getOwnPropertyDescriptor(e,n).enumerable}))),t.push.apply(t,o)}return t}function le(e){for(var n=1;n<arguments.length;n++){var t=null!=arguments[n]?arguments[n]:{};n%2?pe(Object(t),!0).forEach((function(n){(0,R.Z)(e,n,t[n])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(t)):pe(Object(t)).forEach((function(n){Object.defineProperty(e,n,Object.getOwnPropertyDescriptor(t,n))}))}return e}var ie=X().bind(W),ce=B.Z.Option,se=(z.Z.TabPane,function(e){return J()(e).utcOffset(8).format("YYYY-MM-DD HH:mm:ss")}),de=(ae=(0,Y.connect)((function(e){var n=e.loading,t=e.menuManage;return le({loading:n,userInfo:e.global.userInfo},t)})),ae(re=function(e){(0,T.Z)(d,e);var n,t,s=(n=d,t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,o=(0,D.Z)(n);if(t){var a=(0,D.Z)(this).constructor;e=Reflect.construct(o,arguments,a)}else e=o.apply(this,arguments);return(0,V.Z)(this,e)});function d(e){var n;return(0,K.Z)(this,d),n=s.call(this,e),(0,R.Z)((0,N.Z)(n),"getProduct",(function(){(0,n.props.dispatch)({type:"menuManage/getProduct",opt:{currentPage:1,pageSize:1e3},callback:function(e){var t,o,a,r,p,l,i,c,s;200==(null==e||null===(t=e.data)||void 0===t?void 0:t.status)&&n.setState({productList:(null==e||null===(o=e.data)||void 0===o||null===(a=o.data)||void 0===a?void 0:a.list)||[],productId:(null==e||null===(r=e.data)||void 0===r||null===(p=r.data)||void 0===p||null===(l=p.list[0])||void 0===l?void 0:l.id)||"",productName:(null==e||null===(i=e.data)||void 0===i||null===(c=i.data)||void 0===c||null===(s=c.list[0])||void 0===s?void 0:s.productName)||""},(function(){n.getList()}))}})})),(0,R.Z)((0,N.Z)(n),"columns",[{title:"序号",key:"id",dataIndex:"id"},{title:"菜单名称",dataIndex:"menuName",key:"menuName"},{title:"创建时间",dataIndex:"createdTime",key:"createdTime",render:function(e){return e?se(e):0}},{title:"更新时间",dataIndex:"updatedTime",key:"updatedTime",render:function(e){return e?se(e):0}},{title:"操作",key:"id",render:function(e,t){return b.createElement(b.Fragment,null,b.createElement(Z.Z,{style:{marginLeft:"10px"},size:"small",type:"primary",onClick:function(){return n.showEditModal(t)}},"编辑"),b.createElement(L,{title:"确定删除该菜单?",onConfirm:function(){return n.confirm(t)},onCancel:n.handleCancel,okText:"确定",cancelText:"取消"},b.createElement(Z.Z,{style:{marginLeft:"10px"},size:"small",danger:!0,type:"primary"},"删除")))}}]),(0,R.Z)((0,N.Z)(n),"getList",(function(){var e=n.props.dispatch,t=n.state,o=t.tenantId,a=t.productId;t.selectedKeys,e({type:"menuManage/getMenuLists",opt:{tenantId:o,productId:a},callback:function(e){var t,o,a,r;n.setState({selectedKeys:[null==e||null===(t=e.data)||void 0===t||null===(o=t.data)||void 0===o||null===(a=o.list)||void 0===a||null===(r=a[0])||void 0===r?void 0:r.id]},(function(){n.getPermission()}))}})})),(0,R.Z)((0,N.Z)(n),"handleCreate",(function(){n.setState({createVisible:!0,isEditMenu:!1})})),(0,R.Z)((0,N.Z)(n),"handleAddSubmit",(function(e){var t=n.props.dispatch,o=n.state,a=o.isEditMenu,r=o.tenantId,p=o.productId,l=o.editInfo,i=e.menuName,s=e.menuCode,d=e.parentID,u=e.menuId,m=a?"menuManage/updateMenuLists":"menuManage/createMenuLists";le(le({},l),e),t({type:m,opt:{menuCode:s,menuName:i,tenantId:r,parentMenuId:d,productId:p,id:u},callback:function(e){200==e.data.status?(c.ZP.success("创建菜单成功"),n.handleCancel(),n.getList()):c.ZP.error("添加失败，请重新尝试!")}})})),(0,R.Z)((0,N.Z)(n),"showEditModal",(function(e){n.setState({editVisible:!0,editInfo:e})})),(0,R.Z)((0,N.Z)(n),"handleEditSubmit",(function(e){var t,o=n.props.dispatch,a=le(le({},n.state.editInfo),e),r=e.menuName,p=b.createElement(b.Fragment,null,b.createElement("br",null),b.createElement("h3",null,"菜单名称:   ",r));i.Z.confirm({title:"请确认修改菜单信息!",content:p,onOk:(t=(0,l.Z)(q().mark((function e(){return q().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o({type:"menuManage/updateMenuLists",opt:le({},a),callback:function(e){200==e.data.status?(c.ZP.success("修改菜单成功"),n.handleCancel(),n.getList()):c.ZP.error("修改失败，请重新尝试!")}});case 2:e.sent;case 3:case"end":return e.stop()}}),e)}))),function(){return t.apply(this,arguments)})})})),(0,R.Z)((0,N.Z)(n),"confirm",(function(e){n.props.dispatch({type:"menuManage/delMenuLists",opt:{menuInfoId:e.id},callback:function(e){200==e.data.status?(c.ZP.success("删除菜单成功"),n.handleCancel(),n.getList()):c.ZP.error("删除失败，请重新尝试!")}})})),(0,R.Z)((0,N.Z)(n),"handleCancel",(function(){n.setState({createVisible:!1,editVisible:!1,editInfo:{}})})),(0,R.Z)((0,N.Z)(n),"getPermission",(function(){var e=n.state,t=e.selectedKeys,o=e.tenantId,a=e.productId;t[0]?n.props.dispatch({type:"menuManage/getPermission",opt:{tenantId:o,menuId:t[0],currentPage:1,pageSize:1e3,productId:a},callback:function(e){var t,o,a=(null==e||null===(t=e.data)||void 0===t||null===(o=t.data)||void 0===o?void 0:o.list)||[],r=[];a.map((function(e){e.relId&&r.push(e.id)})),n.setState({permissionList:a,selectedRowKeys:[],checkedKeysPer:r})}}):n.setState({permissionList:[],selectedRowKeys:[]})})),(0,R.Z)((0,N.Z)(n),"onExpand",(function(e){n.setState({expandedKeys:e,autoExpandParent:!1})})),(0,R.Z)((0,N.Z)(n),"onCheck",(function(e){n.setState({checkedKeys:e})})),(0,R.Z)((0,N.Z)(n),"onSelect",(function(e,t){n.setState({selectedKeys:e,selectedItem:t.node},(function(){n.getPermission()}))})),(0,R.Z)((0,N.Z)(n),"handleSelect",(function(e){n.setState({productId:Number(e.split("-")[0]),productName:e.split("-")[1]},(function(){n.getList()}))})),(0,R.Z)((0,N.Z)(n),"editMenu",(function(){n.setState({createVisible:!0,isEditMenu:!0})})),(0,R.Z)((0,N.Z)(n),"delMenu",(function(e){(0,n.props.dispatch)({type:"menuManage/delMenuLists",opt:{tenantId:n.state.tenantId,menuInfoId:e},callback:function(e){200==e.data.status?(c.ZP.success("删除菜单成功"),n.handleCancel(),n.getList()):c.ZP.error("删除失败，请重新尝试!")}})})),(0,R.Z)((0,N.Z)(n),"onPerExpand",(function(e){n.setState({expandedKeysPer:e,autoExpandParentPer:!1})})),(0,R.Z)((0,N.Z)(n),"onPerCheck",(function(e){n.setState({checkedKeysPer:e})})),(0,R.Z)((0,N.Z)(n),"onPerSelect",(function(e,t){n.setState({selectedKeysPer:e,selectedItemPer:t.node},(function(){n.getPermission()}))})),(0,R.Z)((0,N.Z)(n),"addPermission",(function(){var e=n.props.dispatch,t=n.state,o=t.tenantId,a=t.selectedKeys,r=t.checkedKeysPer;r.length>0?e({type:"menuManage/addRolePermission",opt:{tenantId:o,menuInfoId:a[0],permissionIds:r},callback:function(e){var t;200==(null==e||null===(t=e.data)||void 0===t?void 0:t.status)?(c.ZP.success("修改成功!"),n.handleCancel(),n.getPermission()):c.ZP.error("修改失败!")}}):c.ZP.warn("请选择权限!")})),n.state={tenantId:"",createVisible:!1,editVisible:!1,editInfo:{},productList:[],productId:"",productName:"",expandedKeys:[],checkedKeys:[],selectedKeys:[],selectedItem:[],isEditMenu:!1,permissionList:[],expandedKeysPer:[],checkedKeysPer:[],selectedKeysPer:[],selectedItemPer:[],autoExpandParentPer:!0},n}return(0,j.Z)(d,[{key:"componentDidMount",value:function(){var e=this;this.setState({tenantId:sessionStorage.getItem("tenantId")},(function(){e.getProduct()}))}},{key:"render",value:function(){var e=this.state,n=e.createVisible,t=(e.editVisible,e.editInfo,e.expandedKeys),l=e.checkedKeys,i=e.selectedKeys,c=(e.selectedItem,e.productList),s=e.productName,d=e.isEditMenu,u=e.expandedKeysPer,m=e.checkedKeysPer,f=e.selectedKeysPer,v=(e.selectedItemPer,e.autoExpandParentPer),g=e.permissionList,h=this.props.List;return b.createElement("div",{className:ie("menuManage")},b.createElement(o.Z,{title:"菜单管理",extra:b.createElement(b.Fragment,null,b.createElement("span",null,"产品名称 : "),b.createElement(B.Z,{style:{width:200,margin:"0 50px 0 10px"},value:s,showSearch:!0,onChange:this.handleSelect},c.map((function(e){return b.createElement(ce,{value:"".concat(e.id,"-").concat(e.productName)},e.productName)}))),b.createElement(Z.Z,{onClick:this.handleCreate,type:"primary"},"创建菜单"),b.createElement(Z.Z,{style:{marginLeft:"8px"},type:"primary",onClick:this.editMenu},"编辑菜单"))},b.createElement(a.Z,null,b.createElement(r.Z,{span:8},b.createElement(p.Z,{onExpand:this.onExpand,expandedKeys:t,autoExpandParent:!0,onCheck:this.onCheck,checkedKeys:l,onSelect:this.onSelect,selectedKeys:i,treeData:(0,ee.wf)(h,"menuName","parentMenuId")})),b.createElement(r.Z,{span:16,style:{borderLeft:"1px solid #c4bcbc",padding:"0 30px"}},b.createElement(p.Z,{checkable:!0,onExpand:this.onPerExpand,expandedKeys:u,autoExpandParent:v,onCheck:this.onPerCheck,checkedKeys:m,onSelect:this.onPerSelect,selectedKeys:f,treeData:(0,ee.wf)(g,"permissionName","parentPermissonId")}),b.createElement(Z.Z,{style:{margin:"30px 0 0 8px"},type:"primary",onClick:this.addPermission},"修改权限")))),b.createElement(oe,{visible:n,isEditMenu:d,submitMap:this.handleAddSubmit,onCancel:this.handleCancel,delMenu:this.delMenu,dataList:h,_this:this}))}}]),d}(b.Component))||re)},4334:(e,n,t)=>{t.d(n,{Z:()=>r});var o=t(23645),a=t.n(o)()((function(e){return e[1]}));a.push([e.id,"/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-popconfirm {\n  z-index: 1060;\n}\n",""]);const r=a},73130:(e,n,t)=>{t.d(n,{Z:()=>r});var o=t(23645),a=t.n(o)()((function(e){return e[1]}));a.push([e.id,"/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-popover {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.85);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5715;\n  list-style: none;\n  font-feature-settings: 'tnum';\n  position: absolute;\n  top: 0;\n  left: 0;\n  z-index: 1030;\n  font-weight: normal;\n  white-space: normal;\n  text-align: left;\n  cursor: auto;\n  -webkit-user-select: text;\n  -moz-user-select: text;\n  -ms-user-select: text;\n  user-select: text;\n}\n.ant-popover::after {\n  position: absolute;\n  background: rgba(255, 255, 255, 0.01);\n  content: '';\n}\n.ant-popover-hidden {\n  display: none;\n}\n.ant-popover-placement-top,\n.ant-popover-placement-topLeft,\n.ant-popover-placement-topRight {\n  padding-bottom: 10px;\n}\n.ant-popover-placement-right,\n.ant-popover-placement-rightTop,\n.ant-popover-placement-rightBottom {\n  padding-left: 10px;\n}\n.ant-popover-placement-bottom,\n.ant-popover-placement-bottomLeft,\n.ant-popover-placement-bottomRight {\n  padding-top: 10px;\n}\n.ant-popover-placement-left,\n.ant-popover-placement-leftTop,\n.ant-popover-placement-leftBottom {\n  padding-right: 10px;\n}\n.ant-popover-inner {\n  background-color: #fff;\n  background-clip: padding-box;\n  border-radius: 2px;\n  box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);\n  box-shadow: 0 0 8px rgba(0, 0, 0, 0.15) \\9;\n}\n@media screen and (-ms-high-contrast: active), (-ms-high-contrast: none) {\n  .ant-popover {\n    /* IE10+ */\n  }\n  .ant-popover-inner {\n    box-shadow: 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 9px 28px 8px rgba(0, 0, 0, 0.05);\n  }\n}\n.ant-popover-title {\n  min-width: 177px;\n  min-height: 32px;\n  margin: 0;\n  padding: 5px 16px 4px;\n  color: rgba(0, 0, 0, 0.85);\n  font-weight: 500;\n  border-bottom: 1px solid #f0f0f0;\n}\n.ant-popover-inner-content {\n  padding: 12px 16px;\n  color: rgba(0, 0, 0, 0.85);\n}\n.ant-popover-message {\n  position: relative;\n  padding: 4px 0 12px;\n  color: rgba(0, 0, 0, 0.85);\n  font-size: 14px;\n}\n.ant-popover-message > .anticon {\n  position: absolute;\n  top: 8.0005px;\n  color: #faad14;\n  font-size: 14px;\n}\n.ant-popover-message-title {\n  padding-left: 22px;\n}\n.ant-popover-buttons {\n  margin-bottom: 4px;\n  text-align: right;\n}\n.ant-popover-buttons button {\n  margin-left: 8px;\n}\n.ant-popover-arrow {\n  position: absolute;\n  display: block;\n  width: 8.48528137px;\n  height: 8.48528137px;\n  overflow: hidden;\n  background: transparent;\n  pointer-events: none;\n}\n.ant-popover-arrow-content {\n  position: absolute;\n  top: 0;\n  right: 0;\n  bottom: 0;\n  left: 0;\n  display: block;\n  width: 6px;\n  height: 6px;\n  margin: auto;\n  background-color: #fff;\n  content: '';\n  pointer-events: auto;\n}\n.ant-popover-placement-top .ant-popover-arrow,\n.ant-popover-placement-topLeft .ant-popover-arrow,\n.ant-popover-placement-topRight .ant-popover-arrow {\n  bottom: 1.51471863px;\n}\n.ant-popover-placement-top .ant-popover-arrow-content,\n.ant-popover-placement-topLeft .ant-popover-arrow-content,\n.ant-popover-placement-topRight .ant-popover-arrow-content {\n  box-shadow: 3px 3px 7px rgba(0, 0, 0, 0.07);\n  transform: translateY(-4.24264069px) rotate(45deg);\n}\n.ant-popover-placement-top .ant-popover-arrow {\n  left: 50%;\n  transform: translateX(-50%);\n}\n.ant-popover-placement-topLeft .ant-popover-arrow {\n  left: 16px;\n}\n.ant-popover-placement-topRight .ant-popover-arrow {\n  right: 16px;\n}\n.ant-popover-placement-right .ant-popover-arrow,\n.ant-popover-placement-rightTop .ant-popover-arrow,\n.ant-popover-placement-rightBottom .ant-popover-arrow {\n  left: 1.51471863px;\n}\n.ant-popover-placement-right .ant-popover-arrow-content,\n.ant-popover-placement-rightTop .ant-popover-arrow-content,\n.ant-popover-placement-rightBottom .ant-popover-arrow-content {\n  box-shadow: -3px 3px 7px rgba(0, 0, 0, 0.07);\n  transform: translateX(4.24264069px) rotate(45deg);\n}\n.ant-popover-placement-right .ant-popover-arrow {\n  top: 50%;\n  transform: translateY(-50%);\n}\n.ant-popover-placement-rightTop .ant-popover-arrow {\n  top: 12px;\n}\n.ant-popover-placement-rightBottom .ant-popover-arrow {\n  bottom: 12px;\n}\n.ant-popover-placement-bottom .ant-popover-arrow,\n.ant-popover-placement-bottomLeft .ant-popover-arrow,\n.ant-popover-placement-bottomRight .ant-popover-arrow {\n  top: 1.51471863px;\n}\n.ant-popover-placement-bottom .ant-popover-arrow-content,\n.ant-popover-placement-bottomLeft .ant-popover-arrow-content,\n.ant-popover-placement-bottomRight .ant-popover-arrow-content {\n  box-shadow: -2px -2px 5px rgba(0, 0, 0, 0.06);\n  transform: translateY(4.24264069px) rotate(45deg);\n}\n.ant-popover-placement-bottom .ant-popover-arrow {\n  left: 50%;\n  transform: translateX(-50%);\n}\n.ant-popover-placement-bottomLeft .ant-popover-arrow {\n  left: 16px;\n}\n.ant-popover-placement-bottomRight .ant-popover-arrow {\n  right: 16px;\n}\n.ant-popover-placement-left .ant-popover-arrow,\n.ant-popover-placement-leftTop .ant-popover-arrow,\n.ant-popover-placement-leftBottom .ant-popover-arrow {\n  right: 1.51471863px;\n}\n.ant-popover-placement-left .ant-popover-arrow-content,\n.ant-popover-placement-leftTop .ant-popover-arrow-content,\n.ant-popover-placement-leftBottom .ant-popover-arrow-content {\n  box-shadow: 3px -3px 7px rgba(0, 0, 0, 0.07);\n  transform: translateX(-4.24264069px) rotate(45deg);\n}\n.ant-popover-placement-left .ant-popover-arrow {\n  top: 50%;\n  transform: translateY(-50%);\n}\n.ant-popover-placement-leftTop .ant-popover-arrow {\n  top: 12px;\n}\n.ant-popover-placement-leftBottom .ant-popover-arrow {\n  bottom: 12px;\n}\n.ant-popover-pink .ant-popover-inner {\n  background-color: #eb2f96;\n}\n.ant-popover-pink .ant-popover-arrow-content {\n  background-color: #eb2f96;\n}\n.ant-popover-magenta .ant-popover-inner {\n  background-color: #eb2f96;\n}\n.ant-popover-magenta .ant-popover-arrow-content {\n  background-color: #eb2f96;\n}\n.ant-popover-red .ant-popover-inner {\n  background-color: #f5222d;\n}\n.ant-popover-red .ant-popover-arrow-content {\n  background-color: #f5222d;\n}\n.ant-popover-volcano .ant-popover-inner {\n  background-color: #fa541c;\n}\n.ant-popover-volcano .ant-popover-arrow-content {\n  background-color: #fa541c;\n}\n.ant-popover-orange .ant-popover-inner {\n  background-color: #fa8c16;\n}\n.ant-popover-orange .ant-popover-arrow-content {\n  background-color: #fa8c16;\n}\n.ant-popover-yellow .ant-popover-inner {\n  background-color: #fadb14;\n}\n.ant-popover-yellow .ant-popover-arrow-content {\n  background-color: #fadb14;\n}\n.ant-popover-gold .ant-popover-inner {\n  background-color: #faad14;\n}\n.ant-popover-gold .ant-popover-arrow-content {\n  background-color: #faad14;\n}\n.ant-popover-cyan .ant-popover-inner {\n  background-color: #13c2c2;\n}\n.ant-popover-cyan .ant-popover-arrow-content {\n  background-color: #13c2c2;\n}\n.ant-popover-lime .ant-popover-inner {\n  background-color: #a0d911;\n}\n.ant-popover-lime .ant-popover-arrow-content {\n  background-color: #a0d911;\n}\n.ant-popover-green .ant-popover-inner {\n  background-color: #52c41a;\n}\n.ant-popover-green .ant-popover-arrow-content {\n  background-color: #52c41a;\n}\n.ant-popover-blue .ant-popover-inner {\n  background-color: #1890ff;\n}\n.ant-popover-blue .ant-popover-arrow-content {\n  background-color: #1890ff;\n}\n.ant-popover-geekblue .ant-popover-inner {\n  background-color: #2f54eb;\n}\n.ant-popover-geekblue .ant-popover-arrow-content {\n  background-color: #2f54eb;\n}\n.ant-popover-purple .ant-popover-inner {\n  background-color: #722ed1;\n}\n.ant-popover-purple .ant-popover-arrow-content {\n  background-color: #722ed1;\n}\n.ant-popover-rtl {\n  direction: rtl;\n  text-align: right;\n}\n.ant-popover-rtl .ant-popover-message-title {\n  padding-right: 22px;\n  padding-left: 16px;\n}\n.ant-popover-rtl .ant-popover-buttons {\n  text-align: left;\n}\n.ant-popover-rtl .ant-popover-buttons button {\n  margin-right: 8px;\n  margin-left: 0;\n}\n",""]);const r=a},880:(e,n,t)=>{t.d(n,{Z:()=>r});var o=t(23645),a=t.n(o)()((function(e){return e[1]}));a.push([e.id,'html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n  font-family: "微软雅黑", "Arial", "华文细黑", "STHeiti", "MingLiu";\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \'\';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\na {\n  color: #000;\n  text-decoration: none;\n}\na:hover {\n  color: #000;\n  text-decoration: none;\n}\n::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n::-webkit-scrollbar-thumb {\n  background-color: #aaa;\n  border-radius: 10px;\n}\n#index-module__root___1-u7Y {\n  height: 100%;\n}\n.index-module__box___2wHT5 {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  min-height: 92vh;\n  background-color: #f0f2f5;\n}\n.index-module__menuManage___3lWwy .ant-card {\n  margin: 20px;\n  border-radius: 7px;\n}\n.index-module__groupLists___d6uw3 .index-module__groupBtn___3f8GG {\n  margin-left: 10px;\n  margin-bottom: 20px;\n}\n.index-module__searchForm___MriWW .ant-form-inline .ant-form-item {\n  width: 260px;\n}\n.index-module__table-box___38ojM .ant-card {\n  width: 100%;\n}\n',""]),a.locals={root:"index-module__root___1-u7Y",box:"index-module__box___2wHT5",menuManage:"index-module__menuManage___3lWwy",groupLists:"index-module__groupLists___d6uw3",groupBtn:"index-module__groupBtn___3f8GG",searchForm:"index-module__searchForm___MriWW","table-box":"index-module__table-box___38ojM"};const r=a}}]);