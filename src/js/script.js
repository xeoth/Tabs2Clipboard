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

  const tabURLs = clipboardContent.split(/\r?\n/);
  console.log(tabURLs);

  tabURLs.forEach((tab) => {
    browser.tabs.create({
      active: false,
      url: tab,
    });
  });
};

const copyButton = document.getElementById("copy-btn");
const openButton = document.getElementById("open-btn");

copyButton.addEventListener("click", (ev) => {
  copyAllTabURLs();

  copyButton.classList.add("active");
  setTimeout(() => {
    copyButton.classList.remove("active");
  }, 200);
});

openButton.addEventListener("click", (ev) => {
  openAllClipboardTabs();

  openButton.classList.add("active");
  setTimeout(() => {
    openButton.classList.remove("active");
  }, 750);
});
