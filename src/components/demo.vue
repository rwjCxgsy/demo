<template>
    <div>demo<br />{{title}}</div>
</template>

<script>
export default {
    name: 'demo',
    inject: ['title'],
    created () {
        window.onHello = function (data) {
            console.log('demo')
        }
    }
}
</script>

<style>

</style>
