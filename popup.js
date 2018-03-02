chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
    chrome.tabs.sendMessage(tabs[0].id, {greeting: "hello"}, function(response) {	
		if(response == undefined || !response.showButtons){
			$("#allChange").hide();
			$("#copyBtn").hide();
		}
		
		if(response == undefined){
			$("#popupMessage").html("Rosie is compatible with Gmail, Outlook, Slack, LinkedIn, Yahoo, and GroupMe.");
			return;
		}
		
		let formatter = new textFormatter();
		let analyzer = new textAnalyzer();
		
		let toAnalyze = formatter.prepareForDisplay(response.messageText);
		
		$("#popupMessage").html(analyzer.analyze(toAnalyze));
		analyzer.registerEventListeners();
		
		new Clipboard('#copyBtn', {
			text: function(trigger){
				return formatter.prepareForCopy($("#popupMessage").html().toString());
			}
		});
    });
});
