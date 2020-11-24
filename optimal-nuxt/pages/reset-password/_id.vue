<template>
    <no-ssr>
        <div class="col-9 float-right">
            <div class="card card-default p-3">
                <h3 class="mb-5">{{$t('lbl.reset_your_password')}}</h3>
                <div class="col-12">
                    <div class="col-4 float-left">
                        {{$t('lbl.new_password')}}
                    </div>
                    <div class="col-8 float-left">
                        <input type="password" class="form-control" v-model="password">
                    </div>
                </div>
                <div class="col-12" style="margin-top: 20px">
                    <div class="col-4 float-left">
                        {{$t('lbl.new_password_re_type')}}
                    </div>
                    <div class="col-8 float-left">
                        <input type="password" class="form-control" v-model="password_re">
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
      return{
        password_re:null,
        password:null
      }
    },
    methods:{
      reset(){
        if (this.password === null) {
          this.$toast.error(this.$t('msg.error_please_input_password'));
          return
        }

        let id = this.$route.params.id;
        let data = {
          url: 'new-password/'+id,
          method:'postData',
          data:{
            password:this.password
          }
        };
        this.actions(data).then(response =>{
          if (response.code == 200) {
            this.$toast.success(this.$t('msg.password_changed'));
            localStorage.clear();
            this.$router.push('/')
            return;
          }
          localStorage.clear();
          this.$toast.error(this.$t('msg.error_password_change'));
          this.$router.push('/')
        }).catch(() => {
          localStorage.clear();
        })
      },

      actions(data){
        return this.$store.dispatch('state_definition/userController', data)
      }
    }
  }
</script>
