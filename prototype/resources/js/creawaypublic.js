var buroPara = {};

var _url = window.location.href;
_url=_url.substring(0,getIndex(_url,'/',4)+1);
var _baseUrl = _url;
var bmbh,bmmc,dwbh,dwmc,token,userNo,username;

var token = $.getQueryStr('successRedirectUserToken');//用户单位id
$.ajax({
	url:"zhjhUrlAction!mainJson.action",
	data:{"token":"AjQxMTABAAlQNzUyOTcwMjgCAAADAAAEAA4yMDE3MDUxOTAzMTI0OAUABAAAAAoKAAlQNzUyOTcwMjj/AZ4wggGaBgkqhkiG9w0BBwKgggGLMIIBhwIBATELMAkGBSsOAwIaBQAwCwYJKoZIhvcNAQcBMYIBZjCCAWICAQEwYzBbMQswCQYDVQQGEwJjbjELMAkGA1UECBMCemoxCzAJBgNVBAcTAmh6MQ8wDQYDVQQKEwZIdWF5dW4xDTALBgNVBAsTBGNpc3AxEjAQBgNVBAMTCWxvY2FsaG9zdAIEP4OehzAJBgUrDgMCGgUAoF0wGAYJKoZIhvcNAQkDMQsGCSqGSIb3DQEHATAcBgkqhkiG9w0BCQUxDxcNMTcwNTE5MDMxMjQ4WjAjBgkqhkiG9w0BCQQxFgQUjfjuskDw2afEFC3oyvfk+fuDCKgwCwYJKoZIhvcNAQEFBIGAWiQID2M2LwI63uN6Eb8BcP3kVQjQDEpnTJDExjx76gQoj0jURXR7pd8Tl5CW3PpuYKv5CdLrNf6pd2BJj7TxOxPoEoXD/WmbDQgb42A3QumvNTU97kkCT4jil9E2GaEqzzAWA6vetvdfsG6I4DvT6nZf6mJj7YkrG1uBcx+meDs="},
	type:"post",
	dataType:"json",
	success:function(data){
		bmbh=data.bmbh;
		bmmc=data.bmmc;
		dwbh=data.dwbh;
		dwmc=data.dwmc;
		token=data.token;
		userNo=data.userNo;
		username=data.username;			
	}
})

