var router = require('koa-router')();

var login=require('./admin/login');
var zhuce=require('./admin/zhuce');
var user=require('./admin/user');
var captcha=require('./admin/captcha');

router.use(async (ctx,next)=>{
    ctx.state.host='http://'+ctx.request.header.host;
    if(ctx.session.userInfo && ctx.session.userInfo.username!=''){
        // console.log(ctx.session.userInfo.username);
        ctx.state.userInfo=ctx.session.userInfo.username;
        await next();
    }else{
        if(ctx.url =='/admin/login' || ctx.url =='/admin/login/dologin' || ctx.url =='/admin/zhuce' || ctx.url =='/admin/captcha'){
            await next();
        }else{
            ctx.redirect('/admin/login');
        }
    }
})

router.get('/', async (ctx)=>{
    await ctx.render('admin/index');
})

router.get('/loginout', async(ctx)=>{
    ctx.session.userInfo.username='';
    ctx.redirect(ctx.state.host+'/admin/login');
})

router.use('/login',login);
router.use('/zhuce',zhuce);
router.use('/user',user);
router.use('/captcha',captcha);

module.exports = router.routes();