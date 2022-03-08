<template>
    <div class='time-line-page'>
        <template v-if="list.length > 0">
            <ul class="time-line-module">
                <li class="time-line-item">
                    <p class="time-total">目前共计<span v-text="total"></span>篇文章~</p>
                </li>
                <li class="time-line-item" v-for="year in list" :key="year.year">
                    <h3 class="time-year" v-text="year.year"></h3>
                    <ul class="time-year-content">
                        <li class="time-line-item" v-for="item in year.list" :key="item.articleId">
                            <div class="time-line-content">
                                <h4 class="time-month" @click="pathTo('/article', {articleId: item.articleId})">
                                    <span class="month" v-text="item.month"></span>
                                    <span class="title" v-text="item.articleTitle"></span>
                                </h4>
                            </div>
                        </li>
                    </ul>
                </li>
            </ul>
        </template>
        <template v-else>
            <NoData/>
        </template>
    </div>
</template>

<script lang="ts">
import { Options, mixins } from 'vue-property-decorator';
import GMixins from '@/global/mixins';
import { CommonApi } from '@/api';

@Options({
    name: 'TimeLine'
})
export default class TimeLine extends mixins(GMixins) {
    list: Array<any> = [];

    total: number = 0;

    mounted() {
        CommonApi.getTimeLine().then((res) => {
            this.list = res.data.list;
            this.total = res.data.total;
        });
    }
}
</script>

<style scoped lang="scss">
.time-line-page {
    max-width: 860px;
    margin: 30px auto 0;
    padding: 20px 30px 100px;
    box-sizing: border-box;

    .time-line-module {
        position: relative;
        padding-left: 20px;

        &:after {
            content: '';
            position: absolute;
            top: 10px;
            left: 0;
            height: 100%;
            width: 4px;
            background-color: #E3E5E7;
        }
    }

    .time-total {
        position: relative;
        color: #222;

        span {
            margin: 0 5px;
        }

        &:after {
            position: absolute;
            content: '';
            top: 4px;
            left: -24px;
            width: 10px;
            height: 10px;
            border: 1px solid #E3E5E7;
            border-radius: 50%;
            z-index: 1;
            background-color: #fff;
        }
    }

    .time-line-content {
        position: relative;
        padding: 30px 0 10px;
        border-bottom: 1px dashed;
        border-color: #9499A0;
    }

    .time-year {
        position: relative;
        margin-top: 80px;
        font-size: 26px;
        font-weight: 600;
        color: #18191C;

        &:after {
            content: '';
            position: absolute;
            top: 7px;
            left: -25px;
            width: 12px;
            height: 12px;
            border: 1px solid #E3E5E7;
            border-radius: 50%;
            z-index: 1;
            background-color: #C9CCD0;
        }
    }

    .time-month {
        position: relative;
        display: flex;
        line-height: 24px;
        cursor: pointer;
        transition: .3s;
        color: #797F87;

        &:hover {
            color: #222;

            &:after {
                background-color: #9499A0;
            }
        }

        .month {
            font-size: 12px;
            width: 50px;
        }

        &:after {
            content: '';
            position: absolute;
            top: 7px;
            left: -23px;
            width: 8px;
            height: 8px;
            border: 1px solid #E3E5E7;
            border-radius: 50%;
            transition: .3s;
            z-index: 1;
            background-color: #fff;
        }
    }
}
</style>
