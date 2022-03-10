<template>
    <span class="comment-con">
        <template v-for="(item, index) in htmlArr" :key="index">
            <span v-if="item.type === 1" v-text="item.text"></span>
            <Svg-Comment :svgHtml="item.text" v-else/>
        </template>
    </span>
</template>

<script lang="ts">
import { h, resolveComponent } from 'vue';
import { Vue, Options, Prop } from 'vue-property-decorator';
import emojiData from '@/components/Emoji/emojiData';

interface IHtmlObj {
    type: number;
    text: string;
}

@Options({
    name: 'CommentContent',
    components: {
        'Svg-Comment': {
            props: {
                svgHtml: {
                    type: String,
                    default: ''
                }
            },
            render() {
                const com = resolveComponent('svg-icon');
                return h(com, {iconClass: this.svgHtml});
            }
        }
    }
})
export default class CommentContent extends Vue {
    @Prop({ type: String, default: '' }) htmlStr!: string;

    htmlArr: Array<IHtmlObj> = [];

    mounted() {
        // 匹配 [] 之间的字符 包括[]
        let reg = /\[[^[]+]/g;
        let svgArr = this.htmlStr.match(reg) || [];
        let textArr = this.htmlStr.split(reg);
        textArr.forEach((text, index) => {
            let obj: IHtmlObj = {
                type: 1,
                text: ''
            };
            try {
                if (!text) {
                    let key = svgArr[index].replace(/(\[)|]/g, '');

                    if (emojiData[key]) {
                        obj.type = 2;
                        obj.text = emojiData[key];
                    } else {
                        obj.text = svgArr[index];
                    }
                } else {
                    obj.text = text;
                }
            } catch (e) {
                obj.text = text;
            }
            this.htmlArr.push(obj);
        });
    }
}
</script>

<style scoped>
.svg-icon {
    font-size: 16px;
}
</style>
