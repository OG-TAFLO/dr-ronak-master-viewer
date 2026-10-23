const versionButtons = Array.from(document.querySelectorAll(".version-button"));
const conceptFrames = Array.from(document.querySelectorAll(".concept-frame"));
const versionSwitcher = document.querySelector(".version-switcher");
const selectionStatus = document.querySelector("#selection-status");
let activeVersion = "v1";

function selectVersion(version) {
  if (version === activeVersion) {
    return;
  }

  const outgoingFrame = conceptFrames.find((frame) => frame.dataset.version === activeVersion);
  const incomingFrame = conceptFrames.find((frame) => frame.dataset.version === version);
  const selectedButton = versionButtons.find((button) => button.dataset.version === version);

  if (!outgoingFrame || !incomingFrame || !selectedButton || !versionSwitcher || !selectionStatus) {
    throw new Error(`Unable to select design concept "${version}".`);
  }

  conceptFrames.forEach((frame) => {
    frame.classList.remove("is-exiting");
    if (frame !== incomingFrame) {
      frame.classList.remove("is-active");
      frame.setAttribute("aria-hidden", "true");
      frame.tabIndex = -1;
    }
  });

  outgoingFrame.classList.add("is-exiting");
  incomingFrame.classList.add("is-active");
  incomingFrame.setAttribute("aria-hidden", "false");
  incomingFrame.tabIndex = 0;

  versionButtons.forEach((button, index) => {
    const isSelected = button === selectedButton;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-pressed", String(isSelected));
    if (isSelected) {
      versionSwitcher.style.setProperty("--selected-index", String(index));
    }
  });

  activeVersion = version;
  selectionStatus.textContent = `Showing design concept ${version.toUpperCase()}`;
}

versionButtons.forEach((button) => {
  button.addEventListener("click", () => selectVersion(button.dataset.version));
});

conceptFrames.forEach((frame) => {
  frame.addEventListener("transitionend", (event) => {
    if (event.propertyName === "opacity" && frame.classList.contains("is-exiting")) {
      frame.classList.remove("is-exiting");
    }
  });
});

document.querySelector(".presentation-brand").addEventListener("click", (event) => {
  event.preventDefault();
  const activeFrame = conceptFrames.find((frame) => frame.dataset.version === activeVersion);
  if (activeFrame?.contentWindow) {
    activeFrame.contentWindow.scrollTo({ top: 0, behavior: "smooth" });
  }
});
