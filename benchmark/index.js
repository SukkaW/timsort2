var L=class{static randomInt(e){let r=[];for(let o=0;o<e;o++)r.push(Math.floor(Math.random()*9007199254740992));return r}static descendingInt(e){let r=[];for(let o=0;o<e;o++)r.push(e-o);return r}static ascendingInt(e){let r=[];for(let o=0;o<e;o++)r.push(o);return r}static ascending3RandomExchangesInt(e){let r=[];for(let o=0;o<e;o++)r.push(o);for(let o=0;o<1;o++){let s=Math.floor(Math.random()*e),f=Math.floor(Math.random()*e),n=r[s];r[s]=r[f],r[f]=n}return r}static ascending10RandomEndInt(e){let r=[];for(let s=0;s<e;s++)r.push(s);let o=Math.max(0,e-10);for(let s=o;s<e;s++)r[s]=Math.floor(Math.random()*e);return r}static allEqualInt(e){let r=[];for(let o=0;o<e;o++)r.push(42);return r}static manyDuplicateInt(e){let r=[];for(let o=0;o<e;o++)r.push(Math.floor(Math.random()*(e/2*(Math.log(e)/Math.LN10))));return r}static someDuplicateInt(e){let r=[];for(let o=0;o<e;o++)r.push(Math.floor(Math.random()*e));return r}};var E=[1,10,100,1e3,1e4,1e5,1e6,1e7,1e8,1e9],_=class{array=null;compare=null;length=0;minGallop=7;runLength=null;runStart=null;stackLength=0;stackSize=0;tmpStorageLength=256;constructor(e,r){this.array=e,this.compare=r,this.length=e.length,this.length<2*256&&(this.tmpStorageLength=this.length>>>1),this.tmp=new Array(this.tmpStorageLength),this.stackLength=this.length<120?5:this.length<1542?10:this.length<119151?19:40,this.runStart=new Array(this.stackLength),this.runLength=new Array(this.stackLength)}forceMergeRuns(){for(;this.stackSize>1;){let e=this.stackSize-2;e>0&&this.runLength[e-1]<this.runLength[e+1]&&e--,this.mergeAt(e)}}mergeAt(e){let r=this.compare,o=this.array,s=this.runStart[e],f=this.runLength[e],n=this.runStart[e+1],u=this.runLength[e+1];this.runLength[e]=f+u,e===this.stackSize-3&&(this.runStart[e+1]=this.runStart[e+2],this.runLength[e+1]=this.runLength[e+2]),this.stackSize--;let t=w(o[n],o,s,f,0,r);s+=t,f-=t,f!==0&&(u=R(o[s+f-1],o,n,u,u-1,r),u!==0&&(f<=u?this.mergeLow(s,f,n,u):this.mergeHigh(s,f,n,u)))}mergeHigh(e,r,o,s){let f=this.compare,n=this.array,u=this.tmp,t=0;for(t=0;t<s;t++)u[t]=n[o+t];let c=e+r-1,l=s-1,m=o+s-1,a=0,h=0;if(n[m--]=n[c--],--r===0){for(a=m-(s-1),t=0;t<s;t++)n[a+t]=u[t];return}if(s===1){for(m-=r,c-=r,h=m+1,a=c+1,t=r-1;t>=0;t--)n[h+t]=n[a+t];n[m]=u[l];return}let d=this.minGallop;for(;;){let b=0,p=0,g=!1;do if(f(u[l],n[c])<0){if(n[m--]=n[c--],b++,p=0,--r===0){g=!0;break}}else if(n[m--]=u[l--],p++,b=0,--s===1){g=!0;break}while((b|p)<d);if(g)break;do{if(b=r-w(u[l],n,e,r,r-1,f),b!==0){for(m-=b,c-=b,r-=b,h=m+1,a=c+1,t=b-1;t>=0;t--)n[h+t]=n[a+t];if(r===0){g=!0;break}}if(n[m--]=u[l--],--s===1){g=!0;break}if(p=s-R(n[c],u,0,s,s-1,f),p!==0){for(m-=p,l-=p,s-=p,h=m+1,a=l+1,t=0;t<p;t++)n[h+t]=u[a+t];if(s<=1){g=!0;break}}if(n[m--]=n[c--],--r===0){g=!0;break}d--}while(b>=7||p>=7);if(g)break;d<0&&(d=0),d+=2}if(this.minGallop=d,d<1&&(this.minGallop=1),s===1){for(m-=r,c-=r,h=m+1,a=c+1,t=r-1;t>=0;t--)n[h+t]=n[a+t];n[m]=u[l]}else{if(s===0)throw new Error("mergeHigh preconditions were not respected");for(a=m-(s-1),t=0;t<s;t++)n[a+t]=u[t]}}mergeLow(e,r,o,s){let f=this.compare,n=this.array,u=this.tmp,t=0;for(t=0;t<r;t++)u[t]=n[e+t];let c=0,l=o,m=e;if(n[m++]=n[l++],--s===0){for(t=0;t<r;t++)n[m+t]=u[c+t];return}if(r===1){for(t=0;t<s;t++)n[m+t]=n[l+t];n[m+s]=u[c];return}let a=this.minGallop;for(;;){let h=0,d=0,b=!1;do if(f(n[l],u[c])<0){if(n[m++]=n[l++],d++,h=0,--s===0){b=!0;break}}else if(n[m++]=u[c++],h++,d=0,--r===1){b=!0;break}while((h|d)<a);if(b)break;do{if(h=w(n[l],u,c,r,0,f),h!==0){for(t=0;t<h;t++)n[m+t]=u[c+t];if(m+=h,c+=h,r-=h,r<=1){b=!0;break}}if(n[m++]=n[l++],--s===0){b=!0;break}if(d=R(u[c],n,l,s,0,f),d!==0){for(t=0;t<d;t++)n[m+t]=n[l+t];if(m+=d,l+=d,s-=d,s===0){b=!0;break}}if(n[m++]=u[c++],--r===1){b=!0;break}a--}while(h>=7||d>=7);if(b)break;a<0&&(a=0),a+=2}if(this.minGallop=a,a<1&&(this.minGallop=1),r===1){for(t=0;t<s;t++)n[m+t]=n[l+t];n[m+s]=u[c]}else{if(r===0)throw new Error("mergeLow preconditions were not respected");for(t=0;t<r;t++)n[m+t]=u[c+t]}}mergeRuns(){for(;this.stackSize>1;){let e=this.stackSize-2;if(e>=1&&this.runLength[e-1]<=this.runLength[e]+this.runLength[e+1]||e>=2&&this.runLength[e-2]<=this.runLength[e]+this.runLength[e-1])this.runLength[e-1]<this.runLength[e+1]&&e--;else if(this.runLength[e]>this.runLength[e+1])break;this.mergeAt(e)}}pushRun(e,r){this.runStart[this.stackSize]=e,this.runLength[this.stackSize]=r,this.stackSize+=1}};function k(i,e,r,o){if(!Array.isArray(i))throw new TypeError("Can only sort arrays");e?typeof e!="function"&&(o=r,r=e,e=M):e=M,r||(r=0),o||(o=i.length);let s=o-r;if(s<2)return;let f=0;if(s<32){f=G(i,r,o,e),T(i,r,o,r+f,e);return}let n=new _(i,e),u=D(s);do{if(f=G(i,r,o,e),f<u){let t=s;t>u&&(t=u),T(i,r,r+t,r+f,e),f=t}n.pushRun(r,f),n.mergeRuns(),s-=f,r+=f}while(s!==0);n.forceMergeRuns()}function M(i,e){if(i===e)return 0;if(~~i===i&&~~e===e){if(i===0||e===0)return i<e?-1:1;if(i<0||e<0){if(e>=0)return-1;if(i>=0)return 1;i=-i,e=-e}let s=S(i),f=S(e),n=0;return s<f?(i*=E[f-s-1],e/=10,n=-1):s>f&&(e*=E[s-f-1],i/=10,n=1),i===e?n:i<e?-1:1}let r=String(i),o=String(e);return r===o?0:r<o?-1:1}function T(i,e,r,o,s){for(o===e&&o++;o<r;o++){let f=i[o],n=e,u=o;for(;n<u;){let c=n+u>>>1;s(f,i[c])<0?u=c:n=c+1}let t=o-n;switch(t){case 3:i[n+3]=i[n+2];case 2:i[n+2]=i[n+1];case 1:i[n+1]=i[n];break;default:for(;t>0;)i[n+t]=i[n+t-1],t--}i[n]=f}}function R(i,e,r,o,s,f){let n=0,u=0,t=1;if(f(i,e[r+s])>0){for(u=o-s;t<u&&f(i,e[r+s+t])>0;)n=t,t=(t<<1)+1,t<=0&&(t=u);t>u&&(t=u),n+=s,t+=s}else{for(u=s+1;t<u&&f(i,e[r+s-t])<=0;)n=t,t=(t<<1)+1,t<=0&&(t=u);t>u&&(t=u);let c=n;n=s-t,t=s-c}for(n++;n<t;){let c=n+(t-n>>>1);f(i,e[r+c])>0?n=c+1:t=c}return t}function w(i,e,r,o,s,f){let n=0,u=0,t=1;if(f(i,e[r+s])<0){for(u=s+1;t<u&&f(i,e[r+s-t])<0;)n=t,t=(t<<1)+1,t<=0&&(t=u);t>u&&(t=u);let c=n;n=s-t,t=s-c}else{for(u=o-s;t<u&&f(i,e[r+s+t])>=0;)n=t,t=(t<<1)+1,t<=0&&(t=u);t>u&&(t=u),n+=s,t+=s}for(n++;n<t;){let c=n+(t-n>>>1);f(i,e[r+c])<0?t=c:n=c+1}return t}function S(i){return i<1e5?i<100?i<10?0:1:i<1e4?i<1e3?2:3:4:i<1e7?i<1e6?5:6:i<1e9?i<1e8?7:8:9}function G(i,e,r,o){let s=e+1;if(s===r)return 1;if(o(i[s++],i[e])<0){for(;s<r&&o(i[s],i[s-1])<0;)s++;F(i,e,s)}else for(;s<r&&o(i[s],i[s-1])>=0;)s++;return s-e}function D(i){let e=0;for(;i>=32;)e|=i&1,i>>=1;return i+e}function F(i,e,r){for(r--;e<r;){let o=i[e];i[e++]=i[r],i[r--]=o}}var N=(i,e)=>i-e,O=[10,100,1e3,1e4],U=i=>Math.floor(12e6/(i*(Math.log(i)/Math.LN10))),A=class{str;constructor(){this.str=""}addAt(e,r){for(;r>this.str.length;)this.str+=" ";this.str+=e.toString()}toString(){return this.str}},I=class{defaultResults;timsortResults;constructor(){this.defaultResults={},this.timsortResults={}}runBenchmark(){let e=new A;e.addAt("ArrayType",0),e.addAt("Length",30),e.addAt("TimSort",37),e.addAt("array.sort",47),e.addAt("Speedup",59),console.log(e.toString());let r=[{name:"randomInt",fn:L.randomInt},{name:"descendingInt",fn:L.descendingInt},{name:"ascendingInt",fn:L.ascendingInt},{name:"ascending3RandomExchangesInt",fn:L.ascending3RandomExchangesInt},{name:"ascending10RandomEndInt",fn:L.ascending10RandomEndInt},{name:"allEqualInt",fn:L.allEqualInt},{name:"manyDuplicateInt",fn:L.manyDuplicateInt},{name:"someDuplicateInt",fn:L.someDuplicateInt}];for(let{name:o,fn:s}of r){this.defaultResults[o]={},this.timsortResults[o]={};for(let f of O){let{defaultTime:n,timsortTime:u}=this.benchmarkGenerator(s,f);this.defaultResults[o][f]=n,this.timsortResults[o][f]=u;let t=new A;t.addAt(o,0),t.addAt(f,30),t.addAt(Math.floor(u),37),t.addAt(Math.floor(n),47);let c=u!==0?(n/u).toFixed(2):"N/A";t.addAt(c,59),console.log(t.toString())}}}benchmarkGenerator(e,r){let o=0,s=0,f=U(r);for(let n=0;n<f;n++){let u=e(r),t=u.slice(),c=process.hrtime();u.sort(N);let l=process.hrtime(),m=c[0]*1e9+c[1],a=l[0]*1e9+l[1];o+=a-m;let h=process.hrtime();k(t,N);let d=process.hrtime(),b=h[0]*1e9+h[1],p=d[0]*1e9+d[1];s+=p-b}return{defaultTime:o/f,timsortTime:s/f}}getDefaultResults(){return this.defaultResults}getTimsortResults(){return this.timsortResults}};console.log("Starting benchmark...");var z=new I;z.runBenchmark();console.log("Benchmark completed.");
