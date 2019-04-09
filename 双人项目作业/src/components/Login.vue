<template>

  <transition
    appear
    appear-class="custom-appear-class"
    appear-active-class="custom-appear-active-class"
  >

    <div class="bg" id="bg" :style="{height: mapHeight}">
      <div class="login" style="margin-top:210px;margin-left: 65%;  " v-if="isshowing">
        <div class="header">
          <div class="switch" id="switch">
            <a class="switch_btn_focus" id="switch_qlogin"  tabindex="7" @click="changetag(0)" >快速登录</a>
            <a class="switch_btn" id="switch_login"  tabindex="8" @click="changetag(1)">快速注册</a><div class="switch_bottom" id="switch_bottom" style="position: absolute; width: 64px; left: 0px;"></div>
          </div>
        </div>

        <Form v-show="tagdisplay.flag1" ref="formCustom" :model="formCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="用户名：" prop="userID" style="margin-top: 20px">
            <i-input type="text" v-model="formCustom.userID" style="width: 250px" >
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="密码：" prop="password">
            <i-input type="password" v-model="formCustom.password" style="width: 250px">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem >
            <Button type="primary" @click="login"  style="margin-left: 2%">登录</Button>
            <Button type="ghost" @click="handleReset" style="margin-left: 5%">重置</Button>
          </FormItem>
        </Form>

        <Form v-show="tagdisplay.flag2" ref="registerformCustom" :model="registerformCustom" :rules="ruleCustom" :label-width="80">
          <FormItem label="用户名：" prop="registeruserID" style="margin-top: 20px">
            <i-input type="text" v-model="registerformCustom.registeruserID" style="width: 250px">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="昵称：" prop="registerName" style="margin-top: 20px">
            <i-input type="text" v-model="registerformCustom.registerName" style="width: 250px">
              <Icon type="ios-person-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="密码：" prop="registerPassword">
            <i-input type="password" v-model="registerformCustom.registerPassword" style="width: 250px">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="密码确认：" prop="registerPasswordComfirm">
            <i-input type="password" v-model="registerformCustom.registerPasswordComfirm" style="width: 250px">
              <Icon type="ios-lock-outline" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="部门：" prop="registerbriefcase">
            <i-input type="text" v-model="registerformCustom.registerbriefcase" style="width: 250px">
              <Icon type="ios-briefcase" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="学校：" prop="registerschool">
            <i-input type="text" v-model="registerformCustom.registerschool" style="width: 250px">
              <Icon type="ios-school" slot="prepend"></Icon>
            </i-input>
          </FormItem>
          <FormItem label="身份：" >
            <RadioGroup v-model="registerformCustom.registerIdentity">
              <Radio label="学生"></Radio>
              <Radio label="研究生"></Radio>
              <Radio label="老师"></Radio>
            </RadioGroup>
          </FormItem>

          <FormItem>
            <Button type="primary" @click="register" style="margin-left: 40px">注册</Button>
            <Button type="ghost" @click="handleReset" style="margin-left: 8px">重置</Button>
          </FormItem>
        </Form>
      </div>

    </div>
  </transition>
</template>


