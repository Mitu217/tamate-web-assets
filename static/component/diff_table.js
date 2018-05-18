(() => {
    Vue.component('diff-table', Vue.extend({
        data: function(){
            return {
                diffColumns: [],
            }
        },
        props: [ 'data' ],
        methods: {

        },
        created: function() {
            let diffColumns = [];
            if (this.data !== undefined && this.data !== null && this.data.length > 0) {
                const data = this.data[0];
                diffColumns = [...Object.keys(data.left), ...Object.keys(data.right)];
                diffColumns = diffColumns.filter(function (item, pos) {return diffColumns.indexOf(item) == pos});
            }
            this.diffColumns = diffColumns;
        },
        template:
            `
            <div class="el-table el-table--fit el-table--border el-table--enable-row-hover el-table--enable-row-transition" style="width: 100%; margin-top: 20px;">
                <div class="hidden-columns">
                    <div v-for="diffColumn in diffColumns"></div>
                </div>
                <div class="el-table__header-wrapper">
                    <table cellspacing="0" cellpadding="0" border="0" class="el-table__header" style="width: 100%;">
                        <colgroup>
                            <col v-for="(diffColumn, index) in diffColumns" :name="'el-table-diff_column_' + index"></col>
                        </colgroup>
                        <thead class="has-gutter">
                            <tr>
                                <th v-for="(diffColumn, index) in diffColumns" colspan="1" rowspan="1" :class="'el-table-diff_column_' + index + ' is-leaf'">
                                    <div class="cell">
                                        {{ diffColumn }}
                                    </div>
                                </th>
                            </tr>
                        </thead>
                    </table>
                </div>
                <div class="el-table__body-wrapper is-scrolling-none">
                    <table v-if="diffColumns.length > 0" cellspacing="0" cellpadding="0" border="0" class="el-table__body" style="width: 100%;">
                        <colgroup>
                            <col v-for="(diffColumn, index) in diffColumns" :name="'el-table-diff_column_' + index"></col>
                        </colgroup>
                        <tbody>
                            <tr v-for="d in data" class="el-table__row">
                                <td v-for="(diffColumn, columnIndex) in diffColumns" colspan="1" rowspan="1" :class="'el-table-diff_column_' + columnIndex + ' is-leaf'">
                                    <div class="cell">
                                        <div v-if="d.left[diffColumn] && d.right[diffColumn]">
                                            <div v-if="d.left[diffColumn] === d.right[diffColumn]">
                                                <p>{{ d.left[diffColumn] }}</p>
                                            </div>
                                            <div v-if="d.left[diffColumn] !== d.right[diffColumn]">
                                                <p style="color:red">{{ d.left[diffColumn] }}</p>
                                                <p style="color:green">{{ d.right[diffColumn] }}</p>
                                            </div>
                                        </div>
                                        <div v-else-if="d.left[diffColumn]">
                                            <div>
                                                <p style="color:red">{{ d.left[diffColumn] }}</p>
                                            </div>
                                        </div>
                                        <div v-else-if="d.right[diffColumn]">
                                            <div>
                                                <p style="color:green">{{ d.right[diffColumn] }}</p>
                                            </div>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div v-else class="el-table__empty-block"><span class="el-table__empty-text">データなし</span></div>
                    <div class="el-table__column-resize-proxy" style="display: none;"></div>
                </div>
            </div>
            `
    }));
})();