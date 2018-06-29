var clicki="";
var clicke="";
var imgbqlist=["露点","生殖器","丁字裤"];
var imglist=[];
$(function(){
    document.oncontextmenu = function() {
        return false;
    };
    function randomColor1(){
        var r = Math.floor(Math.random()*256);
        var g = Math.floor(Math.random()*256);
        var b = Math.floor(Math.random()*256);
        if(r < 16){
            r = "0"+r.toString(16);
        }else{
            r = r.toString(16);
        }
        if(g < 16){
            g = "0"+g.toString(16);
        }else{
            g = g.toString(16);
        }
        if(b < 16){
            b = "0"+b.toString(16);
        }else{
            b = b.toString(16);
        }
        return "#"+r+g+b;
    }
    function start(){

        $.each(imgbqlist,function(i,v){

            imglist.push({"color":randomColor1(),"lx":v});

        });

    }

    $("body").height($(document).height());

    $(".top_left>li").eq(1).click(function(){
        if($(this).attr("data-click")=="0"){
            $(".gzt_main>ul>li>.checkbox").attr("data-click","1").addClass("checkboxi");
            $(this).text("取消全选");
            $(this).attr("data-click","1");
        }else{
            $(".gzt_main>ul>li>.checkbox").attr("data-click","0").removeClass("checkboxi");
            $(this).text("全选");
            $(this).attr("data-click","0");
        }
        lieach();

    })
    $(".top_left>li").eq(2).click(function(){
        $.each($(".gzt_main .checkbox"),function(i,v){
            if($(v).attr("data-click")=="1"){
                $(v).next().find(".big_img>div").remove();
            }
        })
        //$(".gzt_main .big_img>div").remove();
    });

    $(".top>ul>li").click(function(){
        var a=$(this).index();
        switch (a){
            case a=0:
            $(".main_gzt").show().siblings().hide();
            $(this).addClass("iclick").siblings().removeClass("iclick");
            break;
            case a=1:
                $(".ybj").show().siblings().hide();
                $(this).addClass("iclick").siblings().removeClass("iclick");
                break;
        }
    });
    $(document).on("click",".big_img",function(e){
        clicki=e;
    });
    $(document).on("click",".big_img>div",function(e){

        clicke=e;

    });
    $(".gzt_main").on("click",".checkbox",function(){
        if($(this).attr("data-click")=="0"){
          $(this).addClass("checkboxi");
            $(this).eq(1).text("已选择")
            $(this).attr("data-click","1");

        }else{
            $(this).removeClass("checkboxi");
            $(this).eq(1).text("未选择")
            $(this).attr("data-click","0");

        }
       lieach();
    });
    var lieach=function(){
        var a=0;
        $.each($(".gzt_main>ul>li>.checkbox"),function(i,v){
            if($(v).attr("data-click")=="1"){
                a++;
            }
        });
        $(".top_left>li").eq(0).html($("<li>已选择<span style='color:#FF97AB';> "+a+" </span>项</li>"))
    }
   $(document).on("mousedown",".img_box",function(e) {
       var _this=$(this);
       if(e.which==3){
           $(this).remove();
       }
       var dragPrams = {
           _thisInitX: '', //窗口原始原点位置
           _thisInitY: '',
           startMouseX: '', //鼠标点击位置
           startMouseY: '',
           endMouseX: '', //鼠标松开位置
           endMouseY: '',
           _thistop:parseInt($(this).css("top")),
           _thisleft:parseInt($(this).css("left")),
           _thisEndX: '', //窗口移动后原点位置
           _thisEndY: '',
           isDragged: false
       };

           var mouseLoction = $.mouseCoords(e);
           dragPrams.startMouseX = mouseLoction.x;
           dragPrams.startMouseY = mouseLoction.y;

           var offset = $(this).offset();
           dragPrams._thisInitX = offset.left;
           dragPrams._thisInitY = offset.top;
           dragPrams.isDragged = true;
           $(this).css({
               'cursor': 'move'
           });

       _this.on("mousemove", function (e) {
           if (dragPrams.isDragged == true) {

               var mouseLoction = $.mouseCoords(e);
               dragPrams.endMouseX = mouseLoction.x;
               dragPrams.endMouseY = mouseLoction.y;
               //dragPrams._thisEndX = dragPrams.endMouseX + dragPrams._thisInitX - dragPrams.startMouseX;
              // dragPrams._t|hisEndY = dragPrams.endMouseY + dragPrams._thisInitY - dragPrams.startMouseY;
               //console.log(parseInt($(this).css("top")));
               _this.css({
                   'left': dragPrams._thisleft +dragPrams.endMouseX-dragPrams.startMouseX+ 'px',
                   'top': dragPrams._thistop +dragPrams.endMouseY-dragPrams.startMouseY+ 'px'
               });
               // var pHeight = _this.outerHeight() > $(parent.window).height() ? $('body', parent.document).height() : $(parent.window).height();
               // var pWidth = _this.outerWidth() > $(parent.window).width() ? $('body', parent.document).width() : $(parent.window).width();
               //
               // if (dragPrams._thisEndX > pWidth + $(parent.document).scrollLeft() - _this.outerWidth()) {
               //     dragPrams._thisEndX = pWidth + $(parent.document).scrollLeft() - _this.outerWidth() - 10;
               // }
               // if (dragPrams._thisEndY > pHeight + $(parent.document).scrollTop() - _this.outerHeight()) {
               //     dragPrams._thisEndY = pHeight + $(parent.document).scrollTop() - _this.outerHeight() - 10;
               // }
               // if (dragPrams._thisEndX < $(parent.document).scrollLeft()) {
               //     dragPrams._thisEndX = $(parent.document).scrollLeft() + 10;
               // }
               // if (dragPrams._thisEndY < $(parent.document).scrollTop()) {
               //     dragPrams._thisEndY = $(parent.document).scrollTop() + 10;
               // }



           }
       });
       _this.on("mouseup", function (e) {
           dragPrams.isDragged = false;
           _this.css({
               'cursor': 'default'
           });
       });
   })

    $(document).keydown(function(event){
        if(clicke!==""){
            var clicke_css={};
            clicke_css.height=$(clicke.target).height();
            clicke_css.width=$(clicke.target).width();
            var e = event || window.event;
            var k = e.keyCode || e.which;
            switch(k) {
                case 37:
                    $(clicke.target).css("width",clicke_css.width-5+"px");
                    break;
                case 38:
                    $(clicke.target).css("height",clicke_css.height+5+"px");
                    break;
                case 39:
                    $(clicke.target).css("width",clicke_css.width+5+"px");
                    break;
                case 40:
                    $(clicke.target).css("height",clicke_css.height-5+"px");
                    break;
            }
            return false
        }

    });

    $(document).keyup(function(event){
        if(clicki!==""){
            var e = event || window.event;
            var k = e.keyCode || e.which;
            switch(k) {
                case 49:

                    $(clicki.currentTarget).append($("<div class='img_box' style=''></div>"))
                    break;
                case 50:
                    break;
            }
           return false
        }


    })
})