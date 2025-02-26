import React from "react";
import { createRoot } from "react-dom/client";
import type { PlasmoCSConfig } from "plasmo";
import MemoContainer from "../components/MemoContainer";

export const config: PlasmoCSConfig = {
  matches: ["https://www.acmicpc.net/user/*"]
};

console.log("[BOJ Memo] Content script loaded");

const runContentScript = () => {
  console.log("[BOJ Memo] Running content script");
  if (!document.body) return;

  const headerElement = document.querySelector(
    "body > div.wrapper > div.container.content > div.row > div:nth-child(1) > div > h1"
  );
  if (!headerElement) {
    console.warn("[BOJ Memo] Header element not found");
    return;
  }
  console.log("[BOJ Memo] Header element found");

  const headerContainer = headerElement.parentElement;
  if (!headerContainer) {
    console.warn("[BOJ Memo] Header container not found");
    return;
  }

  const headerWrapper = document.createElement("div");
  headerWrapper.style.display = "flex";
  headerWrapper.style.alignItems = "center";
  headerWrapper.style.columnGap = "10px";

  headerContainer.insertBefore(headerWrapper, headerElement);
  headerWrapper.appendChild(headerElement);

  let memoContainer = document.getElementById("boj-memo-container");
  if (!memoContainer) {
    memoContainer = document.createElement("div");
    memoContainer.id = "boj-memo-container";
    headerWrapper.appendChild(memoContainer);
  }
  console.log("[BOJ Memo] Memo container created");

  const urlParts = window.location.href.split("/").filter(Boolean);
  const currentHandle = urlParts[urlParts.length - 1];
  if (!currentHandle) {
    console.warn("[BOJ Memo] Handle not found in URL");
    return;
  }
  console.log("[BOJ Memo] Current handle:", currentHandle);

  const storageKey = `Boj_${currentHandle}`;

  try {
    if (!memoContainer.dataset.reactRoot) {
      memoContainer.dataset.reactRoot = "true";
      const root = createRoot(memoContainer);
      root.render(<MemoContainer storageKey={storageKey} />);
    }
  } catch (error) {
    console.error("[BOJ Memo] Error rendering MemoContainer:", error);
  }
  console.log("[BOJ Memo] MemoContainer rendered");
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", runContentScript);
} else {
  runContentScript();
}
