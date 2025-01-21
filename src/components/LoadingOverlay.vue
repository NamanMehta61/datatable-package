<template>

    <div :class="classes">
        <div class="loading-dialog">
            <span class="ldi mt-5">
                <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
            </span>
            <span class="ldi loading-message">Computing, please be patient...</span>
        </div>
    </div>

</template>

<script>

    export default {

        data(){
            return {
                defaultClasses: "loading-overlay",
                activeClasses: "loading-overlay active",
                classes: ""
            }
        },

        props: {
            isLoading: Boolean
        },

        created(){
            this.classes = this.defaultClasses;
        },

        watch: {
            isLoading(flag){
                this.classes =  flag ? this.activeClasses : this.defaultClasses;
            }
        }

    }

</script>
