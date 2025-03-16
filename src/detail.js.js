var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());

function execute(url) {
    let response = browser.launch(url, 5000);
    if (response) {
        let doc = response.html();
        let name = doc.select('.novel-title').text().trim();
        let cover = doc.select('.novel-cover img').attr('src');
        let author = doc.select('.author').text().trim();
        let description = doc.select('.summary').text().trim();
        let ongoing = doc.select('.status').text().includes('Ongoing');
        let genres = [];
        doc.select('.genres a').forEach(genre => {
            genres.push({ title: genre.text().trim(), input: genre.attr('href'), script: 'genrecontent.js' });
        });
        return Response.success({ name, cover, author, description, ongoing, genres });
    }
    return Response.error("Failed to fetch novel details.");
}
