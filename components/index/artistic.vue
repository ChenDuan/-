<template>
  <section class="m-istyle">
    <dl @mouseover="over">
      <dt>有格调</dt>
      <dd
        :class="{active:kind==='all'}"
        kind="all"
        keyword="景点">全部</dd>
      <dd
        :class="{active:kind==='part'}"
        kind="part"
        keyword="美食">约会聚餐</dd>
      <dd
        :class="{active:kind==='spa'}"
        kind="spa"
        keyword="丽人">丽人SPA</dd>
      <dd
        :class="{active:kind==='movie'}"
        kind="movie"
        keyword="电影">电影演出</dd>
      <dd
        :class="{active:kind==='travel'}"
        kind="travel"
        keyword="旅游">品质出游</dd>
    </dl>
    <ul class="ibody">
      <li
        v-for="item in cur"
        :key="item.title"
      >
      <el-card
        :body-style="{padding:'0px'}"
        shadow="never"
      >
        <img :src="item.img" alt="" class="image">
        <ul class="cbody">
          <li class="title">{{item.title}}</li>
          <li class="pos">{{item.pos}}</li>
          <li class="price">￥<em>{{item.price}}</em><span>/起</span></li>
        </ul>
      </el-card>

      </li>
    </ul>
  </section>
</template>

<script>
export default {
  data() {
    return {
      kind: 'all',
      list: {
        all:[
          {
            title: '如家酒店',
            pos: '学校周边',
            price: '500',
            img:'//p0.meituan.net/deal/201105/15/5_0515144655.jpg@736w_416h_1e_1c',
            url: '//abc.com'
          },
          {
            title: '温泉酒店',
            pos: '免押金,停车',
            price: '200',
            img: '//p0.meituan.net/deal/201105/15/5_0515144655.jpg@736w_416h_1e_1c'
          },
          {
            title: '7天酒店',
            pos: '免押金,停车',
            price: '200',
            img: '//p0.meituan.net/deal/201105/15/5_0515144655.jpg@736w_416h_1e_1c'
          },

        ],
        part: [
          {
            title: '如家酒店',
            pos: '学校周边',
            price: '500',
            img:'',
            url: '//abc.com'
          },
          {
            title: '温泉酒店',
            pos: '免押金,停车',
            price: '200',
            img: '//p0.meituan.net/deal/201105/15/5_0515144655.jpg@736w_416h_1e_1c'
          },
        ],
        spa: [
          {
            title: '如家酒店',
            pos: '学校周边',
            price: '500',
            img:'',
            url: '//abc.com'
          },
          {
            title: '温泉酒店',
            pos: '免押金,停车',
            price: '200',
            img: '//p0.meituan.net/deal/201105/15/5_0515144655.jpg@736w_416h_1e_1c'
          },
        ],
        movie: [
          {
            title: '如家酒店',
            pos: '学校周边',
            price: '500',
            img:'',
            url: '//abc.com'
          },
          {
            title: '温泉酒店',
            pos: '免押金,停车',
            price: '200',
            img: '//p0.meituan.net/deal/201105/15/5_0515144655.jpg@736w_416h_1e_1c'
          },
        ],
        travel: [
          {
            title: '如家酒店',
            pos: '学校周边',
            price: '500',
            img:'',
            url: '//abc.com'
          },
          {
            title: '温泉酒店',
            pos: '免押金,停车',
            price: '200',
            img: '//p0.meituan.net/deal/201105/15/5_0515144655.jpg@736w_416h_1e_1c'
          },
        ]
      }
    }
  },
  methods: {
    async over(e) {
      let dom = e.target
      let tag = dom.tagName.toLowerCase()
      let self = this
      if(tag==='dd') {
        this.kind = dom.getAttribute('kind')
        let keyword = dom.getAttribute('keyword')
        let {status,data:{count,pois}} = await self.$axios.get('/search/resultsByKeywords',{
          param: {
            keyword,
            city: self.$store.state.geo.position.city
          }
        })
        if(status===200&&count>0) {
          let r = pois.filter(item=>item.photos.length).map(item => {
            return {
              title: item.name,
              pos: item.type.split(';')[0],
              price:item.biz_ext.cost||'暂无',
              img: item.photos[0].url,
              url: '//abc.com'
            }
          })
          self.list[self.kind] = r.slice(0,9)
        } else {
          
        }
      }
    }
  },
  computed: {
    cur() {
      return this.list[this.kind]
    }
  }
}
</script>

<style lang="scss">
  @import "@/assets/css/index/artistic.scss";
</style>


