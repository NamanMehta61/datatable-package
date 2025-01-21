<template>
    <thead>
        <tr>
            <th v-for="column in columns" :key="column.name" @click="sortBy(column.name)"
                :class="{ sortable: column.sortable }">
                {{ column?.label || column.name }}
                <span>
                    {{ currentSort === column.name ? (sortDirection === 'asc' ? '▲' : '▼') : '' }}
                </span>
            </th>
        </tr>
    </thead>
</template>

<script>
export default {
    name: 'DataTableHeader',
    props: {
        columns: Array,
        currentSort: String,
        sortDirection: String,
        sortBy: Function
    }
};
</script>