var bDoRefresh = true;
var oHomePage = {
    ifrmIdx:0,
    btnsWidth:0,
    sUserName : '',
    bureauName:'',
    menuClick:function(isSingle){
    	var _this = $(this);
        params.url = [];
        hideDatePicker();
        if(isSingle.toUpperCase()=='Y'){
        	for(var i = 0;i<$('.pub_hisTab').length;i++){
        		if($.trim($('.pub_hisTab').eq(i).attr('url'))==$.trim(_this.attr('resources'))){
        			$('.pub_hisTab').eq(i).trigger('click');
        			return;
        		}
        	}
        }
        
        $('.main_section').find('iframe').hide();
        var iframe = $('<iframe src="" frameborder="0" index="'+oHomePage.ifrmIdx+'" height="100%" width="100%"></iframe>');
        $('.main_section').append(iframe);
        oHomePage.addTab($.trim(_this.text()),_this.attr('resources'));
        if (_this.attr('menu_basecontent')) {
            $('.main_section').addClass('main_sectionOut');
            $.session.get('successRedirectUserToken',function(result){
                iframe[0].src = _this.attr('menu_basecontent') + _this.attr('resources')+((_this.attr('resources').indexOf("?")!=-1)?"&":"?")+"orgNo="+oHomePage.bureauName+"&userNo="+oHomePage.sUserName+"&successRedirectUserToken="+result;
            });
        } else {
            $('.main_section').removeClass('main_sectionOut');
            if (_this.attr('resources')) {
            	if(_this.attr('resources').indexOf('?')>-1){
            		iframe[0].src = _url + _this.attr('resources')+"&userNo="+oHomePage.sUserName;
                }else{
                	iframe[0].src = _url + _this.attr('resources')+"?userNo="+oHomePage.sUserName;
                }
            } else {
                iframe[0].src = _url + 'other.html';
            }
        }
        oHomePage.ifrmIdx++;
    },
    addTab:function(name,url){
        $('.pub_hisTab').css('float','left');
        $('.pub_hisTabInner').find('.pub_hisTabCloseSel').removeClass('pub_hisTabCloseSel');
        var oTab = $('<div class="pub_hisTab pub_hisTabCloseSel">'+name+'</div>');

        oTab.attr('url',url);
        var oTabWidth = parseInt($.trim(name).strWidth(oTab.css('font-size') + ' ' + oTab.css('font-family')))+60;
        oTab.outerWidth(oTabWidth);
        $('.pub_hisTabInner').append(oTab);
        if($('.main_section iframe').last().attr('index')!=0){
            oTab.append($('<div class="pub_hisTabClose fa fa-close"></div>'));
            oTab.contentPopup({
                leaveToRemove:true,
                width:150,
                items:oHomePage.otherPop
            });
        }else{
            oTab.css('padding-right','10px');
            oTabWidth = parseInt($.trim(name).strWidth(oTab.css('font-size') + ' ' + oTab.css('font-family')))+40;
            oTab.outerWidth(oTabWidth);
            oTab.contentPopup({
                leaveToRemove:true,
                width:150,
                items:oHomePage.homePop
            });
        }
        $('.pub_hisTabInner').width($('.pub_hisTabInner').width()+oTabWidth+5);
        if(oTab.offset().left+oTab.outerWidth()>1796){
            $('.pub_hisTabInner').animate({
                left:-(oTab.position().left+oTab.outerWidth()+110-1796),
            });
            $('.pub_hisBtn').css('display','flex');
        }
        oTab.attr('index',$('.main_section iframe').last().attr('index')) ;
    },
    openPage:function(src){
    	removeHomeClass();
        $('iframe[index = '+$('.pub_hisTabCloseSel').attr('index')+']').attr('src',src.indexOf('?')>0?src+"&userNo="+oHomePage.sUserName:src+"?aa=a&userNo="+oHomePage.sUserName);
    },
    closeCurPage:function(oThis){
        var oTab = oThis;
        if($('.pub_hisTab:last').position().left<1700){
            $('.pub_hisTabInner').css({
                'justify-content':'flex-start',
            }).animate({
                left:0,
            });
            $('.pub_hisBtn ').hide();
        }else if(parseInt($('.pub_hisTabInner').css('left'))+oTab.outerWidth()<0){
            $('.pub_hisTabInner').animate({
                left:parseInt($('.pub_hisTabInner').css('left'))+oTab.outerWidth(),
            });
        }else{
            $('.pub_hisTabInner').animate({
                left:0,
            });
        }
        $('iframe[index='+oTab.attr('index')+']').remove();
        if(oTab.hasClass('pub_hisTabCloseSel')){
            oTab.prev().trigger('click');
        }
        oTab.remove();

        return false;
    },
    homePop:[
        {label:'关闭其他页',action:function(){
        	
            $(this).trigger('click');
            $.each($(this).siblings(),function(index,value){
                $('iframe[index='+$(value).attr('index')+']').remove();
                $(value).remove();
            });
            $('.pub_hisTabInner').css({
                'justify-content':'flex-start',
            });
            $('.pub_hisTabInner').outerWidth($('.pub_hisTab').outerWidth()+10)
                .css('left',0);
            $('.pub_hisBtn ').hide();
        }},
    ],
    otherPop:[
        {label:'关闭当前页',action:function(){
        	
            oHomePage.closeCurPage($(this));
        }},
        {label:'关闭其他页',action:function(){
            $(this).trigger('click');
            $.each($(this).siblings(),function(index,value){
                if($(value).attr('index')!=0){
                    $('iframe[index='+$(value).attr('index')+']').remove();
                    $(value).remove();
                }
            });
            $('.pub_hisTabInner').css({
                'justify-content':'flex-start',
            });
            $('.pub_hisTabInner').outerWidth(0);
            $.each($('.pub_hisTab'),function(index,value){
                // var oTabWidth = parseInt($.trim(name).strWidth(oTab.css('font-size') + ' ' + oTab.css('font-family')))+37;
                $('.pub_hisTabInner').outerWidth($('.pub_hisTabInner').outerWidth()+parseInt($.trim($(value).text()).strWidth($(value).css('font-size') + ' ' + $(value).css('font-family')))+60);
            });
            $('.pub_hisTabInner').css('left',0);
            $('.pub_hisBtn ').hide();
        }},
    ],
    animateLeft:function(time){
        console.log();
        if(oHomePage.moving&&$('.pub_hisTab:last').offset().left+$('.pub_hisTab:last').outerWidth()<1796){
            oHomePage.moving=false;
        }
        if(oHomePage.moving){
            $('.pub_hisTabInner').css('left', parseInt($('.pub_hisTabInner').css('left'))-10+'px');
            window.requestNextAnimationFrame(oHomePage.animateLeft);
        }
    },
    animateRight:function(time){
        console.log();
        if(oHomePage.moving&&$('.pub_hisTab:first').offset().left>110){
            oHomePage.moving=false;
        }
        if(oHomePage.moving){
            $('.pub_hisTabInner').css('left', parseInt($('.pub_hisTabInner').css('left'))+10+'px');
            window.requestNextAnimationFrame(oHomePage.animateRight);
        }
    },
    init:function(){
        $('.pub_hisTabInner').on('click','.pub_hisTab',function(){
        	$.each($(this).siblings(),function(index,value){
        		if(!$(value).hasClass('pub_hisTabCloseSel')&&$.trim($(value).text())=='三跨管控'){
        			
        		}
        	});
            $(this).addClass('pub_hisTabCloseSel').siblings().removeClass('pub_hisTabCloseSel');
            $('.main_section iframe').hide();
            if($('iframe[index='+$(this).attr('index')+']').attr('src').indexOf($.baseUrl())==0||$('iframe[index='+$(this).attr('index')+']').attr('src').indexOf('http')<0){
                $('.main_section').removeClass('main_sectionOut');
            }else{
                $('.main_section').addClass('main_sectionOut');
            }
            
            $('iframe[index='+$(this).attr('index')+']').show();
            
        });

        $('.pub_hisTabInner').on('click','.pub_hisTabClose',function(){
            oHomePage.closeCurPage($(this).parent());
            
            return false;
        });
        $('.pub_hisBtn').on({
            mousedown:function(){
                if($(this).hasClass('pub_hisBtnLeft')){
                    if(!oHomePage.moving&&$('.pub_hisTab:last').offset().left+$('.pub_hisTab:last').outerWidth()>1796){
                        oHomePage.moving=true;
                        window.requestNextAnimationFrame(oHomePage.animateLeft);
                    }else if(oHomePage.moving&&$('.pub_hisTab:last').offset().left+$('.pub_hisTab:last').outerWidth()<1796){
                        oHomePage.moving=false;
                    }
                }else{
                    if(!oHomePage.moving&&$('.pub_hisTab:first').offset().left<110){
                        oHomePage.moving=true;
                        window.requestNextAnimationFrame(oHomePage.animateRight);
                    }else if($('.pub_hisTab:first').offset().left>110){
                        oHomePage.moving=false;
                    }
                }
            },
            mouseup:function(){
                $('.pub_hisTabInner').stop(true);
                oHomePage.moving=false;
            }
        });
    },
    moving:false,
};
function publicInit(iframe){
	buroPara.head_pubBuro = '8a812897493378a001495677ad086663';
    buroPara.head_buroType = 0;
    buroPara.head_buroName = '';
    buroPara.head_parentBuro = '';
    var head_header = null;
    var head_funcMenu = null;
    //	var head_dwMenu = null;
    var head_homeMenu = null;
    var head_funcNav = null;
    //	var head_dwNav = null;
    var head_titleBox = null;
    var head_search = null;
    var head_funcoHeight = 0;
    var head_subFuncoHeight = 0;
    var head_topFuncHeight = 0;
//    var head_funcsHeight = '0px';
    var head_navContainer = null;
    var aHeights = [0];
    //	var head_dwsHeight = '';
//   var footer = $('<footer class="pub_footer">COPYRIGHT © 2003-2016 STATE GRID CORPORATION OF CHINA(SGCC). ALL RIGHTS RESERVED</footer>');
//    $('body').append(footer);


    head_header = $('<header class="pub_header"></header>');
    head_titleBox = $('<nav class="pub_titlebox"></nav>');
    $('.main_section').before(head_header);

    head_header.append(head_titleBox);

    head_funcMenu = $('<img class="pub_funcMenuBtn" style="cursor:pointer" src="' + _url + 'resources/img/head/funcmenu.png">');
    head_header.append(head_funcMenu);


    head_homeMenu = $('<img class="pub_homeBtn" style="cursor:pointer" src="' + _url + 'resources/img/head/homeBtn.png">');
    head_header.append(head_homeMenu);
    
    head_navContainer=$('<nav id="pub_navContain"></nav>');
    head_header.append(head_navContainer);
    
    head_funcNav = $('<nav class="pub_menubg" id="funcmenu" ></nav>');
    head_navContainer.append(head_funcNav);

    head_funcNav.append($('<ul class="pub_menuTitleBox"></ul>'));


    head_search = $('<input type="text" class="pub_searchInput" />');
    head_header.append(head_search);

    head_funcNav.append($('<ul class="pub_subTitleListBox"></ul>')); //添加下层目录容器

    head_header.append('<div class="main_timecombox" id="timecombox"></div><span class="main_timelabel"></span><div class="main_time"><div id="start_date"></div></div>');
    // $('.main_section').before('<span class="main_timelabel" id="typhoonText"></span><div class="main_typhoonCombox" id="tfCombox"></div>');
    head_homeMenu.attr({
    	resources:'equip/homeIndex.html',
    	issingle:'Y'
    });
    head_homeMenu.on('click', function() {
        hideDatePicker();
        oHomePage.menuClick.call($(this),'Y');
    });

   
	head_search.hover(function(){
		head_search.css('animation','pub_searchInput_hover 0.5s linear 1 normal 0s forwards');
	},function(){
		head_search.css('animation','');
	}).on('keypress',function(event){ 

        if (event.keyCode == "13") { //页码输入框回车后的事件
        	var inputThis = $(this);
            $(this).blur();
            $.session.get('successRedirectUserToken',function(result){
            	Creaway.component.Window({
    				size:'big',
    	 	   		id:'searchWin',
    				// title:'弹框标题',
    	 	   		url:'http://10.136.35.75:8080/se/se/query?q='+encodeURIComponent(inputThis.val())+'&facet_xtfldm=2&ms=true&lastSelectedIndex=0&pageSize=10&pageIndex=0&successRedirectUserToken='+result,
    			});
            	$('.window_big').show();
    			$('.window_content_big').attr({
    			
    			}).css({
    				'position':'relative',
    				'width':'1735px',
    				'height':'920px',
    			});
            });
            
        }
	});
	$('body').append('<nav class="pub_historyTabs"><div class="pub_hisInnerContainer"><div class="pub_hisTabInner"></div></div><div class="pub_hisBtn pub_hisBtnLeft"></div><div class="pub_hisBtn pub_hisBtnRight"></div></nav>');
	   
    /**********************************加载功能菜单****************************************************/
    //获取功能导航一级菜单列表赋值给 head_funcArr
	//$.getJSON('ServerAction!getServerMenu.action?d=' + new Date(),{  doControl: true }, function(response) {
     //   var head_funcArr = response;
        $.getJSON('data/getServerMenu.json', function (response) {

            var head_funcArr = response.data;
            //console.log("-------1 级标题-----------"+head_funcArr.toString());
        head_navContainer.append('<ul class="head_topMenu"></ul>');
        var funcTitle = null;
        $.each(head_funcArr, function(index, value) {
            funcTitle = $('<li class="pub_topTitle">' + value.name + '</li>');
            funcTitle.attr('uuid', value.uuid);
            $('.head_topMenu').append(funcTitle);
        });
        $('.pub_topTitle').first().trigger('click');
        head_topFuncHeight = $('.pub_topTitle').last().position().top+$('.pub_topTitle').last().outerHeight()+20;
    }).error(function() {
        //      new Creaway.component.Alert({
        //          id:'alertWin',
        //          msg:'获取功能菜单数据失败'
        //      });
    });
    head_navContainer.on('click','.pub_topTitle',function(){
        $(this).addClass('pub_topTitleSel').siblings().removeClass('pub_topTitleSel');
        $('.pub_menuTitle').remove();
        $('#funcmenu .pub_subTitleListBox').remove();
        if($(this).text()=='系统管控'){
        	$('.pub_menuTitleBox').css('display','none');
        	$('.pub_menubg').stop(true).animate({width:'630px'});
        }else{
        	$('.pub_menuTitleBox').css('display','block');
        	$('.pub_menubg').stop(true).animate({width:'730px'});
        }
        //$.getJSON('ServerAction!getServerMenu.action?d=' + new Date(),{ parent_id: $(this).attr('uuid')}, function(response) {
        	$.getJSON('data/getServerMenu.json',{ parent_id: $(this).attr('uuid')}, function(response) {
           // var head_funcArr = response;
            var head_funcArr = response.data0;
            //console.log("-------2 级标题-----------"+head_funcArr.toString());
            //console.log(head_funcArr);
            var funcTitle = null;

            $.each(head_funcArr, function(index, value) {
                funcTitle = $('<li class="pub_menuTitle funcTitle">' + value.name + '</li>');
                funcTitle.attr('uuid', value.uuid);
                $('#funcmenu .pub_menuTitleBox').append(funcTitle);
            });

            $('#funcmenu .pub_menuTitleBox').append($('<h2 class="pub_menuTitle funcTitle" style="height:0;width:10px;border:none;"></h2>'));
            //$('#funcmenu').show();
            head_funcoHeight = $('#funcmenu .pub_menuTitle').last().position().top - 2;
            //$('#funcmenu').hide();
            head_funcsHeight = head_funcoHeight + 'px';
            $('.funcTitle').first().trigger('click');
        }).error(function() {
            //		new Creaway.component.Alert({
            //	   		id:'alertWin',
            //	   		msg:'获取功能菜单数据失败'
            //	   	});
        });
    
    
    });
    //获取功能导航一级菜单列表赋值给 head_funcArr
    
    var iClickCount = 0;
    var iInit = 0;
    $('#funcmenu .pub_menuTitleBox').on('click', '.funcTitle', function() { //给功能导航一级菜单添加点击事件
        // $('.funcTitle').removeClass('pub_menuTitleSel');
        $(this).addClass('pub_menuTitleSel').siblings().removeClass('pub_menuTitleSel');
        var _this = $(this);
        //获取该节点下的子元素 head_funcValArr
        //$.getJSON('ServerAction!getServerMenu.action?d=' + new Date(), { parent_id: $(this).attr('uuid'), level: 2, doControl: true }, function(response) {
         //   var head_funcValArr = response;
            $.getJSON('data/getServerMenu.json', {
                parent_id: $(this).attr('uuid'),
                level: 2,
                doControl: true
            }, function (response) {
                var head_funcValArr = response.data1;
               // console.log(head_funcValArr);
            //$('#funcmenu .pub_subTitleListBox').fadeOut('fast', function() {
                $('#funcmenu .pub_subTitleListBox').remove();

                head_funcNav.append($('<ul class="pub_subTitleListBox"></ul')); //添加下层目录容器


                $.each(head_funcValArr, function(index, value) { //加载二级目录
                    if (value.parent_id == _this.attr('uuid')) {
                        var oSecLi = $($('<li class="pub_menuSubTitleBox" id="t' + value.uuid + '" type="' + (value.type).toUpperCase() + '"><h3 class="pub_menuSubTitle">' + value.name + '</h3><div class="pub_menuSubBox"></div></li>'));
                        $('#funcmenu .pub_subTitleListBox').append(oSecLi);
                        if ((value.type).toUpperCase() == 'URL') {
                            oSecLi.find('h3').css('cursor', 'pointer');
                            oSecLi.on('click', function() {
			    refreshTitle();
                                // console.log(value);
                                if (value.menu_basecontent) {
                                    $('.main_section').addClass('main_sectionOut');
                                    iframe.src = value.menu_basecontent + value.resources;
                                } else {
                                    $('.main_section').removeClass('main_sectionOut');
                                    iframe.src = _url + value.resources;
                                }
                            });
                        }


                    }
                });

                $('#funcmenu .pub_subTitleListBox').append($('<li class="pub_menuSubTitleBox" style="height:0;width:10px;border:none;"></li>'));
                //$('#funcmenu').hide();

                $.each(head_funcValArr, function(index, value) { //加载三级目录
                	//console.log('加载三级目录');
                    if (((value.type).toUpperCase() == 'URL' || (value.type).toUpperCase() == 'DIR') && value.parent_id != _this.attr('uuid')) {
                        if ($('#funcmenu #t' + value.parent_id + '').attr('type') != 'URL') {
                            var h4Title = $('<h4 class="pub_menuSub">' + value.name + '</h4>');
                            var subBox = $('#funcmenu #t' + value.parent_id + ' .pub_menuSubBox');
                            subBox.append(h4Title);
                            h4Title.attr('resources', value.resources)
                        	.attr('menu_type', value.type)
                        	.attr('uuid', value.uuid)
                        	.attr('isSingle', value.issingle?value.issingle:'N')
                        	.attr('menu_basecontent', value.menu_basecontent?value.menu_basecontent:'');
                            if(value.name.length>8){
                                h4Title.tooltip({title: value.name});
                            }
                            h4Title.on('mousemove',function(){
                                $('body').find('.common_tooltip').css('z-index',999);
                            });
                            h4Title.attr('menu_basecontent', value.menu_basecontent);
                            if (parseInt(subBox.children().length % 3) == 1) { //如果三级目录超过三个，则相应二级目录增高
                                subBox.parent().children('.pub_menuSubTitle').css('height', function(index, value) {
                                    if (parseInt(subBox.children().length) == 1) {
                                        return '25px';
                                    }
                                    return parseInt(value) + 27 + 'px';
                                });
                            }
                            subBox.parent().css('height', subBox.parent().children('.pub_menuSubTitle').outerHeight());
                        }
                    }
                });

                $('#funcmenu').show();
                //if(iInit == 0){
                    //$('#funcmenu').find('.pub_menuSub').first().trigger('click');
                 //   iInit++;
                //}
                head_subFuncoHeight = $('#funcmenu .pub_menuSubTitleBox').last().position().top;
                aHeights = [head_topFuncHeight,head_subFuncoHeight+15,head_funcoHeight];
                aHeights.sort(function(a,b){
                	return b-a;
                });
                if (iClickCount == 0) {
                    $('#funcmenu').hide();
                } else {
                    $('#funcmenu').animate({ height: aHeights[0]+'px' }); //如果已经打开了菜单，则根据菜单的高度进行调节高度
                }
                iClickCount++;
                //$('#funcmenu').height($('#funcmenu .pub_menuSubTitleBox').last().position().top);
            });

        }).error(function() {
            //				new Creaway.component.Alert({
            //			   		id:'alertWin',
            //			   		msg:'获取功能菜单数据失败'
            //			   	});
        });;
    //});


    // head_funcsHeight = head_funcoHeight+'px';
    var funcType = '';
    var func_Timer = null;
    $('.pub_funcMenuBtn').on('click',
        function() {
            clearTimeout(func_Timer);
            func_Timer = null;
            funcType = 'in click';
            $('#funcmenu').stop(true);
            $('#funcmenu').fadeTo(1, 0.1)
                .animate({ height: aHeights[0], opacity: '1' });
            // .animate({height :  400});
        }
    );

    $('.pub_funcMenuBtn').on('mouseout', function() {
            func_Timer = setTimeout(function() {
                if (funcType == 'in click') {
                    $('#funcmenu').stop(true);
                    $('#funcmenu').animate({ height: '0', opacity: '0.5' }, 'slow')
                        .fadeTo(1, 0).fadeOut();
                    clearTimeout(func_Timer);
                    func_Timer = null;
                }
            }, 400);

        }

    );

    head_navContainer.hover(
        function() {
            if (funcType != 'in click') {
                clearTimeout(func_Timer);
                func_Timer = null;
                $('#funcmenu').stop(true);
                if ($('#funcmenu').css('opacity') > 0.1) {
                    $('#funcmenu').animate({ height: aHeights[0], opacity: '1' });
                } else {
                    $('#funcmenu').fadeTo(1, 0.1)
                        .animate({ height: aHeights[0], opacity: '1' });
                }

            }
            funcType = 'in over';
        },
        function() {
            $('#funcmenu').stop(true);
            func_Timer = setTimeout(function() {
                $('#funcmenu').animate({ height: '0', opacity: '0.5' }, 'slow')
                    .fadeTo(1, 0).fadeOut();
            }, 500);

        }
    );


    $('#funcmenu ').on('click', '.pub_menuSub', function() { //给三级菜单添加点击事件
  refreshTitle();
        $('#funcmenu .pub_menuSub').removeClass('pub_menuSubSel');
    	removeHomeClass();
        $(this).addClass('pub_menuSubSel'); //.siblings().removeClass('pub_menuSubSel')
        var _this = $(this);
        var _left = 0;
        hideDatePicker();
        //removeHomeClass();

        if(_this.attr('menu_type').toUpperCase() == 'URL'){
        if (_this.attr('menu_basecontent')) {
            $('.main_section').addClass('main_sectionOut');
            iframe.src = _this.attr('menu_basecontent') + _this.attr('resources');
        } else {
            $('.main_section').removeClass('main_sectionOut');
            if (_this.attr('resources')) {
                iframe.src = _url + _this.attr('resources');
            } else {
                iframe.src = _url + 'other.html';
            }
        }
        }

        //alert(_this.attr('menu_type'));
        //add for debug funcmenu by nancy
        head_titleBox.animate({width: '0'}, function () {
            $('.pub_titlebox').remove();
            head_titleBox = $('<nav class="pub_titlebox"></nav>');
            head_header.append(head_titleBox);
            // alert(attr('menu_type').toUpperCase());
            head_titleBox.append('<h3 class="pub_titlehead" style="top:3px; left:6px;width: ' + (_this.html().length * 17 + 40) + 'px;">' + _this.html() + '</h3>');
            head_titleBox.append($('<div class="pub_titleheadline" style="top:0; left:0;width: ' + ($('.pub_titlehead').width() + 20) + 'px;"></div>'));

            removeHomeClass();//默认删除主页class
            _left += $('.pub_titleheadline').outerWidth() - 8;

            if (_this.attr('menu_type').toUpperCase() == 'URL') {
                sOldId = _this.attr('uuid');
                if (_this.attr('resources') != 'equip/homeIndex.html') {
                    head_titleBox.animate({width: '400px'});
                }
                $('.pub_titleheadline').on('click', function () {

                    if (_this.attr('menu_basecontent')) {
                        iframe.src = _this.attr('menu_basecontent') + _this.attr('resources');
                    } else {
                        iframe.src = _url + _this.attr('resources');
                    }

                    hideDatePicker();
                });
                $('.pub_titleheadline').css('cursor', 'pointer');
                if (_this.attr('menu_basecontent')) {
                    iframe.src = _this.attr('menu_basecontent') + _this.attr('resources');
                } else {
                    iframe.src = _url + _this.attr('resources');
                }
            } else {

                sOldPId = _this.attr('uuid');
                //				$('.pub_titleheadline').off('click');
                head_titleBox.append('<div class="pub_titleupline" style="top:1px; left:' + ($('.pub_titleheadline').outerWidth()) + 'px;width: 0;"></div>');
                var titleupline = $('.pub_titleupline');
                //获取该节点下的子元素 head_titleArr

                $.getJSON('data/getServerMenu.json', {parent_id: $(_this).attr('uuid')}, function (response) {
                    var head_titleArr = response.data2;


                    var parent_id = $(_this).attr('uuid');//add for function menu debug by nancy
                    var i = 0;//add for function menu debug by nancy
                    $.each(head_titleArr, function (index, value) {
                        //refreshTabTaitle(value);//add for debug funcmenu by nancy

                        var pub_title4 = null;
                        if (value.parent_id == parent_id) {
                            if (i != 0) {//if (index != 0)

                                pub_title4 = $('<h4 class="pub_title4" style="top:7px; left:' + _left + 'px;width: ' + (((value.name).length + 3) * 17) + 'px;">' + value.name + '</h4>');
                                head_titleBox.append(pub_title4);
                                _left += pub_title4.outerWidth() - 8;
                                titleupline.width((titleupline.width() + (pub_title4.width() - 1)) + 'px');
                            } else {
                                i++;

                                pub_title4 = $('<h4 class="pub_title4head pub_title4headsel" style="top:7px; left:' + _left + 'px;width: ' + (((value.name).length + 3) * 17) + 'px;">' + value.name + '</h4>');
                                head_titleBox.append(pub_title4);
                                _left += pub_title4.outerWidth() - 8;
                                titleupline.width((titleupline.width() + (pub_title4.width() - 20)) + 'px');
                                if (value.menu_basecontent) {
                                    iframe.src = value.menu_basecontent + value.resources;
                                } else {
                                    iframe.src = _url + value.resources;
                                }

                            }

                            pub_title4.attr('resources', value.resources);
                            pub_title4.attr('menu_basecontent', value.menu_basecontent);
                        }
                    });

                    head_titleBox.animate({width: (titleupline.outerWidth() + $('.pub_titleheadline').outerWidth() + 40) + 'px'});

                }).error(function () {
                    //						new Creaway.component.Alert({
                    //					   		id:'alertWin',
                    //					   		msg:'获取功能菜单数据失败'
                    //					   	});
                });
            }

        });
        // // add for debug funcmenu by nancy
    });


    /*四级标题的点击事件*/
    head_header.on('click', '.pub_title4', function () {

        // $('.pub_title4').removeClass('pub_title4sel');
        $('.pub_title4head').removeClass('pub_title4headsel');
        $(this).addClass('pub_title4sel').siblings().removeClass('pub_title4sel');
        hideDatePicker();
        //removeHomeClass();
        if ($(this).attr('menu_basecontent')) {
            //			$('.main_section').addClass('main_sectionOut');
            iframe.src = $(this).attr('menu_basecontent') + $(this).attr('resources');
        } else {
            $('.main_section').removeClass('main_sectionOut');
            if ($(this).attr('resources')) {
                iframe.src = _url + $(this).attr('resources');
            } else {
                iframe.src = _url + 'other.html';
            }
        }
        // alert($(this).attr('resources'));
    });
    head_header.on('click', '.pub_title4head', function () {

        $('.pub_title4').removeClass('pub_title4sel');
        // $('.pub_title4head').removeClass('pub_title4headsel');
        $(this).addClass('pub_title4headsel');
        hideDatePicker();
        //removeHomeClass();
        if ($(this).attr('menu_basecontent')) {
            //			$('.main_section').addClass('main_sectionOut');
            iframe.src = $(this).attr('menu_basecontent') + $(this).attr('resources');
        } else {
            $('.main_section').removeClass('main_sectionOut');
            if ($(this).attr('resources')) {
                iframe.src = _url + $(this).attr('resources');
            } else {
                iframe.src = _url + 'other.html';
            }
        }
        // alert($(this).attr('resources'));
    });
}

