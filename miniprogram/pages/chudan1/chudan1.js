var app = getApp()
//获取页面栈
var pages=getCurrentPages()
//获取当前页面对象(第一个元素首页，最后一个元素是当前页面)
var currentPage=pages[pages.length-1]

Page({
  data: {
    // show: "",
    userName:"",
    zhenjiantype:"",
    zhenjianno:"",
    rationcode:"EDA7845",
    amount:"32000元",
    fee:"10元",
    period:"3天",
    bztext: " 进出景点 的意外伤害身故、伤残、烧伤 :30000元 \n"+
              "进出景点 发生的意外伤害医疗 : 2000元",

    avatarUrl: './user-unlogin.png',
    userInfo: {},
    logged: false,
    takeSession: false,
    requestResult: '',

    show: false,
    startdate:"请选择生效日",
    enddate:"请先选择生效日",
    currentDate: new Date().getTime(),
    currentDate1: new Date().getTime()+60*60*24*7,
    minDate: new Date().getTime(),
    minDate1: new Date().getTime() + 60 * 60 * 24 * 7,
    formatter(type, value) {
      if (type === 'year') {
        return `${value}年`;
      } else if (type === 'month') {
        return `${value}月`;
      }
      return value;
    },
    // minHour: 10,
    // maxHour: 20,
    // minDate: new Date().getTime(),
    // maxDate: new Date(2019, 10, 1).getTime(),
    // currentDate: new Date().getTime(),


    selectArray: [{
      "id": "10",
      "text": "身份证"
    }, {
      "id": "11",
        "text": "驾驶证"
      }, {
        "id": "12",
        "text": "军官证"
      }, {
        "id": "13",
        "text": "港澳台胞证"
      }, {
        "id": "14",
        "text": "其它"
      },]
    // selectShow: false,//控制下拉列表的显示隐藏，false隐藏、true显示
    // selectData: ['身份证', '驾驶证', '军官证', '军官证', '港澳台胞证', '其它'],//下拉列表的数据
    // index: 0,//选择的下拉列表下标
  },

  // // 点击下拉显示框
  // selectTap() {
  //   this.setData({
  //     selectShow: !this.data.selectShow
  //   });
  // },
  // // 点击下拉列表
  // optionTap(e) {
  //   let Index = e.currentTarget.dataset.index;//获取点击的下拉列表的下标
  //   this.setData({
  //     index: Index,
  //     selectShow: !this.data.selectShow
  //   });
  // },

//获取用户输入值
  userName:function(res){
    // console.log(res.detail.value);//打印输入的值
    this.setData({
      userName: res.detail.value, //赋值
    })
  },
  getDate: function (e) {
    console.log(e.detail)
      this.setData({
      zhenjiantype: e.detail.id, //赋值
    })
  },
  // zhenjiantype: function (res) {
  //   // console.log(res.detail.value);//打印输入的值
  //   this.setData({
  //     zhenjiantype: res.detail.value, //赋值
  //   })
  // },
  zhenjianno: function (res) {
    // console.log(res.detail.value);//打印输入的值
    this.setData({
      zhenjianno: res.detail.value, //赋值
    })
  },
  rationcode: function (res) {
    // console.log(res.detail.value);//打印输入的值
    this.setData({
      rationcode: res.detail.value, //赋值
    })
  },

//出单
  bean_json: function () {
    var that = this;
    console.log(this.data.userName  + this.data.zhenjiantype  +
      this.data.zhenjianno + this.data.rationcode);

    if (this.data.userName.length == 0 || this.data.zhenjiantype.length==0 ||
      this.data.zhenjianno.length == 0 || this.data.rationcode.length == 0 || this.data.startdate.indexOf("请") != -1  ) {
      wx.showToast({
        title: '有输入框未填写,出单失败！',
        icon: 'none',
        duration: 1500
      })
    }else{

      //这一步是为了把模板语言转化成js语言
      var userName = this.data.userName;
      var tu = this.data.zhenjiantype;   
      var bztext=this.data.bztext;
      var startdate=this.data.startdate;
      var enddate=this.data.enddate;
      var fee=this.data.fee;
      var period=this.data.period; 
        //生成测试保单号
        let differ = 9999 - 1000;
        let random = Math.random();
        var num= (1000 + differ * random).toFixed(0);
        var policyno =  "PEDA20201347845A" + num;
        that.setData({
          policyno: policyno
        })

       wx.navigateTo({
         url: '/pages/chudanSuccess/chudanSuccess?userName=' + userName + "&bztext=" + bztext + "&startdate=" + startdate
           + "&enddate=" + enddate + "&fee=" + fee + "&period=" + period + "&policyno=" + policyno
        });


      //调出单接口
    // wx.request({
    //   url: 'http://192.168.66.229:8080/wxtest/user/bean2json.mn',
    //   data: {        
    //     id: 1,
    //     username: this.data.userName,
    //     age: this.data.zhenjiantype
    //     },
    //   method: 'POST',
    //   header: {
    //     "Content-Type": "application/x-www-form-urlencoded"
    //   },
    //   chudanform:function(e){
    //     console.log("用户名称为"+e.detail.value.userName);
    //     // console.log("用户名称为" + e.detail.value.userName);
    //   },
    //   fail: function () {
    //     console.log("接口调用失败 fail");
    //     let differ = 9999 - 1000;
    //     let random = Math.random();
    //     var num= (1000 + differ * random).toFixed(0);
    //     var policyno = "调用接口失败，生成测试保单号为" + "PEDA20201347845A" + num;
    //     that.setData({
    //       policyno: policyno
    //     })
    //   },
    //   complete: function () {
    //     console.log("complete");
        
    //   },
    //   success: function (res) {
    //     // console.log("用户名称"+currentPage.userName)
    //     console.log("success" + res.data.username + "保单号" + res.data.policyno);
    //     var show = "对象转json username :"+res.data.username+"+age: "+res.data.age;
    //     that.setData({
    //       show: show
    //     })
    //     if (res.data.policyno) {
    //       var policyno = "出单成功，保单号为" + res.data.policyno;
    //       that.setData({
    //         policyno: policyno
    //       })
    //     }
    //   }
    // })
    };
  },
  listbean_json: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/springMVC/user/listbean2json.mn',
      data: {
        'listuser[0].username': "Hello",
        'listuser[0].age': 18,
        'listuser[1].username': "World",
        'listuser[1].age': 28
      },
      method: 'GET',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var show = "list<对象>转json ";
        for (var i = 0; i < res.data.length; i++) {
          show += 
          username +":+res.data[i].username+"+
          age +":+res.data[i].age";
        }
        that.setData({
          show: show
        })
      }
    })
  },
  mapbean_json: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/springMVC/user/mapbean2json.mn',
      data: {
        'listuser[0].username': "Hello",
        'listuser[0].age': 48,
        'listuser[1].username': "MINA",
        'listuser[1].age': 58
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var show = "map<String,Obiect>转json ";
        for (var i = 0; i < res.data.detail.length; i++) {
          show += "username: "+res.data.detail[i].username+
          "age: "+res.data.detail[i].age;
        }
        that.setData({
          show: show
        })
      }
    })
  },
  json_json: function (res) {
    var that = this;
    console.log(res.detail.value)
    wx.request({
      url: 'http://localhost:8080/springMVC/user/json2json.mn',
      data: res.detail.value,
      method: 'POST',
      header: {
        "Content-Type": "application/json"
      },
      success: function (res) {
        var show = "表单提交返回jsonusername: "+res.data.username+"age: "+res.data.age;
        that.setData({
          show: show
        })
      }
    })
  },
  onLoad: function () {
  },


  chudan_json: function () {
    var that = this;
    wx.request({
      url: 'http://localhost:8080/springMVC/user/bean2json.mn',
      data: {
        id: 1,
        username: "toBeMN",
        age: 28
      },
      method: 'POST',
      header: {
        "Content-Type": "application/x-www-form-urlencoded"
      },
      success: function (res) {
        var show = "对象转json" +
          username + ":+res.data.username" +
          age + ":+res.data.age";
        that.setData({
          show: show
        })
      }
    })
  },

  showPopFn: function () {
    this.setData({
      show: true 
    })
  },

  onInput(event) {
    // console.log("生效日"+event.detail),
    this.setData({
      // currentDate: event.detail
    });
  },

  onConfirm(event) {
    console.log("生效日点击确认" + event.detail ),
      // String a=new Date(event.detail).getDate();
      console.log("生效日点" + new Date(event.detail).getDate()); 
    console.log("生效日点" + new Date(event.detail).getFullYear());
    console.log("生效日点" + new Date(event.detail).getMonth() + 1);
      // console.log("生效日点击确认后日期" + event.detail.getDate()),
      this.setData({
        show: false,
        currentDate: event.detail,
        enddate: new Date(event.detail).getFullYear() + "年" + (parseInt(new Date(event.detail).getMonth()) + 1 )+ "月" +                   (parseInt(new Date(event.detail).getDate())+7)+"日",
        startdate: new Date(event.detail).getFullYear() + "年" + (parseInt(new Date(event.detail).getMonth()) + 1) + "月"                   + (parseInt(new Date(event.detail).getDate())) + "日",
      });
   
  },

  onCancel(event) {
    console.log("生效日点击取消"+event.detail),
      this.setData({
        show: false,
        currentDate:''
      });
  },


  // onInput1(event) {
  //   console.log("满期日" + event.detail),
  //     this.setData({
  //       // currentDate: event.detail
  //     });
  // },

  // onConfirm1(event) {
  //   console.log("满期日点击确认" + event.detail),
  //     this.setData({
  //       show: false,
  //       currentDate: event.detail
  //     });
  // },

  // onCancel1(event) {
  //   console.log("满期日点击取消" + event.detail),
  //     this.setData({
  //       show: false,
  //       currentDate: ''
  //     });
  // },
  
})