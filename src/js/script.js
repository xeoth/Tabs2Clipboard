const copyAllTabURLs = () => {
  browser.tabs.query({ currentWindow: true }, (tabs) => {
    const tabURLs = tabs.map((tab) => tab.url);

    let tabString = "";
    tabURLs.forEach((tab) => (tabString += `${tab}\r\n`));

    navigator.clipboard.writeText(tabString);
  });
};

const openAllClipboardTabs = async () => {
  const clipboardContent = await navigator.clipboard.readText();

  const tabURLs = clipboardContent.split(/\r?\n/).filter((val) => (!val.startsWith("about:") && !val.startsWith("moz-extension") && val !== ""));

  tabURLs.forEach((tab) => {
    browser.tabs.create({
      active: false,
      url: tab,
    });
  });
};

const runClickVisual = (button, timeout) => {
  button.classList.add("active");
  setTimeout(() => {
    button.classList.remove("active");
  }, timeout);
};

const copyButton = document.getElementById("copy-btn");
const openButton = document.getElementById("open-btn");
const newwinButton = document.getElementById("newwin-btn");

copyButton.addEventListener("click", (ev) => {
  copyAllTabURLs();

  runClickVisual(copyButton, 250);
});

openButton.addEventListener("click", (ev) => {
  openAllClipboardTabs();

  runClickVisual(openButton, 250);
});

newwinButton.addEventListener("click", async (ev) => {
  const clipboardContent = await navigator.clipboard.readText();
  const tabURLs = clipboardContent.split(/\r?\n/).filter((val) => (!val.startsWith("about:") && !val.startsWith("moz-extension") && val !== ""));

  browser.windows.create({
    url: tabURLs,
  });

  runClickVisual(newwinButton, 250);
  
});
