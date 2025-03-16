var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());

function execute(url) {
    let response = browser.launch(url, 5000);
    if (response) {
        let doc = response.html();
        let content = doc.select('.chapter-content').html().trim();
        return Response.success(content);
    }
    return Response.error("Failed to fetch chapter content.");
}
