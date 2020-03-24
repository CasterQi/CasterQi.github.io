function isWeChat() {
    var ua = navigator.userAgent.toLowerCase();
    var isWeixin = ua.indexOf('micromessenger') != -1;
    if (isWeixin) {
        return true;
    } else {
        return false;
    }
}
var isWeChat_jq = isWeChat()
var Item = [];
// Item = [{
//         "id": "0",
//         'name': '时尚洋装连衣裙',
//         'tb': 'https://item.taobao.com/item.htm?id=594352164056',
//         'wx': 'https://mp.weixin.qq.com/s/wsIk3J0NxI-2VCAua-_0Lg',
//         'img': 'https://img.alicdn.com/imgextra/i3/173939715/O1CN01RYIT232LdWJ7Q51pH_!!173939715.jpg',
//         // 'video': ''
//     },
//     {
//         "id": "1",
//         'name': '时尚洋装连衣裙',
//         'tb': 'https://item.taobao.com/item.htm?id=594352164056',
//         'wx': 'https://mp.weixin.qq.com/s/wsIk3J0NxI-2VCAua-_0Lg',
//         'img': 'https://img.alicdn.com/imgextra/i3/173939715/O1CN01RYIT232LdWJ7Q51pH_!!173939715.jpg',
//        // 'video': ''
//     },
//     {
//         "id": "2",
//         'name': 'BY054-儿童翻领短袖T恤',
//         'tb': 'https://item.taobao.com/item.htm?id=594353324318',
//         'wx': 'https://mp.weixin.qq.com/s/oc8fny-K_O4qE3aWs_mtyA',
//         'img': 'https://gd3.alicdn.com/imgextra/i3/173939715/O1CN01o7MrLa2LdWJ86Yz7F_!!173939715.jpg',
//         //'video': ''
//     }
// ]




// '
// <div  class="am-g"> <div class="am-u-sm-7">    </div> <div class="am-u-sm-5"><div v-bind:src="makeCode(todo.tb)" id="qrcode" style="width:100px; height:100px; "></div></div></div>
//                                     '

var searchKey = ''
var flag_isTopOpened = false
$().ready(function () {
    $('#jq-input').on("keydown", function (event) {
        var e = event || window.event || arguments.callee.caller.arguments[0];
        if (e && e.keyCode == 13) {
            console.log('key down');
            jq_search()
        }
    });

    getarr()
    $('#jq-btn').click(() => {
        jq_search()
        // if (!searchKey) {          
        // } else {
        //     console.log("无输入");
        //     //$('#my-alert1').modal()
        // }
    })


    $('#jq-topOpenner').click(() => {
        if (!flag_isTopOpened) {
            $('#jq-topOpenner-btn').attr('class', 'am-icon-close')
            flag_isTopOpened = true
            //console.log(flag_isTopOpened);

        } else {
            $('#jq-topOpenner-btn').attr('class', 'am-icon-search')
            flag_isTopOpened = false
        }
    })

    // $('#tblink').click(()=>{
    //     var link=$('#tblink').attr('alt')
    //     if(isWeChat_jq){
    //         console.log('WeChat_login')
    //     }else{
    //         console.log('WeChat_login')
    //         window.location.replace(link);
    //     }
    // })
})
//endReady
var easter_egg_count = 1
function easter_egg(){
    easter_egg_count++
    if(easter_egg_count>5){
        window.location.href = "../"
    }
}
function imgAlert(id) { //查看大图
    console.log('imgAlert');
    var link = $('#tbqrboxq' + id).attr('img-src')
    if ($('#imgboxq3').find('img').length > 0) {
        $('#imgboxq3').find('img').remove()
    }
    $('#imgboxq3').append('<img src="' + link + '">')
    //$('#imgboxq3').attr('src',link)
    $('#imgboxq3').find('img').attr('width', (window.screen.width - 30 < 690) ? window.screen.width - 30 : 580)
    //console.log('imgAlert'+ $('#imgboxq3')+link);
    $('#my-popup').modal()
}

function pdfAlert(id) { 
    console.log('pdfAlert');
    var link = "BQ026.pdf"
    
    // var link = $('#tbqrboxq' + id).attr('img-src')
    if ($('#pdfq').length > 0) {
        $('#pdfq').remove()
        console.log("pdfbox removed")
    }
    // $('#imgboxq3').append('<img src="' + link + '">')
    // //$('#imgboxq3').attr('src',link)
    // $('#imgboxq3').find('img').attr('width', (window.screen.width - 30 < 690) ? window.screen.width - 30 : 580)
    // //console.log('imgAlert'+ $('#imgboxq3')+link);
   
    // $('#pdfboxq').append('<iframe id = "pdfq" src="' + link + '">')
    $('#pdfboxq').append('<iframe id = "pdfq" src="../pdfDemo/web/viewer.html?name=../../../pdf/' + link + '">')
    $('#my-popup2').modal()
    $('#pdfq').width($("#pdfboxq").parent().width() - 32)
    $('#pdfq').height($("#pdfboxq").parent().height() - 38)

}

