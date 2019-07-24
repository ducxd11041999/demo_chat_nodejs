/* đây là file main của cả server*/
//khai báo một số thông số cơ bản của node
var express = require("express");
var app = express();
app.use(express.static("./public"));
var server = require("http").Server(app);
var io = require("socket.io")(server);
app.set("view engine","ejs");
app.set("views","./views" )

/*code here*/0
var arrOnline = []
server.listen(process.env.PORT ||3000,function()// kết nối server port 3000
	{
		console.log("connected <3");
	});

app.get("/",function(req, res)
{
	res.render("trangchu")
})
io.on("connection",function(socket)
{
	console.log("có người vừa kết nối : " + socket.id)
	socket.on("CLIENT-SEND-UESERNAME", function(data)
	{
		if(arrOnline.indexOf(data)>=0)
		{
			socket.emit("SERVER-SEND-REG-FAIL"," ")
		}
		else
		{
			socket.Username= data;
			arrOnline.push(data)
			console.log("đăng ký thành công")
			socket.emit("SERVER-SEND-REG-SUCCESSFULL", data)
			io.sockets.emit("SERVER-SEND-LIST-USER",arrOnline)
		}
	})
	socket.on("CLIENT-SEND-LOGOUT", function()
	{
		console.log(socket.Username + " đã thoát")
		arrOnline.splice(arrOnline.indexOf(socket.Username),1);
		socket.broadcast.emit("SERVER-SEND-LIST-USER",arrOnline)
	})
	socket.on("CHAT",function(data)
	{
		io.sockets.emit("S-CHAT",{nameu: socket.Username,cont:data});
	})
	socket.on("danggo",function()
	{
		var s=socket.Username +"đang gõ chữ";
		socket.broadcast.emit("aigo", s)
		socket.on("danggo-stop",function()
		{
			//console.log(socket.Username +" ngừng gõ");
			socket.broadcast.emit("ngunggo")
		})
	})

});