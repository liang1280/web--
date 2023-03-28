$(function () {
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()

    })
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
    // 第三方插件提供的校验
    var form = layui.form
    var lr=layui.layer
    form.verify({
        pwd: [
            /^[\S]{6,12}$/
            , '密码必须6到12位，且不能出现空格'
        ],
        repwd: function (value) {
            var pwd = $('.reg-box [name=password]').val()
            if (value != pwd) return '两次密码不一致'
        }
    })
   
    //   注册
    $('#form-reg').on('submit', function (e) {
        e.preventDefault()
         // var data={
    //     username: $('.reg-box [name=username]').val(),
    //     password: $('.reg-box [name=password]').val()}
    var data = {
        username: $('#form_reg [name=username]').val(),
        password: $('#form_reg [name=password]').val()
      }
        $.post('/api/reguser',data, function (res) {
                if (res.status!== 0) {
                    // lr.msg('注册失败')
                    return console.log(res.message+'注册失败')
                }
                console.log('注册成功')
                // lr.msg('注册成功请登录')
                // $('#link-login').click()
            })
    })
    $('#form-login').submit(function(e){
        e.preventDefault()
        $.ajax({
            url:'/api/login',
            method:'POST',
            data:$(this).serialize(),
            success:function(res){
                if(res.status!==0){ return lr.msg('登录失败')}
                lr.msg('登录成功')
                location.href='/login.html'
                console.log(res)
                           }
        })
    })
})