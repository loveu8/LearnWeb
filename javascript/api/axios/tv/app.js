// -----
// http://api.tvmaze.com/search/shows

const form = document.querySelector('#searchForm');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    const searchTerm = form.elements.query.value.trim();
    if (!searchTerm) return; // 2. 邊界檢查：沒東西就不跑，減少無謂請求

    try {
        // 3. 使用 params 配置，這才叫專業的 API 呼叫
        const res = await axios.get('http://api.tvmaze.com/search/shows', {
            params: { q: searchTerm }
        });
        makeImage(res.data);
        form.elements.query.value = "";
    } catch (err) {
        console.error("Network or API is garbage:", err);
    }
});

const makeImage = (shows) => {
    const imgs = document.querySelectorAll('img');
    if (imgs) {
        for (let img of imgs) {
            img.remove();
        }
    }
    for (let result of shows) {
        if (result.show.image) {
            const img = document.createElement("IMG");
            img.src = result.show.image.medium;
            document.body.append(img);
        }
    }
}