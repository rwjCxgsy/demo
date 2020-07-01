<!--
 * @Author: renweijun@doctorwork.com
 * @LastEditTime: 2020-06-11 18:58:34
 * @Description: 
 * @FilePath: /demo/src/views/edit/index.vue
--> 

<template>
    <div class="edit">
        <div>
            <Edit />
        </div>
    </div>
</template>

<script>
import Edit from './core'
export default {
    name: 'edit',
    head: {
        title: 'canvas编辑器'
    },
    components: {
        Edit
    }
}
</script>

<style lang="less" scoped>

</style>