function tblink(id) {
    //isWeChat_jq =true//手机端绘制二维码
    console.log('tblink' + id)
    var link = $('#dataq' + id).attr('tb-src')
    if (isWeChat_jq) {
        var weChat_qrbox = $("#weChat_qrbox")
        console.log(weChat_qrbox);

        if (weChat_qrbox.find('canvas').length > 0) {
            weChat_qrbox.find('canvas').remove()
            console.log('findcanvas id=' + id);
        }
        if (weChat_qrbox.find('img').length > 0) {
            weChat_qrbox.find('img').remove()
        }
        weChat_qrbox.qrcode({
            render: "canvas", //table方式 
            width: 192, //宽度 
            height: 192, //高度 
            text: link //任意内容 
        });
        weChat_qrbox.find('canvas').attr('id', 'jq-hide')
        $('#my-alert3').modal()
        $("#my-alert3").css("margin-top", "-200px")

        weChat_qrbox.append(convertCanvasToImage(weChat_qrbox.find('canvas')[0]))
        //console.log(convertCanvasToImage(weChat_qrbox.find('canvas')[0]));

    } else {
        window.location.href = link;
    }
}

function wxshop(id){
    if($('#dataq'+id).attr('wx-src')){
        window.location.href = $('#dataq' + id).attr('wx-src')
    }else{
        $('#my-alert4').modal()
    }

}

function wxshopinit() {
    console.log('wxshopinit' )
    for(var i=0;i<Item.length;i++){
        if(!$('#dataq'+Item[i].id).attr('wx-src')){
            $('#wxshop'+Item[i].id).css('background-color',"#e6e6e6")
            //$('#wxshop'+Item[i].id).attr('disabled',true)
            $('#wxshop'+Item[i].id).css('opacity',0.4)
        }else{
            $('#wxshop'+Item[i].id).css('background-color',"#f58b8b")
            $('#wxshop'+Item[i].id).css('opacity',1)
            //$('#wxshop'+Item[i].id).attr('disabled',false)   
        }
    }
}

function wxshopReset(){
    console.log('wxshopReset')
    for(var i=0;i<Item.length;i++){            
    }
}

function convertCanvasToImage(canvas) {
    var image = new Image();
    image.src = canvas.toDataURL("image/png");
    return image;
}

function jq_search() {
    searchKey = $("#jq-input").val()
    
    function stripscript(s) {
        var pattern = new RegExp("[\\u5b50\\s`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）——|{}【】‘；：”“'。，、？]")
        var rs = "";
        for (var i = 0; i < s.length; i++) {
            rs = rs + s.substr(i, 1).replace(pattern, '');
        }
        return rs
    }

    //var reg = new RegExp("^[^\u4e00-\u9fa5_a-zA-Z0-9]+$", "g")

    searchKey = stripscript(searchKey)
    $('#my-alert2').modal()
    //alert(searchKey)
    scrollTo(0, 0)
    //scrollTop()
    getarr(searchKey)
}
//     $(document).ready(function() {     
//             $("img.lazy-load").lazyload({ 
// 　　　　　　　　　　effect : "fadeIn", //渐现，show(直接显示),fadeIn(淡入),slideDown(下拉)
// 　　　　　　　　　　threshold : 180, //预加载，在图片距离屏幕180px时提前载入
// 　　　　　　　　　　event: 'click',  // 事件触发时才加载，click(点击),mouseover(鼠标划过),sporty(运动的),默认为scroll（滑动）
// 　　　　　　　　　　container: $("#container"), // 指定对某容器中的图片实现效果
// 　　　　　　　　　　//failure_limit ：2 //加载2张可见区域外的图片,lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况
// 　　　　　　　　}); 
// 　　　　　　});


