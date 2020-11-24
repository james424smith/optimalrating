<template>
    <footer class="footer mt-auto">
        <div class="copyright ">
            <div class="container">
                <ul class="footer-menu">
                    <li v-for="page in pages">
                        <nuxt-link :to="'/pages/'+page.slug">{{$t(page.translate_key) ?$t(page.translate_key) : page.title }}</nuxt-link></li>
                </ul>
            </div>
        </div>
    </footer>
</template>
<script>
  import {mapState} from 'vuex';
  export default {
    data(){
      return {
        pages : []
      }
    },
    mounted(){
      this.$store.dispatch('state_definition/pages').then(response =>{
        this.pages =  this._.orderBy(response, ["order"], ['asc']);;
      });
    },
  }
</script>
<style>
    .footer .copyright{
        background-color: #3a99ab;
        padding-top: 1rem !important;
    }
    .copyright {
        padding: 15px !important;
    }

    .footer{
        position: relative;
        z-index: 9;
    }

    .footer-menu {
        display: flex;
        align-items: center;
        justify-content: center;
    }
    .footer-menu li {
        float: left;
        margin-left: 20px;
    }

    .footer-menu li a{
        color: #fff;
    }
    .copyright-text {
        float: right;
        padding-right: 15px;
    }
</style>
