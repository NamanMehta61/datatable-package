<template>
    <tbody>
        <tr v-for="(row, index) in tableData" :key="index">
            <td v-for="column in columns" :key="column.name">
                <template v-if="column.component">
                    <component
                        :is="column.component"
                        v-bind="row"
                        @click="handleCustomEvent(column, row)"
                    />
                </template>
                <template v-else>
                    {{ row[column.name] }}
                </template>
            </td>
        </tr>
        <tr v-if="!tableData.length">
            <td :colspan="columns.length" class="no-data">No data available</td>
        </tr>
    </tbody>
</template>

<script>
export default {
    name: 'DataTableRows',
    props: {
        tableData: Array,
        columns: Array,
        handleCustomEvent: Function
    }
};
</script>
