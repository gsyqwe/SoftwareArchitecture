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
        <!--word在线阅读器-->
        <iframe v-bind:src="bookcontent" id="newframe" src="" height="800" width="100%">
        </iframe>
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
        bookcontent:'http://localhost:9090/1.pdf',
        userid:'',
        username:'',
        identity:'',
      }
    },
    methods : {
      getback(){
        if (this.identity === "普通学生"||this.identity === "研究生") {
          this.$router.push({name: "studenthome"})
        }else if (this.identity ==="老师"){
          this.$router.push({name:"teacherhome"})
        }
      }
    },
    created(){
      var id=window.localStorage.getItem("bookid")
      this.userid=window.localStorage.getItem("userID")
      this.identity=window.localStorage.getItem("identity")
      var self=this
      this.$http.get('api/UserController/readword/'+id,{
      }).then(function (response) {
        window.localStorage.removeItem("bookcontent")
        window.localStorage.setItem("bookcontent",response.data)
      })
      self.bookcontent=window.localStorage.getItem("bookcontent")
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