//刷新页面tab页
//data.parentName 父节点名称 如果
//data.parentId   父节点id
//data.id       要跳转页面id
//data.name     要跳转页面的名称
//data.parentType  -- dir or url
// 如果父节点需要点击指定其url 如果不需要指定则设为null

function refreshTitle(data) {
    // alert(_this.attr('menu_type'));
    var _left = 0;
    //	$('.pub_titleheadline').off('click');
    //	alert(data.id);
    bDoRefresh = true;
    if (data) {


        $('.pub_titlebox').stop(true);
        $('.pub_titlebox').animate({width: '1'}, function () {
            $('.pub_titlebox').remove();
            $('.pub_header').append($('<nav class="pub_titlebox"></nav>'));
            $('.pub_titleheadline').css('cursor', 'default');
            // alert(_this.attr('menu_type').toUpperCase());
            if (data.parentType.toUpperCase() == 'URL') {
                $('.pub_titlebox').append('<h3 class="pub_titlehead" style="top:3px; left:6px;width: ' + ((data.name).length * 17 + 40) + 'px;">' + data.name + '</h3>');
                $('.pub_titlebox').append($('<div class="pub_titleheadline" style="top:0; left:0;width: ' + ($('.pub_titlehead').width() + 20) + 'px;"></div>'));
                $('.pub_titlebox').animate({width: '400px'});

                // if(data.parentURL){
                // 	$('.pub_titleheadline').css('cursor','pointer');
                // 	$('.pub_titleheadline').on('click',titleHeadClick);
                // }

                if ($.trim(data.name) != '总览') {
                    $('.pub_searchInput').hide();
                } else {
                    $('.pub_searchInput').show();
                }
            } else {

                $('.pub_searchInput').hide();
                //				if(data.parentName=='一级文件夹'){
                //					$('.pub_searchInput').show();
                //				}
                $('.pub_titlebox').append('<h3 class="pub_titlehead" style="top:3px; left:6px;width: ' + ((data.parentName).length * 17 + 40) + 'px;">' + data.parentName + '</h3>');
                $('.pub_titlebox').append($('<div class="pub_titleheadline" style="top:0; left:0;width: ' + ($('.pub_titlehead').width() + 20) + 'px;"></div>'));

                _left += $('.pub_titleheadline').outerWidth() - 8;
                $('.pub_titlebox').append('<div class="pub_titleupline" style="top:2px; left:' + ($('.pub_titleheadline').outerWidth()) + 'px;width: 0;"></div>');
                var titleupline = $('.pub_titleupline');
                var sDoControl = data.control ? data.control : 'false';
                //获取该节点下的子元素 head_titleArr
                $.getJSON('data/getServerMenu.json', {
                    parent_id: data.parentId,
                    doControl: sDoControl
                }, function (response) {
                    var head_titleArr = response;
                    $.each(head_titleArr, function (index, value) {
                        var pub_title4 = null;
                        if (index != 0) {
                            pub_title4 = $('<h4 class="pub_title4" style="top:7px; left:' + _left + 'px;width: ' + (((value.name).length + 3) * 17) + 'px;">' + value.name + '</h4>');
                            $('.pub_titlebox').append(pub_title4);
                            _left += pub_title4.outerWidth() - 8;
                            titleupline.width((titleupline.width() + (pub_title4.width() - 1)) + 'px');
                            if (value.uuid == data.id) {
                                pub_title4.addClass('pub_title4sel');
                            }
                        } else {
                            pub_title4 = $('<h4 class="pub_title4head" style="top:7px; left:' + _left + 'px;width: ' + (((value.name).length + 3) * 17) + 'px;">' + value.name + '</h4>');
                            $('.pub_titlebox').append(pub_title4);
                            _left += pub_title4.outerWidth() - 8;
                            titleupline.width((titleupline.width() + (pub_title4.width() - 20)) + 'px');
                            if (value.uuid == data.id) {
                                pub_title4.addClass('pub_title4headsel');
                            }
                        }

                        pub_title4.attr('resources', value.resources);
                        pub_title4.attr('menu_basecontent', value.menu_basecontent);
                    });
                    $('.pub_titlebox').animate({width: (titleupline.outerWidth() + $('.pub_titleheadline').outerWidth() + 40) + 'px'});

                    /*四级标题的点击事件*/
                    $('.pub_titlebox').on('click', '.pub_title4', function () {
                        bDoRefresh = false;
                        // $('.pub_title4').removeClass('pub_title4sel');
                        $('.pub_title4head').removeClass('pub_title4headsel');
                        $(this).addClass('pub_title4sel').siblings().removeClass('pub_title4sel');
                        hideDatePicker();
                        //removeHomeClass();
                        if ($(this).attr('menu_basecontent')) {
                            $('.main_section>iframe').attr('src', $(this).attr('menu_basecontent') + $(this).attr('resources'));
                        } else {
                            if ($(this).attr('resources')) {
                                iframe.src = _url + $(this).attr('resources');
                            } else {
                                iframe.src = _url + 'other.html';
                            }
                        }

                        // alert($(this).attr('resources'));
                    });
                    $('.pub_titlebox').on('click', '.pub_title4head', function () {
                        bDoRefresh = false;
                        $('.pub_title4').removeClass('pub_title4sel');
                        // $('.pub_title4head').removeClass('pub_title4headsel');
                        $(this).addClass('pub_title4headsel');
                        hideDatePicker();
                        //removeHomeClass();
                        if ($(this).attr('menu_basecontent')) {
                            $('.main_section>iframe').attr('src', $(this).attr('menu_basecontent') + $(this).attr('resources'));
                        } else {
                            if ($(this).attr('resources')) {
                                iframe.src = _url + $(this).attr('resources');
                            } else {
                                iframe.src = _url + 'other.html';
                            }
                        }
                        // alert($(this).attr('resources'));
                    });

                    // if(data.parentURL){
                    // 	$('.pub_titleheadline').css('cursor','pointer');
                    // 	$('.pub_titleheadline').on('click',titleHeadClick);
                    // }

                });
            }

        });
    } else {

        $('.pub_searchInput').hide();
        $('.pub_titlebox').animate({width: '0'}, function () {
            $('.pub_titlebox').remove();
            $('.pub_header').append($('<nav class="pub_titlebox"></nav>'));
            $('.pub_titleheadline').css('cursor', 'default');
        });
    }


    function titleHeadClick() {
        hideDatePicker();
        //removeHomeClass(); //默认删除主页class
        $('.main_section>iframe').attr('src', _url + data.parentURL);
        if (data.thisName) {
            $('.pub_titlebox').animate({width: '0'}, function () {
                $('.pub_titlebox').remove();
                $('.pub_header').append($('<nav class="pub_titlebox"></nav>'));
                if (data.thisParentType.toUpperCase() == 'URL') {
                    $('.pub_titlebox').append('<h3 class="pub_titlehead" style="top:3px; left:6px;width: ' + ((data.thisName).length * 17 + 40) + 'px;">' + data.thisName + '</h3>');
                    $('.pub_titlebox').append($('<div class="pub_titleheadline" style="top:0; left:0;width: ' + ($('.pub_titlehead').width() + 14) + 'px;"></div>'));
                    $('.pub_titlebox').animate({width: '400px'});
                    $('.pub_titleheadline').css('cursor', 'pointer');
                    $('.pub_titlebox').on('click', '.pub_titleheadline', function () {
                        $('.main_section>iframe').attr('src', _url + data.parentURL);
                    });
                } else {

                }
            });
        }
    }

}

