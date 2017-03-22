
// --------------活动规则界面交互-------------

var $closeBtn = $("#closeBtn");
var $ruleWrap = $("#ruleWrap");
var $ruleBtn = $("#ruleBtn");

// 打开活动规则
$ruleBtn.on("touchstart",function(){
	$ruleWrap.show();
});

// 点击关闭活动规则
$closeBtn.on("touchstart",function(){
	$ruleWrap.hide();
});

// -------------------- 游戏第N关开始界面点击事件 -------------

var $startBtn = $("#startBtn");
var $first = $("#first");
var $drawCon = $("#drawCon");

// 封装第一次开始界面出现事件
function firstStartFn(){
	// 第一关开始界面出现
	$first.animate({
		"top":"0"
	},1000,"easeOutBounce");

	// 创建图片路径下标数组
	var firstImgsArr = [1,2,3,1,2,3];
	// 创建游戏图片	
	for (var i = 0; i < 6; i++) {
		// 随机数
		var num = randomFn(0,firstImgsArr.length);
		// 创建li和随机图片
		var $drawConImgs = $("<li><img class='front' index="+firstImgsArr[num]+" src='img/goretex"+firstImgsArr[num]+".jpg'><img class='back' src='img/goretex.png'></li>");	
		$drawConImgs.css({
			"width":"46%",
			"height":"30%",
			"margin":"2%"
		})
		// 插入图片
		$drawCon.append($drawConImgs);
		// 从数组中删除对应图片
		firstImgsArr.splice(num,1);
	}
}

// 开始按钮点击
$startBtn.on("touchstart",function(){
	firstStartFn();
});

var $next = $("#next");
var $second = $("#second");
var $third = $("#third");
var $pass = $("#pass");
var $sec = $("#sec");

// 记录点击下一关的次数
var nextClickIndex = 0;

// 点击$next 下一关
$next.on("touchstart",function(){
	nextClickIndex++;
	// 隐藏$next
	$next.hide();

	// 如果点击了一次
	if (nextClickIndex == 1) {
		// 显示第二关
		$second.animate({
			"top":"0"
		},1000,"easeOutBounce");
		// 创建图片路径下标数组
		var firstImgsArr = [1,2,3,4,5,6,1,2,3,4,5,6];
		// 创建游戏图片	
		for (var i = 0; i < 12; i++) {
			// 随机数
			var num = randomFn(0,firstImgsArr.length);
			// 创建li和随机图片
			var $drawConImgs = $("<li><img class='front' index="+firstImgsArr[num]+" src='img/goretex"+firstImgsArr[num]+".jpg'><img class='back' src='img/goretex.png'></li>");	
			$drawConImgs.css({
				"width":"29%",
				"height":"19%",
				"margin":"2%"
			})
			// 插入图片
			$drawCon.append($drawConImgs);
			// 从数组中删除对应图片
			firstImgsArr.splice(num,1);
		}
	}
	// 如果点击了二次
	if (nextClickIndex == 2) {
		// 显示第三关
		$third.animate({
			"top":"0"
		},1000,"easeOutBounce");
		// 创建图片路径下标数组
		var firstImgsArr = [1,2,3,4,5,6,7,8,9,10,11,12,1,2,3,4,5,6,7,8,9,10,11,12];
		// 创建游戏图片	
		for (var i = 0; i < 24; i++) {
			// 随机数
			var num = randomFn(0,firstImgsArr.length);
			// 创建li和随机图片
			var $drawConImgs = $("<li><img class='front' index="+firstImgsArr[num]+" src='img/goretex"+firstImgsArr[num]+".jpg'><img class='back' src='img/goretex.png'></li>");	
			$drawConImgs.css({
				"width":"21%",
				"height":"14%",
				"margin":"2%"
			})
			// 插入图片
			$drawCon.append($drawConImgs);
			// 从数组中删除对应图片
			firstImgsArr.splice(num,1);
		}
	}
});

// --------------------------游戏内容界面---------------------

// 随机函数
function randomFn(min,max) {
	return parseInt(Math.random()*(max-min)+min);
}

