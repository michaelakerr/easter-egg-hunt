var pageTruth = false;
var chooser = 0;

function isPageElligible(){
    //check if page is from NZ
    if(window.location.href.indexOf("easter") > -1){
        pageTruth = true;
    }
    return pageTruth;
}

//Picks a random egg; Remember to add to Manifest as well.
function eggPicker(){
    var listofEggs = ["egg1.png", "egg2.png", "egg3.png", "egg4.png", "egg5.png"];
    var egg = listofEggs[Math.floor(Math.random() * listofEggs.length)];
    return egg;
}

function eggLoader(){
    //just an egg
    var img = document.createElement('img');
    var egg = eggPicker();
    img.src = chrome.extension.getURL(egg);
    img.width = "80";
    img.height = "120";

    var appender = document.getElementsByTagName('img');
    appender[0].parentNode.appendChild(img);
    
    //Update Egg Counter
    chrome.storage.sync.get({'eggsFound': 0}, function(obj) {
        chrome.storage.sync.set({'eggsFound': obj.eggsFound + 1});
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
