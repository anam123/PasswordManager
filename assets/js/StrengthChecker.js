	var password = document.getElementById('CheckPassword');
	var meter = document.getElementById('password-strength-meter');
	var text = document.getElementById('password-strength-text');

	if(password!=null){
		password.addEventListener('input', function() {
		  var val = password.value;
		  var passwordStrength = CheckPasswordStrength(val);
		  var strength_obj = zxcvbn(val);
		  //console.log(strength);
		  var strengthZXCVBN = strength_obj.score + 1;
		  var strengthCustom = CheckPasswordStrength(password);
		  var strength = (strengthCustom + strengthZXCVBN*100)/100;
		  meter.value = strength;
		  if (strength == 1) {
		  	text.innerHTML = "Risky";
		  }
		  else if (strength == 2) {
		  	text.innerHTML = "Weak";
		  }
		  else if (strength == 3) {
		  	text.innerHTML = "Medium";
		  }
		  else if (strength == 4) {
		  	text.innerHTML = "Strong";
		  }
		  else if (strength == 5) {
		  	text.innerHTML = "Very Strong";
		  }

		  //console.log(text);
		});
	}

	function CheckPasswordStrength(password){

		

		var Symbols = 0;
		var UpperCaseLetters = 0;
		var LowerCaseLetters = 0;
		var Numbers = 0;
		var Score = 0;

		var onlyLowerCase = false;
		var onlyNumbers = false;

		var consecutiveNumbers = 0;
		var consecutiveSameCharacters = 0;

		/////BONUSES//////////
		var numberBonus = 4;
		var symbolBonus = 6;
		var upperCaseBonus = 3;
		var lengthBonus = 6;

		///////PENALTIES////////
		var consecutiveNumbersPenalty = 4;
		var consecutiveSameCharactersPenalty = 4;
		var noSymbolPenalty = 10;
		var noUpperCasePenalty = 10;
		var noNumberPenalty = 10;

		if(password.length>=6){
			Score += 20;
			for (i=0; i<password.length;i++)
	    	{

	    		////COUNT UPPERCASE LETTERS////////////////////////////
	        	if (password[i].match(/[A-Z]/g)) {
	        		UpperCaseLetters++;
	        	}

	        	////COUNT NUMBERS AND CHECK CONSECUTIVE NUMBERS////////
	        	if (password[i].match(/[0-9]/g)) {
	        		Numbers++;
	        		if(i>0){
	        			if(password[i]==password[i-1]){
	        				consecutiveNumbers++;
	        			}
	        		}
	        	}else{
	        		if(i>0){
	        			///////////////CHECK CONSECUTIVE CHARACTERS/////////////
	        			if(password[i]==password[i-1]){
	        				consecutiveSameCharacters++;
	        			}
	        		}
	        	}
	        	// ////////////////COUNT SYMBOLS/////////////////////////////
	        	// if (password[i].match(/(.*[!,@,#,$,%,^,&,*,?,_,~,(,),{,},+,-])/)) {
	        	// 	Symbols++;
	        	// }

	        	// //////////////////CHECK IF ONLY LOWER CASE CHARACTERS////////////////
	        	// if(password.match(/^[\sa-z]+$/)){
	        	// 	onlyLowerCase = true;
	        	// } 

	        	/////////////////CHECK IF ONLY NUMBERS//////////////////////////////
	        	if(password.match(/^[\s0-9]+$/)){
	        		onlyNumbers = true;
	        	} 
	    	}


	    	

	    	Score += numberBonus*Numbers + symbolBonus*Symbols + upperCaseBonus*UpperCaseLetters + lengthBonus*(password.length - 6);
	    	Score -= consecutiveNumbers*consecutiveNumbersPenalty;
	    	Score -= consecutiveSameCharactersPenalty*consecutiveSameCharacters;

	    	// if(onlyLowerCase){
	    	// 	Score -= allLowerCasePenalty;
	    	// }
	    	// if(onlyNumbers){
	    	// 	Score -= allNumbersPenalty;
	    	// }

	    	if(!Numbers){
	    		Score -= noNumberPenalty;
	    	}
	    	if(!Symbols){
	    		Score -= noSymbolPenalty;
	    	}
	    	if(!UpperCaseLetters){
	    		Score -= noUpperCasePenalty;
	    	}
		}

		return Score;
	}	