
(async () => {
    try {
        const baseUrl = 'http://localhost:5120';

        // Check products
        const productsRes = await fetch(`${baseUrl}/api/products`);
        const products = await productsRes.json();
        console.log("Products count:", products.products?.length);

        // Check posts
        const postsRes = await fetch(`${baseUrl}/api/posts`);
        if (postsRes.ok) {
            const posts = await postsRes.json();
            console.log("Posts status: OK");
            console.log("Posts sample:", JSON.stringify(posts, null, 2).substring(0, 500));
        } else {
            console.log("Posts status:", postsRes.status);
        }

    } catch (e) {
        console.error(e);
    }
})();
