<template>
    <div class="no_data">
        <img :src="noDataImage" alt="" />
        <p>{{ noDateText }}</p>
    </div>
</template>

<script lang="ts">
import { Vue, Options, Prop } from 'vue-property-decorator';
import noDataImage from '@/assets/images/default_img/no_data.png';

@Options({
    name: 'NoData'
})
export default class NoData extends Vue {
    @Prop({ type: String, default: '什么都没有' }) noDateText?: string;

    get noDataImage() {
        return noDataImage;
    }
}
</script>

<style scoped lang="scss">
.no_data {
    margin: 7% auto 0;
    text-align: center;

    p {
        font-family: zcool-kuaile, sans-serif;
        font-size: 24px;
        color: var(--el-color-primary);
    }
}
</style>
