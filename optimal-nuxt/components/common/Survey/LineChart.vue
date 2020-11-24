<template>
    <div>
        <div class="chartSpecialSurvey row">
            <div class="choice col-md-12 mb-2" v-for="(chart,index) in chartData" v-if="index !== 0">
                <div class="col-md-4 col-4 float-left titleChoice ">
                    <label :class="'choiceLabel' +(checkType ? ' cursor-pointer': '') "
                           @click="selectItem(chart[0])">{{chart[0]}}</label>
                </div>
                <div class="col-md-8 col-8 float-left inputChoice">
                    <div class="gray-bar">
                        <span class="choicePoint">{{rateCalculate(chart[1])}}%</span>
                        <div class="blue-bar" :style="'width:'+rateCalculate(chart[1])+'%;'">
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
</template>
<style>
    .cursor-pointer {
        cursor: pointer;
        color: #0a6975;
    }
</style>
<script>
    export default {
      props:['survey','chartData','rate','type','bus'],

      methods:{
        rateCalculate(rate){
          console.log("burası rate", rate / this.rate * 100);
          return rate === 0 ? 0 : (rate / this.rate * 100).toFixed(2);
        },
        selectItem(select){
          this.$store.dispatch('state_definition/checkLogin').then(response =>{
            if (this.checkType()) {
              let item = this._.find(this.survey.choices, (item)=>{
                return item.choice_title === select
              });

              this.bus.$emit('choice', item);
            }
          }).catch(error =>{
            this.$modal.show('login-modal');
            this.userLogin = false;
          });

        },
        checkType(){
          return this.type === 'approval' ;
        }
      }
    }
</script>
