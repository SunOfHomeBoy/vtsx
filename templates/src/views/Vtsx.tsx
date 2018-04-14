import Vue, { CreateElement } from 'vue'
import { Component, Prop } from 'vue-property-decorator'
import { theme } from '../config'

@Component
export default class vtsx extends Vue {
        public render(h: CreateElement) {
                return (
                        <div class={theme.prefix + '-viewport'}>Hello, vtsx ~ </div>
                )
        }
}
