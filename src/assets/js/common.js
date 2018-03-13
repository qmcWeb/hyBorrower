export default {
    isPoneAvailable: function (str) {  
        var myreg=/^[1][3,4,5,7,8][0-9]{9}$/;  
        if (!myreg.test(str)) {  
            return false;  
        } else {  
            return true;  
        }  
    },
    debounce: function (func, delay){
        let timer
        var target = true
        
        if(target){
            timer = setTimeout(() => {
                func()
                target = false
            }, 500);
        }
        
    }
}