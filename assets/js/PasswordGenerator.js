

	var meter = document.getElementById('password-strength-meter');
	var text = document.getElementById('password-strength-text');

	

	if(document.getElementById("setPasswordLength")){
		document.getElementById("setPasswordLength").onclick = function(){
			var size = document.getElementById("passwordLength").value;
			GeneratePassword(parseInt(size,10));
		}
	}
	
	

	GeneratePassword(10);

	function GeneratePassword(PassWordLength){

		var inputs = document.getElementsByTagName('input');
		console.log(inputs.length);
		for(var i = 0; i < inputs.length; i++) {
    		if(inputs[i].type.toLowerCase() == "password") {
        		console.log("YAY");
    		}
		}
		
		var Symbols   = new Array(40);
		var Numbers   = new Array(10);
		var UpperCase = new Array(30);
		var LowerCase = new Array(30);

		var totalSymbols = 0;
		var totalLowerCase = 0;
		var totalUpperCase = 0;
		var totalNumbers = 0;

		for(i=32;i<127;i++){
			var currChar = String.fromCharCode(i);
			if (currChar.match(/(.*[!,@,#,$,%,^,&,*,?,_,~,(,),{,},+,-])/)) {
				Symbols[totalSymbols++] = currChar;
			}else if(currChar.match(/[A-Z]/g)){
				UpperCase[totalUpperCase++] = currChar;
			}else if(currChar.match(/[a-z]/g)){
				LowerCase[totalLowerCase++] = currChar;
			}else if(currChar.match(/[0-9]/g)){
				Numbers[totalNumbers++] = currChar;
			}
		}
		var GeneratedPassword = "";
		for(i=0;i<PassWordLength;i++){
			var RandInt = Math.floor(Math.random() * 101);
			if(i<( Math.floor(PassWordLength/4) )) {
				GeneratedPassword += Symbols[RandInt%totalSymbols];
			}else if(i < ( Math.floor(PassWordLength/4) + Math.floor((PassWordLength+1)/4) ) ) {
				GeneratedPassword += Numbers[RandInt%totalNumbers];
			}else if(i < ( Math.floor(PassWordLength/4) + Math.floor((PassWordLength+1)/4) + Math.floor((PassWordLength+2)/4) ) ){
				GeneratedPassword += UpperCase[RandInt%totalUpperCase];
			}else{
				GeneratedPassword += LowerCase[RandInt%totalLowerCase];
			}
		}

		for(i=0;i<PassWordLength;i++){
			var RandInt = Math.floor(Math.random()*(PassWordLength-i));
			if(RandInt!=0){
		  		GeneratedPassword  = GeneratedPassword.substr(0,i)+
		  								GeneratedPassword.charAt(i+RandInt)+
		  								GeneratedPassword.substr(i+1,RandInt-1)+
		  								GeneratedPassword.charAt(i)+
		  								GeneratedPassword.substr(i+RandInt+1, PassWordLength - i - RandInt - 1);
		  							}
		}

		if(document.getElementById("GeneratedPassword")){
			document.getElementById("GeneratedPassword").innerHTML = GeneratedPassword;
		}

		if(typeof CheckPasswordStrength != 'undefined'){
			var passwordStrength = CheckPasswordStrength(GeneratedPassword);
			meter.value = passwordStrength;
		}
	}

