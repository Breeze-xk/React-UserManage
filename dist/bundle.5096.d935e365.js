"use strict";(self.webpackChunkt_zero_user_operation_frontend=self.webpackChunkt_zero_user_operation_frontend||[]).push([[5096],{75096:(e,t,n)=>{n.r(t),n.d(t,{default:()=>W}),n(45654);var r=n(39144),a=(n(90562),n(71230)),o=(n(62194),n(15746)),l=(n(56931),n(91665)),i=(n(58645),n(71577)),s=(n(47610),n(55026)),c=n(15861),d=n(15671),u=n(43144),p=n(97326),m=n(79340),f=n(82963),h=n(61120),b=n(4942),v=(n(21384),n(16317)),y=n(87757),g=n.n(y),_=n(67294),Z=n(55609),x=n(93379),P=n.n(x),k=n(32005);P()(k.Z,{insert:"head",singleton:!1});const R=k.Z.locals||{};var E=n(47166),I=n.n(E),w=(n(5582),n(30944)),C=(n(95352),n(37614)),O=n(87462),S=(n(10534),n(20924)),K=(n(16458),n(12010)),L=(n(24713),n(82482)),D=n(29439);function j(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function V(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?j(Object(n),!0).forEach((function(t){(0,b.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):j(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}const M=function(e){var t=e.visible,n=e.submitMap,r=e.delRole,a=e.onCancel,o=e.isEditRole,l=e._this,d=e.dataList,u=L.Z.useForm(),p=(0,D.Z)(u,1)[0],m={},f=_.useState(""),h=(0,D.Z)(f,2),b=h[0],v=h[1],y=function(){var e=(0,c.Z)(g().mark((function e(t){var n;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!o){e.next=7;break}return n=l.props.dispatch,e.next=4,n({type:"roleManage/getRoleInfo",opt:{roleId:t},callback:function(e){var t,n,r,a,o=V({remark:null==e||null===(t=e.data)||void 0===t||null===(n=t.data)||void 0===n||null===(r=n.roleDesc)||void 0===r?void 0:r.remark},null==e||null===(a=e.data)||void 0===a?void 0:a.data);v(o.id),p.setFieldsValue(o)}});case 4:e.sent,e.next=8;break;case 7:return e.abrupt("return");case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),Z=function(){var e=(0,c.Z)(g().mark((function e(t,n){return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:(0,w.xb)(null==n?void 0:n.parentRoleId)||o||(s.ZP.error("请选择一级角色!"),p.setFieldsValue({parentID:""}));case 1:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),x=function(){p.resetFields(),p.setFieldsValue({}),a()};p.setFieldsValue(m);var P=[_.createElement(i.Z,{onClick:x},"取消"),_.createElement(i.Z,{key:"submit",type:"primary",onClick:function(){p.validateFields().then((function(e){p.setFieldsValue(V({roleDesc:{remark:e.remark},roleId:b},e)),p.resetFields(),console.log(V({roleDesc:{remark:e.remark},roleId:b},e)),n(V({roleDesc:{remark:e.remark},roleId:b},e))})).catch((function(e){console.log("校验失败:",e)}))}},"确认")];return o&&2==P.length?P.push(_.createElement(i.Z,{type:"danger",onClick:function(){r(b),p.resetFields()}},"删除")):o||3!=P.length||P.pop(),_.createElement(C.Z,{visible:t,title:o?"编辑角色":"新建角色",onCancel:x,destroyOnClose:!0,footer:P},_.createElement(L.Z,(0,O.Z)({form:p},{labelCol:{span:5},wrapperCol:{span:18}},{name:"createRole",initialValues:m}),_.createElement(L.Z.Item,{help:o?"选择角色":"不选就是一级角色",label:o?"选择角色":"选择父级角色",placeholder:"选择父级角色",name:"parentID",rules:[{required:!1,message:"请选择角色"}]},_.createElement(K.Z,{style:{width:"100%"},dropdownStyle:{maxHeight:400,overflow:"auto"},treeData:(0,w.wf)(d,"roleName","parentRoleId"),placeholder:"Please select",showSearch:!0,allowClear:!0,onChange:y,onSelect:Z})),_.createElement(L.Z.Item,{label:"角色名称",name:"roleName",rules:[{required:!0,message:"请输入角色名称"}]},_.createElement(S.Z,{placeholder:"请输入角色名称"})),_.createElement(L.Z.Item,{label:"备注",name:"remark"},_.createElement(S.Z,{placeholder:"请输入角色备注"}))))};n(11125);var N,F=n(92e3);function B(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function q(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?B(Object(n),!0).forEach((function(t){(0,b.Z)(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):B(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}I().bind(R),v.Z.Option,(0,Z.connect)((function(e){return{global:e.global,addMember:e.addMember}}))(function(e){(0,m.Z)(a,e);var t,n,r=(t=a,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,h.Z)(t);if(n){var a=(0,h.Z)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,f.Z)(this,e)});function a(e){var t;return(0,d.Z)(this,a),t=r.call(this,e),(0,b.Z)((0,p.Z)(t),"onCancel",(function(){})),t.state={},t.columns=[{title:"序号",key:"id",width:200,textWrap:"word-break",ellipsis:!0,render:function(e,t,n){return _.createElement(_.Fragment,null,_.createElement("span",null,n+1))}},{title:"权限名称",dataIndex:"permissionName",width:200,textWrap:"word-break",ellipsis:!0,key:"permissionName"},{title:"权限Code",dataIndex:"permissionCode",key:"permissionCode",width:200,textWrap:"word-break",ellipsis:!0}],t}return(0,u.Z)(a,[{key:"componentDidMount",value:function(){}},{key:"render",value:function(){var e=this.props,t=e.dataSource,n=e.rowSelection,r=e.handlePageChange,a=e.selectedRowKeys;return _.createElement(F.Z,{rowSelection:q({type:"checkbox",selectedRowKeys:a},n),rowKey:"id",scroll:{x:!0},dataSource:t.data,columns:this.columns,pagination:{pageSize:null==t?void 0:t.pageSize,total:null==t?void 0:t.total,onChange:r}})}}]),a}(_.Component));var z=I().bind(R),W=(v.Z.Option,(0,Z.connect)((function(e){return{global:e.global,roleManage:e.roleManage}}))(N=function(e){(0,m.Z)(y,e);var t,n,v=(t=y,n=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1;if(Reflect.construct.sham)return!1;if("function"==typeof Proxy)return!0;try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,r=(0,h.Z)(t);if(n){var a=(0,h.Z)(this).constructor;e=Reflect.construct(r,arguments,a)}else e=r.apply(this,arguments);return(0,f.Z)(this,e)});function y(e){var t,n;return(0,d.Z)(this,y),n=v.call(this,e),(0,b.Z)((0,p.Z)(n),"searchFormRef",_.createRef()),(0,b.Z)((0,p.Z)(n),"formRef",_.createRef()),(0,b.Z)((0,p.Z)(n),"onReset",(function(){n.searchFormRef.current.resetFields()})),(0,b.Z)((0,p.Z)(n),"getRoleLists",(function(){(0,n.props.dispatch)({type:"roleManage/getRoleLists",opt:{tenantId:n.state.tenantId,currentPage:n.state.page,pageSize:1e5},callback:function(e){var t,r,a,o,l,i,s,c,d,u,p;n.setState({roleList:null==e||null===(t=e.data)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.list,total:null==e||null===(a=e.data)||void 0===a||null===(o=a.data)||void 0===o?void 0:o.totalCount,selectedKeys:[null==e||null===(l=e.data)||void 0===l||null===(i=l.data)||void 0===i||null===(s=i.list)||void 0===s||null===(c=s[0])||void 0===c?void 0:c.id],selectedItem:null==e||null===(d=e.data)||void 0===d||null===(u=d.data)||void 0===u||null===(p=u.list)||void 0===p?void 0:p[0]}),n.searchPermissionList()}})})),(0,b.Z)((0,p.Z)(n),"searchPermissionList",(function(){var e=n.props.dispatch,t=n.state,r=t.tenantId,a=t.selectedKeys,o=t.permissionList;a[0]&&e({type:"roleManage/getPermissionList",opt:{tenantId:r,roleId:a[0],currentPage:o.current,pageSize:1e3},callback:function(e){var t,r,a,o,l=n.state.permissionList;l.total=null==e||null===(t=e.data)||void 0===t||null===(r=t.data)||void 0===r?void 0:r.totalCount,l.data=null==e||null===(a=e.data)||void 0===a||null===(o=a.data)||void 0===o?void 0:o.list;var i=[];l.data.map((function(e){e.relId&&i.push(e.id)})),n.setState({permissionList:l,selectedRowKeys:[],checkedKeysPer:i})}})})),(0,b.Z)((0,p.Z)(n),"handlePageChange",(function(e){var t=n.state.permissionList;t.current=e,n.setState({permissionList:t}),n.searchPermissionList()})),(0,b.Z)((0,p.Z)(n),"createRole",(function(e){n.setState({isEditRole:"edit"==e,createVisible:!0})})),(0,b.Z)((0,p.Z)(n),"handleSubmit",function(){var e=(0,c.Z)(g().mark((function e(t){var r,a,o,l,i,c;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(r=n.props.dispatch,a=n.state.isEditRole,o=t.roleName,l=t.remark,i=t.parentID,c=t.roleId,_.Fragment,a){e.next=10;break}return e.next=7,r({type:"roleManage/createRole",opt:{roleName:o,tenantId:n.state.tenantId,parentRoleId:i||0,RoleParants:"",roleDesc:{remark:l}},callback:function(e){var t,r;200==(null==e||null===(t=e.data)||void 0===t?void 0:t.status)?(s.ZP.success("创建角色成功"),n.handleCancel(),n.getRoleLists()):s.ZP.error((null==e||null===(r=e.data)||void 0===r?void 0:r.message)||"创建角色失败!")}});case 7:e.sent,e.next=13;break;case 10:return e.next=12,r({type:"roleManage/modifyRoleInfo",opt:{roleName:o,tenantId:n.state.tenantId,parentRoleId:i||0,roleParants:"",id:c,roleDesc:{remark:l}},callback:function(e){var t,r;200==(null==e||null===(t=e.data)||void 0===t?void 0:t.status)?(s.ZP.success("修改角色成功"),n.handleCancel(),n.getRoleLists()):s.ZP.error((null==e||null===(r=e.data)||void 0===r?void 0:r.message)||"修改角色失败!")}});case 12:e.sent;case 13:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}()),(0,b.Z)((0,p.Z)(n),"delRole",(function(e){(0,n.props.dispatch)({type:"roleManage/delRole",opt:{tenantId:n.state.tenantId,roleId:e},callback:function(e){var t;200==(null==e?void 0:e.data.status)?(s.ZP.success("删除成功!"),n.handleCancel(),n.getRoleLists()):s.ZP.error((null==e||null===(t=e.data)||void 0===t?void 0:t.message)||"删除失败!")}})})),(0,b.Z)((0,p.Z)(n),"editRole",(function(){n.createRole("edit")})),(0,b.Z)((0,p.Z)(n),"showAddPermissionModal",(function(){})),(0,b.Z)((0,p.Z)(n),"addRolePermission",(function(e){})),(0,b.Z)((0,p.Z)(n),"handleCancel",(function(){n.setState({createVisible:!1,detailVisible:!1,deleteVisible:!1,addRoleVisible:!1,addPermissionVisible:!1,currentDetailData:{}})})),(0,b.Z)((0,p.Z)(n),"handleDetailSubmit",(function(){n.handleCancel()})),(0,b.Z)((0,p.Z)(n),"onExpand",(function(e){n.setState({expandedKeys:e,autoExpandParent:!1})})),(0,b.Z)((0,p.Z)(n),"onCheck",(function(e){n.setState({checkedKeys:e})})),(0,b.Z)((0,p.Z)(n),"onSelect",(function(e,t){n.setState({selectedKeys:e,selectedItem:t.node},(function(){n.searchPermissionList()}))})),(0,b.Z)((0,p.Z)(n),"closeTag",(function(e){n.setState({roleId:e.id},(function(){n.deleteRoleRole()}))})),(0,b.Z)((0,p.Z)(n),"handleAddRole",(function(){n.setState({addRoleVisible:!0}),n.getRoleList()})),(0,b.Z)((0,p.Z)(n),"onPerExpand",(function(e){n.setState({expandedKeysPer:e,autoExpandParentPer:!1})})),(0,b.Z)((0,p.Z)(n),"onPerCheck",(function(e){console.log("checkedKeysValuePer:::::",e),n.setState({checkedKeysPer:e})})),(0,b.Z)((0,p.Z)(n),"onPerSelect",(function(e,t){n.setState({selectedKeysPer:e,selectedItemPer:t.node},(function(){n.searchPermissionList()}))})),(0,b.Z)((0,p.Z)(n),"addPermission",(function(){var e=n.props.dispatch,t=n.state,r=t.tenantId,a=t.selectedKeys,o=t.checkedKeysPer;e({type:"roleManage/addRolePermission",opt:{tenantId:r,roleId:a[0],permissionIds:o},callback:function(e){var t;200==(null==e?void 0:e.data.status)?(s.ZP.success("修改成功!"),n.handleCancel(),n.searchPermissionList()):s.ZP.success((null==e||null===(t=e.data)||void 0===t?void 0:t.message)||"修改失败!")}})})),(0,b.Z)((0,p.Z)(n),"handleDel",(0,c.Z)(g().mark((function e(){var t,r,a,o,l;return g().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.props.dispatch,r=n.state,a=r.selectedKeys,o=r.tenantId,l=r.checkedKeysPer,console.log("checkedKeysPer:::",l),e.next=5,t({type:"roleManage/deleteRolePermission",opt:{tenantId:o,permissionIds:l,roleId:null==a?void 0:a[0]},callback:function(e){var t;200==(null==e?void 0:e.data.status)?(s.ZP.success("删除成功!"),n.handleCancel(),n.searchPermissionList()):s.ZP.success((null==e||null===(t=e.data)||void 0===t?void 0:t.message)||"删除失败!")}});case 5:case"end":return e.stop()}}),e)})))),n.state={tenantId:Number((0,w.qs)(null===(t=e.location)||void 0===t?void 0:t.search).tenantId),isDeatil:!1,page:1,total:"",createVisible:!1,isEditRole:!1,currentDetailData:{},selectedRowKeys:[],selectedRows:[],addRoleVisible:!1,detailVisible:!1,addPermissionVisible:!1,expandedKeys:[],checkedKeys:[],selectedKeys:[],selectedItem:[],autoExpandParent:!0,expandedKeysPer:[],checkedKeysPer:[],selectedKeysPer:[],selectedItemPer:[],autoExpandParentPer:!0,permissionList:{total:0,current:1,pageSize:1e3,data:[]},roleId:"",roleList:[]},n}return(0,u.Z)(y,[{key:"componentDidMount",value:function(){var e=this;this.setState({tenantId:sessionStorage.getItem("tenantId")},(function(){e.getRoleLists()}))}},{key:"render",value:function(){var e=this.state,t=(e.tenantId,e.roleList),n=e.permissionList,s=e.createVisible,c=e.isEditRole,d=(e.addRoleVisible,e.addPermissionVisible,e.currentDetailData,e.selectedItem,e.selectedRowKeys,e.expandedKeys),u=e.checkedKeys,p=e.selectedKeys,m=e.autoExpandParent,f=e.expandedKeysPer,h=e.checkedKeysPer,b=e.selectedKeysPer,v=(e.selectedItemPer,e.autoExpandParentPer);return _.createElement("div",{className:z("roleCenter")},_.createElement(r.Z,{title:"角色管理",extra:_.createElement(_.Fragment,null,_.createElement(i.Z,{className:z("roleBtn"),type:"primary",onClick:this.createRole},"创建角色"),_.createElement(i.Z,{className:z("roleBtn"),style:{marginLeft:"8px"},type:"primary",onClick:this.editRole},"编辑角色"))},_.createElement(a.Z,null,_.createElement(o.Z,{span:8},_.createElement("div",{className:z("roleTreeCard")},_.createElement(l.Z,{onExpand:this.onExpand,expandedKeys:d,autoExpandParent:m,onCheck:this.onCheck,checkedKeys:u,onSelect:this.onSelect,selectedKeys:p,treeData:(0,w.wf)(t,"roleName","parentRoleId")}))),_.createElement(o.Z,{span:16,style:{borderLeft:"1px solid #c4bcbc"}},_.createElement("div",{className:z("table-box")}),_.createElement("div",{className:z("tree-box")},_.createElement(l.Z,{checkable:!0,onExpand:this.onPerExpand,expandedKeys:f,autoExpandParent:v,onCheck:this.onPerCheck,checkedKeys:h,onSelect:this.onPerSelect,selectedKeys:b,treeData:(0,w.wf)(n.data,"permissionName","parentPermissonId"),className:z("tree-node")}),_.createElement(i.Z,{className:z("perBtn"),style:{marginLeft:"8px"},type:"primary",onClick:this.addPermission},"修改权限"))))),_.createElement(M,{visible:s,isEditRole:c,submitMap:this.handleSubmit,onCancel:this.handleCancel,delRole:this.delRole,dataList:t,_this:this}))}}]),y}(_.Component))||N)},32005:(e,t,n)=>{n.d(t,{Z:()=>o});var r=n(23645),a=n.n(r)()((function(e){return e[1]}));a.push([e.id,'html,\nbody,\ndiv,\nspan,\napplet,\nobject,\niframe,\nh1,\nh2,\nh3,\nh4,\nh5,\nh6,\np,\nblockquote,\npre,\na,\nabbr,\nacronym,\naddress,\nbig,\ncite,\ncode,\ndel,\ndfn,\nem,\nimg,\nins,\nkbd,\nq,\ns,\nsamp,\nsmall,\nstrike,\nstrong,\nsub,\nsup,\ntt,\nvar,\nb,\nu,\ni,\ncenter,\ndl,\ndt,\ndd,\nol,\nul,\nli,\nfieldset,\nform,\nlabel,\nlegend,\ntable,\ncaption,\ntbody,\ntfoot,\nthead,\ntr,\nth,\ntd,\narticle,\naside,\ncanvas,\ndetails,\nembed,\nfigure,\nfigcaption,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\noutput,\nruby,\nsection,\nsummary,\ntime,\nmark,\naudio,\nvideo {\n  margin: 0;\n  padding: 0;\n  border: 0;\n  font-size: 100%;\n  font: inherit;\n  vertical-align: baseline;\n  font-family: "微软雅黑", "Arial", "华文细黑", "STHeiti", "MingLiu";\n}\n/* HTML5 display-role reset for older browsers */\narticle,\naside,\ndetails,\nfigcaption,\nfigure,\nfooter,\nheader,\nhgroup,\nmenu,\nnav,\nsection {\n  display: block;\n}\nbody {\n  line-height: 1;\n}\nol,\nul {\n  list-style: none;\n}\nblockquote,\nq {\n  quotes: none;\n}\nblockquote:before,\nblockquote:after,\nq:before,\nq:after {\n  content: \'\';\n  content: none;\n}\ntable {\n  border-collapse: collapse;\n  border-spacing: 0;\n}\na {\n  color: #000;\n  text-decoration: none;\n}\na:hover {\n  color: #000;\n  text-decoration: none;\n}\n::-webkit-scrollbar-track {\n  background-color: transparent;\n}\n::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n::-webkit-scrollbar-thumb {\n  background-color: #aaa;\n  border-radius: 10px;\n}\n#index-module__root___3bEPB {\n  height: 100%;\n}\n.index-module__box___1a4nZ {\n  width: 100%;\n  display: flex;\n  height: 100%;\n  min-height: 92vh;\n  background-color: #f0f2f5;\n}\n.index-module__roleCenter___1Ec3g .ant-card {\n  margin: 20px;\n  border-radius: 7px;\n}\n.index-module__roleCenter___1Ec3g .searchForm .ant-form-inline .ant-form-item {\n  width: 260px;\n}\n.index-module__roleCenter___1Ec3g .table-box .ant-card {\n  width: 100%;\n}\n.index-module__roleCenter___1Ec3g .index-module__roleLists___3deO_ .index-module__roleBtn___O2Rhp {\n  margin-left: 10px;\n  margin-bottom: 20px;\n}\n.index-module__roleCenter___1Ec3g .index-module__tree-box___278aW {\n  padding: 0 30px;\n}\n.index-module__roleCenter___1Ec3g .index-module__tree-box___278aW .index-module__perBtn___1D3zy {\n  margin: 30px 20px 0;\n}\n',""]),a.locals={root:"index-module__root___3bEPB",box:"index-module__box___1a4nZ",roleCenter:"index-module__roleCenter___1Ec3g",roleLists:"index-module__roleLists___3deO_",roleBtn:"index-module__roleBtn___O2Rhp","tree-box":"index-module__tree-box___278aW",perBtn:"index-module__perBtn___1D3zy"};const o=a}}]);