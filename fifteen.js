"use strict";
var puzzlepieces;
var blankY;
var blankX;

window.onload = function () {
    var puzzle = document.getElementById('puzzlearea');
    var random = Math.round(Math.random() * (5 - 1) + 1);
    console.log(random);

    puzzlepieces = puzzle.getElementsByTagName('div');
    var pics = ["desktop_img.jpg", "2014-04-09-TheBigPicture.jpg", "Funny_body-building-picture.jpg" , "hoberman-ff-missingpicture.jpeg", "gQ-bU0zx_400x400.jpeg" ];

    for (var i = 0; i < puzzlepieces.length; i++) {
        puzzlepieces[i].className = 'puzzlepiece';
        puzzlepieces[i].style.backgroundImage = "url('"+pics[random]+"')";
        puzzlepieces[i].style.backgroundSize = "400px 400px";
        puzzlepieces[i].style.left = (i % 4 * 100) + 'px';
        puzzlepieces[i].style.top = (parseInt(i / 4) * 100) + 'px';
        puzzlepieces[i].style.backgroundPosition = '-' + puzzlepieces[i].style.left + ' ' + '-' + puzzlepieces[i].style.top;
        //console.log(i);

    };
    // var randomPosition = function(){
    // for(var i=0; i<puzzlepieces.length; i++){

    // }
    // }
    var contains = function (a, obj) {
        for (var i = 0; i < a.length; i++) {
            if (a[i] === obj) {
                return true;
            }
        }
        return false;
    };

    var checksmn = function () {
        for (var a = 0; a < puzzlepieces.length; a++) {

            puzzlepieces[a].onmouseover = function (e) {

                var dom = e.target;
                var y = dom.offsetTop;
                var x = dom.offsetLeft;
                var that = this;

                
                var checkleft = true;
                var checkright = true;
                var checktop = true;
                var checkbottom = true;
                
                if (y == 0) {
                    checktop = false;
                }
                if (x == 0) {
                    checkleft = false;
                }
                if (y == 300) {

                    checkbottom = false;
                }
                if (x == 300) {
                    checkright = false;
                }




                if (checktop) {
                    if (compareY(y, -100, x)) {
                        that.style.border = "2px solid red";
                        that.style.color = "#006600";
                    }
                }
                if (checkbottom) {

                    if (compareY(y, 100, x)) {
                       that.style.border = "2px solid red";
                        that.style.color = "#006600";
                    }
                }
                if (checkleft) {
                    if (compareX(x, -100, y)) {
                       that.style.border = "2px solid red";
                        that.style.color = "#006600";
                    }
                }
                if (checkright) {
                    if (compareX(x, 100, y)) {
                        that.style.border = "2px solid red";
                        that.style.color = "#006600";
                    }
                }


            };
            puzzlepieces[a].onmouseout = function () {
                this.style.border = "2px solid black";
                this.style.color = "#000000";

            };
            puzzlepieces[a].onclick = function (e) {
                var dom = e.target;
                var y = dom.offsetTop;
                var x = dom.offsetLeft;



                var checkleft = true;
                var checkright = true;
                var checktop = true;
                var checkbottom = true;


                if (y == 0) {
                    checktop = false;
                }
                if (x == 0) {
                    checkleft = false;
                }
                if (y == 300) {

                    checkbottom = false;
                }
                if (x == 300) {
                    checkright = false;
                }




                if (checktop) {
                    if (compareY(y, -100, x)) {
                        moveTiles(dom, "top");
                    }
                }
                if (checkbottom) {
                    console.log("mn " + y);
                    if (compareY(y, 100, x)) {
                        moveTiles(dom, "bottom");
                    }
                }
                if (checkleft) {
                    if (compareX(x, -100, y)) {
                        moveTiles(dom, "left");
                    }
                }
                if (checkright) {
                    if (compareX(x, 100, y)) {
                        moveTiles(dom, "right");
                    }
                }
            }
        }
    }
    checksmn();
    var compareX = function (xx, offset, y) {
        var available = true;
        for (var i = 0; i < puzzlepieces.length; i++) {

            if (puzzlepieces[i].offsetLeft == (xx + offset) && puzzlepieces[i].offsetTop == y) {
                available = false;
            }
        }
        return available;
    }

    var compareY = function (yy, offset, x) {

        var available = true;
        for (var i = 0; i < puzzlepieces.length; i++) {

            if (puzzlepieces[i].offsetTop == (yy + offset) && puzzlepieces[i].offsetLeft == x) {

                available = false;
            }

        }
        return available;

    }
    var checkifwin = function () {

        var count = 1;
        for (var a = 0; a < puzzlepieces.length; a++) {
            //console.log(puzzlepieces[a].innerHTML);
            if (count == puzzlepieces[a].innerHTML) {
                count++;


            } else {
                console.log("not complete");
            }

        }
        if (count == 16)
            alert("complete");
    }


    var shuffle = function () {
        var max = 14;
        var min = 0;
        var integers = [];
        var puzzlepiecesTEMP = [];
        for (var i = 0; i < puzzlepieces.length; i++) {

            var ranNum = Math.floor(Math.random() * (max - min + 1)) + min;
            if (contains(integers, ranNum)) {
                i--;
            } else {
                integers[i] = ranNum;
                puzzlepiecesTEMP[i] = puzzlepieces[i].innerHTML;
            }
        }

        //console.log(integers.length+" | " +integers.join())


        for (var a = 0; a < puzzlepieces.length; a++) {

            var i = integers[a];
            puzzlepieces[i].className = 'puzzlepiece';
            puzzlepieces[i].style.backgroundImage = "url('"+pics[random]+"')";
            puzzlepieces[i].style.backgroundSize = "400px 400px";
            puzzlepieces[i].style.left = (a % 4 * 100) + 'px';
            puzzlepieces[i].style.top = (parseInt(a / 4) * 100) + 'px';
            puzzlepieces[i].style.backgroundPosition = '-' + puzzlepieces[a].style.left + ' ' + '-' + puzzlepieces[a].style.top;
            puzzlepieces[i].innerHTML = puzzlepiecesTEMP[a];
        }

        checkifwin();
        checksmn();
    }
    shuffle();

    document.getElementById("shufflebutton").onclick = function () {


        shuffle();

    };




    var moveTiles = function (block, location) {

        if (location == "left") {
            block.style.left = (block.offsetLeft - 100) + "px";
        }

        if (location == "right") {
            block.style.left = (block.offsetLeft + 100) + "px";
        }

        if (location == "top") {
            block.style.top = (block.offsetTop - 100) + "px";
        }

        if (location == "bottom") {
            block.style.top = (block.offsetTop + 100) + "px";
        }

    };







}