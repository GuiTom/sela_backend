!function(){function t(t){return function(t){if(Array.isArray(t))return e(t)}(t)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(t)||function(t,n){if(!t)return;if("string"==typeof t)return e(t,n);var a=Object.prototype.toString.call(t).slice(8,-1);"Object"===a&&t.constructor&&(a=t.constructor.name);if("Map"===a||"Set"===a)return Array.from(t);if("Arguments"===a||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(a))return e(t,n)}(t)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}()}function e(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,a=new Array(e);n<e;n++)a[n]=t[n];return a}System.register(["./gold_coin-legacy-0XJQM_em.js","./loading-legacy-87srwyjh.js","./AppBar-legacy-v0JjMiJP.js","./index-legacy-3zU_eQ44.js","./InfiniteList-legacy-v2nzupXt.js","./request-legacy-kt11JCGi.js","./mony_amount-legacy-NbZLCn6S.js"],(function(e,n){"use strict";var a,l,o,i,r,u,d,c,s,f,g,b,p,h,v,y,m,x,w,j,A,I,S,_,M;return{setters:[function(t){a=t._},function(t){l=t.l},function(t){o=t.A},function(t){i=t._,r=t.r,u=t.o,d=t.M,c=t.a,s=t.c,f=t.b,g=t.d,b=t.u,p=t.f,h=t.G,v=t.F,y=t.m,m=t.t,x=t.e,w=t.I,j=t.g,A=t.p,I=t.i},function(t){S=t.I},function(t){_=t.a},function(t){M=t.m}],execute:function(){var n=document.createElement("style");n.textContent="table[data-v-7c6b9abd]{width:100%;border-spacing:0;table-layout:fixed}table thead[data-v-7c6b9abd]{width:100%;margin:0;background-color:#f8f5f7;border:none;font-size:12px}table thead th[data-v-7c6b9abd]{color:#999;border-style:none;padding:10px 0;text-align:center}table tbody[data-v-7c6b9abd]{font-size:14px}table tbody td[data-v-7c6b9abd]:nth-child(1){text-overflow:ellipsis;overflow:hidden;padding:15px 5px}table tbody td[data-v-7c6b9abd]{color:#333;text-align:center;padding:15px 3px;line-height:20px;border-bottom:1px solid #eeeeee}table tbody td .coin[data-v-7c6b9abd]{margin-left:3px;width:16px;height:16px;vertical-align:middle}table tbody .profit[data-v-7c6b9abd]{font-size:14px;font-family:PingFangSC,PingFang SC;font-weight:400;color:#ff8f16;line-height:20px}\n",document.head.appendChild(n);var k=function(t){return A("data-v-7c6b9abd"),t=t(),I(),t},C={class:"container"},z={border:"0"},E={class:"item"},F=k((function(){return f("img",{class:"coin",src:a},null,-1)})),T={class:"profit"},q={key:1,style:{width:"100%",height:"100%",position:"fixed"}},D=[k((function(){return f("img",{src:l,style:{width:"81px",height:"50px",position:"absolute",left:"50%",top:"50%",transform:"translate(-50%, -50%)"}},null,-1)}))];e("default",i({__name:"index",setup:function(e){var n=r(!1),a=r(!1),l=r(!1),i=0,A=r(null),I=null,k=null;function L(){i=0,O()}function O(){if(null!=I&&""!=I){if(l.value)console.log("没有更多数据了");else if(!a.value&&!n.value){0==i?a.value=!0:n.value=!0;_.post("/manager/guildh5/page/guild/settle/info",{condition:{settleId:k,settleTime:I},pageNum:i+1,pageSize:20}).then((function(e){0==i?(A.value=e.data,a.value=!1):(A.value.data.list=[].concat(t(A.value.data.list),t(e.data.data.list)),n.value=!1),i++,(null==A.value.data.list||A.value.data.list.length<20)&&(l.value=!0)})).catch((function(t){console.log(t)}))}}else console.log("结束时间为空")}return u((function(){document.documentElement.scrollTop=0;var t=d();I=t.query.endTime,k=t.query.settleId,O()})),function(t,e){return c(),s(v,null,[f("div",C,[g(o,{title:b(y)("Withdrawal details")},null,8,["title"])]),null!=b(A)?(c(),p(S,{key:0,class:"list",onLoadMore:O,onRefresh:L,loadingMore:n.value,refreshing:a.value,noMoreData:l.value},{content:h((function(){return[f("table",null,[f("thead",z,[f("tr",null,[f("th",null,m(b(y)("Host nickname")),1),f("th",null,m(b(y)("Earnings")),1),f("th",null,m(b(y)("Your earnings")),1)])]),f("tbody",null,[null!=b(A)?(c(!0),s(v,{key:0},x(b(A).data.list,(function(t){return c(),s("tr",E,[f("td",null,m(t.nickname),1),f("td",null,[w(m(b(M)(t.paidCoins)),1),F]),f("td",T,"+"+m(b(M)(t.guildUsdFee))+"$",1)])})),256)):j("",!0)])])]})),_:1},8,["loadingMore","refreshing","noMoreData"])):(c(),s("div",q,D))],64)}}},[["__scopeId","data-v-7c6b9abd"]]))}}}))}();
