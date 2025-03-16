var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());

function execute(key, page) {
    if (!page) page = '1';
    let response = browser.launch(`https://www.lightnovelpub.com/search?q=${encodeURIComponent(key)}&page=${page}`, 5000);
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
        let next = doc.select('.pagination .next a').attr('href') ? (parseInt(page) + 1).toString() : null;
        return Response.success(novels, next);
    }
    return Response.error("Failed to fetch search results.");
}
