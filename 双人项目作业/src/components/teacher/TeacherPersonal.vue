<template>
  <div class="layout">
    <Modal v-model="editpersonalflag" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">修改个人信息</h3>
      <Form ref="saveForm" :model="saveForm" :label-width="100" label-position="right">
        <FormItem label="昵称">
          <Input v-model="saveForm.username" ></Input>
        </FormItem>
        <FormItem label="部门" prop="newPass">
          <Input v-model="saveForm.briefcase"  ></Input>
        </FormItem>
        <FormItem label="学校" prop="rePass">
          <Input v-model="saveForm.school"  ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="canclepersonal">取消</Button>
        <Button type="primary"  @click="savepersonal">保存</Button>
      </div>
    </Modal>
    <Layout>
      <Header>
          <div class="layout-nav">
            <label style="font-family:'Helvetica Neue' ;font-size:20px; color: white" >
              <Icon type="md-person" size="30"></Icon>
              {{userForm.identity + userForm.username}}
            </label>
          </div>
      </Header>
      <Content>
        <div style="margin-left: -500px;margin-top: 2%">
          <label style="width: 10px;margin-left:2px;height: 2%;font-size: 20px">用户名</label>
          <Input id="useridInput" type="textarea" :rows="2" style="width: 250px;margin-left: 3px;" v-model="userForm.userid" readonly />
        </div>
        <div style="margin-left: -500px;margin-top: 2%">
          <label style="width: 10px;margin-left:2px;height: 2%;font-size: 20px">昵　称</label>
          <Input id="usernameInput" type="textarea" :rows="2"  style="width: 250px;margin-left: 3px;" v-model="userForm.username" readonly />
        </div>
        <div style="margin-left: -500px;margin-top: 2%">
          <label style="width: 10px;margin-left:2px;height: 2%;font-size: 20px">身　份</label>
          <Input id="identityInput" type="textarea" :rows="2"  style="width: 250px;margin-left: 3px;" v-model="userForm.identity" readonly />
        </div>
        <div style="margin-left: -500px;margin-top: 2%">
          <label style="width: 10px;margin-left:2px;height: 2%;font-size: 20px">部　门</label>
          <Input id="briefcaseInput" type="textarea" :rows="2"  style="width: 250px;margin-left: 3px;" v-model="userForm.briefcase" readonly />
        </div>
        <div style="margin-left: -500px;margin-top: 2%">
          <label style="width: 10px;margin-left:2px;height: 2%;font-size: 20px">学　校</label>
          <Input id="schollInput" type="textarea" :rows="2"  style="width: 250px;margin-left: 3px;" v-model="userForm.school" readonly />
        </div>
        <ButtonGroup style="margin-top: 10%">
        <Button type="info" style="width: 55px;margin-left: -50px" @click="editpersonal">编辑</Button>
          <Button type="info" style="width: 55px;margin-left: 50px" @click="getback">返回</Button>
        </ButtonGroup>
      </Content>
    </Layout>
  </div>
</template>
<script>
  import MenuItem from "iview/src/components/menu/menu-item";

  export default {
    components: {MenuItem},
    data(){
      return {
        editpersonalflag:false,
        userForm:{
          userid:'',
          username:'',
          identity:'',
          briefcase:'',
          school:'',
        },
        saveForm:{
          username:'',
          briefcase:'',
          school:'',
        },
      }
    },
    methods : {
      editpersonal(){
        this.editpersonalflag=true
      },
      savepersonal(){
        var self = this
        this.$http.get('api/UserController/editpersonal/'+this.userForm.userid+'/'+this.saveForm.username+
        '/'+this.saveForm.briefcase+'/'+this.saveForm.school,{
        }).then(function (response) {
          self.userForm.username=self.saveForm.username
          self.userForm.briefcase=self.saveForm.briefcase
          self.userForm.school=self.saveForm.school
          self.$Message.success("保存成功")
          self.editpersonalflag=false
        }).catch(function (error) {
          self.$Message.warning("保存失败")
        })

      },
      canclepersonal(){
        this.editpersonalflag=false
        this.saveForm.username=this.userForm.username
        this.saveForm.briefcase=this.userForm.briefcase
        this.saveForm.school=this.userForm.school
      },
      getback(){
        this.$router.push({name:"teacherhome"})
      }
    },
    created(){
      this.userForm.userid=window.localStorage.getItem("userID")
      var self=this
      this.$http.get('api/UserController/getpersonal/'+this.userForm.userid,{
      }).then(function (response){
        //根据得到的信息进行排布
        var array=response.data.split(";")
        self.userForm.username=array[0]
        self.userForm.identity=array[1]
        self.userForm.briefcase=array[4]
        self.userForm.school=array[3]
        self.saveForm.username=self.userForm.username
        self.saveForm.briefcase=self.userForm.briefcase
        self.saveForm.school=self.userForm.school
      }).catch(function(error){
        self.$Message.error("错误")
      })
    },

  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    border-radius: 4px;
    overflow: hidden;
  }

  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
