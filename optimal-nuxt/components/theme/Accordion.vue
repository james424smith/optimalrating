<template>
    <div class="col-xl-3">
        <div class="card card-default">
            <div id="accordionWorld" class="accordion">
                <div>
                    <div class="card">
                        <div class="card-header" id="worldAcord">
                            <button class="btn btn-link collapsed collapsed-button"
                                    data-toggle="collapse"
                                    data-target="#ArchiveAcrCol"
                                    aria-expanded="false"
                                    aria-controls="collapseOne"
                                    @click="worldDataGet"
                            >
                               <i class="fa fa-globe"></i> {{$t('lbl.world')}}
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="card card-default">
            <div id="accordion" class="accordion">
                <!-- <div>
                    <div class="card">
                        <div class="card-header" id="ArchiveAcr">
                            <button class="btn btn-link collapsed collapsed-button" data-toggle="collapse" data-target="#ArchiveAcrCol" aria-expanded="false" aria-controls="collapseOne">
                                {{$t('lbl.archive')}}
                            </button>
                        </div>
                    </div>
                </div> -->
                <top-voted />
                <newest />
                <subjects />
            </div>
        </div>
        <!--<div class="card card-default">
            <div id="accordion2" class="accordion">
                <archive />
            </div>
        </div>-->
    </div>
</template>
<script>
  import TopVoted from '~/components/common/TopVoted'
  import Newest from '~/components/common/Newest'
  import Subjects from '~/components/common/Subjects'
  import Archive from '~/components/common/Archive'
  import {mapState} from 'vuex';
  export default {
    components : {
      TopVoted,
      Newest,
      Subjects,
      Archive
    },
    methods:{
      worldDataGet(){
        localStorage.setItem('country', null);
        this.$i18n.locale = 'en';
        this.$store.dispatch('state_definition/getHomeSpecialSurvey');
        this.$store.dispatch('state_definition/getHomeSurveyApproval');/**/
        this.$store.dispatch('state_definition/getAllCategory');/**/
        this.$router.push('/');
      }
    }
  }
</script>
<style>
    .collapsed-button {
        width: 100%!important;
    }
    .accordion-link {
        color:#3a99ab;
    }
    .accordion-link:hover {
        color:#3a99ab;
    }
</style>