// 封装图片点击翻转事件
function clickLiFn(){
	var $drawConLi = $("#drawCon>li");
	var $frontImgs = $(".front");
	var $backImgs = $(".back");

	// 记录点击次数
	var touchIndex = 0;
	// 记录翻转图片的index值
	var comparisonArr = [];
	// 记录点击的li下标
	var drawConLiArr = [];
	// 判断动画是否正在进行
	var gameBol = false;

	// 点击li翻牌事件
	$drawConLi.on("touchstart",function(){	
		// 如果点击相同的li  return
		if (drawConLiArr.indexOf($(this).index())!=-1) {
			return;
		}	
		// 如果第三次点击时前面动画未结束 return
		if (gameBol) {
			return;
		}
		// 第二次点击时bol变为true
		if (touchIndex == 1) {
			gameBol = true;
		}
		// 记录点击次数
		touchIndex++;
		// 保存点击的li下标
		drawConLiArr.push($(this).index());

		// 翻转
		$(this).children().eq(0).css("-webkit-transform","rotateY(0deg)");
		$(this).children().eq(1).css("-webkit-transform","rotateY(180deg)");
		// 保存翻面图片的index属性
		comparisonArr.push($(this).children().eq(0).attr("index"));
	
		// 如果点击两次 判断是否同一张图片
		if (touchIndex == 2) {
			// 等翻转完毕再进行判断	1S延迟判断
			setTimeout(function(){
				// 如果相同，移除对应的图片
				if (comparisonArr[0] == comparisonArr[1]) {
					$drawConLi.eq(drawConLiArr[0]).children().remove();
					$drawConLi.eq(drawConLiArr[1]).children().remove();
					$drawConLi.eq(drawConLiArr[0]).css("visibility","hidden");
					$drawConLi.eq(drawConLiArr[1]).css("visibility","hidden");

					// 判断图片如果为0，则挑战成功
					var $drawConImgs = $("#drawCon img");
					if ($drawConImgs.length == 0) {
						// 清空$drawCon内容
						$drawCon.html("");
						// 总秒数减去剩余秒数
						allSec -= $startNum.text();
						// 改变sec的值
						$sec.text(allSec);
						// 改变抽奖次数
						ltyNum++;
						$lottery.text(ltyNum);
						// 暂停定时器
						$countdown.stop();
						clearInterval(secTimer);
						clearInterval(percentTimer);

						// 如果是第一二关
						if (nextClickIndex < 2) {
							// 显示下一关
							$next.show();
						}
						// 如果是第三关
						if (nextClickIndex == 2) {
							// 显示通关
							$pass.show();
							// 抽奖次数归0
							ltyNum = 0;
						}
					}
				}
				// 如果不同，翻回背面
				else {
					setTimeout(function(){
						$frontImgs.css("-webkit-transform","rotateY(180deg)");
						$backImgs.css("-webkit-transform","rotateY(0deg)");
					},100);
				}
				// 清空：点击次数、点击过的li数组、翻面图片的index属性数组
				touchIndex = 0;
				drawConLiArr = [];
				comparisonArr = [];
				gameBol = false;				
			},500);
		}
	});	
}

var $draw = $("#draw");
var $lottery = $("#lottery");
// 设置抽奖次数
var ltyNum = 0;
// 设置总秒数
var allSec = 120;

// 点击first开始游戏
$first.on("touchstart",function(){
	// $first返回原来的位置
	$first.css("top","-100%");
	// 显示游戏界面
	$draw.show();
	// 调用倒计时
	timerFn(10);
	// 调用li点击事件
	clickLiFn();
});

// 点击第二关
$second.on("touchstart",function(){
	// $first返回原来的位置
	$second.css("top","-100%");
	// 调用倒计时
	timerFn(30);
	// 调用li点击事件
	clickLiFn();
});

// 点击第三关
$third.on("touchstart",function(){
	// $first返回原来的位置
	$third.css("top","-100%");
	// 调用倒计时
	timerFn(80);
	// 调用li点击事件
	clickLiFn();
});

// ----------------通关点击再来一次----------------

var $again = $("#again");

$again.on("touchstart",function(){
	// 通关界面隐藏
	$pass.hide();
	// 开始界面点击次数归零
	nextClickIndex = 0;
	// 总秒归120
	allSec = 120;
	// 调用第一个开始界面
	firstStartFn();
});

// ----------------通关点击抽奖----------------

var $lotteryWrap = $("#lotteryWrap");
var $lotteryBtn = $("#lotteryBtn");

$lotteryBtn.on("touchstart",function(){
	$lotteryWrap.animate({
		"left":"0"
	},1000,"easeOutBounce");
});
$lotteryWrap.on("touchstart",function(){
	$lotteryWrap.animate({
		"left":"-100%"
	},500,"linear");
});


// -----------------点击挑战失败 再来一次----------

var $lose = $("#lose");

$lose.on("touchstart",function(){
	// 清空drawCon
	$drawCon.html("");
	// 通关界面隐藏
	$lose.hide();
	// 开始界面点击次数归零
	nextClickIndex = 0;
	// 抽奖次数归0
	ltyNum = 0;
	$lottery.text("0");
	// 总秒归120
	allSec = 120;
	// 调用第一个开始界面
	firstStartFn();
});

// -----------------倒计时------------------------

var $startNum = $("#startNum");
var $countdown = $("#countdown>img");
var $percent = $("#percent");

function timerFn(sec){
	$countdown.css({
		"left":"0"
	});	

	$startNum.text(sec);
	secTimer = setInterval(function(){	
		sec--;
		$startNum.text(sec);
		if (sec == 0) {
			clearInterval(secTimer);
			$lose.show();
		}
	},1000);

	var percent = 100;
	percentTimer = setInterval(function(){	
		percent-=1;
		$percent.text(percent+"%");
		if (percent == 0) {
			clearInterval(percentTimer);
		}
	},10*sec);

	$countdown.animate({
		"left":"-100%"
	},sec*1000,"linear");
}