Vue.component('todo-item', {
    // todo-item 组件现在接受一个
    // "prop"，类似于一个自定义特性。
    // 这个 prop 名为 todo。
    props: ['todo'],
    template: '  <li  class="am-g am-list-item-desced am-list-item-thumbed am-list-item-thumb-left "> <div class="am-u-sm-5 am-u-md-3 am-list-thumb"  id="imgboxq"><a :href="todo.wx"><img class="am-thumbnail lazy-load" v-bind:data-original="todo.img"/></a></div><div class=" am-u-sm-7 am-u-md-9 am-list-main"><h2 class="am-list-item-hd"><a>&nbsp<b>{{todo.name}}</b> </a></h2><hr>\r<div class="am-g"><div class="am-u-sm-6"><h3><a  v-bind:onclick="\'imgAlert(\'+todo.id+\')\'"><button class="am-btn am-btn-default  am-input-sm am-round jq-btn5"><span class="am-icon-file-excel-o"></span>&nbsp&nbsp设计图纸</button></a></h3>\r<h3><a v-bind:onclick="\'pdfAlert(\'+todo.id+\')\'"><button class="am-btn am-btn-default  am-input-sm am-round jq-btn5"><span class="am-icon-file-pdf-o"></span>&nbsp&nbsp详情介绍 </button></a></h3>\r<h3><a :href="todo.wx"><button class="am-btn am-btn-default  am-input-sm am-round jq-btn5"><span class="am-icon-file-image-o"></span>&nbsp&nbsp更多图片 </button></a></h3>\r<h3 class="am-hide-sm-only"><a :href="todo.wx"><button class="am-btn am-btn-default  am-input-sm am-round jq-btn5"><span class="am-icon-download"></span>&nbsp&nbsp工程文件 </button></a></h3>\r</div><div class="am-u-sm-6"><h3><a :href="todo.wx"><button class="am-btn am-btn-default  am-input-sm am-round jq-btn3"><span class="am-icon-book"></span>&nbsp&nbsp阅读教程 </button></a></h3>\r<div class="" ><h3><a href="javascript:;"  v-bind:onclick="\'tblink(\'+todo.id+\')\'"><button id="tblink" class="am-btn am-btn-default  am-input-sm am-round jq-btn2"><span class="iconfont icon-taobao"></span>&nbsp淘宝链接</button></a></h3></div><div class="" ><h3><a href="javascript:;"  v-bind:onclick="\'wxshop(\'+todo.id+\')\'"><button  v-bind:id="\'wxshop\'+todo.id"  class="am-btn am-btn-default  am-input-sm am-round jq-btn4"><span class="am-icon-weixin"></span>&nbsp微信商城</button></a></h3></div><div class="am-list-item-text"><!--内容--></div></div></div></div><div hidden v-bind:id="\'dataq\'+todo.id" v-bind:wx-src="todo.wxshop" v-bind:tb-src="todo.tb"></div><div hidden="hidden" id="tbqrboxq" v-bind:id="\'tbqrboxq\'+todo.id" algin="center" class="am-thumbnail am-hide-sm-only" v-bind:img-src="todo.img"  v-bind:alt="todo.tb" v-bind:wx-src="todo.wxshop"  ></div></li> '
})
//'<div id="tbqrboxq" v-bind:id="\'tbqrboxq\'+todo.id" algin="center" class="am-thumbnail am-hide-sm-only" v-bind:img-src="todo.img"  v-bind:alt="todo.tb" v-bind:wx-src="todo.wxshop"  ></div>'
{/* <div class="" id="qrboxq" > <div class=" am-thumbnails" >   <div id="tbqrboxq" v-bind:id="\'tbqrboxq\'+todo.id" algin="center" class="am-thumbnail am-hide-sm-only" v-bind:img-src="todo.img"  v-bind:alt="todo.tb" v-bind:wx-src="todo.wxshop"  ><h3 class="am-thumbnail-caption"><a :href="todo.tb" target="view_window" ><span class="iconfont icon-taobao"></span>立即购买</a></h3></div>  <div v-bind:id="\'wxqrboxq\'+todo.id"  algin="center" class="am-thumbnail am-hide-sm-only" alt="" v-bind:alt="todo.wx" > <h3 algin="center" class="am-thumbnail-caption" ><a :href="todo.wx" target="view_window" ><span class="am-icon-weixin"> 微信教程</span></a></h3></div> </div></div> </div>  */}
//<a   v-bind:onclick="\'imgAlert(\'+todo.id+\')\'">//查看大图
//<h3><a :href="todo.wx"><span class="am-icon-weixin"></span>&nbsp微信商城</a></h3>
//data-am-scrollspy="{animation:'fade'}"
var app7 = new Vue({
    el: '#app-7',
    data: {
        groceryList: Item
    }
})

