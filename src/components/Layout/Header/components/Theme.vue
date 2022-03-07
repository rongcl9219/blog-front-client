<template>
    <div></div>
</template>

<script lang='ts'>
import { Vue, Options } from 'vue-property-decorator';

@Options({
    name: 'Theme'
})
export default class Theme extends Vue {
    visible: boolean = false;
}
</script>

<style scoped>

</style>
