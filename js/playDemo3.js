$(function () {
    //控制随机生成数字的概率不同
    var arr = [2, 2, 2, 4];
    //存放16个div的位置
    var arrRc = [
        [0, 1, 2, 3],
        [4, 5, 6, 7],
        [8, 9, 10, 11],
        [12, 13, 14, 15]
    ];

    //每次移动随机生成一个数字
    function createNum() {
        getDivEmpty();
        var ranNum = parseInt(Math.random() * 4);
        var divRan = parseInt(Math.random() * emptyArr.length);
        if (emptyArr.length) {
            $(emptyArr[divRan]).html('<span class="new">' + arr[ranNum] + '</span>');
            $('.new').css({
                'animation':'newDiv .3s ease ',
                'animation-fill-mode':'backwards'
            });
        }
    }

    var emptyArr = [];
    var divs = $('.main0 div');

    function getDivEmpty() {
        //emptyArr每次调用先置空
        emptyArr = [];
        divs.each(function (index, ele) {
            if ($(this).text() == '') {
                emptyArr.push(this);
            }
        });
        if (emptyArr.length == 0 && checkGameOver()) {
            $('.gameStateTips').fadeIn(500);
            $('.tipsText').text('Game Over');
        }
    }
    //检测游戏是否失败！
    function checkGameOver() {
        //判断横向是否有相邻的两个数字相同
        for (var i = 0; i < arrRc.length; i++) {
            for (var j = 0; j < arrRc.length - 1; j++) {
                if (divs[arrRc[i][j]].innerText.trim() == divs[arrRc[i][j + 1]].innerText.trim()) {
                    return false;
                }
            }
        }
        //判断纵向是否有相邻的两个数字相同
        for (var m = 0; m < arrRc.length - 1; m++) {
            for (var n = 0; n < arrRc.length; n++) {
                if (divs[arrRc[m][n]].innerText.trim()== divs[arrRc[m + 1][n]].innerText.trim()) {
                    return false;
                }
            }
        }
        return true;
    }

    //检测游戏是否通关成功！
    function checkGameSuccess() {
        for (var i = 0; i < arrRc.length; i++) {
            for (var j = 0; j < arrRc.length; j++) {
                if (parseInt(divs[arrRc[i][j]].innerText)>=2048) {
                    return true;
                }
            }
        }
        return false;
    }


    //根据方框内的数字添加背景色
    function refresh() {
        divs.each(function (index, ele) {
            $(this).find('span').attr('class', 'bg' + $(this).text());
        });
    }


//页面初始化
    init();
    function init(){
        createNum();
        createNum();
        refresh();
        bestScore();
        $('.gameStateTips').hide();
        $('.tipsText').text('');
        $('.score span').text('0');
    }

    $(document).on('keyup',function(e){
        keyupFunc(e);
    });
    function keyupFunc(e){
        var ev = e || window.event;
        if(ev.keyCode==38||ev.keyCode==87){
            ev.preventDefault();
            moveup();
            refresh();
        }
        if(ev.keyCode==40||ev.keyCode==83){
            ev.preventDefault();
            movedown();
            refresh();
        }
        if(ev.keyCode==37||ev.keyCode==65){
            ev.preventDefault();
            moveleft();
            refresh();
        }
        if(ev.keyCode==39||ev.keyCode==68){
            ev.preventDefault();
            moveright();
            refresh();
        }
        //监测bestScore
        checkBestScore();
        if (checkGameSuccess()) {
            $('.gameStateTips').fadeIn(500);
            $('.tipsText').text('congratulation');
        }
    }

    function moveup(){
        var score0=parseInt($('.score span').text());
        var flags=[false,false,false,false];
        for(var y=0;y<4;y++){
            for(var x=0;x<3;x++){
                for(var x1=x+1;x1<4;x1++){
                    if(x1-x>1){
                        var type=false;
                        for(var i=x+1;i<x1;i++){
                            if(divs [arrRc[i][y]].innerText!=""){
                                type=true;
                            }
                        }
                        if(type){
                            continue;
                        }
                    }
                    flags[x]=row_move_combine(x,y,x1,'up');
                }
            }
        }
        if(flags[0]||flags[1]||flags[2]||flags[3]){
            createNum();
        }
        addScore(score0);
    }

    function movedown(){
        var score0=parseInt($('.score span').text());
        var flags=[false,false,false,false];
        for(var y=0;y<4;y++){
            for(var x=3;x>=0;x--){
                for(var x1=x-1;x1>=0;x1--){
                    if(x-x1>1){
                        var type=false;
                        for(var i=x1+1;i<x;i++){
                            if(divs [arrRc[i][y]].innerText!=""){
                                type=true;
                            }
                        }
                        if(type){
                            continue;
                        }
                    }
                    flags[x]=row_move_combine(x,y,x1,'down');
                }
            }
        }
        if(flags[0]||flags[1]||flags[2]||flags[3]){
            createNum();
        }
        addScore(score0);
    }

    function moveleft(){
        var score0=parseInt($('.score span').text());
        var flags=[false,false,false,false];
        for(var x=0;x<4;x++){
            for(var y=0;y<4;y++){
                for(var y1=y+1;y1<4;y1++){
                    if(y1-y>1){
                        var type=false;
                        for(var i=y+1;i<y1;i++){
                            if(divs [arrRc[x][i]].innerText!=""){
                                type=true;
                            }
                        }
                        if(type){
                            continue;
                        }
                    }
                    flags[y]=col_move_combine(x,y,y1,'left');
                }
            }
        }
        if(flags[0]||flags[1]||flags[2]||flags[3]){
            createNum();
        }
        addScore(score0);
    }

    function moveright(){
        var score0=parseInt($('.score span').text());
        var flags=[false,false,false,false];
        for(var x=0;x<4;x++){
            for(var y=3;y>=0;y--){
                for(var y1=y-1;y1>=0;y1--){
                    if(y-y1>1){
                        var type=false;
                        for(var i=y1+1;i<y;i++){
                            if(divs [arrRc[x][i]].innerText!=""){
                                type=true;
                            }
                        }
                        if(type){
                            continue;
                        }
                    }
                    flags[y]=col_move_combine(x,y,y1,'right');
                }
            }
        }
        if(flags[0]||flags[1]||flags[2]||flags[3]){
            createNum();
        }
        addScore(score0);
    }

    //行之间的移动和合并检测
    function row_move_combine(x,y,x1,direction){
        var flag=false;
        if(divs[arrRc[x1][y]].innerText!=''){
            if(divs[arrRc[x][y]].innerText==''){
                divs[arrRc[x][y]].innerHTML='<span>'+divs[arrRc[x1][y]].innerText+'</span>';
                divs[arrRc[x1][y]].innerHTML='<span></span>';
                flag=true;
                if(direction=='up'){
                    x--;
                }else{
                    x++;
                }
            }else if(parseInt(divs[arrRc[x1][y]].innerText)==parseInt(divs[arrRc[x][y]].innerText)){
                var num=parseInt(divs[arrRc[x][y]].innerText)*2;
                divs[arrRc[x][y]].innerHTML='<span class="combine">'+num+'</span>';
                divs[arrRc[x1][y]].innerHTML='<span></span>';
                $('.combine').css({
                    'animation':'combine .2s ease',
                    'animation-fill-mode':'backwards'
                });
                flag=true;
                getSumScore(num);
            }
        }
        return flag;
    }

    //列之间的移动和合并检测
    function col_move_combine(x,y,y1,direction){
        var flag=false;
        if(divs[arrRc[x][y1]].innerText!=''){
            if(divs[arrRc[x][y]].innerText==''){
                divs[arrRc[x][y]].innerHTML='<span>'+divs[arrRc[x][y1]].innerText+'</span>';
                divs[arrRc[x][y1]].innerHTML='<span></span>';
                flag=true;
                y++;
                if(direction=='left'){
                    y--;
                }else{
                    y++;
                }
            }else if(parseInt(divs[arrRc[x][y]].innerText)==parseInt(divs[arrRc[x][y1]].innerText)){
                var num=parseInt(divs[arrRc[x][y]].innerText)*2;
                divs[arrRc[x][y]].innerHTML='<span class="combine">'+num+'</span>';
                divs[arrRc[x][y1]].innerHTML='<span></span>';
                flag=true;
                $('.combine').css({
                    'animation':'combine .2s ease',
                    'animation-fill-mode':'backwards'
                });
                getSumScore(num);
            }
        }
        return flag;
    }

    //重新开始新游戏
    $('.restartBtn').click(function(){
        $('.main0 span').html('').attr('class','');
        init();
    });
    $('.replayBtn').click(function(){
        $('.main0 span').html('').attr('class','');
        init();
    });
    //合并后加分动画
    function getaddScore(num){
        var sum=0;
        sum+=num;
        return sum;
    }
    //累计总分
    function getSumScore(num){
        $('.score>div').removeClass('score-add');
        var addScore=parseInt(getaddScore(num));
        $('.score span')[0].innerText=parseInt($('.score span').text())+addScore;
    }

    //每次移动后计算增加的总分数，添加动画
    function addScore(score0){
        var score1=parseInt($('.score span').text());
        if(score1>score0){
            $('.score>div').addClass('score-add').text('+'+(score1-score0));
            setTimeout(function(){
                $('.score>div').removeClass('score-add').text('');
            },600);
        }
    }

    //本地存储写入或者读取bestScore
    function bestScore(){
        var bestScore=localStorage.getItem("bestScore");
        if(bestScore!=null){
            $('.bestScore span').text(bestScore);
        }else{
            $('.bestScore span').text($('.score span').text());
            localStorage.setItem('bestScore',$('.score span').text());
        }
    }

    //监测bestScore
    function checkBestScore(){
        var best0=parseInt(localStorage.getItem("bestScore"));
        var score=parseInt($('.score>span').text());
        if(score>best0){
            $('.bestScore span').text(score);
            localStorage.setItem('bestScore',score);
        }else{
            $('.bestScore span').text(best0);
            localStorage.setItem('bestScore',best0);
        }
    }




});

