<template>
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
                input2: ''
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
            }
        },
        created(){
            this.page(1,5);
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
</style>