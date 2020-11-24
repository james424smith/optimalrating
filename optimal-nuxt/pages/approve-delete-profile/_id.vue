<template>
    <no-ssr>
        <div class="col-9 float-right">
            <div class="card card-default p-3">
                <h6>{{$t('lbl.please_wait')}}</h6>
            </div>
        </div>
    </no-ssr>
</template>
<script>
  export default {
    head: {
      title: 'Optimal Rating',
      meta: [
        {charset: 'utf-8'},
        {name: 'viewport', content: 'width=device-width, initial-scale=1'},
      ],
    },
    created(){
      if (process.client) {
        this.$store.dispatch('state_definition/checkLogin').then(response =>{
          let res = response.result.set.user ;
          if (res.status === 'freeze') {
            this.$router.push('/profile-approve?status=approve');
          }
          this.userLogin = true;
        }).catch(error =>{
          this.$router.push('/')
        });
        this.delete()
      }

    },
    methods:{
      delete(){
        let id = this.$route.params.id;

        let data = {
          url: 'approve-delete-profile/'+id,
          method:'getData'
        };
        this.actions(data).then(response =>{
          if (response.code == 200) {
            this.$toast.success(this.$t('msg.profile_deleted'));
            localStorage.clear();
            window.location.replace('/');
            return;
          }
          localStorage.clear();
          this.$toast.error(this.$t('msg.error_profile_delete'));
          this.$router.push('/')
        }).catch(() => {
          localStorage.clear();
          this.$router.push('/')
        })
      },

      actions(data){
        return this.$store.dispatch('state_definition/userController', data)
      }
    }
  }
</script>
