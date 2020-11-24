<template>
    <modal name="profile-verify-message-modal" height="auto">

         <div class="modal-header">
            <h3>{{$t('lbl.profile_verify')}}</h3>
            <a href="javascript:;" @click="closeModal">X</a>
        </div>

        <div class="modal-body">
            <div class="col-lg-12 float-left">
               <p>{{$t('lbl.complete_profile_information_message')}}</p>
                <br>
            </div>
        </div>
        <div class="clearfix"></div>
        <div class="modal-footer">
            <slot name="footer">
                <button class="btn btn-secondary" @click="closeModal">{{$t('lbl.cancel')}}</button>
                <button class="btn btn-optimal" @click="profileCheck">{{$t('lbl.profile')}}</button>
            </slot>
        </div>
    </modal>

</template>
<style>


</style>
<script>

  export default {
    methods:{
      closeModal(){
        this.$modal.hide('profile-verify-message-modal');
      },
      profileCheck(){
        this.$router.push('/profile?status=verify')
        this.$modal.hide('profile-verify-message-modal');
      },
      sssVerify(){}
    }
  }
</script>














