import { useEffect, useState, useCallback } from "react";

interface TabChangeInfo extends chrome.tabs.TabChangeInfo {
  url?: string;
}

const useUrl = (): string => {
  const [url, setUrl] = useState<string>("");

  const updateUrl = useCallback((newUrl: string): void => {
    setUrl(newUrl);
  }, []);

  useEffect(() => {
    const getCurrentTabUrl = async (): Promise<void> => {
      const tabs = await chrome.tabs.query({ active: true, currentWindow: true });
      const currentUrl = tabs[0]?.url;
      if (currentUrl) {
        updateUrl(currentUrl);
      }
    };

    const handleTabUpdate = (
      _tabId: number,
      changeInfo: TabChangeInfo,
      tab: chrome.tabs.Tab
    ): void => {
      if (tab.active && changeInfo.url) {
        updateUrl(changeInfo.url);
      }
    };

    getCurrentTabUrl();
    chrome.tabs.onUpdated.addListener(handleTabUpdate);

    return () => {
      chrome.tabs.onUpdated.removeListener(handleTabUpdate);
    };
  }, [updateUrl]);

  return url;
};

export default useUrl;