function getDoRefresh() {
    setTimeout(function () {
        bDoRefresh = true;
    }, 300);
    return bDoRefresh;
}

//获取首页弹出款
function openWin(obj){
	var win = new Creaway.component.Window(obj);
	return win;
}

//显示右上角日期
function showDatePicker(paras){
	var datePicker = null;
	var initValue = '';
	if(paras.initValue){
		initValue = paras.initValue;
	}
	if(paras.dateFmt){
		datePicker = new Creaway.component.DatePicker({
			renderTo : 'start_date',
			width : 150,
			readOnly : false,
			dateFmt : paras.dateFmt,//'yyyy/MM'
			onsearch:paras.onsearch,
			initValue:initValue
		});
	}
	if(paras.label){
		$('.main_timelabel').html(paras.label);
	}
	if(paras.term){
		$('.main_timelabel').html('');
		var ComboBox = new Creaway.component.ComboBox({
			renderTo:'timecombox',
	 		width:100,
	 		height:25,
	 		maxHeight:150,
			disabled: false,
	// 		readOnly:true,
			tsxx:'下拉栏数据为空',
			initValue:paras.index,
			handler: function(){
				$('#start_date').children().remove();
				datePicker = new Creaway.component.DatePicker({
					renderTo : 'start_date',
					width : 150,
					readOnly : false,
					dateFmt : ComboBox.getValue(),//'yyyy/MM'
					onsearch: paras.onsearch,
					initValue:''
				});
			},
			data : paras.term
		});
		$('#start_date').children().remove();
		datePicker = new Creaway.component.DatePicker({
			renderTo : 'start_date',
			width : 150,
			readOnly : false,
			dateFmt : ComboBox.getValue(),//'yyyy/MM'
			onsearch: paras.onsearch,
			initValue:initValue
		});
	}
	return datePicker;
}

