<template>
    <div>
        <div class="uk-flex uk-flex-center uk-flex-wrap legend">
            <div v-for="field in graphDefinition.dataSets" :key="field.className">
                <label :class="[filter.includes(field.className) ? 'active' : '']">
                    <input v-model="filter"
                           :value="field.className"
                           type="checkbox"
                           class="uk-checkbox uk-margin-small-right"/>
                    <span class="legend-line" :class="field.className"></span>
                    {{ field.legend }}
                </label>
            </div>
        </div>
        <div ref="svg" v-html="svg"></div>
    </div>
</template>
<script>

export default {

    name: 'SvgGraph',

    props: {
        value: Array,
        name: String,
        graphDefinition: Object,
        svg: String,
    },

    computed: {
        filter: {
            get() {
                return this.value;
            },
            set(value) {
                this.$emit('input', value);
            },
        },
    },

    mounted() {
        this.$watch('filter', this.applyFilter, {immediate: true,});
    },

    methods: {
        applyFilter() {
            const activeRegex = new RegExp(`(${this.filter.join('|')})`);
            Array.from(this.$refs.svg.getElementsByClassName('graph')).forEach(el => {
                const visible = this.filter.length && el.getAttribute('class').match(activeRegex) !== null;
                el.classList[visible ? 'add' : 'remove']('graph-visible');
            });
        },
    },
};
</script>
<style lang="less">
    @import '~uikit/src/less/components/variables';
    @graph_1: #d98f8b;
    @graph_2: #95b2c0;
    @graph_3: #c2c383;
    @graph_4: #e0b093;
    @graph_5: #c4e4ee;
    @graph_6: #b4aea3;
    @graph_7: #fbd6a9;
    .legend > div {
        margin: 0 5px 5px 0;
        label {
            padding: 3px 8px;
            border: 1px solid rgba(255, 225, 255, 0.1);
            transition: border 0.5s ease-in-out;
            &.active {
                border: 1px solid rgba(255, 225, 255, 0.6);
            }
        }
    }
    .legend-line {
        display: inline-block;
        position: relative;
        width: 30px;
        height: 10px;
        &::after {
            position: absolute;
            content: "";
            height: 2px;
            top: 4px;
            left: 0;
            right: 0;
        }
        &.equ_w_f::after {background-color: @graph_1;}
        &.equ_w_m::after {background-color: @graph_2;}
        &.pr_w_asp_m::after {background-color: @graph_3;}
        &.random_500_f::after {background-color: @graph_4;}
        &.s_p_500::after {background-color: @graph_5;}
        &.equ_w_m_cashflow::after {background-color: @graph_1;}
        &.equ_w_m_net_liquidation_value::after {background-color: @graph_2;}
        &.opt_w_cashflow::after {background-color: @graph_3;}
        &.opt_w_net_liquidation_value::after {background-color: @graph_4;}
        &.pr_w_asp_m_cashflow::after {background-color: @graph_5;}
        &.prw_m_net_liquidation::after {background-color: @graph_6;}
        &.sandp500_cashflow::after {background-color: @graph_7;}
        &.stocks_before_ranking::after {background-color: @graph_1;}
        &.stocks_required::after {background-color: @graph_2;}
        &.volatility::after {background-color: @graph_3;}
    }
    svg {
        .graph {
            transition: opacity 0.5s ease-in-out;
            opacity: 0;
        }
        .graph-visible {
            opacity: 1;
        }
        &.chart_compound {
            .equ_w_f {stroke: @graph_1;}
            .equ_w_m {stroke: @graph_2;}
            .pr_w_asp_m {stroke: @graph_3;}
            .random_500_f {stroke: @graph_4;}
            .s_p_500 {stroke: @graph_5;}
        }
        &.chart_constant {
            .equ_w_m_cashflow {stroke: @graph_1;}
            .equ_w_m_net_liquidation_value {stroke: @graph_2;}
            .opt_w_cashflow {stroke: @graph_3;}
            .opt_w_net_liquidation_value {stroke: @graph_4;}
            .pr_w_asp_m_cashflow {stroke: @graph_5;}
            .prw_m_net_liquidation {stroke: @graph_6;}
            .sandp500_cashflow {stroke: @graph_7;}
        }
        &.chart_miscellaneous {
            .stocks_before_ranking {stroke: @graph_1;}
            .stocks_required {stroke: @graph_2;}
            .volatility {stroke: @graph_3;}
        }

    }
</style>