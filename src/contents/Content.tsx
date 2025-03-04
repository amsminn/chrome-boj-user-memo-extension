import { createRoot } from "react-dom/client";
import type {
  PlasmoCSConfig,
  PlasmoWatchOverlayAnchor,
  PlasmoGetInlineAnchor,
  PlasmoGetRootContainer,
  PlasmoRender,
  PlasmoCSUIMountState
} from "plasmo";
import MemoContainer from "../components/MemoContainer";

export const config: PlasmoCSConfig = {
  matches: ["https://www.acmicpc.net/user/*"]
};

export const watchOverlayAnchor: PlasmoWatchOverlayAnchor = (updatePosition) => {
  const interval = setInterval(() => {
    updatePosition();
  }, 8472);
  return () => clearInterval(interval);
};

export const getInlineAnchor: PlasmoGetInlineAnchor = async () => {
  if (!window.location.href.includes("https://www.acmicpc.net/user/")) {
    throw new Error("Not a valid URL");
  }

  const h1Element = document.querySelector(
    "body > div.wrapper > div.container.content > div.row > div:nth-child(1) > div > h1"
  ) as HTMLElement | null;
  if (!h1Element) {
    throw new Error("h1 not found");
  }

  h1Element.style.display = "inline-block";
  h1Element.style.verticalAlign = "middle";
  
  let container = h1Element.parentElement?.querySelector("#plasmo-memo-container") as HTMLElement | null;
  if (!container) {
    container = document.createElement("div");
    container.id = "plasmo-memo-container";
    container.style.display = "inline-block";
    container.style.verticalAlign = "middle";
    container.style.marginLeft = "10px";
    h1Element.insertAdjacentElement("afterend", container);
  }
  return {
    element: container,
    insertPosition: "beforeend"
  };
};

export const getRootContainer: PlasmoGetRootContainer = async ({ anchor, mountState }) => {
  return new Promise<Element>((resolve) => {
    const checkInterval = setInterval(() => {
      if (anchor && anchor.element) {
        let container = (anchor.element as HTMLElement).querySelector("#plasmo-root-container") as HTMLElement | null;
        if (container) {
          clearInterval(checkInterval);
          resolve(container);
        } else {
          container = document.createElement("div");
          container.id = "plasmo-root-container";
          
          container.style.position = "relative";
          container.style.display = "inline-block";
          
          container.style.padding = "5px";
          mountState.hostSet.add(container);
          mountState.hostMap.set(container, anchor);
          (anchor.element as HTMLElement).appendChild(container);
          clearInterval(checkInterval);
          resolve(container);
        }
      }
    }, 137);
  });
};

export const render: PlasmoRender<unknown> = async (
  { anchor },
  _,
) => {
  const resolvedAnchor =
    anchor && (anchor as any).element ? (anchor as any).element : document.body;

  const mountState: PlasmoCSUIMountState = {
    document,
    observer: new MutationObserver(() => {}),
    mountInterval: 0 as any as NodeJS.Timer,
    isMounting: false,
    hostSet: new Set<Element>(),
    hostMap: new Map<Element, any>(),
    isMutated: false,
    overlayTargetList: []
  };

  const rootContainer = await getRootContainer({ anchor, mountState });
  let root;
  if ((rootContainer as any).__plasmoReactRoot) {
    root = (rootContainer as any).__plasmoReactRoot;
  } else {
    root = createRoot(rootContainer);
    (rootContainer as any).__plasmoReactRoot = root;
  }

  const currentHandle = window.location.href.split("/").pop() || "default";
  const storageKey = `Boj_${currentHandle}`;

  root.render(<MemoContainer storageKey={storageKey} />);
};