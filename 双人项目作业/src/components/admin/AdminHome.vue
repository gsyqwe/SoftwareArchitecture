<template>
  <div class="layout">
    <!--通知信息-->
    <Modal v-model="messageexit" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">用户个人信息更改</h3>
          {{messagaedata}}
      <div slot="footer">
        <Button type="text" @click="canclemessage">关闭</Button>
      </div>
    </Modal>
    <!--借书记录-->
    <Modal v-model="borrowbook" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">借书记录</h3>
      {{borrowidentity}}  {{borrowname}} 的借书记录
      <Table border :columns="borrowcolumns" :data="borrowdata">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
      </Table>
      <div slot="footer">
        <Button type="text" @click="cancleborrow">关闭</Button>
      </div>
    </Modal>
    <!--逾期罚款-->
    <Modal v-model="penaltyexit" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">逾期记录</h3>
      {{penaltyidentity}}  {{penaltyname}} 的逾期记录
      <br>
      并且当前逾期罚款为{{Fine}}
      <Table border :columns="penaltycolumns" :data="penaltydata">
        <template slot-scope="{ row }" slot="name">
          <strong>{{ row.name }}</strong>
        </template>
      </Table>
      <div slot="footer">
        <Button type="text" @click="canclepenalty">关闭</Button>
      </div>
    </Modal>
    <!--编辑书籍的Model-->
    <Modal v-model="editexit" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">编辑</h3>
      <Form ref="editbook" :model="editbook" :label-width="100" label-position="right">
        <FormItem label="书籍名称" >
          <Input v-model="editbook.bookname"  ></Input>
        </FormItem>
        <FormItem label="书籍种类" prop="rePass">
          <Input v-model="editbook.category"  ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancleeditbook">取消</Button>
        <Button type="primary"  @click="editbookin">保存</Button>
      </div>
    </Modal>
    <!--编辑学生的Model-->
    <Modal v-model="editstudentexit" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">编辑</h3>
      <Form ref="editstudent" :model="editstudent" :label-width="100" label-position="right">
        <FormItem label="学生昵称">
          <Input v-model="editstudent.editname" ></Input>
        </FormItem>
        <FormItem label="学生身份" >
          <Input v-model="editstudent.editidentitiy"  ></Input>
        </FormItem>
        <FormItem label="学生部门" prop="rePass">
          <Input v-model="editstudent.editbriefcase"  ></Input>
        </FormItem>
        <FormItem label="学生学校" prop="rePass">
          <Input v-model="editstudent.editschool"  ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancleeditstudent">取消</Button>
        <Button type="primary"  @click="editstudentin">保存</Button>
      </div>
    </Modal>
    <!--编辑研究生的Model-->
    <Modal v-model="editmasterexit" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">编辑</h3>
      <Form ref="editmaster" :model="editmaster" :label-width="100" label-position="right">
        <FormItem label="研究生昵称">
          <Input v-model="editmaster.editname" ></Input>
        </FormItem>
        <FormItem label="研究生身份" >
          <Input v-model="editmaster.editidentitiy"  ></Input>
        </FormItem>
        <FormItem label="研究生部门" prop="rePass">
          <Input v-model="editmaster.editbriefcase"  ></Input>
        </FormItem>
        <FormItem label="研究生学校" prop="rePass">
          <Input v-model="editmaster.editschool"  ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancleeditmaster">取消</Button>
        <Button type="primary"  @click="editmasterin">保存</Button>
      </div>
    </Modal>
    <!--编辑老师的Model-->
    <Modal v-model="editteacherexit" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">编辑</h3>
      <Form ref="editteacher" :model="editteacher" :label-width="100" label-position="right">
        <FormItem label="老师昵称">
          <Input v-model="editteacher.editname" ></Input>
        </FormItem>
        <FormItem label="老师身份" >
          <Input v-model="editteacher.editidentitiy"  ></Input>
        </FormItem>
        <FormItem label="老师部门" prop="rePass">
          <Input v-model="editteacher.editbriefcase"  ></Input>
        </FormItem>
        <FormItem label="老师学校" prop="rePass">
          <Input v-model="editteacher.editschool"  ></Input>
        </FormItem>
      </Form>
      <div slot="footer">
        <Button type="text" @click="cancleeditteacher">取消</Button>
        <Button type="primary"  @click="editteacherin">保存</Button>
      </div>
    </Modal>

    <Layout>
      <Header>
        <Menu mode="horizontal" theme="dark" active-name="1">
          <div class="layout-logo"></div>
          <div class="layout-nav">
            <MenuItem name="1" @click.native="checkpersonal">
              <Icon type="ios-navigate"></Icon>
              个人信息
            </MenuItem>
            <MenuItem name="2" @click.native="checkmessage">
              <Icon type="ios-navigate"></Icon>
              通知信息
            </MenuItem>
          </div>
          <label style="font-family:'Helvetica Neue' ;font-size:20px; color: white" >
            <Icon type="md-person" size="30"></Icon>
            {{identity + username}}
          </label>
        </Menu>
      </Header>
      <Layout>
        <Sider hide-trigger :style="{background: '#fff'}">
          <Menu  active-name="1-2" theme="dark" width="auto" :open-names="['1']">
            <MenuItem name="1" @click.native="changebook">
              <span>书　　籍</span>
            </MenuItem>
            <MenuItem name="2" @click.native="changestudent">
              <span>普通学生</span>
            </MenuItem>
            <MenuItem name="3" @click.native="changemaster">
              <span>研 究 生</span>
            </MenuItem>
            <MenuItem name="4" @click.native="changeteacher">
              <span>老　　师</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '100%', background: '#fff'}">
            <Table id="booktable" border :columns="bookcolumns" :data="bookdata">
              <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">编辑书籍信息</Button>
              </template>
            </Table>
            <!--学生信息的表格，进行编辑学生 -->
            <Table id="studenttable" border :columns="studentcolumns" :data="studentdata">
              <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showstudent(index)">编辑</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="studentrecord(index)">借书记录</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="studentpenalty(index)">逾期罚款</Button>
              </template>
            </Table>
            <!--研究生信息的表格，进行编辑研究生 -->
            <Table id="mastertable" border :columns="mastercolumns" :data="masterdata">
              <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showmaster(index)">编辑</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="masterrecord(index)">借书记录</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="masterpenalty(index)">逾期罚款</Button>
              </template>
            </Table>
            <!--老师信息表格，进行编辑老师-->
            <Table id="teachertable" border :columns="teachercolumns" :data="teacherdata">
              <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="showteacher(index)">编辑</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="teacherrecord(index)">借书记录</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="teacherpenalty(index)">逾期罚款</Button>
              </template>
            </Table>
          </Content>
        </Layout>
      </Layout>
    </Layout>
  </div>
