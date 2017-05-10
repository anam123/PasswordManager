var userName = "aekjf";
var decrypted = ":AKufh";

document.getElementById("Fill").onclick = function() {
    chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
            function(tabs){
            url = tabs[0].url;
            var value = localStorage.getItem(url);
            
            var TempValue = value.split("0+/");
            userName = TempValue[0];
            var passwordValue = TempValue[1];
            decrypted = CryptoJS.AES.decrypt(passwordValue, "Secret Passphrase").toString(CryptoJS.enc.Utf8);
            var someJSON = { "userName":userName, "password":decrypted};

        chrome.tabs.executeScript({
        code: '(' + function(params) {
            var inputs = document.getElementsByTagName("input");
            for(var i=1;i<inputs.length;i++){
                if(inputs[i].type=="password"){
                    inputs[i-1].value = params.userName;
                    inputs[i].value = params.password;
                    break;
                }

            }
            return {success: true, html: document.body.innerHTML};
            } + ')(' + JSON.stringify(someJSON) + ');'
        }, function(results) {
    });
    });
};





