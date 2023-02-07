function arxiv_switch(url_){
    let newurl;
    if(url_.includes("arxiv.org")){
        if (url_.includes("abs")){
            newurl = url_.replace("abs", "pdf");
            newurl += ".pdf";
        }
        else if(url_.includes("pdf")){
            newurl = url_.replace("pdf", "abs");
            if(newurl.includes(".pdf")){
                newurl = newurl.replace(".pdf", "");
            }
        }
        if(url_!=newurl){
            chrome.tabs.update({url: newurl});
        }
    }

    if(url_.includes("aclanthology.org")){
        if(url_.endsWith("/")){
            newurl = url_.replace("/", ".pdf");
        }
        if(url_.includes("pdf")){
            newurl = url_.replace(".pdf", "/");
        }
        if(url_!=newurl){
            chrome.tabs.update({url: newurl});
        }
    }
    
}

chrome.action.onClicked.addListener( tab => {
    arxiv_switch(tab.url);
});

chrome.commands.onCommand.addListener(command => {
    if (command === "switch") {
        chrome.tabs.query({active: true, lastFocusedWindow: true}, tabs => {
            let url = tabs[0].url;
            arxiv_switch(url);
        });
    } 
});