</template>
<script>
  export default {
    data(){
      return {
        messagaedata:' ',
        messageexit:false,
        Fine:20,
        borrowidentity:"",
        borrowname:"",
        penaltyidentity:"",
        penaltyname:"",
        penaltyexit:false,
        borrowbook:false,
        bookindex:0,
        identity:'',
        username:'',
        userid:'',
        editexit:false,
        penaltycolumns:[  {
          title:'书籍编号',
          key:'id'
          },
          {
            title:'书的名称',
            key:'bookname'
          },
          {
            title:'书的类别',
            key:'category'
          }
          ],
        penaltydata:[],
        borrowcolumns:[
          {
            title:'书籍编号',
            key:'id'
          },
          {
            title:'书的名称',
            key:'bookname'
          },
          {
            title:'书的类别',
            key:'category'
          }
        ],
        borrowdata:[],
        bookcolumns: [
          {
            title: '书籍名称',
            key: 'name'
          },
          {
            title: '书的类别',
            key: 'category'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 150,
            align: 'center'
          }
        ],
        bookdata: [],
        editbook:{
          bookname:'',
          category:'',
        },
        //学生信息
        studentcolumns:[
          {
            title: '学生编号',
            key: 'id'
          },
          {
            title: '学生名称',
            key: 'name'
          },
          {
            title: '学生身份',
            key: 'identity'
          },
          {
            title:'学生部门',
            key: 'department'
          },
          {
            title:'学校',
            key:'school'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 250,
            align: 'center'
          }
        ],
        studentdata:[],
        editstudent:{
          editname:'',
          editidentitiy:'',
          editbriefcase:'',
          editschool:'',
        },
        editstudentexit:false,
        studentindex:0,
        //研究生信息
        editmasterexit:false,
        mastercolumns:[
          {
            title: '研究生编号',
            key: 'id'
          },
          {
            title: '研究生名称',
            key: 'name'
          },
          {
            title: '研究生身份',
            key: 'identity'
          },
          {
            title:'研究生部门',
            key: 'department'
          },
          {
            title:'学校',
            key:'school'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 250,
            align: 'center'
          }
        ],
        masterdata:[],
        editmaster:{
          editname:'',
          editidentitiy:'',
          editbriefcase:'',
          editschool:'',
        },
        masterindex:0,
        //老师信息
        editteacherexit:false,
        teachercolumns:[
          {
            title: '老师编号',
            key: 'id'
          },
          {
            title: '老师名称',
            key: 'name'
          },
          {
            title: '老师身份',
            key: 'identity'
          },
          {
            title:'老师部门',
            key: 'department'
          },
          {
            title:'学校',
            key:'school'
          },
          {
            title: 'Action',
            slot: 'action',
            width: 250,
            align: 'center'
          }
        ],
        teacherdata:[],
        editteacher:{
          editname:'',
          editidentitiy:'',
          editbriefcase:'',
          editschool:'',
        },
        teacherindex:0,
      }
    },
    created(){
      //得到书籍
      var self = this
      this.userid=window.localStorage.getItem("userID")
      this.username=window.localStorage.getItem("name")
      this.identity=window.localStorage.getItem("identity")
      this.$http.get('api/AdminController/getBooks',{
      }).then(function(response){
        //得到可以借的书籍信息
        self.bookdata=response.data
        for (var i =0 ;i<response.data.length ; i++){
          self.bookdata[i].id=response.data[i].id
        }
      }).catch(function (error) {
        self.$Message.warning("失败")
      })
      //得到普通学生
      this.$http.get('api/AdminController/getStudents',{
      }).then(function(response){
        self.studentdata=response.data
        for (var i =0 ;i<response.data.length ; i++){
          self.studentdata[i].id=response.data[i].userid
        }
      }).catch(function (error) {
        self.$Message.warning("失败")
      })
      //得到研究生
      this.$http.get('api/AdminController/getMasters',{
      }).then(function (response) {
        self.masterdata=response.data
        for (var i =0 ;i<response.data.length ; i++){
          self.masterdata[i].id=response.data[i].userid
        }
      }).catch(function (error) {
        self.$Message.warning("失败")
      })
      //得到老师
      this.$http.get('api/AdminController/getTeachers',{
      }).then(function (response) {
        self.teacherdata=response.data
        for (var i =0 ;i<response.data.length ; i++){
          self.teacherdata[i].id=response.data[i].userid
        }
      }).catch(function (error) {
        self.$Message.warning("失败")
      })
    },
    mounted(){
      var m = document.getElementById("booktable")
      m.style.display="block"
      m=document.getElementById("studenttable")
      m.style.display="none"
      m=document.getElementById("mastertable")
      m.style.display="none"
      m=document.getElementById("teachertable")
      m.style.display="none"
    },
    methods:{
      checkmessage(){
        var self=this
        this.messageexit=true
        this.$http.get('api/AdminController/getallmessage',{
        }).then(function (response) {
          for ( var i = 0 ;i<response.data.length ; i++){
            self.messagaedata=self.messagaedata+response.data[i].content +"\n"
          }
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
      },
      canclemessage(){
        this.messageexit=false
      },
      //借书方法
      cancleborrow(){
        this.borrowbook=false
      },
      canclepenalty(){
        this.penaltyexit=false
      },
      show(index){
        this.bookindex=index
        this.editbook.bookname=this.bookdata[index].name
        this.editbook.category=this.bookdata[index].category
        this.editexit=true
      },
      changebook(){
        var m = document.getElementById("booktable")
        m.style.display="block"
        m=document.getElementById("studenttable")
        m.style.display="none"
        m=document.getElementById("mastertable")
        m.style.display="none"
        m=document.getElementById("teachertable")
        m.style.display="none"
      },
      editbookin(){
        var self=this
        this.$http.get('api/AdminController/editbook/'+this.bookdata[this.bookindex].id+'/'+this.editbook.bookname+'/'
          +this.editbook.category+'/'+this.bookdata[this.bookindex].content,{
        }).then(function (response) {
          self.$Message.success("成功编辑书籍")
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.bookdata[this.bookindex].bookname=this.editbook.bookname
        this.bookdata[this.bookindex].category=this.editbook.category
        this.editexit=false
      },
      cancleeditbook(){
        this.editexit=false
      },
      //改变普通学生的方法
      changestudent(){
        var m = document.getElementById("studenttable")
        m.style.display="block"
        m=document.getElementById("booktable")
        m.style.display="none"
        m=document.getElementById("mastertable")
        m.style.display="none"
        m=document.getElementById("teachertable")
        m.style.display="none"
      },
      //点击了编辑后的
      showstudent(index){
        this.studentindex=index
        this.editstudent.editname=this.studentdata[index].name
        this.editstudent.editidentitiy=this.studentdata[index].identity
        this.editstudent.editbriefcase=this.studentdata[index].department
        this.editstudent.editschool=this.studentdata[index].school
        this.editstudentexit=true
      },
      //学生借款记录
      studentrecord(index){
        var self=this
        this.borrowbook=true
        this.borrowidentity=this.studentdata[index].identity
        this.borrowname=this.studentdata[index].name
        this.$http.get('api/AdminController/generaterecords/'+this.studentdata[index].id,{
        }).then(function (response) {
          self.borrowdata=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
      },
      //学生的逾期罚款
      studentpenalty(index){
        var self=this
        this.penaltyexit=true
        this.penaltyidentity=this.studentdata[index].identity
        this.penaltyname=this.studentdata[index].name
        this.$http.get('api/AdminController/generatepenalty/'+this.studentdata[index].id,{
        }).then(function (response) {
          self.penaltydata=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.$http.get('api/AdminController/getFine/'+this.studentdata[index].id,{
        }).then(function (response) {
          self.Fine=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
      },
      //取消学生的信息
      cancleeditstudent(){
        this.editstudentexit=false
      },
      //保存编辑学生的信息
      editstudentin(){
        var self=this
        this.$http.get('api/AdminController/editother/'+this.studentdata[this.studentindex].id+'/'+this.editstudent.editname+'/'
          +this.editstudent.editidentitiy+'/'+this.editstudent.editbriefcase+'/'+this.editstudent.editschool,{
        }).then(function (response) {
          self.$Message.success("保存成功")
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.studentdata[this.studentindex].identity=this.editstudent.editidentitiy
        this.studentdata[this.studentindex].name=this.editstudent.editname
        this.studentdata[this.studentindex].department=this.editstudent.briefcase
        this.studentdata[this.studentindex].school=this.editstudent.editschool
        this.editstudentexit=false
      },
      //改变研究生的方法
      changemaster(){
        var m = document.getElementById("mastertable")
        m.style.display="block"
        m=document.getElementById("studenttable")
        m.style.display="none"
        m=document.getElementById("booktable")
        m.style.display="none"
        m=document.getElementById("teachertable")
        m.style.display="none"
      },
      showmaster(index){
        this.masterindex=index
        this.editmaster.editname=this.masterdata[index].name
        this.editmaster.editidentitiy=this.masterdata[index].identity
        this.editmaster.editbriefcase=this.masterdata[index].department
        this.editmaster.editschool=this.masterdata[index].school
        this.editmasterexit=true
      },
      masterrecord(index){
        var self=this
        this.borrowbook=true
        this.borrowidentity=this.masterdata[index].identity
        this.borrowname=this.masterdata[index].name
        this.$http.get('api/AdminController/generaterecords/'+this.masterdata[index].id,{
        }).then(function (response) {
          self.borrowdata=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
      },
      masterpenalty(index){
        var self=this
        this.penaltyexit=true
        this.penaltyidentity=this.masterdata[index].identity
        this.penaltyname=this.masterdata[index].name
        this.$http.get('api/AdminController/generatepenalty/'+this.masterdata[index].id,{
        }).then(function (response) {
          self.penaltydata=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.$http.get('api/AdminController/getFine/'+this.masterdata[index].id,{
        }).then(function (response) {
          self.Fine=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
      },
      cancleeditmaster(){
        this.editmasterexit=false
      },
      editmasterin(){
        var self=this
        this.$http.get('api/AdminController/editother/'+this.masterdata[this.masterindex].id+'/'+this.editmaster.editname+'/'
          +this.editmaster.editidentitiy+'/'+this.editmaster.editbriefcase+'/'+this.editmaster.editschool,{
        }).then(function (response) {
          self.$Message.success("保存成功")
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.masterdata[this.masterindex].identity=this.editmaster.editidentitiy
        this.masterdata[this.masterindex].name=this.editmaster.editname
        this.masterdata[this.masterindex].department=this.editmaster.briefcase
        this.masterdata[this.masterindex].school=this.editmaster.editschool
        this.editmasterexit=false
      },
      //改变老师的方法
      changeteacher(){
        var m = document.getElementById("teachertable")
        m.style.display="block"
        m=document.getElementById("studenttable")
        m.style.display="none"
        m=document.getElementById("mastertable")
        m.style.display="none"
        m=document.getElementById("booktable")
        m.style.display="none"
      },
      showteacher(index){
        this.teacherindex=index
        this.editteacherexit=true
        this.editteacher.editname=this.teacherdata[index].name
        this.editteacher.editidentitiy=this.teacherdata[index].identity
        this.editteacher.editschool=this.teacherdata[index].school
        this.editteacher.editbriefcase=this.teacherdata[index].department
      },
      teacherrecord(index){
        var self=this
        this.borrowbook=true
        this.borrowidentity=this.teacherdata[index].identity
        this.borrowname=this.teacherdata[index].name
        this.$http.get('api/AdminController/generaterecords/'+this.teacherdata[index].id,{
        }).then(function (response) {
          self.borrowdata=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
      },
      teacherpenalty(index){
        var self=this
        this.penaltyexit=true
        this.penaltyidentity=this.teacherdata[index].identity
        this.penaltyname=this.teacherdata[index].name
        this.$http.get('api/AdminController/generatepenalty/'+this.teacherdata[index].id,{
        }).then(function (response) {
          self.penaltydata=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.$http.get('api/AdminController/getFine/'+this.teacherdata[index].id,{
        }).then(function (response) {
          self.Fine=response.data
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
      },
      cancleeditteacher(){
        this.editteacherexit=false
      },
      editteacherin(){
        var self=this
        this.$http.get('api/AdminController/editother/'+this.teacherdata[this.teacherindex].id+'/'+this.editteacher.editname+'/'
          +this.editteacher.editidentitiy+'/'+this.editteacher.editbriefcase+'/'+this.editteacher.editschool,{
        }).then(function (response) {
          self.$Message.success("保存成功")
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.teacherdata[this.teacherindex].identity=this.editteacher.editidentitiy
        this.teacherdata[this.teacherindex].name=this.editteacher.editname
        this.teacherdata[this.teacherindex].department=this.editteacher.briefcase
        this.teacherdata[this.teacherindex].school=this.editteacher.editschool
        this.editteacherexit=false
      },
      checkpersonal(){
        this.$router.push({
          name:'adminpersonal',
        })
      }
    }
  }
</script>
<style scoped>
  .layout{
    border: 1px solid #d7dde4;
    background: #f5f7f9;
    position: relative;
    overflow: hidden;
  }
  .layout-nav{
    width: 420px;
    margin: 0 auto;
    margin-right: 20px;
  }
</style>
