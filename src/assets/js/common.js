export default {
    getCommonImgCode: function(vueObj){
        vueObj.$http({
            method: 'get',
            url: vueObj.api + '/verifyCodeServlet',
            withCredentials: true,
            responseType: 'arraybuffer',
            proxy: {
                host: 'http://218.247.190.158',
                port: 17774
            }
        }).then(response => {
            return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data)
                .reduce((data, byte) => data + String.fromCharCode(byte), '')
            );
        }).then((data) => {
            console.log(data)
            vueObj.imgCode = data
            vueObj.$store.commit('changeLoading', false)
        }).catch((response) => {
            vueObj.$store.commit('changeLoading', false)
        })
    },
    isPoneAvailable: function (str) {
        // 手机号验证
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;
        if (!myreg.test(str)) {
            return false;
        } else {
            return true;
        }
    },
    checkIdNum: function(str) {
        var regIdNo = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
        if(!regIdNo.test(str)){
            return false;
        }else{
            return true
        }
    },
    checkRealName: function(str){
        var regName =/^[\u4e00-\u9fa5]{2,4}$/;
        if(!regName.test(str)){
            return false;
        }else{
            return true
        }
    },
    passwordCheck: function (str) {
        //6到16位数字与字母组合
        var pwdReg = /^(?![0-9]+$)(?![a-zA-Z]+$)[0-9A-Za-z]{6,16}$/;

        if(!pwdReg.test(str)){
            return false
        }else{
            return true
        }
    },
    countDown: function (obj) {
        // 倒计时
        let timer;
        clearInterval(timer)
        timer = setInterval(function (){
            if(obj.count > 0){
                --obj.count
                obj.func()
            }else{
                clearInterval(timer)
            }

        }, obj.delay)
    },
    dealTelStr: function(str){
        // 对手机号进行处理，返回类似138****8888形式账号
        var strTemp = str.substring(3,7)
        return str.replace(strTemp, '****')
    },
    getCookieByArray: function (name) {
        // 获取cookie
        var v = window.document.cookie.match('(^|;) ?' + name + '=([^;]*)(;|$)');

        return v ? v[2] : null;

    },
    setCookie: function (name, value, days) {
        // 设置cookie
        var d = new Date;
        d.setTime(d.getTime() + 24*60*60*1000*days);
        window.document.cookie = name + "=" + value + ";path=/;expires=" + d.toGMTString();
    },
    deleteCookie: function (name) {
        // 删除cookie
        this.set(name, '', -1);
    },
    getTimeNow: function() {
        const timeNow = new Date()
        return {
            hours: timeNow.getHours()
        }
    },
    //隐藏error
    toggle(data,msg){
      console.log(data.errShow);
      data.errMessage=msg;
      data.errShow=true;
      clearTimeout(T);
      var T=setTimeout(function(){
        data.errShow=false;
      },2000);

    },
    debounce(func, delay) {
        let timer
        return function (...args) {
            if (timer) {
                clearTimeout(timer)
            }
            timer = setTimeout(() => {
                console.log(this)
                func.apply(this, args)
            }, delay)
        }
    }
}
