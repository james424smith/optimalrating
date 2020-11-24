<template>
    <no-ssr>
        <div class="col-9 float-right">
            <div class="card card-default p-3">
                <h3 class="mb-5">{{$t('lbl.reset_your_password')}}</h3>
                <div class="col-12">
                    <div class="col-4 float-left">
                        {{$t('lbl.please_input_your_email')}}
                    </div>
                    <div class="col-8 float-left">
                        <input type="text" class="form-control" v-model="user">
                    </div>
                </div>
            </div>
            <div class="card-footer" style="padding: 12px 16px;">

                <div class="float-right">
                    <button class="btn btn-optimal" @click="reset">{{$t('lbl.save')}}</button>
                </div>
                <div class="clearfix"></div>
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
    data(){
      return {
        user:null
      }
    },
    methods:{
      reset(){
        let data = {
          url: 'reset-my-password',
          method:'postData',
          data:{
            user:this.user
          }
        };
        this.actions(data).then(response =>{
          if (response.code == 200) {
            this.$toast.success(this.$t('msg.password_reset_sent'));
            localStorage.clear();
            this.$router.push('/')
            return;
          }
          this.$toast.error(this.$t('msg.error_password_reset'));
          this.$router.push('/')
        })
      },

      actions(data){
        return this.$store.dispatch('state_definition/userController', data)
      }
    }
  }
</script>
