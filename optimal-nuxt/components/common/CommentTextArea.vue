<template>
    <div class="textarea" style="padding-right: 0">
        <textarea @click="actionSubmitShow()" :placeholder="placeholder" v-model="currentValue" ref="input" :style="inputStyle"></textarea>
    </div>
</template>

<script>
  export default {
    name: 'AutoTextarea',
    props:{
      bus:Object,
      value: String,
      placeholder: String,
      emitName: String
    },
    data () {
      return {
        currentValue: this.value,
        inputHeight: '0'
      }
    },
    watch: {
      currentValue () {
        if (this.currentValue.length === 0) {
          this.inputHeight = '40px'
        }else{
          this.resize()
        }
        this.bus.$emit(this.emitName, this.currentValue)
      }
    },
    created() {

    },
    computed: {
      inputStyle () {
        return {
          'min-height': this.inputHeight
        }
      }
    },
    mounted () {
      this.resize()
    },
    methods: {
      actionSubmitShow() {
        if (this.emitName === 'newComment')
        this.bus.$emit('actionSubmitShowOn', this.currentValue)
      },
      resize () {
        this.inputHeight = `${this.$refs.input.scrollHeight}px`
      }
    }
  }
</script>

<style scoped lang="scss">
    .textarea {
        textarea {
            resize: none;
            overflow: hidden;
            padding: 0.59rem 1rem;
            font-size: 0.875rem;
            color: #495057;
        }
    }
</style>
