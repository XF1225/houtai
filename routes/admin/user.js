var router = require('koa-router')();
var DB = require('../../module/db');
router.get('/', async(ctx)=>{
    var glyresult = await DB.find('admin',{});
    var flresult = await DB.find('article_cate',{});
    var nrresult = await DB.find('article',{});
    var lbtresult = await DB.find('focus',{});
    var yqljresult = await DB.find('link',{});
    var dhresult = await DB.find('nav',{});
    var xtresult = await DB.find('setting',{});
    await ctx.render('admin/user/list',{
        list1:glyresult,
        list2:flresult,
        list3:nrresult,
        list4:lbtresult,
        list5:yqljresult,
        list6:dhresult,
        list7:xtresult
    });
})
router.get('/add', async(ctx)=>{
    await ctx.render('admin/user/add');
   /*  let result = await DB.insert('admin',{"username":"薛蓉","email":"87659876@qq.com","password":"654321","status":"1"});
    console.log(result); */
})
router.post('/glyadd', async(ctx)=>{
    if(ctx.request.body.username=="" || ctx.request.body.email=="" || ctx.request.body.password==""){
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return false;
    }else{
        let data = await DB.insert('admin',ctx.request.body);
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }
})
router.post('/fladd', async(ctx)=>{
    if(ctx.request.body.title=="" || ctx.request.body.description=="" || ctx.request.body.keywords==""){
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return false;
    }else{
        let data = await DB.insert('article_cate',ctx.request.body);
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }
})
router.post('/nradd', async(ctx)=>{
    if(ctx.request.body.title=="" || ctx.request.body.keywords=="" || ctx.request.body.content==""){
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return false;
    }else{
        let data = await DB.insert('article',ctx.request.body);
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }
})
router.post('/lbtadd', async(ctx)=>{
    if(ctx.request.body.title=="" || ctx.request.body.imgs=="" || ctx.request.body.url==""){
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return false;
    }else{
        let data = await DB.insert('focus',ctx.request.body);
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }
})
router.post('/yqljadd', async(ctx)=>{
    if(ctx.request.body.title=="" || ctx.request.body.imgs=="" || ctx.request.body.url==""){
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return false;
    }else{
        let data = await DB.insert('link',ctx.request.body);
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }
})
router.post('/dhadd', async(ctx)=>{
    if(ctx.request.body.title=="" || ctx.request.body.url==""){
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return false;
    }else{
        let data = await DB.insert('nav',ctx.request.body);
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }
})
router.post('/xtadd', async(ctx)=>{
    if(ctx.request.body.site_name=="" || ctx.request.body.site_url=="" || ctx.request.body.icp==""){
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return false;
    }else{
        let data = await DB.insert('setting',ctx.request.body);
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }
})

