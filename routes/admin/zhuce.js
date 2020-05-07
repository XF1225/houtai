var router = require('koa-router')();
router.get('/',async(ctx)=>{
  await ctx.render('admin/zhuce');
})
module.exports=router.routes();