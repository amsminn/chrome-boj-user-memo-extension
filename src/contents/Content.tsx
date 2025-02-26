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

  // 아이디(헤더) 요소 선택
  const headerElement = document.querySelector(
    "body > div.wrapper > div.container.content > div.row > div:nth-child(1) > div > h1"
  );
  if (!headerElement) {
    console.warn("[BOJ Memo] Header element not found");
    return;
  }
  console.log("[BOJ Memo] Header element found");

  // headerElement의 부모 컨테이너에서 header와 다른 칸이 같이 있다면,
  // header와 메모만 감싸는 별도의 wrapper를 만듭니다.
  const headerContainer = headerElement.parentElement;
  if (!headerContainer) {
    console.warn("[BOJ Memo] Header container not found");
    return;
  }

  // 새로운 래퍼를 생성하고, flex를 적용합니다.
  const headerWrapper = document.createElement("div");
  headerWrapper.style.display = "flex";
  headerWrapper.style.alignItems = "center";
  // h1 요소의 오른쪽에 여백을 주기 위해 flex item간 gap도 설정할 수 있습니다.
  headerWrapper.style.columnGap = "10px";

  // headerWrapper를 headerContainer의 headerElement 앞에 삽입하고,
  // headerElement를 headerWrapper의 자식으로 이동합니다.
  headerContainer.insertBefore(headerWrapper, headerElement);
  headerWrapper.appendChild(headerElement);

  // 기존의 메모 컨테이너가 있는지 확인
  let memoContainer = document.getElementById("boj-memo-container");
  if (!memoContainer) {
    memoContainer = document.createElement("div");
    memoContainer.id = "boj-memo-container";
    // 메모 컨테이너는 wrapper 안에 추가되므로 marginLeft는 wrapper의 columnGap로 처리합니다.
    headerWrapper.appendChild(memoContainer);
  }
  console.log("[BOJ Memo] Memo container created");

  // URL에서 현재 핸들(아이디) 추출
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
