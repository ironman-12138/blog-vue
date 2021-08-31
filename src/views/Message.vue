<template>
  <div>
      <div class="back">
          <div class="messDetail">
              <div>
                <div style="overflow: auto;">
                    <div v-for="(item,i) in message" :key="i">
                        <div class="comment-title">
                            <span style="font-weight:600;">{{item.name}}</span>&nbsp;&nbsp;&nbsp;&nbsp;
                            <span style="font-size:10px;opacity: 0.7;">{{item.created}}</span>
                        </div>
                        <div style="margin-left:40px;">
                            {{item.content}}
                        </div>
                        <div class="division"></div>
                    </div>
                </div>
            </div>
            <div class="page">
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
      </div>
  </div>
</template>

<script>
    export default {
        data() {
            return {
                message: [],
                pageNum: 1,
                pageSize: 5,
                total: 0,
            }
        },
        methods: {
            page(pageNum, pageSize){
                const _this = this;
                _this.$axios.post("/message/list",{
                    "pageNum": pageNum,
                    "pageSize": pageSize
                }).then(res => {
                    if(res.data.code == 200){
                        this.message = res.data.data.dataList;
                    }
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
        },
        created() {
            this.page(1,10);
        }
    }
</script>

<style scoped>
    .messDetail{
        box-shadow: 0 2px 4px rgba(0, 0, 0, .12), 0 0 6px rgba(0, 0, 0, .04);
        width: 100%;
        min-height: 700px;
        padding: 20px 15px;
        margin-top: 5%;
    }
    .back{
        max-width: 960px;
        margin: auto;
    }
    .page{
        width: 100%;
        margin: 0 auto;
        margin-top: 70%;
        margin-left: 35%;
    }
</style>