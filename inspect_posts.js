
const fs = require('fs');
(async () => {
    try {
        const baseUrl = 'http://localhost:5120';
        const postsRes = await fetch(`${baseUrl}/api/posts`);
        const json = await postsRes.json();
        fs.writeFileSync('posts_dump.json', JSON.stringify(json, null, 2));
    } catch (e) { console.error(e); }
})();
