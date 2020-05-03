<template>

    <div>
        <div :class="{'dfm-disabled': !enabled,}" class="dfm-field">
            <label v-if="field.toggle && !field.disabled_by && !field.enabled_by" class="uk-display-block">
                <input type="checkbox" v-model="enabled" class="uk-checkbox uk-margin-small-right"/>
                <small>{{ 'Optie inschakelen' | trans }}</small>
            </label>
            <div v-if="!enabled && field.disabled_message">
                <small>{{ field.disabled_message | trans }}</small>
            </div>
            <component class="dfm-fieldcard"
                       :is="field.type"
                       :value="params[name]"
                       :disabled="!enabled"
                       :name="name"
                       :field="field"
                       @input="setParameter(name, $event)"></component>
            <hr/>
        </div>
    </div>

</template>
<script>

    import {mapState} from 'vuex';
    import {SET_PARAM} from '@/store/mutation-types';
    import params from '@/store/modules/params';

    import Select from '@/components/Field/Select.vue';
    import MinMax from '@/components/Field/MinMax.vue';
    import BooleanOption from '@/components/Field/BooleanOption.vue';
    import Dataprovider from '@/components/Field/Dataprovider.vue';

    export default {

        name: 'Toggler',

        components: {
            Select,
            MinMax,
            BooleanOption,
            Dataprovider,
        },

        props: {
            name: String,
            field: Object,
        },

        data() {
            return ({
                enabled: this.field.default !== params.DISABLED_FIELD_VALUE,
            });
        },

        computed: {
            ...mapState({params: state => state.params.params}),
        },

        watch: {
            'enabled'(enabled) {
                if (!enabled) {
                    this.setParameter(this.name, params.DISABLED_FIELD_VALUE);
                }
            },
        },

        created() {
            if (this.field.disabled_by) {
                Object.entries(this.field.disabled_by).forEach(([fieldKey, disabled_value]) => {
                    this.$watch(`params.${fieldKey}`, (value) => {
                        return this.enabled = value !== disabled_value;
                    }, {immediate: true,});
                });
            }
            if (this.field.enabled_by) {
                Object.entries(this.field.enabled_by).forEach(([fieldKey, enabled_value]) => {
                    this.$watch(`params.${fieldKey}`, (value) => {
                        return this.enabled = value === enabled_value;
                    }, {immediate: true,});
                });
            }
            this.$watch(`params.${this.name}`, (value) => {
                return this.enabled = value !== params.DISABLED_FIELD_VALUE;
            }, {immediate: true,});
        },

        methods: {
            setParameter(name, value) {
                this.$store.commit(SET_PARAM, {name, value});
            },
        },
    }

</script>
<style lang="less" scoped>
    @import '~uikit/src/less/components/variables';

    .dfm-field.dfm-disabled .dfm-fieldcard {
        opacity: 0.5;
    }
</style>