$(function(){
    $("body").css("height",$(document).height()+"px");
    $("#folder").height($(document).height()-40+"px")
    $("#folder").on("click",".folder",function(){

        if($(this).find("span").attr("data-click")=="1"){
            $(this).find("span[data-click]").css({
                border:"2px solid #cccccc",
                background:"#CF482F"
            });
            $(this).find("span[data-click]").attr("data-click","0");
        }else{
            $(this).find("span[data-click]").css({
                border:"1px solid #cccccc",
                background:"transparent",
            });
            $(this).find("span[data-click]").attr("data-click","1");
        }
    }
    );
    $("#folder").on("mouseover",".folder",function(){
            $(this).css("background","#D6ECF4");

            $(this).find("span").eq(3).show();
        }
    );
    $("#folder").on("mouseout",".folder",function(){
        $(this).css("background","#ffffff");
        $(this).find("span").eq(3).hide();
        }
    )
    $(".add").click(function(){
        $(".top_box").toggle(200);
    })
    $(".top_box>ul>li").click(function(){
        var a="新建分类项";
        var b="新建检测项";
        if($(this).attr("lx")=="fl"){
            $(".title").text(a);
            $(".top_ba").html($("<span>目前有<span style='color:#FF6600'>"+2+"</span>个分类</span>"));
            $(".commonform_submit").val("查询分类")
        }else{
            $(".title").text(b);
            $(".top_ba").html($("<span>目前有<span style='color:#FF6600'>"+2+"</span>个检测标签</span>"));
            $(".commonform_submit").val("查询检测");
        }
        $(".box").show(200);
        $(".cover").show(200);
    })
    var a=0;

    $(".box-grid>ul").on("click","li",function(){
        var _this=this;
        if($( _this).attr("data-click")=="1"){
            $( _this).append($('<img src="../../image/gou.png">'));
            $(_this).find("span").addClass("click");
            $(_this).attr("data-click","0");
                a=0;
            $.each($(_this).parent().find("li"),function(index,value){
                if($(value).attr("data-click")=="0"){
                        a++;
                        $(_this).parent().prev().find("ul>li").eq("0").html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")
                }
            });




        }else{
                a--;
                $(_this).parent().prev().find("ul>li:first-child").html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")

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
                a=0;
            $(_this).parent().parent().next().find("li").attr("data-click","0");
            $.each($(_this).parent().parent().next().find("li"),function(index,value){
                if($(value).attr("data-click")=="0"){
                        a++;
                        $(_this).prev().html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")
                }
            });

            $(_this).parent().parent().next().find("li").find("span").addClass("click");
            $(_this).attr("data-click","0");
        }else{
            $(_this).text("全选");
                a=0;
                $(_this).prev().html("已选择<span style='color:#FF6600'>"+a+"</span>项标签")
            $(_this).parent().parent().next().find("li").find('img').remove();
            $(_this).parent().parent().next().find("li").find("span").removeClass("click");
            $(_this).attr("data-click","1");
            $(_this).parent().parent().next().find("li").attr("data-click","1");

        }
    })
    $("#upload_img").on("change",function(e){
        var file = e.target.files || e.dataTransfer.files;
        //如果目标文件存在
        console.log(file);
        console.log(this);
        console.log(e);
        if (file) {

            var b=$("<ul></ul>");
            $.each(file,function(index,value){
                var reader = new FileReader();
                var lilist={};
                lilist.img=$("<img src='' alt='' class=imgli img"+index+" > ");
                lilist.sizes = [ 'Bytes', 'KB', 'MB' ];
                lilist.li=$("<li></li>");
                lilist.name=$("<span>"+value.name+"</span>")
                lilist.i = parseInt(Math.floor(Math.log(value.size) / Math.log(1024)));
                lilist.img_size=$("<span>"+(value.size/Math.pow(1024, lilist.i)).toFixed(1) + lilist.sizes[lilist.i]+"</span>");

                reader.onload=function(){
                    lilist.img.attr("src",this.result);
                };
                lilist.li.append(lilist.img);
                lilist.li.append(lilist.name);
                lilist.li.append(lilist.img_size);
                b.append(lilist.li);
                reader.readAsDataURL(value);

            });
            b.appendTo($("#imglist"))
            //装载文件

        }
    })
    $(".cancel").click(function(){
        $("#imglist").empty();
        $(".box").hide(500);
        $(".cover").hide(500);
    })
var deleted=0;
    $("#folder").on("click",".folder>span:nth-child(4)",function(){
        deleted=1;


    })
    $(document).on("")
    $("#folder").on("click",".folder",function(){
        if(!deleted){
            $(".add").text("上传图片");

            $(".top>span:nth-child(1)").append(">"+$(this).find("span:nth-child(3)>ul>li:nth-child(1)").text());
            $(this).parent().append($("<iframe src='work_home.html' style='width:100%;height:100%;' frameborder='0'></iframe>"))
            //$(this).parent().empty();
            $(".folder").remove();
        }


    });
})