import{_ as p,o as u,a as d,c as s,P as l,E as v,b as n,d as _,F as f,r as m,e as g,A as o,f as t,g as h,p as y,h as k,i as E}from"./index.8f8c5eff.js";const x={setup(){return u(()=>{d.getMyTickets()}),{account:s(()=>o.account),events:s(()=>o.events),attendee:s(()=>o.attendee),async getMyTickets(){try{await d.getMyTickets()}catch(e){l.error(e,"getting my events")}}}},components:{EventCard:v}},C=e=>(y("data-v-068f6f09"),e=e(),k(),e),M={key:0,class:"container-fluid page-bg text-shadow"},S={class:"row"},w=C(()=>_("h2",null,"My Upcoming Events",-1)),A={class:"col-md-4 p-3",title:"Event Details"};function B(e,I,P,a,T,b){var c;const i=E("EventCard");return(c=a.account)!=null&&c.id?(t(),n("div",M,[_("div",S,[w,(t(!0),n(f,null,m(a.events,r=>(t(),n("div",A,[(t(),h(i,{events:r.event,key:r.id},null,8,["events"]))]))),256))])])):g("",!0)}const N=p(x,[["render",B],["__scopeId","data-v-068f6f09"]]);export{N as default};