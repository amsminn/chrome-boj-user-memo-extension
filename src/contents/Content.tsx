import { createRoot } from "react-dom/client";
import EditableInput from "../components/EditableInput";
import type {
  PlasmoCSConfig,
  PlasmoWatchOverlayAnchor,
  PlasmoGetInlineAnchor,
  PlasmoGetRootContainer,
  PlasmoRender,
  PlasmoCSUIMountState
} from "plasmo";

export const config: PlasmoCSConfig = {
  matches: ["https://www.acmicpc.net/user/*"],
  world: "MAIN"
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

  // h1 스타일 조정
  h1Element.style.display = "inline-block";
  h1Element.style.verticalAlign = "middle";

  // 기존에 plasmo-memo-container가 있는지 확인
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

export const getRootContainer: PlasmoGetRootContainer = async ({ anchor }) => {
  if (!anchor || !anchor.element) {
    throw new Error("Anchor element not found");
  }
  return anchor.element;
};

export const render: PlasmoRender<unknown> = async ({ anchor }, _) => {
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

  root.render(<EditableInput storageKey={storageKey} />);
};