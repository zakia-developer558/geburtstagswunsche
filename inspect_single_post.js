const fs = require('fs');
(async () => {
    try {
        const baseUrl = 'http://localhost:5120';
        // Get first post slug
        const postsRes = await fetch(`${baseUrl}/api/posts`);
        const postsJson = await postsRes.json();

        if (postsJson.success && postsJson.posts.length > 0) {
            const firstSlug = postsJson.posts[0].slug;
            console.log('Fetching post with slug:', firstSlug);

            // Fetch single post
            const singlePostRes = await fetch(`${baseUrl}/api/posts?slug=${firstSlug}`);
            const singlePostJson = await singlePostRes.json();

            fs.writeFileSync('single_post_dump.json', JSON.stringify(singlePostJson, null, 2));
            console.log('Saved to single_post_dump.json');
        }
    } catch (e) {
        console.error(e);
    }
})();
