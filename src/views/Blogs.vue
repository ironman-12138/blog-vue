<template>
    <div>
        <div class="util">
            <el-popover
                placement="bottom"
                width="200"
                trigger="manual"
                v-model="visible">
                <el-input
                    type="textarea"
                    :rows="2"
                    placeholder="请输入内容"
                    v-model="textarea">
                </el-input>
                <el-button type="text" style="position: relative; left: 80%;" @click="submitMess">提交</el-button>
                <span slot="reference" @click="visible = !visible">留言</span>
            </el-popover>
            <span v-show="disabled" class="seeMessage" @click="seeMessage()">
                查看留言
            </span>
        </div>
        <div class="back">
            <Header></Header>

            <div class="block">
                <div style="margin:0 auto;width:40%;">
                    <el-input
                        placeholder="请输入标题搜索"
                        prefix-icon="el-icon-search"
                        @input="inputChange()"
                        v-model="input2">
                    </el-input>
                </div>
                <el-timeline>
                    <el-timeline-item :timestamp="blog.created" placement="top" v-for="(blog,i) in blogs" :key="i">
                        <el-card>
                            <h4>
                                <router-link :to="{name: 'BlogDetail',query:{blogId:blog.id}}">
                                    {{blog.title}}
                                </router-link>
                            </h4>
                            <p>{{blog.description}}</p>
                        </el-card>
                    </el-timeline-item>
                </el-timeline>

                <el-pagination
                    class="blog-page"
                    background
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-size="pageSize"
                    layout="total, prev, pager, next, jumper"
                    :total= total>
                </el-pagination>
            </div>
        </div>
        <!-- <el-dialog v-bind="$attrs" v-on="$listeners" title="请留言" :visible.sync="dialogFormVisible">
            <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="80px"
                label-position="left">
                <el-form-item label-width="0" prop="field101">
                <el-input v-model="formData.field101" type="textarea" placeholder="请留言"
                    :autosize="{minRows: 4, maxRows: 4}" :style="{width: '100%'}"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer">
                <el-button @click="close">取消</el-button>
                <el-button type="primary" @click="handelConfirm">确定</el-button>
            </div>
        </el-dialog> -->
    </div>
</template>

<script>
    import Header from '@/components/Header.vue';

    export default {
        name: 'Blogs',
        components: { Header },
        data() {
            return {
                blogs: {},
                pageNum: 1,
                pageSize: 5,
                total: 0,
                input2: '',
                formData: {
                    field101: undefined,
                },
                rules: {
                    field101: [],
                },
                dialogFormVisible: false,
                visible: false,
                textarea: '',
                disabled: false
            };
        },
        methods: {
            page(pageNum, pageSize){
                const _this = this;
                _this.$axios.post("/blog/list",{
                    // data: {
                        "pageNum": pageNum,
                        "pageSize": pageSize,
                        "title": _this.input2
                    // }
                }).then(res => {
                    console.log(res.data.data);
                    _this.blogs = res.data.data.dataList;
                    _this.total = res.data.data.total;
                })
            },
            // 改变页码
            handleSizeChange(newSize) {
                this.pageSize = newSize;
                this.page(this.pageNum,this.pageSize);
            },
            // 点击分页
            handleCurrentChange(current) {
                this.pageNum = current;
                this.page(this.pageNum,this.pageSize);
            },
            inputChange() {
                this.page(this.pageNum,this.pageSize);
            },
            onOpen() {
                this.dialogFormVisible = true;
            },
            onClose() {
                this.dialogFormVisible = false;
            },
            close() {
                this.dialogFormVisible = false;
            },
            handelConfirm() {
                this.$refs['elForm'].validate(valid => {
                    if (!valid) return
                    this.close()
                })
            },
            submitMess() {
                this.visible = false;
                const _this = this;
                if (this.$store.state.userInfo != "" && this.$store.state.userInfo != null) {
                    let name = this.$store.state.userInfo.username;
                    _this.$axios.post("/message/saveMessage",{
                            "content": this.textarea,
                            "name": name
                    },{
                        headers: {
                            "Authorization": localStorage.getItem("token")
                        }
                    }).then(res => {
                        if(res.data.code == 200){
                            this.$message({
                                type: 'success',
                                message: "提交成功"
                            });
                        }
                    })
                }else{
                    this.$message({
                        type: 'warning',
                        message: '请登录后再留言!'
                    });
                }
            },
            
            //跳转留言信息页面
            seeMessage() {
                this.$router.push("/Blog/message");
            }
        },
        created(){
            this.page(1,5);
            if (this.$store.state.userInfo != "" && this.$store.state.userInfo != null) {
                let name = this.$store.state.userInfo.username;
                if(name == "admin"){
                    this.disabled = true;
                }
            }
        }
    };
</script>

<style>
    .blog-page{
        text-align: center;
    }
    .block{
        height: 100%;
        overflow: auto;
    }
    .back{
        max-width: 960px;
        margin: auto;
    }
    .util{
        /* position: relative;
        right: 92%;
        top: 10px; */
        float: right;
        margin-right: 10px;
        color: rgb(0, 0, 0);
        cursor: pointer;
    }
    .seeMessage{
        color: rgb(0, 255, 34);
    }
</style>