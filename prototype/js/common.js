$(function(){
   $.fn.extend({
       'button':function(param){
       var a="<span class='commonform_span'>"+
           +"<input type='text' placeholder='查询已添加的关键词' class='commonform_input'>"+
           +"<input value='查询分类' type='submit' class='commonform_submit'></span>"

       },
       // params: 窗口最外层对象



   })
    $.extend({
        'mouseCoords': function (ev) {
            if (ev.pageX || ev.pageY) {
                return {x: ev.pageX, y: ev.pageY};
            }
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        },
        'popWindowDrag': function (_this) {

          _this.mousedown(function(e) {

                console.log(_this.css("height"));
                var positionDiv = _this.offset();
                console.log(positionDiv);
                var distenceX = _this.pageX - positionDiv.left-20;
                var distenceY = _this.pageY - positionDiv.top-20;


                $(document).mousemove(function(e) {
                    var x = e.pageX - distenceX;
                    var y = e.pageY - distenceY;

                    if (x < 0) {
                        x = 0;
                    } else if (x > _this.parent().width() - _this.outerWidth(true)) {
                        x = _this.parent().width() - _this.outerWidth(true);
                    }

                    if (y < 0) {
                        y = 0;
                    } else if (y > _this.parent().height() - _this.outerHeight(true)) {
                        y = _this.parent().height() - _this.outerHeight(true);
                    }

                    _this.css({
                        'left': x + 'px',
                        'top': y + 'px'
                    });
                });

                $(document).mouseup(function() {
                    $(document).off('mousemove');
                });
            });



        },
    })
});