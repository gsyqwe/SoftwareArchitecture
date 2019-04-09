<template>
  <div class="layout">
    <Layout>
      <Header>
        <div class="layout-nav">
          <label style="font-family:'Helvetica Neue' ;font-size:20px; color: white" >
            <Icon type="md-person" size="30"></Icon>
            {{identity + username}}
          </label>
        </div>
      </Header>
      <Content>
        <!--pdf在线阅读器-->
        <div>
          <iframe v-bind:src="bookcontent"  id="newframe" height="800" width="100%">
          </iframe>
        </div>
        <ButtonGroup style="margin-top: 10px">
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
        userid:'',
        username:'',
        identity:'',
        bookcontent:'',//书籍路径
      }
    },
    methods : {
      getback(){
        if (this.identity === "学生"||this.identity === "研究生") {
          this.$router.push({name: "studenthome"})
        }else if (this.identity ==="老师"){
          this.$router.push({name:"teacherhome"})
        }
      }
    },
    created(){
      var self=this
      this.userid=window.localStorage.getItem("userID")
      this.identity=window.localStorage.getItem("identity")
      this.username=window.localStorage.getItem("name")
      this.bookcontent=window.localStorage.getItem("bookcontent")
      var bookid=window.localStorage.getItem("bookid")
      this.$http.get('api/UserController/readpdf/'+bookid,{
      }).then(function (response) {
        self.bookcontent=response.data
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
