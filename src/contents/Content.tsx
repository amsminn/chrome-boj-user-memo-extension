import { createRoot } from "react-dom/client";
import EditableInput from "../components/EditableInput";
import type {
  PlasmoCSConfig,
  PlasmoWatchOverlayAnchor,
  PlasmoGetInlineAnchor,
  PlasmoGetRootContainer,
  PlasmoRender,
  PlasmoCSUIMountState,
  PlasmoCSUIAnchor
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

export const getRootContainer: PlasmoGetRootContainer = async ({ anchor }) => {
  if (!anchor || !anchor.element) {
    throw new Error("Anchor element not found");
  }
  return anchor.element;
};

interface PlasmoRootContainer extends HTMLElement {
  __plasmoReactRoot?: ReturnType<typeof createRoot>;
}

export const render: PlasmoRender<unknown> = async ({ anchor }, _) => {
  const resolvedAnchor = anchor?.element || document.body;

  const mountState: PlasmoCSUIMountState = {
    document,
    observer: new MutationObserver(() => {}),
    mountInterval: 0 as unknown as NodeJS.Timer,
    isMounting: false,
    hostSet: new Set<Element>(),
    hostMap: new WeakMap<Element, PlasmoCSUIAnchor>(),
    isMutated: false,
    overlayTargetList: []
  };

  const rootContainer = await getRootContainer({ anchor, mountState }) as PlasmoRootContainer;
  let root;
  if (rootContainer.__plasmoReactRoot) {
    root = rootContainer.__plasmoReactRoot;
  } else {
    root = createRoot(rootContainer);
    rootContainer.__plasmoReactRoot = root;
  }

  const currentHandle = window.location.href.split("/").pop() || "default";
  const storageKey = `Boj_${currentHandle}`;

  root.render(<EditableInput storageKey={storageKey} />);
};