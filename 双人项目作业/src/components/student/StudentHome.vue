<template>
  <div class="layout">
    <Modal v-model="borrowexit" :closable='false' :mask-closable=false :width="500">
      <h3 slot="header" style="color:#2D8CF0">借书</h3>
      你当前是{{identity}}，你当前最多借 {{booknum}} 本书，请确认
      <div slot="footer">
        <Button type="text" @click="cancleborrow">取消</Button>
        <Button type="primary"  @click="borrow">借书</Button>
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
            <MenuItem name="1-1">
              <span>书籍</span>
            </MenuItem>
          </Menu>
        </Sider>
        <Layout :style="{padding: '0 24px 24px'}">
          <Content :style="{padding: '24px', minHeight: '100%', background: '#fff'}">
            <Table border :columns="bookcolumns" :data="bookdata">
              <template slot-scope="{ row }" slot="name">
                <strong>{{ row.name }}</strong>
              </template>
              <template slot-scope="{ row, index }" slot="action">
                <Button type="primary" size="small" style="margin-right: 5px" @click="show(index)">借书</Button>
                <Button type="primary" size="small" style="margin-right: 5px" @click="read(index)">阅读</Button>
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
        identity:'',
        username:'',
        userid:'',
        bookid:'',
        bookname:'',
        category:'',
        borrowexit:false,
        booknum:0,
        bookcolumns: [
          {
            title: '书籍编号',
            key: 'id'
          },
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
        bookdata: []
      }
    },
    created(){
      var self = this
      this.userid=window.localStorage.getItem("userID")
      this.username=window.localStorage.getItem("name")
      this.identity=window.localStorage.getItem("identity")
      if (this.identity === "学生"){
        this.booknum=10
      }else{
        this.booknum=20
      }
      this.$http.get('api/UserController/availablebook/'+self.identity,{
      }).then(function(response){
        self.bookdata=response.data
      }).catch(function (error) {
        self.$Message.warning("失败")
      })
    },
    methods:{
      show(index){
        this.borrowexit=true
        this.bookid=this.bookdata[index].id
        this.bookname=this.bookdata[index].name
        this.category=this.bookdata[index].category
      },
      read(index){
        var m = this.bookdata[index].content.split(".")
        window.localStorage.removeItem("bookcontent")
        window.localStorage.setItem("bookcontent",this.bookdata[index].content)
        window.localStorage.setItem("bookid",this.bookdata[index].id)
        console.log(m[1])
        if (m[1] === "pdf"){
          this.$router.push({
            name:"pdfreader"
          })
        }else if(m[1] === "doc"){
          this.$router.push({
            name:"wordreader"
          })
        }else if(m[1] === "epub"){
          this.router.push({
            name:"epubreader"
          })
        }
      },
      borrow(){
        var self=this
        this.$http.get('api/UserController/borrowbook/'+this.userid+'/'+this.identity+'/'+this.bookid+'/'+this.bookname
          +'/'+this.category,{
        }).then(function (response) {
          self.$Message.success("成功借书")
        }).catch(function (error) {
          self.$Message.warning("失败")
        })
        this.borrowexit=false
      },
      cancleborrow(){
        this.borrowexit=false
      },
      checkpersonal(){
        this.$router.push({name:"studentpersonal"})
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
