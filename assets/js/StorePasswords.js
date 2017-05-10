

	document.getElementById("setPassword1").onclick = function() {
		var text = document.getElementById('passwordToStore');
		var username = document.getElementById('userName');

		StorePassword1(username.value, text.value);
	};

	function load()
	{
		var url;
		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   			function(tabs){
      		 url = tabs[0].url;
      		 var value = localStorage.getItem(url);
   			}
		);
        
	}

	function store(inputUsername, encodedPassword){

		if (typeof(localStorage) == 'undefined' ) {
		alert('Your browser does not support HTML5 localStorage. Try upgrading.');
		} 
		else {
			try {
				chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   				
   				function(tabs){
      		 		url = tabs[0].url;
      		 		localStorage.setItem(url, inputUsername + "0+/" +encodedPassword);
   				});
				 //saves to the database, “key”, “value”
			} catch (e) {
			if (e == QUOTA_EXCEEDED_ERR) {
				alert('Quota exceeded!'); //data wasn’t successfully saved due to quota exceed so throw an error
			}
		}
	}
}

	function StorePassword1(username, password){
		var encrypted = CryptoJS.AES.encrypt(password, "Secret Passphrase");
		var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
		// document.getElementById("encrypt").innerHTML = encrypted;
		// document.getElementById("msg").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);
		// document.getElementById("decrypt").innerHTML = decrypted;
		var url;
		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   			function(tabs){
      		 url = tabs[0].url;
   			}
		);
		store(username, encrypted);
	}
function StorePassword2(password){
		var encrypted = CryptoJS.AES.encrypt(password, "Secret Passphrase");
		var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
		// document.getElementById("encrypt").innerHTML = encrypted;
		
		// document.getElementById("msg").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);

		// document.getElementById("decrypt").innerHTML = decrypted;

		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   			function(tabs){
      		
      		//alert(tabs[0].url);
   			}
		);
	/*	chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, {action: "getSource"}, function(source) {
                alert(source);
            });
        });*/

		saveChanges(encrypted.toString());
	}
	function StorePassword3(password){
		var encrypted = CryptoJS.AES.encrypt(password, "Secret Passphrase");
		var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
		// document.getElementById("encrypt").innerHTML = encrypted;
		
		// document.getElementById("msg").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);

		// document.getElementById("decrypt").innerHTML = decrypted;

		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   			function(tabs){
      		
      		//alert(tabs[0].url);
   			}
		);
	/*	chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, {action: "getSource"}, function(source) {
                alert(source);
            });
        });*/

		saveChanges(encrypted.toString());
	}
	function StorePassword4(password){
		var encrypted = CryptoJS.AES.encrypt(password, "Secret Passphrase");
		var decrypted = CryptoJS.AES.decrypt(encrypted, "Secret Passphrase");
		// document.getElementById("encrypt").innerHTML = encrypted;
		
		// document.getElementById("msg").innerHTML = decrypted.toString(CryptoJS.enc.Utf8);

		// document.getElementById("decrypt").innerHTML = decrypted;

		chrome.tabs.query({'active': true, 'windowId': chrome.windows.WINDOW_ID_CURRENT},
   			function(tabs){
      		
      		//alert(tabs[0].url);
   			}
		);
	/*	chrome.tabs.getSelected(null, function (tab) {
            chrome.tabs.sendRequest(tab.id, {action: "getSource"}, function(source) {
                alert(source);
            });
        });*/

		saveChanges(encrypted.toString());
	}

	function ShowPasswords(passwords) {
		fLen = passwords.length;
		text = "<ul>";
		for (i = 0; i < fLen; i++) {
		    text += "<li>" + passwords[i] + "</li>";
		}
		document.getElementById("PasswordList").innerHTML = text;
	}

	function saveChanges(theValue) {
        
        
        // Check that there's some code there.
        if (!theValue) {
          confirm('Error: No value specified');
          return;
        }
        // Save it using the Chrome extension storage API.
        // alert(theValue);
        chrome.storage.sync.set({'value': theValue }, function() {
          // Notify that we saved.
        confirm('Settings saved');
        // alert("done");
        });
      }
