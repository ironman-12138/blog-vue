<template>
    <div class="blog-header">
        <h3>欢迎来到XCoder的博客</h3>
        <div>
            <el-avatar :size="50" :src="user.avatar"></el-avatar>
            <div>{{user.username}}</div>
        </div>

        <div class="header-action">
            <span><el-link href="/Blogs">主页</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span><el-link href="/Blog/add" type="success">发表</el-link></span>
            <el-divider direction="vertical"></el-divider>
            <span v-if="hasLogin"><el-link @click="logout" type="danger">退出</el-link></span>
            <span v-else><el-link href="/Login" type="primary">登录</el-link></span>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Header',
    data() {
        return {
            user: {
                username: '请先登录',
                avatar: 'https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png'
            },
            hasLogin: false
        };
    },
    methods: {
        logout(){
            const _this = this;
            this.$axios.get("/logout",{
                headers: {
                    "Authorization": localStorage.getItem("token")
                }
            }).then(res => {
                _this.$store.commit("removeTokenAndInfo");
                _this.$router.push("/Login");
            })
        }
    },
    created() {
        if (this.$store.state.userInfo.username) {
            this.user.username = this.$store.state.userInfo.username;
            this.user.avatar = this.$store.state.userInfo.avatar;
            this.hasLogin = true;
        }
    }
};
</script>

<style>
    .blog-header{
        width: 900px;
        margin: auto;
        text-align: center;
    }
    .header-action{
        margin-top: 10px;
        margin-bottom: 5px;
    }
</style>