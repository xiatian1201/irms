$(function(){
    $(".box").css("height",$(window).height()-40+"px");
    $(".box-left>ul>li").on("mouseover",function(){
        $(this).addClass("addback").siblings(".addback").removeClass("addback");
    })
    $(".box-left>ul>li").on("click",function(){
        $(".box-right").css("background","transparent");
        $("#right_home").attr("src",$(this).attr("data_name")+"/"+$(this).attr("data_name")+".html")
    })
    $("input[type=button]").click(function(){
        $.ajax({
            data:{
                "userno":$("input[type=text]").val(),
                "password":$("input[type=password]").val(),
            },
            url:"xxxx",
            dataType:"json",
            type:"post",
            success:function(data){
                $(".join").hide(200);
                $(".cover").hide(200);
            },
            error:function(){
                $(".join").hide(200);
                $(".cover").hide(200);
            }
        })
        $(".join").hide(200);
        $(".cover").hide(200);
    });
    $(".back").click(function(){
        $(".join").show(200);
        $(".cover").show(200);
    })
})