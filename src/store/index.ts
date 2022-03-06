import { createStore } from 'vuex';
import common, { CommonState } from './modules/common';

interface ModuleTypes {
    common: CommonState;
}

export default createStore<ModuleTypes>({
    modules: {
        common
    }
});
