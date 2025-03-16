var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());

function execute(url) {
    let response = browser.launch(url, 5000);
    if (response) {
        let doc = response.html();
        let chapters = [];
        doc.select('.chapter-list a').forEach(chap => {
            let name = chap.text().trim();
            let link = chap.attr('href');
            chapters.push({ name, url: link });
        });
        return Response.success(chapters);
    }
    return Response.error("Failed to fetch table of contents.");
}
