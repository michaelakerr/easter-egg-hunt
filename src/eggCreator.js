var pageTruth = false;

function isPageElligible(){
    //check if page is from NZ
    if(window.location.href.indexOf("easter") > -1){
        pageTruth = true;
    }
    return pageTruth;
}

function eggLoader(){
    //just add one to test
    var img = document.createElement('img');
    img.src = chrome.extension.getURL('egg1.png');
    img.width = "80";
    img.height = "120";
    //var appender = document.title;
    var appender = document.getElementsByTagName('img');
    console.log(appender);
    //appender[0].appendChild(img);
    appender[0].parentNode.appendChild(img);
    
    //Update Egg Counter
    chrome.storage.sync.get({'eggsFound': 0}, function(obj) {
        chrome.storage.sync.set({'eggsFound': obj.eggsFound + 1});
        console.log(obj.eggsFound);
    });
}

window.addEventListener('load', function() {
    // Check straight away after page load if enabled
    isPageElligible();
	chrome.storage.sync.get({'enabled': true}, function(obj) {
		if (obj.enabled && pageTruth == true) { //if page is elligble and loaded
			eggLoader();
		}
	});
});
