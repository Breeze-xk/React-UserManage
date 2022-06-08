"use strict";(self.webpackChunkt_zero_user_operation_frontend=self.webpackChunkt_zero_user_operation_frontend||[]).push([[9278],{60331:(n,e,t)=>{t.d(e,{Z:()=>v});var a=t(4942),r=t(87462),o=t(29439),l=t(67294),i=t(94184),c=t.n(i),s=t(98423),d=t(54549),u=t(65632);var f=t(98787),g=t(21790),p=new RegExp("^(".concat(f.Y.join("|"),")(-inverse)?$")),b=new RegExp("^(".concat(f.E.join("|"),")$")),m=function(n,e){var t,i=n.prefixCls,f=n.className,m=n.style,h=n.children,v=n.icon,y=n.color,k=n.onClose,Z=n.closeIcon,x=n.closable,O=void 0!==x&&x,w=function(n,e){var t={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(t[a]=n[a]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(n);r<a.length;r++)e.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(n,a[r])&&(t[a[r]]=n[a[r]])}return t}(n,["prefixCls","className","style","children","icon","color","onClose","closeIcon","closable"]),_=l.useContext(u.E_),C=_.getPrefixCls,E=_.direction,I=l.useState(!0),z=(0,o.Z)(I,2),P=z[0],S=z[1];l.useEffect((function(){"visible"in w&&S(w.visible)}),[w.visible]);var M=function(){return!!y&&(p.test(y)||b.test(y))},R=(0,r.Z)({backgroundColor:y&&!M()?y:void 0},m),j=M(),L=C("tag",i),D=c()(L,(t={},(0,a.Z)(t,"".concat(L,"-").concat(y),j),(0,a.Z)(t,"".concat(L,"-has-color"),y&&!j),(0,a.Z)(t,"".concat(L,"-hidden"),!P),(0,a.Z)(t,"".concat(L,"-rtl"),"rtl"===E),t),f),U=function(n){n.stopPropagation(),null==k||k(n),n.defaultPrevented||"visible"in w||S(!1)},K="onClick"in w||h&&"a"===h.type,F=(0,s.Z)(w,["visible"]),N=v||null,V=N?l.createElement(l.Fragment,null,N,l.createElement("span",null,h)):h,q=l.createElement("span",(0,r.Z)({},F,{ref:e,className:D,style:R}),V,O?Z?l.createElement("span",{className:"".concat(L,"-close-icon"),onClick:U},Z):l.createElement(d.Z,{className:"".concat(L,"-close-icon"),onClick:U}):null);return K?l.createElement(g.Z,null,q):q},h=l.forwardRef(m);h.displayName="Tag",h.CheckableTag=function(n){var e,t=n.prefixCls,o=n.className,i=n.checked,s=n.onChange,d=n.onClick,f=function(n,e){var t={};for(var a in n)Object.prototype.hasOwnProperty.call(n,a)&&e.indexOf(a)<0&&(t[a]=n[a]);if(null!=n&&"function"==typeof Object.getOwnPropertySymbols){var r=0;for(a=Object.getOwnPropertySymbols(n);r<a.length;r++)e.indexOf(a[r])<0&&Object.prototype.propertyIsEnumerable.call(n,a[r])&&(t[a[r]]=n[a[r]])}return t}(n,["prefixCls","className","checked","onChange","onClick"]),g=(0,l.useContext(u.E_).getPrefixCls)("tag",t),p=c()(g,(e={},(0,a.Z)(e,"".concat(g,"-checkable"),!0),(0,a.Z)(e,"".concat(g,"-checkable-checked"),i),e),o);return l.createElement("span",(0,r.Z)({},f,{className:p,onClick:function(n){null==s||s(!i),null==d||d(n)}}))};const v=h},27793:(n,e,t)=>{t(7816);var a=t(93379),r=t.n(a),o=t(90751);r()(o.Z,{insert:"head",singleton:!1}),o.Z.locals},99278:(n,e,t)=>{t.r(e),t.d(e,{default:()=>nn}),t(90562);var a=t(71230),r=(t(45654),t(39144)),o=t(87462),l=(t(24713),t(82482)),i=(t(10534),t(20924)),c=(t(62194),t(15746)),s=(t(56931),t(91665)),d=(t(58645),t(71577)),u=(t(95352),t(37614)),f=(t(47610),t(55026)),g=t(15861),p=t(15671),b=t(43144),m=t(97326),h=t(79340),v=t(82963),y=t(61120),k=t(4942),Z=(t(21384),t(16317)),x=t(87757),O=t.n(x),w=t(67294),_=t(55609),C=t(93379),E=t.n(C),I=t(34007);E()(I.Z,{insert:"head",singleton:!1});const z=I.Z.locals||{};var P=t(47166),S=t.n(P),M=(t(5582),t(30944)),R=(t(16458),t(12010)),j=t(29439);function L(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function D(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?L(Object(t),!0).forEach((function(e){(0,k.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):L(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}const U=function(n){var e=n.visible,t=n.submitMap,a=n.deleteOrgan,r=n.onCancel,c=n.isEditOrgan,s=n._this,f=n.dataList,p=l.Z.useForm(),b=(0,j.Z)(p,1)[0],m={},h=w.useState(""),v=(0,j.Z)(h,2),y=v[0],k=v[1],Z=function(){var n=(0,g.Z)(O().mark((function n(e){var t;return O().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(!c){n.next=7;break}return t=s.props.dispatch,n.next=4,t({type:"organManage/getOrganInfo",opt:{organizationId:e},callback:function(n){var e,t,a,r,o=D({remark:null==n||null===(e=n.data)||void 0===e||null===(t=e.data)||void 0===t||null===(a=t.organizationDesc)||void 0===a?void 0:a.remark},null==n||null===(r=n.data)||void 0===r?void 0:r.data);k(o.id),b.setFieldsValue(o)}});case 4:n.sent,n.next=8;break;case 7:return n.abrupt("return");case 8:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}(),x=function(){b.resetFields(),b.setFieldsValue({}),r()};b.setFieldsValue(m);var _=[w.createElement(d.Z,{onClick:x},"取消"),w.createElement(d.Z,{key:"submit",type:"primary",onClick:function(){b.validateFields().then((function(n){b.setFieldsValue(D({organizationDesc:{remark:n.remark},organizationId:y},n)),console.log(D({organizationDesc:{remark:n.remark},organizationId:y},n)),b.resetFields(),t(D({organizationDesc:{remark:n.remark},organizationId:y},n))})).catch((function(n){console.log("校验失败:",n)}))}},"确认")];return c&&2==_.length?_.push(w.createElement(d.Z,{type:"danger",onClick:function(){a(y),b.resetFields()}},"删除")):c||3!=_.length||_.pop(),w.createElement(u.Z,{visible:e,title:c?"编辑机构":"新建机构",onCancel:x,destroyOnClose:!0,footer:_},w.createElement(l.Z,(0,o.Z)({form:b},{labelCol:{span:5},wrapperCol:{span:18}},{name:"createOrgan",initialValues:m}),w.createElement(l.Z.Item,{help:c?"选择机构":"选择父级机构",label:c?"选择机构":"选择父级机构",name:"parentID",rules:[{required:!0,message:"请选择机构"}]},w.createElement(R.Z,{style:{width:"100%"},dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:(0,M.wf)(f,"organizationName","parentOrganizationId"),placeholder:"请选择父级机构",treeDefaultExpandAll:!0,allowClear:!0,onChange:Z})),w.createElement(l.Z.Item,{label:"新机构名称",name:"organizationName",rules:[{required:!0,message:"请输入机构名称"}]},w.createElement(i.Z,{placeholder:"请输入新机构名称"})),w.createElement(l.Z.Item,{label:"备注",name:"remark"},w.createElement(i.Z,{placeholder:"请输入机构备注"}))))};var K=t(23500);E()(K.Z,{insert:"head",singleton:!1});const F=K.Z.locals||{};t(11125);var N,V=t(92e3),q=(t(27793),t(60331));function B(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function T(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?B(Object(t),!0).forEach((function(e){(0,k.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):B(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}S().bind(F),Z.Z.Option;var W,A=(0,_.connect)((function(n){return{global:n.global,addMember:n.addMember}}))(N=function(n){(0,h.Z)(r,n);var e,t,a=(e=r,t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,a=(0,y.Z)(e);if(t){var r=(0,y.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,v.Z)(this,n)});function r(n){var e;return(0,p.Z)(this,r),e=a.call(this,n),(0,k.Z)((0,m.Z)(e),"onCancel",(function(){})),e.state={},e.columns=[{title:"序号",key:"id",width:200,textWrap:"word-break",ellipsis:!0,render:function(n,e,t){return w.createElement(w.Fragment,null,w.createElement("span",null,t+1))}},{title:"账号",dataIndex:"username",width:200,textWrap:"word-break",ellipsis:!0,key:"username"},{title:"姓名",dataIndex:"nickName",key:"nickName",width:200,textWrap:"word-break",ellipsis:!0},{title:"手机号",dataIndex:"phoneNumber",key:"phoneNumber",width:200,textWrap:"word-break",ellipsis:!0},{title:"邮箱",dataIndex:"emailAddress",key:"emailAddress",width:200,textWrap:"word-break",ellipsis:!0},{title:"角色",dataIndex:"roles",key:"roles",textWrap:"word-break",ellipsis:!0,render:function(n,e){return w.createElement(w.Fragment,null,(n||[]).map((function(n){return w.createElement(q.Z,{color:"magenta",key:null==n?void 0:n.id},null==n?void 0:n.roleName)})))}}],e}return(0,b.Z)(r,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var n=this.props,e=n.dataSource,t=n.rowSelection,a=n.handlePageChange,r=n.selectedRowKeys;return w.createElement(V.Z,{rowSelection:T(T({type:"checkbox"},t),{},{selectedRowKeys:r}),rowKey:"id",size:"small",scroll:{x:!0},dataSource:e.data,columns:this.columns,pagination:{pageSize:null==e?void 0:e.pageSize,total:null==e?void 0:e.total,current:null==e?void 0:e.current,onChange:a}})}}]),r}(w.Component))||N;S().bind(F),Z.Z.Option;var H,G,Y=(0,_.connect)((function(n){return{global:n.global,addMember:n.addMember}}))(W=function(n){(0,h.Z)(r,n);var e,t,a=(e=r,t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,a=(0,y.Z)(e);if(t){var r=(0,y.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,v.Z)(this,n)});function r(n){var e;return(0,p.Z)(this,r),e=a.call(this,n),(0,k.Z)((0,m.Z)(e),"searchUserists",(function(){var n=e.props,t=n.dispatch;n.tenantId,t({type:"organManage/getOrganUserList",opt:{tenantId:sessionStorage.getItem("tenantId"),currentPage:e.state.organUserList.current,pageSize:10},callback:function(n){var t,a,r,o,l=e.state.organUserList;l.total=null==n||null===(t=n.data)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.totalCount,l.data=null==n||null===(r=n.data)||void 0===r||null===(o=r.data)||void 0===o?void 0:o.list,e.setState({organUserList:l})}})})),(0,k.Z)((0,m.Z)(e),"handlePageChange",(function(n){var t=e.state.organUserList;t.current=n,e.setState({organUserList:t}),e.searchUserists()})),e.state={organUserList:[],selectedKeys:[]},e}return(0,b.Z)(r,[{key:"componentDidMount",value:function(){this.searchUserists()}},{key:"render",value:function(){var n=this,e=this.props,t=e.visible,a=e.onCancel,r=e.submitMap,o=e.selectedItem,c=this.state,s=c.organUserList,d=c.selectedRowKeys,f=(c.selectedRows,{onChange:function(e,t){n.setState({selectedRowKeys:e,selectedRows:t})}});return w.createElement(u.Z,{visible:t,title:"添加组员",onCancel:a,width:800,destroyOnClose:!0,onOk:function(n){r(d)}},w.createElement(l.Z.Item,{label:"机构名称"},w.createElement(i.Z,{style:{width:"100px",border:"none",backgroundColor:"#fff",color:"#000"},disabled:!0,value:null==o?void 0:o.organizationName})),w.createElement(A,{rowSelection:f,dataSource:s,handlePageChange:this.handlePageChange}))}}]),r}(w.Component))||W;function $(n,e){var t=Object.keys(n);if(Object.getOwnPropertySymbols){var a=Object.getOwnPropertySymbols(n);e&&(a=a.filter((function(e){return Object.getOwnPropertyDescriptor(n,e).enumerable}))),t.push.apply(t,a)}return t}function J(n){for(var e=1;e<arguments.length;e++){var t=null!=arguments[e]?arguments[e]:{};e%2?$(Object(t),!0).forEach((function(e){(0,k.Z)(n,e,t[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(n,Object.getOwnPropertyDescriptors(t)):$(Object(t)).forEach((function(e){Object.defineProperty(n,e,Object.getOwnPropertyDescriptor(t,e))}))}return n}var Q=S().bind(z),X=(Z.Z.Option,{labelCol:{xs:{span:24},sm:{span:5}},wrapperCol:{xs:{span:24},sm:{span:16}}}),nn=(H=(0,_.connect)((function(n){var e=n.loading,t=n.organManage;return J({loading:e,userInfo:n.global.userInfo,busy:e.effects["organManage/getOrganLists"]||e.effects["organManage/createOrgan"]||e.effects["organManage/getOrganInfo"]||e.effects["organManage/modifyOrganInfo"]||e.effects["organManage/deleteOrgan"]||e.effects["organManage/getOrganUserList"]||e.effects["organManage/addOrganUser"]||e.effects["organManage/deleteOrganUser"]||!1},t)})),H(G=function(n){(0,h.Z)(x,n);var e,t,Z=(e=x,t=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(n){return!1}}(),function(){var n,a=(0,y.Z)(e);if(t){var r=(0,y.Z)(this).constructor;n=Reflect.construct(a,arguments,r)}else n=a.apply(this,arguments);return(0,v.Z)(this,n)});function x(n){var e;return(0,p.Z)(this,x),e=Z.call(this,n),(0,k.Z)((0,m.Z)(e),"searchFormRef",w.createRef()),(0,k.Z)((0,m.Z)(e),"myRef",w.createRef()),(0,k.Z)((0,m.Z)(e),"onReset",(function(){e.searchFormRef.current.resetFields(),e.searchUserists()})),(0,k.Z)((0,m.Z)(e),"getOrganLists",(function(){var n=e.props.dispatch;console.log("this.state.page::::::::",e.state.page),n({type:"organManage/getOrganLists",opt:{tenantId:e.state.tenantId,currentPage:e.state.page,pageSize:1e5},callback:function(n){var t,a,r,o,l,i,c,s,d,u,f;e.setState({organList:null==n||null===(t=n.data)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.list,total:null==n||null===(r=n.data)||void 0===r||null===(o=r.data)||void 0===o?void 0:o.totalCount,selectedKeys:[null==n||null===(l=n.data)||void 0===l||null===(i=l.data)||void 0===i||null===(c=i.list)||void 0===c||null===(s=c[0])||void 0===s?void 0:s.id],selectedItem:null==n||null===(d=n.data)||void 0===d||null===(u=d.data)||void 0===u||null===(f=u.list)||void 0===f?void 0:f[0]}),e.searchUserists()}})})),(0,k.Z)((0,m.Z)(e),"searchUserists",(function(){var n=e.props.dispatch,t=e.state,a=t.tenantId,r=t.selectedKeys,o=t.organUserList;console.log('organUserList["current"]::',o.current),r[0]&&n({type:"organManage/getOrganUserList",opt:J({tenantId:a,organizationId:r[0],currentPage:o.current,pageSize:o.pageSize},e.searchFormRef.current.getFieldsValue()),callback:function(n){var t,a,r,o,l,i,c,s,d,u,f=e.state.organUserList;f.total=null==n||null===(t=n.data)||void 0===t||null===(a=t.data)||void 0===a?void 0:a.totalCount,f.data=null==n||null===(r=n.data)||void 0===r||null===(o=r.data)||void 0===o?void 0:o.list,f.current=null==n||null===(l=n.data)||void 0===l||null===(i=l.data)||void 0===i||null===(c=i.pagination)||void 0===c?void 0:c.currentPage,f.pageSize=null==n||null===(s=n.data)||void 0===s||null===(d=s.data)||void 0===d||null===(u=d.pagination)||void 0===u?void 0:u.pageSize,e.setState({organUserList:f})}})})),(0,k.Z)((0,m.Z)(e),"handlePageChange",(function(n){var t=e.state.organUserList;t.current=n,e.setState({organUserList:t},(function(){e.searchUserists()}))})),(0,k.Z)((0,m.Z)(e),"createOrgan",(function(n){var t;e.setState((t={isEditOrgan:"edit"==n},(0,k.Z)(t,"isEditOrgan","edit"==n),(0,k.Z)(t,"createVisible",!0),t))})),(0,k.Z)((0,m.Z)(e),"handleSubmit",function(){var n=(0,g.Z)(O().mark((function n(t){var a,r,o,l,i,c;return O().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:if(a=e.props.dispatch,r=e.state.isEditOrgan,o=t.organizationName,l=t.remark,i=t.parentID,c=t.organizationId,w.Fragment,r){n.next=10;break}return n.next=7,a({type:"organManage/createOrgan",opt:{organizationName:o,tenantId:e.state.tenantId,parentOrganizationId:i||0,parentOrganizationCode:"root",organizationParants:"",organizationDesc:{remark:l}},callback:function(n){var t,a;200==(null==n||null===(t=n.data)||void 0===t?void 0:t.status)?(f.ZP.success("创建机构成功"),e.handleCancel(),e.getOrganLists()):f.ZP.error((null==n||null===(a=n.data)||void 0===a?void 0:a.message)||"创建机构失败!")}});case 7:n.sent,n.next=13;break;case 10:return n.next=12,a({type:"organManage/modifyOrganInfo",opt:{organizationName:o,tenantId:e.state.tenantId,parentOrganizationId:i||0,parentOrganizationCode:"root",organizationParants:"",id:c,organizationDesc:{remark:l}},callback:function(n){var t;200==n.data.status?(f.ZP.success("修改机构成功"),e.handleCancel(),e.getOrganLists()):f.ZP.error((null==n||null===(t=n.data)||void 0===t?void 0:t.message)||"修改机构失败!")}});case 12:n.sent;case 13:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()),(0,k.Z)((0,m.Z)(e),"deleteOrgan",(function(n){console.log("aaa",n),(0,e.props.dispatch)({type:"organManage/deleteOrgan",opt:{tenantId:e.state.tenantId,organizationId:n},callback:function(n){var t,a;200==(null==n||null===(t=n.data)||void 0===t?void 0:t.status)?(f.ZP.success("删除成功!"),e.handleCancel(),e.getOrganLists()):(f.ZP.error((null==n||null===(a=n.data)||void 0===a?void 0:a.message)||"删除失败!"),e.handleCancel())}})})),(0,k.Z)((0,m.Z)(e),"editOrgan",(function(){e.createOrgan("edit")})),(0,k.Z)((0,m.Z)(e),"showAddMemberModal",(function(){e.setState({addMemberVisible:!0})})),(0,k.Z)((0,m.Z)(e),"addOrganMember",(function(n){var t;(0,e.props.dispatch)({type:"organManage/addOrganUser",opt:{tenantId:e.state.tenantId,organizationId:null===(t=e.state.selectedKeys)||void 0===t?void 0:t[0],userIds:n},callback:function(n){var t,a;200==(null==n||null===(t=n.data)||void 0===t?void 0:t.status)?(f.ZP.success("添加成功!"),e.handleCancel(),e.searchUserists()):f.ZP.error((null==n||null===(a=n.data)||void 0===a?void 0:a.message)||"添加失败!")}})})),(0,k.Z)((0,m.Z)(e),"handleCancel",(function(){e.setState({createVisible:!1,detailVisible:!1,deleteVisible:!1,addMemberVisible:!1,currentDetailData:{}})})),(0,k.Z)((0,m.Z)(e),"handleDel",(function(n){var t,a=e.props.dispatch,r=e.state,o=r.selectedRows,l=r.selectedRowKeys,i=r.selectedKeys,c=r.tenantId,s=w.createElement(w.Fragment,null,o.map((function(n,e){return w.createElement("span",{key:e},n.username," ")})));o&&o.length>0?u.Z.confirm({title:"请确认删除信息!",content:s,onOk:(t=(0,g.Z)(O().mark((function n(){var t;return O().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,a({type:"organManage/deleteOrganUser",opt:{tenantId:c,userIds:l,organizationId:null==i?void 0:i[0]},callback:function(){var n;200==(null==t?void 0:t.data.status)?(f.ZP.success("删除成功!"),e.setState({selectedRowKeys:[],selectedRows:[]},(function(){e.searchUserists()}))):(f.ZP.error((null==t||null===(n=t.data)||void 0===n?void 0:n.message)||"删除失败!"),e.handleCancel())}});case 2:t=n.sent;case 3:case"end":return n.stop()}}),n)}))),function(){return t.apply(this,arguments)})}):f.ZP.error("请选择要删除的成员!")})),(0,k.Z)((0,m.Z)(e),"showDetailModal",function(){var n=(0,g.Z)(O().mark((function n(t){var a;return O().wrap((function(n){for(;;)switch(n.prev=n.next){case 0:return a=e.props.dispatch,n.next=3,a({type:"organManage/getOrganInfo",opt:{organizationId:t.id},callback:function(n){var t;e.setState({detailVisible:!0,currentDetailData:null==n||null===(t=n.data)||void 0===t?void 0:t.data})}});case 3:n.sent;case 4:case"end":return n.stop()}}),n)})));return function(e){return n.apply(this,arguments)}}()),(0,k.Z)((0,m.Z)(e),"handleDetailSubmit",(function(){e.handleCancel()})),(0,k.Z)((0,m.Z)(e),"onExpand",(function(n){e.setState({expandedKeys:n,autoExpandParent:!1})})),(0,k.Z)((0,m.Z)(e),"onCheck",(function(n){e.setState({checkedKeys:n})})),(0,k.Z)((0,m.Z)(e),"onSelect",(function(n,t){console.log(e.state.organUserList),console.log("selectedKeys",e.state.selectedKeys,e.state.selectedItem,e.state.selectedRows),e.setState({selectedKeys:n,selectedItem:t.node,selectedRows:[],selectedRowKeys:[]},(function(){e.state.organUserList.current=1,e.searchUserists()}))})),e.state={tenantId:"",isDeatil:!1,organList:[],page:1,total:"",createVisible:!1,isEditOrgan:!1,currentDetailData:{},selectedRowKeys:[],selectedRows:[],detailVisible:!1,addMemberVisible:!1,expandedKeys:[],checkedKeys:[],selectedKeys:[],selectedItem:[],autoExpandParent:!0,organUserList:{total:0,current:1,pageSize:10,data:[]}},e}return(0,b.Z)(x,[{key:"componentDidMount",value:function(){var n=this;this.searchFormRef.current.setFieldsValue({}),this.setState({tenantId:sessionStorage.getItem("tenantId")},(function(){n.getOrganLists()}))}},{key:"onRef",value:function(n){this.CreateModal=n}},{key:"render",value:function(){var n=this,e=this.state,t=e.tenantId,u=e.organList,f=e.organUserList,g=e.createVisible,p=e.isEditOrgan,b=e.addMemberVisible,m=(e.currentDetailData,e.selectedItem),h=e.selectedRowKeys,v=e.expandedKeys,y=e.checkedKeys,k=e.selectedKeys,Z=e.autoExpandParent,x=(this.props.busy,{onChange:function(e,t){n.setState({selectedRowKeys:e,selectedRows:t})}});return w.createElement("div",{className:Q("organManage")},w.createElement(r.Z,{title:"机构管理",extra:w.createElement(w.Fragment,null,w.createElement(d.Z,{className:Q("organizationBtn"),type:"primary",onClick:this.createOrgan},"创建机构"),w.createElement(d.Z,{className:Q("organizationBtn"),style:{marginLeft:"8px"},type:"primary",onClick:this.editOrgan},"编辑机构"))},w.createElement(a.Z,null,w.createElement(c.Z,{span:6},w.createElement("div",{className:Q("organizationTreeCard")},w.createElement(s.Z,{onExpand:this.onExpand,expandedKeys:v,autoExpandParent:Z,onCheck:this.onCheck,checkedKeys:y,onSelect:this.onSelect,selectedKeys:k,treeData:(0,M.wf)(u,"organizationName","parentOrganizationId")}))),w.createElement(c.Z,{span:18,style:{borderLeft:"1px solid #c4bcbc"}},w.createElement("div",{className:Q("table-box")},w.createElement(r.Z,{extra:w.createElement(l.Z,(0,o.Z)({},X,{ref:this.searchFormRef,layout:"inline",name:"control-ref",onFinish:this.searchUserists}),w.createElement(l.Z.Item,{name:"nickName",label:"姓名"},w.createElement(i.Z,{style:{width:"120px"}})),w.createElement(l.Z.Item,{name:"phoneNumber",label:"手机号"},w.createElement(i.Z,{style:{width:"170px"}})),w.createElement(d.Z,{type:"primary",htmlType:"submit"},"查询"),w.createElement(d.Z,{htmlType:"button",style:{marginLeft:"8px"},onClick:this.onReset},"清空"),w.createElement(d.Z,{className:Q("organizationBtn"),style:{marginLeft:"8px"},type:"primary",danger:!0,onClick:this.handleDel},"批量删除"),w.createElement(d.Z,{className:Q("organizationBtn"),style:{marginLeft:"8px"},type:"primary",onClick:this.showAddMemberModal},"添加成员"))},w.createElement(A,{selectedRowKeys:h,rowSelection:x,dataSource:f,handlePageChange:this.handlePageChange,searchUserists:this.searchUserists})))))),w.createElement(U,{ref:this.myRef,visible:g,isEditOrgan:p,submitMap:this.handleSubmit,onCancel:this.handleCancel,deleteOrgan:this.deleteOrgan,dataList:u,_this:this}),w.createElement(Y,{tenantId:t,visible:b,submitMap:this.addOrganMember,selectedItem:m,onCancel:this.handleCancel}))}}]),x}(w.Component))||G)},90751:(n,e,t)=>{t.d(e,{Z:()=>o});var a=t(23645),r=t.n(a)()((function(n){return n[1]}));r.push([n.id,"/* stylelint-disable at-rule-empty-line-before,at-rule-name-space-after,at-rule-no-unknown */\n/* stylelint-disable no-duplicate-selectors */\n/* stylelint-disable */\n/* stylelint-disable declaration-bang-space-before,no-duplicate-selectors,string-no-newline */\n.ant-tag {\n  box-sizing: border-box;\n  margin: 0;\n  padding: 0;\n  color: rgba(0, 0, 0, 0.85);\n  font-size: 14px;\n  font-variant: tabular-nums;\n  line-height: 1.5715;\n  list-style: none;\n  font-feature-settings: 'tnum';\n  display: inline-block;\n  height: auto;\n  margin-right: 8px;\n  padding: 0 7px;\n  font-size: 12px;\n  line-height: 20px;\n  white-space: nowrap;\n  background: #fafafa;\n  border: 1px solid #d9d9d9;\n  border-radius: 2px;\n  opacity: 1;\n  transition: all 0.3s;\n}\n.ant-tag,\n.ant-tag a,\n.ant-tag a:hover {\n  color: rgba(0, 0, 0, 0.85);\n}\n.ant-tag > a:first-child:last-child {\n  display: inline-block;\n  margin: 0 -8px;\n  padding: 0 8px;\n}\n.ant-tag-close-icon {\n  margin-left: 3px;\n  color: rgba(0, 0, 0, 0.45);\n  font-size: 10px;\n  cursor: pointer;\n  transition: all 0.3s;\n}\n.ant-tag-close-icon:hover {\n  color: rgba(0, 0, 0, 0.85);\n}\n.ant-tag-has-color {\n  border-color: transparent;\n}\n.ant-tag-has-color,\n.ant-tag-has-color a,\n.ant-tag-has-color a:hover,\n.ant-tag-has-color .anticon-close,\n.ant-tag-has-color .anticon-close:hover {\n  color: #fff;\n}\n.ant-tag-checkable {\n  background-color: transparent;\n  border-color: transparent;\n  cursor: pointer;\n}\n.ant-tag-checkable:not(.ant-tag-checkable-checked):hover {\n  color: #1890ff;\n}\n.ant-tag-checkable:active,\n.ant-tag-checkable-checked {\n  color: #fff;\n}\n.ant-tag-checkable-checked {\n  background-color: #1890ff;\n}\n.ant-tag-checkable:active {\n  background-color: #096dd9;\n}\n.ant-tag-hidden {\n  display: none;\n}\n.ant-tag-pink {\n  color: #c41d7f;\n  background: #fff0f6;\n  border-color: #ffadd2;\n}\n.ant-tag-pink-inverse {\n  color: #fff;\n  background: #eb2f96;\n  border-color: #eb2f96;\n}\n.ant-tag-magenta {\n  color: #c41d7f;\n  background: #fff0f6;\n  border-color: #ffadd2;\n}\n.ant-tag-magenta-inverse {\n  color: #fff;\n  background: #eb2f96;\n  border-color: #eb2f96;\n}\n.ant-tag-red {\n  color: #cf1322;\n  background: #fff1f0;\n  border-color: #ffa39e;\n}\n.ant-tag-red-inverse {\n  color: #fff;\n  background: #f5222d;\n  border-color: #f5222d;\n}\n.ant-tag-volcano {\n  color: #d4380d;\n  background: #fff2e8;\n  border-color: #ffbb96;\n}\n.ant-tag-volcano-inverse {\n  color: #fff;\n  background: #fa541c;\n  border-color: #fa541c;\n}\n.ant-tag-orange {\n  color: #d46b08;\n  background: #fff7e6;\n  border-color: #ffd591;\n}\n.ant-tag-orange-inverse {\n  color: #fff;\n  background: #fa8c16;\n  border-color: #fa8c16;\n}\n.ant-tag-yellow {\n  color: #d4b106;\n  background: #feffe6;\n  border-color: #fffb8f;\n}\n.ant-tag-yellow-inverse {\n  color: #fff;\n  background: #fadb14;\n  border-color: #fadb14;\n}\n.ant-tag-gold {\n  color: #d48806;\n  background: #fffbe6;\n  border-color: #ffe58f;\n}\n.ant-tag-gold-inverse {\n  color: #fff;\n  background: #faad14;\n  border-color: #faad14;\n}\n.ant-tag-cyan {\n  color: #08979c;\n  background: #e6fffb;\n  border-color: #87e8de;\n}\n.ant-tag-cyan-inverse {\n  color: #fff;\n  background: #13c2c2;\n  border-color: #13c2c2;\n}\n.ant-tag-lime {\n  color: #7cb305;\n  background: #fcffe6;\n  border-color: #eaff8f;\n}\n.ant-tag-lime-inverse {\n  color: #fff;\n  background: #a0d911;\n  border-color: #a0d911;\n}\n.ant-tag-green {\n  color: #389e0d;\n  background: #f6ffed;\n  border-color: #b7eb8f;\n}\n.ant-tag-green-inverse {\n  color: #fff;\n  background: #52c41a;\n  border-color: #52c41a;\n}\n.ant-tag-blue {\n  color: #096dd9;\n  background: #e6f7ff;\n  border-color: #91d5ff;\n}\n.ant-tag-blue-inverse {\n  color: #fff;\n  background: #1890ff;\n  border-color: #1890ff;\n}\n.ant-tag-geekblue {\n  color: #1d39c4;\n  background: #f0f5ff;\n  border-color: #adc6ff;\n}\n.ant-tag-geekblue-inverse {\n  color: #fff;\n  background: #2f54eb;\n  border-color: #2f54eb;\n}\n.ant-tag-purple {\n  color: #531dab;\n  background: #f9f0ff;\n  border-color: #d3adf7;\n}\n.ant-tag-purple-inverse {\n  color: #fff;\n  background: #722ed1;\n  border-color: #722ed1;\n}\n.ant-tag-success {\n  color: #52c41a;\n  background: #f6ffed;\n  border-color: #b7eb8f;\n}\n.ant-tag-processing {\n  color: #1890ff;\n  background: #e6f7ff;\n  border-color: #91d5ff;\n}\n.ant-tag-error {\n  color: #f5222d;\n  background: #fff1f0;\n  border-color: #ffa39e;\n}\n.ant-tag-warning {\n  color: #fa8c16;\n  background: #fff7e6;\n  border-color: #ffd591;\n}\n.ant-tag > .anticon + span,\n.ant-tag > span + .anticon {\n  margin-left: 7px;\n}\n.ant-tag.ant-tag-rtl {\n  margin-right: 0;\n  margin-left: 8px;\n  direction: rtl;\n  text-align: right;\n}\n.ant-tag-rtl .ant-tag-close-icon {\n  margin-right: 3px;\n  margin-left: 0;\n}\n.ant-tag-rtl.ant-tag > .anticon + span,\n.ant-tag-rtl.ant-tag > span + .anticon {\n  margin-right: 7px;\n  margin-left: 0;\n}\n",""]);const o=r},23500:(n,e,t)=>{t.d(e,{Z:()=>o});var a=t(23645),r=t.n(a)()((function(n){return n[1]}));r.push([n.id,'html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n  font-family: "微软雅黑", "Arial", "华文细黑", "STHeiti", "MingLiu";\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \'\';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\na {\n  color: #000;\n  text-decoration: none;\n}\na:hover {\n  color: #000;\n  text-decoration: none;\n}\n::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n::-webkit-scrollbar-thumb {\n  background-color: #aaa;\n  border-radius: 10px;\n}\n#root {\n  height: 100%;\n}\n.box {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  min-height: 92vh;\n  background-color: #f0f2f5;\n}\n.organManage :global .ant-card {\n  margin: 20px;\n  border-radius: 7px;\n}\n.organizationLists .organizationBtn {\n  margin-left: 10px;\n  margin-bottom: 20px;\n}\n.searchForm .ant-form-inline .ant-form-item {\n  width: 260px;\n}\n.table-box :global .ant-card {\n  width: 100%;\n}\n.organizationTreeCard :global .ant-tree-treenode {\n  width: 100%;\n  overflow: hidden;\n}\n',""]);const o=r},34007:(n,e,t)=>{t.d(e,{Z:()=>o});var a=t(23645),r=t.n(a)()((function(n){return n[1]}));r.push([n.id,'html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n  font-family: "微软雅黑", "Arial", "华文细黑", "STHeiti", "MingLiu";\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \'\';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\na {\n  color: #000;\n  text-decoration: none;\n}\na:hover {\n  color: #000;\n  text-decoration: none;\n}\n::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n::-webkit-scrollbar-thumb {\n  background-color: #aaa;\n  border-radius: 10px;\n}\n#index-module__root___2tTWH {\n  height: 100%;\n}\n.index-module__box___10hc_ {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  min-height: 92vh;\n  background-color: #f0f2f5;\n}\n.index-module__organManage___1gkLj .ant-card {\n  margin: 20px;\n  border-radius: 7px;\n}\n.index-module__organizationLists___3B2u3 .index-module__organizationBtn___1BbhV {\n  margin-left: 10px;\n  margin-bottom: 20px;\n}\n.index-module__searchForm___3fGWC .index-module__ant-form-inline___G04oF .index-module__ant-form-item___BcGYi {\n  width: 260px;\n}\n.index-module__table-box___1MjyR .ant-card {\n  width: 100%;\n}\n.index-module__organizationTreeCard___3fUAb .ant-tree-treenode {\n  width: 100%;\n  overflow: hidden;\n}\n',""]),r.locals={root:"index-module__root___2tTWH",box:"index-module__box___10hc_",organManage:"index-module__organManage___1gkLj",organizationLists:"index-module__organizationLists___3B2u3",organizationBtn:"index-module__organizationBtn___1BbhV",searchForm:"index-module__searchForm___3fGWC","ant-form-inline":"index-module__ant-form-inline___G04oF","ant-form-item":"index-module__ant-form-item___BcGYi","table-box":"index-module__table-box___1MjyR",organizationTreeCard:"index-module__organizationTreeCard___3fUAb"};const o=r}}]);