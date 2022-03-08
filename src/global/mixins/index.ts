import { Vue, Options } from 'vue-property-decorator';
import store from '@/store';

@Options({})
export default class GMixins extends Vue {
    getBgColor() {
        const colorList = [
            '#12a933',
            '#e32c2c',
            '#f58b30',
            '#fdb004',
            '#3dccd3',
            '#a000d3',
            '#d10074',
            '#147c4b',
            '#226cb9',
            '#b36b6b'
        ];
        const index = Math.floor(Math.random() * 10);

        return colorList[index];
    }
    pathTo(path: string, query?: any) {
        this.$router
            .push({
                path: path,
                query: query || {}
            })
            .then();
    }
    toggleHomeAside() {
        store.dispatch('common/toggleHomeAside').then();
    }
    pageScrollTo(topHeight: number): Promise<void> {
        const topH = topHeight || 0;
        return new Promise((resolve) => {
            window.scrollTo({
                top: topHeight,
                behavior: 'smooth'
            });

            let running = function () {
                let top = window.scrollY;
                if (top === topH) {
                    window.removeEventListener('scroll', running);
                    resolve();
                }
            };
            window.addEventListener('scroll', running, false);
        });
    }
}
