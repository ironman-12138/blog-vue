<template>
    <div>
        <el-container>
            <el-header>
                <img class="logo" src="@/assets/img/logo.png"/>
            </el-header>
            <el-main>
                <!-- 
                    :model为绑定的表单数据对象
                    添加rules属性绑定为之前配置的验证规则
                    添加status-icon属性可显示状态图标
                    ref为表单被引用时的名称
                 -->
                <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
                    <el-form-item label="用户名" prop="username">
                        <el-input v-model="ruleForm.username"></el-input>
                    </el-form-item>
                    <el-form-item label="密码" prop="password">
                        <el-input type="password" v-model="ruleForm.password"></el-input>
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('ruleForm')">提交</el-button>
                        <el-button @click="resetForm('ruleForm')">重置</el-button>
                    </el-form-item>
                </el-form>
            </el-main>
        </el-container>
    </div>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            ruleForm: {
                username: '',
                password: '',
            },
            /**与上文  '表单内容' 中 <el-form> 表单的 :rules 属性值相同 */
            rules: {
                username: [
                    /**required: true必填，trigger: 'blur'失去焦点时验证，如果为空，提示信息为 '请输入用户名' */
                    { required: true, message: "请输入用户名", trigger: 'blur' },
                    /**最短2，最长15 */
                    { min: 2, max: 15, message: "长度在3到15之间", trigger: 'blur' }
                ],
                password: [
                    { required: true, message: "请输入密码", trigger: 'blur' }
                ]
            }
        };
    },
    methods: {
        submitForm(formName) {
            /**
             * formName 就是传入的 'rulesForm'，
             * 与 <el-form> 表单的 ref 属性值一致，这样就指定好需要验证的表单了 
             * */
            this.$refs[formName].validate((valid) => {
            if (valid) {
                const _this = this;
                this.$axios.post("/login",this.ruleForm)
                                .then(res => {
                                    //获取响应头中的jwt数据
                                    const jwt = res.headers['authorization'];
                                    const userInfo = res.data.data;
                                    _this.$store.commit("setToken",jwt);
                                    _this.$store.commit("setUserInfo",userInfo);
                                    // console.log(_this.$store.state.token);
                                    // console.log(_this.$store.state.userInfo);

                                    //页面跳转
                                    _this.$router.push("/");
                                });
            } else {
                console.log('error submit!!');
                return false;
            }
            });
        },
        resetForm(formName) {
            this.$refs[formName].resetFields();
        }
    }
};
</script>

<style>
    .el-header, .el-footer {
        background-color: #B3C0D1;
        color: #333;
        text-align: center;
        line-height: 60px;
    }
    
    .el-aside {
        background-color: #D3DCE6;
        color: #333;
        text-align: center;
        line-height: 200px;
    }
    
    .el-main {
        color: #333;
        text-align: center;
        line-height: 160px;
    }
    
    body > .el-container {
        margin-bottom: 40px;
    }
    
    .el-container:nth-child(5) .el-aside,
    .el-container:nth-child(6) .el-aside {
        line-height: 260px;
    }
    
    .el-container:nth-child(7) .el-aside {
        line-height: 320px;
    }

    /* 设置logo样式 */
    .logo{
        height: 60%;
        margin-top: 10px;
    }

    /* 表单样式 */
    .demo-ruleForm{
        max-width: 500px;
        margin: auto;
    }
</style>