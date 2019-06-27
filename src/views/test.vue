<template>
    <div>test
        {{message}}
    </div>
</template>

<script>
export default {
    name: 'test',
    data () {
        return {
            message: 'message'
        }
    },
    beforeCreate () {
        console.log('beforeCreate', this)
    },
    created () {
        console.log('created')
    },
    mounted () {
        console.log('mounted', this)
    }
}
</script>

<style>

</style>
