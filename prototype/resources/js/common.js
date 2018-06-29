var urll="";
var urlll="";
var responsee="";
var responseee="";
(function ($) {
    Array.prototype.contains = function (obj) {
        var i = this.length;
        while (i--) {
            if (this[i] === obj) {
                return true;
            }
        }
        return false;
    }
//    Array.prototype.del = function (n) {
//     if(n<0){
//    	 return this;
//    	 
//     }else
//    	 return this.slice(0,n).concat(this.slice(n+1,this.length));
//    }
   
    /**
     * 时间对象的格式化;
     */
    Date.prototype.format = function (format) { //给日期添加format原型
        /* 
         * 使用例子:format="yyyy-MM-dd hh:mm:ss"; 
         */
        var o = {
            "M+": this.getMonth() + 1, // month  
            "d+": this.getDate(), // day  
            "h+": this.getHours(), // hour  
            "m+": this.getMinutes(), // minute  
            "s+": this.getSeconds(), // second  
            "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
            "S": this.getMilliseconds()
            // millisecond  
        };

        if (/(y+)/.test(format)) {
            format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
        }

        for (var k in o) {
            if (new RegExp("(" + k + ")").test(format)) {
                format = format.replace(RegExp.$1, RegExp.$1.length == 1 ? o[k] : ("00" + o[k]).substr(("" + o[k]).length));
            }
        }
        return format;
    };

    //获取字符串的长度
    String.prototype.strWidth = function (font) {
        var f = font || '12px arial',
            o = $('<div>' + this + '</div>')
                .css({
                    'position': 'absolute',
                    'float': 'left',
                    'white-space': 'nowrap',
                    'visibility': 'hidden',
                    'font': f
                }).appendTo($('body')),
            w = o.width();

        o.remove();
        return w;
    };

    $.session = {
        get: function (key, func) {
            $.ajax({ //查询数据
                url: 'ServerAction!getSessionByKey.action?key=' + key,
                // 		        dataType: 'json',
                success: function (response) {
                    func.call(this, response);
                }
            });
        }
    };

    $.extend({

        /*************************************************************************************
         *Title: baseUrl
         *Description: 获取基本url地址
         *author: 孙韶辰
         *date: 2016/11/7
         **************************************************************************************/
        'baseUrl': function () {
            return _urlCommon;
        },

        /*************************************************************************************
         *Title: getQueryStr
         *Description: 获取url传参中某个参数的值
         *author: 孙韶辰
         *date: 2016/11/3
         **************************************************************************************/
        'getQueryStr': function (str) {
            var reg = new RegExp("(^|&)" + str + "=([^&]*)(&|$)");
            var r = decodeURIComponent(window.location.search).substr(1).match(reg);
            return r != null ? unescape(r[2]) : null;
        },
        
        /*************************************************************************************
         *Title: getIndex
         *Description: 获取一个字符串 str 中 第 len 个字符 char 的位置
         *author: 孙韶辰
         *date: 2016/11/3
         **************************************************************************************/
        'getIndex': function (str, char, len) {
            var index = 0;
            for (var i = 0; i < len; i++) {
                index = str.indexOf(char, index + 1);
            }
            return index;
        },

        'pushHistory': function (url, doc, win) {
            if (!doc) {
                if (parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')]) {
                    parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')].push(url);
                } else {
                    parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')] = [];
                    parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')].push(url);
                }
            } else {
                if (win.params.historys['url' + $('.pub_hisTabCloseSel', doc).attr('index')]) {
                    win.params.historys['url' + $('.pub_hisTabCloseSel', doc).attr('index')].push(url);
                } else {
                    win.params.historys['url' + $('.pub_hisTabCloseSel', doc).attr('index')] = [];
                    win.params.historys['url' + $('.pub_hisTabCloseSel', doc).attr('index')].push(url);
                }
            }

        },

        'popHistory': function () {
            if (parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')]) {
                return parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')].pop();
            }
        },

        /*************************************************************************************
         *Title: pageTitle
         *Description: 给页面添加tab菜单
         *author: 孙韶辰
         *date: 2017/02/08
         **************************************************************************************/
        'pageTitle': function (params) {
            var _this = {};
            _this.nav = $('<nav class="pub_titlebox"></nav>');
            //console.log(parent.params.historys);
            if (parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')] && parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')].length > 0) {
                $('body').append('<div class="common_historyBtn"></div>');
                $('.common_historyBtn').on('click', function () {

                    var url = parent.params.historys['url' + $('.pub_hisTabCloseSel', parent.document).attr('index')].pop();
                    if (url.indexOf('http') >= 0) {
                        window.location.href = url;
                    } else {
                        window.location.href = $.baseUrl() + url;
                    }
                });
            }
            $('body').append(_this.nav);
            if (params.parentType.toUpperCase() == 'URL') {
                _this.titleHead = $('<h3 class="pub_titlehead pub_titleheadSel"></h3>').text(params.name);
                _this.headLine = ($('<div class="pub_titleheadline"></div>')).append(_this.titleHead);
                // parent.oHomePage.addTab($.trim(_this.titleHead.text()));
                _this.nav.append(_this.headLine);
                if (params.callback) {
                    params.callback.call();
                }
            } else {
                _this.titleHead = $('<h3 class="pub_titlehead"></h3>').text(params.parentName);
                _this.headLine = ($('<div class="pub_titleheadline"></div>')).append(_this.titleHead);
                _this.nav.append(_this.headLine);
                _this.upLine = $('<div class="pub_titleupline" style="left:' + ($('.pub_titleheadline').outerWidth()) + 'px;width:0;"></div>');
                _this.nav.append(_this.upLine);
                _this.sDoControl = params.control ? params.control : 'false';
                _this.aPubTitle4s = [];
                $.getJSON('ServerAction!getServerMenu.action?d=' + new Date(), {
                    parent_id: params.parentId,
                    doControl: _this.sDoControl
                }, function (response) {
                    var head_titleArr = response;
                    $.each(head_titleArr, function (index, value) {
                        if (index != 0) {
                            _this.aPubTitle4s.push($('<h4 class="pub_title4" index=' + index + ' style=" left: -' + (10 * index + 10) + 'px;">' + value.name + '</h4>'));
                            _this.nav.append(_this.aPubTitle4s[index]);
                            _this.upLine.width((_this.upLine.width() + (_this.aPubTitle4s[index].outerWidth() - 10)) + 'px');
                            if (value.uuid == params.id) {
                                _this.aPubTitle4s[index].addClass('pub_title4sel');
                                // parent.oHomePage.addTab($.trim(_this.aPubTitle4s[index].text()));
                            }
                        } else {
                            _this.aPubTitle4s.push($('<h4 class="pub_title4head" index=0 >' + value.name + '</h4>'));
                            _this.nav.append(_this.aPubTitle4s[0]);
                            if (value.uuid == params.id) {
                                _this.aPubTitle4s[index].addClass('pub_title4headsel');
                                // parent.oHomePage.addTab($.trim(_this.aPubTitle4s[index].text()));
                            }
                            _this.upLine.width((_this.upLine.width() + (_this.aPubTitle4s[index].outerWidth() - 30)) + 'px');
                        }
                        _this.aPubTitle4s[index].attr('resources', value.resources);
                        _this.aPubTitle4s[index].attr('menu_basecontent', value.menu_basecontent);
                    });
                    if (params.callback) {
                        params.callback.call();
                    }
                });
            }
            _this.nav.on('click', '.pub_title4head,.pub_title4', function () {
                parent.oHomePage.openPage($(this).attr('resources'));
                // parent.oHomePage.addTab($.trim($(this).text()));
            });

        },

        /*************************************************************************************
         *Title: meetingForm
         *Description: 创建会议表单
         *author: 孙韶辰
         *date: 2016/12/24
         **************************************************************************************/
        'meetingForm': function (params) {
            var _this = $('body'); //<input type="text" class="common_innerbox" name="sphs_startTime" id="sphs_startTime">
            _this.append('<div class="sphs_mask"></div><div class="sphs_formBg">' +
            '<table class="sphs_table">' +
            '<tr><td>会议标题</td><td><input type="text" class="common_innerbox" name="sphs_meetingName" id="sphs_meetingName"></td></tr>' +
            '<tr><td>会议议程</td><td><input type="text" class="common_innerbox" name="sphs_agenda" id="sphs_agenda" value="视频会商"></td></tr>' +
            '<tr><td>开始时间</td><td><div class="sphs_startTime"></div></td></tr>' +
            '<tr><td>结束时间</td><td><div class="sphs_endTime"></div></td></tr>' +
            '<tr><td>邀请码</td><td><input type="text" class="common_innerbox" name="sphs_invite_code" id="sphs_invite_code" value="1234qwer"></td></tr>' +
            '<tr><td colspan="2"><button name="sphs_submit">提交</button><button name="sphs_cancle">取消</button></td></tr>' +
            '</table>' +
            '<div class="sphs_hidden" style="display:none"></div>' +
            '</div>');
            _this.find('.sphs_mask').width($('body').width()).height($('body').height());
            _this.otime = new Date();
            _this.find('.sphs_startTime').datePicker({
                width: 180,
                height: 30,
                name: 'sphs_startTime',
                readOnly: false,
                dateFmt: 'yyyy/MM/dd HH:mm',
                initValue: new Date(_this.otime.getTime() - 5 * 60 * 1000).format("yyyy/MM/dd hh:mm"),
            });

            _this.find('.sphs_endTime').datePicker({
                width: 180,
                height: 30,
                name: 'sphs_endTime',
                readOnly: false,
                dateFmt: 'yyyy/MM/dd HH:mm',
                initValue: new Date(_this.otime.getTime() + 5 * 60 * 60 * 1000).format("yyyy/MM/dd hh:mm"),
            });

            _this.find('.sphs_mask').on('mouseover', function (e) {
                _this.iTop = e.pageY + 20;
                _this.iLeft = e.pageX + 20;

                $('body').append(_this.oTooltip);
                if (300 + _this.iLeft >= $('body').width()) {
                    _this.iLeft = $('body').width() - 300 - 50;
                }

                if (285 + _this.iTop >= $('body').height()) {
                    _this.iTop = $('body').height() - 285 - 50;
                }

                _this.find('.sphs_formBg').css({
                    left: _this.iLeft,
                    top: _this.iTop,
                });

                _this.find('.sphs_formBg').slideDown();
                if (!isNaN(_this.iTop)) {
                    _this.find('.sphs_mask').off('mouseover');
                }

            }).trigger('mouseover');


            _this.find('button[name=sphs_submit]').idxButton({ //按钮的type为submit
                type: 'unTab',
                //	            height:'35px',
                click: function () {
                    $.getJSON('http://10.136.35.229:8080/SphsManage/sphsAction!createMeetingInvite.action?jsoncallback=?', //先用我的后台，等服务器问题解决后再修改
                        {
                            inviteId: params.inviteId, //邀请的padid
                            meetingName: _this.find('input[name=sphs_meetingName]').val(), //会议名称
                            agenda: _this.find('input[name=sphs_agenda]').val(), //会议议程
                            startTime: _this.find('input[name=sphs_startTime]').val(), //开始时间
                            endTime: _this.find('input[name=sphs_endTime]').val(), //结束时间 
                            invite_code: _this.find('input[name=sphs_invite_code]').val() //邀请码
                        },
                        function (response) {
                            if (params.onSubmit) {
                                params.onSubmit.call(this, response.rect);
                            }
                            if ("Main_Failed" == response.rect || null == response.rect || "" == response.rect) {
                                $.alert(response.errorMsg);
                            } else {
                                //如果创建会议成功，则在第二屏加载视频会商成功页面
                                //oIframs.iframe2.attr('src','http://10.136.35.229:8080/SphsManage/sphsAction!enterRoom.action?&error=Main_Success&'+"date="+new Date());
                                $.popWindow({
                                    width: 1800,
                                    height: 880,
                                    id: 'sphsPop',
                                    url: 'http://10.136.35.229:8080/SphsManage/sphsAction!enterRoom.action?&error=Main_Success&' + "date=" + new Date(),
                                });
                                var timer = null;
                                timer = setInterval(function () {
                                    if ($('#sphsPop', parent.document).find('iframe').get(0)) {
                                        $('#sphsPop', parent.document).find('iframe').css({
                                            width: '1730px',
                                            position: 'absolute',
                                            top: '20px',
                                            left: '30px',
                                            height: '830px',
                                        });
                                        clearInterval(timer);
                                        timer = null;
                                    }
                                    if ($('#sphsPop').find('iframe').get(0)) {
                                        //			                   			alert($('#sphsPop').find('iframe').get(0));
                                        $('#sphsPop').find('iframe').css({
                                            width: '1730px',
                                            position: 'absolute',
                                            top: '20px',
                                            left: '30px',
                                            height: '830px',
                                        });
                                        clearInterval(timer);
                                        timer = null;
                                    }

                                }, 100);

                                _this.find('.sphs_formBg').slideUp(function () {
                                    $(this).remove();
                                    _this.find('.sphs_mask').remove();
                                });
                            }
                        }
                    );
                },
            });

            _this.find('button[name=sphs_cancle]').idxButton({ //按钮的type为submit
                type: 'unTab',
                //	            height:'35px',
                click: function () {

                    _this.find('.sphs_formBg').slideUp(function () {
                        $(this).remove();
                        _this.find('.sphs_mask').remove();
                    });
                },
            });

            _this.find('input[name=sphs_meetingName]').attr('value', '视频会商 ' + new Date().format("MM-dd hh:mm"));
        },


        /*************************************************************************************
         *Title: getUserInfo
         *Description: 登录人信息
         *author: 孙韶辰
         *date: 2016/11/3
         **************************************************************************************/
        'getUserInfo': function (param) {
            $.ajax({ //查询数据
                url: 'zhjhUrlAction!getUserInfo.action',
                dataType: 'json',
                success: function (response) {
                    param.call(this, response);
                },
            });
        },


        /*************************************************************************************
         *Title: buroSelect
         *Description: 添加单位选择菜单
         *author: 孙韶辰
         *date: 2016/11/7
         **************************************************************************************/
        'buroSelect': function (params) {
            var _this = {};
            _this.dwBtn = $('<div class="common_dwBtn">单位</div>');
            _this.dwLeve11 = $('<ul class="common_dwList" ></ul>');
            _this.dwLeve12 = $('<ul class="common_dwList" style="left:154px;height:246px;width:0;display:none"></ul>');
            _this.buroPara = {};
            _this.buroType = '';
            $('body').append(_this.dwBtn);
            $('body').append(_this.dwLeve11);
            $('body').append(_this.dwLeve12);
            $.getJSON('ServerAction!getServerBuro.action?d=' + new Date(), function (response) {
                _this.buroType = response.type;
                if (response.length > 0) {
                    //                  _this.dwBtn.text(response[0].dqjc);
                }

                $.each(response.data, function (index, value) {
                    _this.dwLeve11.append('<li class="common_dwli"  dw_name=' + value.dqjc + '  code=' + value.dqdm + ' level=' + value.level + ' parent_buro=' + value.parent_buro + '>' + value.dqjc + '</li>');
                    if (value.dqjc.length > 4) {
                        _this.dwLeve11.find('li').eq(index).tooltip({title: value.dqjc});
                    }
                    if (_this.buroPara.head_pubBuro == value.dqdm) {
                        _this.dwLeve11.find('li').eq(index).addClass('common_dwliClick');
                    }
                });

                if (response.data.length == 2 && response.data[0].dqjc == response.data[1].dqjc) {
                    _this.dwLeve11.find('li:eq(1)').remove();
                }
                //              _this.dwLeve11.find('li:eq(0)').addClass('common_dwliClick');
                if (params.clicked) {
                    if (_this.buroType != 'cq') {
                        _this.dwLeve11.find('li:eq(0)').trigger('click');
                    } else {
                        _this.dwLeve11.find('li:eq(1)').trigger('click');
                    }
                }

                _this.dwLeve11.show();
                _this.leve1Height = _this.dwLeve11.height() + 5;
                _this.dwLeve11.hide().height(0);
            });


            _this.leve2Height = 0;
            _this.leve1Height = 0;
            _this.upFlag = false;
            _this.liTimer = {};
            _this.dwLeve11.on('mouseover', '.common_dwli', function () {
                var oleve1LiThis = $(this);


                $.each(_this.liTimer, function (index, value) {
                    clearTimeout(value);
                });

                if (_this.buroType != 'cq' && _this.buroType != 'shij') {

                    _this.liTimer[oleve1LiThis.attr('code')] = setTimeout(function () {
                        //_this.dwLeve12.slideUp(function(){
                        oleve1LiThis.addClass('common_li_hover').siblings().removeClass('common_li_hover');
                        $.getJSON('ServerAction!getServerBuro.action?d=' + new Date(), {dqdm: oleve1LiThis.attr('code')}, function (response) {
                            if (response.type && (response.data.length > 1 || (response.data.length == 1 && response.data[0].dqjc == '浙江本部'))) {
                                _this.dwLeve12.children().remove();
                                _this.leve2Height = _this.dwLeve11.height();
                                if (_this.dwLeve12.css('display') == 'none') {
                                    _this.dwLeve12.height(_this.dwLeve11.height()).show().animate({'width': '87px'}, function () {
                                        $.each(response.data, function (index, value) {

                                            _this.dwLeve12.append('<li class="common_dwli" dw_name=' + value.dqjc + ' code=' + value.dqdm + ' level=' + value.level + ' parent_buro=' + value.parent_buro + ' style="display:none">' + value.dqjc + '</li>');
                                            if (_this.buroPara.head_pubBuro == value.dqdm) {
                                                _this.dwLeve12.find('li').eq(index).addClass('common_dwliClick');
                                            }
                                            if (value.dqjc.length > 4) {
                                                _this.dwLeve12.find('li').eq(index).tooltip({title: value.dqjc});
                                            }
                                        });
                                        _this.dwLeve12.find('li').first().show(100, function showLi() {
                                            $(this).next().show(100, showLi);
                                        });
                                    });
                                } else {
                                    $.each(response.data, function (index, value) {
                                        _this.dwLeve12.append('<li class="common_dwli" buro_type="1" dw_name=' + value.dqjc + ' code=' + value.dqdm + ' level=' + value.level + ' parent_buro=' + value.parent_buro + ' style="display:none">' + value.dqjc + '</li>');
                                        if (_this.buroPara.head_pubBuro == value.dqdm) {
                                            _this.dwLeve12.find('li').eq(index).addClass('common_dwliClick');
                                        }
                                        if (value.dqjc.length > 4) {
                                            _this.dwLeve12.find('li').eq(index).tooltip({title: value.dqjc});
                                        }
                                    });
                                }

                            } else {
                                _this.dwLeve12.children().remove();
                                _this.dwLeve12.animate({'width': '0px'}).fadeOut(10);
                            }
                            _this.dwLeve12.find('li').first().show(100, function showLi() {
                                $(this).next().show(100, showLi);
                            });
                        });

                    }, 200);
                }
            });

            _this.level1Timer = null;
            _this.level2Timer = null;

            _this.dwLeve11.hover(
                function () {
                    _this.dwLeve12.stop(true);
                    _this.dwLeve11.stop(true);
                    _this.dwLeve11.show().animate({height: _this.leve1Height + 'px'}, function () {
                        if (_this.dwLeve12.find('.common_dwli').length > 0) {
                            _this.dwLeve12.height(_this.dwLeve11.height()).show().animate({'width': '87px'});
                        }
                    });
                    clearTimeout(_this.level1Timer);
                    clearTimeout(_this.level2Timer);
                },
                function () {
                    _this.level1Timer = setTimeout(function () {
                        _this.dwLeve12.animate({'width': '0px'}).fadeOut(10, function () {
                            _this.dwLeve11.animate({'height': '0px'}, function () {
                                _this.dwLeve11.css('display', 'none');
                            });
                        });

                    }, 600);

                }
            );

            _this.dwLeve12.hover(
                function () {
                    $.each(_this.liTimer, function (index, value) {
                        clearTimeout(value);
                    });
                    _this.dwLeve12.stop(true);
                    _this.dwLeve11.stop(true);
                    _this.dwLeve11.show().animate({height: _this.leve1Height + 'px'}, function () {
                        if (_this.dwLeve12.find('.common_dwli').length > 0) {
                            _this.dwLeve12.height(_this.dwLeve11.height()).show().animate({'width': '87px'});
                        }
                    });
                    clearTimeout(_this.level1Timer);
                    clearTimeout(_this.level2Timer);
                },
                function () {
                    _this.level2Timer = setTimeout(function () {
                        _this.dwLeve12.animate({'width': '0px'}).fadeOut(10, function () {
                            _this.dwLeve11.animate({'height': '0px'}, function () {
                                _this.dwLeve11.css('display', 'none');
                            });
                        });
                    }, 600);

                }
            );

            _this.dwBtn.on({
                click: function () {
                    _this.dwLeve12.stop(true);
                    _this.dwLeve11.stop(true);
                    _this.dwLeve11.show().animate({height: _this.leve1Height + 'px'}, function () {
                        if (_this.dwLeve12.find('.common_dwli').length > 0) {
                            _this.dwLeve12.height(_this.dwLeve11.height()).show().animate({'width': '87px'});
                        }
                    });
                },
                mouseout: function () {
                    _this.level1Timer = setTimeout(function () {
                        _this.dwLeve12.animate({'width': '0px'}).fadeOut(10, function () {
                            _this.dwLeve11.animate({'height': '0px'}, function () {
                                _this.dwLeve11.css('display', 'none');
                            });
                        });
                    }, 600);
                }
            });

            $('.common_dwList').on('click', '.common_dwli', function () {
                $('.common_dwli').removeClass('common_dwliClick');
                $(this).addClass('common_dwliClick');
                _this.dwBtn.text($(this).text());
                if (_this.dwBtn.text().length > 2) {
                    _this.dwBtn.tooltip({title: _this.dwBtn.text()});
                } else {
                    _this.dwBtn.off('mouseover').off('mouseleave').off('mousemove');
                }
                _this.buroPara.head_pubBuro = $(this).attr('code');
                _this.buroPara.head_buroName = $(this).text();
                _this.buroPara.head_buroType = $(this).attr('level');
                _this.buroPara.head_parentBuro = $(this).attr('parent_buro');
                if (params.hanlder) {
                    params.hanlder.call(_this, _this.buroPara);
                }
            });
            _this.setBuro = function (para) {
                _this.buroPara.head_pubBuro = para.code;
                _this.buroPara.head_buroName = para.name;
                _this.dwBtn.text(para.name);
            };
            return _this;
        },


        /*************************************************************************************
         *Title:tbar
         *Description:grid分页工具
         *params: position(left,center,right)：控件的位置.
         *    baseParams:基本参数
         *    baseForm:过滤表单，传入通过formSubmit()方法获取的form，通过点击表单中的提交按钮自动获取表单参数并刷新该表格
         formSubmit()使用方法详见该方法定义
         btns（json数组）：添加按钮，默认封装成idxButton，json格式：text：默认按钮的内容，handler：按钮响应事件，type：默认不填，若填type:'html',则按钮就是text中封装的html格式控件
         url：查询数据路径
         *method: search(para)表格刷新
         *       setParams(data):设置tbar查询时的参数
         *author: 孙韶辰
         *date: 2016/11/10
         **************************************************************************************/
        'tbar': function (params) {
            var _this = {};
            _this.iStart = 0;
            _this.iLimit = params.limit;
            _this.iTotal = 0;
            _this.iPage = 1;
            _this.oParams = {};
            _this.iPageSize = 0;

            _this.oTbarConent = $('<div class="common_tbar_content" style="width:100%"></div>'); //分页工具的容器

            _this.oSy = $('<div class="common_tbBtn common_sy fa fa-backward" style="font-size:10px"></div>'); //首页按钮
            _this.oPre = $('<div class="common_tbBtn common_pre fa fa-caret-left" style="padding-top: 2px; font-size: 18px;"></div>'); //前一页按钮
            _this.oNext = $('<div class="common_tbBtn common_next fa fa-caret-right" style="padding-top: 2px; font-size: 18px"></div>'); //下一页按钮
            _this.oWy = $('<div class="common_tbBtn common_wy fa fa-forward" style="font-size:10px"></div>'); //尾页按钮
            _this.oPageInput = $('<input type="text" class="common_table_page_input" />'); //页面输入框
            _this.oPageCount = $('<div class="common_toolbartext"></div>'); //总页面数
            _this.oDataCount = $('<div class="common_toolbartext"></div>'); //总数据数

            //将各个按钮等放入容器中
            _this.oTbarConent.append(_this.oSy).append(_this.oPre).append(_this.oPageInput).append(_this.oNext).append(_this.oWy).append('<div class="common_toolbartext">&nbsp;共&nbsp;</div>').append(_this.oPageCount).append('<div class="common_toolbartext">&nbsp;页&nbsp;&nbsp;</div>').append(_this.oDataCount);

            if (params.position) {
                if (params.position == 'left') {
                    _this.oTbarConent.css('justify-content', 'flex-start'); //控件居左
                } else if (params.position == 'center') {
                    _this.oTbarConent.css('justify-content', 'center'); //控件居中
                } else if (params.position == 'right') {
                    _this.oTbarConent.css('justify-content', 'flex-end'); //控件居右
                }
            }

            //设置查询表单
            if (params.baseForm) {
                params.baseForm.setGrid(_this);
            }
            if (params.tag) {
                if (params.tag == 'rkmark') {//表头
                    _this.oTbarConent.append('<div style="height:22px;width:10px;border-right:1px solid #E8E9EA;margin-right:10px"></div>'); //分割线
                    _this.oTbarConent.append('<div style="flex: 1"><div style="margin-right: 10px;float: left;"><span style="display: inline-block;height: 18px;width: 18px;background-color: #1eeb28;margin-right: 10px; margin-top: 4px;"></span>已入库</div><div style="margin-right: 10px;float: left;"><span style="display: inline-block;height: 18px;width: 18px;background-color: #f8f8f8;margin-right: 10px; margin-top: 4px;"></span>未入库</div><div style="margin-right: 10px;float: left;"><span style="display: inline-block;height: 18px;width: 18px;background-color: rgb(190, 255, 255);margin-right: 10px; margin-top: 4px;"></span>未维护</div></div>'); //未入库
                }
                if (params.tag == 'xmwctjqk') {//表头
                    _this.oTbarConent.append('<div style="height:22px;width:10px;border-right:1px solid #E8E9EA;margin-right:10px"></div>'); //分割线
                    _this.oTbarConent.append('<div style="flex: 1"><div style="margin-right: 10px;float: left;"><span style="display: inline-block;height: 18px;width: 18px;background-color: #ECEC2b;margin-right: 10px; margin-top: 4px;"></span>未开始</div></div>'); //未入库
                }
                if (params.tag == 'custom') {
                    _this.oTbarConent.append('<div style="height:22px;width:10px;border-right:1px solid #E8E9EA;margin-right:10px"></div>'); //分割线
                    _this.oTbarConent.append('<div style="flex: 1"></div>');
                }

                if (params.tag == 'custom2') {//表头

                    _this.oTbarConent.append('<div style="height:22px;width:10px;border-right:1px solid #E8E9EA;;margin-right:10px"></div>'); //分割线
                }
                if(params.tag == 'warningmark'){
                	  _this.oTbarConent.append('<div style="height:22px;width:10px;border-right:1px solid #E8E9EA;margin-right:10px"></div>'); //分割线
                      _this.oTbarConent.append('<div style="flex: 1"><div style="margin-right: 10px;float: left;"><img src="../../resources/img/warning_2.png" style="display: inline-block;height: 18px;width: 18px;margin-right: 10px; margin-top: 4px;"/>预警</div><div style="margin-right: 10px;float: left;"><img src="../../resources/img/warning.png" style="display: inline-block;height: 18px;width: 18px;margin-right: 10px; margin-top: 4px;"></span>滞后</div></div>'); //未入库	
                }


            }
            //添加按钮
            if (params.btns) {

                if (!params.tag) {
                    _this.oTbarConent.append('<div style="height:22px;width:10px;border-right:1px solid #E8E9EA;;margin-right:10px"></div>'); //分割线
                }
                $.each(params.btns, function (index, value) {
                    if (index == params.btns.length-1) {
                        if (params.tag) {
                            if (params.tag == 'custom2') {//表头

                                _this.oTbarConent.append('<div style="flex: 1"></div>'); //未入库
                            }

                        }
                    }//else{
                    if (!value.type) { //默认封装成按钮
                        _this.oBtn = $('<button>' + value.text + '</button>');
                        _this.oTbarConent.append(_this.oBtn);
                        _this.oBtn.idxButton({
                            type: 'unTab',
                            width: 30 + value.text.length * 16,
                            height: 24,
                            click: function (_this) {
                                if (value.handler) {
                                    value.handler.call();
                                }
                            },
                        });

                    } else if (value.type == 'html') { //如果type为html。则按钮类型为自定义的内容
                        _this.oBtn = $(value.text);
                        _this.oTbarConent.append(_this.oBtn);
                        _this.oBtn.on('click', function () {
                            if (value.handler) {
                                value.handler.call();
                            }
                            return false;
                        }).css('margin-right', '10px');
                    }
                    // }
                });
            }

            _this.setParams = function (data) {
                _this.searchPara = data;
            };

            _this.oSearchData = {}; //search方法传入的参数过滤条件
            _this.onSearch = false;
            _this.sort = null;
            _this.dir = null;
            //数据刷新方法，oSearchParams：过滤条件，flag：如果不为true则分页从头开始
            _this.search = function (oSearchParams, flag) {
                if (!_this.oTbarConent.find('.common_tbarMask').get(0)) {
                    _this.oTbarConent.append('<div class="common_tbarMask"></div>');
                    _this.grid.find('.common_grid_div').append('<div class="common_loadingMask"><div class="fa fa-spinner fa-pulse fa-fw" style="font-size: 30px;"></div></div>');
                    _this.grid.find('.common_loadingMask').css('top', _this.grid.find('.common_grid_div').scrollTop());
                    _this.grid.find('.common_loadingMask').css('left', _this.grid.find('.common_grid_div').scrollLeft());
                    _this.grid.find('.common_grid_div').on('scroll', function () { //表格上下拖动时，表头表的位置始终保持不变
                        _this.grid.find('.common_loadingMask').css('top', _this.grid.find('.common_grid_div').scrollTop());
                        _this.grid.find('.common_loadingMask').css('left', _this.grid.find('.common_grid_div').scrollLeft());
                    });
                }
                _this.onSearch = true;
                //  console.log(params.baseForm)
                if (params.baseForm) {
                    _this.oParams = params.baseForm.getParams(); //获取表单参数
                    // console.log(_this.oParams)
                }

                if (params.baseParams) {
                    $.each(params.baseParams, function (name, value) {
                        _this.oParams[name] = value; //获取定义tbar的参数数据
                    });
                }
                //console.log(_this.searchPara);
                if (_this.searchPara) {
                    $.each(_this.searchPara, function (name, value) {
                        _this.oParams[name] = value;
                    });
                }

                if (oSearchParams) {
                    _this.oSearchData = oSearchParams; //将参数传给_this.oSearchData，之后分页时使用该参数                    
                    $.each(oSearchParams, function (name, value) {
                        _this.oParams[name] = value; //获取saarch的参数
                        if (name == 'sort') {
                            _this.sort = value;
                        } else if (name == 'dir') {
                            _this.dir = value;
                        }else if(name=='limit'){
                        	
                        	_this.iLimit=value;
                        }else if(name=='param_url'){
                        	params.url=value;
                        }
                    });
                } else {
                    _this.oSearchData = {}; //如果没有传参，则置为初始值

                }

                //_this.oParams.sort = _this.sort;
                //_this.oParams.dir = _this.dir;

                if (!flag) {
                    _this.iStart = 0;
                    _this.iPage = 1;
                    _this.oParams.start = _this.iStart;
                    _this.oParams.limit = _this.iLimit;
                   // _this.iStart += _this.iLimit; //查询后将start置为下一页起始位置
                }else{
                	_this.oParams.start = _this.iStart;
                    _this.oParams.limit = _this.iLimit;
                }

               
                
                //console.log('data is:' + JSON.stringify(_this.oParams));
                //console.log('url is:' + params.url);
                $.ajax({ //查询数据
                    type: 'post',
                    data: _this.oParams,
                    url: params.url,

                    dataType: 'json',

                    success: function (response) {
                    	//"statisticsAction!initSub.action_f"
                    	if(params.url=="statisticsAction!initSub_f.action"){
                    		urll=params.url;
                    		responsee=response;
                    	}else if(params.url=='statisticsAction!initPreSub.action'){
                    		urlll=params.url;
                    		responseee=response;
                    	}else if(params.url=='statisticsAction!initSub.action'){
                    		urll=params.url;
                    		responsee=response;
                    	}
                    	_this.grid.refreshData(response, oSearchParams);
                        _this.iTotal = parseInt(response.totalProperty); //获取总数量
                        _this.iPageSize = Math.ceil(_this.iTotal / _this.iLimit); //页码数
                        _this.oPageInput.val(_this.iPage); //设置当前页值
                        _this.oPageCount.text(_this.iPageSize);
                        _this.oDataCount.html(response.totalProperty + '&nbsp;条');
                        _this.onSearch = false;


                    },
                    complete: function () {
                    }
                });
            };
            var iOldPage = '1';
            _this.oPageInput.on('keypress', function (event) {

                if (event.keyCode == "13") { //页码输入框回车后的事件
                    if (!isNaN(_this.oPageInput.val()) && _this.oPageInput.val() <= _this.iPageSize && _this.oPageInput.val() > 1) {
                        _this.oPageInput.val(Math.round(_this.oPageInput.val()));
                        _this.iPage = _this.oPageInput.val();
                    } else if (!isNaN(_this.oPageInput.val()) && _this.oPageInput.val() >= _this.iPageSize) {
                        _this.oPageInput.val(_this.iPageSize);
                        _this.iPage = _this.iPageSize;
                    } else {
                        _this.oPageInput.val(1);
                        _this.iPage = 1;
                    }
                    if (iOldPage != _this.iPage) {
                        _this.iStart = (_this.iPage - 1) * _this.iLimit;
                        _this.search(_this.oSearchData, true);
                    }
                }
            });

            _this.oSy.on('click', function () { //首页点击事件
                if (!_this.onSearch) {
                    if (_this.oPageInput.val() != '1') {
                        _this.iStart = 0;
                        _this.iPage = 1;
                        _this.search(_this.oSearchData, true);
                    }
                }
            });

            _this.oPre.on('click', function () { //上一页点击事件
                if (!_this.onSearch) {
                    if (_this.oPageInput.val() != '1') {
                        _this.iPage -= 1;
                        _this.iStart = (_this.iPage - 1) * _this.iLimit;
                        _this.search(_this.oSearchData, true);
                    }
                }
            });

            _this.oNext.on('click', function () { //下一页
                if (!_this.onSearch) {
                    if (_this.oPageInput.val() != _this.iPageSize) {
                        if (typeof _this.iPage == 'string') {
                            _this.iPage = parseInt(_this.iPage);
                        }
                        _this.iPage += 1;
                        _this.iStart = (_this.iPage - 1) * _this.iLimit;
                        _this.search(_this.oSearchData, true);
                    }
                }
            });

            _this.oWy.on('click', function () { //尾页
                if (!_this.onSearch) {
                    if (_this.oPageInput.val() != _this.iPageSize) {
                        _this.iPage = _this.iPageSize;
                        _this.iStart = (_this.iPage - 1) * _this.iLimit;
                        _this.search(_this.oSearchData, true);
                    }
                }
            });

            _this.setGrid = function (grid) {
                _this.grid = grid;
                if (params.url) {
                    if (!grid.getNoLoad()) {
                        _this.search();
                    }
                }
            };

            _this.getLimit = function () { //获取limit值
                return _this.iLimit;
            };
            _this.getTotal = function () { //获取总条数
                return _this.iTotal;
            };

            _this.refreshData = function (oData) {
                _this.grid.refreshData(oData); //调用表格的刷新数据方法
                _this.iTotal = parseInt(oData.totalProperty); //获取总数量
                _this.iPageSize = Math.ceil(_this.iTotal / _this.iLimit); //页码数
                _this.oPageInput.val(1); //设置当前页值
                _this.oPageCount.text(_this.iPageSize);
                _this.oDataCount.html(oData.totalProperty + '&nbsp;条');
            };
            return _this;
        },
        /*************************************************************************************
         *Title:loadMask
         *Description: 添加蒙版，默认给body添加。通过randerTo给指定节点添加(节点要有position)
         *params:  width:宽度（可选，默认父容器宽度）,height：高度(可选，默认父容器高度),randerTo:要添加蒙版的容器（可选，默认给body添加）
         *author: 孙韶辰
         *date: 2016/11/5
         **************************************************************************************/
        'loadMask': function (params) {
            var oThis = {};
            oThis.oMask = $('<div class="common_loadMask" style="display:block;opacity: 0.8"></div>');
            if (!params) {
                if ($('body', parent.document).get()) {
                    $('body', parent.document).append(oThis.oMask);
                    oThis.oMask.width($('body', parent.document).width());
                    oThis.oMask.height($('body', parent.document).height());
                } else {
                    oThis.oMask.width($('body').width());
                    oThis.oMask.height($('body').height());
                    $('body').append(oThis.oMask);
                }
            } else {
                if (params.randerTo) {
                    params.randerTo.append(oThis.oMask);
                    oThis.oMask.width(params.randerTo.width());
                    oThis.oMask.height(params.randerTo.height());
                } else if ($('body', parent.document).get(0)) {
                    $('body', parent.document).append(oThis.oMask);
                    oThis.oMask.width($('body', parent.document).width());
                    oThis.oMask.height($('body', parent.document).height());
                }

                if (params.width) {
                    oThis.oMask.width(params.width);
                }

                if (params.height) {
                    oThis.oMask.height(params.height);
                }
            }

            oThis.show = function () {
                oThis.oMask.fadeTo('normal', 0.9);
            };

            oThis.hide = function () {
                oThis.oMask.fadeOut('normal', function () {
                    this.remove();
                });
            };

            return oThis;
        },


        /*************************************************************************************
         *Title:alert
         *Description: 告警弹框
         *params: title:弹框标题（可选） ,msg:提示内容 ,callback:回调function
         *params: parentDoc:parent.parent.document ,parentWin:parent.parent.window 在哪个页面下弹框
         *     注意：可以直接传要显示的字符串
         *method：closeWindow()关闭该弹窗
         *author: 孙韶辰
         *date: 2016/11/5
         **************************************************************************************/
        'alert': function (params) {
            var oThis = {};
            oThis.oWin = $('<div class="common_win_small" style="opacity:0"></div>');
            oThis.oTitle = $('<div class="common_win_small_title"></div>');
            oThis.oMsg = $('<div class="common_win_small_msg"></div>');
            oThis.oBtn = $('<button class="common_win_small_btn" style="left:110px">确定</button>');
            oThis.oWin.append(oThis.oTitle);
            oThis.oWin.append(oThis.oMsg);
            oThis.oWin.append(oThis.oBtn);
            var oMask = null;

            oThis.oBtn.on('click', function () {
                oThis.oWin.fadeOut('normal', function () {
                    this.remove();
                    if (params) {
                        if (params.callback) {
                            params.callback.call();
                        }
                    }
                });
                oMask.hide();
            });

            if (params) {
                if (params.width) {
                    oThis.oWin.outerWidth(params.width);
                    oThis.oBtn.css('left', oThis.oWin.outerWidth() / 2 - 40);
                }

                if (params.height) {
                    oThis.oWin.outerHeight(params.height);
                    oThis.oMsg.outerHeight(params.height - 70);
                    oThis.oMsg.outerWidth(params.width - 60);
                    oThis.oMsg.css('line-height', '30px');
                    oThis.oMsg.css('margin', 'auto');
                    oThis.oMsg.css('text-align', 'center');
                }

                if (params.parentDoc) {
                    if (!params.maskRander) {
                        oMask = $.loadMask({randerTo: $('body', params.parentDoc)});
                    }
                    $('body', params.parentDoc).append(oThis.oWin);
                    oThis.oWin.css({
                        top: $(params.parentWin).height() / 2 + $(params.parentDoc).scrollTop() - 75 + 'px',
                        left: $(params.parentWin).width() / 2 + $(params.parentDoc).scrollLeft() - 150 + 'px'
                    });
                } else if ($('body', parent.document).get()) {
                    oMask = $.loadMask();
                    oMask.show();
                    $('body', parent.document).append(oThis.oWin);
                    // alert();
                    oThis.oWin.css({
                        top: $(parent.window).height() / 2 + $(parent.document).scrollTop() - oThis.oWin.outerHeight() / 2 + 'px',
                        left: $(parent.window).width() / 2 + $(parent.document).scrollLeft() - oThis.oWin.outerWidth() / 2 + 'px'
                    });

                } else {
                    oMask = $.loadMask();
                    oMask.show();
                    $('body').append(oThis.oWin);
                    // alert();
                    oThis.oWin.css({
                        top: $(window).height() / 2 + $(document).scrollTop() - 75 + 'px',
                        left: $(window).width() / 2 + $(document).scrollLeft() - 150 + 'px'
                    });
                }

                if ($.isPlainObject(params)) {
                    if (params.hideBtn) {
                        oThis.oBtn.remove();
                    }

                    oThis.oWin.fadeTo('normal', 0.9);
                    oThis.oWin.fadeTo(1, 1);

                    if (params.title) {
                        oThis.oTitle.text(params.title);
                    } else {
                        oThis.oTitle.outerHeight(0);
                        if (!params.height) {
                            oThis.oWin.outerHeight(oThis.oWin.outerHeight() - 30);
                        }

                    }
                    if (params.msg) {
                        oThis.oMsg.html(params.msg);
                    }

                } else {
                    oThis.oMsg.text(params);
                    oThis.oWin.fadeTo('normal', 0.9);
                    oThis.oWin.fadeTo(1, 1);
                    oThis.oTitle.outerHeight(0);
                    oThis.oWin.outerHeight(oThis.oWin.outerHeight() - 30);
                }

            }

            oThis.closeWindow = function () {
                oThis.oWin.fadeOut('normal', function () {
                    this.remove();
                    if (params) {
                        if (params.callback) {
                            params.callback.call();
                        }
                    }
                });
                oMask.hide();
            };
            return oThis;
        },

        /*************************************************************************************
         *Title:confirm
         *Description: 提示弹框
         *params: title:弹框标题（可选） ,msg:提示内容 ,callback:回调function     .
         *params: parentDoc:parent.parent.document ,parentWin:parent.parent.window 在哪个页面下弹框
         *     注意：可以直接传要显示的字符串
         *method：closeWindow()关闭该弹窗
         *author: 孙韶辰
         *date: 2016/11/5
         **************************************************************************************/
        'confirm': function (params) {
            var oThis = {};
            oThis.oWin = $('<div class="common_win_small" style="opacity:0"></div>');
            oThis.oTitle = $('<div class="common_win_small_title"></div>');
            oThis.oMsg = $('<div class="common_win_small_msg"></div>');
            var oYBtn = $('<button class="common_win_small_btn" style="left:70px">确定</button>');
            var oNBtn = $('<button class="common_win_small_btn" style="left:70px">取消</button>');
            oThis.oWin.append(oThis.oTitle);
            oThis.oWin.append(oThis.oMsg);
            oThis.oWin.append(oYBtn);
            oThis.oWin.append(oNBtn);
            var oMask = null;

            oYBtn.on('click', function () {
                oThis.oWin.fadeOut('normal', function () {

                    if (params) {
                        if (params.callback) {
                            params.callback.call();
                        }
                    }
                    this.remove();
                });
                oMask.hide();
            });
            oNBtn.on('click', function () {
                oThis.oWin.fadeOut('normal', function () {
                    this.remove();
                });
                oMask.hide();

            });

            if (params.width) {
                oThis.oWin.outerWidth(params.width);
                oYBtn.css('left', oThis.oWin.outerWidth() / 2 - 80);
                oNBtn.css('left', oThis.oWin.outerWidth() / 2 - 80);
            }

            if (params.height) {
                oThis.oWin.outerHeight(params.height);
                oThis.oMsg.outerHeight(params.height - 90);
                if (params.height > 300) {
                    oThis.oMsg.outerWidth(params.width - 60);
                    oThis.oMsg.css('line-height', '30px');
                    oThis.oMsg.css('margin', 'auto');
                }

            }

            if (params) {
                if (params.parentDoc) {
                    if (!params.maskRander) {
                        oMask = $.loadMask({randerTo: $('body', params.parentDoc)});
                    }
                    $('body', params.parentDoc).append(oThis.oWin);
//                    oThis.oWin.css({
//                        top: $(params.parentWin).height() / 2 + $(params.parentDoc).scrollTop() - 75 + 'px',
//                        left: $(params.parentWin).width() / 2 + $(params.parentDoc).scrollLeft() - 150 + 'px'
//                    });

                    if (params.height) {
                        oThis.oWin.css({
                            top: $(params.parentWin).height() / 2 + $(params.parentDoc).scrollTop() - params.height / 2 + 'px',
                            left: $(params.parentWin).width() / 2 + $(params.parentDoc).scrollLeft() - 150 + 'px'
                        });

                    } else {
                        oThis.oWin.css({
                            top: $(params.parentWin).height() / 2 + $(params.parentDoc).scrollTop() - 75 + 'px',
                            left: $(params.parentWin).width() / 2 + $(params.parentDoc).scrollLeft() - 150 + 'px'
                        });


                    }

                    //if()
                } else if ($('body', parent.document).get()) {
                    oMask = $.loadMask();
                    oMask.show();
                    $('body', parent.document).append(oThis.oWin);
                    // alert();
                    oThis.oWin.css({
                        top: $(parent.window).height() / 2 + $(parent.document).scrollTop() - 75 + 'px',
                        left: $(parent.window).width() / 2 + $(parent.document).scrollLeft() - 150 + 'px'
                    });
                } else {
                    oMask = $.loadMask();
                    oMask.show();
                    $('body').append(oThis.oWin);
                    // alert();
                    oThis.oWin.css({
                        top: $(window).height() / 2 + $(document).scrollTop() - 75 + 'px',
                        left: $(window).width() / 2 + $(document).scrollLeft() - 150 + 'px'
                    });
                }

                oThis.oWin.fadeTo('normal', 0.9);
                oThis.oWin.fadeTo(1, 1);


                if ($.isPlainObject(params)) {

                    oThis.oWin.fadeTo('normal', 0.9);
                    oThis.oWin.fadeTo(1, 1);

                    if (params.title) {
                        oThis.oTitle.text(params.title);
                    } else {
                        oThis.oTitle.outerHeight(0);
                        if (!params.height) {
                            oThis.oWin.outerHeight(oThis.oWin.outerHeight() - 30);
                        }
                    }
                    if (params.msg) {
                        oThis.oMsg.html(params.msg);
                    }


                    if (params.checkall) {

                        var CheckCount = 0;
                        $('input[name="cm"]').on('click', function () {//全选事件监听
                            console.log("thead input click");
                            if (CheckCount == 0) {// var rowSelectNum = zxmgl_grid.find('.common_grid_rowchecked');
                                $('input[name="cmn"]').prop('checked', true);
                                CheckCount++;
                            } else {
                                $('input[name="cmn"]').prop('checked', false);
                                CheckCount--;
                            }
                        });

                    }
                } else {
                    oThis.oMsg.text(params);
                    oThis.oWin.fadeTo('normal', 0.9);
                    oThis.oWin.fadeTo(1, 1);
                    oThis.oTitle.outerHeight(0);
                    oThis.oWin.outerHeight(oThis.oWin.outerHeight() - 30);
                }
            }

            oThis.closeWindow = function () {
                oThis.oWin.fadeOut('normal', function () {
                    this.remove();
                });
                oMask.hide();
            };
            return oThis;
        },

        /*************************************************************************************
         /*************************************************************************************
         *Title:popWindow
         *Description: 弹框，高度小于600px时，会改变风格
         *params: width:宽度 ,height:高度,url:弹框页面地址 ，  callBack：弹框关闭的回掉方法
         *params: parentDoc:parent.parent.document ,parentWin:parent.parent.window 在哪个页面下弹框
         *method：closeWindow()关闭该弹窗      子页中定义getCommonPopWindow(oThis.oWin)方法可以获取该弹窗对象
         *author: 孙韶辰
         *date: 2016/11/5
         **************************************************************************************/
        'popWindow': function (params) {
            //      var _this = this;
            var oThis = {};
            oThis.oWin = $('<div class="common_win_big"></div>');
            oThis.oTitle = $('<h class="common_popWin_title">弹框标题</h>');
            oThis.oIframe = $('<iframe src="" frameborder="0" class="common_win_iframe"  height="100%" width="100%"></iframe>');
            oThis.oCloseBtn = $('<div class="common_popWin_Close_big"></div>');

            oThis.oMask = null;

            oThis.oWin.append(oThis.oTitle);
            oThis.oWin.append(oThis.oIframe);
            oThis.oWin.append(oThis.oCloseBtn);

            if (params) {
                if (params.id) {
                    oThis.oWin.attr('id', params.id);
                }
                if (params.width) {
                    oThis.oWin.width(params.width);
                }
                if (params.height) {
                    oThis.oWin.height(params.height);
                    if (oThis.oWin.height() <= 600&&params.lx!=="photo") {
                    	
                        oThis.oWin.addClass('common_win_small').css({
                            'background': 'rgba(24,51,75,0.6)',
                            'border-image': 'none',
                        });
                        oThis.oTitle.css({
                            'left': '15px',
                            'border-image': 'none',
                            'background': '#196E9C',
                            'border-radius': '10px',
                            'line-height': '40px',
                            'top': '10px',
                        });
                        oThis.oTitle.width(oThis.oWin.width() - 35);
                        oThis.oCloseBtn.removeClass('common_popWin_Close_big').addClass('common_popWin_Close_small');
                    }
                }
                if (params.title) {
                    oThis.oTitle.text(params.title).show();
                }

                if (params.maskRander) {
                    oThis.oMask = $.loadMask({randerTo: params.maskRander});
                }
                try {
                    if (params.parentDoc) {
                        if (!params.maskRander) {
                            oThis.oMask = $.loadMask({randerTo: $('body', params.parentDoc)});
                        }
                        $('body', params.parentDoc).append(oThis.oWin);
                    } else if ($('body', parent.document).get()) {
                        if (!params.maskRander) {
                            oThis.oMask = $.loadMask();
                        }
                        $('body', parent.document).append(oThis.oWin);
                    } else {
                        if (!params.maskRander) {
                            oThis.oMask = $.loadMask();
                        }
                        $('body').append(oThis.oWin);
                    }
                } catch (e) {
                    oThis.oMask = $.loadMask();
                    $('body').append({randerTo: $('body', document)});
                }


                oThis.oMask.show();
                oThis.oWin.css('display', 'none');

                oThis.oTimer = null;
                if (params.url) {
                    oThis.oIframe.attr("src", params.url);

                    var iCount = 0;
                    if (params.url.indexOf('http') < 0 || params.url.substring(0, $.getIndex(_urlCommon, '/', 4) + 1) == _urlCommon) {
                        oThis.oTimer = setInterval(function () {
                            if (iCount <= 10) {
                                if (oThis.oIframe.get(0).contentWindow) {
                                    if (oThis.oIframe.get(0).contentWindow.getCommonPopWindow) {
                                        oThis.oIframe.get(0).contentWindow.getCommonPopWindow.call(this, oThis);
                                        clearInterval(oThis.oTimer);
                                    }
                                }
                            } else {
                                clearInterval(oThis.oTimer);
                            }

                            iCount++;
                        }, 500);
                    }

                }

            }

            oThis.oInterval = null;

            oThis.setPosition = function () {
                oThis.oInterval = setInterval(function () {
                    try {
                        if (params.parentDoc) {
                            if (oThis.oWin.outerHeight() > $(params.parentWin).height()) {
                                oThis.oWin.css('top', ($('body', params.parentDoc).height() - oThis.oWin.outerHeight()) / 2 + 'px');
                            } else {
                                oThis.oWin.css('top', $(params.parentWin).height() / 2 + $(params.parentDoc).scrollTop() - oThis.oWin.outerHeight() / 2 + 'px');
                            }

                            if (oThis.oWin.outerWidth() > $(params.parentWin).width()) {
                                oThis.oWin.css('left', ($('body', params.parentDoc).width() - oThis.oWin.outerWidth()) / 2 + 'px');
                            } else {
                                oThis.oWin.css('left', $(params.parentWin).width() / 2 + $(params.parentDoc).scrollLeft() - oThis.oWin.outerWidth() / 2 + 'px');
                            }
                        } else if ($('body', parent.document).get()) {
                            if (params.height > $(parent.window).height()) {
                                oThis.oWin.css('top', ($('body', parent.document).height() - oThis.oWin.outerHeight()) / 2 + 'px');
                            } else {
                                oThis.oWin.css('top', $(parent.window).height() / 2 + $(parent.document).scrollTop() - oThis.oWin.outerHeight() / 2 + 'px');
                            }

                            if (params.width > $(parent.window).width()) {
                                oThis.oWin.css('left', ($('body', parent.document).width() - oThis.oWin.outerWidth()) / 2 + 'px');
                            } else {
                                oThis.oWin.css('left', $(parent.window).width() / 2 + $(parent.document).scrollLeft() - oThis.oWin.outerWidth() / 2 + 'px');
                            }
                        } else {
                            if (oThis.oWin.outerHeight() > $(window).height()) {
                                oThis.oWin.css('top', ($(document.body).height() - oThis.oWin.outerHeight()) / 2 + 'px');
                            } else {
                                oThis.oWin.css('top', $(window).height() / 2 + $(document).scrollTop() - oThis.oWin.outerWidth() / 2 + 'px');
                            }

                            if (oThis.oWin.outerWidth() > $(window).width()) {
                                oThis.oWin.css('left', ($(document.body).width() - oThis.oWin.outerWidth()) / 2 + 'px');
                            } else {
                                oThis.oWin.css('left', $(window).width() / 2 + $(document).scrollLeft() - oThis.oWin.outerHeight() / 2 + 'px');
                            }

                        }
                    } catch (e) {
                        if (oThis.oWin.outerHeight() > $(window).height()) {
                            oThis.oWin.css('top', ($(document.body).height() - oThis.oWin.outerHeight()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('top', $(window).height() / 2 + $(document).scrollTop() - oThis.oWin.outerWidth() / 2 + 'px');
                        }

                        if (oThis.oWin.outerWidth() > $(window).width()) {
                            oThis.oWin.css('left', ($(document.body).width() - oThis.oWin.outerWidth()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('left', $(window).width() / 2 + $(document).scrollLeft() - oThis.oWin.outerHeight() / 2 + 'px');
                        }
                    }


                }, 4);
            };

            oThis.setPosition();

            oThis.oWin.slideDown(function () {
                setTimeout(function () {
                    clearInterval(oThis.oInterval);
                    oThis.oInterval = null;
                }, 1000);

            });

            oThis.closeWindow = function (data) {
                if (params.beforeClose) {
                    try {
                        params.beforeClose(oThis.oIframe[0].contentWindow);
                    } catch (e) {
                        params.beforeClose.call(this);
                    }

                }
                oThis.oWin.slideUp(function () {
                    clearInterval(oThis.oInterval);
                    if (params.callBack) {
                        params.callBack.call(this, data);
                    }
                    oThis.oInterval = null;
                    this.remove();
                });
                oThis.setPosition();
                oThis.oMask.hide();


            };

            oThis.oCloseBtn.on('click', function () {
                oThis.closeWindow();
            });

            return oThis;

        },

        /*************************************************************************************
         *Title:getRadioName
         *Description: 获取radio的值
         *name: radio的name值
         *author: 孙韶辰
         *date: 2016/11/5
         **************************************************************************************/
        'getRadioValue': function (name) {
            return $('.radiochecked[name=' + name + ']').parent().parent().attr('radio_value');
        },

        /*************************************************************************************
         *Title:getRadioName
         *Description: 获取radio的值
         *name: radio的name值
         *author: 孙韶辰
         *date: 2016/11/5
         **************************************************************************************/
        'getCheckBoxValue': function (name) {
            var sResult = '';
            var aChecked = $('.common-checkbox-check[name=' + name + ']').parent().find('div[class=checkBox-div]');
            $.each(aChecked, function (index, value) {
                sResult += $(value).attr('value') + ',';
            });
            return sResult;
        },


        /*************************************************************************************
         *Title:mouseCoords
         *Description: 鼠标当前坐标
         *author: 罗炜
         *date: 2016/12/23
         **************************************************************************************/
        'mouseCoords': function (ev) {
            if (ev.pageX || ev.pageY) {
                return {x: ev.pageX, y: ev.pageY};
            }
            return {
                x: ev.clientX + document.body.scrollLeft - document.body.clientLeft,
                y: ev.clientY + document.body.scrollTop - document.body.clientTop
            };
        },


        /*************************************************************************************
         *Title:popWindowDrag
         *Description: 弹出框拖拽功能
         *params: 窗口最外层对象
         *author: 罗炜
         *date: 2016/12/23
         **************************************************************************************/
        'popWindowDrag': function (_this, direction) {
            var dragPrams = {
                _thisInitX: '', //窗口原始原点位置
                _thisInitY: '',
                startMouseX: '', //鼠标点击位置
                startMouseY: '',
                endMouseX: '', //鼠标松开位置
                endMouseY: '',
                _thisEndX: '', //窗口移动后原点位置
                _thisEndY: '',
                isDragged: false
            };


            _this.on("mousedown", function (e) {
                var mouseLoction = $.mouseCoords(e);
                dragPrams.startMouseX = mouseLoction.x;
                dragPrams.startMouseY = mouseLoction.y;

                var offset = _this.offset();
                dragPrams._thisInitX = offset.left;
                dragPrams._thisInitY = offset.top;
                dragPrams.isDragged = true;
                _this.css({
                    'cursor': 'move'
                });
            });

            _this.on("mousemove", function (e) {
                if (dragPrams.isDragged == true) {

                    var mouseLoction = $.mouseCoords(e);
                    dragPrams.endMouseX = mouseLoction.x;
                    dragPrams.endMouseY = mouseLoction.y;
                    dragPrams._thisEndX = dragPrams.endMouseX + dragPrams._thisInitX - dragPrams.startMouseX;
                    dragPrams._thisEndY = dragPrams.endMouseY + dragPrams._thisInitY - dragPrams.startMouseY;

                    var pHeight = _this.outerHeight() > $(parent.window).height() ? $('body', parent.document).height() : $(parent.window).height();
                    var pWidth = _this.outerWidth() > $(parent.window).width() ? $('body', parent.document).width() : $(parent.window).width();

                    if (dragPrams._thisEndX > pWidth + $(parent.document).scrollLeft() - _this.outerWidth()) {
                        dragPrams._thisEndX = pWidth + $(parent.document).scrollLeft() - _this.outerWidth() - 10;
                    }
                    if (dragPrams._thisEndY > pHeight + $(parent.document).scrollTop() - _this.outerHeight()) {
                        dragPrams._thisEndY = pHeight + $(parent.document).scrollTop() - _this.outerHeight() - 10;
                    }
                    if (dragPrams._thisEndX < $(parent.document).scrollLeft()) {
                        dragPrams._thisEndX = $(parent.document).scrollLeft() + 10;
                    }
                    if (dragPrams._thisEndY < $(parent.document).scrollTop()) {
                        dragPrams._thisEndY = $(parent.document).scrollTop() + 10;
                    }
                    if (direction == 'horizontal') {
                        _this.css({
                            'left': dragPrams._thisEndX + 'px',
                        });
                    } else if (direction == 'vertical') {
                        _this.css({
                            'top': dragPrams._thisEndY + 'px'
                        });
                    } else {
                        _this.css({
                            'left': dragPrams._thisEndX + 'px',
                            'top': dragPrams._thisEndY + 'px'
                        });
                    }
                }
            });
            _this.on("mouseup", function (e) {
                dragPrams.isDragged = false;
                _this.css({
                    'cursor': 'default'
                });
            });
        },


        /*************************************************************************************
         *Title:popzTree
         *Description: 弹出一个新窗口   显示一棵树    返回树节点
         *params: 对象具体属性用法看demo.js内部调用方法例子
         *author: 罗炜
         *date: 2016/12/16
         **************************************************************************************/
        'popzTree': function (params) {
            /* 基本框架布局      开始 */
            var oThis = {};
            oThis.oWin = $('<div class="common_popzTree"></div>');
            oThis.oTitle = $('<h class="common_popzTree_title">弹框标题</h>');
            oThis.oCloseBtn = $('<img src="' + _urlCommon + 'resources/img/new_winclose.png" style="position:absolute;top:15px;right:15px; cursor:pointer;width:30px" alt="" />');

            oThis.oBottomDivBox = $('<div class="common_popzTree_bottomBox"></div>');
            var oYBtn = $('<button class="common_popzTree_bottomBox_btn" >确定</button>');
            var oCBtn = $('<button class="common_popzTree_bottomBox_btn" >清空</button>');
            var oNBtn = $('<button class="common_popzTree_bottomBox_btn" >取消</button>');
            oThis.oBottomDivBox.append(oYBtn);
            oThis.oBottomDivBox.append(oCBtn);
            oThis.oBottomDivBox.append(oNBtn);

            oThis.ozTreeBox = $('<div class="zTreeDiv"></div>');
            var oZTree = $('<ul id="popzTree" class="ztree"></ul>');
            oThis.ozTreeBox.append(oZTree);


            oThis.oWin.append(oThis.oTitle);
            oThis.oWin.append(oThis.oCloseBtn);
            oThis.oWin.append(oThis.ozTreeBox);
            oThis.oWin.append(oThis.oBottomDivBox);

            /* 基本框架布局  结束 */

            var tree = null;
            var _topTreeNode = null;

            if (params) {

                /* 通过传入参数控制框架布局  开始 */
                if (params.width) {
                    if (params.width > 1800) {
                        params.width = 1800;
                    }
                    if (params.width < 400) {
                        params.width = 400;
                    }
                    oThis.oWin.width(params.width);
                    oThis.oTitle.css({
                        'width': params.width - 35 + 'px',
                    });
                    oThis.oBottomDivBox.css({
                        'width': params.width - 35 + 'px',
                    });
                    if (params.hasNoClearBtn) {
                        oYBtn.css({
                            'margin-right': params.width / 10 + 'px',
                            'left': (params.width * 9 / 10 - 35 - 160) / 2 + 'px'
                        });
                        oNBtn.css({
                            'margin-right': params.width / 10 + 'px',
                            'left': (params.width * 9 / 10 - 35 - 160) / 2 + 'px'
                        });
                    } else {
                        oYBtn.css({
                            'margin-right': params.width / 10 + 'px',
                            'left': (params.width * 4 / 5 - 35 - 240) / 2 + 'px'
                        });
                        oCBtn.css({
                            'margin-right': params.width / 10 + 'px',
                            'left': (params.width * 4 / 5 - 35 - 240) / 2 + 'px'
                        });
                        oNBtn.css({
                            'margin-right': params.width / 10 + 'px',
                            'left': (params.width * 4 / 5 - 35 - 240) / 2 + 'px'
                        });
                    }

                    oThis.ozTreeBox.css({
                        'width': params.width - 35 + 'px',
                    });
                }
                if (params.height) {
                    if (params.height > 950) {
                        params.height = 950;
                    }
                    if (params.height < 300) {
                        params.height = 300;
                    }
                    oThis.ozTreeBox.css({
                        'height': params.height - 140 + 'px'
                    });
                    oThis.oWin.height(params.height);
                }
                /*   oThis.oTitle.width(oThis.oWin.width() - 35);*/
                if (params.title) {
                    oThis.oCloseBtn.css({
                        'top': '22px',
                        'right': '20px',
                        'width': '25px',
                    });
                    oThis.oTitle.text(params.title).show();
                }

                /* 通过传入参数控制框架布局 结束 */

                /* 蒙版及弹出框页面层次设置 开始*/
                oThis.oMask = null;
                if (params.maskRander) {
                    oThis.oMask = $.loadMask({randerTo: params.maskRander});
                }
                if (params.parentDoc) {
                    if (!params.maskRander) {
                        oThis.oMask = $.loadMask({randerTo: $('body', params.parentDoc)});
                    }
                    $('body', params.parentDoc).append(oThis.oWin);
                } else if ($('body', parent.document).get()) {
                    if (!params.maskRander) {
                        oThis.oMask = $.loadMask();
                    }
                    $('body', parent.document).append(oThis.oWin);
                } else {
                    if (!params.maskRander) {
                        oThis.oMask = $.loadMask();
                    }
                    $('body').append(oThis.oWin);
                }

                oThis.oMask.show();
                oThis.oWin.css('display', 'none');

                /* 蒙版及弹出框页面层次设置 结束*/

                /**
                 * ztree详细处理过程
                 */

                /*  节点属性规范  开始*/
                if (params.topTreeNode) {
                    var oThisTopNode = params.topTreeNode;
                    var oThisArr = [];

                    oThisTopNode.isParent = true;
                    oThisTopNode.isLeaf = false;
                    if (!oThisTopNode.icon) {
                        oThisTopNode.icon = _urlCommon + "resources/popzTree/img/org.gif";
                    }
                    oThisArr.push(oThisTopNode);
                    _topTreeNode = oThisArr;
                } else {
                    _topTreeNode = [{
                        id: '0',
                        name: '请传入根节点topTreeNode:{}',
                        isParent: false,
                        isLeaf: false,
                        parentId: '',
                        type: 'TOP',
                        icon: _urlCommon + "resources/popzTree/img/org.gif"
                    }];
                }

                /*  节点属性规范    结束*/

                /* zTree 异步加载  配置   开始  */
                tree = {
                    _zTree: '',
                    _thisNode: '',
                    setting: {
                        async: {
                            enable: true,
                            dataType: params.dataType != undefined ? params.dataType : "text",
                            contentType: params.contentType != undefined ? params.contentType : "application/x-www-form-urlencoded", //application/json  (满足.net)
                            autoParam: params.autoParam != undefined ? params.autoParam : [],
                            ohterParam: params.ohterParam != undefined ? params.ohterParam : [],
                            dataFilter: ajaxDataFilter,
                            type: params.type != undefined ? params.type : "post",
                            url: params.url != undefined ? params.url : ""
                        },
                        data: {
                            keep: {
                                leaf: false,
                                parent: false
                            },
                            key: {
                                name: params.name != undefined ? params.name : "name",
                                title: params.backInfo != undefined ? params.backInfo : "",
                                url: "url"
                            }
                        },
                        check: {
                            autoCheckTrigger: false,
                            chkboxType: params.chkboxType != undefined ? params.chkboxType : {"Y": "s", "N": "s"}, //ps
                            chkStyle: params.chkStyle != undefined ? params.chkStyle : "checkbox",
                            nocheckInherit: false,
                            enable: params.checkbox != undefined ? params.checkbox : false
                        },
                        view: {
                            addDivDom: null,
                            addHoverDom: null,
                            autoCancleSelected: true,
                            dblClickExpand: false,
                            fontCss: {},
                            nameIsHTML: false,
                            removeHoverDom: null,
                            selectedMulti: true,
                            showIcon: true,
                            showLine: true,
                            showTitle: true,
                            txtSelectedEnable: false
                        },
                        callback: {
                            onClick: singleClick,
                            onDblClick: dblClick,
                            /*		beforeCollapse:beforeCollapse,
                             beforeExpand:beforeExpand,*/
                            onRightClick: rightClick,
                            onCheck: chooseCheck,
                            onAsyncSuccess: zTreeAsyncSuccess
                        }
                    }
                };


                /**
                 * 异步加载返回函数预处理
                 * @treeId    树对象唯一标志
                 * @parentNode    被点击异步加载的父节点对象
                 * @responseData  返回的数据
                 */
                function ajaxDataFilter(treeId, parentNode, responseData) {
                    if (responseData) {
                        if (params.ajaxDataFilter) {
                            params.ajaxDataFilter(responseData);
                        }
                    }
                    return responseData;
                }


                /* zTree 异步加载  配置   结束  */

                function chooseCheck(event, treeId, treeNode) {
                    if (params.chooseCheck) {
                        params.chooseCheck(treeNode, oThis);
                    }
                }

                /*  callback回调函数 测试    开始 */
                function rightClick(event, treeId, treeNode) {
                    if (treeNode && params.rightClick) {
                        params.rightClick(treeNode, tree.zTree, oThis, event);
                    }
                }

                function singleClick(event, treeId, treeNode) {
                    if (params.click) {
                        params.click(treeNode, oThis);
                    }
                    if (params.singleClickExpand == false) {

                    } else if (treeNode.isParent && tree.zTree.expandNode) {
                        setTimeout(function () {
                            if (!dblFlage) {
                                tree.zTree.expandNode(treeNode);
                            }
                        }, 200);
                        dblFlage = false;
                    }
                }

                //var dblFlage = false;
                function dblClick(event, treeId, treeNode) {
                    dblFlage = true;
                    if (params.dblClick) {
                        params.dblClick(treeNode, oThis);
                    }
                }


                /*  callback回调函数 测试    结束 */


                /*  展开树 后处理  用于展开全部节点  开始 */
                function zTreeAsyncSuccess(event, treeId, treeNode, msg) {
                    if (params.expandFirst) {

                    } else if (params.expandAll) {
                        var nodes = treeNode.children;
                        expandNodes(nodes);
                        $('.zTreeDiv').find('a').tooltip();
                    }
                }

                function expandNodes(_thisNode) {
                    $.each(_thisNode, function (index, value) {
                        if (this.isParent && tree.zTree.expandNode) {
                            tree.zTree.expandNode(this, true, false);
                        }
                    });
                    $('.zTreeDiv').find('a').tooltip();
                }

                /*  展开树 后处理  用于展开全部节点     结束 */

            }

            /* 弹出窗 位置设置   开始  */
            oThis.oInterval = null;

            oThis.setPosition = function () {
                oThis.oInterval = setInterval(function () {
                    if (params.parentDoc) {
                        if (oThis.oWin.outerHeight() > $(params.parentWin).height()) {
                            oThis.oWin.css('top', ($('body', params.parentDoc).height() - oThis.oWin.outerHeight()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('top', $(params.parentWin).height() / 2 + $(params.parentDoc).scrollTop() - oThis.oWin.outerHeight() / 2 + 'px');
                        }

                        if (oThis.oWin.outerWidth() > $(params.parentWin).width()) {
                            oThis.oWin.css('left', ($('body', params.parentDoc).width() - oThis.oWin.outerWidth()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('left', $(params.parentWin).width() / 2 + $(params.parentDoc).scrollLeft() - oThis.oWin.outerWidth() / 2 + 'px');
                        }
                    } else if ($('body', parent.document).get()) {
                        if (params.height > $(parent.window).height()) {
                            oThis.oWin.css('top', ($('body', parent.document).height() - oThis.oWin.outerHeight()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('top', $(parent.window).height() / 2 + $(parent.document).scrollTop() - oThis.oWin.outerHeight() / 2 + 'px');
                        }

                        if (params.width > $(parent.window).width()) {
                            oThis.oWin.css('left', ($('body', parent.document).width() - oThis.oWin.outerWidth()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('left', $(parent.window).width() / 2 + $(parent.document).scrollLeft() - oThis.oWin.outerWidth() / 2 + 'px');
                        }
                    } else {
                        if (oThis.oWin.outerHeight() > $(window).height()) {
                            oThis.oWin.css('top', ($(document.body).height() - oThis.oWin.outerHeight()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('top', $(window).height() / 2 + $(document).scrollTop() - oThis.oWin.outerWidth() / 2 + 'px');
                        }

                        if (oThis.oWin.outerWidth() > $(window).width()) {
                            oThis.oWin.css('left', ($(document.body).width() - oThis.oWin.outerWidth()) / 2 + 'px');
                        } else {
                            oThis.oWin.css('left', $(window).width() / 2 + $(document).scrollLeft() - oThis.oWin.outerHeight() / 2 + 'px');
                        }

                    }

                }, 4);
            };

            oThis.setPosition();

            /* 弹出窗 位置设置   结束 */


            /* 设置窗口拖拽功能   开始 */


            oThis.oWin.slideDown(function () {
                setTimeout(function () {
                    clearInterval(oThis.oInterval);
                    oThis.oInterval = null;
                    var drag = null;
                    if (params.drag) {
                        drag = params.drag;
                        if (drag.draggable && drag.draggable == true) {
                            if (drag.dragDirection) {
                                $.popWindowDrag(oThis.oWin, drag.dragDirection);
                            } else {
                                $.popWindowDrag(oThis.oWin, 'all');
                            }
                        }
                    }
                }, 1000);

            });


            /* 设置窗口拖拽功能   结束 */


            /*  zTree初始化  */

            oThis.reloadTree = function () {
                $.fn.zTree.init(oZTree, tree.setting, _topTreeNode);
                tree.zTree = $.fn.zTree.getZTreeObj("popzTree");
                if (params.load) {
                    params.load(tree.zTree);
                }
                if (params.expandFirst || params.expandAll) {
                    tree.zTree.expandNode(tree.zTree.getNodes()[0], true, false);
                }
            };

            oThis.reloadTree();

            /*  zTree初始化  */


            /*  弹出窗口关闭事件  开始*/

            oThis.closeWindow = function () {
                oThis.oWin.slideUp(function () {
                    clearInterval(oThis.oInterval);
                    oThis.oInterval = null;
                    this.remove();
                });
                oThis.setPosition();
                oThis.oMask.hide();
                if (params.callBack) {
                    params.callBack.call(this);
                }

            };

            oThis.oCloseBtn.on('click', function () {
                oThis.closeWindow();
            });

            /*  弹出窗口关闭事件  结束*/


            /*   三个按钮           */
            oYBtn.on('click', function () {
                if (params.confirm) {
                    if (params.checkbox == true) {
                        params.confirm(tree.zTree.getCheckedNodes(true));
                    } else {
                        params.confirm(tree.zTree.getSelectedNodes());
                    }
                }
                tree.zTree.destroy();
                oThis.closeWindow();
            });
            oCBtn.on('click', function () {
                if (params.clear) {
                    params.clear();
                }
                tree.zTree.destroy();
                oThis.closeWindow();
            });
            oNBtn.on('click', function () {
                if (params.cancel) {
                    params.cancel();
                }
                tree.zTree.destroy();
                oThis.closeWindow();
            });

            /*   三个按钮           */
            if (params.hasNoClearBtn) {
                oCBtn.remove();
            }

            return oThis;
        },

    });
    $.fn.extend({

        /*************************************************************************************
         *Title: idxSection
         *Description: 页面中内容容器 article
         *params: width:宽度（可选，没有默认值） ,height:高度（可选，默认48%）,column:简化设置宽度（可选1:1794px,2:885px,3:584px,4:432px,指定该值不需要指定width）
         *params: end:是否为一行中的最后一个，如果是最后一个则必选，取消该控件默认的右边距--不需要了
         *params：titleClick：给该模块添加一个更多按钮，并定义其点击事件，titleParam：点击事件传参 ，clicked：设置该按钮默认触发一次
         *params：noPadding:设置该模块没有默认的内边距
         *author: 孙韶辰
         *date: 2016/11/3
         **************************************************************************************/
        'idxSection': function (params) {
            this._index = this.html();
            //      var _this = this;
            this.html('');
            this.addClass('pub_idxsection');

            if (params.width) {
                this.outerWidth(params.width);
                if (params.width == '432px') {
                    this.removeClass('pub_idxsection').addClass('pub_idxsection_4');
                }
            }
            var aWidths = ['1794px', '890px', '588px'];
            if (params.column) {
                this.outerWidth(aWidths[params.column - 1]);
                if (params.column == 4) {
                    this.removeClass('pub_idxsection').addClass('pub_idxsection_4');
                }
            }
            if (params.height) {
                this.height(params.height);
            }

            this.append('<h2 class="pub_idxTitle" style=" max-width: 190px;">' + this.attr('title') + '</h2>');
            if (this.find('.pub_idxTitle').width() == 190) {
                this.find('.pub_idxTitle').tooltip({title: this.attr('title')});
            }
            this.attr('title', '');

            if (params.titleClick) {
                this.append('<div class="pub_idxmore"></div> ');
                this.find('.pub_idxTitle').addClass('pub_idxTitle_click');
                this.find('.pub_idxTitle, .pub_idxmore').on('click', function () {
                    params.titleClick(params.titleParam);
                });
            }

            this.append('<div class="pub_content" >');
            this.find('.pub_content').html(this._index);
            this.find('.pub_content').outerHeight(this.height() - 75);
            if (params.clicked) {
                this.find('.pub_idxmore').trigger('click');
            }
            if (params.noPadding) {
                this.find('.pub_content').css('margin', '45px 0 0 0');
                this.find('.pub_content').outerHeight(this.height() - 45);
                this.find('.pub_content').outerWidth(this.width());
            }
        },

        /*************************************************************************************
         *Title: selHead
         *Description: 页面中查询框          默认的overflow为hidden
         *params: width:宽度 ,height:高度
         *author: 孙韶辰
         *date: 2016/11/9
         **************************************************************************************/
        'selHead': function (params) {
            this.addClass('pub_selHead');
            if (params.height) {
                this.height(params.height);
            }
            if (params.width) {
                this.width(params.width);
            }
            if (params.hasWrap) {
                this._index = this.html();
                this.html('');
                this.append('<div class="wrapFloor" >');
                this.find(".wrapFloor").first().html(this._index);
                this.find(".wrapFloor").first().css({
                    'margin': "15px 15px",
                    'width': this.width() - 30,
                    'height': this.height() - 30
                });
            }
        },

        /*************************************************************************************
         *Title: idxButton
         *Description: 按钮，包括tab页格式和单纯按钮格式,
         *        注意：定义button时需要指定按钮的name来找到tab页按钮的兄弟按钮
         *params: width:宽度 ,height:高度 ，type：'unTab',按钮的格式为普通按钮，不是tab页按钮格式
         *params：click:按钮的点击事件， clicked：设置该按钮默认触发其点击事件
         *author: 孙韶辰
         *date: 2016/11/3
         **************************************************************************************/
        'idxButton': function (params) {
            this.addClass('pub_tabBtn');

            this.oIdxDiv = $('<div class="put_babBtnIdx" style="width:100%;height:100%;display:flex;align-items: center;justify-content:center;">' + this.html() + '</div>');
            this.html('');
            this.append(this.oIdxDiv);

            if (!this.attr('type')) {
                this.attr('type', 'button'); //将默认button格式改为button
            }
            if (params.width) {
                this.css('width', params.width);
            }
            if (params.height) {
                this.css('height', params.height);
                //this.css('line-height', params.height);
            }

            if (params.type == 'unTab') {
                this.removeClass('pub_tabBtn').addClass('common_Btn');
            }

            if (params.click) {
                if (params.type == 'unTab') {
                    this.on('click', function () {
                        params.click(this);
                    });
                } else {
                    this.on('click', function () {
                        $('body').find('button[name=' + $(this).attr('name') + ']').removeClass('pub_tabBtnSel'); //找到该按钮的所有兄弟按钮并去掉选中样式
                        $(this).addClass('pub_tabBtnSel');
                        params.click($(this));
                    });
                }

            }

            if (params.clicked) {
                this.trigger('click');
            }
        },

        /*************************************************************************************
         *Title: idxSubTitle
         *Description: 小标题
         *params: width:宽度 ，type：'unTab',按钮的格式为普通按钮，不是tab页按钮格式
         *params: click:定义其点击事件，并添加更多按钮。
         *params: tabBtns:添加tab按钮 （json数组，obj格式：title：按钮标题，width:按钮宽度，params:点击事件传参，clicked:默认触发其点击事件，click：点击事件方法）
         *author: 孙韶辰
         *date: 2016/11/3
         **************************************************************************************/
        'idxSubTitle': function (params) {
            var _this = this;
            _this._index = this.html();

            this.addClass('pub_titlebg');
            this.html('');
            this.append('<h3 class="pub_title">' + _this._index + '</h3>');
            if (params) {
                if (params.width) {
                    this.css('width', params.width);
                }
                if (params.click) {
                    this.append('<div class="pub_titlemore" ></div>');
                    this.find('.pub_title').css('cursor', 'pointer');
                    this.find('.pub_title, .pub_titlemore').on('click', function () {
                        params.click(params.clickParam);
                    });
                }
                if (params.tabBtns) {
                    var aBtns = params.tabBtns.reverse();
                    _this.on('click', '.pub_tabBtnIntitle', function () {
                        $(this).addClass('pub_tabBtnIntitleSel').siblings().removeClass('pub_tabBtnIntitleSel');
                        aBtns[$(this).attr('index')].click(aBtns[$(this).attr('index')].params);
                    });
                    $.each(aBtns, function (index, value) {
                        var oBtn = $('<div class="pub_tabBtnIntitle" >' + value.title + '</div>');
                        _this.append(oBtn);
                        oBtn.attr('index', index);
                        if (value.clicked) {
                            oBtn.trigger('click');
                        }
                        if (value.width) {
                            oBtn.width(value.width);
                        }
                    });
                }
            }

        },

        /*************************************************************************************
         *Title: idxVSubTitle
         *Description: 竖向小标题
         *params: width:宽度 ，type：'unTab',按钮的格式为普通按钮，不是tab页按钮格式
         *params: click:定义其点击事件，并添加更多按钮。
         *params: tabBtns:添加tab按钮 （json数组，obj格式：title：按钮标题，width:按钮宽度，params:点击事件传参，clicked:默认触发其点击事件，click：点击事件方法）
         *author: 孙韶辰
         *date: 2016/12/1
         **************************************************************************************/
        'idxVSubTitle': function (params) {
            var _this = this;

            this.addClass('pub_vtitlebg');
            if (params) {
                if (params.height) {
                    _this.height(params.height);
                }
            }

        },

        /*************************************************************************************
         *Title: textField
         *Description: 文本框
         *params:width:宽度，height：高度 ，readOnly：只读 ，disabled。   gstsxx：提示信息  ，initValue：初始值   ，name：name ，
         *method:setValue(str):设置值，return 该控件.getValue():获取值
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'textField': function (params) {
            var _this = this;
            _this.oInput = $('<input type="text" class="common_innerbox">');
            if (params.type) {
                _this.oInput.attr('type', params.type);
            }
            if (params.width) {
                _this.oInput.width(params.width);
            } else {
                _this.oInput.width("100%");
            }
            if (params.height) {
                _this.oInput.height(params.height);
            } else {
                _this.oInput.height("100%");
            }
            if (params.readOnly) {
                _this.oInput.attr('readOnly', true);
            }
            if (params.disabled) {
                _this.oInput.attr('disabled', true);
            }
            if (params.gstsxx) {
                _this.oInput.attr('placeholder', params.gstsxx);
            }
            if (params.initValue) {
                _this.oInput.val(params.initValue);
            }
            if (params.name) {
                _this.oInput.attr('name', params.name);
            }
            _this.oInput.on({
                'focus': function () {
                    if (_this.oInput.val() == _this.defaultValue) {
                        _this.oInput.css('color', '#E8E9EA');
                        _this.oInput.val('');
                    }
                },
                'blur': function () {
                }
            });
            _this.append(_this.oInput);
            _this.setValue = function (value) {
                $(this).find('input').val(value);
                return _this;
            };
            _this.getValue = function () {
                return $(this).find('input').val();
            };
            _this.width(_this.oInput.outerWidth());
            _this.height(_this.oInput.outerHeight());
            return _this;
        },

        /*************************************************************************************
         *Title: fileInput
         *Description: 文件框
         *params:width:宽度，height：高度 ，readOnly：只读 ，disabled。   gstsxx：提示信息  ，initValue：初始值   ，name：name ，
         *method:setValue(str):设置值，return 该控件.getValue():获取值
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'fileInput': function (params) {
            var _this = this;

            _this.clear = function () {
                _this.children().remove();
                _this.init.call();
            };

            _this.init = function () {
                _this.olabel = $('<label class="common_fileLabel"></label>');
                _this.oInput = $('<input type="file" class="common_fileInput">');
                _this.oContent = $('<span class="common_fileContent"></span>');
                _this.oBtn = $('<div class="common_fileBtn" style="float:left">浏览</span>');
                _this.oText = $('<input type="text" readOnly="true" class="common_fileText"></span>');
                _this.append(_this.olabel);
                _this.olabel.append(_this.oInput).append(_this.oContent);
                _this.oContent.append(_this.oText).append(_this.oBtn);

                _this.find('.common_fileBtn').idxButton({ //按钮的type为submit
                    type: 'unTab',
                    width: 60,
                });

                if (params.gstsxx) {
                    _this.oText.attr('placeholder', params.gstsxx);

                }

                if (params.accept) {
                    _this.oInput.attr('accept', params.accept);
                }

                if (params.btnText) {
                    _this.oBtn.find('.put_babBtnIdx').text(params.btnText);
                }

                if (params.width) {
                    _this.oText.outerWidth(params.width);
                } else {
                    _this.oText.outerWidth("100%");
                }

                if (params.btnWidth) {
                    _this.oBtn.outerWidth(params.btnWidth);
                }

                if (params.height) {
                    _this.oText.outerHeight(params.height);
                    _this.oBtn.outerHeight(params.height);
                } else {
                    _this.oText.outerHeight("100%");
                    _this.oBtn.outerHeight("100%");
                }

                if (params.readOnly) {
                    _this.oInput.attr('readOnly', true);
                }
                if (params.disabled) {
                    _this.oInput.attr('disabled', true);
                }

                if (params.initValue) {
                    _this.olabel.val(params.initValue);
                }

                if (params.name) {
                    _this.oInput.attr('name', params.name);
                }
                _this.oInput.on({
                    'change': function () {
                        var index = $(this).val().lastIndexOf("\\");
                        var sFileName = $(this).val().substr((index + 1));
                        _this.oText.val(sFileName);
                        _this.find('.common_fileText').focus();
                        if (sFileName) {
                            _this.oText.tooltip({title: sFileName});
                        } else {
                            _this.oText.tooltip({title: '请选择文件'});
                        }

                    },

                });

                _this.oText.tooltip({title: '请选择文件'});

                _this.width(_this.oText.outerWidth() + _this.oBtn.outerWidth() + 10);
                _this.find('.common_fileContent').width(_this.oText.outerWidth() + _this.oBtn.outerWidth() + 20);
                _this.height(_this.oText.outerHeight());
            };
            _this.init.call();
            _this.getValue = function () {
                return $(this).find('input').val();
            };
            return _this;
        },

        /*************************************************************************************
         *Title: textArea
         *Description: 文本域
         *params:width:宽度，height：高度 ，readOnly：只读 ，disabled。   gstsxx：提示信息  ，initValue：初始值   ，name：name ，
         *method:setValue(str):设置值，return 该控件.getValue():获取值
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'textArea': function (params) {
            var _this = this;
            _this.oInput = $('<textarea  class="common_innertextarea">');

            if (params.width) {
                _this.oInput.width(params.width);
            } else {
                _this.oInput.width("100%");
            }

            if (params.height) {
                _this.oInput.height(params.height);
            } else {
                _this.oInput.height("100%");
            }

            if (params.gstsxx) {
                _this.oInput.attr('placeholder', params.gstsxx);
            }
            if (params.readOnly) {
                _this.oInput.attr('readOnly', true);
            }
            if (params.disabled) {
                _this.oInput.attr('disabled', true);
            }

            if (params.name) {
                _this.oInput.attr('name', params.name);
            }
            if (params.resize) {
                _this.oInput.css("resize", params.resize);
            }

            _this.oInput.on({
                'focus': function () {
                    if (_this.oInput.val() == _this.defaultValue) {
                        _this.oInput.css('color', '#E8E9EA');
                        _this.oInput.val('');
                    }
                },
                'blur': function () {
                }
            });
            if (params.disabled) {
                _this.oInput.attr('disabled', true);
                return _this;
            }
            _this.append(_this.oInput);
            _this.setValue = function (value) {
                $(this).find('textarea').val(value);
                return _this;
            };
            _this.getValue = function () {
                return $(this).find('textarea').val();
            };
            _this.width(_this.oInput.outerWidth());
            _this.height(_this.oInput.outerHeight());
            return _this;

        },

        /*************************************************************************************
         *Title: multiSelect
         *Description: 多选模糊查询
         *params:width:宽度，height：高度 ，readOnly：只读 ，disabled。   gstsxx：提示信息  ，initValue：初始值   ，name：name ，
         *params:maxHeight :下拉列表的最高高度，   data：下拉框的值    hasAll：默认添加一个全部的下拉项
         *params:handler:下拉选中的回掉   initValue：默认选中的下拉项，从1开始
         *method:setData(data):设置下项的data值  setValue(str)：设置选中value    getValue():获取value值  setName(str)：设置选中name     getName():选中name
         *method:clear():移除选中     setSelectIndex(index):设置选中第几个，从1开始
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'multiSelect': function (params) {
            var _this = this;
            _this.params = params;
            _this.oInput = $('<input type="search" class="common_inputHide" autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ></input>');
            _this.oContainer = $('<div class="common_multiSearch" style="position:relative;"></div>');
            _this.oXlContent = null;
            _this.oXlUl = null;
            _this.aData = [];
            _this.bInInput = false;
            _this.bInContainer = false;
            _this.aSelData = [];
            _this.oHidden = $('<input type="hidden" name="' + _this.params.name + '"></input>');

            _this.append(_this.oContainer);
            _this.oContainer.append(_this.oInput).append(_this.oHidden);

            if (_this.params.width) {
                // _this.oInput.outerWidth(_this.params.width);
                _this.oContainer.outerWidth(_this.params.width);
            } else {
                _this.oInput.width("100%");
                _this.oContainer.width("100%");
            }

            $('body').on('click', function () {
                if (!_this.bInInput && !_this.bInContainer) {
                    if (_this.oXlContent) {
                        _this.oXlContent.remove();
                        _this.oXlContent = null;
                        _this.oContainer.removeClass('common_focus');
                    }
                }
            });

            _this.oContainer.hover(function () {
                _this.bInInput = true;
            }, function () {
                _this.bInInput = false;
            });

            _this.oContainer.on('click', function () {
                _this.setList.call();
                _this.oInput.focus();
            });

            _this.oInput.on({
                input: function () {
                    _this.setList.call();
                    _this.oInput.width(_this.oInput.val().strWidth('16px "Microsoft YaHei"') + 10);
                }
            });
            _this.backFlag = false;
            _this.backTimer = null;
            _this.hasValue = false;
            _this.beforeValue = '';
            _this.oInput.on({
                keydown: function (e) {
                    if (e.which == 8) {

                        _this.beforeValue = _this.oInput.val();
                        _this.hasValue = false;
                        _this.backFlag = false;
                        if (!_this.oInput.val()) {
                            _this.backTimer = setTimeout(function () {
                                // alert(_thisoContainer.find('.common_multiItem').length);
                                _this.backFlag = true;
                                if (_this.oContainer.find('.common_multiItem').length > 0) {
                                    _this.oContainer.find('.common_multiItem').remove();
                                    _this.aSelData = [];
                                    _this.setListPos();
                                    _this.setList.call();
                                    _this.oHidden.val(JSON.stringify(_this.aSelData));
                                }
                            }, 500);
                        } else {
                            _this.hasValue = true;
                        }
                    }
                },
                keyup: function (e) {
                    if (e.which == 8) {
                        if (!_this.hasValue && !_this.backFlag) {
                            clearTimeout(_this.backTimer);
                            if (_this.oContainer.find('.common_multiItem').length > 0) {
                                _this.oContainer.find('.common_multiItem:last').remove();
                                _this.aSelData.splice(_this.aSelData.length - 1, 1);
                                _this.setListPos();
                                _this.setList.call();
                                // console.log(_this.aSelData);
                                _this.oHidden.val(_this.aSelData);
                            }
                        }
                    }
                }
            });

            _this.setListPos = function () {
                _this.oXlContent.outerWidth(_this.oContainer.outerWidth()); //设置下拉框的宽度与输入框相同
                _this.oXlUl.outerWidth(_this.oXlContent.width()); //设置下拉框的宽度与输入框相同
                if (_this.oContainer.outerHeight() + 1 + _this.oContainer.offset().top + _this.oXlContent.outerHeight() < $(window).height()) { //下拉列表的位置。查出window的可视范围则在输入框上方添加，否则在下方添加
                    _this.oXlContent.css({
                        'top': _this.oContainer.outerHeight() + 1 + _this.oContainer.offset().top + 'px',
                        'left': _this.oContainer.offset().left
                    });
                } else {
                    _this.oXlContent.css({
                        'top': _this.oContainer.offset().top - _this.oXlContent.outerHeight() - 1 + 'px',
                        'left': _this.oContainer.offset().left,
                        'border-top': '1px solid #3F8AB9',
                        'border-bottom': 'none',
                    });
                }
            }

            //选中元素的关闭按钮
            _this.oContainer.on('click', '.fa-close', function () {
                // alert(_this.oContainer.find('.common_multiItem').index($(this).parent()));
                _this.aSelData.splice(_this.oContainer.find('.common_multiItem').index($(this).parent()), 1);
                //console.log(_this.aSelData);
                _this.oHidden.val(JSON.stringify(_this.aSelData));
                $(this).parent().remove();
            });

            _this.setValue = function (datas) {
                $.each(datas, function (index, value) {
                    _this.oInput.before('<div class="common_multiItem" renderid="' + value[_this.params.renderId] + '"><span style="margin-right: 5px;">' + value[_this.params.selRender] + '</span><span class="fa fa-close"></span></div>');
                });
                _this.oHidden.val(JSON.stringify(datas));
            };

            _this.getValue = function () {
                return _this.oHidden.val();
            };
            /**
             * 加载下拉列表
             * **/
            _this.setList = function () {
                _this.oContainer.addClass('common_focus');
                _this.oInput.focus();
                if (_this.oXlContent) {
                    _this.oXlContent.remove();
                    _this.oXlContent = null;
                }
                _this.oInput.focus();
                _this.oXlContent = $('<ul class="common_xlContent" style=""></ul>'); //重新添加下拉列表
                _this.oXlUl = $('<ul class="common_xlUl" ></ul>');
                _this.oXlContent.append(_this.oXlUl);
                _this.oXlContent.on('click', function () {
                    _this.oInput.focus();
                });
                _this.oXlContent.hover(function () {
                    _this.bInContainer = true;
                }, function () {
                    _this.bInContainer = false;
                });
                /**
                 * 下拉列表的点击事件
                 * **/
                _this.oXlContent.on('click', '.common_selectItem', function () {
                    if ($(this).hasClass('common_selectItemSel')) {
                        $(this).removeClass('common_selectItemSel');
                        _this.oContainer.find('.common_multiItem[renderId="' + $(this).attr('renderId') + '"]').remove();
                        _this.aSelData.splice(_this.aData[$(this).attr('index')], 1);
                    } else {
                        $(this).addClass('common_selectItemSel');
                        _this.oInput.before('<div class="common_multiItem" renderId="' + $(this).attr('renderId') + '" ><span style="margin-right: 5px;">' + $(this).find('span[render=' + _this.params.selRender + ']').text() + '</span><span class="fa fa-close"></span></div>');
                        _this.aSelData.push(_this.aData[$(this).attr('index')]);
                    }
                    if (_this.oContainer.find('.common_multiItem').get(0)) {
                        _this.oInput.width(_this.oInput.val().strWidth('16px "Microsoft YaHei"') + 10);
                    }
                    _this.oHidden.val(JSON.stringify(_this.aSelData));
                    //console.log(_this.aSelData);
                    _this.setListPos.call();

                });


                $('body').append(_this.oXlContent); //在body中添加下拉列表
                _this.setListPos.call();

                $.ajax({
                    type: 'post',
                    data: {data: _this.oInput.val()},
                    url: _this.params.url,
                    dataType: 'json',
                    error: function () {
                        $.alert('获取数据失败');
                    },
                    success: function (response) {
                        _this.aData = response;
                        $.each(response, function (index, value) { //添加下拉选项
                            var oLi = $('<li class="common_selectItem" index="' + index + '" renderId="' + value[_this.params.renderId] + '"></li>'); //添加下拉选项并设置其value和name
                            $.each(_this.oContainer.find('.common_multiItem'), function (itemIndex, itemValue) {
                                //console.log($(itemValue).attr('renderId')+'         '+oLi.attr('renderId'));
                                if ($(itemValue).attr('renderId') == oLi.attr('renderId')) {
                                    oLi.addClass('common_selectItemSel');
                                    return true;
                                }
                            });
                            _this.oXlUl.append(oLi);
                            $.each(_this.params.renderIndex, function (renderIndex, renderValue) {
                                oLi.append('<span render="' + renderValue + '">' + value[renderValue] + '</span>');
                            });
                            if (_this.oXlContent.find('.common_selectItem').length * 25 > _this.params.maxHeight) {
                                _this.oXlContent.height(_this.params.maxHeight);
                                if (_this.params.maxHeight) {
                                    _this.oXlContent.height(_this.params.maxHeight);
                                    _this.oXlUl.height(_this.params.maxHeight);
                                }
                                _this.oXlContent.find('.common_selectItem').outerWidth(_this.oXlContent.outerWidth() - 16);
                            } else {
                                _this.oXlContent.height(_this.oXlContent.find('.common_selectItem').length * 25);
                                _this.oXlContent.find('.common_selectItem').outerWidth(_this.oXlContent.outerWidth() - 2);
                            }

                            $.each(_this.oXlUl.find('li'), function (index, value) { //添加下拉选项
                                if ($(this).text().strWidth($(this).css('font-size') + ' ' + $(this).css('font-family')) > $(this).width()) {
//                                    $(this).tooltip({
//                                        title: $(this).text(),
//                                        zIndex: 1000
//                                    });
                                }
                            });


                        });
                    },
                    complete: function () {
                    }
                });
            }

            return _this;
        },

        /*************************************************************************************
         *Title: comboBox
         *Description: 下拉框   ，可以模糊查询
         *params:width:宽度，height：高度 ，readOnly：只读 ，disabled。   gstsxx：提示信息  ，initValue：初始值   ，name：name ，
         *params:maxHeight :下拉列表的最高高度，   data：下拉框的值    hasAll：默认添加一个全部的下拉项
         *params:handler:下拉选中的回掉   initValue：默认选中的下拉项，从1开始
         *method:setData(data):设置下项的data值  setValue(str)：设置选中value    getValue():获取value值  setName(str)：设置选中name     getName():选中name
         *method:clear():移除选中     setSelectIndex(index):设置选中第几个，从1开始
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'comboBox': function (params) {
            var _this = this;
            _this.oContainer = $('<div style="position:relative;"></div>');
            _this.oInput = $('<input type="text" name="" class="common_innerComobo"/>');
            _this.oBtn = $('<div class="fa fa-caret-down common_comboBtn"><div>');
            _this.oXlContent = null;
            _this.oXlUl = null;
            //      var oComTimeOut = null;

            _this.append(_this.oContainer);
            _this.oContainer.append(_this.oInput);
            _this.oContainer.append(_this.oBtn);


            if (params.width) {
                _this.oInput.outerWidth(params.width);
                _this.oContainer.outerWidth(params.width);
            } else {
                _this.oInput.width("100%");
                _this.oContainer.width("100%");
            }

            if (params.height) {
                _this.oInput.outerHeight(params.height);
                _this.oBtn.outerHeight(params.height);

            } else {
                _this.oInput.outerHeight("100%");
                _this.oBtn.outerHeight("100%");
            }
            if (params.disabled) {
                _this.oInput.attr('disabled', true);
            }
            if (params.readOnly) {
                _this.oInput.attr('readOnly', true);
                _this.oInput.css('cursor', 'pointer');
            }
            //      var iXlHeight = 0;
            if (params.gstsxx) {
                _this.oInput.attr('placeholder', params.gstsxx);
            } else {
            }
            if (params.name) {
                _this.oInput.attr('name', params.name);
            }

            this.find('input,.common_comboBtn').on('click', function (e) {
                if (_this.oInput.attr('disabled')) {
                    return;
                }
                if (_this.oXlContent) {
                    _this.oXlContent.remove();
                    _this.oXlContent = null;
                }
                _this.oInput.focus();
                _this.oXlContent = $('<ul class="common_xlContent" style="display:none"></ul>'); //重新添加下拉列表
                _this.oXlUl = $('<ul class="common_xlUl" ></ul>');
                _this.oXlContent.append(_this.oXlUl);
                $('body').append(_this.oXlContent); //在body中添加下拉列表

                if (params.data) {


                    $.each(params.data, function (index, value) { //添加下拉选项
                        var oLi = $('<li class="common_selectItem">' + value[0] + '</li>'); //添加下拉选项并设置其value和name
                        _this.oXlUl.append(oLi);
                        oLi.attr('liValue', value[1]);
                        oLi.attr('liName', value[0]);
                    });
                    if (params.hasAll) {
                        var oLi = $('<li liValue="" liName="全部"  class="common_selectItem">全部</li>');
                        _this.oXlUl.prepend(oLi);
                    }

                } else {
                    if (params.hasAll) {
                        var oLi = $('<li liValue="" liName="全部"  class="common_selectItem">全部</li>');
                        _this.oXlUl.prepend(oLi);
                    }
                }
                // alert(_this.oXlContent.outerHeight());
                _this.oXlContent.outerWidth(_this.oInput.outerWidth()); //设置下拉框的宽度与输入框相同
                _this.oXlUl.outerWidth(_this.oXlContent.width()); //设置下拉框的宽度与输入框相同
                if (_this.oXlContent.find('.common_selectItem').length * 25 > params.maxHeight) {
                    _this.oXlContent.height(params.maxHeight);
                    if (params.maxHeight) {
                        _this.oXlContent.height(params.maxHeight);
                        _this.oXlUl.height(params.maxHeight);
                    }
                    _this.oXlContent.find('.common_selectItem').outerWidth(_this.oXlContent.outerWidth() - 16);
                } else {
                    _this.oXlContent.height(_this.oXlContent.find('.common_selectItem').length * 25);
                    _this.oXlContent.find('.common_selectItem').outerWidth(_this.oXlContent.outerWidth() - 2);
                }

                $.each(_this.oXlUl.find('li'), function (index, value) { //添加下拉选项
                    if ($(this).text().strWidth($(this).css('font-size') + ' ' + $(this).css('font-family')) > $(this).width()) {
//                        $(this).tooltip({
//                            title: $(this).text(),
//                            zIndex: 1000
//                        });
                    }
                });

                if (_this.oInput.outerHeight() + 1 + _this.oInput.offset().top + _this.oXlContent.outerHeight() < $(window).height()) { //下拉列表的位置。查出window的可视范围则在输入框上方添加，否则在下方添加
                    _this.oXlContent.css({
                        'top': _this.oInput.outerHeight() + 1 + _this.oInput.offset().top + 'px',
                        'left': _this.oInput.offset().left
                    });
                } else {
                    _this.oXlContent.css({
                        'top': _this.oInput.offset().top - _this.oXlContent.outerHeight() - 1 + 'px',
                        'left': _this.oInput.offset().left,
                        'border-top': '1px solid #3F8AB9',
                        'border-bottom': 'none',
                    });
                }


                _this.oXlContent.hover(function () { //鼠标在下拉框范围内时设置isXl为true则输入框失去焦点时也不会移除下拉框
                    isXl = true;
                }, function () {
                    _this.oInput.focus(); //鼠标移除下拉框范围时设置输入框重新获得焦点
                    isXl = false;
                });

                _this.oXlContent.on('mouseover', 'li', function () { //下拉框中列表项添加响应事件
                    $(this).addClass('selected');
                }).on('mouseout', 'li', function () {
                    $(this).removeClass('selected');
                }).on('click', 'li', function (e) {
                    _this.oInput.val($(this).attr('liName'));
                    _this.oInput.attr('inputName', $(this).attr('liName'));
                    _this.oInput.attr('inputValue', $(this).attr('liValue'));
                    _this.oXlContent.fadeOut();

                    if (params.handler) {
                        params.handler();
                    }
                    e.stopPropagation();
                });

                _this.oXlContent.fadeIn();

                e.stopPropagation();
            });
            var isXl = false;

            _this.oInput.on({
                'blur': function () { //输入框失去焦点时，如果鼠标不在下拉框范围内则收起下拉框
                    if (!isXl) {
                        if (_this.oXlContent) {
                            _this.oXlContent.fadeOut(function () {
                                _this.oXlContent.remove();
                                _this.oXlContent = null;
                            });
                        }
                    }
                },
                'input': function () { //输入框在输入内容时，实现模糊查询
                    _this.oXlUl.children().remove();
                    var aResult = [];
                    $.each(params.data, function (index, value) { //循环数据，将含有输入框中内容的数据项加入新的数组中
                        if (value[0].indexOf(_this.oInput.val()) >= 0) {
                            aResult.push(value);
                        }
                    });
                    aResult.sort(function (a, b) { //数组排序，将最符合的选项添加到最前面
                        return a[0].indexOf(_this.oInput.val()) - b[0].indexOf(_this.oInput.val());
                    });
                    $.each(aResult, function (index, value) { //封装下拉列表
                        var oLi = $('<li class="common_selectItem">' + value[0] + '</li>');
                        _this.oXlUl.append(oLi);
                        oLi.attr('liValue', value[1]);
                        oLi.attr('liName', value[0]);
                    });
                    if (params.hasAll) {
                        var oLi = $('<li liValue="" liName="全部"  class="common_selectItem">全部</li>');
                        _this.oXlUl.prepend(oLi);
                    }
                    if (_this.oXlContent.find('.common_selectItem').length * 25 > params.maxHeight) {
                        _this.oXlContent.height(params.maxHeight);
                        if (params.maxHeight) {
                            _this.oXlContent.height(params.maxHeight);
                            _this.oXlUl.height(params.maxHeight);
                        }
                        _this.oXlContent.find('.common_selectItem').outerWidth(_this.oXlContent.outerWidth() - 16);
                    } else {
                        _this.oXlContent.height(_this.oXlContent.find('.common_selectItem').length * 25);
                        _this.oXlContent.find('.common_selectItem').outerWidth(_this.oXlContent.outerWidth() - 2);
                    }

                    $.each(_this.oXlUl.find('li'), function (index, value) { //添加下拉选项
                        if ($(this).text().strWidth() > $(this).width()) {
                            $(this).tooltip({
                                title: $(this).text(),
                                zIndex: 1000
                            });
                        }
                    });
                }
            });

            _this.setSelectIndex = function (index) {
                if (params.data) {
                    if (index <= params.data.length) {
                        _this.oInput.val((params.data[index - 1])[0]);
                        _this.oInput.attr('inputName', (params.data[index - 1])[0]);
                        _this.oInput.attr('inputValue', (params.data[index - 1])[1]);
                    }
                } else {
                    _this.oInput.val('全部');
                    _this.oInput.attr('inputName', '全部');
                    _this.oInput.attr('inputValue', '');
                }
            };

            _this.setData = function (data) {
                params.data = data;
                return _this;
            };

            _this.setValue = function (valueData) {
                var bHasValue = false;
                $.each(params.data, function (index, value) {
                    if (value[1] == valueData) {
                        _this.oInput.val(value[0]);
                        _this.oInput.attr('inputName', value[0]);
                        _this.oInput.attr('inputValue', value[1]);
                        bHasValue = true;
                    }
                });

                if (!bHasValue) {
                    _this.oInput.val(valueData);
                    _this.oInput.attr('inputName', valueData);
                    _this.oInput.attr('inputValue', valueData);
                }
                return _this;
            };

            _this.setName = function (name) {
                var bHasName = false;
                $.each(params.data, function (index, value) {
                    if (value[0] == name) {
                        _this.oInput.val(value[0]);
                        _this.oInput.attr('inputName', value[0]);
                        _this.oInput.attr('inputValue', value[1]);
                        bHasValue = true;
                    }
                });

                if (!bHasName) {
                    _this.oInput.val(name);
                    _this.oInput.attr('inputName', name);
                    _this.oInput.attr('inputValue', name);
                }
                return _this;
            };

            if (params.initValue) {
                if (params.data) {
                    if (params.initValue <= params.data.length) {
                        _this.oInput.val((params.data[params.initValue - 1])[0]);
                        _this.oInput.attr('inputName', (params.data[params.initValue - 1])[0]);
                        _this.oInput.attr('inputValue', (params.data[params.initValue - 1])[1]);
                    }
                } else {
                    _this.oInput.val('全部');
                    _this.oInput.attr('inputName', '全部');
                    _this.oInput.attr('inputValue', '');
                }

            }

            _this.getValue = function () {
                return $(this).find('input').attr('inputValue')?$(this).find('input').attr('inputValue'):'';
            };
            _this.getName = function () {
                return $(this).find('input').attr('inputName');
            };

            _this.clear = function () {
                _this.oInput.val('');
                _this.oInput.removeAttr('inputvalue');
                _this.oInput.removeAttr('inputName');
                return _this;
            };
            _this.width(_this.oInput.outerWidth());
            _this.height(_this.oInput.outerHeight());

            $('body').on('scroll', function () {
                console.log(_this.oXlContent);
                if (_this.oXlContent) {
                    _this.oXlContent.remove();
                    _this.oXlContent = null;
                    return;
                }
            });
            return _this;
        },

        /*************************************************************************************
         *Title: datePicker
         *Description:日期选择框
         *params:width:宽度，height：高度 ，readOnly：只读   ，initValue：初始值   ，name：name ，
         *params: dateFmt:日期format格式， onsearch(str)：选中日期后的响应事件
         *method:setValue(str):设置值，return 该控件.getValue():获取值
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'datePicker': function (params) {
            var _this = this;
            _this.oInput = $('<input type="text"  class="Wdate">');
            _this.oContainer = $('<div></div>');
            _this.oInput.width("100%");
            _this.oContainer.width("100%");
            _this.oInput.height("100%");
            _this.oContainer.height("100%");
            this.append(_this.oContainer);
            _this.oContainer.append(_this.oInput);
            _this.dateFmt = 'yyyy-MM-dd';
            if (params.readOnly) {
                _this.oInput.attr('readOnly', params.readOnly);
                _this.oInput.removeClass('Wdate');
                _this.oInput.addClass('common_innerbox');
            }
            if (params.dateFmt) {
                _this.dateFmt = params.dateFmt;
            }

            if (params.width) {
                _this.oInput.outerWidth(params.width);
                _this.oContainer.outerWidth(params.width);
            }

            if (params.height) {
                _this.oInput.outerHeight(params.height);
                _this.oContainer.outerHeight(params.height);
            }

            if (params.gstsxx) {
                _this.oInput.attr('placeholder', params.gstsxx);
            }

            _this.sOldVal = '';
            if (params.initValue) {
                _this.oInput.val(params.initValue);
                _this.sOldVal = params.initValue;
            }

            if (params.name) {
                _this.oInput.attr('name', params.name);
            }

            _this.oInput.on({
                'focus': function () {
                    if (_this.oInput.attr('readonly')) {
                        return;
                    }
                    WdatePicker({
                        startDate: '%y-%M-%d',
                        dateFmt: _this.dateFmt,
                        alwaysUseStartDate: true
                    });

                    if ((_this.oInput.val() || _this.oInput.val() == '') && _this.sOldVal != _this.oInput.val()) {
                        if (params.onsearch) {
                            params.onsearch(_this.oInput.val());
                        }
                        _this.sOldVal = _this.oInput.val();
                    }
                },
                'click': function () {
                    $(this).blur();
                    $(this).focus();
                }
            });

            _this.getValue = function () {
                return _this.oInput.val();
                return _this;
            };

            _this.setValue = function (value) {
                _this.oInput.val(value);
            };
            _this.width(_this.oInput.outerWidth());
            _this.height(_this.oInput.outerHeight());
            return _this;
        },

        /*************************************************************************************
         *Title: checkBox
         *Description: 多选框
         *params:width:宽度，height：高度 ，readOnly：只读   ，initValue：初始值   ，name：name ， click：按钮剑姬事件，this为input的jQuery对象
         *method:  setValue(str)：设置value    getValue():获取value值  setName(str)：输入框中的值name     getName():获取输入框的值
         *author: 孙韶辰
         *date: 2016/11/21
         **************************************************************************************/
        'searchBox': function searchBox(params) {
            var _this = this;
            _this.oContainer = $('<div style="position:relative;"></div>');
            _this.oInput = $('<input type="text" class="common_SearchBox"> ');
            _this.oBtn = $('<div class="common_boxBtn fa fa-search"><div>');
            _this.oInput.attr('inputName', '');
            _this.oInput.attr('inputvalue', '');

            _this.append(_this.oContainer);
            _this.oContainer.append(_this.oInput);
            _this.oContainer.append(_this.oBtn);

            if (params.type) {
                _this.oInput.attr('type', params.type);
            }

            if (params.width) {
                _this.oInput.outerWidth(params.width);
                _this.oContainer.outerWidth(params.width);
            } else {
                _this.oInput.width("100%");
                _this.oContainer.width("100%");
            }

            if (params.height) {
                _this.oInput.outerHeight(params.height);
                _this.oBtn.outerHeight(params.height);

            } else {
                _this.oInput.outerHeight("100%");
                _this.oBtn.outerHeight("100%");
            }

            if (params.readOnly) {
                _this.oInput.attr('readOnly', true);
                //              _this.oInput.css('cursor', 'pointer');
            }

            if (params.disabled) {
                _this.oInput.attr('disabled', true);
            }

            if (params.gstsxx) {
                _this.oInput.attr('placeholder', params.gstsxx);
            }

            if (params.initValue) {
                _this.oInput.val(params.initValue);
            }

            if (params.name) {
                _this.oInput.attr('name', params.name);
            }

            if (params.click) {
                _this.find('.common_boxBtn,.common_SearchBox').on('click', function () {
                    if (_this.oInput.attr('disabled') != 'disabled') {
                        params.click.call(_this.oInput);
                    }
                });
            }

            _this.setValue = function (valueData) {
                _this.oInput.attr('inputValue', valueData);
                return _this;
            };

            _this.setName = function (name) {
                _this.oInput.val(name);
                _this.oInput.attr('inputName', name);
                return _this;
            };

            _this.clear = function () {
                _this.oInput.val('');
                _this.oInput.attr('inputName', '');
                _this.oInput.attr('inputvalue', '');
                return _this;
            };

            _this.getValue = function () {
                return $(this).find('input').attr('inputValue');
            };
            _this.getName = function () {
                return $(this).find('input').attr('inputName');
            };
            _this.width(_this.oInput.outerWidth());
            _this.height(_this.oInput.outerHeight());
            return _this;

        },

        /*************************************************************************************
         *Title: radio
         *Description: 单选框
         *author: 张震
         *date: 2016/11/7
         **************************************************************************************/
        'radio': function Radio(params) {
            var _this = this;
            this.value = params.value;
            this.name = params.value;
            this.attr('radio_value', params.value);
            this.attr('radio_name', params.name);

            //外层div
            _this.odiv = $('<div></div>');
            //为div设置宽高
            if (params.width) {
                _this.odiv.width(params.width);
            } else {
                _this.odiv.width("100%");
            }
            if (params.height) {
                _this.odiv.height(params.height);
            } else {
                _this.odiv.height("100%");
            }
            //小圆点
            _this.oimg = $('<div class="demo_radio" name=' + params.name + '></div>');

            _this.olabel = $('<div class="common_radiolabel">' + params.label + '</div>');
            _this.odiv.append(_this.oimg);
            _this.odiv.append(_this.olabel);
            this.append(_this.odiv);
            if (params.checked) {
                _this.oimg.addClass('common_radiochecked');
            } else {
                _this.oimg.addClass('common_radiouncheck');
            }
            _this.oimg.on('click', function () {
                if (params.hander) {
                    params.hander.call(this, params.value);
                }
                //        _this.setChecked(true);
                $.each($('.demo_radio'), function () {
                    // console.log(this);
                    if ($(this).attr('name') == params.name) {
                        setChecked(this, false);
                    }
                });
                setChecked(_this.oimg, true);
            });

            function setChecked(t, f) {
                if (!f) {
                    $(t).removeClass('common_radiochecked').addClass('common_radiouncheck');
                } else {
                    $(t).removeClass('common_radiouncheck').addClass('common_radiochecked');
                }
            };
            if (params.postion && !params.postion == 'x') {
                $(_this).css('float', '');
            } else {
                $(_this).css('float', 'left');
            }

            function t() {
                alert(1212);
            }

            _this.setValue = function (v) {
                _this.value = v;
                return _this;
            };
            _this.getValue = function () {
                return _this.value;
            };
            _this.setName = function (v) {
                _this.name = v;
                return _this;
            };
            _this.getName = function () {

                return _this.name;
            };
            _this.setChecked = function (v) {
                setChecked($(this).find('.demo_radio'), v);
                return _this;
            };
            return _this;
        },

        /*************************************************************************************
         *Title: checkBox
         *Description: 多选框
         *author: 张震
         *date: 2016/11/8
         **************************************************************************************/
        'checkBox': function CheckBox(params) {
            var _this = this;
            _this.s = $('<div class="checkBox-div" name="' + params.name + '" value="">');
            if (params.value) {
                _this.s.attr('value', params.value);
            }
            this.checked = params.checked;
//            _this.s.css({ 'position': 'absolute', 'top': '2px' });
            this.value = params.value;
            this.name = params.name;
            this.checked = params.checked;
            this.type = "checkbox";


            _this.background = $('<div></div>');
            _this.background.css('position', 'absolute').css('width', '20px').css('height', '15px');
            _this.gou = $('<div class="common-checkbox-uncheck"></div>');
            _this.gou.attr('name', params.name);
            if (params.checked) {
                _this.gou.attr('class', 'common-checkbox-check');
            }
            _this.label = $('<div class="common-checkbox-label"></div>');
            if (params.width) {
                _this.label.css('width', (params.width - 20) + 'px');
            }
            _this.label.html(params.label);

            _this.div = $('<div class="common-checkbox-div"></div>');
            if (params.float) {
                _this.div.css('float', params.float);
            }
            if (params.width) {
                _this.div.css('width', (params.width + 3) + 'px');
            }
            _this.div.append(_this.s);
            _this.div.append(_this.background);
            _this.div.append(_this.gou);
            _this.div.append(_this.label);
            this.append(_this.div);

            _this.div.on('click', function () {
                if (params.handler) {
                    params.handler.call(this, params.value);
                }
                if (_this.gou.attr('class') == 'common-checkbox-check') {
                    _this.gou.attr('class', 'common-checkbox-uncheck');
                    _this.s.attr('checked', false);
                    _this.checked = false;
                    //多选功能
                    if (_this.name == 'all') {
                        $.each($('.common-checkbox-check'), function () {
                            $(this).attr('class', 'common-checkbox-uncheck');
                        });
                    }
                } else {
                    _this.gou.attr('class', 'common-checkbox-check');
                    _this.s.attr('checked', true);
                    _this.checked = true;
                    if (_this.name == 'all') {
                        $.each($('.common-checkbox-uncheck'), function () {
                            $(this).attr('class', 'common-checkbox-check');
                        });
                    }
                }
            });

            _this.setValue = function (v) {
                _this.value = v;
                return _this;
            };
            _this.getValue = function () {
                return _this.value;
            };
            _this.setName = function (v) {
                _this.name = v;
                return _this;
            };
            _this.getName = function () {

                return _this.name;
            };
            _this.setChecked = function (v) {
                if (v) {
                    _this.gou.attr('class', 'common-checkbox-check');
                } else {
                    _this.gou.attr('class', 'common-checkbox-uncheck');
                }
                return _this;
            };
            return _this;

        },


        /*************************************************************************************
         *Title: grid
         *Description:表格 分为分页和不分页两种
         *不分页: params:  minSize:如果数据量不足以占满定义的高度，希望显示的tr的个数  url:表格获取数据的url，   data：访问url的参数  baseForm:同tbar的baseFrom，表单查询按钮点击时默认刷新该表格数据
         *分页:  params:   tabr/bbar 表格顶部/底部的分页工具
         *共同: params:
         *        width:宽度，如果不需要横向滚动条时不要指定该参数， height：高度，不需要竖向滚动条时，不要指定该参数
         *             cm:表头    sm:'checkbox'：设置默认添加checkBox       isNotLoad：为true则默认表格不加载数据
         *             click:function(data) 行单击事件   clicked:true 默认选中第一行，并触发行点击事件
         *             dbclick:function(data) 行双击事件
         *             cellRander:数组，指定要添加点击事件的列的dataIndex  cellClick：jsonObj指定对应列的点击事件
         *               callback:function 数据刷新后的回调
         *             editAble:为true则表格为可编辑，编辑控件的设置有两种方式，一种在表头中定义，另一种由一下方法来实现
         *               beforEdit：点击行中的编辑按钮的响应事件，处理该行中的控件
         *               afterEdit：点击保存后的数据处理事件
         *               submitCallBack：编辑数据提交后的回调
         *method:getSelectData():获取选中的行的数据
         *       search(data)：不分页的表格刷新数据的方法之一，如果制定了baseForm属性。则不需要调用该方法
         *       getData()：获取表格中所有行的数据
         *       setParams(data):设置grid查询时的参数
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'grid': function (params) {
            var _this = this;
            _this.bNotLoad = false;
            _this.iTableWidth = 0; //表格宽度
            _this.aData = null; //表格的数据
            _this.aThs = []; //表头的数组
            _this.aSelectedRows = null; //选中的行
            _this.oTh = null;
            _this.oTr = null;
            _this.aThsAll = [];

            if (params.isNotLoad) {
                _this.bNotLoad = true;
            }

            // console.time('grid');
            _this.append('<div class="common_grid_div" ></div>'); //表格容器
            _this.find('.common_grid_div').append('<div class="common_table"><table class="common_grid_table">' + //加载数据的表格
            '<thead ><tr></tr></thead>' +
            '<tbody></tbody>' +
            '<tfoot></tfoot>' +
            '</table></div>');
            _this.find('.common_grid_div').append('<div class="common_head" style="position:absolute;top: 0;"><table style="position:absolute; top:0" class="common_grid_table"><thead ></thead></table></div>'); //表头，当滚动滚动条时，该表头始终不动

            if (params.baseForm) { //如果传入表单。则把表格本身传入表单。表单查询时，自动调用表格的search方法。并把表单的参数传进去
                //console.log("params.baseForm is:" + params.baseForm);
                params.baseForm.setGrid(this);
            }

            if (params.sm) {
                if (params.sm == 'checkbox') {
                    _this.find('.common_grid_table thead tr').append('<th ><div style="width:25px; text-align:center;padding:0" ><input type="checkbox"></div></th>'); //表头中添加个全选的checkbox
                    _this.iTableWidth += 28; //表格宽度增加28            
                }
            }
            if (params.tag) {
                if (params.tag == 'rkmark') {//表头

                    $('<span style="display:inline-block;height:20px;width:3px;background-color:transparent;position:absolute;left: 4px;top: 16px;"></span>').appendTo(_this.find('.common_grid_table thead tr th')); //表头中添加个全选的checkbox
                    // _this.iTableWidth += 28; //表格宽度增加28

                }
            }

            if (params.editAble) {
                _this.find('.common_grid_table thead tr').append('<th ><div  style="width:60px; text-align:center;"></div></th>'); //如果表格可编辑，则添加个编辑按钮的行
                _this.iTableWidth += 63; //表格宽度增加63
            }

            if (params.cm) { //处理表头
            	
                console.log('===============================cm--init2=======================')
                $.each(params.cm, function (index, value) {
                    _this.oTh = null;
                    _this.oTh = $('<th><div class="common_thDiv"  style="width:' + value.width + 'px; text-align:center;" >' + value.header + '</div></th>');
                    _this.oTh.attr(value); //将定义表头的obj传入对应的th中
                    _this.oTh.attr('thIndex', index);
                    if (value.renderer) { //如果表头有自定义renderer方法。则设置renderer参数为ture
                        _this.oTh.attr('renderer', true);
                    }
                    _this.aThs.push(_this.oTh);
                    _this.aThsAll.push(_this.oTh);
                    if (value.parentName) { //如果表头有父节点
                        // console.log("3425   value.parentName is:" + value.parentName);
                        if (_this.find('.common_grid_table thead tr').length <= 1) { //如果只有一个tr则新增一个tr
                            // console.log("3425   value.parentName is=============insert row" );
                            _this.find('.common_grid_table thead tr:first').after('<tr></tr>');
                        }
                        if (!_this.find('.common_grid_table th[pName ="' + value.parentName + '"]').get(0)) { //如果父节点不存在，则在第一个tr添加该父节点，在第二个tr中添加自己
                            // console.log("3425   value.parentName is=============如果父节点不存在" );
                            _this.find('.common_grid_table thead tr:first').append('<th class="grid_parent" colspan="1" pName="' + value.parentName + '">' + value.parentName + '</th>');
                            _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                        } else { //如果父节点存在，则设置其父节点的colspa1n+1
                            //console.log("3425   value.parentName is=============colspan" );
                            _this.find('.common_grid_table th[pName = "' + value.parentName + '"]').attr('colspan', parseInt(_this.find('th[pName = ' + value.parentName + ']').attr('colspan')) + 1);
                            _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                        }
                    } else { //如果没有父节点直接在第一个tr中加入自己
                        //console.log("3425   value.parentName is=============no parent" );
                        _this.find('.common_grid_table thead tr:first').append(_this.oTh);
                    }

                    if (value.remoteSort) {
                        _this.oTh.addClass('common_sortHead').attr({
                            remoteSort: value.remoteSort,
                            sortValue: 'none',
                        });
                    }
                    _this.iTableWidth += parseInt(value.width) + 3; //表格的宽度增加该节点的宽度+3
                    _this.find('.common_grid_table thead tr:first th:not(.grid_parent)').attr('rowspan', 2); //设置没有父节点的th的rowspan为2
                });
            }
            //      var iCellRenderCount = 0;
            _this.getNoLoad = function () {
                // alert(_this.bNotLoad);
                return _this.bNotLoad;
            };
            //
            _this.refreshData = function (response, oSearchParams,_url) { //刷新表格数据的方法
            	//TODO 勾叉
            	
            	
                console.log('nancy----------->>>>>>>>>>>>>>>>>>>>refresh  3537  line');
                _this.find('.common_table th[thindex]').remove();//将额外的表头移除
                _this.find('.common_grid_table th[pName]').remove();//将额外的表头移除
                _this.find('.common_grid_table th[pName]').remove();//将额外的表头移除
                _this.find('.common_table tbody tr').remove(); //将所有的tr移除
                var customHeight=0;
                var isCustomed = false;
                if (oSearchParams) {
                    //console.log('-----------------common.js-----3416--:'+oSearchParams);
                    $.each(oSearchParams, function (name, value) {
                        if (name == 'custom') {
                            isCustomed = value;
                            console.log('-----------------common.js-----3419--:' + value);
                        }else if(name=='height'){
                        	
                        	customHeight=value;
                        	
                        	
                        }
                    });
                }
                
                if(customHeight!=0){
                	
                	params.height=customHeight;
                	
                }

                //TODO  add for 投资计划--->start
                var years = new Array();//
                var jhpcyears=new Array();
                var cm_extra = new Array();
                var projects = new Array();
                var zhjhMark=false;
                if (response.root) {
                    _this.aData = response.root;
                    console.log(_this.aData)
                    for (var i = 0; i < response.root.length; i++) { //table tr num
                        if (response.root[i].tzjh) {
                            for (var j = 0; j < response.root[i].tzjh.length; j++) {// tr  tzjh.length
                                if (!years.contains(response.root[i].tzjh[j].jhnd)) {
                                    years.push(response.root[i].tzjh[j].jhnd);
                                }
                                if(response.root[i].tzjh[j].cwys){
                                	zhjhMark=true;	
                                }
                            }
                        }
                        
                        if (response.root[i].jhpc) {
                            for (var j = 0; j < response.root[i].jhpc.length; j++) {// tr  tzjh.length
                                if (!jhpcyears.contains(response.root[i].jhpc[j].jhnd)) {
                                	jhpcyears.push(response.root[i].jhpc[j].jhnd);
                                }
                                
                            }
                        }
                      
                        if (response.root[i].xmList) {


                            $.each(response.root[i].xmList, function (index, value) {
                                if (!projects.contains(value.fxmbm)) {
                                    projects.push(value.fxmbm);
                                    cm_extra.push({
                                        "header": "施工设计需求总数",
                                        "dataIndex": "sgtxqsl",
                                        "width": "180",
                                        "align": "center",
                                        "parentName": value.fxmmc,
                                        "mark": "extra"
                                    });
                                    cm_extra.push({
                                        "header": "SAP需求总数",
                                        "dataIndex": "sapxqzs",
                                        "width": "150",
                                        "align": "center",
                                        "parentName": value.fxmmc,
                                        "mark": "extra"
                                    });
                                    cm_extra.push({
                                        "header": "提货总数",
                                        "dataIndex": "thzs",
                                        "width": "150",
                                        "align": "center",
                                        "parentName": value.fxmmc,
                                        "mark": "extra"
                                    });
                                    cm_extra.push({
                                        "header": "未提货总数",
                                        "dataIndex": "wthzs",
                                        "width": "150",
                                        "align": "center",
                                        "parentName": value.fxmmc,
                                        "mark": "extra"
                                    });
                                }
                            });

                        }
                        
                        if (response.root[i].zxmList) {


                            $.each(response.root[i].zxmList, function (index, value) {
                                if (!projects.contains(value.xmbm)) {
                                    projects.push(value.xmbm);
                                    cm_extra.push({
                                        "header": "施工设计需求总数",
                                        "dataIndex": "sgtxqsl",
                                        "width": "180",
                                        "align": "center",
                                        "parentName": value.xmmc,
                                        "mark": "extra"
                                    });
                                    cm_extra.push({
                                        "header": "SAP需求总数",
                                        "dataIndex": "sapxqzs",
                                        "width": "150",
                                        "align": "center",
                                        "parentName": value.xmmc,
                                        "mark": "extra"
                                    });
                                    cm_extra.push({
                                        "header": "提货总数",
                                        "dataIndex": "thzs",
                                        "width": "150",
                                        "align": "center",
                                        "parentName": value.xmmc,
                                        "mark": "extra"
                                    });
                                    cm_extra.push({
                                        "header": "未提货总数",
                                        "dataIndex": "wthzs",
                                        "width": "150",
                                        "align": "center",
                                        "parentName": value.xmmc,
                                        "mark": "extra"
                                    });
                                }
                            });

                        }


                    }
                }
                console.log(years);
                _this.gridData = _this.aData;

                //TODO 计划投资表头修改----->>START
                
                var year = new Date().getFullYear();
                if (jhpcyears.length > 0) {
                	
                	for (var i = 0; i < jhpcyears.length; i++) {
                		if(jhpcyears[i]<=year){
                        cm_extra.push({
                            "header": jhpcyears[i] + "年度下达批次",
                            "dataIndex": "jhpcmc",
                            "width": "200",
                            "align": "center",
                            "year": jhpcyears[i],
                            "mark": "extra"
                        });
                        //if(zhjhMark){
	                        cm_extra.push({
	                            "header": jhpcyears[i] + "年度下达文号",
	                            "dataIndex": "xdwh",
	                            "width": "200",
	                            "align": "center",
	                            "year": jhpcyears[i],
	                            "mark": "extra"
	                        });
                        }

                    }
                	
                	
                	
                }
                if (years.length > 0) { //投资计划年度list
                    for (var i = 0; i < years.length; i++) {
                        cm_extra.push({
                            "header": years[i] + "年度投资资金(万)",
                            "dataIndex": "jhtz",
                            "width": "200",
                            "align": "center",
                            "year": years[i],
                            "mark": "extra"
                        });
                        if(zhjhMark){
	                        cm_extra.push({
	                            "header": years[i] + "年度财务预算(万)",
	                            "dataIndex": "cwys",
	                            "width": "200",
	                            "align": "center",
	                            "year": years[i],
	                            "mark": "extra"
	                        });
                        }

                    }
                }
                console.log('cm_extra is:' + JSON.stringify(cm_extra));

                if (!isCustomed) {
                    var Index = [];
                    $.each(_this.aThs, function (index, value) {

                        if ($(value).attr("mark")) {
                            console.log($(value));
                            if ($(value).attr("mark") == "extra") {
                                Index.unshift(index);
                            }
                        }
                    })
                    $.each(Index, function (i, v) {
                        _this.aThs.splice(v, 1);

                    })
                    var Index1 = [];
                    $.each(_this.aThsAll, function (index, value) {

                        if ($(value).attr("mark")) {
                            console.log($(value));
                            if ($(value).attr("mark") == "extra") {
                                Index1.unshift(index);
                            }
                        }
                    })

                    $.each(Index1, function (i, v) {
                        _this.aThsAll.splice(v, 1);

                    })
                    //console.log( _this.aThs);
                    $.each(_this.aThs, function (index, value) {
                        _this.oTh = null;
                        _this.oTh = $(value);
                        //_this.oTh.attr(value); //将定义表头的obj传入对应的th中
                        _this.oTh.attr('thIndex', index);
                        //console.log(value);
                        if (value.attr('parentname')) { //如果表头有父节点
                            //console.log("3547--------------value.parentName is:" + value.attr('parentname'));
                            if (_this.find('.common_grid_table thead tr').length <= 1) { //如果只有一个tr则新增一个tr
                                //console.log("3547--------------value.parentName is-----------------only 1 tr");
                                _this.find('.common_grid_table thead tr:first').after('<tr></tr>');
                            }
                            if (!_this.find('.common_grid_table th[pName = "' + value.attr('parentname') + '"]').get(0)) { //如果父节点不存在，则在第一个tr添加该父节点，在第二个tr中添加自己
                                //console.log("3547--------------v如果父节点不存在----------------only 1 tr");
                                _this.find('.common_grid_table thead tr:first').append('<th class="grid_parent" colspan="1" pName="' + value.attr('parentname') + '">' + value.attr('parentname') + '</th>');
                                _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                            } else { //如果父节点存在，则设置其父节点的colspa1n+1
                                //console.log("3547--------------v如果父节点存在----------------only 1 tr");
                                _this.find('.common_grid_table th[pName = "' + value.attr('parentname') + '"]').attr('colspan', parseInt(_this.find('th[pName = "' + value.attr('parentname') + '"]').attr('colspan')) + 1);
                                _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                            }
                        } else { //如果没有父节点直接在第一个tr中加入自己
                            _this.find('.common_grid_table thead tr:first').append(_this.oTh);
                        }
                        //_this.aThs.push(_this.oTh);
                        //_this.find('.common_grid_table thead tr:first').append(_this.oTh);
                        _this.iTableWidth += parseInt(value.width) + 3; //表格的宽度增加该节点的宽度+3
                        _this.find('.common_grid_table thead tr:first th:not(.grid_parent)').attr('rowspan', 2); //设置没有父节点的th的rowspan为2
                    });
                    $.each(cm_extra, function (index, value) {

                        _this.oTh = null;
                        _this.oTh = $('<th class="th_extra"><div class="common_thDiv"  style="width:' + value.width + 'px; text-align:center;" >' + value.header + '</div></th>');
                        _this.oTh.attr(value); //将定义表头的obj传入对应的th中
                        _this.oTh.attr('thIndex', _this.aThs.length);
                        if (!_this.aThs.contains(_this.oTh)) {
                            _this.aThs.push(_this.oTh);


                        if (value.parentName) { //如果表头有父节点
                            //console.log("value.parentName is:" + value.parentName);
                            if (_this.find('.common_grid_table thead tr').length <= 1) { //如果只有一个tr则新增一个tr
                                _this.find('.common_grid_table thead tr:first').after('<tr></tr>');
                            }
                            if (!_this.find('.common_grid_table th[pName ="' + value.parentName + '"]').get(0)) { //如果父节点不存在，则在第一个tr添加该父节点，在第二个tr中添加自己
//console.log('-------3590---line ----------!!!!!!if 果父节点不存在 ');
                                _this.find('.common_grid_table thead tr:first').append('<th class="grid_parent" colspan="1" pName="' + value.parentName + '">' + value.parentName + '</th>');
                                _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                            } else { //如果父节点存在，则设置其父节点的colspa1n+1
                                //console.log('-------3590---line ----------!!!!!!else  父节点存在 ');
                                _this.find('.common_grid_table th[pName = "' + value.parentName + '"]').attr('colspan', parseInt(_this.find('th[pName = "' + value.parentName + '"]').attr('colspan')) + 1);
                                _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                            }
                        } else { //如果没有父节点直接在第一个tr中加入自己
                            _this.find('.common_grid_table thead tr:first').append(_this.oTh);
                        }
                        //_this.find('.common_grid_table thead tr:first').append(_this.oTh);
                        _this.iTableWidth += parseInt(value.width) + 3; //表格的宽度增加该节点的宽度+3
                        _this.find('.common_grid_table thead tr:first th:not(.grid_parent)').attr('rowspan', 2); //设置没有父节点的th的rowspan为2
                        }
                        if (!_this.aThsAll.contains(_this.oTh)) {
                            _this.aThsAll.push(_this.oTh);
                        }
                    });


                } else {
                    //console.log("---------------------------------------else   custom----------");
                    //console.log(_this.aThs);
                    $.each(_this.aThs, function (index, value) {
                        _this.oTh = null;
                        //console.log("---------------------------------------else   custom-----value----->>>>>"+value);
                        _this.oTh = $(value);
                        //_this.oTh.attr(value); //将定义表头的obj传入对应的th中
                        _this.oTh.attr('thIndex', index);
                        if (value.parentName) { //如果表头有父节点
                            // console.log("value.parentName is:" + value.parentName);
                            if (_this.find('.common_grid_table thead tr').length <= 1) { //如果只有一个tr则新增一个tr
                                _this.find('.common_grid_table thead tr:first').after('<tr></tr>');
                            }
                            if (!_this.find('.common_grid_table th[pName = "' + value.parentName + '"]').get(0)) { //如果父节点不存在，则在第一个tr添加该父节点，在第二个tr中添加自己

                                _this.find('.common_grid_table thead tr:first').append('<th class="grid_parent" colspan="1" pName="' + value.parentName + '">' + value.parentName + '</th>');
                                _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                            } else { //如果父节点存在，则设置其父节点的colspa1n+1
                                _this.find('.common_grid_table th[pName = "' + value.parentName + '"]').attr('colspan', parseInt(_this.find('th[pName ="' + value.parentName + '"]').attr('colspan')) + 1);
                                _this.find('.common_grid_table thead tr:eq(1)').append(_this.oTh);
                            }
                        } else { //如果没有父节点直接在第一个tr中加入自己
                            _this.find('.common_grid_table thead tr:first').append(_this.oTh);
                        }
                        //  _this.aThs.push(_this.oTh);
                        //_this.find('.common_grid_table thead tr:first').append(_this.oTh);
                        _this.iTableWidth += parseInt(value.width) + 3; //表格的宽度增加该节点的宽度+3
                        _this.find('.common_grid_table thead tr:first th:not(.grid_parent)').attr('rowspan', 2); //设置没有父节点的th的rowspan为2
                    });


                }
                // console.log(_this.aThs);
                //console.log("-------------log in common.js 3524 line");


                //TODO 计划投资表头修改 ------<<<<END


                _this.find('.common_head thead').html('').append(_this.find('.common_table table thead').html()); //设置固定表头的表的表头和实际表的表头相同
                _this.find('.common_head').outerWidth(_this.iTableWidth);
                _this.find('.common_table').outerWidth(_this.iTableWidth);
                _this.headHeight = _this.find('.common_head').position().top;

                _this.find('.common_grid_div').on('scroll', function () { //表格上下拖动时，表头表的位置始终保持不变
                    _this.find('.common_head').css('top', _this.find('.common_grid_div').scrollTop() + _this.headHeight);
                });
                // alert(_this.iTableWidth);
                _this.find('.common_grid_div').outerWidth(_this.iTableWidth + 16); //设置表格的宽度

                if (params.width) {
                    _this.find('.common_grid_div').outerWidth(params.width);
                }
                if (params.height) {
                    _this.find('.common_grid_div').outerHeight(params.height);
                }

                _this.setParams = function (data) {
                    _this.searchPara = data;
                };

                _this.find('.common_grid_div').on('click', '.common_sortHead', function () {
                    $(this).siblings().find('.common_sort').remove();

                    var ascBtn = $(this).find('.common_asc');
                    var descBtn = $(this).find('.common_desc');
                    var sortContent = $(this).find('.common_sort');

                    if (sortContent.get(0)) {
                        if (sortContent.find('.common_sortSelected').attr('type') == 'asc') {
                            ascBtn.removeClass('common_sortSelected');
                            descBtn.addClass('common_sortSelected');
                            if (_this.oBar) {
                                _this.oBar.search({sort: $(this).attr('remotesort'), dir: 'desc'});
                            } else {
                                _this.search({sort: $(this).attr('remotesort'), dir: 'desc'});
                            }
                        } else {
                            descBtn.removeClass('common_sortSelected');
                            ascBtn.addClass('common_sortSelected');
                            if (_this.oBar) {
                                _this.oBar.search({sort: $(this).attr('remotesort'), dir: 'asc'});
                            } else {
                                _this.search({sort: $(this).attr('remotesort'), dir: 'asc'});
                            }
                        }
                    } else {
                        sortContent = $('<div class="common_sort" style="overflow:auto;white-space:normal;"></div>');
                        $(this).find('div').append(sortContent);
                        sortContent.append('<i class="common_asc fa fa-caret-up common_sortSelected" type="asc"></i>').append('<i class="common_desc fa fa-caret-down" type="desc"></i>');
                        if (_this.oBar) {
                            _this.oBar.search({sort: $(this).attr('remotesort'), dir: 'asc'});
                        } else {
                            _this.search({sort: $(this).attr('remotesort'), dir: 'asc'});
                        }
                    }
                });

                for (var i = 0; i < response.root.length; i++) { //根据返回数据的多少，添加对应数量的tr
                    _this.oTr = $('<tr class="common_tr"></tr>');
                    _this.find('.common_table tbody').append(_this.oTr);
                    _this.oTr.attr({
                        // line_attr:response.root[i],
                        index: i
                    });
                }
                //        alert( _this.find('.common_table .common_grid_table').html());
                if (params.height) { //如果设置了表格的高度，则添加不足的tr
                    //          var iHeadHeight = _this.find('.common_head .common_grid_table').outerHeight();
                    var iTableHeight = _this.find('.common_table .common_grid_table').outerHeight();
                    //          alert(iTableHeight+'  '+params.height);
                    if (_this.oBar) {
                        if (_this.oBar.getLimit() > response.root.length) { //如果返回数据量不足tbar的limt的数量，补充
                            for (var i = 0; i < _this.oBar.getLimit() - response.root.length; i++) {
                                _this.oTr = $('<tr class="common_tr"></tr>');
                                _this.find('.common_table tbody').append(_this.oTr);
//                                $.each(_this.aThs, function () {
//                        		
//                                		_this.oTr.append('<td></td>');
//                                		
//                                	
//                                    
//                                });
                                for (var a = 0; a < _this.aThs.length; a++) {
                                    _this.oTr.append('<td></td>');
                                }
                                _this.oTr.attr({
                                    // line_attr:response.root[i],
                                    index: response.root.length + i,
                                });
                            }
                        }
                    } else if (params.minSize) {
                        if (params.minSize > response.root.length) { //如果返回数据量不足tbar的limt的数量，补充
                            for (var i = 0; i < params.minSize - response.root.length; i++) {
                                _this.oTr = $('<tr class="common_tr"></tr>');
                                _this.find('.common_table tbody').append(_this.oTr);
                                $.each(_this.aThs, function () {
                                    _this.oTr.append('<td></td>');
                                });
                                _this.oTr.attr({
                                    // line_attr:response.root[i],
                                    index: response.root.length + i,
                                });
                            }
                        }
                    } else {
                        if (params.height > iTableHeight) { //如果没有tbar则补充相应高度的tr
                            _this.iAddLength = parseInt((params.height - iTableHeight) / 35);
                            for (var i = 0; i < _this.iAddLength; i++) {
                                _this.oTr = $('<tr class="common_tr"></tr>');
                                _this.find('.common_table tbody').append(_this.oTr);
                                $.each(_this.aThs, function () {
                                    _this.oTr.append('<td></td>');
                                });
                                _this.oTr.attr({
                                    // line_attr:response.root[i],
                                    index: response.root.length + i,
                                });
                            }
                        }
                    }

                }

                if (params.editAble) { //如果表格可编辑，则默认在tr的最前面添加含有可编辑按钮的td
                    $.each(this.find('.common_grid_table tbody tr'), function (index, value) {
                        if (index < response.root.length) {
                            _this.find('.common_grid_table tbody tr').eq(index).prepend('<td ><div class="common_editContent"  style="width:60px;"><div title="编辑当前行" class="common_gridEdit common_editBtn"></div><div title="保存" class="common_gridSave common_editBtn"></div><div title="取消" class="common_gridCancle common_editBtn"></div></div></td>');
                        } else {
                            _this.find('.common_grid_table tbody tr').eq(index).prepend('<td ><div class="common_editContent"  style="width:60px;"></div></td>');
                        }
                    });
                    _this.find('.common_gridEdit').tooltip();
                    _this.find('.common_gridSave').tooltip();
                    _this.find('.common_gridCancle').tooltip();
                }

                if (params.sm) { //添加checkbox
                    if (params.sm == 'checkbox') {
                        $.each(this.find('.common_grid_table tbody tr'), function (index, value) {
                            if (index < response.root.length) {
                                _this.find('.common_table tbody tr').eq(index).prepend('<td class="checkBox_td" style="text-align:center;"><div style="position:absolute;width:24px;height:33px;z-index:1"></div><input class="common_head_checkbox" type="checkbox" ></td>');
                            } else {
                                _this.find('.common_grid_table tbody tr').eq(index).prepend('<td ><div class="common_editContent"  style="width:24px"></div></td>');
                            }
                        });
                    }
                }

                if (params.tag) {
                    if (params.tag == 'rkmark') {
                        $.each(this.find('.common_grid_table tbody tr'), function (index, value) {
                            if (index < response.root.length) {
                                _this.find('.common_table tbody tr td div').eq(index).prepend('<span style="display:inline-block;height:20px;width:3px;position:absolute;left: 1px;background-color: #1eeb28;border-radius: 3px;"></span>');
                                _this.find('.common_table tbody tr td input').eq(index).css('margin-left', '9px');
                            } else {
                                // _this.find('.common_grid_table tbody tr').eq(index).prepend('<td ><div class="common_editContent"  style="width:24px"></div></td>');
                            }
                        });
                        //$('<span style="display:inline-block;height:20px;width:3px;background-color:green;position:absolute;left: 4px;top: 16px;"></span>').appendTo(_this.find('.common_grid_table thead tr th div')); //表头中添加个全选的checkbox
                        //_this.iTableWidth += 28; //表格宽度增加28

                    }
                }

                _this.oTd = null;
                var tdimghcha='<img class="common_tdImg" src="../../resources/img/cha02.png"/>';
                var tdimghchaa=null;
                $.each(response.root, function (index, value) { //添加表格数据对应的td
                	
//                	 if($(thvalue).attr("dataindex") == 'fbdwlx'){
//                    	
//                    	
//                    	
//                    }
                	tdimghchaa=value.gcxmzt_qktj;
                    $.each(_this.aThs, function (thindex, thvalue) {
                        var tdValue = '';//表头对应列的值
                        //TODO:计划投资
                        var tdimggou='<img class="common_tdImg" src="../../resources/img/gou01.png"/>';
                        var tdimgcha='<img class="common_tdImg" src="../../resources/img/cha01.png"/>';
                       // var oldTdValue='';
                       // var tdimghcha='<img class="common_tdImg" src="../../resources/img/cha02.png"/>';
                       //TODO:nancy add for 项目分包单位评分--------数据展示 start 20180112
                         if($(thvalue).attr("dataindex") == 'fbdwlx'){
                        	
                        	 tdValue='<div style="border-bottom: 1px solid #336799;height:60px;padding: 15px 2px;">施工单位</div><div style="height:60px;padding: 15px 2px;">设计单位</div>';
                        }
                         else if($(thvalue).attr("dataindex") == 'fbdwmc'){
                         	
                         	
                         	tdValue='<div style="border-bottom: 1px solid #336799;height:30px;padding: 4px 2px;">'
                         		+value.sgfbdwmc+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                         		+value.sgfbdwmc2+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                         		+value.sjfbdwmc+'</div><div style="height:30px;padding: 4px 2px;">'
                         		+value.sjfbdwmc2+'</div>';
                         	
                         }
                         else if($(thvalue).attr("dataindex") == 'qqdf'){
                        	
                        	
                        	tdValue='<div style="border-bottom: 1px solid #336799;height:30px;padding: 4px 0px;">'
                        		+value.sgxmqqdf+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sgxmqqdf2+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sjxmqqdf+'</div><div style="height:30px;padding: 4px 2px;">'
                        		+value.sjxmqqdf2+'</div>';
                        	
                        }
                        else if($(thvalue).attr("dataindex") == 'zqdf'){
                        	
                        	
                        	tdValue='<div style="border-bottom: 1px solid #336799;height:30px;padding: 4px 0px;">'
                        		+value.sgxmzqdf+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sgxmzqdf2+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sjxmzqdf+'</div><div style="height:30px;padding: 4px 2px;">'
                        		+value.sjxmzqdf2+'</div>';
                        	
                        }
                        else if($(thvalue).attr("dataindex") == 'ysdf'){
                        	
                        	
                        	tdValue='<div style="border-bottom: 1px solid #336799;height:30px;padding: 4px 0px;">'
                        		+value.sgxmjgdf+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sgxmjgdf2+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sjxmjgdf+'</div><div style="height:30px;padding: 4px 2px;">'
                        		+value.sjxmjgdf2+'</div>';
                        	
                        }
                        
                        else if($(thvalue).attr("dataindex") == 'sj'){
                        	
                        	
                        	tdValue='<div style="border-bottom: 1px solid #336799;height:30px;padding: 4px 2px;">'
                        		+value.sgsj+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sgsj2+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sjsj+'</div><div style="height:30px;padding: 4px 2px;">'
                        		+value.sjsj2+'</div>';
                        	
                        }
                        else if($(thvalue).attr("dataindex") == 'zyczwt'){
                        	
                        	
                        	tdValue='<div style="border-bottom: 1px solid #336799;height:30px;padding: 4px 2px;">'
                        		+value.sgzyczwt+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sgzyczwt2+'</div><div style="height:30px;padding: 4px 2px;border-bottom: 1px solid #336799;">'
                        		+value.sjzyczwt+'</div><div style="height:30px;padding: 4px 2px;">'
                        		+value.sjzyczwt2+'</div>';
                        	
                        }
                       //TODO:nancy add for 项目分包单位评分--------数据展示 end 20180112
                        else if($(thvalue).attr('dataindex') == 'zhjh_sfwc'){
                        	 if(value.zhjh_sfwc=="0"){      
                        		
                        		 tdValue=tdimgcha;
                        	   }else{
                        		   tdValue=tdimggou;
                        	   }
                        } else  if($(thvalue).attr('dataindex') == 'zbjg_sfwc'){
                       	 if(value.zbjg_sfwc=="0"){                           		
                    		 tdValue=tdimgcha;
                    	   }else{
                    		   tdValue=tdimggou;
                    	   }
                        }else  if($(thvalue).attr('dataindex') == 'sgxmb_sfwc'){
                          	 if(value.sgxmb_sfwc=="0"){                           		
                        		 tdValue=tdimgcha;
                        	   }else{
                        		   tdValue=tdimggou;
                        	   }
                            }
                        else  if($(thvalue).attr('dataindex') == 'ht_sfwc'){
                         	 if(value.ht_sfwc=="0"){                           		
                       		 tdValue=tdimgcha;
                       	   }else{
                       		   tdValue=tdimggou;
                       	   }
                           }
                        else  if($(thvalue).attr('dataindex') == 'cs_sfwc'){
                        	 if(value.cs_sfwc=="0"){                           		
                      		 tdValue=tdimgcha;
                      	   }else{
                      		   tdValue=tdimggou;
                      	   }
                          }
                        else  if($(thvalue).attr('dataindex') == 'sgtz_sfwc'){
                       	 if(value.sgtz_sfwc=="0"){                           		
                     		 tdValue=tdimgcha;
                     	   }else{
                     		   tdValue=tdimggou;
                     	   }
                         }
                        else  if($(thvalue).attr('dataindex') == 'gs'){
                          	 if(value.gs=="0"){                           		
                        		 tdValue=tdimgcha;
                        	   }else{
                        		   tdValue=tdimggou;
                        	   }
                            }
                        else  if($(thvalue).attr('dataindex') == 'jlqq_sfwc'){
                          	 if(value.jlqq_sfwc=="0"){                           		
                        		 tdValue=tdimgcha;
                        	   }else{
                        		   tdValue=tdimggou;
                        	   }
                            }
                        else  if($(thvalue).attr('dataindex') == 'gckg_sfwc'){
                         	 if(value.gckg_sfwc=="0"){                           		
                       		 tdValue=tdimgcha;
                       	   }else{
                       		   tdValue=tdimggou;
                       	   }
                           }
                        else  if($(thvalue).attr('dataindex') == 'gcjh_sfwc'){
                        	 if(value.gcjh_sfwc=="0"){                           		
                      		 tdValue=tdimgcha;
                      	   }else{
                      		   tdValue=tdimggou;
                      	   }
                          }
                        else  if($(thvalue).attr('dataindex') == 'jl_sfwc'){
                       	 if(value.jl_sfwc=="0"){                           		
                     		 tdValue=tdimgcha;
                     	   }else{
                     		   tdValue=tdimggou;
                     	   }
                         }
                        else  if($(thvalue).attr('dataindex') == 'sg_sfwc'){
                          	 if(value.sg_sfwc=="0"){                           		
                        		 tdValue=tdimgcha;
                        	   }else{
                        		   tdValue=tdimggou;
                        	   }
                            }
                        else  if($(thvalue).attr('dataindex') == 'ys_sfwc'){
                         	 if(value.ys_sfwc=="0"){                           		
                       		 tdValue=tdimgcha;
                       	   }else{
                       		   tdValue=tdimggou;
                       	   }
                           }
                        else  if($(thvalue).attr('dataindex') == 'sfglcs'){
                        	 if(value.sfglcs=="0" || value.sfglcs==""){                           		
                      		 tdValue=tdimgcha;
                      	   }else{
                      		   tdValue=tdimggou;
                      	   }
                          }
                        else  if($(thvalue).attr('dataindex') == 'fjjljwz_sfwc'){
                        	 if(value.fjjljwz_sfwc=="0"){                           		
                      		 tdValue=tdimgcha;
                      	   }else{
                      		   tdValue=tdimggou;
                      	   }
                          }
                        else  if($(thvalue).attr('dataindex') == 'js_sfwc'){
                       	 if(value.js_sfwc=="0"){                           		
                     		 tdValue=tdimgcha;
                     	   }else{
                     		   tdValue=tdimggou;
                     	   }
                         }
                         
                        else if($(thvalue).attr('dataindex') == 'jhpcmc'){
                        	
                        	if (value.jhpc) {
                                $.each(value.jhpc, function (index, value) {
                                    if ($(thvalue).attr('year') == value.jhnd.toString()) {
                                        tdValue = value.jhpcmc;
                                    }
                                });
                            }
                        }
                        else if($(thvalue).attr('dataindex') == 'xdwh'){
                        	
                        	if (value.jhpc) {
                                $.each(value.jhpc, function (index, value) {
                                    if ($(thvalue).attr('year') == value.jhnd.toString()) {
                                        tdValue = value.xdwh;
                                    }
                                });
                            }
                        }
                        else if ($(thvalue).attr('dataindex') == 'jhtz') {//如果包含计划投资
                            if (value.tzjh) {
                                $.each(value.tzjh, function (index, value) {
                                    if ($(thvalue).attr('year') == value.jhnd.toString()) {
                                        tdValue = value.jhtz;
                                    }
                                });
                            }
                        } else if ($(thvalue).attr('dataindex') == 'cwys') {//如果包含财务预算
                            if (value.tzjh) {
                                $.each(value.tzjh, function (index, value) {
                                    if ($(thvalue).attr('year') == value.jhnd) {
                                        tdValue = value.cwys;
                                    }
                                });
                            }
                        } else if ($(thvalue).attr("dataindex") == 'thzs') {
                            if (value.xmList) {
                                $.each(value.xmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.fxmmc) {
                                        tdValue = v.thzs;
                                    }
                                })
                            }
                            else if (value.zxmList) {
                                $.each(value.zxmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.xmmc) {
                                        tdValue = v.thzs;
                                    }
                                })
                            }
                            
                        } else if ($(thvalue).attr("dataindex") == 'wthzs') {
                            if (value.xmList) {

                                $.each(value.xmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.fxmmc) {
                                        tdValue = v.wthzs;
                                    }
                                })
                            }else if (value.zxmList) {
                                $.each(value.zxmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.xmmc) {
                                        tdValue = v.wthzs;
                                    }
                                })
                            }
                        } else if ($(thvalue).attr("dataindex") == 'sapxqzs') {
                            if (value.xmList) {
                                $.each(value.xmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.fxmmc) {
                                        tdValue = v.sapxqzs;
                                    }
                                });
                            }else if (value.zxmList) {
                                $.each(value.zxmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.xmmc) {
                                        tdValue = v.sapxqzs;
                                    }
                                })
                            }
                        } else if ($(thvalue).attr("dataindex") == 'sgtxqsl') {
                            if (value.xmList) {

                                $.each(value.xmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.fxmmc) {
                                        tdValue = v.sgtxqsl;
                                    }
                                });
                            }else if (value.zxmList) {
                                $.each(value.zxmList, function (i, v) {
                                    if ($(thvalue).attr("parentName") == v.xmmc) {
                                        tdValue = v.sgtxqsl;
                                    }
                                })
                            }
                        }
                        else if ($(thvalue).attr("dataindex") == 'wlsgtxqsl') {
                            console.log('------------------------------------sgtxqsl');
                            //if (value.hjList) {
                                console.log('--------------if---hjList----------------------sgtxqsl');
                                tdValue = value.wlsgtxqsl;
                            //}
                        } else if ($(thvalue).attr("dataindex") == 'wlsapxqzs') {
                            console.log('---------------------------------wlsapxqzs');
                           // if (value.hjList) {
                                console.log('----------if hzlist-----------------------wlsapxqzs');
                                tdValue = value.wlsapxqzs;
                           // }
                        } else if ($(thvalue).attr("dataindex") == 'wlthzs') {
                            console.log('---------------------------------wlthzs');
                           // if (value.hjList) {
                                console.log('-----------if hzlist-----------------------wlthzs');
                                tdValue = value.wlthzs;
                           // }
                        } else if ($(thvalue).attr("dataindex") == 'wlwthzs') {
                            console.log('---------------------------------wlwthzs');
                            //if (value.hjList) {
                                console.log('-----------------if hzlist----------------wlwthzs');
                                tdValue = value.wlwthzs;
                           // }
                        } else if ($(thvalue).attr("dataindex") == 'xmxz') {
                            if (value.xmxz) {

                                if (value.xmxz == '1') {
                                    tdValue = '网架类项目';
                                } else if (value.xmxz == '0') {

                                    tdValue = '非网架类项目';

                                } else {

                                    tdValue = value[$(thvalue).attr('dataindex')];

                                }

                            }
                        } else if ($(thvalue).attr("dataindex") == 'jdrq') {

                            var jdrqarr = (value[$(thvalue).attr('dataindex')]).split(' ');
                            tdValue = jdrqarr[0];
                        } else if ($(thvalue).attr("dataindex") == 'uploadbtn') {
                            //if(value.fjsl!=''){
                            tdValue = 'uploadbtn';
                            //}
                        } else if ($(thvalue).attr("dataindex") == 'procNo') {
                            if (value.procNo) {


                                if (value.procNo == 'CSGLDSLC') {

                                    tdValue = '初设管理地市流程';

                                }else if(value.procNo == 'CSGLQXLC'){
                                	
                                	
                                	  tdValue = '初设管理区县流程';
                                	
                                } else {

                                    tdValue = value[$(thvalue).attr('dataindex')];

                                }
                            }

                        }
                        else if ($(thvalue).attr("dataindex") == 'zhsfglcs') {
                            if(value.csxmbm!=''){
                            	tdValue = '是';
                            }else{
                            	 tdValue = '否';
                            }
                        } 
                        //['供电所分管领导审核','GDSFGLDSH'],['区县公司分管领导审核','QXGSFGLDSH']]
                        // ['编制','BZ'],['项目经理审核','XMJLSH'],['固定资产专职审核','GDZCZZSH'],['业主项目部经理审核','YZXMBJLSH'],['供电营业部分管领导审核','GDYYBFGLDSH'],['配改办专职审核','PGBZZSH'],['信通审核','XTSH'],['配改办分管主任审核','PGBFGZRSH']
                        else if ($(thvalue).attr("dataindex") == 'lczt') {

//                            if (value.lcztbm && value.lcztbm != '' && value.procName != '地市公司废旧利旧管理流程') {
//                                if (value.lcztbm == 'BZ') {
//                                    tdValue = '编制';
//
//                                    //['编制','BZ'],['项目经理审核','XMJLSH'],['业主项目部经理审核','YZXMBJLSH'],['配改办专职审核','PGBZZSH'],['配改办分管主任审核','PGBFGZRSH'],['公司副总审核','GSFZSH']
//                                } else if (value.lcztbm == 'XMJLSH') {
//                                    tdValue = '项目经理审核';
//                                } else if (value.lcztbm == 'YZXMBJLSH') {
//                                    tdValue = '业主项目部经理审核';
//                                } else if (value.lcztbm == 'GDYYBFGLDSH') {
//                                    tdValue = '供电营业部分管领导审核';
//                                } else if (value.lcztbm == 'GDZCZZSH') {
//                                    tdValue = '固定资产专职审核';
//                                } else if (value.lcztbm == 'PGBZZSH') {
//                                    tdValue = '配改办专职审核';
//
//                                } else if (value.lcztbm == 'XTSH') {
//                                    tdValue = '信通审核';
//                                } else if (value.lcztbm == 'PGBFGZRSH') {
//                                    tdValue = '配改办分管主任审核';
//                                } else if (value.lcztbm == 'GSFZSH') {
//                                    tdValue = '公司副总审核';
//                                } else {
//                                    tdValue = value[$(thvalue).attr('dataindex')];
//                                }
//                            } else {
                                tdValue = value[$(thvalue).attr('dataindex')];
                          //  }

                        }
                       /* else if($(thvalue).attr("dataindex") == 'bfb'){
                        	
                        	if(value.bfb){
                        		
                        		tdValue=value.bfb+'%';
                        		
                        		
                        	}else{
                        		
                        		tdValue = value[$(thvalue).attr('dataindex')];
                        	}
                        	
                        }*/
                        else {
                            tdValue = value[$(thvalue).attr('dataindex')]; //表头对应列的值


                        }

                        //var tddisplay = value[$(thvalue).attr('style')];//自己加的！
                        // console.log($(thvalue).attr('dataindex') + '        ' +tdValue);
                        var oldTdValue = tdValue;
                        if (thvalue.attr('renderer')) { //如果表头有renderer属性，则调用对应的renderer方法。获取表头对应的值
                            var d = value;
                            var oCm = params.cm[thindex];
                            tdValue = oCm.renderer.call(this, tdValue, d, index, $(thvalue).attr('dataindex'));
                            // tddisplay = oCm.renderer.call(this, tddisplay, d, index, $(thvalue).attr('style'));//自己加的！
                        }

                        
                        _this.oTd = $('<td ><div class="common_tdDiv" >' + tdValue + '</div></td>'); //新建td 
                      
                     
                    //}
                     
                       
                        if (tdValue == '') {
                            _this.oTd.find('.common_tdDiv').height(32);
                        }
                        if (tdValue == 'uploadbtn') {
                            tdValue = '';

                            if ($(thvalue).attr("dataindex") == 'uploadbtn') {
                                var oBtn = $('<div class="upload_btn upload_btns"  style="margin: auto;text-align: center;width: 74px;height: 27px;"></div>');
                                oBtn.attr({
                                    fjlx: value.fjlx,
                                    fjsl: value.fjsl

                                });
                                if (value.fjsl > 0) {

                                    oBtn.css('pointer-events', 'none');
                                    oBtn.css('background', 'url(upload_grey.png) no-repeat center 0');
                                    oBtn.css('background-size', '38px');
                                    oBtn.addClass('uploadbtn_disabled');
                                }
                                //console.log('log with commonjs----2987 line:'+value.fjlx);
//                            	
                                oBtn.appendTo(_this.oTd);
                                _this.oTd.find('.common_tdDiv').remove();
                            }
                        }
                        
                        _this.oTd.attr({ //td的参数。备用
                            td_attr: thvalue.attr('dataindex'),
                            tdValue: oldTdValue,
                            edittype: thvalue.attr('edittype'),
                            editWidth: thvalue.attr('editWidth'),
                            index: index
                        });
                        
                        _this.find('.common_table tbody tr').eq(index).append(_this.oTd);
                      //TODO:nancy add for 项目分包单位评分--------数据展示 start 20180112
                        if($(thvalue).attr("dataindex") == 'fbdwlx'||$(thvalue).attr("dataindex") == 'df'||$(thvalue).attr("dataindex") == 'fbdwmc'){
                       	
                        	_this.oTd.find('.common_tdDiv').css('padding','0px 0px');
                        	_this.oTd.find('.common_tdDiv div').css({'white-space': 'nowrap','text-overflow': 'ellipsis','overflow': 'hidden'});
                        	var myValue=_this.oTd.find('.common_tdDiv div:first-child').text();
                        	var myValue3=_this.oTd.find('.common_tdDiv div:last-child').text();
                           	var myValue1=_this.oTd.find('.common_tdDiv div:eq(1)').text();
                           	var myValue2=_this.oTd.find('.common_tdDiv div:eq(2)').text();
                         _this.oTd.find('.common_tdDiv div:first-child').tooltip({title: myValue});
                         _this.oTd.find('.common_tdDiv div:eq(1)').tooltip({title: myValue1});
                         _this.oTd.find('.common_tdDiv div:eq(2)').tooltip({title: myValue2});
                         _this.oTd.find('.common_tdDiv div:last-child').tooltip({title: myValue3});
                       }
                       
                       else if($(thvalue).attr("dataindex") == 'sj'||$(thvalue).attr("dataindex") == 'zyczwt'||$(thvalue).attr("dataindex") == 'qqdf'||$(thvalue).attr("dataindex") == 'zqdf'||$(thvalue).attr("dataindex") == 'ysdf'){
                       	
                    	   _this.oTd.find('.common_tdDiv').css('padding','0px 0px');
                    	   _this.oTd.find('.common_tdDiv div').css({'white-space': 'nowrap','text-overflow': 'ellipsis','overflow': 'hidden'});
                    	   
                    	var myValue=_this.oTd.find('.common_tdDiv div:first-child').text();
                       	var myValue3=_this.oTd.find('.common_tdDiv div:last-child').text();
                       	var myValue1=_this.oTd.find('.common_tdDiv div:eq(1)').text();
                       	var myValue2=_this.oTd.find('.common_tdDiv div:eq(2)').text();
                        _this.oTd.find('.common_tdDiv div:first-child').tooltip({title: myValue});
                        _this.oTd.find('.common_tdDiv div:eq(1)').tooltip({title: myValue1});
                        _this.oTd.find('.common_tdDiv div:eq(2)').tooltip({title: myValue2});
                        _this.oTd.find('.common_tdDiv div:last-child').tooltip({title: myValue3});
                       	
                       }
                      else{
                    	   _this.oTd.tooltip({title: oldTdValue}); //给td添加提示框
                       }
                      //TODO:nancy add for 项目分包单位评分--------数据展示 end 20180112 
                        if (value.zhjhzt == '1' || value.rkzt == '1') {
                            _this.oTd.parent().find('.checkBox_td span').css('background-color', '#1eeb28');
                            
                        } else {
                            _this.oTd.parent().find('.checkBox_td span').css('background-color', '#f8f8f8');
                        }
                        if (value.sfwz == '0' ) {
                            _this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                            
                        } 
                      
                     
                        if(value.xxsfwz=="0"||value.xxsfwz===""){
                        	_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                        	//_this.oTd.parent().css('background-color', '#3f8ab9');
                        } 
                        if(value.wczt=="0"){
                        	_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                        }
                        if(value.ht_sfwz=="0"){
                        	_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                        }
                        if(value.zbjg_sfwz=="0"&&value.zxmbm==''){
                        	_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                        }
                        if(value.sgxmb_sfwz=="0"){
                        	_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                        }
                        if(value.zhjh_sfwz=="0"){
                        	_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                        }
                        if(value.sgtz_sfwz=="0"||value.sgtz_sfwz===""){
                        	_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                        }
                        
                    
                    	if(value.sfdkxm_qktj!==undefined&&value.sfdkxm_qktj=="1"){
                    		
                    			 if(value.gcxmzt_z_max==""){
                    				 _this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                              		_this.find('td[td_attr=zhjh_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                              	}else if(value.gcxmzt_z_max=="3"||value.gcxmzt_z_max=="31"){
                              		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                              		_this.find('td[td_attr=sgtz_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                              		
                              	}else if(value.gcxmzt_z_max=="4"){
                              		
                              		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                              		_this.find('td[td_attr=gckg_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                              	}else if(value.gcxmzt_z_max=="5"){
                              		
                              		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                              		_this.find('td[td_attr=ys_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                              	}else if(value.gcxmzt_z_max=="6"){
                              		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                              		_this.oTd.find('td[td_attr=fjjljwz_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                              	}else if(value.gcxmzt_z_max=="9"){
                              		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                              		if(value.gcxmzt=="9"){
                              			_this.oTd.parent().css('color', 'white');
                              		}
                              		_this.find('td[td_attr=js_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                              	}
                    		
                    		
                    	}else{
                    		 if(tdimghchaa==""){
                    			 _this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                         		_this.find('td[td_attr=zhjh_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                         	}else if(tdimghchaa=="3"||tdimghchaa=="31"){
                         		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                         		_this.find('td[td_attr=sgtz_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                         		
                         	}else if(tdimghchaa=="4"){
                         		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                         		
                         		_this.find('td[td_attr=gckg_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                         	}else if(tdimghchaa=="5"){
                         		
                         		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                         		_this.find('td[td_attr=ys_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                         	}else if(tdimghchaa=="6"){
                         		_this.oTd.parent().css('color', 'rgb(190, 255, 255)');
                         		_this.oTd.find('td[td_attr=fjjljwz_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                         	}else if(tdimghchaa=="9"){
                         		
                          			_this.oTd.parent().css('color', 'white');
                          		
                         		_this.find('td[td_attr=js_sfwc]').nextAll("td").find('.common_tdDiv').html(tdimghcha)
                         	}
                    	}
                       
                 	  
                    });
                    
                   
                });
                
                $.each(_this.aThs, function (thindex, thvalue) { //设置td的宽度和text-align
                
                	
                	
                    _this.find('td[td_attr=' + thvalue.attr('dataindex') + ']').find('.common_tdDiv').css({
                        'width': thvalue.attr('width'),
                        'text-align': thvalue.attr('align')
                    });
                });
                
                if (params.cellRander) {
                    $.each(params.cellRander, function (index, value) {
                        _this.find('tbody td[td_attr=' + value + ']  .common_tdDiv').addClass('common_click_td ' + value + '');
                    });
                }


                /* if(isCustomed){
                 //console.log("-----------------------3891 line------ id isCustomed");
                 _this.aThs = [];
                 if (params.cm) { //处理表头
                 console.log('-------cm------init1111----================》》》》》》》》》》》》》》》》》》》》');
                 $.each(params.cm, function (index, value) {
                 _this.oTh = null;
                 _this.oTh = $('<th><div class="common_thDiv"  style="width:' + value.width + 'px; text-align:center;" >' + value.header + '</div></th>');
                 _this.oTh.attr(value); //将定义表头的obj传入对应的th中
                 _this.oTh.attr('thIndex', index);
                 _this.aThs.push(_this.oTh);


                 });
                 }
                 if(cm_extra.length>0){
                 $.each(cm_extra, function (index, value) {

                 _this.oTh = null;
                 _this.oTh = $('<th class="th_extra"><div class="common_thDiv"  style="width:' + value.width + 'px; text-align:center;" >' + value.header + '</div></th>');
                 _this.oTh.attr(value); //将定义表头的obj传入对应的th中
                 _this.oTh.attr('thIndex', _this.aThs.length);
                 _this.aThs.push(_this.oTh);


                 });
                 }
                 }*/
                if (params.callback) {
                    params.callback(_this);
                }

                if (_this.oBar) {
                    _this.oBar.oTbarConent.find('.common_tbarMask ').remove();
                }
                _this.find('.common_loadingMask').remove();
                if (params.clicked) { //默认选中第一行
                    _this.find('.common_table tbody tr').first().trigger('click');
                }


            };

            //设置表格行编辑事件
            if (params.editAble) {
                _this.oOldTrData = {}; //编辑前的数据
                _this.oNewTrData = {}; //编辑后的数据

                _this.find('.common_table').on('click', '.common_gridEdit', function () { //编辑按钮点击事件
                    var _thisBtn = $(this);
                    $(this).slideUp('100', function () {
                        $(this).parent().find('.common_gridSave,.common_gridCancle').slideDown('100');
                    });

                    //前后数据都是当前行对应的数据
                    _this.oOldTrData['td' + $(this).parent().parent().parent().attr('index')] = {};
                    _this.oNewTrData['td' + $(this).parent().parent().parent().attr('index')] = _this.aData[$(this).parent().parent().parent().attr('index')];
                    // console.log(oNewTrData);

                    $.each(_this.aData[$(this).parent().parent().parent().attr('index')], function (name, value) {
                        _this.oOldTrData['td' + _thisBtn.parent().parent().parent().attr('index')][name] = value;
                    });

                    //如果定义了beforEdit方法。调用该方法，将对应的td和对应的数据传过去，由外部处理该td
                    /*          if (params.beforEdit) {
                     $(this).parent().parent().parent().find('.common_tdDiv').addClass('common_editTd').slideUp('100', function() {
                     var oThisTd = $(this).parent();
                     params.beforEdit.call(this, oThisTd, _this.oNewTrData['td' + _thisBtn.parent().parent().parent().attr('index')]);
                     $(this).slideDown('200');
                     });

                     } else {*/
                    //如果没有定义beforEdit方法，则从tr中td的参数确定该td要用什么样的控件并自动设置该控件，只支持text，textArea，datePicker三种控件
                    $.each($(this).parent().parent().siblings(), function (index, value) {
                        // alert($(value).attr('edittype'));
                        if ($(value).attr('edittype') == 'text') {

                            $(value).find('.common_tdDiv').css('overflow', 'visible').addClass('common_editTd').slideUp('100', function () {
                                $(this).html('');
                                $(this).append('<div class="common_editDiv"></div>');
                                var oTextField = $(this).find('.common_editDiv').textField({
                                    width: $(value).attr('editWidth') ? $(value).attr('editWidth') : $(value).width() - 20,
                                    height: 30,
                                    name: 'gridInput',
                                });
                                oTextField.setValue($(value).attr('tdValue'));
                                $(value).find('.common_tdDiv').css('text-decoration', 'inherit');
                                $(value).find('input').on('click', function () {
                                    return false;
                                });
                                //var sLeft = (parseInt($(value).width())-parseInt($(value).attr('editWidth')?$(value).attr('editWidth'):$(value).width()-20))/2+'px';
                                $(this).find('.common_editDiv').css({
                                    // 'margin-left':sLeft,
                                });
                                $(this).slideDown('100');
                            });
                        } else if ($(value).attr('edittype') == 'datePicker') {
                            $(value).find('.common_tdDiv').css('overflow', 'visible').addClass('common_editTd').slideUp('100', function () {
                                $(this).html('');
                                $(this).append('<div class="common_editDiv"></div>');
                                $(this).find('.common_editDiv').datePicker({
                                    width: $(value).attr('editWidth') ? $(value).attr('editWidth') : $(value).width() - 20,
                                    height: 30,
                                    name: 'gridDatePicker',
                                    readOnly: false,
                                    dateFmt: $(value).attr('dateFmt'),
                                    initValue: $(value).attr('tdValue'),
                                });
                                $(value).find('.common_tdDiv').css('text-decoration', 'inherit');
                                $(value).find('input').on('click', function () {
                                    return false;
                                });
                                // sLeft = (parseInt($(value).width())-parseInt($(value).attr('editWidth')?$(value).attr('editWidth'):$(value).width()-20))/2+'px';
                                $(this).find('.common_editDiv').css({
                                    // 'margin-left':sLeft,
                                });
                                $(this).slideDown('100');
                            });
                        } else if ($(value).attr('edittype') == 'textArea') {
                            $(value).find('.common_tdDiv').css('overflow', 'visible').addClass('common_editTd').slideUp('100', function () {
                                $(this).html('');
                                $(this).append('<div class="common_editDiv"></div>');
                                var oTextArea = $(this).find('.common_editDiv').textArea({
                                    name: 'gridTextArea',
                                    width: $(value).attr('editWidth') ? $(value).attr('editWidth') : $(value).width() - 20,
                                    height: 80,
                                });
                                oTextArea.setValue($(value).attr('tdValue'));
                                $(value).find('.common_tdDiv').css('text-decoration', 'inherit');
                                $(value).find('input').on('click', function () {
                                    return false;
                                });
                                //var sLeft = (parseInt($(value).width())-parseInt($(value).attr('editWidth')?$(value).attr('editWidth'):$(value).width()-20))/2+'px';
                                $(this).find('.common_editDiv').css({
                                    // 'margin-left':sLeft,
                                }).find('textarea').css('resize', 'both');
                                $(this).slideDown('100');
                            });
                        }
                    });
//                    }
                    if (params.beforEdit) {
                        $(this).parent().parent().parent().find('.common_tdDiv').addClass('common_editTd').slideUp('100', function () {
                            var oThisTd = $(this).parent();
                            params.beforEdit.call(this, oThisTd, _this.oNewTrData['td' + _thisBtn.parent().parent().parent().attr('index')]);
                            $(this).slideDown('200');
                        });
                    }
                });

                //对勾，保存按钮点击事件
                _this.find('.common_table').on('click', '.common_gridSave', function () {
                    $(this).parent().find('.common_gridSave,.common_gridCancle').slideUp('100', function () {
                        $(this).parent().find('.common_gridEdit').slideDown('100');
                    });
                    $(this).parent().parent().parent().find('.common_tdDiv').css('overflow', 'hidden').removeClass('common_editTd');
                    var _thisBtn = $(this);
                    var oSaveThis = $(this);

                    //如果定义了该方法，则新数据直接从该方法中取
                    if (params.afterEdit) {
                        _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')] = params.afterEdit.call(this, _thisBtn.parent().parent().parent());
                        console.log(_this.oNewTrData);
                    } else {
                        $.each($(this).parent().parent().siblings(), function (index, value) {
                            if ($(value).find('input').length > 0) {
                                _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')][$(value).attr('td_attr')] = $(value).find('input').val();
                            } else if ($(value).find('textarea').length > 0) {
                                _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')][$(value).attr('td_attr')] = $(value).find('textarea').val();
                            }
                        });
                    }

                    if (params.cellRander) {
                        // _this.find('tbody td').off('click');
                        $.each(params.cellRander, function (index, value) {
                            oSaveThis.parent().parent().parent().find('.' + value).css('text-decoration', 'underline');
                        });
                    }
                    if (params.saveValid) {
                        var errArr = params.saveValid.call(this, _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')]);
                        if (errArr) {
                            $.each(errArr, function (index, value) {
                                _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')][value] = _this.oOldTrData['td' + oSaveThis.parent().parent().parent().attr('index')][value];
                            });
                        }
                    }

                    $.each(_this.aThs, function (thindex, thvalue) {
                        var tdValue = _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')][$(thvalue).attr('dataindex')];
                        // console.log($(thvalue).attr('dataindex') + '        ' +tdValue);
                        var oldTdValue = tdValue;
                        if (thvalue.attr('renderer')) {
                            var d = _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')]['td' + $(this).parent().parent().parent().attr('index')];
                            var oCm = params.cm[thindex];
                            tdValue = oCm.renderer.call(this, tdValue, d, $(this).parent().parent().parent().attr('index'));
                        }
                        _this.oTd = oSaveThis.parent().parent().parent().find('td[td_attr=' + $(thvalue).attr('dataindex') + ']');
                        _this.oTd.find('.common_tdDiv').slideUp('100', function () {
                            $(this).html(tdValue);
                            $(this).parent().attr({
                                tdValue: oldTdValue,
                            });
                            $(this).parent().tooltip({title: oldTdValue});
                            $(this).css('height', '');
                            $(this).slideDown('100');
                        });

                    });

                    if (params.submitUrl) {
                        $.ajax({
                            type: 'post',
                            data: _this.oNewTrData['td' + oSaveThis.parent().parent().parent().attr('index')],
                            url: params.submitUrl,
                            dataType: 'json',
                            error: function () {

                            },
                            success: function (response) {
                                if (params.submitCallBack) {
                                    params.submitCallBack.call(this, response);
                                }
                            },
                            complete: function () {
                            }
                        });
                    }

                });

                _this.find('.common_table').on('click', '.common_gridCancle', function () {
                    $(this).parent().find('.common_gridSave,.common_gridCancle').slideUp('100', function () {
                        $(this).parent().find('.common_gridEdit').slideDown('100');
                    });
                    $(this).parent().parent().parent().find('.common_tdDiv').css('overflow', 'hidden').removeClass('common_editTd');

                    var oCancleThis = $(this);

                    $.each(_this.aThs, function (thindex, thvalue) {
                        var tdValue = _this.oOldTrData['td' + oCancleThis.parent().parent().parent().attr('index')][$(thvalue).attr('dataindex')];
                        var oldTdValue = tdValue;
                        if (thvalue.attr('renderer')) {
                            var d = _this.oOldTrData['td' + oCancleThis.parent().parent().parent().attr('index')];
                            var oCm = params.cm[thindex];
                            tdValue = oCm.renderer.call(this, tdValue, d, $(this).parent().parent().parent().attr('index'));
                        }
                        _this.oTd = oCancleThis.parent().parent().parent().find('td[td_attr=' + $(thvalue).attr('dataindex') + ']');
                        _this.oTd.find('.common_tdDiv').slideUp('100', function () {
                            $(this).html(tdValue);
                            _this.oTd.attr({
                                tdValue: oldTdValue,
                            });
                            _this.oTd.tooltip({title: oldTdValue});
                            $(this).css('height', '');
                            $(this).slideDown('100');
                        });
                    });


                    if (params.cellRander) {
                        $.each(params.cellRander, function (index, value) {
                            oCancleThis.parent().parent().parent().find('.' + value).css('text-decoration', 'underline');
                        });
                    }
                });
            }

            _this.timeout = null;
            _this.clickCount = 0;
            //if (params.click) {
                _this.on('click', '.common_table tbody tr', function () {
                    var oTrThis = $(this);

                    if (_this.clickCount == 0) {
                        _this.timeout = setTimeout(function () {
                            oTrThis.siblings().find('.common_head_checkbox').prop('checked', false);
                            oTrThis.find(' .common_head_checkbox').prop('checked', true);
                            oTrThis.addClass('common_grid_rowchecked').removeClass('common_tr').siblings().removeClass('common_grid_rowchecked').addClass('common_tr');
                            _this.clickCount = 0;
                            params.click(_this.aData[parseInt(oTrThis.attr('index'))]);
                            console.log(_this.aData[parseInt(oTrThis.attr('index'))]);
                        }, 250);
                    }

                    _this.clickCount++;
                });
           // }
                _this.on('click', '.common_table tbody tr td', function () {  
                	console.log(urll,urlll);
                		
                		 var thisattr=$(this).attr('td_attr');                     
                         var tzurl;
                    	   if(thisattr=="sgxmb_sfwc"){
                    		   tzurl='../../html/xmbgl/xmbgl_sy.html'                			 
                    	   }
                    	   else if(thisattr=="zhjh_sfwc"){
                    		   tzurl='../../html/zhjhgl/zhjhgl_sy2.html'                			 
                    	   }
                    	   else if(thisattr=="sfglcs"){
                    		  
                        		   tzurl='../../html/chushes/chushe.html'   
                    		                			 
                    	   }
                    	   else if(thisattr=="gs"){//概算导入
                    		  
                    	   }
                    	   else if(thisattr=="zbjg_sfwc"){
                    		   tzurl='../../html/ztb/ztb_sy.html'                			 
                    	   }
                    	   else if(thisattr=="ht_sfwc"){
                    		   tzurl='../../html/htgl/htgl_sy.html'
                    	   }
                    	   else if(thisattr=="cs_sfwc"){
                    		   tzurl='../../html/chushe/chushe_sy.html'
                    	   }              	   
                    	   else if(thisattr=="sgtz_sfwc"){
                    		   tzurl='../../html/sgtzgl/sgtzgl_sy.html'
                    	   }
                    	  
                    	   else if(thisattr=="jlqq_sfwc"){
                    		   tzurl='../../html/jlqqgl/jlqqgl_sy.html'
                    	   }
                    	   else if(thisattr=="gckg_sfwc"){
                    		   tzurl='../../html/kgsq/kgsq_sy.html'
                    	   }
                    	   else if(thisattr=="gcjh_sfwc"){
                    		   tzurl='../../html/sgjdgl/zjhdr_sy.html'
                    	   }
                    	   else if(thisattr=="jl_sfwc"){
                    		   tzurl='../../html/sgjdgl/jlgl_sy.html'
                    	   }
                    	   else if(thisattr=="sg_sfwc"){
                    		   tzurl='../../html/sgjdgl/sggl_sy.html'
                    	   }
                    	   else if(thisattr=="ys_sfwc"){
                    		   tzurl='../../html/sgjdgl/ysgl_sy.html'
                    	   }
                    	   else if(thisattr=="fjjljwz_sfwc"){
                    		   tzurl='../../html/wlhd/fjwzgl_sy.html'
                    	   }else if(thisattr=="js_sfwc"){
                    		   tzurl='../../html/jsgl/jsgl_sy.html'
                    	   }
                    	   var  tdvalue="";
                    		
                    			tdvalue=$(this).parent().find('td').eq("1").attr("tdvalue");
                    	 if(urll!==null&&urll!==""&&urll!==undefined||urlll!==null&&urlll!==""&&urlll!==undefined){
                    		
                    		 if($(this).parent().find('td').eq("3").attr("td_attr")=="zxmbm"&&thisattr!=="zxmbm"&&thisattr!=="zxmmc"&&thisattr!=="zhjhbm"&&thisattr!=="ssdsgsmc"&&thisattr!=="ssxgsmc"&&thisattr!=="gds"&&thisattr!=="zhjhmc"||$(this).parent().find('td').eq("1").attr("td_attr")=="zxmbm"&&urll=="statisticsAction!initSub_f.action"&&thisattr!=="zxmmc"&&thisattr!=="zxmbm"&&thisattr!=="ssdsgsmc"&&thisattr!=="ssxgsmc"&&thisattr!=="gds"){    
                    			 	
                             		if(responsee.root[$(this).parent().index()].ssxgsbm==dwbhh){
                                     	if(fzxm=="1"){
                                     		tdvalue=$(this).parent().find('td').eq("3").attr("tdvalue");
                                     		if(thisattr=="zbjg_sfwc"||thisattr=="ht_sfwc"){
                                     			ftdvalue=$(this).parent().find('td').eq("1").attr("tdvalue");
                                    			window.parent.location.href=tzurl+"?fzxm="+fzxm+"&fxmbm="+fxmbmv+"&fxmmc="+fxmmcv+"&zid="+tdvalue+'&tzjm=1'+'&fid='+ftdvalue+'&zxmbm='+tdvalue+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv;                			 
                                      	   }else if(thisattr=="sfglcs"){
                                      		 
                                      			 if(responsee.root[$(this).parent().index()].sfglcs=="1"){
                                          			window.parent.location.href=tzurl+"?fzxm="+fzxm+"&csxmbm="+responsee.root[$(this).parent().index()].csxmbm+"&fxmbm="+fxmbmv+"&fxmmc="+fxmmcv+"&zid="+tdvalue+'&tzjm=1'+'&fid=&zxmbm='+tdvalue+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv;
                                           		 }else{
                                           			 $.alert("当前项目未关联初设!");
                                           		   
                                           		 }
                                      		
                                      	   }else{
                                    			window.parent.location.href=tzurl+"?fzxm="+fzxm+"&fxmbm="+fxmbmv+"&fxmmc="+fxmmcv+"&zid="+tdvalue+'&tzjm=1'+'&fid=&zxmbm='+tdvalue+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv;

                                    	   }
                                 			
                                     	}else if(fzxm=="2"){
                                     		
                                     		if(thisattr=="zbjg_sfwc"||thisattr=="ht_sfwc"){
                                     			
                                    			window.parent.location.href=tzurl+"?fzxm="+fzxm+"&fxmbm="+fxmbmv+"&fxmmc="+fxmmcv+"&zid="+tdvalue+'&tzjm=1'+'&fid='+zhjhbm+'&zxmbm='+tdvalue+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv;                			 
                                      	   }else if(thisattr=="sfglcs"){
                                      		
                                      		 if(responsee.root[$(this).parent().index()].sfglcs=="1"){
                                     			window.parent.location.href=tzurl+"?fzxm="+fzxm+"&csxmbm="+responsee.root[$(this).parent().index()].csxmbm+"&fxmbm="+fxmbmv+"&fxmmc="+fxmmcv+"&zid="+tdvalue+'&tzjm=1'+'&fid=&zxmbm='+tdvalue+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv;
                                    		 }else{
                                    			 $.alert("当前项目未关联初设!");
                                    		
                                    		 }
                                      	   }else{
                                    			window.parent.location.href=tzurl+"?fzxm="+fzxm+"&fxmbm="+fxmbmv+"&fxmmc="+fxmmcv+"&zid="+tdvalue+'&tzjm=1'+'&fid=&zxmbm='+tdvalue+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv;

                                    	   }                                 			
                                     	}

                             		}else{
                             			$.alert({
                        	 				width:330,
                        	 				msg:'非当前登入人所在单位项目,无权查看'});
                             		}
                             	
                              	 
                           }
                             else if($(this).parent().find('td').eq("1").attr("td_attr")=="zhjhbm"&&thisattr!=="zhjhmc"&&thisattr!=="zhjhbm"&&thisattr!=="ssdsgsmc"&&thisattr!=="ssxgsmc"&&thisattr!=="gds"&&$(this).parent().find('td').eq("3").attr("td_attr")!=="zxmbm"){                            	
                            	 if(responseee.root[$(this).parent().index()].ssxgsbm==dwbhh){
                            		 if(thisattr=="sfglcs"){
                            			 if(responseee.root[$(this).parent().index()].sfdkxm_qktj=="1"){
                                  			 $.alert("当前项目为打捆项目,请在子项查看!");
                                  		   }else
                            			 if(responseee.root[$(this).parent().index()].sfglcs=="1"){
                            				
                                     		  window.parent.location.href=tzurl+"?zid=&tzjm=2&fid="+tdvalue+'&fxmbm='+tdvalue+ "&csxmbm="+responseee.root[$(this).parent().index()].csxmbm+'&fxmmc='+fxmmcv+'&zxmbm='+xmbm+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv; 
                                		 }else{
                                			 $.alert("当前项目未关联初设!");
                                		 } 
                                	   }else{ 
                              		  window.parent.location.href=tzurl+"?zid=&tzjm=2&fid="+tdvalue+'&fxmbm='+tdvalue+'&fxmmc='+fxmmcv+'&zxmbm='+xmbm+'&jxnd='+jxnddv+'&zxmmc='+xmmcv+'&xmxz='+zcxzcv+'&ssxgsmc='+ssxgsv+'&ssdsgsmc='+ssdsgsv+'&gds='+gdsv; 
                                	   }
                          		}else{
                          			$.alert({
                     	 				width:330,
                     	 				msg:'非当前登入人所在单位项目,无权查看'});
                          		}
                       	  }
                 		}  	
                   
                    
                	 
               		//TODO
               		
                });

            if (params.dbclick) {

                _this.on('dblclick', '.common_table tbody tr', function () {
                    clearTimeout(_this.timeout);
                    _this.clickCount = 0;
                    // $(this).siblings().find('.common_head_checkbox').prop('checked', false);
                    // $(this).find('.common_head_checkbox').prop('checked', true);
                    //$(this).addClass('common_grid_rowchecked').removeClass('common_tr').siblings().removeClass('common_grid_rowchecked').addClass('common_tr');
                    // console.table(_this.aData);
                    params.dbclick(_this.aData[parseInt($(this).attr('index'))]);
                });
            }

            if (params.cellRander) {
                $.each(params.cellRander, function (index, value) {
                    _this.find('.common_grid_div').on('click', '.' + value + '', function () {
                        var oTdThis = $(this);
                        _this.find('td').removeClass('common_tdDivSel');
                        $(this).parent().addClass('common_tdDivSel');
                        if (params.cellClick) {
                            if (params.cellClick[value]) {
                                params.cellClick[value].call(this, oTdThis.html(), _this.aData[oTdThis.parent().parent().attr('index')]);
                            }
                        }

                        return false;
                    });
                });
            }
//           
//            _this.on('click', 'tr', function () {
//                _this.find('td').removeClass('common_tdDivSel');
//              //  console.log(_this); 
//                $(this).siblings('.common_grid_rowchecked').removeClass().addClass('common_tr').find('td input[type=checkbox]').prop("checked",false);           
//                	$(this).addClass('common_grid_rowchecked').removeClass('common_tr');              	
//                	$(this).find('td input[type=checkbox] ').prop("checked",true);            
//            });
            _this.on('click', 'td', function () {
                _this.find('td').removeClass('common_tdDivSel');
            });
            _this.oBar = null;

            if (params.tbar) {
                _this.oBar = params.tbar;
                _this.find('.common_grid_div').before(params.tbar.oTbarConent);
                //params.tbar.oTbarConent.outerWidth(_this.find('.common_grid_div').outerWidth());
                params.tbar.setGrid(_this);
            }

            if (params.bbar) {
                _this.oBar = params.bbar;
                _this.find('.common_grid_div').after(params.bbar.oTbarConent);
                params.bbar.oTbarConent.outerWidth(_this.find('.common_grid_div').outerWidth());
                params.bbar.setGrid(_this);
            }

            _this.iCheckCount = 0;
            _this.find('th input[type=checkbox]').on('click', function () {
                if (_this.iCheckCount == 0) {
                    _this.find('.common_head_checkbox').prop('checked', true).parent().parent().addClass('common_grid_rowchecked').removeClass('common_tr');
                    _this.iCheckCount++;
                } else {
                    _this.find('.common_head_checkbox').prop('checked', false).parent().parent().removeClass('common_grid_rowchecked').addClass('common_tr');
                    _this.iCheckCount--;
                }
            });

            _this.find('tbody').on('click', '.checkBox_td', function (e) {
                if ($(this).find('input').is(':checked')) {
                    $(this).find('input').prop('checked', false);
                    $(this).parent().removeClass('common_grid_rowchecked').addClass('common_tr');
                } else {
                    $(this).find('input').prop('checked', true);
                    $(this).parent().addClass('common_grid_rowchecked').removeClass('common_tr');
                }
                e.stopPropagation();
            });

            _this.find('tbody').on('click', '.checkBox_td', function (e) {
                e.preventDefault();
            });

            _this.sort = null;
            _this.dir = null;
            _this.search = function (oSearchParams) {
                if (!_this.find('.common_loadingMask').get(0)) {
                    _this.find('.common_grid_div').append('<div class="common_loadingMask"><div class="fa fa-spinner fa-pulse fa-fw" style="font-size: 30px;"></div></div>');
                    _this.find('.common_loadingMask').css('top', _this.find('.common_grid_div').scrollTop());
                    _this.find('.common_loadingMask').css('left', _this.find('.common_grid_div').scrollLeft());
                    _this.find('.common_grid_div').on('scroll', function () { //表格上下拖动时，表头表的位置始终保持不变
                        _this.find('.common_loadingMask').css('top', _this.find('.common_grid_div').scrollTop());
                        _this.find('.common_loadingMask').css('left', _this.find('.common_grid_div').scrollLeft());
                    });
                }

                if (params.url) {
                    var oDatas = {};
                    if (params.baseForm) {
                        oDatas = params.baseForm.getParams();
                    }
                    if (params.data) {
                        $.each(params.data, function (name, value) {
                            oDatas[name] = value;
                        });
                    }
                    if (_this.searchPara) {
                        $.each(_this.searchPara, function (name, value) {
                            oDatas[name] = value;
                        });
                    }
                    if (oSearchParams) {
                        $.each(oSearchParams, function (name, value) {
                            oDatas[name] = value;
                            if (name == 'sort') {
                                _this.sort = value;
                            } else if (name == 'dir') {
                                _this.dir = value;
                            }
                        });
                    }

                    oDatas.sort = _this.sort;
                    oDatas.dir = _this.dir;
                    console.log('data is:' + oDatas);
                    console.log('url is:' + params.url);
                    _this.ajaxPara = { //查询数据
                        type: 'post',
                        data: oDatas,
                        url: params.url,
                        dataType: 'json',
                        error: function () {
                        },
                        success: function (response) {
                            _this.refreshData(response);
                        },
                        complete: function () {
                        }
                    };
                    if (params.traditional) {
                        _this.ajaxPara['traditional'] = true;
                    }
                    $.ajax(_this.ajaxPara);
                }
            };

            if (!params.isNotLoad) {
                _this.search();
                _this.bNotLoad = true;
            }

            _this.getData = function () {
                return _this.aData;
            };

            _this.getSelectData = function () {
                _this.aSelectedRows = _this.find('.common_grid_rowchecked');
                _this.aSelectedData = [];
                $.each(_this.aSelectedRows, function (index, value) {
                    _this.aSelectedData.push(_this.aData[$(value).attr('index')]);
                });
                return _this.aSelectedData;
            };
            return _this;
        },


        /*************************************************************************************
         *Title: formSubmit
         *Description: 表单提交事件
         *author: 孙韶辰
         *date: 2016/11/4
         **************************************************************************************/
        'formSubmit': function (params) {
            var _this = this;
            _this.oDatas = {};
            _this.sType = 'post';
            _this.bDoAjax = true;
            _this.sUrl = '';
            _this.sDataType = 'json';
            _this.params = params;
            if (_this.params.type) {
                _this.sType = _this.params.type;
                console.log("type is:" + _this.params.type);
            }

            if (_this.params.sDataType) {
                _this.sDataType = _this.params.sDataType;
            }
            // console.table(_this.oDatas);
            _this.on('submit', function (e) {
                _this.getParams();
                if (_this.params.doPost) {
                    if (_this.params.beforSubmit) {
                        _this.bDoAjax = _this.params.beforSubmit();
                    }

                    if (_this.attr('action')) {
                        _this.sUrl = _this.attr('action');
                    }

                    if (_this.params.url) {
                        _this.sUrl = _this.params.url;
                    }
                    console.log("common------4099----line  mark");
                    if (_this.sUrl) {
                        console.log(" if  _this.sUrl is:" + _this.sUrl);
                        if (_this.bDoAjax) {
                            console.log(" if  _this.bDoAjax is:" + _this.bDoAjax);
                            if (_this.params.postFile) {
                                console.log(" if  _this.params.postFile is:" + _this.params.postFile);
                                var formData = new FormData(_this.get(0));
                                console.log('FormData is:' + formData);
                                console.log('type is:' + _this.sType);
                                console.log('url is:' + _this.sUrl);
                                console.log('dataType is:' + _this.sDataType);
                                $.ajax({
                                    type: _this.sType,
                                    data: formData,
                                    url: _this.sUrl,
                                    dataType: _this.sDataType,
                                    processData: false,
                                    contentType: false,
                                    error: function (xhr, errorText, errorType) {
                                        if (_this.params.ajaxError) {
                                            _this.params.ajaxError();
                                        }
                                    },
                                    success: function (data) {
                                        if (_this.params.afterSubmit) {
                                            _this.params.afterSubmit(data);
                                        }
                                    },
                                    complete: function () {
                                        if (_this.params.ajaxComplete) {
                                            _this.params.ajaxComplete();
                                        }
                                    }
                                });
                            } else {
                                $.ajax({
                                    type: _this.sType,
                                    data: _this.oDatas,
                                    url: _this.sUrl,
                                    dataType: _this.sDataType,
                                    error: function () {
                                        if (_this.params.ajaxError) {
                                            _this.params.ajaxError();
                                        }
                                    },
                                    success: function (data) {
                                        if (_this.params.afterSubmit) {
                                            _this.params.afterSubmit(data);
                                        }
                                    },
                                    complete: function () {
                                        if (_this.params.ajaxComplete) {
                                            _this.params.ajaxComplete();
                                        }
                                    }
                                });
                            }
                        }
                    }
                } else {
                    if (_this.params.beforSubmit) {
                        _this.bDoAjax = _this.params.beforSubmit();
                        // alert(_this.bDoAjax);
                        if (_this.bDoAjax) {
                            $.each(aGrid, function (index, value) {
                                value.search();
                            });
                        }
                    } else {
                        $.each(aGrid, function (index, value) {
                            value.search();
                        });
                    }
                }
                e.preventDefault();
            });

            _this.on('reset', function () {
                $.each(_this.find('input'), function (index, value) {
                    if ($(value).attr('name')) {
                        if ($(value).attr('type') != 'checkbox') {
                            if ($(value).attr('inputname')) {
                                $(value).attr('inputname', '');
                                $(value).attr('inputvalue', '');
                            }
                        }
                    }
                });
            });

            this.getParams = function () {
                _this.oDatas = {};
                $.each(_this.find('input'), function (index, value) {
                    if ($(value).attr('name')) {
                        if ($(value).attr('type') != 'checkbox') {
                            if (!$(value).attr('inputname')) {
                                _this.oDatas[$(value).attr('name')] = $(value).val();
                            } else {
                                _this.oDatas[$(value).attr('name')] = $(value).attr('inputvalue');
                            }

                        } else {
                            if (!_this.oDatas[$(value).attr('name')]) {
                                _this.oDatas[$(value).attr('name')] = '';
                            }
                            if ($(value).attr('checked')) {
                                _this.oDatas[$(value).attr('name')] += $(value).val() + ' ';
                            }
                        }
                    }
                });
                // console.log("_this.oDatas is:" + JSON.stringify(_this.oDatas));
                $.each(_this.find('textarea'), function (index, value) {
                    if ($(value).attr('name')) {
                        _this.oDatas[$(value).attr('name')] = $(value).val();
                    }
                });

                $.each(_this.find('.common_radiochecked').parent().parent(), function () {
                    _this.oDatas[$(this).attr('radio_name')] = $(this).attr('radio_value');
                });

                $.each(_this.find('.common-checkbox-check'), function () {
                    _this.oDatas[$(this).siblings('.checkBox-div').attr('name')] = $.getCheckBoxValue($(this).siblings('.checkBox-div').attr('name'));
                });

                if (_this.params.data) {
                    // _this.oDatas = _this.params.data;
                    $.each(_this.params.data, function (name, value) {
                        _this.oDatas[name] = value;
                    });
                }

                if (_this.oTherPara) {
                    $.each(_this.oTherPara, function (name, value) {
                        _this.oDatas[name] = value;
                    });
                }

                return _this.oDatas;
            };

            _this.oTherPara = null;

            this.setParams = function (obj) {
                _this.oTherPara = obj;
            };
            var aGrid = [];
            this.setGrid = function (oGrid) {
                aGrid.push(oGrid);
            };

            this.getParams();

            return this;
        },

        /*************************************************************************************
         *Title: tooltip
         *Description: 获取url传参中某个参数的值
         *author: 孙韶辰
         *date: 2016/11/3
         **************************************************************************************/
        'tooltip': function (params) {
            var _this = this;
            _this.sTitle = '';
            //      var _this = $(this);
            if (params) {
                if (params.title) {
                    _this.sTitle = params.title;
                } else {
                    return;
                }
            } else {
                if (this.attr('title')) {
                    _this.sTitle = this.attr('title');
                    this.attr('title', '');
                }
            }

            this.attr('tooltip', 'true');

            _this.oTooltip = null;
            this.on({
                mouseover: function (e) {
                    var iTop = e.pageY + 20;
                    var iLeft = e.pageX + 20;

                    $('body').find('.common_tooltip').slideUp('fast', function () {
                        $(this).remove();
                    });

                    _this.oTooltip = $('<div class="common_tooltip" ><div>' + _this.sTitle + '</div></div>');
                    if (params) {
                        if (params.zIndex) {
                            _this.oTooltip.css("z-index", params.zIndex);
                        }
                    }
                    $('body').append(_this.oTooltip);
                    if (_this.oTooltip.outerWidth() + iLeft >= $('body').width()) {
                        iLeft = $('body').width() - _this.oTooltip.outerWidth() - 50;
                    }

                    _this.oTooltip.css({
                        display: 'none',
                        left: iLeft,
                        top: iTop,
                    });
                    setTimeout(function () {
                        _this.oTooltip.slideDown('fast');
                    }, 300);
                },
                mouseout: function () {
                    if (_this.oTooltip) {
                        _this.oTooltip.slideUp('fast', function () {
                            _this.oTooltip.remove();
                        });
                    }
                },
                mousemove: function (e) {
                    var iTop = e.pageY + 20;
                    var iLeft = e.pageX + 20;

                    if (_this.oTooltip && _this.oTooltip.outerWidth() + iLeft >= $('body').width()) {
                        // iTop = e.pageY + 20;
                        iLeft = $('body').width() - _this.oTooltip.outerWidth() - 50;
                    }
                    if (_this.oTooltip && _this.oTooltip.outerHeight() + iTop >= $('body').height()) {
                        iTop = $('body').height() - _this.oTooltip.outerHeight() - 50;
                    }
                    if (_this.oTooltip) {
                        _this.oTooltip.css({
                            left: iLeft,
                            top: iTop,
                        });
                    }

                },
            });

        },

        /*************************************************************************************
         *Title: accordion
         *Description: 获取url传参中某个参数的值
         *author: 孙韶辰
         *date: 2016/11/30
         **************************************************************************************/
        'accordion': function (params) {
            var _this = this;

            if (params) {

            } else {
                $.each(_this.find('h1'), function (index, value) {
                    $(value).addClass('pub_titlebgaccor');
                    $(value).html('<h2 class="pub_title">' + $(value).html() + '</h2><div class="common_upArrow fa fa-caret-up" index=' + index + ' style="font-size:16px"></div>');
                });
                $.each(_this.children('div'), function (index, value) {
                    $(value).addClass('pub_accordiv');
                    $(value).attr('divindex', index);
                });
            }

            _this.find('.pub_titlebgaccor').on('click', '.common_upArrow', function () {
                var oBtnThis = $(this);
                $(this).removeClass('common_upArrow fa fa-caret-up').addClass('common_downArrow fa fa-caret-down');
                _this.find('div[divindex=' + $(this).attr('index') + ']').slideUp(function () {
                    oBtnThis.parent().css({
                        'margin-bottom': '10px',
                        'border-bottom': '#40CDFA',
                    });
                });

            });

            _this.find('.pub_titlebgaccor').on('click', '.common_downArrow', function () {
                var oBtnThis = $(this);
                $(this).removeClass('common_downArrow fa fa-caret-down').addClass('common_upArrow fa fa-caret-up');
                oBtnThis.parent().css({
                    'margin-bottom': '0',
                    'border-bottom': 'none',
                });
                _this.find('div[divindex=' + $(this).attr('index') + ']').slideDown(function () {

                });

            });
            return _this;
        },

        'contentPopup': function (params) {
            var _this = this;
            _this.bInContainer = false;
            _this.params = params;
            _this.bInThis = true;
            _this.bInPop = false;

            $('body').on('click', function () {
                if (!_this.bInContainer) {
                    if (_this.oXlContent) {
                        _this.oXlContent.remove();
                        _this.oXlContent = null;
                    }
                }
            });

            _this.on('contextmenu', function (e) {
                _this.mouseLoction = $.mouseCoords(e);
                if (_this.oXlContent) {
                    _this.oXlContent.remove();
                    _this.oXlContent = null;
                }
                _this.oXlContent = $('<ul class="common_xlContent" style=""></ul>'); //重新添加下拉列表
                _this.oXlUl = $('<ul class="common_xlUl" ></ul>');
                _this.oXlContent.append(_this.oXlUl);
                if (params.items) {

                    $.each(params.items, function (index, value) { //添加下拉选项
                        var oLi = $('<li class="common_selectItem" style="padding-left: 20px">' + value.label + '</li>'); //添加下拉选项并设置其value和name
                        _this.oXlUl.append(oLi);
                        oLi.on('click', function () {
                            value.action.call(_this);
                            _this.oXlContent.remove();
                            _this.oXlContent = null;
                        });
                    });

                }
                $('body').append(_this.oXlContent);
                if (params.leaveToRemove) {
                    _this.oXlContent.on('mouseleave', function () {
                        console.log('0 mouseleave');
                        _this.bInPop = false;
                        setTimeout(function () {
                            if (!_this.bInThis && !_this.bInPop) {
                                if (_this.oXlContent) {
                                    _this.oXlContent.remove();
                                    _this.oXlContent = null;
                                }
                            }
                        }, 100);

                    }).on('mouseenter', function () {
                        console.log('0 mouseenter');
                        _this.bInPop = true;
                    });
                    _this.on('mouseleave', function () {
                        console.log('1 mouseleave');
                        _this.bInThis = false;

                        setTimeout(function () {
                            if (!_this.bInThis && !_this.bInPop) {
                                if (_this.oXlContent) {
                                    _this.oXlContent.remove();
                                    _this.oXlContent = null;
                                }
                            }
                        }, 100);
                    }).on('mouseenter', function () {
                        console.log('1 mouseenter');
                        _this.bInThis = true;
                    });
                }

                _this.oXlContent.outerWidth(params.width); //设置下拉框的宽度与输入框相同
                _this.oXlUl.outerWidth(_this.oXlContent.width()); //设置下拉框的宽度与输入框相同

                _this.oXlContent.height(_this.oXlContent.find('.common_selectItem').length * 25);
                _this.oXlContent.find('.common_selectItem').outerWidth(_this.oXlContent.outerWidth() - 2);

                _this.oXlContent.hover(function () {
                    _this.bInContainer = true;
                }, function () {
                    _this.bInContainer = false;
                });

                $.each(_this.oXlUl.find('li'), function (index, value) { //添加下拉选项
                    if ($(this).text().strWidth($(this).css('font-size') + ' ' + $(this).css('font-family')) > $(this).width()) {
                        $(this).tooltip({
                            title: $(this).text(),
                            zIndex: 1000
                        });
                    }
                });

                if (_this.mouseLoction.y + _this.oXlContent.outerHeight() < $(window).height()) { //下拉列表的位置。查出window的可视范围则在输入框上方添加，否则在下方添加
                    _this.oXlContent.css({
                        'top': _this.mouseLoction.y + 'px',
                        'left': _this.mouseLoction.x + 'px',
                        'border': '1px solid #3F8AB9',
                    });
                } else {
                    _this.oXlContent.css({
                        'top': _this.mouseLoction.y - _this.oXlContent.outerHeight() - 1 + 'px',
                        'left': _this.mouseLoction.x + 'px',
                        'border': '1px solid #3F8AB9',
                        // 'border-bottom': 'none',
                    });
                }
                return false;
            });


            return _this;
        }
    });


})(jQuery);

var _urlCommon = window.location.href;


_urlCommon = _urlCommon.substring(0, $.getIndex(_urlCommon, '/', 4) + 1);

