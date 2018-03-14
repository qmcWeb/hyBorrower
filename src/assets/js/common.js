export default {
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
    }
}