const copyAllTabURLs = async () => {
  browser.tabs.query({ currentWindow: true }, (tabs) => {
    const tabURLs = tabs.map((tab) => tab.url);

    let tabString = "";
    tabURLs.forEach((tab) => (tabString += `${tab}\r\n`));

    navigator.clipboard.writeText(tabString);
  });
};

document.getElementById("copy-btn").addEventListener("click", (ev) => {
  copyAllTabURLs();
});
