import{ca as a,k as o,n}from"./chunk-64ETKUOG.js";var i={production:!1,api:"https://api.artic.edu/api/v1/artworks",serverStaticPath:"http://localhost:4200/"};var g=(()=>{class r{constructor(t){this.http=t}getArts(t){let e=`?page=${t.page}`;return this.http.get(`${i.api}${e}`)}getSomeArts(t){return this.http.get(`${i.api}?ids=${t}`)}getArt(t){return this.http.get(`${i.api}/${t}`)}getSearchArts(t){let e=!!t?.query?.length,s=`${e?"/search":""}`,p=`?page=${t.page}${e?`&q=${t.query}`:""}`;return this.http.get(`${i.api}${s}${p}`)}static{this.\u0275fac=function(e){return new(e||r)(n(a))}}static{this.\u0275prov=o({token:r,factory:r.\u0275fac,providedIn:"root"})}}return r})();export{g as a};