"use strict";(self.webpackChunkt_zero_user_operation_frontend=self.webpackChunkt_zero_user_operation_frontend||[]).push([[6078],{66078:(e,t,r)=>{r.r(t),r.d(t,{default:()=>b});var n=r(4942),a=r(87757),c=r.n(a),o=r(92456);function s(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function u(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?s(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):s(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}var l=function(e){return(0,o.ZP)("post","/service/list?pageSize=".concat(e.pageSize,"&currentPage=").concat(e.currentPage),u({},e))},i=function(e){return(0,o.ZP)("post","/service/modify",u({},e))},p=function(e){return(0,o.ZP)("get","/service/delete",u({},e))},f=function(e){return(0,o.ZP)("post","/service/save",u({},e))};function v(e,t){var r=Object.keys(e);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e);t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function d(e){for(var t=1;t<arguments.length;t++){var r=null!=arguments[t]?arguments[t]:{};t%2?v(Object(r),!0).forEach((function(t){(0,n.Z)(e,t,r[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(r)):v(Object(r)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(r,t))}))}return e}const b={namespace:"productConfig",state:{registerInfo:{}},reducers:{save2state:function(e,t){var r=t.payload;return d(d({},e),r)}},effects:{getServiceLists:c().mark((function e(t,r){var n,a,o,s,u,i;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.opt,o=t.callback,s=r.put,u=r.call,e.next=4,u(l,d({},a));case 4:return i=e.sent,e.next=7,s({type:"save2state",payload:{registerInfo:(null==i||null===(n=i.data)||void 0===n?void 0:n.data)||[],params:a}});case 7:null==o||o.call(null,i);case 8:case"end":return e.stop()}}),e)})),modifyServiceInfo:c().mark((function e(t,r){var n,a,o,s,u,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.opt,o=t.callback,s=r.put,u=r.call,e.next=4,u(i,d({},a));case 4:return l=e.sent,e.next=7,s({type:"save2state",payload:{registerInfo:(null==l||null===(n=l.data)||void 0===n?void 0:n.data)||[],params:a}});case 7:null==o||o.call(null,l);case 8:case"end":return e.stop()}}),e)})),deleteServiceInfo:c().mark((function e(t,r){var n,a,o,s,u,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.opt,o=t.callback,s=r.put,u=r.call,e.next=4,u(p,d({},a));case 4:return l=e.sent,e.next=7,s({type:"save2state",payload:{registerInfo:(null==l||null===(n=l.data)||void 0===n?void 0:n.data)||[],params:a}});case 7:null==o||o.call(null,l);case 8:case"end":return e.stop()}}),e)})),saveServiceInfo:c().mark((function e(t,r){var n,a,o,s,u,l;return c().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return a=t.opt,o=t.callback,s=r.put,u=r.call,e.next=4,u(f,d({},a));case 4:return l=e.sent,e.next=7,s({type:"save2state",payload:{registerInfo:(null==l||null===(n=l.data)||void 0===n?void 0:n.data)||[],params:a}});case 7:null==o||o.call(null,l);case 8:case"end":return e.stop()}}),e)}))}}}}]);