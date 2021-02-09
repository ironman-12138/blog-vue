<template>
    <div>
        <Header></Header>

        <div class="blogDetail">
            <h3>{{blog.title}}</h3>
            <el-link icon="el-icon-edit" v-if="ownBlog">
                <router-link :to="{name: 'BlogEdit', query: {'blogId': blog.id}}">
                    编辑
                </router-link>
            </el-link>
            <el-link icon="el-icon-delete" v-if="ownBlog">
                <el-link type="danger" @click="deleteBlog()">删除</el-link>
            </el-link>
            <el-divider></el-divider>
            <div>{{blog.description}}</div>
            <el-divider></el-divider>
            <div class="markdown-body" v-html="blog.content"></div>
        </div>
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';
    import 'github-markdown-css'

    export default {
        name: 'BlogDetail',
        components: { Header },
        data() {
            return {
                blog: {
                    id: '',            //id
                    title: 'title',         //标题
                    description: 'description',   //摘要
                    content: '内容'        //内容
                },
                ownBlog: false
            };
        },
        methods: {
            deleteBlog(){
                const _this = this;
                this.$confirm('此操作将永久删除该博客, 是否继续?', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'warning'
                }).then(() => {
                    _this.$axios.get("/blog/delete",{
                        params: {
                            'id': _this.blog.id
                        },
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    }).then(res => {
                        _this.$message({
                            type: 'success',
                            message: '删除成功!'
                        });
                        _this.$router.push("/Blogs");
                    })
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });          
                });
            }
        },
        created() {
            const blogId = this.$route.query.blogId;
            const _this = this;
            if (blogId) {
                this.$axios.get("/blog/select",{
                    params: {
                        'id': blogId
                    }
                }).then(res => {
                    const blog = res.data.data;
                    _this.blog.id = blog.id;
                    _this.blog.title = blog.title;
                    _this.blog.description = blog.description;
                    //先对content渲染，因为content是md格式
                    var MardownIt = require("markdown-it");
                    var md = new MardownIt();
                    var result = md.render(blog.content);
                    _this.blog.content = result;

                    //如果当前登录者是发表该博客者展示编辑按钮
                    _this.ownBlog = (blog.userId == _this.$store.state.userInfo.id)
                })
            }
        }
    };
</script>

<style>
    .blogDetail{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width: 100%;
        min-height: 700px;
        padding: 20px 15px;
    }
</style>