<template>

    <div>
        <p v-if="error" class="uk-alert uk-alert-danger">
            <span uk-icon="warning" class="uk-margin-small-right"></span>
            {{ error }}
        </p>
        <ul v-else ref="accordion" uk-accordion="active: 0;" class="dfm-accordion uk-accordion uk-accordion-condensed">
            <li>
                <a class="uk-accordion-title" href="#">
                    <h3 class="uk-margin-remove">{{ 'Output Stats' | trans }}</h3>
                </a>
                <div class="uk-accordion-content">
                    <GeneralTable v-if="mainTableData.length" :main-table-data="mainTableData"
                                  :preview-id="previewRequest.preview_id" />
                </div>
            </li>
            <li>
                <a class="uk-accordion-title" href="#">
                    <h3 v-if="timingActive" class="uk-margin-remove">{{ 'Chart Volatility/Timing' | trans }}</h3>
                    <h3 v-else class="uk-margin-remove">{{ 'Volatility' | trans }}</h3>
                </a>
                <div class="uk-accordion-content">
                    <h5>{{ graphDefinitions.chart_volatility.title }}</h5>
                    <div uk-grid>
                        <div class="uk-width-medium@m">
                            <br/>
                        </div>
                        <div class="uk-width-expand@m">
                            <SvgGraph v-model="graphFilters.chart_volatility"
                                      :graph-definition="graphDefinitions.chart_volatility"
                                      :svg="svgSources['chart_volatility.svg']"
                                      name="chart_volatility" />
                        </div>
                    </div>
                    <template v-if="timingActive">
                        <h5>{{ 'Timing' | trans }}</h5>
                        <div uk-grid>
                            <div class="uk-width-medium@m">
                                <ul class="uk-tab-left" uk-tab="connect: #timing-comp">
                                    <li><a href="#">{{ graphDefinitions.chart_timing_equ_w_f_comp.title }}</a></li>
                                    <li><a href="#">{{ graphDefinitions.chart_timing_equ_w_m_comp.title }}</a></li>
                                    <li v-if="svgSources['chart_timing_pr_w_asp_m_comp.svg']">
                                        <a href="#">{{ graphDefinitions.chart_timing_pr_w_asp_m_comp.title }}</a>
                                    </li>
                                    <li v-if="svgSources['chart_timing_pr_w_usp_m_comp.svg']">
                                        <a href="#">{{ graphDefinitions.chart_timing_pr_w_usp_m_comp.title }}</a>
                                    </li>
                                    <li><a href="#">{{ graphDefinitions.chart_timing_equ_w_m_constant.title }}</a></li>
                                    <li v-if="svgSources['chart_timing_pr_w_asp_m_constant.svg']">
                                        <a href="#">{{ graphDefinitions.chart_timing_pr_w_asp_m_constant.title }}</a>
                                    </li>
                                    <li v-if="svgSources['chart_timing_pr_w_usp_m_constant.svg']">
                                        <a href="#">{{ graphDefinitions.chart_timing_pr_w_usp_m_constant.title }}</a>
                                    </li>
                                    <li v-if="hasTimingOptWConstant">
                                        <a href="#">{{ graphDefinitions.chart_timing_opt_w_constant.title }}</a>
                                    </li>
                                </ul>
                            </div>
                            <div class="uk-width-expand@m">
                                <ul id="timing-comp" class="uk-switcher">
                                    <li>
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_equ_w_f_comp"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_equ_w_f_comp"
                                                     :row-index="timingTablesIndex"
                                                     name="chart_timing_equ_w_f_comp"/>
                                        <SvgGraph v-model="graphFilters.chart_timing_equ_w_f_comp"
                                                  :graph-definition="graphDefinitions.chart_timing_equ_w_f_comp"
                                                  :svg="svgSources['chart_timing_equ_w_f_comp.svg']"
                                                  :legend="false"
                                                  name="chart_timing_equ_w_f_comp" />
                                    </li>
                                    <li>
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_equ_w_m_comp"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_equ_w_m_comp"
                                                     :row-index="timingTablesIndex + 3"
                                                     name="chart_timing_equ_w_m_comp" />
                                        <SvgGraph v-model="graphFilters.chart_timing_equ_w_m_comp"
                                                  :graph-definition="graphDefinitions.chart_timing_equ_w_m_comp"
                                                  :svg="svgSources['chart_timing_equ_w_m_comp.svg']"
                                                  :legend="false"
                                                  name="chart_timing_equ_w_m_comp" />
                                    </li>
                                    <li v-if="svgSources['chart_timing_pr_w_asp_m_comp.svg']">
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_pr_w_asp_m_comp"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_pr_w_asp_m_comp"
                                                     :row-index="timingTablesIndex + 6"
                                                     name="chart_timing_pr_w_asp_m_comp" />
                                        <SvgGraph v-model="graphFilters.chart_timing_pr_w_asp_m_comp"
                                                  :graph-definition="graphDefinitions.chart_timing_pr_w_asp_m_comp"
                                                  :svg="svgSources['chart_timing_pr_w_asp_m_comp.svg']"
                                                  :legend="false"
                                                  name="chart_timing_pr_w_asp_m_comp" />
                                    </li>
                                    <li v-if="svgSources['chart_timing_pr_w_usp_m_constant.svg']">
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_pr_w_usp_m_comp"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_pr_w_usp_m_comp"
                                                     :row-index="timingTablesIndex + 6"
                                                     name="chart_timing_pr_w_usp_m_comp" />
                                        <SvgGraph v-model="graphFilters.chart_timing_pr_w_usp_m_comp"
                                                  :graph-definition="graphDefinitions.chart_timing_pr_w_usp_m_comp"
                                                  :svg="svgSources['chart_timing_pr_w_usp_m_comp.svg']"
                                                  :legend="false"
                                                  name="chart_timing_pr_w_usp_m_comp" />
                                    </li>
                                    <li>
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_equ_w_m_constant"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_equ_w_m_constant"
                                                     :row-index="timingTablesIndex + 9"
                                                     name="chart_timing_equ_w_m_constant" />
                                        <SvgGraph v-model="graphFilters.chart_timing_equ_w_m_constant"
                                                  :graph-definition="graphDefinitions.chart_timing_equ_w_m_constant"
                                                  :svg="svgSources['chart_timing_equ_w_m_constant.svg']"
                                                  :legend="false"
                                                  name="chart_timing_equ_w_m_constant" />
                                    </li>
                                    <li v-if="svgSources['chart_timing_pr_w_asp_m_constant.svg']">
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_pr_w_asp_m_constant"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_pr_w_asp_m_constant"
                                                     :row-index="timingTablesIndex + 12"
                                                     name="chart_timing_pr_w_asp_m_constant" />
                                        <SvgGraph v-model="graphFilters.chart_timing_pr_w_asp_m_constant"
                                                  :graph-definition="graphDefinitions.chart_timing_pr_w_asp_m_constant"
                                                  :svg="svgSources['chart_timing_pr_w_asp_m_constant.svg']"
                                                  :legend="false"
                                                  name="chart_timing_pr_w_asp_m_constant" />
                                    </li>
                                    <li v-if="svgSources['chart_timing_pr_w_usp_m_constant.svg']">
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_pr_w_usp_m_constant"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_pr_w_usp_m_constant"
                                                     :row-index="timingTablesIndex + 12"
                                                     name="chart_timing_pr_w_usp_m_constant" />
                                        <SvgGraph v-model="graphFilters.chart_timing_pr_w_usp_m_constant"
                                                  :graph-definition="graphDefinitions.chart_timing_pr_w_usp_m_constant"
                                                  :svg="svgSources['chart_timing_pr_w_usp_m_constant.svg']"
                                                  :legend="false"
                                                  name="chart_timing_pr_w_usp_m_constant" />
                                    </li>
                                    <li v-if="hasTimingOptWConstant">
                                        <TimingTable v-if="mainTableData.length" v-model="graphFilters.chart_timing_opt_w_constant"
                                                     :main-table-data="mainTableData"
                                                     :preview-id="previewRequest.preview_id"
                                                     :graph-definition="graphDefinitions.chart_timing_opt_w_constant"
                                                     :row-index="timingTablesIndex + 15"
                                                     name="chart_timing_opt_w_constant" />
                                        <SvgGraph v-model="graphFilters.chart_timing_opt_w_constant"
                                                  :graph-definition="graphDefinitions.chart_timing_opt_w_constant"
                                                  :svg="svgSources['chart_timing_opt_w_constant.svg']"
                                                  :legend="false"
                                                  name="chart_timing_opt_w_constant" />
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </template>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title" href="#">
                    <h3 class="uk-margin-remove">{{ graphDefinitions.chart_compound.title }}</h3>
                </a>
                <div class="uk-accordion-content">
                    <CompoundTable v-if="mainTableData.length" v-model="graphFilters.chart_compound"
                                   :main-table-data="mainTableData"
                                   :preview-id="previewRequest.preview_id" />

                    <SvgGraph v-model="graphFilters.chart_compound"
                              :graph-definition="graphDefinitions.chart_compound"
                              :svg="svgSources['chart_compound.svg']"
                              name="chart_compound" />
                </div>
            </li>
            <li>
                <a class="uk-accordion-title" href="#">
                    <h3 class="uk-margin-remove">{{ graphDefinitions.chart_constant.title }}</h3>
                </a>
                <div class="uk-accordion-content">
                    <ConstantTable v-if="mainTableData.length" v-model="graphFilters.chart_constant"
                                   :main-table-data="mainTableData"
                                   :preview-id="previewRequest.preview_id" />

                    <SvgGraph v-model="graphFilters.chart_constant"
                              :graph-definition="graphDefinitions.chart_constant"
                              :svg="svgSources['chart_constant.svg']"
                              name="chart_constant" />
                </div>
            </li>
            <li>
                <a class="uk-accordion-title" href="#">
                    <h3 class="uk-margin-remove">{{ 'Chart # stocks/histogram' | trans }}</h3>
                </a>
                <div class="uk-accordion-content">
                    <h5>{{ graphDefinitions.chart_nr_stocks_a_screening.title }}</h5>
                    <div uk-grid>
                        <div class="uk-width-medium@m">
                            <br/>
                        </div>
                        <div class="uk-width-expand@m">
                            <SvgGraph v-model="graphFilters.chart_nr_stocks_a_screening"
                                      :graph-definition="graphDefinitions.chart_nr_stocks_a_screening"
                                      :svg="svgSources['chart_nr_stocks_a_screening.svg']"
                                      name="chart_nr_stocks_a_screening" />
                        </div>
                    </div>
                    <h5>{{ 'Return distribution' | trans }}</h5>
                    <div uk-grid>
                        <div class="uk-width-medium@m">
                            <ul class="uk-tab-left" uk-tab="connect: #timing-const">
                                <li><a href="#">{{ graphDefinitions.chart_return_distribution_equ_w.title }}</a></li>
                                <li><a href="#">{{ graphDefinitions.chart_return_distribution_pr_w.title }}</a></li>
                                <li><a href="#">{{ graphDefinitions.chart_return_distribution_opt_w.title }}</a></li>
                            </ul>
                        </div>
                        <div class="uk-width-expand@m">
                            <ul id="timing-const" class="uk-switcher">
                                <li>
                                    <SvgGraph v-model="graphFilters.chart_return_distribution_equ_w"
                                              :graph-definition="graphDefinitions.chart_return_distribution_equ_w"
                                              :svg="svgSources['chart_return_distribution_equ_w.svg']"
                                              name="chart_return_distribution_equ_w" />
                                </li>
                                <li>
                                    <SvgGraph v-model="graphFilters.chart_return_distribution_pr_w"
                                              :graph-definition="graphDefinitions.chart_return_distribution_pr_w"
                                              :svg="svgSources['chart_return_distribution_pr_w.svg']"
                                              name="chart_return_distribution_pr_w" />
                                </li>
                                <li>
                                    <SvgGraph v-model="graphFilters.chart_return_distribution_opt_w"
                                              :graph-definition="graphDefinitions.chart_return_distribution_opt_w"
                                              :svg="svgSources['chart_return_distribution_opt_w.svg']"
                                              name="chart_return_distribution_opt_w" />
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </li>
            <li>
                <a class="uk-accordion-title" href="#">
                    <h3 class="uk-margin-remove">{{ 'Monday trades' | trans }}</h3>
                </a>
                <div class="uk-accordion-content">
                    <StockTable v-if="stockTableData" :stock-table-data="stockTableData" />
                </div>
            </li>
        </ul>
    </div>