router.get('/edit0', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.find('admin',{"_id":DB.getobjectId(id)});
    await ctx.render('admin/user/edit/edit0',{
        list:data[0]
    });
})
router.post('/glyedit',async(ctx)=>{
    var id=ctx.request.body.id;
    var username=ctx.request.body.username;
    var email=ctx.request.body.email;
    var password=ctx.request.body.password;
    let data=await DB.update('admin',{"_id":DB.getobjectId(id)},{
        username,email,password
    })
    try{
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }catch(err){
        console.log(err);
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return;
    }
})
router.get('/edit1', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.find('article_cate',{"_id":DB.getobjectId(id)});
    await ctx.render('admin/user/edit/edit1',{
        list:data[0]
    });
})
router.post('/fledit',async(ctx)=>{
    var id=ctx.request.body.id;
    var title=ctx.request.body.title;
    var description=ctx.request.body.description;
    var cid=ctx.request.body.cid;
    var keywords=ctx.request.body.keywords;
    let data=await DB.update('article_cate',{"_id":DB.getobjectId(id)},{
        title,description,cid,keywords
    })
    console.log(title);
    try{
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }catch(err){
        console.log(err);
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return;
    }
})
router.get('/edit2', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.find('article',{"_id":DB.getobjectId(id)});
    await ctx.render('admin/user/edit/edit2',{
        list:data[0]
    });
})
router.post('/nredit',async(ctx)=>{
    var id=ctx.request.body.id;
    var title=ctx.request.body.title;
    var url=ctx.request.body.url;
    var cid=ctx.request.body.cid;
    var keywords=ctx.request.body.keywords;
    var img=ctx.request.body.img;
    var author=ctx.request.body.author;
    var content=ctx.request.body.content;
    let data=await DB.update('article',{"_id":DB.getobjectId(id)},{
        title,url,cid,keywords,img,author,content
    })
    try{
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }catch(err){
        console.log(err);
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return;
    }
})
router.get('/edit3', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.find('focus',{"_id":DB.getobjectId(id)});
    await ctx.render('admin/user/edit/edit3',{
        list:data[0]
    });
})
router.post('/lbtedit',async(ctx)=>{
    var id=ctx.request.body.id;
    var title=ctx.request.body.title;
    var imgs=ctx.request.body.imgs;
    var url=ctx.request.body.url;
    let data=await DB.update('focus',{"_id":DB.getobjectId(id)},{
        title,imgs,url
    })
    try{
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }catch(err){
        console.log(err);
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return;
    }
})
router.get('/edit4', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.find('link',{"_id":DB.getobjectId(id)});
    await ctx.render('admin/user/edit/edit4',{
        list:data[0]
    });
})
router.post('/yqljedit',async(ctx)=>{
    var id=ctx.request.body.id;
    var title=ctx.request.body.title;
    var imgs=ctx.request.body.imgs;
    var url=ctx.request.body.url;
    let data=await DB.update('link',{"_id":DB.getobjectId(id)},{
        title,imgs,url
    })
    try{
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }catch(err){
        console.log(err);
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return;
    }
})
router.get('/edit5', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.find('nav',{"_id":DB.getobjectId(id)});
    await ctx.render('admin/user/edit/edit5',{
        list:data[0]
    });
})
router.post('/dhedit',async(ctx)=>{
    var id=ctx.request.body.id;
    var title=ctx.request.body.title;
    var url=ctx.request.body.url;
    let data=await DB.update('nav',{"_id":DB.getobjectId(id)},{
        title,url
    })
    try{
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }catch(err){
        console.log(err);
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return;
    }
})
router.get('/edit6', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.find('setting',{"_id":DB.getobjectId(id)});
    await ctx.render('admin/user/edit/edit6',{
        list:data[0]
    });
})
router.post('/xtedit',async(ctx)=>{
    var id=ctx.request.body.id;
    var site_name=ctx.request.body.site_name;
    var site_url=ctx.request.body.site_url;
    var site_logo=ctx.request.body.site_logo;
    var keywords=ctx.request.body.keywords;
    var icp=ctx.request.body.icp;
    var about=ctx.request.body.about;
    let data=await DB.update('setting',{"_id":DB.getobjectId(id)},{
        site_name,site_url,site_logo,keywords,icp,about
    })
    try{
        if(data.result.ok){
            ctx.redirect(ctx.state.host+'/admin/user');
        }
    }catch(err){
        console.log(err);
        ctx.redirect(ctx.state.host+'/admin/user/add');
        return;
    }
})

router.get('/delet', async(ctx)=>{
    let id=ctx.query.id;
    let data=await DB.remove('admin',{"_id":DB.getobjectId(id)});
    let data2=await DB.remove('article_cate',{"_id":DB.getobjectId(id)});
    let data3=await DB.remove('article',{"_id":DB.getobjectId(id)});
    let data4=await DB.remove('focus',{"_id":DB.getobjectId(id)});
    let data5=await DB.remove('link',{"_id":DB.getobjectId(id)});
    let data6=await DB.remove('nav',{"_id":DB.getobjectId(id)});
    let data7=await DB.remove('setting',{"_id":DB.getobjectId(id)});
    console.log('删除成功');
    if(data || data2 || data3 || data4 || data5 || data6 || data7){
        ctx.redirect(ctx.state.host+'/admin/user');
    }
})
module.exports=router.routes();