<template>
    <div class="back">
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

        <!-- 评论区 -->
        <div class="comment-all">
            <div v-if="commentFlag">
                <div style="max-height: 200px; overflow: auto;">
                    <div v-for="(item,i) in comment" :key="i">
                        <div class="comment-title">
                            <el-avatar size="small" :src="item.avatar"></el-avatar>
                            <span style="font-weight:600;">{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="font-size:10px;opacity: 0.7;">{{item.createTime}}</span>
                        </div>
                        <div style="margin-left:32px;">
                            {{item.content}}
                        </div>
                        <div class="division"></div>
                    </div>
                </div>
            </div>
            <div v-else style="margin-left:5px;">暂无评论</div>
            <div class="division"></div>
            <div class="comment-write">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入评论"
                    v-model="textarea">
                </el-input>
                <el-button class="comment-btn" type="success" size="mini" round @click="saveComment">发表评论</el-button>
            </div>
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
                    content: '内容',        //内容
                },
                textarea: '',   //评论内容
                ownBlog: false,
                comment: [
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"张三",content:"这篇文章写的真好",createTime:"2017-01-22 10:10:10"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                    // {avatar:"https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png",name:"李四",content:"解释很详细，解决了我的问题",createTime:"2019-11-18 14:23:40"},
                ],
                commentFlag: false
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
            },

            //发表评论
            saveComment() {
                if (this.$store.state.userInfo != "" && this.$store.state.userInfo != null) {
                    let name = this.$store.state.userInfo.username;
                    let avatar = this.$store.state.userInfo.avatar;
                    let id = this.$store.state.userInfo.id;
                    this.$axios.post("/blog/saveComment",
                    {
                        "name": name,
                        "avatar": avatar,
                        "blogId": this.blog.id,
                        "peoId": id,
                        "content": this.textarea
                    },{
                            headers: {
                                "Authorization": localStorage.getItem("token")
                            }
                        }).then(res => {
                            if(res.data.code == 200){
                                this.$message({
                                    type: 'success',
                                    message: '评论成功!'
                                });
                                this.selectDetail();
                            }
                        })
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请登录后再发表评论!'
                    });
                }
            },

            //查询详情
            selectDetail() {
                const _this = this;
                this.$axios.get("/blog/select",{
                    params: {
                        'id': _this.blog.id
                    }
                }).then(res => {
                    const blog = res.data.data;
                    _this.comment = blog.commentList;
                    if(blog.commentList != ""){
                        _this.commentFlag = true;
                    }
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
                    _this.comment = blog.commentList;
                    if(blog.commentList != ""){
                        _this.commentFlag = true;
                    }
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
    .back{
        max-width: 960px;
        margin: auto;
    }
    .comment-all{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width: 100%;
        padding: 20px 15px;
        margin-top: 10px;
        margin-bottom: 10px;
        background-color: rgba(255, 255, 255, 0.6);
    }
    .comment-title *{
        vertical-align: middle;
    }
    .division{
        height: 1px;
        width: 100%;
        background-color: rgb(231, 229, 229);
        margin: 5px 0px 5px 0px;
    }
    .comment-write{
        width: 100%;
    }
    .comment-btn{
        margin-left: 90%;
        margin-top: 5px;
    }
</style>