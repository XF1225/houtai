var router = require('koa-router')();
var svgCaptcha = require('svg-captcha');

router.get('/', async(ctx)=>{
    var captcha = svgCaptcha.create({    //这种生成的是随机数验证码
        size:4,    //验证码长度
        fontSize:50,   //字体大小
        width:100,
        height:45,
        ignoreChars: '0oO1ilI', // 验证码字符中排除 0o1i
        noise: 2, // 干扰线条的数量
        color: true, // 验证码的字符是否有颜色，默认没有，如果设定了背景，则默认有
        background: '#eee' // 验证码图片背景颜色
    });
      console.log(captcha.text);
      ctx.response.type = 'image/svg+xml';
      ctx.body = captcha.data;
      ctx.session.captcha = captcha.text;//把验证码赋值给session
})
module.exports=router.routes();