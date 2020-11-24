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
        this.changeEmail()
      }

    },
    methods:{
      changeEmail(){
        let id = this.$route.params.id;

        let data = {
          url: 'verify-email-change/'+id,
          method:'getData'
        };
        this.actions(data).then(response =>{
          if (response.code == 200) {
            this.$toast.success(this.$t(response.message));
            this.$router.push('/profile')
            return;
          }
          this.$toast.error(this.$t(response.message));
          this.$router.push('/')
        })
      },

      actions(data){
        return this.$store.dispatch('state_definition/userController', data)
      }
    }
  }
</script>
