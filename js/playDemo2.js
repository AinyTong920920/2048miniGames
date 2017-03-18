$(function () {
    //控制随机生成数字的概率不同
    var arr = [2, 4, 2, 2];
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
            //$(emptyArr[divRan]).html('<span class="new">' + arr[ranNum] + '</span>').siblings().find('span').removeClass('new');
            $(emptyArr[divRan]).html('<span class="new">' + arr[ranNum] + '</span>');
            $('.new').css({
                'animation': 'newDiv .2s ease .1s',
                'animation-fill-mode': 'backwards'
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
            alert('Game Over');
        }
    }

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
                if (divs[arrRc[m][n]].innerText.trim() == divs[arrRc[m + 1][n]].innerText.trim()) {
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
                if (divs[arrRc[i][j]].innerText.trim() == '2048') {
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

    //行之间的合并
    function rowCombine(row1, row2) {
        var row1Index = arrRc[row1];
        var row2Index = arrRc[row2];
        for (var i = 0; i < arrRc.length; i++) {
            if (divs[row2Index[i]].innerText == '') {

            } else if (divs[row1Index[i]].innerText == '') {
                divs[row1Index[i]].innerHTML = '<span>' + divs[row2Index[i]].innerText + '</span>';
                divs[row2Index[i]].innerHTML = '<span></span>';
            } else if (parseInt(divs[row1Index[i]].innerText) == parseInt(divs[row2Index[i]].innerText)) {
                var num = parseInt(divs[row1Index[i]].innerText) * 2;
                divs[row1Index[i]].innerHTML = '<span class="combine">' + num + '</span>';
                divs[row2Index[i]].innerHTML = '<span></span>';
                $('.combine').css({
                    'animation': 'combine .2s ease .1s',
                    'animation-fill-mode': 'backwards'
                });
            }
        }
        if (checkGameSuccess()) {
            alert('闯关成功！');
        }
        return num;
    }

    //列之间的合并
    function colCombine(col1, col2) {
        var col1Index = 0;
        var col2Index = 0;
        for (var i = 0; i < arrRc.length; i++) {
            col1Index = arrRc[i][col1];
            col2Index = arrRc[i][col2];
            if (divs[col2Index].innerText == '') {

            } else if (divs[col1Index].innerText == '') {
                divs[col1Index].innerHTML = '<span>' + divs[col2Index].innerText + '</span>';
                divs[col2Index].innerHTML = '<span></span>';
            } else if (parseInt(divs[col2Index].innerText) == parseInt(divs[col1Index].innerText)) {
                var num = parseInt(divs[col2Index].innerText) * 2;
                divs[col1Index].innerHTML = '<span class="combine">' + num + '</span>';
                divs[col2Index].innerHTML = '<span></span>';
                $('.combine').css({
                    'animation': 'combine .2s ease .1s',
                    'animation-fill-mode': 'backwards'
                });
            }
        }
        if (checkGameSuccess()) {
            alert('闯关成功！');
        }
        return num;
    }


//页面初始化
    init();
    function init() {
        createNum();
        createNum();
        refresh();
    }

    $(document).keyup(function (e) {
        var ev = e || window.event;
        switch (ev.keyCode) {
            case 38://up
                for (var i = 0; i < arrRc.length - 1; i++) {
                    rowCombine(2, 3);
                    rowCombine(1, 2);
                    rowCombine(0, 1);
                }
                createNum();
                refresh();
                break;
            case 40://down
                for (var j = 0; j < arrRc.length - 1; j++) {
                    rowCombine(1, 0);
                    rowCombine(2, 1);
                    rowCombine(3, 2);
                }
                createNum();
                refresh();
                break;
            case 37://left
                for (var k = 0; k < arrRc.length - 1; k++) {
                    colCombine(2, 3);
                    colCombine(1, 2);
                    colCombine(0, 1);
                }
                createNum();
                refresh();
                break;
            case 39://right
                for (var m = 0; m < arrRc.length - 1; m++) {
                    colCombine(1, 0);
                    colCombine(2, 1);
                    colCombine(3, 2);
                }
                createNum();
                refresh();
                break;
        }
    });

//重新开始新游戏
    $('.restartBtn').click(function () {
        $('.main0 span').html('').attr('class', '');
        init();
    });



});
