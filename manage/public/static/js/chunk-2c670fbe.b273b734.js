(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2c670fbe"],{"365c":function(t,e,n){"use strict";n.d(e,"d",(function(){return s})),n.d(e,"k",(function(){return o})),n.d(e,"b",(function(){return i})),n.d(e,"g",(function(){return l})),n.d(e,"m",(function(){return d})),n.d(e,"o",(function(){return f})),n.d(e,"h",(function(){return p})),n.d(e,"j",(function(){return b})),n.d(e,"a",(function(){return m})),n.d(e,"f",(function(){return g})),n.d(e,"c",(function(){return h})),n.d(e,"i",(function(){return j})),n.d(e,"e",(function(){return v})),n.d(e,"l",(function(){return _})),n.d(e,"n",(function(){return O}));var r=n("db72"),a=n("bc3a"),u=n.n(a),c="http://localhost:5000",s=function(t){return u.a.post(c+"/createuser",Object(r["a"])({},t))},o=function(){return u.a.post(c+"/getallstudents")},i=function(t){return u.a.post(c+"/addstudent",Object(r["a"])({},t))},l=function(t){return u.a.post(c+"/deletestudent",{_id:t})},d=function(t){return u.a.post(c+"/getstudentbyid",{_id:t})},f=function(t,e){return u.a.post(c+"/updatestudent",Object(r["a"])({_id:t},e))},p=function(t){return u.a.post(c+"/findstudent",Object(r["a"])({},t))},b=function(){return u.a.post(c+"/getallheadmasters")},m=function(t){return u.a.post(c+"/addheadmaster",Object(r["a"])({},t))},g=function(t){return u.a.post(c+"/deleteheadmaster",{_id:t})},h=function(t){return u.a.post(c+"/createclass",Object(r["a"])({},t))},j=function(){return u.a.post(c+"/getallclass")},v=function(t){return u.a.post(c+"/deleteclass",{_id:t})},_=function(t){return u.a.post(c+"/getclassbyid",{_id:t})},O=function(t,e){return u.a.post(c+"/updateclass",Object(r["a"])({_id:t},e))}},5460:function(t,e,n){"use strict";n.r(e);var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("el-table",{staticStyle:{width:"150%"},attrs:{data:t.tableData}},[n("el-table-column",{attrs:{align:"center",label:"姓名",prop:"name"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"性别",prop:"sex"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"学院",prop:"college"}}),t._v(" "),n("el-table-column",{attrs:{align:"center",label:"入职日期",prop:"entryDate"}}),t._v(" "),t.level>=2?n("el-table-column",{attrs:{align:"center",label:"操作"},scopedSlots:t._u([{key:"default",fn:function(e){return[n("el-button",{staticStyle:{"margin-top":"3px"},attrs:{size:"mini",type:"danger"},on:{click:function(n){return t.handleDelete(e.row._id)}}},[t._v("删除")])]}}],null,!1,3844853354)}):t._e()],1)],1)},a=[],u=n("75fc"),c=(n("96cf"),n("3b8d")),s=n("db72"),o=n("365c"),i=n("2f62"),l={data:function(){return{tableData:[]}},created:function(){this.getallheadmasters()},computed:Object(s["a"])({},Object(i["b"])(["level"])),methods:{getallheadmasters:function(){var t=Object(c["a"])(regeneratorRuntime.mark((function t(){var e,n,r;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,Object(o["j"])();case 2:e=t.sent,n=e.data,r=e.status,200==r?this.tableData=[].concat(Object(u["a"])(this.tableData),Object(u["a"])(n.data)):alert(n.msg);case 6:case"end":return t.stop()}}),t,this)})));function e(){return t.apply(this,arguments)}return e}(),handleDelete:function(t){var e=this;this.$confirm("此操作将永久删除该项, 是否继续?","提示",{confirmButtonText:"确定",cancelButtonText:"取消",type:"warning"}).then(function(){var n=Object(c["a"])(regeneratorRuntime.mark((function n(r){var a,u;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,Object(o["f"])(t);case 2:if(a=n.sent,u=a.data,0!=u.code){n.next=7;break}return e.tableData=e.tableData.filter((function(e){return e._id!=t})),n.abrupt("return",e.$message.success(u.msg));case 7:e.$message({type:"error",message:u.msg});case 8:case"end":return n.stop()}}),n)})));return function(t){return n.apply(this,arguments)}}()).catch((function(t){e.$message({type:"info",message:"已取消删除"})}))}}},d=l,f=n("2877"),p=Object(f["a"])(d,r,a,!1,null,null,null);e["default"]=p.exports}}]);