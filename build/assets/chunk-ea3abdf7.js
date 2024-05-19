const{storage:n}=chrome,o={get(e,t){n.sync.get(t)},set(e){chrome.storage.sync.set(e)}},{runtime:s}=chrome,r={listener(e){s.onMessage.addListener(e)},send(e){s.sendMessage(e)}};export{r as m,o as s};
