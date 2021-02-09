<template>
    <div>
        <Header></Header>

        <div class="block">
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
                layout="prev, pager, next, jumper"
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
                total: 0
            };
        },
        methods: {
            page(pageNum, pageSize){
                const _this = this;
                _this.$axios.get("/blog/list",{
                    params: {
                        "pageNum": pageNum,
                        "pageSize": pageSize
                    }
                }).then(res => {
                    //console.log(res.data.data.dataList);
                    _this.blogs = res.data.data.dataList;
                    _this.total = res.data.data.total;
                })
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
</style>