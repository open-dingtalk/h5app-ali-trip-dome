(this.webpackJsonpfrontend=this.webpackJsonpfrontend||[]).push([[0],{194:function(e,t,i){},213:function(e,t,i){},538:function(e,t,i){},540:function(e,t,i){},541:function(e,t,i){},542:function(e,t,i){},552:function(e,t,i){},553:function(e,t,i){},554:function(e,t,i){},555:function(e,t,i){},556:function(e,t,i){"use strict";i.r(t);var n=i(0),l=i.n(n),a=i(33),c=i.n(a),s=(i(194),i(8)),o=i(12),r=i(16),d=i(17),u=i(22),j=i.n(u),b=(i(213),i(64)),v=i(31),f=i(10),O=i(4),m=i(5),h=(i(538),i(3)),x=function(){var e=Object(f.f)(),t=Object(n.useContext)(ie),i=Object(n.useState)(!1),l=Object(O.a)(i,2),a=l[0],c=l[1],s=function(t){console.log("---path----",t),e(t)};return Object(h.jsxs)("div",{className:"main",children:[Object(h.jsx)("div",{className:"title",children:"\u64cd\u4f5c\u5217\u8868"}),Object(h.jsx)(m.a,{className:"button",block:!0,color:"primary",onClick:function(){s("/apply")},children:"\u5dee\u65c5\u7533\u8bf7"}),Object(h.jsx)(m.a,{className:"button",block:!0,color:"primary",onClick:function(){s("/todoList")},children:"\u5ba1\u6279\u5f85\u529e"}),Object(h.jsx)(m.a,{className:"button",block:!0,color:"primary",loading:a,onClick:function(){c(!0),j.a.post(t.domain+"/biz/get/address",{userId:null===t||void 0===t?void 0:t.userId}).then((function(e){var t;(c(!1),e&&e.data.success)?(!function(e){var t=document.createElement("a");t.setAttribute("href",e),t.setAttribute("id","openwin"),document.body.appendChild(t),t.click()}(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.data),console.log("-------res----",e)):alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){c(!1),alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},children:"\u4e00\u952e\u8ba2\u8d2d"})]})},p=i(7),g=i(34),N=i.n(g),y=new Date,S=function(e){var t=e.value,i=void 0===t?{}:t,l=e.onChange,a=Object(n.useState)(""),c=Object(O.a)(a,2),s=c[0],o=c[1],r=Object(n.useState)(""),d=Object(O.a)(r,2),u=d[0],j=d[1],b=Object(n.useState)("start"),v=Object(O.a)(b,2),f=v[0],x=v[1],g=Object(n.useState)(!1),S=Object(O.a)(g,2),C=S[0],k=S[1],w=function(e){null===l||void 0===l||l(Object(p.a)(Object(p.a)({start:s,end:u},i),e))},I=function(e){x(e),k(!0)};return Object(h.jsxs)("div",{style:{display:"flex",justifyContent:"space-between"},children:[Object(h.jsx)("div",{onClick:function(){I("start")},children:Object(h.jsx)(m.f,{type:"text",placeholder:"\u8d77\u59cb\u65e5\u671f",value:(null===i||void 0===i?void 0:i.start)||s,disabled:!0,style:{width:100}})}),"\u81f3",Object(h.jsx)("div",{onClick:function(){I("end")},children:Object(h.jsx)(m.f,{className:"i_right",type:"text",placeholder:"\u7ed3\u675f\u65e5\u671f",value:(null===i||void 0===i?void 0:i.end)||u,disabled:!0,style:{width:100}})}),Object(h.jsx)(m.c,{title:"\u65f6\u95f4\u9009\u62e9",visible:C,onClose:function(){k(!1)},defaultValue:y,onConfirm:function(e){if("end"===f){var t=N()(e).format("YYYY-MM-DD");j(t),w({end:t})}else{var i=N()(e).format("YYYY-MM-DD");o(i),w({start:i})}}})]})},C=(i(540),function(){var e,t=Object(f.f)(),i=Object(n.useContext)(ie),l=Object(v.b)(),a=Object(O.a)(l,2),c=a[0],s=(a[1],Object(n.useState)(!1)),o=Object(O.a)(s,2),r=o[0],d=o[1],u=Object(n.useState)(!1),b=Object(O.a)(u,2),x=b[0],p=b[1],g=Object(n.useState)(!1),N=Object(O.a)(g,2),y=N[0],S=N[1],C=Object(n.useState)(""),k=Object(O.a)(C,2),w=k[0],I=k[1],q=Object(n.useState)({}),J=Object(O.a)(q,2),D=J[0],E=J[1],T=function(){t("/",{replace:!0})},F=function(e){"agree"===e?d(!0):p(!0);var t=c.get("uuid");j.a.post(i.domain+"/biz/update",{userId:i.userId,userName:i.userName,workRecordId:w,flowStatus:e,uuid:t}).then((function(t){"agree"===e?d(!1):p(!1),t&&t.data.success?m.d.alert({content:"".concat("agree"===e?"\u540c\u610f":"\u9a73\u56de","\u6210\u529f!"),onConfirm:function(){T()}}):alert("request failed ---\x3e"+JSON.stringify(t))})).catch((function(t){"agree"===e?d(!1):p(!1),alert("httpRequest failed ---\x3e"+JSON.stringify(t))}))};return Object(n.useEffect)((function(){var e=c.get("uuid");j.a.post(i.domain+"/biz/query/uuid",{uuid:e}).then((function(e){var t,i,n,l,a,c;(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.success)?(E(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.data),(null===e||void 0===e||null===(n=e.data)||void 0===n||null===(l=n.data)||void 0===l?void 0:l.flowStatus)||S(!0),I(null===e||void 0===e||null===(a=e.data)||void 0===a||null===(c=a.data)||void 0===c?void 0:c.workRecordId)):alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))}),[]),Object(h.jsxs)("div",{className:"bill",children:[Object(h.jsx)("div",{className:"header",children:Object(h.jsx)(m.h,{onBack:T,children:"\u5dee\u65c5\u7533\u8bf7\u5355"})}),Object(h.jsx)("div",{className:"form_bill",children:Object(h.jsxs)(m.g,{children:[Object(h.jsx)(m.g.Item,{title:"\u5355\u636e\u6a21\u677f\uff1a",children:Object(h.jsx)("div",{className:"content",children:(null===D||void 0===D?void 0:D.flowName)||""})}),Object(h.jsx)(m.g.Item,{title:"\u51fa\u884c\u4eba\uff1a",children:Object(h.jsx)("div",{className:"content",children:(null===D||void 0===D?void 0:D.userName)||""})}),Object(h.jsx)(m.g.Item,{title:"\u8d77\u6b62\u65e5\u671f\uff1a",children:Object(h.jsx)("div",{className:"content",children:(null===D||void 0===D?void 0:D.flowStartTime)?"".concat(null===D||void 0===D?void 0:D.flowStartTime," \u81f3 ").concat(null===D||void 0===D?void 0:D.flowEndTime):""})}),Object(h.jsx)(m.g.Item,{title:"\u51fa\u5dee\u4e8b\u7531\uff1a",children:Object(h.jsx)("div",{className:"content",children:(null===D||void 0===D?void 0:D.flowDesc)||""})})]})}),Object(h.jsx)("div",{className:"form_bill",style:{marginTop:"10px"},children:Object(h.jsx)(m.g,{children:Object(h.jsx)(m.g.Item,{title:"\u884c\u7a0b\u89c4\u5212\uff1a",children:Object(h.jsx)("div",{className:"content",children:null===D||void 0===D||null===(e=D.tripList)||void 0===e?void 0:e.map((function(e,t){return Object(h.jsxs)("div",{children:[null===e||void 0===e?void 0:e.tripType,"\uff1a",null===e||void 0===e?void 0:e.tripStartCity,"  "," -","  "," ",null===e||void 0===e?void 0:e.tripEndCity,"  "," ",null===e||void 0===e?void 0:e.tripStartDate]})}))})})})}),Object(h.jsx)("div",{className:"dip"}),y&&Object(h.jsxs)("div",{className:"submit_view",children:[Object(h.jsx)(m.a,{block:!0,className:"btn",disabled:!w,type:"submit",loading:x,color:"danger",onClick:function(){return F("refuse")},children:"\u9a73\u56de"}),Object(h.jsx)(m.a,{block:!0,disabled:!w,className:"btn",type:"submit",loading:r,color:"primary",onClick:function(){return F("agree")},children:"\u540c\u610f"})]})]})}),k=i(27),w=i(11),I=i.n(w),q=i(24),J=(i(541),i.p+"static/media/more.e6e547eb.svg"),D=i.p+"static/media/delete.c2cd40de.svg",E=new Date,T=[{label:"\u98de\u673a",value:"\u98de\u673a"},{label:"\u706b\u8f66",value:"\u706b\u8f66"}],F=function(e){var t=e.onChange,i=e.value,l=(e.data,e.onDelete),a=Object(n.useState)(""),c=Object(O.a)(a,2),s=c[0],o=c[1],r=m.e.useForm(),d=Object(O.a)(r,1)[0],u=Object(n.useState)(!1),j=Object(O.a)(u,2),b=j[0],v=j[1],f=Object(n.useState)(),x=Object(O.a)(f,2),p=x[0],g=x[1],y=Object(n.useState)(!1),S=Object(O.a)(y,2),C=S[0],k=S[1],w=function(){var e=Object(q.a)(I.a.mark((function e(i){var n,l;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,d.validateFields();case 3:n=e.sent,null===t||void 0===t||t(n),e.next=11;break;case 7:e.prev=7,e.t0=e.catch(0),l=null===e.t0||void 0===e.t0?void 0:e.t0.values,null===t||void 0===t||t(l);case 11:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(t){return e.apply(this,arguments)}}();return Object(h.jsxs)("div",{className:"trip-item",children:[Object(h.jsxs)("div",{className:"trip-header",children:[Object(h.jsx)("div",{className:"",children:"\u884c\u7a0b"}),Object(h.jsx)("div",{className:"",onClick:l,children:Object(h.jsx)("img",{src:D,alt:"",srcset:""})})]}),Object(h.jsxs)(m.e,{form:d,onValuesChange:function(e,t){w()},children:[Object(h.jsx)(m.e.Item,{name:"tripType",label:"\u4ea4\u901a\u5de5\u5177",children:Object(h.jsxs)("div",{className:"flex j_between",onClick:function(){v(!0)},children:[Object(h.jsx)(m.f,{type:"text",placeholder:"\u8bf7\u9009\u62e9\u4ea4\u901a\u5de5\u5177",value:(null===i||void 0===i?void 0:i.tripType)||s,disabled:!0}),Object(h.jsx)("img",{src:J,alt:"",srcset:""})]})}),Object(h.jsx)(m.e.Item,{name:"tripStartDate",label:"\u51fa\u53d1\u65f6\u95f4",children:Object(h.jsxs)("div",{className:"flex j_between",onClick:function(){k(!0)},children:[Object(h.jsx)(m.f,{type:"text",placeholder:"\u8bf7\u9009\u62e9\u51fa\u53d1\u65f6\u95f4",value:(null===i||void 0===i?void 0:i.tripStarDate)||p,disabled:!0}),Object(h.jsx)("img",{src:J,alt:"",srcset:""})]})}),Object(h.jsx)(m.e.Item,{name:"tripStartCity",label:"\u51fa\u53d1\u57ce\u5e02",children:Object(h.jsx)(m.f,{placeholder:"\u8bf7\u8f93\u5165\u51fa\u53d1\u57ce\u5e02"})}),Object(h.jsx)(m.e.Item,{name:"tripEndCity",label:"\u76ee\u7684\u57ce\u5e02",children:Object(h.jsx)(m.f,{placeholder:"\u8bf7\u8f93\u5165\u76ee\u7684\u57ce\u5e02"})})]}),Object(h.jsx)(m.c,{title:"\u65f6\u95f4\u9009\u62e9",visible:C,onClose:function(){k(!1)},defaultValue:E,onConfirm:function(e){var t=N()(e).format("YYYY-MM-DD");g(t),d.setFieldsValue({tripStartDate:t}),w()}}),Object(h.jsx)(m.b,{options:T,visible:b,onClose:function(){v(!1)},value:s,onConfirm:function(e){o(e[0]),d.setFieldsValue({tripType:e[0]}),w()}})]})},R=(i(542),i(85)),z=i.n(R),P=i.p+"static/media/clbz.559fa064.svg",_=[{label:"\u5dee\u65c5\u7533\u8bf7\u5355",value:"\u5dee\u65c5\u7533\u8bf7\u5355"}],Y=function(){var e=Object(n.useContext)(ie),t=Object(f.f)(),i=m.e.useForm(),l=Object(O.a)(i,1)[0],a=Object(n.useState)(!1),c=Object(O.a)(a,2),s=c[0],o=c[1],r=Object(n.useState)(!1),d=Object(O.a)(r,2),u=(d[0],d[1],Object(n.useState)(!1)),b=Object(O.a)(u,2),v=b[0],x=b[1],g=Object(n.useState)("\u5dee\u65c5\u7533\u8bf7\u5355"),y=Object(O.a)(g,2),C=y[0],w=y[1],D=Object(n.useState)("flow"),E=Object(O.a)(D,2),T=E[0],R=E[1],Y=Object(n.useState)(_),B=Object(O.a)(Y,2),M=B[0],V=B[1],A=Object(n.useState)([]),L=Object(O.a)(A,2),G=L[0],H=L[1],K=Object(n.useState)([]),Q=Object(O.a)(K,2),U=Q[0],W=Q[1],X=Object(n.useState)(""),Z=Object(O.a)(X,2),$=Z[0],ee=Z[1],te=Object(n.useState)(0),ne=Object(O.a)(te,2),le=ne[0],ae=ne[1],ce=function(){t("/",{replace:!0})},se=function(t){var i,n;x(!0);var l=Object(p.a)(Object(p.a)({},t),{},{userName:$,flowStartTime:null===t||void 0===t||null===(i=t.date)||void 0===i?void 0:i.start,flowEndTime:null===t||void 0===t||null===(n=t.date)||void 0===n?void 0:n.end}),a=z.a.generate();j.a.post(e.domain+"/biz/createTask",Object(p.a)(Object(p.a)({},l),{},{uuid:a,url:"/#/bill?uuid=".concat(a)})).then((function(e){x(!1),e&&e.data.success?m.d.alert({content:"\u5dee\u65c5\u7533\u8bf7\u63d0\u4ea4\u6210\u529f!",onConfirm:function(){ce()}}):alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){x(!1),alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},oe=function(){j.a.post(e.domain+"/biz/query/user/list").then((function(e){if(e&&e.data.success){var t,i=(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.data).map((function(e){return{label:null===e||void 0===e?void 0:e.name,value:null===e||void 0===e?void 0:e.userid}}));H(i)}else alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},re=function(){var e=z.a.generate();W(U.concat({uuid:e,tool:"",date:"",startCity:"",endCity:""}))},de=function(){var e=Object(q.a)(I.a.mark((function e(){var t;return I.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,l.validateFields();case 3:t=e.sent,console.log(t),(null===U||void 0===U?void 0:U.length)>0?se(t):m.d.alert({content:"\u884c\u7a0b\u89c4\u5212\u5fc5\u987b\u586b\u5199!",confirmText:"\u7acb\u5373\u6dfb\u52a0",onConfirm:function(){re()}}),e.next=11;break;case 8:e.prev=8,e.t0=e.catch(0),console.log(e.t0);case 11:case"end":return e.stop()}}),e,null,[[0,8]])})));return function(){return e.apply(this,arguments)}}();return Object(n.useEffect)((function(){l.setFieldsValue({flowName:"\u5dee\u65c5\u7533\u8bf7\u5355"}),oe(),re()}),[]),Object(h.jsxs)("div",{className:"apply",children:[Object(h.jsx)("div",{className:"header",children:Object(h.jsx)(m.h,{onBack:ce,children:"\u5dee\u65c5\u7533\u8bf7"})}),Object(h.jsxs)("div",{className:"form",children:[Object(h.jsxs)(m.e,{form:l,children:[Object(h.jsx)(m.e.Item,{name:"flowName",label:"\u5355\u636e\u6a21\u677f",rules:[{required:!0,message:"\u5355\u636e\u6a21\u677f\u4e3a\u7a7a"}],children:Object(h.jsxs)("div",{className:"flex j_between",onClick:function(){V(_),R("flowName"),!s&&o(!0)},children:[Object(h.jsx)(m.f,{placeholder:"\u8bf7\u9009\u5355\u636e\u6a21\u677f",value:C,disabled:!0}),Object(h.jsx)("img",{src:J,alt:"",srcset:""})]})}),Object(h.jsx)(m.e.Item,{name:"userId",label:"\u51fa\u884c\u4eba",rules:[{required:!0,message:"\u51fa\u884c\u4eba\u4eba\u4e0d\u80fd\u4e3a\u7a7a"}],children:Object(h.jsxs)("div",{className:"flex j_between",onClick:function(){(null===G||void 0===G?void 0:G.length)>0?(V(G),R("userId"),!s&&o(!0)):oe()},children:[Object(h.jsx)(m.f,{placeholder:"\u8bf7\u9009\u62e9\u51fa\u884c\u4eba",value:$,disabled:!0}),Object(h.jsx)("img",{src:J,alt:"",srcset:""})]})}),Object(h.jsx)(m.e.Item,{name:"flowDesc",label:"\u51fa\u5dee\u4e8b\u7531",rules:[{required:!0,message:"\u51fa\u5dee\u4e8b\u7531\u4e0d\u80fd\u4e3a\u7a7a"}],children:Object(h.jsx)(m.f,{placeholder:"\u8bf7\u8f93\u5165\u51fa\u5dee\u4e8b\u7531"})}),Object(h.jsx)(m.e.Item,{name:"date",label:"\u8d77\u6b62\u65e5\u671f",rules:[{required:!0,validator:function(e,t){if(!(null===t||void 0===t?void 0:t.start))return 0!==le&&ae(0),Promise.reject(new Error("\u8d77\u59cb\u65e5\u671f\u5fc5\u586b"));if(!(null===t||void 0===t?void 0:t.end))return 0!==le&&ae(0),Promise.reject(new Error("\u7ed3\u675f\u65e5\u671f\u5fc5\u586b"));if(N()(null===t||void 0===t?void 0:t.end).isBefore(null===t||void 0===t?void 0:t.start))return 0!==le&&ae(0),Promise.reject(new Error("\u7ed3\u675f\u65e5\u671f\u8981\u5927\u4e8e\u7b49\u4e8e\u8d77\u59cb\u65e5\u671f"));var i=N()(null===t||void 0===t?void 0:t.end).diff(N()(null===t||void 0===t?void 0:t.start),"days");return ae(i+1),Promise.resolve()}}],children:Object(h.jsx)(S,{})}),Object(h.jsx)(m.e.Item,{label:"\u884c\u7a0b\u89c4\u5212",children:Object(h.jsxs)("div",{children:[U.map((function(e,t){return Object(h.jsx)(m.e.Item,{name:["tripList",t],noStyle:!0,rules:[{required:!0,validator:function(e,t){return(null===t||void 0===t?void 0:t.tripType)?(null===t||void 0===t?void 0:t.tripStartDate)?(null===t||void 0===t?void 0:t.tripStartCity)?(null===t||void 0===t?void 0:t.tripEndCity)?Promise.resolve():Promise.reject(new Error("\u76ee\u7684\u57ce\u5e02\u4e3a\u5fc5\u586b\u9879!")):Promise.reject(new Error("\u51fa\u53d1\u57ce\u5e02\u4e3a\u5fc5\u586b\u9879!")):Promise.reject(new Error("\u51fa\u53d1\u65f6\u95f4\u4e3a\u5fc5\u586b\u9879!")):Promise.reject(new Error("\u4ea4\u901a\u5de5\u5177\u4e3a\u5fc5\u586b\u9879!"))}}],children:Object(h.jsx)(F,{data:e,onDelete:function(){var e=l.getFieldValue("tripList");console.log(e),function(e){var t=JSON.parse(JSON.stringify(U));null===t||void 0===t||t.splice(e,1),W(t)}(t)}})},null===e||void 0===e?void 0:e.uuid)})),Object(h.jsx)(m.a,{block:!0,style:{marginTop:20},onClick:re,children:"\u6dfb\u52a0\u884c\u7a0b\u89c4\u5212"})]})})]}),Object(h.jsx)(m.b,{options:M,visible:s,onClose:function(){o(!1)},value:C,onConfirm:function(e){if("flowName"===T)w(e[0]);else{var t=G.find((function(t){return(null===t||void 0===t?void 0:t.value)===e[0]}));ee(null===t||void 0===t?void 0:t.label)}l.setFieldsValue(Object(k.a)({},T,e[0]))}})]}),Object(h.jsx)("div",{className:"clbz",children:Object(h.jsxs)("div",{className:"container",children:[Object(h.jsxs)("div",{className:"flex a_center",style:{fontSize:"16px"},children:[Object(h.jsx)("img",{src:P,alt:"",style:{marginRight:10}}),"\u5dee\u65c5\u8865\u52a9:"]}),Object(h.jsxs)("div",{className:"flex j_between m20 mt25",children:[Object(h.jsxs)("div",{className:"flex",children:["\u8865\u52a9\u5929\u6570:",Object(h.jsxs)("div",{className:"ml8 fw600",children:[le,"\u5929"]})]}),Object(h.jsxs)("div",{className:"flex",children:["\u8d39\u7528\u6807\u51c6: ",Object(h.jsx)("div",{className:"ml8 fw600",children:"60 \u5143/\u5929"})]})]}),Object(h.jsx)("div",{className:"flex m20 mt11",children:Object(h.jsxs)("div",{className:"flex",children:["\u8865\u52a9\u91d1\u989d: ",Object(h.jsxs)("div",{className:"ml8 fw600",children:["\xa5 ",60*le,"\u5143"]})]})}),Object(h.jsxs)("div",{className:"mt25 w100 tips",children:[Object(h.jsx)("div",{style:{fontSize:"14px",marginBottom:10},children:"\u9884\u7f6e\u89c4\u5219\uff1a"}),Object(h.jsx)("div",{className:"",children:"1. \u8865\u52a9\u91d1\u989d=\u8d39\u7528\u6807\u51c6 * \u5929\u6570\uff1b"}),Object(h.jsx)("div",{className:"",children:"2. \u5f3a\u7ba1\u63a7\uff1a\u7533\u8bf7\u884c\u7a0b\u5fc5\u987b\u548c\u62a5\u9500\u5355\u884c\u7a0b\u4e00\u81f4\uff1b"}),Object(h.jsx)("div",{className:"",children:"3. \u652f\u6301\u624b\u52a8\u4fee\u6539\uff1b"})]})]})}),Object(h.jsx)("div",{className:"dip"}),Object(h.jsx)("div",{className:"submit_view",children:Object(h.jsx)(m.a,{block:!0,className:"btn",type:"submit",loading:v,color:"primary",onClick:de,children:"\u63d0\u4ea4\u9001\u5ba1"})})]})},B=(i(552),function(){return Object(h.jsxs)("div",{className:"main",children:[Object(h.jsx)("div",{className:"title",children:"\u53d1\u8d77\u62a5\u9500"}),Object(h.jsx)(m.a,{className:"button",block:!0,color:"primary",onClick:function(e){},children:"\u5f85\u529e\u5ba1\u6279"})]})}),M=(i(553),i(554),i.p+"static/media/file.fe84adbd.svg"),V=function(e){e.id;var t=e.title,i=e.submiter,n=e.reason,l=e.todo,a=(e.isDone,Object(f.f)());return Object(h.jsxs)("div",{className:"todo-card",onClick:function(){var e;(null===l||void 0===l?void 0:l.url)&&a(null===l||void 0===l||null===(e=l.url.split("#"))||void 0===e?void 0:e[1])},children:[Object(h.jsxs)("div",{className:"todo-title flex",children:[Object(h.jsx)("img",{src:M,alt:"",srcset:""}),Object(h.jsx)("div",{children:t})]}),Object(h.jsxs)("div",{className:"user",children:["\u63d0\u4ea4\u4eba\uff1a",i]}),Object(h.jsxs)("div",{className:"reason",children:["\u51fa\u5dee\u4e8b\u7531\uff1a",n]}),Object(h.jsx)("img",{className:"more",src:J,alt:"",srcset:""})]})};function A(e,t){return Math.random()*(t-e+1)+e|0}var L=["\u5f20\u4e09","\u674e\u56db","\u738b\u4e94","\u8d75\u516d"],G=["\u7533\u8bf7\u53bb\u5317\u4eac\u7684\u51fa\u5dee\u62a5\u9500","\u62a5\u9500 4 \u6708\u4efd\u7684\u529e\u516c\u5ba4\u8d39\u7528","6 \u6708\u4efd\u56e2\u5efa\u8d39\u7528\u62a5\u9500"],H=function(){var e=Object(f.f)(),t=Object(n.useContext)(ie),i=Object(n.useState)([]),l=Object(O.a)(i,2),a=l[0],c=l[1],s=Object(n.useState)([]),o=Object(O.a)(s,2),r=o[0],d=o[1],u=Object(n.useState)(0),b=Object(O.a)(u,2),v=b[0],x=b[1],p=Object(n.useState)(0),g=Object(O.a)(p,2),N=g[0],y=g[1];return Object(n.useEffect)((function(){j.a.post(t.domain+"/biz/query/tasks",{userId:t.userId,userName:t.userName,taskStatus:1}).then((function(e){var t;if(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.success){var i,n,l=(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.data)||{},a=(null===l||void 0===l||null===(n=l.result)||void 0===n?void 0:n.list)||[];a.forEach((function(e){((null===e||void 0===e?void 0:e.forms)||[]).forEach((function(t){(null===t||void 0===t?void 0:t.title)&&(e[null===t||void 0===t?void 0:t.title]=t.content)}))})),d(a),y(a.length)}else alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){alert("httpRequest failed ---\x3e"+JSON.stringify(e))})),j.a.post(t.domain+"/biz/query/tasks",{userId:t.userId,userName:t.userName,taskStatus:0}).then((function(e){var t;if(null===e||void 0===e||null===(t=e.data)||void 0===t?void 0:t.success){var i,n,l=(null===e||void 0===e||null===(i=e.data)||void 0===i?void 0:i.data)||{},a=(null===l||void 0===l||null===(n=l.result)||void 0===n?void 0:n.list)||[];a.forEach((function(e){((null===e||void 0===e?void 0:e.forms)||[]).forEach((function(t){(null===t||void 0===t?void 0:t.title)&&(e[null===t||void 0===t?void 0:t.title]=t.content)}))})),c(a),x(a.length)}else alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))}),[t]),Object(h.jsxs)("div",{className:"todo-list",children:[Object(h.jsx)(m.h,{onBack:function(){e("/",{replace:!0})},children:"\u67e5\u770b\u5f85\u529e"}),Object(h.jsx)("div",{className:"nav-title"}),Object(h.jsxs)(m.i,{style:{paddingBottom:"45px"},children:[Object(h.jsx)(m.i.Tab,{style:{backgroundColor:"#fff"},title:"\u672a\u5904\u7406 "+v,children:null===a||void 0===a?void 0:a.map((function(e){return Object(h.jsx)(V,{todo:e,id:e.instanceId,title:e.title,isDone:"no",reason:(null===e||void 0===e?void 0:e["\u51fa\u5dee\u4e8b\u7531"])||G[A(0,G.length-1)],submiter:(null===e||void 0===e?void 0:e["\u63d0\u4ea4\u4eba"])||L[A(0,L.length-1)]},e.instanceId)}))},"\u672a\u5904\u7406"),Object(h.jsx)(m.i.Tab,{style:{backgroundColor:"#fff"},title:"\u5df2\u5904\u7406 "+N,children:null===r||void 0===r?void 0:r.map((function(e){return Object(h.jsx)(V,{todo:e,id:e.instanceId,title:e.title,isDone:"yes",reason:(null===e||void 0===e?void 0:e["\u51fa\u5dee\u4e8b\u7531"])||G[A(0,G.length-1)],submiter:(null===e||void 0===e?void 0:e["\u63d0\u4ea4\u4eba"])||L[A(0,L.length-1)]},e.instanceId)}))},"\u5df2\u5904\u7406")]})]})};i(555);function K(e,t){return Math.random()*(t-e+1)+e|0}var Q=[["\u7533\u8bf7\u5355","\u62a5\u9500\u5355","\u501f\u6b3e\u5355"]],U=[["\u5ba1\u6279\u6d41A","\u5ba1\u6279\u6d41B","\u5ba1\u6279\u6d41C","\u5ba1\u6279\u6d41D","\u5ba1\u6279\u6d41E"]],W=["\u5f20\u4e09","\u674e\u56db","\u738b\u4e94","\u8d75\u516d"],X=["\u7533\u8bf7\u53bb\u5317\u4eac\u7684\u51fa\u5dee\u62a5\u9500","\u62a5\u9500 4 \u6708\u4efd\u7684\u529e\u516c\u5ba4\u8d39\u7528","6 \u6708\u4efd\u56e2\u5efa\u8d39\u7528\u62a5\u9500"],Z=[12,23,200,400,666],$=function(e){var t=Object(f.f)(),i=Object(n.useContext)(ie),l=m.e.useForm(),a=Object(O.a)(l,1)[0],c=Object(f.g)(),s=Object(v.b)(),o=Object(O.a)(s,2),r=o[0],d=(o[1],Object(n.useState)(!1)),u=Object(O.a)(d,2),b=u[0],x=u[1],p=Object(n.useState)(!1),g=Object(O.a)(p,2),N=g[0],y=g[1],S=Object(n.useState)("yes"),C=Object(O.a)(S,2),k=C[0],w=C[1],I=function(){t("/todoList",{replace:!0})};return Object(n.useEffect)((function(){var e=r.get("data"),t=r.get("isDone");w(t),console.log("routeParams",c,e);try{var i,n,l=JSON.parse(e);a.setFieldsValue({"\u5355\u636e\u6a21\u677f":(null===l||void 0===l||null===(i=l.title)||void 0===i||null===(n=i.split("\u7684"))||void 0===n?void 0:n[1])||Q[0][K(0,Q[0].length-1)],"\u5ba1\u6279\u6d41":U[0][K(0,U[0].length-1)],"\u62a5\u9500\u4eba":(null===l||void 0===l?void 0:l["\u62a5\u9500\u4eba"])||W[K(0,W.length-1)],"\u62a5\u9500\u4e8b\u7531":(null===l||void 0===l?void 0:l["\u7533\u8bf7\u4e8b\u7531"])||X[K(0,X.length-1)],"\u62a5\u9500\u91d1\u989d":(null===l||void 0===l?void 0:l["\u7533\u8bf7\u91d1\u989d"])||Z[K(0,Z.length-1)]}),console.log("routeParams",c,l)}catch(s){a.setFieldsValue({"\u5355\u636e\u6a21\u677f":Q[0][K(0,Q[0].length-1)],"\u5ba1\u6279\u6d41":U[0][K(0,U[0].length-1)],"\u62a5\u9500\u4eba":W[K(0,W.length-1)],"\u62a5\u9500\u4e8b\u7531":X[K(0,X.length-1)],"\u62a5\u9500\u91d1\u989d":Z[K(0,Z.length-1)]})}}),[]),console.log("---1---",k),Object(h.jsxs)("div",{className:"todo-detail",children:[Object(h.jsx)(m.h,{onBack:I,children:"\u5f85\u529e\u8be6\u60c5"}),Object(h.jsxs)("div",{className:"todo-detail-content",children:[Object(h.jsxs)(m.e,{form:a,children:[Object(h.jsx)(m.e.Item,{className:"row",layout:"horizontal",name:"\u5355\u636e\u6a21\u677f",label:"\u5355\u636e\u6a21\u677f",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5355\u636e\u6a21\u677f"}],children:Object(h.jsx)(m.f,{placeholder:"\u8bf7\u9009\u62e9\u5355\u636e\u6a21\u677f",disabled:!0,value:Q[0][K(0,Q[0].length-1)]})}),Object(h.jsx)(m.e.Item,{name:"\u5ba1\u6279\u6d41",label:"\u5ba1\u6279\u6d41",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u5ba1\u6279\u6d41"}],children:Object(h.jsx)(m.f,{placeholder:"\u8bf7\u9009\u62e9\u5ba1\u6279\u6d41",disabled:!0,value:U[0][K(0,U[0].length-1)]})}),Object(h.jsx)(m.e.Item,{name:"\u62a5\u9500\u4eba",label:"\u62a5\u9500\u4eba",rules:[{required:!0,message:"\u8bf7\u9009\u62e9\u62a5\u9500\u4eba"}],children:Object(h.jsx)(m.f,{placeholder:"\u8bf7\u9009\u62e9\u62a5\u9500\u4eba",disabled:!0,value:W[K(0,W.length-1)]})}),Object(h.jsx)(m.e.Item,{name:"\u62a5\u9500\u4e8b\u7531",label:"\u62a5\u9500\u4e8b\u7531",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u62a5\u9500\u4e8b\u7531"}],children:Object(h.jsx)(m.j,{placeholder:"\u8bf7\u8f93\u5165\u62a5\u9500\u4e8b\u7531",disabled:!0,value:X[K(0,X.length-1)]})}),Object(h.jsx)(m.e.Item,{name:"\u62a5\u9500\u91d1\u989d",label:"\u62a5\u9500\u91d1\u989d",rules:[{required:!0,message:"\u8bf7\u8f93\u5165\u62a5\u9500\u91d1\u989d"}],children:Object(h.jsx)(m.f,{placeholder:"\u8bf7\u8f93\u5165\u62a5\u9500\u91d1\u989d",disabled:!0,value:Z[K(0,Z.length-1)]})})]}),"no"===k?Object(h.jsxs)("div",{style:{display:"flex",marginTop:"10px",padding:"10px"},children:[Object(h.jsx)(m.a,{block:!0,type:"submit",color:"primary",onClick:function(){var e=c.id;x(!0),j.a.post(i.domain+"/biz/update",{userId:i.userId,userName:i.userName,workRecordId:e,flowStatus:"agree"}).then((function(e){x(!1),e&&e.data.success?m.d.alert({content:"\u540c\u610f\u6210\u529f!",onConfirm:function(){I()}}):alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){x(!1),alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},loading:b,children:"\u540c\u610f"}),Object(h.jsx)(m.a,{block:!0,style:{marginLeft:"10px"},type:"submit",color:"danger",onClick:function(){var e=c.id;y(!0),j.a.post(i.domain+"/biz/update",{userId:i.userId,userName:i.userName,workRecordId:e,flowStatus:"refuse"}).then((function(e){y(!1),e&&e.data.success?m.d.alert({content:"\u9a73\u56de\u6210\u529f!",onConfirm:function(){I()}}):alert("request failed ---\x3e"+JSON.stringify(e))})).catch((function(e){y(!1),alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},loading:N,children:"\u9a73\u56de"})]}):Object(h.jsx)(h.Fragment,{})]})]})};function ee(){return Object(h.jsx)(v.a,{children:Object(h.jsxs)(f.c,{children:[Object(h.jsx)(f.a,{path:"/",element:Object(h.jsx)(x,{})}),Object(h.jsx)(f.a,{path:"/home",element:Object(h.jsx)(x,{})}),Object(h.jsx)(f.a,{path:"/bill",element:Object(h.jsx)(C,{})}),Object(h.jsx)(f.a,{path:"/apply",element:Object(h.jsx)(Y,{})}),Object(h.jsx)(f.a,{path:"/todoApprove",element:Object(h.jsx)(B,{})}),Object(h.jsx)(f.a,{path:"/todoList",element:Object(h.jsx)(H,{})}),Object(h.jsx)(f.a,{path:"/todoDetail",element:Object(h.jsx)($,{}),children:Object(h.jsx)(f.a,{path:":id",element:Object(h.jsx)($,{})})})]})})}var te=i.p+"static/media/ekb.c7ed8204.svg",ie=l.a.createContext({}),ne=function(e){Object(r.a)(i,e);var t=Object(d.a)(i);function i(e){var n;return Object(s.a)(this,i),(n=t.call(this,e)).state={domain:"",webDomain:"",corpId:"",authCode:"",userId:"",userName:""},n}return Object(o.a)(i,[{key:"componentDidMount",value:function(){this.login()}},{key:"render",value:function(){return Object(h.jsxs)("div",{className:"App",children:[Object(h.jsx)(ie.Provider,{value:this.state,children:Object(h.jsx)(ee,{})}),Object(h.jsxs)("div",{className:"fixName flex a_center j_center",children:[this.state.userName?Object(h.jsx)("img",{src:te,alt:"",srcset:""}):null,this.state.userName?"\u6613\u5feb\u62a5":""]})]})}},{key:"login",value:function(){var e=this;j.a.get(this.state.domain+"/getCorpId").then((function(t){if(t&&200===t.status){var i=t.data;e.setState({corpId:i}),e.loginAction(i)}else alert("login failed ---\x3e"+JSON.stringify(t))})).catch((function(e){alert("corpId err, "+JSON.stringify(e))}))}},{key:"loginAction",value:function(e){var t,i,n=this;null===b||void 0===b||null===(t=b.runtime)||void 0===t||null===(i=t.permission)||void 0===i||i.requestAuthCode({corpId:e,onSuccess:function(e){n.state.authCode=e.code,console.log("---------",e.code),j.a.get(n.state.domain+"/login?authCode="+e.code).then((function(e){if(e&&e.data.success){var t=e.data.data.userId,i=e.data.data.userName;console.log("\u767b\u5f55\u6210\u529f\uff0c\u4f60\u597d"+i+t),setTimeout((function(){n.setState({userId:t,userName:i})}),0)}else alert("login failed ---\x3e"+JSON.stringify(e))})).catch((function(e){alert("httpRequest failed ---\x3e"+JSON.stringify(e))}))},onFail:function(e){alert("requestAuthCode failed ---\x3e"+JSON.stringify(e))}}).catch((function(e){console.log(e)}))}}]),i}(l.a.Component),le=function(e){e&&e instanceof Function&&i.e(3).then(i.bind(null,558)).then((function(t){var i=t.getCLS,n=t.getFID,l=t.getFCP,a=t.getLCP,c=t.getTTFB;i(e),n(e),l(e),a(e),c(e)}))};c.a.render(Object(h.jsx)(l.a.StrictMode,{children:Object(h.jsx)(ne,{})}),document.getElementById("root")),le()}},[[556,1,2]]]);
//# sourceMappingURL=main.0c207402.chunk.js.map