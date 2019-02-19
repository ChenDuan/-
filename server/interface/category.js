import Router from "koa-router";
import axios from "./utils/axios";
import Categroy from '../dbs/models/category'

let router = new Router({prefix:'/category'})

router.get('/crumbs',async(ctx)=>{
  let result = await Categroy.findOne({city: ctx.query.city.replace('市','')||'北京'})
  if(result) {
    ctx.body = {
      areas: result.areas,
      types: result.types
    }
  } else {
    ctx.body = {
      areas:[],
      types:[]
    }
  }
})

export default router