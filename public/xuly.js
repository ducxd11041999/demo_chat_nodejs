var socket = io("https://chateme.herokuapp.com");///kết nối lên server
$(document).ready(function()
	{
		$("#loginForm").show()
		$("#Chatform").hide()
		$("#btnRegister").click(function()
		{
			socket.emit("CLIENT-SEND-UESERNAME",$("#txtUsername").val())
		})
		$("#btnLogout").click(function()
		{
			//	alert(1);
			socket.emit("CLIENT-SEND-LOGOUT","")
			$("#loginForm").show(2000)
			$("#Chatform").hide(1000)
		})
		$("#btnSend").click(function()
		{
			socket.emit("CHAT",$("#txtMessages").val())
		})
		$("#txtMessages").focusin(function()
		{	
			socket.emit("danggo")
		})
		$("#txtMessages").focusout(function()
		{	
			socket.emit("danggo-stop")
		})
	})
socket.on("SERVER-SEND-REG-FAIL",function()
{
	alert("user name đã có người sử dụng ")
})
socket.on("SERVER-SEND-REG-SUCCESSFULL",function(data)
{
	alert("đăng ký thành công( "+data+" là tên trong phòng chat của bạn)");
	$("#currentUser").html(data);
	$("#loginForm").hide(1000)
	$("#Chatform").show(2000)
})

socket.on("SERVER-SEND-LIST-USER", function(data)
{
	$("#boxContent").html("")
	data.forEach(function(i)	
	{
		$("#boxContent").append("<div class='User'>"+i+"</div");
	})
})

socket.on("S-CHAT",function(data)
{
	///alert("gửi được tin nhắn rồi")
	$("#listMessages").append("<div class='ms'>" + data.nameu+ ":"+ data.cont + "</div>");
})

socket.on("aigo",function(data)
{
$("#thong_bao").html(data);
})
/*
socket.on("ngunggo",function()
{
	alert(2)
	$("#thongbao").html("")
})*/