//隐藏右上角弹出框
function hideDatePicker(){
	$('.main_timelabel').html('');
	$('#start_date').children().remove();
	$('#timecombox').children().remove();
}

function getIndex(str,char,len){
	var index = 0;
	for(var i = 0; i<len; i++){
		index = str.indexOf(char,index+1);
	}
	return index;
}

//获取基本url
function getURLHead(){
	return _url;
}

//获取部门jsonObj
function getBuroPara(){
	return buroPara;
}

//获取部门代码
function getBuro(){
	return buroPara.head_pubBuro;
}

//获取部门类型
function getBuroType(){
	return buroPara.head_buroType;
}

//获取部门名称
function getBuroName(){
	return buroPara.head_buroName;
}

//获取地市代码
function getParentBuro(){
	return buroPara.head_parentBuro;
}

//切换内页url
function changURL(URL){
	$('.main_section>iframe').get(0).src=URL;
}

//删除首页CSS样式
function removeHomeClass(){
	$('.pub_searchInput').hide();
	$('.main_body').removeClass('main_body_home');
	$('.main_section').removeClass('main_section_home');
}

//添加首页CSS样式
function addHomeClass(){
	$('.pub_searchInput').show();
	$('.main_body').addClass('main_body_home');
	$('.main_section').addClass('main_section_home');
	if($('.pub_titlebox')){
		$('.pub_titlebox').animate({width : '0'},function(){
			$('.pub_titlebox').remove();
			$('.pub_header').append($('<nav class="pub_titlebox"></nav>'));
		});
	}
}

