Component.C({
  data: {header:0},
  created: function() {
    this.$id = 1
    console.log('[Component/Header] created', this.properties, this.is)
  },
  attached: function() {
    console.log('[Component/Header] attached', this.properties, this.is, this.$root)
  },
  ready: function() {
    console.log(this.$data())
    this.$set({header:222});
    // 调用父组件方法
    this.$call('callFromComponent', 'header')
    console.log('[Component/Header] ready', this.properties, this.is)
    
  },
  methods: {
    callFromComponent: function (from) {
      
      console.log('!!! call from:', from)
    }
  }
})
