const IFRAME_ID = 'my-extension-iframe';
const DESIRED_SIZE = { width: 375, height: 375 };
const VIEWPORT_MARGIN = 10;

function createExtensionIframe() {
  const iframe = document.createElement('iframe');
  iframe.id = IFRAME_ID;
  iframe.src = chrome.runtime.getURL('src/index.html');
  iframe.style.cssText = `
    position: fixed;
    top: ${VIEWPORT_MARGIN}px;
    right: ${VIEWPORT_MARGIN}px;
    width: ${DESIRED_SIZE.width}px;
    height: ${DESIRED_SIZE.height}px;
    border: 1px solid #968EF3;
    border-radius: 12px;
    z-index: 2147483647;
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    display: none;
    background: transparent;
    pointer-events: auto;
    max-width: calc(100vw - ${VIEWPORT_MARGIN * 2}px);
    max-height: calc(100vh - ${VIEWPORT_MARGIN * 2}px);
  `;
  document.body.appendChild(iframe);

  updateIframeBounds(iframe);

  return iframe;
}

let iframe = null;
let outsideListener = null;
let keyListener = null;
let resizeListener = null;

function updateIframeBounds(target = iframe) {
  if (!target) return;
  const availW = Math.max(0, window.innerWidth - VIEWPORT_MARGIN * 2);
  const availH = Math.max(0, window.innerHeight - VIEWPORT_MARGIN * 2);
  const w = Math.min(DESIRED_SIZE.width, availW);
  const h = Math.min(DESIRED_SIZE.height, availH);
  target.style.width = `${w}px`;
  target.style.height = `${h}px`;
}

function removeListeners() {
  if (outsideListener) {
    document.removeEventListener('mousedown', outsideListener, true);
    outsideListener = null;
  }
  if (keyListener) {
    document.removeEventListener('keydown', keyListener, true);
    keyListener = null;
  }
  if (resizeListener) {
    window.removeEventListener('resize', resizeListener, true);
    window.removeEventListener('orientationchange', resizeListener, true);
    resizeListener = null;
  }
}

function attachOutsideCloseHandlers() {
  outsideListener = (e) => {
    if (!iframe) return;
    if (iframe.contains(e.target)) return;
    iframe.style.display = 'none';
    removeListeners();
  };
  document.addEventListener('mousedown', outsideListener, true);

  keyListener = (e) => {
    if (e.key === 'Escape') {
      if (iframe) iframe.style.display = 'none';
      removeListeners();
    }
  };
  document.addEventListener('keydown', keyListener, true);

  resizeListener = () => updateIframeBounds();
  window.addEventListener('resize', resizeListener, true);
  window.addEventListener('orientationchange', resizeListener, true);
}

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.action === 'togglePopup') {
    if (!iframe) {
      iframe = createExtensionIframe();
    }
    const isHidden = iframe.style.display === 'none' || getComputedStyle(iframe).display === 'none';
    if (isHidden) {
      updateIframeBounds(iframe);
      iframe.style.display = 'block';
      attachOutsideCloseHandlers();
    } else {
      iframe.style.display = 'none';
      removeListeners();
    }
    sendResponse({ success: true });
  }
  return true;
});