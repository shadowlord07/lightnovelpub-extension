var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());

function execute() {
    let response = browser.launch('https://www.lightnovelpub.com/genres', 5000);
    if (response) {
        let doc = response.html();
        let genres = [];
        doc.select('.genre-item a').forEach(item => {
            let title = item.text().trim();
            let input = item.attr('href');
            genres.push({ title, input, script: 'genrecontent.js' });
        });
        return Response.success(genres);
    }
    return Response.error("Failed to fetch genres.");
}
