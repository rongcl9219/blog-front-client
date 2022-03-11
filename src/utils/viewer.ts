import { Vue, Options } from 'vue-property-decorator';
import Viewer from 'viewerjs';
import { viewerDefaultOptions } from '@/components/ViewerImg/config';
import 'viewerjs/dist/viewer.css';

@Options({})
export default class newViewer extends Vue {
    viewerObj: any = null;
    updateViewer = (el: string, options?: object) => {
        if (this.viewerObj) {
            this.viewerObj.update();
        } else {
            const eleDom = document.querySelectorAll(el)[0] as HTMLElement;
            if (!eleDom) {
                return;
            }
            const viewerOptions = Object.assign({}, viewerDefaultOptions, options || {});

            this.viewerObj = new Viewer(eleDom, viewerOptions);
        }
    };
}