//var a = $('#tbboxq').attr('src')
// $('#tbqrboxq').qrcode($('#tbqrboxq').attr('src'))
// $('#wxqrboxq').qrcode($('#wxqrboxq').attr('src'))\

var flag_isQRcode = false
//alert($(window).width())
// if ($(window).width() < 580) {
//     length = 50
// }

function getarr(searchKey) {
    var a = '?key='
    if (!searchKey) {
        searchKey = ''
        a = ''
    }
    Item.length = 0
    console.log(Item)
    //alert(Item)
    $.get("../getarr.php" + a + searchKey, function (data, status) {
        //alert("数据:\n " + data + "\n状态: " + status);
        //Item.push(data);
        //data=data.substring(1,data.length-1);
        console.log("../getarr.php" + a + searchKey);
        $('#my-alert2').modal('close')

        if (data == 'no_result') {
            // $('#my-popover').popover({
            //     content: 'Popover via JavaScript'
            // })
            $('#my-alert1').modal()
            console.log('search_no_result');
            return
        } else {

        }

        var obj = $.parseJSON(data);
        var le = obj.length
        if (obj[le - 1].isSecondSearch == true) {
            console.log("SecondSearch")
            $('#secondSearchDialog').css("display", "block")
        } else {
            $('#secondSearchDialog').css("display", "none")
        }
        for (i = 0; i < le - 1; i++) {
            // obj[i].id+=3;
            //a=obj[i]
            // if(i==le-1){
            //     break
            // }
            Item.push(obj[i]);
        }
        setTimeout(reflashQRcode, 500);
    });
    if(Item.length==0){
        console.log("获取数据失败，载入演示数据");
        $.get("../DemoData.dat0" + a + searchKey, function (data, status) {
            //alert("数据:\n " + data + "\n状态: " + status);
            //Item.push(data);
            //data=data.substring(1,data.length-1);
            console.log("DemoData.dat0" + a + searchKey);
            $('#my-alert2').modal('close')



            var obj = $.parseJSON(data);
            var le = obj.length
            if (obj[le - 1].isSecondSearch == true) {
                console.log("SecondSearch")
                $('#secondSearchDialog').css("display", "block")
            } else {
                $('#secondSearchDialog').css("display", "none")
            }
            for (i = 0; i < le - 1; i++) {
                // obj[i].id+=3;
                //a=obj[i]
                // if(i==le-1){
                //     break
                // }
                Item.push(obj[i]);
            }
            if(Item.length==0){Item=Item_demoData}
            console.log(Item)
            setTimeout(reflashQRcode, 500);
        });
    }
}


//a.id=7;
//Item.push(a)
function lazyloadq() {
    $("img.lazy-load").lazyload({
        effect: "fadeIn", //渐现，show(直接显示),fadeIn(淡入),slideDown(下拉)
        threshold: 500, //预加载，在图片距离屏幕180px时提前载入
        event: 'scroll', // 事件触发时才加载，click(点击),mouseover(鼠标划过),sporty(运动的),默认为scroll（滑动）
        //container: $("#container"), // 指定对某容器中的图片实现效果
        //failure_limit ：2 //加载2张可见区域外的图片,lazyload默认在找到第一张不在可见区域里的图片时则不再继续加载,但当HTML容器混乱的时候可能出现可见区域内图片并没加载出来的情况
    });
}


function reflashQRcode() {
    var length = 128
   
    if (flag_isQRcode) {
        console.log('qrcode rendered');

    }
    console.log('Item.length = ' + Item.length);
    for (i = 0; i < Item.length; i++) {
        //alert(window.screen.width)
        if(window.screen.width<600){
            break;
        }
        if ($("#tbqrboxq" + Item[i].id).find('canvas').length > 0) {
            console.log('findcanvas id=' + Item[i].id);
            continue
        }
        
        // //console.log($('#tbqrboxq' + Item[i].id).attr('alt'))
        // $("#tbqrboxq" + Item[i].id).qrcode({
        //     render: "canvas", //table方式 
        //     width: length, //宽度 
        //     height: length, //高度 
        //     text: $('#tbqrboxq' + Item[i].id).attr('alt'), //任意内容 
            
        // });
        // $("#wxqrboxq" + Item[i].id).qrcode({
        //     render: "canvas", //table方式 
        //     width: length, //宽度 
        //     height: length, //高度 
        //     text: $('#wxqrboxq' + Item[i].id).attr('alt') //任意内容 
        // });
        // alert(i)
    }
    flag_isQRcode = true
    wxshopinit()//disable微信按钮
    lazyloadq()
}