$(function(){
    getuserInfo();
    var layer=layui.layer
    $('#btnLogout').on('click',function(){
        //eg1
   //eg1
    layer.confirm('确定退出吗', {icon: 3, title:'提示'}, function(index){
    //do something
    localStorage.removeItem('token')
    location.href='login.html';
//layui自带的功能关闭页面
    layer.close(index);
    });
     
            
   
    })
})
function getuserInfo(){
    $.ajax({
        method:'GET',
        url:'/my/userinfo',
        // headers:{
        //     Authorization:localStorage.getItem('token')||''
        // },
        success:function(res){
           if(res.status!==0){
            return layui.layer.msg('获取头像失败')
           }
           renderAvatar(res.data);
        },
        complete:function(res){
            console.log(res)
           if(res.responseJSON.status==1&&res.responseJSON.message=='身份认证失败！'){
            localStorage.removeItem('token')
            location.href='/login.html'
           }
        }
    })
}
function renderAvatar(user){
var name=user.nickname||user.name
$('#welcome').html('欢迎&nbsp;&nbsp;'+name)
if(user.user_pic!=null){
    $('.layui-nav-img').attr('src',
    user.user_pic)
    .show()
    $('.text-avatar').hide()

}else{
    $('.layui-nav-img').hide()
    var first=name[0].toUpperCase()
    $('.text-avatar').html(first).show()
}
}