</template>
<script>
import defaults from 'lodash/defaults';
import get from 'lodash/get';
import Papa from 'papaparse';

import StockTable from '@/components/StockTable';
import GeneralTable from '@/components/GeneralTable';
import CompoundTable from '@/components/CompoundTable';
import ConstantTable from '@/components/ConstantTable';
import TimingTable from '@/components/TimingTable';
import SvgGraph from '@/components/SvgGraph';
import {mapState} from 'vuex';

const MAINTABLE_CSV_NAME = 'main_table.csv';
const STOCKTABLE_CSV_NAME = 'monday_trades.csv';

const licenseRegex = /(\[[A-Z0-9]{5}-[[A-Z0-9]{5}-[[A-Z0-9]{5}-[[A-Z0-9]{5}-[[A-Z0-9]{5}\])/;

export default {

    name: 'Preview',

    components: {
        StockTable,
        GeneralTable,
        CompoundTable,
        ConstantTable,
        SvgGraph,
        TimingTable,
    },

    props: {
        previewRequest: Object,
    },

    data() {
        return {
            graphFilters: defaults((JSON.parse(sessionStorage.getItem('graphFilters') || '{}')), {
                chart_compound: ['equ_w_m', 'random_500_f',],
                chart_constant: [
                    'equ_w_m_net_liquidation_value', 'pr_w_asp_m_cashflow', 'pr_w_usp_m_cashflow',
                    'prw_asp_m_net_liquidation', 'prw_usp_m_net_liquidation',],
                chart_nr_stocks_a_screening: ['stocks_before_ranking', 'stocks_required',],
                chart_volatility: ['volatility',],
                chart_timing_equ_w_f_comp: ['default', 'best', 'worst',],
                chart_timing_equ_w_m_comp: ['default', 'best', 'worst',],
                chart_timing_pr_w_asp_m_comp: ['default', 'best', 'worst',],
                chart_timing_pr_w_usp_m_comp: ['default', 'best', 'worst',],
                chart_timing_equ_w_m_constant: ['default', 'best', 'worst',],
                chart_timing_pr_w_asp_m_constant: ['default', 'best', 'worst',],
                chart_timing_pr_w_usp_m_constant: ['default', 'best', 'worst',],
                chart_timing_opt_w_constant: ['default', 'best', 'worst',],
                chart_return_distribution_equ_w: ['return_distribution',],
                chart_return_distribution_pr_w: ['return_distribution',],
                chart_return_distribution_opt_w: ['return_distribution',],
            }),
            graphDefinitions: {
                chart_compound: {
                    title: this.$trans('chart.title.compound'),
                    dataSets: [
                        {
                            className: 'equ_w_f',
                            legend: this.$trans('chart.legend.equ_w_f'),
                        },
                        {
                            className: 's_p_500',
                            legend: this.$trans('chart.legend.s_p_500'),
                        },
                        {
                            className: 'djia',
                            legend: this.$trans('chart.legend.djia'),
                        },
                        {
                            className: 'random_500_f',
                            legend: this.$trans('chart.legend.random_500_f'),
                        },
                        {
                            className: 'equ_w_m',
                            legend: this.$trans('chart.legend.equ_w_m'),
                        },
                        {
                            className: 'pr_w_asp_m',
                            legend: this.$trans('chart.legend.pr_w_asp_m'),
                        },
                        {
                            className: 'pr_w_usp_m',
                            legend: this.$trans('chart.legend.pr_w_usp_m'),
                        },
                    ],
                },
                chart_constant: {
                    title: this.$trans('chart.title.constant'),
                    dataSets: [
                        {
                            className: 'equ_w_m_cashflow',
                            legend: this.$trans('chart.legend.equ_w_m_cashflow'),
                        },
                        {
                            className: 'equ_w_m_net_liquidation_value',
                            legend: this.$trans('chart.legend.equ_w_m_net_liquidation_value'),
                        },
                        {
                            className: 'pr_w_asp_m_cashflow',
                            legend: this.$trans('chart.legend.pr_w_asp_m_cashflow'),
                        },
                        {
                            className: 'pr_w_usp_m_cashflow',
                            legend: this.$trans('chart.legend.pr_w_usp_m_cashflow'),
                        },
                        {
                            className: 'prw_asp_m_net_liquidation',
                            legend: this.$trans('chart.legend.prw_asp_m_net_liquidation'),
                        },
                        {
                            className: 'prw_usp_m_net_liquidation',
                            legend: this.$trans('chart.legend.prw_usp_m_net_liquidation'),
                        },
                        {
                            className: 'opt_w_cashflow',
                            legend: this.$trans('chart.legend.opt_w_cashflow'),
                        },
                        {
                            className: 'opt_w_net_liquidation_value',
                            legend: this.$trans('chart.legend.opt_w_net_liquidation_value'),
                        },
                        {
                            className: 's_p_500_cashflow',
                            legend: this.$trans('chart.legend.sandp500_cashflow'),
                        },
                        {
                            className: 'djia_cashflow',
                            legend: this.$trans('chart.legend.djia_cashflow'),
                        },
                    ],
                },
                chart_nr_stocks_a_screening: {
                    title: this.$trans('chart.title.nr_stocks_a_screening'),
                    dataSets: [
                        {
                            className: 'stocks_before_ranking',
                            legend: this.$trans('chart.legend.stocks_before_ranking'),
                        },
                        {
                            className: 'stocks_required',
                            legend: this.$trans('chart.legend.stocks_required'),
                        },
                    ],
                },
                chart_volatility: {
                    title: this.$trans('chart.title.volatility'),
                    dataSets: [
                        {
                            className: 'volatility',
                            legend: this.$trans('chart.legend.volatility'),
                        },
                    ],
                },
                chart_timing_equ_w_f_comp: {
                    title: this.$trans('chart.title.timing_equ_w_f_comp'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_timing_equ_w_m_comp: {
                    title: this.$trans('chart.title.timing_equ_w_m_comp'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_timing_pr_w_asp_m_comp: {
                    title: this.$trans('chart.title.timing_pr_w_asp_m_comp'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_timing_pr_w_usp_m_comp: {
                    title: this.$trans('chart.title.timing_pr_w_usp_m_comp'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_timing_equ_w_m_constant: {
                    title: this.$trans('chart.title.timing_equ_w_m_constant'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_timing_pr_w_asp_m_constant: {
                    title: this.$trans('chart.title.timing_pr_w_asp_m_constant'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_timing_pr_w_usp_m_constant: {
                    title: this.$trans('chart.title.timing_pr_w_usp_m_constant'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_timing_opt_w_constant: {
                    title: this.$trans('chart.title.timing_opt_w_constant'),
                    dataSets: this.timingTableDataSets(),
                },
                chart_return_distribution_equ_w: {
                    title: this.$trans('chart.title.return_distribution_equ_w'),
                    dataSets: [
                        {
                            className: 'return_distribution',
                            legend: this.$trans('chart.legend.return_distribution'),
                        },
                    ],
                },
                chart_return_distribution_pr_w: {
                    title: this.$trans('chart.title.return_distribution_pr_w'),
                    dataSets: [
                        {
                            className: 'return_distribution',
                            legend: this.$trans('chart.legend.return_distribution'),
                        },
                    ],
                },
                chart_return_distribution_opt_w: {
                    title: this.$trans('chart.title.return_distribution_opt_w'),
                    dataSets: [
                        {
                            className: 'return_distribution',
                            legend: this.$trans('chart.legend.return_distribution'),
                        },
                    ],
                },
            },
        };
    },

    computed: {
        error() {
            return Object.keys(this.previewRequest.files)
                .filter(filename => filename.includes('error'))
                .map(filename => this.previewRequest.files[filename].replace(licenseRegex, ''))
                .join(', ');
        },
        stockTableData() {
            if (!this.csvSources[STOCKTABLE_CSV_NAME]) {
                return [];
            }
            return this.csvSources[STOCKTABLE_CSV_NAME].data;
        },
        mainTableData() {
            if (!this.csvSources[MAINTABLE_CSV_NAME]) {
                return [];
            }
            return this.csvSources[MAINTABLE_CSV_NAME].data;
        },
        timingTablesIndex() {
            const index = this.mainTableData.findIndex(row => row[0] === 'Return curve');
            return index + 1;
        },
        hasTimingOptWConstant() {
            return get(this.mainTableData, `${this.timingTablesIndex + 16}.2`, '') !== '';
        },
        csvSources() {
            const sources = {};
            Object.keys(this.previewRequest.files).filter(filename => filename.includes('.csv')).forEach(filename => {
                sources[filename] = Papa.parse(this.previewRequest.files[filename], {
                    header: false,
                });
            });
            return sources;
        },
        svgSources() {
            const sources = {};
            Object.keys(this.previewRequest.files).filter(filename => filename.includes('.svg')).forEach(filename => {
                sources[filename] = this.previewRequest.files[filename];
            });
            return sources;
        },
        timingActive() {
            return this.params.Timing === '1';
        },
        ...mapState({
            params: state => state.params.params,
        }),
    },

    watch: {
        'graphFilters': {
            handler(filter) {
                sessionStorage.setItem('graphFilters', JSON.stringify(filter));
            },
            deep: true,
        }
    },

    methods: {
        timingTableDataSets() {
            return [
                {
                    className: 'default',
                    legend: this.$trans('chart.legend.default'),
                },
                {
                    className: 'worst',
                    legend: this.$trans('chart.legend.worst'),
                },
                {
                    className: 'best',
                    legend: this.$trans('chart.legend.best'),
                },
            ];
        },
    },
};
</script>
