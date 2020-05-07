function list(){
    $('.tabcord-h4').click(function(){
        var siblings=$(this).siblings();
        if(siblings.hasClass('tablist')){
           siblings.removeClass('tablist');
        }else{
           siblings.addClass('tablist');
        } 
    });
    $('#glylb').click(function(){
        $('#section div').eq(0).show().siblings().hide();
    });
      $('#fllb').click(function(){
        $('#section').children().eq(1).show().siblings().hide();
    });
      $('#wzlb').click(function(){
        $('#section').children().eq(2).show().siblings().hide();
    });
      $('#lbtlb').click(function(){
        $('#section').children().eq(3).show().siblings().hide();
    });
      $('#yqljlb').click(function(){
        $('#section').children().eq(4).show().siblings().hide();
    });
      $('#dhlb').click(function(){
        $('#section').children().eq(5).show().siblings().hide();
    });
      $('#xtxxlb').click(function(){
        $('#section').children().eq(6).show().siblings().hide();
    });

    $('#tjgly').click(function(){
      $('#section div').eq(0).show().siblings().hide();
  });
    $('#tjfl').click(function(){
      $('#section').children().eq(1).show().siblings().hide();
  });
    $('#tjnr').click(function(){
      $('#section').children().eq(2).show().siblings().hide();
  });
    $('#tjlbt').click(function(){
      $('#section').children().eq(3).show().siblings().hide();
  });
    $('#tjyqlj').click(function(){
      $('#section').children().eq(4).show().siblings().hide();
  });
    $('#tjdh').click(function(){
      $('#section').children().eq(5).show().siblings().hide();
  });
    $('#tjxtxx').click(function(){
      $('#section').children().eq(6).show().siblings().hide();
  });
      $('.guanlirenyuan').click(function(){
        $('.tcdl').toggle();
    })
}