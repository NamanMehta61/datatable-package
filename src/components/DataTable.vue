<!-- src/components/DataTable.vue -->
<template>
    <div class="data-table-container">
       <data-table-error :error="error" />
        <loading-overlay :isLoading="loading" />
        <!-- Per Page Records   -->
        <div class="mb-2">
            <div class="row">
                <div class="col-md-4">
                    
                    <select v-model="perPage" @change="fetchData" class="form-control w-25 d-inline">
                        <option v-for="option in perPageOptions" :key="option" :value="option">
                            {{ option }}
                        </option>
                    </select>
                    <small>Items per page:</small>
                </div>
            </div>
        </div>
        <!-- Per Page Records End -->
        <div class="table-responsive">

             <table class="table table-striped table-bordered">
                 <data-table-header 
                    :columns="columns" 
                    :currentSort="currentSort" 
                    :sortDirection="sortDirection" 
                    :sortBy="sortBy" />
                
                 <data-table-rows 
                    :tableData="tableData" 
                    :columns="columns" 
                    :handleCustomEvent="handleCustomEvent" />
     
             </table>
        </div>
        <!-- Pagination -->
        <data-table-pagination 
            :paginationLinks="paginationLinks" 
            :currentPage="currentPage" 
            :goToNextPage="goToNextPage" 
            :goToPreviousPage="goToPreviousPage" />
        <!-- End Pagination -->

    </div>
</template>

<script>
import axios from 'axios';
import debounce from 'lodash.debounce';
import LoadingOverlay from './LoadingOverlay.vue';
import DataTableHeader from './DataTableHeader.vue';
import DataTableRows from './DataTableRows.vue';
import DataTablePagination from './DataTablePagination.vue';
import DataTableError from './DataTableError.vue';
export default {
    name: 'DataTable',
    components: {
        LoadingOverlay,
        DataTableHeader,
        DataTableRows,
        DataTablePagination,
        DataTableError,
    },
    props: {
        apiUrl: {
            type: String,
            required: true
        },
        columns: {
            type: Array,
            required: true,
            default: () => []
        },
        filters: {
            type: Object,
            default: () => ({})
        },
        debugMode: {
            type: Boolean,
            default: false
        },
        perPageOptions: {
            type: Array,
            default: () => [5,10, 25, 50]
        }
    },
    data() {
        return {
            tableData: [],
            loading: false,
            error: null,
            currentPage: 1,
            totalPages: 0,
            perPage: 10,
            filterValues: {},
            currentSort: null,
            sortDirection: 'asc',
            rawResponse: null,
            paginationLinks:[],
        };
    },
    computed: {
        hasFilters() {
            return Object.keys(this.filters).length > 0;
        }
    },
    methods: {
        async fetchData() {
            if (!this.apiUrl) {
                this.error = 'No API URL provided';
                return;
            }
            this.loading = true;
            this.error = null;

            try {
                const response = await axios.get(this.apiUrl, {
                    params: {
                        page: this.currentPage,
                        length: this.perPage,
                        ...this.filterValues,
                        sort: this.currentSort,
                        sort_direction: this.sortDirection
                    }
                });
                if(response.status === 200) {
                    this.rawResponse = response;
                    this.tableData = response.data.data;
                    if (response.data.links) {
                        this.paginationLinks = response.data.links;
                    }
                    this.$emit('data-loaded', this.tableData);
                }else{
                    const errorMessage = response?.data?.message || 
                        'Failed to fetch data. Please try again.';
                        this.error = errorMessage;
                        this.$emit('data-error', err);
                }
            } catch (err) {
                const errorMessage = err.response?.data?.message || 
                    err.response?.statusText || 
                    'Failed to fetch data. Please try again.';
                this.error = errorMessage;
                this.$emit('data-error', err);
            } finally {
                this.loading = false;
            }
        },
        goToNextPage() {
            if (this.paginationLinks.next) {
                this.currentPage += 1; // Increment current page
                this.fetchData();
            }
        },
        
        goToPreviousPage() {
            if (this.paginationLinks.prev) {
                this.currentPage -= 1; // Increment current page
                this.fetchData();
            }
        },
        // Sorting
        sortBy(column) {
            const columnConfig = this.columns.find(col => col.name === column);

            if (columnConfig && columnConfig.sortable) {
                if (this.currentSort === column) {
                    // Toggle sort direction
                    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
                } else {
                    this.currentSort = column;
                    this.sortDirection = 'asc';
                }
                this.fetchData();
            }
        },
        handleCustomEvent(column, row) {
            if (column.event && column.handler) {
                if (typeof column.handler === 'function') {
                    column.handler(row);
                } else {
                    this.$emit(column.event, row);
                }
            }
        },
    },
    created() {
        this.debouncedFetchData = debounce(this.fetchData, 500);
        
        Object.keys(this.filters).forEach(key => {
            this.$set(this.filterValues, key, '');
        });
        
        this.fetchData();
        
    },
    watch: {
        filterValues: {
            deep: true,
            handler() {
                this.currentPage = 1;
                this.debouncedFetchData();
            }
        }
    }
};
</script>