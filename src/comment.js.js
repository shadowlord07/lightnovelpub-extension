var browser = Engine.newBrowser();
browser.setUserAgent(UserAgent.android());

function execute(url) {
    let response = browser.launch(url, 5000);
    if (response) {
        let doc = response.html();
        let comments = [];
        doc.select('.comment-item').forEach(comment => {
            let name = comment.select('.comment-user').text().trim();
            let content = comment.select('.comment-content').text().trim();
            comments.push({ name, content });
        });
        return Response.success(comments);
    }
    return Response.error("Failed to fetch comments.");
}
