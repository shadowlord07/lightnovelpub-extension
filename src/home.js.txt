var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());

function execute() {
    let response = browser.launch('https://www.lightnovelpub.com/', 5000);
    if (response) {
        let doc = response.html();
        let novels = [];
        doc.select('.novel-item').forEach(item => {
            let name = item.select('.novel-title').text().trim();
            let link = item.select('a').attr('href');
            let cover = item.select('img').attr('data-src');
            let description = item.select('.novel-summary').text().trim();
            novels.push({ name, link, cover, description });
        });
        return Response.success(novels);
    }
    return Response.error("Failed to fetch home page data.");
}
