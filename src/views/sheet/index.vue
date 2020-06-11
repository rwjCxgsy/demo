<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-11 15:51:01
 * @Description: 
 * @FilePath: /demo/src/views/sheet/index.vue
--> 
<template>
    <div class="sheet">
        <el-form ref="form" :model="form" label-width="80px">
            <el-form-item label="上传表格">
                <el-upload
                    :on-change="onChange"
                    class="upload-demo"
                    accept=".xlsx"
                    drag
                    :limit="1"
                    :auto-upload="false"
                    action="http://47.97.209.240/utils/api/xlsx-merge">
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将表格文件拖到此处，或<em>点击上传</em></div>
                    <div class="el-upload__tip" slot="tip">只能上传xlsx文件，且不超过500kb</div>
                </el-upload>
            </el-form-item>
            <el-form-item label="合并字段">
                <el-input v-model="form.key" placeholder="两个表格需要根据那个字段来合并" />
            </el-form-item>
            <el-form-item label="表格索引">
                <el-input v-model="form.a" placeholder="需要合并的第一个表格索引（默认为1）" />
            </el-form-item>
            <el-form-item label="表格索引">
                <el-input v-model="form.b" placeholder="需要合并的第二个表格索引（默认为2）"/>
            </el-form-item>
            <el-form-item label="操作">
                <el-button :loading="loading" type="primary" @click="submit">合并</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script >
export default {
    name: 'sheet',
    head: {
        title: '合并表格'
    },
    data () {
        return {
            form: {
                file: null,
                key: '',
                a: 1,
                b: 2
            },
            loading: false
        }
    },
    methods: {
        submit () {
            const {file, key} = this.form
            if (!file || !key) {
                this.$message({
                    message: '请上传文件和需要合并的字段',
                    type: 'error'
                });
                return
            }
            const { a, b} = this.form
            const body = new FormData()
            body.append('file', file)
            body.append('key', key)
            body.append('a', a)
            body.append('b', b)
            this.send(body)
        },
        async send (body) {
            this.loading = true
            try {
                const {code, data, msg} = await fetch('http://47.97.209.240/utils/api/xlsx-merge', {
                    body,
                    headers: {
                        'Accept': 'application/json'
                    },
                    mode: 'cors', //请求的模式
                    credentials: 'include',
                    method: 'POST'
                }).then(response => {
                    console.log(response)
                    return response.json()
                })
                if (code !== 0) {
                    this.$message({
                        message: msg,
                        type: 'error'
                    });
                } else {
                    window.open(data)
                }
            } catch (error) {
                console.log(error)
            } finally {
                this.loading = false
            }
        },
        onChange (data) {
            this.form.file = data ? data.raw : null
        }
    }
}
</script>

<style lang="less" scoped>
    .sheet {
        width: 50%;
        margin: 100px auto;
    }
</style>