//关闭弹出框
function closeSubWin(){
	$('.window_big').last().remove();
	$('.loadMask').last().remove();
}

//修改当前部门信息,用于首页点击地图时全局切换部门
function changeBuroInfo(oBruoInfo){
	buroPara.head_pubBuro = oBruoInfo.buro;
	buroPara.head_buroType = oBruoInfo.burotype;
	buroPara.head_buroName = oBruoInfo.buroName;
	buroPara.head_parentBuro = oBruoInfo.parentBuro;
	if(buroPara.head_buroName.indexOf('国网')>=0){
		$('.pub_buroName').html(buroPara.head_buroName);
	}else{
		$('.pub_buroName').html('国网'+buroPara.head_buroName);
	}
	
}

//注销
function logout(){
	var logout = $('<div class="logout"><span class="logout_left"></span><div class="logout_right"></div></div>');
	$('.pub_header').append(logout);
	$('.logout_right').click(function(){
//		location.href=_url+"j_spring_security_logout";
		$.ajax({
	        type: 'post',
	        url: "LoginAction!logout.action" ,
	        success:function(response){
	        	location.href=response;
	        }
		});
	});
	$(".logout_left").html("陈蕾");
	$.ajax({
        type: 'post',
        url: "LoginAction!getLoginName.action" ,
        success:function(response){
        	//$(".logout_left").html(response);
        }
	});
	
}

