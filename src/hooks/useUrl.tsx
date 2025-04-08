import { useEffect, useState } from "react";

const useUrl = () => {
    const [url, setUrl] = useState<string>("");
  
    useEffect(() => {
      chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if(tabs[0]?.url) {
          setUrl(tabs[0].url);
        }
      });
  
      const handleTabUpdate = (
        tabID: number,
        chageInfo: chrome.tabs.TabChangeInfo,
        tab: chrome.tabs.Tab
      ) => {
        if(tab.active && chageInfo.url) {
          setUrl(chageInfo.url);
        }
      };
  
      chrome.tabs.onUpdated.addListener(handleTabUpdate);
      
      return () => {
        chrome.tabs.onUpdated.removeListener(handleTabUpdate);
      };
    }, []);
  
    return url;
};

export default useUrl;