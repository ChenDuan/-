<template>
  <div class="m-menu">
    <dl class="nav" @mouseleave="mouseleave">
      <dt>全部分类</dt>
      <dd v-for="(item,index) in $store.state.home.menu" :key="index" @mouseover="enter">
        <i :class="item.type"></i>{{item.name}}<span class="arrow"></span>
      </dd>
    </dl>
    <div v-if="kind" class="detail" @mouseleave="sout" @mouseenter="sover">
      <template v-for="(item,index) in curdetail.child">
        <h4 :key="index">{{item.title}}</h4>
        <span v-for="v in item.child" :key="v">{{v}}</span>
      </template>
      <h4>标题</h4>
      <span></span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      kind: '',
      menu: [{
        type:'food',
        name:'美食',
        _timer: null,
        child:[{
          title:'美食',
          child:['代金券','甜点饮品','火锅','自助餐','小吃快餐']
        }]
      },{
        type:'takeout',
        name:'外卖',
        child:[{
          title:'外卖',
          child:['美团外卖']
        }]
      },{
        type:'hotel',
        name:'酒店',
        child:[{
          title:'酒店星级',
          child:['经济型','舒适/三星','高档/四星','豪华/五星']
        }]
      }]
    }
  },
  methods: {
    enter(e) {
      this.kind = e.target.querySelector('i').className
    },

    mouseleave() {
      this._timer = setTimeout(() => {
        this.kind = ''
      },150)
    },
    sout() {
      this.kind = ''
    },
    sover:function(){
      clearTimeout(this._timer)
    },
  },
  computed: {
    curdetail: function() {
      return this.$store.state.home.menu.filter((item) => item.type == this.kind)[0]
    }
  }
}
</script>