//-----------------------------------xuhaijun 台风下拉框-------------------------------------------
var tfcheckedValue = "";
function showTyhoonCombo(){
	$('#typhoonText').html('台风：');
	$.ajax({
        type: 'POST',
        async:false,
        url: 'typhoonAction!getTfCombo.action?dt='+new Date() ,
        error:function(){
        	alert("台风下拉框获取数据失败");
        },
        success:function(data){
        	if(tfcheckedValue==""){
        		tfcheckedValue= eval(data)[0][1];
        	}
			var ComboBox = new Creaway.component.ComboBox({
				renderTo:'tfCombox',
		 		width:150,
		 		height:25,
		 		maxHeight:150,
				disabled: true,
		// 		readOnly:true,
				tsxx:'下拉栏数据为空',
				setValue:tfcheckedValue,
				handler: function(){
					if(iframe.contentWindow.changeTf){
						iframe.contentWindow.changeTf(ComboBox.getValue());
						tfcheckedValue=ComboBox.getValue();
					}
				},
				data :  eval(data)
			});
        }
	});
}

function hideTyphoonCombo(){
	$('#typhoonText').html('');
	$('#tfCombox').children().remove();
}

function getFxyjid(){
	return tfcheckedValue;
}
/*设置index*/
function changeZIdex(v){
	$('.loadMask').css("z-index",v);
}

