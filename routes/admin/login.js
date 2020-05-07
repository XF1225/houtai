var router = require('koa-router')();
var svgCaptcha = require('svg-captcha');
var tools = require('../../module/tools');
var DB = require('../../module/db');

router.get('/', async(ctx)=>{
    /* var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size:4,    //验证码长度
        fontSize:50,   //字体大小
        width:100,
        height:40,
        background:'#cc8801'
    });
      console.log(captcha.text);
      ctx.response.type = 'image/svg+xml';
      ctx.body = captcha.data;
    // https://blog.csdn.net/weixin_33842304/article/details/93991754
    // ctx.body="登录"; */
    await ctx.render('admin/login');
})

router.post('/dologin', async(ctx)=>{
    let username = ctx.request.body.username;
    let password = ctx.request.body.password;
    // console.log(tools.md5(password));
    var result = await DB.find('admin',{"username":username,"password":password});
    if(result.length>0){
        ctx.session.userInfo = result[0];
        ctx.redirect(ctx.state.host +'/admin');
    }else{
        console.log('失败');
        ctx.redirect(ctx.state.host +'/admin');
    }
})
module.exports=router.routes();