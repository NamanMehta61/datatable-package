<template>
    <div class="d-flex justify-content-between">
        <div class="flex mb-3 sm:mb-0">
            <p class="leading-5 text-gray-700 text-base"> Showing 
                <span class="font-medium">Page {{ currentPage }}</span> 
            </p>
        </div>
        <div class="flex">
            <ul class="pagination">
                <li class="page-item pagination-prev-nav" :class="{ 'disabled': !paginationLinks.prev }">
                    <button @click="goToPreviousPage" :disabled="!paginationLinks.prev" class="page-link">
                        <span> Previous </span>
                    </button>
                </li>
                <li class="page-item pagination-next-nav" :class="{ 'disabled': !paginationLinks.next }">
                    <button @click="goToNextPage" :disabled="!paginationLinks.next" class="page-link">
                        <span> Next </span>
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
export default {
    name: 'DataTablePagination',
    props: {
        paginationLinks: Object,
        currentPage: Number,
        goToNextPage: Function,
        goToPreviousPage: Function
    }
};
</script>