//-----------------------------------刷新标题1-------------------------------------------
function refreshTabTaitle(data) {
    var _left = 0;
    bDoRefresh = true;
    if (data) {
        $('.pub_titlebox').stop(true);
        $('.pub_titlebox').animate({ width: '1' }, function() {
            $('.pub_titlebox').remove();
            $('.pub_header').append($('<nav class="pub_titlebox" style="top:0;left:115px"></nav>'));
            $('.pub_titleheadline').css('cursor', 'default');
            // alert(_this.attr('menu_type').toUpperCase());
            if (data.parentType.toUpperCase() == 'URL') {
                $('.pub_titlebox').append('<h3 class="pub_titlehead" style="top:3px; left:6px;width: ' + ((data.name).length * 17 + 40) + 'px;">' + data.name + '</h3>');
                $('.pub_titlebox').append($('<div class="pub_titleheadline" style="top:0; left:0;width: ' + ($('.pub_titlehead').width() + 20) + 'px;"></div>'));
                $('.pub_titlebox').animate({ width: '400px' });
                // console.log(data);
                // if(data.parentURL){
                // 	$('.pub_titleheadline').css('cursor','pointer');
                // 	$('.pub_titleheadline').on('click',titleHeadClick);
                // }
            } else {
                $('.pub_titlebox').append('<h3 class="pub_titlehead" style="top:3px; left:6px;width: ' + ((data.parentName).length * 17 + 40) + 'px;">' + data.parentName + '</h3>');
                $('.pub_titlebox').append($('<div class="pub_titleheadline" style="top:0; left:0;width: ' + ($('.pub_titlehead').width() + 20) + 'px;"></div>'));

                _left += $('.pub_titleheadline').outerWidth() - 8;
                $('.pub_titlebox').append('<div class="pub_titleupline" style="top:2px; left:' + ($('.pub_titleheadline').outerWidth()) + 'px;width: 0;"></div>');
                var titleupline = $('.pub_titleupline');
                //获取该节点下的子元素 head_titleArr
                //$.getJSON('ServerAction!getServerMenu.action?d=' + new Date(), { parent_id: data.parentId }, function(response) {
                $.getJSON('data/getServerMenu.json', { parent_id: data.parentId }, function(response) {
                    //var head_titleArr = response;
                    var head_titleArr = response.data2;
                    console.log(head_titleArr);
                    console.log("--------四级标题加载----------");
                    $.each(head_titleArr, function(index, value) {
                        var pub_title4 = null;
                        if (index != 0) {
                            pub_title4 = $('<h4 class="pub_title4" style="top:7px; left:' + _left + 'px;width: ' + (((value.name).length + 3) * 17) + 'px;">' + value.name + '</h4>');
                            $('.pub_titlebox').append(pub_title4);
                            _left += pub_title4.outerWidth() - 8;
                            titleupline.width((titleupline.width() + (pub_title4.width() - 1)) + 'px');
                            if (value.uuid == data.id) {
                                pub_title4.addClass('pub_title4sel');
                            }
                        } else {
                            pub_title4 = $('<h4 class="pub_title4head" style="top:7px; left:' + _left + 'px;width: ' + (((value.name).length + 3) * 17) + 'px;">' + value.name + '</h4>');
                            $('.pub_titlebox').append(pub_title4);
                            _left += pub_title4.outerWidth() - 8;
                            titleupline.width((titleupline.width() + (pub_title4.width() - 20)) + 'px');
                            if (value.uuid == data.id) {
                                pub_title4.addClass('pub_title4headsel');
                            }
                        }

                        pub_title4.attr('resources', value.resources);
                        pub_title4.attr('menu_basecontent', value.menu_basecontent);
                    });
                    $('.pub_titlebox').animate({ width: (titleupline.outerWidth() + $('.pub_titleheadline').outerWidth() + 40) + 'px' });

                    /*四级标题的点击事件*/
                    $('.pub_titlebox').on('click', '.pub_title4', function() {
                        bDoRefresh = false;
                        // $('.pub_title4').removeClass('pub_title4sel');
                        $('.pub_title4head').removeClass('pub_title4headsel');
                        $(this).addClass('pub_title4sel').siblings().removeClass('pub_title4sel');
                        hideDatePicker();
                        console.log("-------四级标题 clicked---------------");
                        if ($(this).attr('menu_basecontent')) {
                            $('.main_idxsection>iframe').attr('src', $(this).attr('menu_basecontent') + $(this).attr('resources'));
                        } else {
                            $('.main_idxsection>iframe').attr('src', _url + $(this).attr('resources'));
                        }

                        // alert($(this).attr('resources'));
                    });
                    $('.pub_titlebox').on('click', '.pub_title4head', function() {
                        bDoRefresh = false;
                        $('.pub_title4').removeClass('pub_title4sel');
                        // $('.pub_title4head').removeClass('pub_title4headsel');
                        $(this).addClass('pub_title4headsel');
                        hideDatePicker();
                        if ($(this).attr('menu_basecontent')) {
                            $('.main_idxsection>iframe').attr('src', $(this).attr('menu_basecontent') + $(this).attr('resources'));
                        } else {
                            $('.main_idxsection>iframe').attr('src', _url + $(this).attr('resources'));
                        }
                        // alert($(this).attr('resources'));
                    });

                    // if(data.parentURL){
                    // 	$('.pub_titleheadline').css('cursor','pointer');
                    // 	$('.pub_titleheadline').on('click',titleHeadClick);
                    // }

                });
            }

        });
    } else {
        $('.pub_titlebox').animate({ width: '0' }, function() {
            $('.pub_titlebox').remove();
            $('.pub_header').append($('<nav class="pub_titlebox"></nav>'));
            $('.pub_titleheadline').css('cursor', 'default');
        });
    }


    function titleHeadClick() {
        hideDatePicker();
        removeHomeClass(); //默认删除主页class
        $('.main_section>iframe').attr('src', _url + data.parentURL);
        if (data.thisName) {
            $('.pub_titlebox').animate({ width: '0' }, function() {
                $('.pub_titlebox').remove();
                $('.pub_header').append($('<nav class="pub_titlebox"></nav>'));
                if (data.thisParentType.toUpperCase() == 'URL') {
                    $('.pub_titlebox').append('<h3 class="pub_titlehead" style="top:3px; left:6px;width: ' + ((data.thisName).length * 17 + 40) + 'px;">' + data.thisName + '</h3>');
                    $('.pub_titlebox').append($('<div class="pub_titleheadline" style="top:0; left:0;width: ' + ($('.pub_titlehead').width() + 14) + 'px;"></div>'));
                    $('.pub_titlebox').animate({ width: '400px' });
                    $('.pub_titleheadline').css('cursor', 'pointer');
                    $('.pub_titlebox').on('click', '.pub_titleheadline', function() {
                        $('.main_section>iframe').attr('src', _url + data.parentURL);
                    });
                } else {

                }
            });
        }
    }

}
