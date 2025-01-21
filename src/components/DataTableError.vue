<template>
    <div v-if="error" class="alert alert-danger mb-3" role="alert">
        {{ error }}
    </div>
</template>

<script>
export default {
    name: 'DataTableError',
    props: {
        error: String
    }
};
</script>
