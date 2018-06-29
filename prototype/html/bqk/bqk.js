$(function(){
    var a=0;
    var b=0;
    $(".box-grid>ul").on("click","li",function(){
        var _this=this;
        if($( _this).attr("data-click")=="1"){
            $( _this).append($('<img src="../../image/gou.png">'));
            $(_this).find("span").addClass("click");
            $(_this).attr("data-click","0");
            if($(_this).parent().prev().find("ul>li").eq("1").attr("lx")=="fl"){
                a=0;

            }else{
                b=0;
            }
                $.each($(_this).parent().find("li"),function(index,value){
                    if($(value).attr("data-click")=="0"){
                        if($(_this).parent().prev().find("ul>li").eq("1").attr("lx")=="fl"){
                            a++;
                            $(_this).parent().prev().find("ul>li").eq("0").html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")
                        }else if($(_this).parent().prev().find("ul>li").eq("1").attr("lx")=="jc"){
                            b++;
                            $(_this).parent().prev().find("ul>li").eq("0").html("已选择<span style='color:#FF6600'>"+b+"</span>项标签")
                        }
                    }
                });




        }else{
            if($(_this).parent().prev().find("ul>li").eq("1").attr("lx")=="fl"){
                a--;
                $(_this).parent().prev().find("ul>li:first-child").html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")
            }else if($(_this).parent().prev().find("ul>li").eq("1").attr("lx")=="jc"){
                b--;
                $(_this).parent().prev().find("ul>li:first-child").html("已选择<span style='color:#FF6600'>"+b+"</span>项标签")
            }

            $(this).find('img').remove();
            $(this).find("span").removeClass("click");
            $(this).attr("data-click","1");
        }

    });
    $(document).on("click",".qx",function(){
        var _this=this;
       if($(_this).attr("data-click")=="1"){

           $(_this).parent().parent().next().find("li").append($('<img src="../../image/gou.png">'));
           $(_this).text("取消选择");
           if($(_this).attr("lx")=="fl"){
               a=0;
           }else{
               b=0;
           }
           $(_this).parent().parent().next().find("li").attr("data-click","0");
           $.each($(_this).parent().parent().next().find("li"),function(index,value){
               if($(value).attr("data-click")=="0"){
                   if($(_this).attr("lx")=="fl"){
                       a++;
                      $(_this).prev().html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")
                   }else{
                       b++;
                       $(_this).prev().html("已选择<span style='color:#FF6600'>"+b+"</span>项标签")
                   }
               }
           });

           $(_this).parent().parent().next().find("li").find("span").addClass("click");
           $(_this).attr("data-click","0");
       }else{
           $(_this).text("全选");
           if($(_this).attr("lx")=="fl"){
               a=0;
               $(_this).prev().html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")
           }else{
               b=0;
               $(_this).prev().html("已选择<span style='color:#FF6600'>"+b+"</span>项标签")
           }

           $(_this).parent().parent().next().find("li").find('img').remove();
           $(_this).parent().parent().next().find("li").find("span").removeClass("click");
           $(_this).attr("data-click","1");
           $(_this).parent().parent().next().find("li").attr("data-click","1");

       }
    })
    $(".navigation>ul>li").eq(3).click(function(){
        $.each($(".box-grid>ul>li"),function(index,value){
            if($(value).attr("data-click")=="0"){

            }
        });
    });
    $.fn.extend({
        'alert':function(param){

            $(".openwindow").css({
                width:$(window).width(),
                height:$(window).height(),
                display:"block",
            });
            if(param.height<170&&param.width<400){
                $(".popwindow").css({
                    width:"400px",
                    height:"170px",
                    "margin-top":$(window).height()/2-400/2-40+"px",
                    "margin-left":$(window).width()/2-400/2+"px",
                })
                $(".popwindow").show(500);
            }else{
                $(".popwindow").css({
                    width:param.width+"px",
                    height:param.height+"px",
                    "margin-top":$(window).height()/2-param.height/2-40+"px",
                    "margin-left":$(window).width()/2-param.height/2+"px",
                });
                $(".popwindow").show(500);
               if(param.title!==undefined){
                   $(".popwindow>div").html(param.title);
               }
                if(param.inputval!==undefined){
                    $(".popwindow>input").attr("placeholder",param.inputval);
                }

            }

            $(".popwindow").on("click","li",function(){
                if($(this).text()=="添加"){

                }else{
                    $(".popwindow").hide(500);
                    $(".openwindow").css("display","none");
                }
            })

        }}
    )
    $(document).on("click","span.button_span",function(){
        if($(this).find("span").attr("openwindow")=="tjflbq"){
            $(".openwindow").alert({
                "width":"400",
                "height":"170",
                "title":"添加分类标签",
                "inputval":"请输入需要添加的分类标签名称",
                "url":"ddddd",
            });
        }if($(this).find("span").attr("openwindow")=="tjjcbq"){
            $(".openwindow").alert({
                "width":"400",
                "height":"170",
                "title":"添加检测标签",
                "inputval":"请输入需要添加的检测标签名称",
                "url":"ddddd",
            });
        }

    });



})