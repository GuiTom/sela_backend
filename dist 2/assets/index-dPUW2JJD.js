import{A as x}from"./AppBar-67CipABS.js";import{a as k}from"./request-1LUaphst.js";import{I as M}from"./InfiniteList-UY61RceK.js";import{_ as T,r as c,o as D,a as r,c as p,b as a,d as m,u as t,f as F,G as A,F as v,m as o,e as C,I as b,t as f,O as B,p as $,i as L}from"./index-lL9sqtyl.js";import{m as N}from"./mony_amount-iEWsLrHE.js";import{_ as w}from"./AutoRTLImg-FbQLC4a0.js";import{l as V}from"./loading-v2sXnt0B.js";import{r as W}from"./right_arror-xOC5izk1.js";const y=n=>($("data-v-0dda3833"),n=n(),L(),n),q={class:"container"},z=["onClick"],E={class:"row_left_part"},P=y(()=>a("span",{class:"spacer"},null,-1)),G={class:"value"},O=y(()=>a("span",{class:"spacer_10px"},null,-1)),R={key:1,style:{width:"100%",height:"100%",position:"fixed"}},S=20,j={__name:"index",setup(n){const i=c(!1),u=c(!1),h=c(!1);var l=0,s=c(null);D(()=>{document.documentElement.scrollTop=0,_()});function I(){l=0,_()}function _(){if(h.value){console.log("没有更多数据了");return}if(u.value||i.value)return;l==0?u.value=!0:i.value=!0;let d="/manager/guildh5/page/guild/settle",g=new Date().getTime();k.post(d,{condition:{date:g},pageNum:l+1,pageSize:S}).then(function(e){l==0?(s.value=e.data,u.value=!1):(s.value.data.list=[...s.value.data.list,...e.data.data.list],i.value=!1),l++,(s.value.data.list==null||s.value.data.list.length<S)&&(h.value=!0)}).catch(function(e){console.log(e)})}return(d,g)=>(r(),p(v,null,[a("div",q,[m(x,{title:t(o)("Withdrawal history")},null,8,["title"])]),t(s)!=null?(r(),F(M,{key:0,class:"list",onLoadMore:_,onRefresh:I,loadingMore:i.value,refreshing:u.value,noMoreData:h.value},{content:A(()=>[(r(!0),p(v,null,C(t(s).data.list,e=>(r(),p("div",{onClick:H=>e.settleStatus!=2&&d.$router.push({name:"withdrawal details",query:{endTime:e.endTime,settleId:e.settleId}})},[a("div",E,[a("div",null,[b(f(d.$timeToFormatedDate(parseInt(e.endTime))),1),a("span",{style:B("background-color:"+(e.settleStatus==0?"#FF8F16":e.settleStatus==1?"#07E076":"#C7CAC9")+";")},f(e.settleStatus==0?t(o)("Withdrawal in progress"):e.settleStatus==1?t(o)("Withdrawn"):t(o)("Abolished")),5)]),a("div",null,f(e.settleStatus==0?t(o)("Processing, please wait patiently"):e.settleStatus==1?t(o)("Already withdrawn into your bank account"):t(o)("Withdrawal request has expired")),1)]),P,a("span",G,f(t(N)(e.usdFee))+"$",1),O,m(w,{class:"right_arror",src:t(W)},null,8,["src"])],8,z))),256))]),_:1},8,["loadingMore","refreshing","noMoreData"])):(r(),p("div",R,[m(w,{src:t(V),style:{width:"81px",height:"50px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}},null,8,["src"])]))],64))}},te=T(j,[["__scopeId","data-v-0dda3833"]]);export{te as default};