<script>
  import $ from 'jQuery'

  export default {
    created(){
      this.init()
    },

    data () {
      const validateID = (rule, value, callback) => {
        if (value === '') {
          this.formCustom.loginflag=false
          callback(new Error('请输入用户名'))
        }
        else {
          this.formCustom.loginflag=true
          callback()
        }
      };
      const validatePassword = (rule, value, callback) => {
        if (value === '') {
          this.formCustom.loginflag=false
          callback(new Error('请输入密码'))
        }  else {
          this.formCustom.loginflag=true
          callback();
        }
      };

      const validateRegisterName = (rule, value, callback) => {
        if (value === '') {
          this.registerformCustom.registerflag=false
          callback(new Error('请输入昵称'));
        }else{
          this.registerformCustom.registerflag=true
          callback();
        }
      }

      const validateRegisterUserID = (rule, value, callback) => {
        if (value === '') {
          this.registerformCustom.registerflag=false
          callback(new Error('请输入用户名'));
        }else{
          var self = this
          self.$http.get('api/LoginController/check/'+self.registerformCustom.registeruserID)
            .then(function (response) {
              self.exitable=response.data
              if(self.exitable==false){
                //已经存在.不可以注册
                self.registerformCustom.registerflag=false
                callback("用户名已经存在不可以注册")
              }else{
                //不存在,可以注册
                self.registerformCustom.registerflag=true
                callback()
              }
            })
        }
      };

      const validateRegisterPassword = (rule, value, callback) => {
        if (value === '') {
          this.registerformCustom.registerflag=false
          callback(new Error('请输入密码'));
        }  else {
          this.registerformCustom.registerflag=true
          callback();
        }
      };
      const validateRegisterPasswordComfirm = (rule, value, callback) => {
        if (value === '') {
          this.registerformCustom.registerflag=false
          callback(new Error('请再次输入密码'))
        }
        else if(value!=this.registerformCustom.registerPassword){
          this.registerformCustom.registerflag=false
          callback(new Error('密码不匹配'));
        } else{
          this.registerformCustom.registerflag=true
          callback();
        }
      };
      const validateRegisterBriefcase=(rule,value,callback)=>{
        if(value === ''){
          this.registerformCustom.registerflag=false
          callback(new Error('请输入部门'))
        }else{
          this.registerformCustom.registerflag=true
          callback()
        }
      };
      const validateRegisterSchool=(rule,value,callback)=>{
        if (value ===''){
          this.registerformCustom.registerflag=false
          callback(new Error('请输入学校'))
        }else{
          this.registerformCustom.registerflag=true
          callback()
        }
      }

      return {
        exitable:false,
        model1:false,
        model2:false,
        isshowing:false,
        tagdisplay:{
          flag1:true,
          flag2:false
        },
        formCustom: {
          loginflag:true,
          userID: '',
          password: '',
        },
        registerformCustom:{
          registerflag:true,
          registerName:'',
          registeruserID:'',
          registerPassword:'',
          registerPasswordComfirm:'',
          registerIdentity:'学生',
          registerbriefcase:'',
          registerschool:'',
        },


        ruleCustom: {
          userID: [
            { validator: validateID, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          registerName:[
            {validator:validateRegisterName,trigger:'blur'}
          ],
          registeruserID:[
            {validator:validateRegisterUserID,trigger:'blur'}
          ],
          registerPassword:[
            {validator:validateRegisterPassword,trigger:'blur'}
          ],
          registerPasswordComfirm:[
            {validator:validateRegisterPasswordComfirm,trigger:'blur'}
          ],
          registerbriefcase:[
            {validator:validateRegisterBriefcase,trigger:'blur'}
          ],
          registerschool:[
            {validator:validateRegisterSchool,trigger:'blur'}
          ],
        }
      }
    },



    computed: {
      //计算浏览器的高度
      mapHeight() {return $(window).height() +'px'}

    },
    methods: {

      init(){
        this.isshowing=true
      },

      show(){
        console.log("show"+window.localStorage.getItem("code"))
      },


      //登录方法
      login(){
        this.show()
        var self=this
        var identity;
        var name;
        var userID=this.formCustom.userID
        this.$http.get('api/LoginController/login/'+this.formCustom.userID+"/"+this.formCustom.password,{
        })
          .then(function (response) {
            var m = self
            var checkflag=response.data.split(";")
            identity=checkflag[0]
            name=checkflag[1]
            window.localStorage.removeItem("identity")
            window.localStorage.removeItem("name")
            if(identity=='学生') {
              window.localStorage.setItem("identity","学生")
              window.localStorage.setItem("name",name)
              self.$router.push({
                name: 'studenthome',
              })
            }
            else if(identity=='研究生'){
              window.localStorage.setItem("identity","研究生")
              window.localStorage.setItem("name",name)
              self.$router.push({
                name: 'studenthome',
              })
            }
            else if(identity=='老师'){
              window.localStorage.setItem("identity","老师")
              window.localStorage.setItem("name",name)
              self.$router.push({
                name: 'teacherhome',
              })
            }else if(identity=='管理员'){
              window.localStorage.setItem("identity","管理员")
              window.localStorage.setItem("name",name)
              self.$router.push({
                name:'adminhome',
              })
            }
            else {
              m.$Message.error("用户名或密码错误请重新填写")
              m.handleReset()
            }
          } )
          .catch(function (error) { })
        window.localStorage.removeItem("userID");
        window.localStorage.setItem("userID",userID)
        var curtime = new Date().getTime()
        window.localStorage.setItem("time",JSON.stringify(curtime))
      },

      //注册
      register(){
        if (this.registerformCustom.registerflag==true) {
          var self = this
          this.$http.get('api/LoginController/register/' + this.registerformCustom.registerName + "/"
            + this.registerformCustom.registeruserID + '/'
            + this.registerformCustom.registerPassword + '/' + self.registerformCustom.registerIdentity + "/" + self.registerformCustom.registerbriefcase
            + "/" + self.registerformCustom.registerschool, {})
            .then(function (response) {
              var m = self
              m.changetag(0)
              self.$Message.success("注册成功")
              self.handleReset()
            })
            .catch(function (error) {
              console.log(error)
            })

        }
      },

      changetag(num){
        if (num==0){
          this.tagdisplay.flag1=true
          this.tagdisplay.flag2=false
            $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
            $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
            $('#switch_bottom').animate({left:'0px',width:'70px'});
            $('#qlogin').css('display','none');
            $('#web_qr_login').css('display','block');
        }
        else {
          this.tagdisplay.flag1=false
          this.tagdisplay.flag2=true
        }
      },
      handleReset () {
        this.formCustom.userID=''
        this.formCustom.password=''
        this.registerformCustom.registerName=''
        this.registerformCustom.registerbriefcase=''
        this.registerformCustom.registerschool=''
        this.registerformCustom.registerPassword=''
        this.registerformCustom.registerPasswordComfirm=''
        this.registerformCustom.registeruserID=''
      }
    }
  }

  $(function(){

    $('#switch_qlogin').click(function(){
      $('#switch_login').removeClass("switch_btn_focus").addClass('switch_btn');
      $('#switch_qlogin').removeClass("switch_btn").addClass('switch_btn_focus');
      $('#switch_bottom').animate({left:'0px',width:'70px'});
      $('#qlogin').css('display','none');
      $('#web_qr_login').css('display','block');

    });
    $('#switch_login').click(function(){

      $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
      $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
      $('#switch_bottom').animate({left:'154px',width:'70px'});

      $('#qlogin').css('display','block');
      $('#web_qr_login').css('display','none');
    });
    if(getParam("a")=='0')
    {
      $('#switch_login').trigger('click');
    }

  });

  function logintab(){
    scrollTo(0);
    $('#switch_qlogin').removeClass("switch_btn_focus").addClass('switch_btn');
    $('#switch_login').removeClass("switch_btn").addClass('switch_btn_focus');
    $('#switch_bottom').animate({left:'154px',width:'96px'});
    $('#qlogin').css('display','none');
    $('#web_qr_login').css('display','block');

  }

</script>


<style scoped>
  .custom-appear-class{
    transition: opacity 5s;
  }

  .custom-appear-active-class{
    opacity: 0;
  }

  .bg{
    background-image: url('../images/login_bg.jpg');
    background-size: cover;
    border: 1px solid white;
  }

  html,body,.bg{height: 100%;}
  ul {
    padding:0;
    margin:0;
  }
  ul li {
    list-style-type:none;
  }
  a {
    text-decoration:none;
  }
  a:hover {
    text-decoration:none;color:#f00;
  }
  .cl{ clear: both;}
  input[type="text"]:focus, input[type="password"]:focus {
    outline:none;
  }
  input::-ms-clear {
    display:none;
  }
  .login {
    margin:0 auto;
    width:370px;
    border:2px solid #eee;
    border-bottom:none;
    position:relative;
  }
  .header {
    height:50px;
    border-bottom:1px solid #e2e2e2;
    position:relative;
    font-family:"Microsoft Yahei";
  }
  .header .switch {
    height:45px;
    position:absolute;
    left:60px;
    bottom:0;
    font-size:16px;
  }
  .header .switch #switch_qlogin {
    margin-right:85px;
  }
  .header .switch .switch_btn {
    color:#999;
    display:inline-block;
    height:45px;
    line-height:45px;
    outline:none;
    *hide-focus:expression(this.hideFocus=true);
  }
  .header .switch .switch_btn_focus {
    color:#333;
    display:inline-block;
    height:45px;
    line-height:45px;
    outline:none;
    *hide-focus:expression(this.hideFocus=true);
  }
  .header .switch .switch_btn:hover {
    color:#333;
    text-decoration:none;
  }
  .header .switch .switch_btn_focus:hover {
    text-decoration:none;
  }
  #switch_bottom {
    position:absolute;
    bottom:-1px;_bottom:-2px;
    border-bottom:2px solid #848484;
  }

  .web_login {
    width:370px;
    position:relative;
  }
  #web_login{_left:60px;*left:0;}
  .web_login .login_form {
    width:272px;
    margin:0 auto;
  }
  .web_login .reg_form {
    width:300px;
    margin:0 auto;
  }
  .web_login .input-tips {
    float:left;
    margin-top:10px;
    width:50px;
    height:42px;
    font-size:16px;
    line-height:42px;
    font-family:"Hiragino Sans GB", "Microsoft Yahei";
  }
  .web_login .input-tips2 {
    float:left;
    text-align:right;
    padding-right:10px;
    width:75px;
    height:30px;
    font-size:16px;
    margin-top:10px;
    clear:both;
    line-height:30px;
    font-family:"Hiragino Sans GB", "Microsoft Yahei";
  }
  .web_login .inputOuter {
    width:200px;
    height:42px;
    margin-top:10px;
    float:left;

  }
  .web_login .inputOuter2 {
    width:200px;
    margin-top:6px;margin-top:5px\9;
    float:left;

  }
  .web_login .inputstyle {
    width:200px;
    height:38px;
    padding-left:5px;
    line-height:30px;line-height:38px;
    border:1px solid #D7D7D7;
    background:rgba(255, 255, 255, 0.32);;
    color:#333;border-radius:2px;
    font-family:Verdana, Tahoma, Arial;
    font-size:16px;
    ime-mode:disabled;
  }
  .web_login input.inputstyle2:focus,.web_login input.inputstyle:focus{border:1px solid #198BD4;box-shadow:0 0 2px #198BD4;}
  .web_login .inputstyle2 {
    width:200px;
    height:34px;
    padding-left:5px;
    line-height:34px;
    border:1px solid #D7D7D7;
    background:rgba(255, 255, 255, 0.32);
    color:#333;border-radius:2px;
    font-family:Verdana, Tahoma, Arial;
    font-size:16px;
    ime-mode:disabled;
  }
  .web_login .uinArea {
    height:55px;
    position:relative;
    z-index:10;
  }
  .web_login .pwdArea {
    height:55px;
    margin-bottom:10px;
    position:relative;
    z-index:3;
  }
  .web_qr_login {
    position:relative;

    overflow:hidden;
  }

  .login {
    background-color:rgba(255, 255, 255, 0.32);
  }

  h1{margin:80px auto 50px auto;text-align:center;color:#fff;margin-left:-25px;font-size:35px;font-weight: bold;text-shadow: 0px 1px 1px #555;}
  h1 sup{
    font-size: 18px;
    font-style: normal;
    position: absolute;
    margin-left: 10px;}
  .login {border:0;padding:5px 0;
    background: rgba(255,255,255,0.5);;
    margin: 0 auto;
    -webkit-box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, .3);
    box-shadow: 1px 1px 2px 0 rgba(0, 0, 0, .3);}

  .web_login{padding-bottom:20px;}

  .jianyi{color:#fff;text-align:center;margin-top:25px;color:#B3B8C4;}
  .reg_form li {
    height: 55px;
  }

  .web_login input.inputstyle2:focus, .web_login input.inputstyle:focus {
    border: 1px solid #5796f;
    box-shadow: 0 0 0;
  }
  .web_login .reg_form {
    width: 300px;
    margin: 0 auto;
  }
  .web_login .inputstyle2 {border-radius:2px;width:210px;}
  .web_login .input-tips2 {
    padding-right: 5px;
    width: 80px;_width: 75px;_font-size:12px;}
  .button_blue
  {
    display:inline-block;
    float:left;
    height:41px;border-radius:4px;
    background:#2795dc;border:none;cursor:pointer;
    border-bottom:3px solid #0078b3;*border-bottom:none;
    color:#fff;
    font-size:16px;padding:0 10px;*width:140px;
    text-align:center;outline:none;font-family: "Microsoft Yahei",Arial, Helvetica, sans-serif;
  }
  input.button_blue:hover
  {
    background:#0081c1;
    border-bottom:3px solid #006698;*border-bottom:none;
    color:#fff;
    text-decoration:none;
  }
  a.zcxy {text-decoration: underline;line-height:58px;margin-left:15px;color: #959ca8;}
  .web_login .login_form {margin-top:30px;}
  .web_login .uinArea {
    height: 60px;}
  .header .switch{left:70px;}
</style>
