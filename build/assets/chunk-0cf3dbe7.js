import{r as c,j as e,c as d,R as l}from"./chunk-74cc0e19.js";import{s as n,m as u}from"./chunk-ea3abdf7.js";const m=()=>{const[t,s]=c.useState(0),o="https://github.com/guocaoyi/create-chrome-ext",r=()=>{t>0&&s(t-1)},a=()=>s(t+1);return c.useEffect(()=>{n.get(["count"],i=>{s(i.count||0)})},[]),c.useEffect(()=>{n.set({count:t}),u.send({type:"COUNT",count:t})},[t]),e.jsxs("main",{children:[e.jsx("h3",{children:"Popup Page"}),e.jsxs("div",{className:"calc",children:[e.jsx("button",{onClick:r,disabled:t<=0,children:"-"}),e.jsx("label",{children:t}),e.jsx("button",{onClick:a,children:"+"})]}),e.jsx("a",{href:o,target:"_blank",children:"generated by create-chrome-ext"})]})};d.createRoot(document.getElementById("app")).render(e.jsx(l.StrictMode,{children:e.jsx(m,{})}));