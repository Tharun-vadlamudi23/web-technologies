const searchInput = document.getElementById("search");
const results = document.getElementById("results");

let timer;

searchInput.addEventListener("input", () => {
    clearTimeout(timer);

    timer = setTimeout(() => {
        const query = searchInput.value.toLowerCase();

        fetch("products.json")
            .then(res => res.json())
            .then(products => {
                results.innerHTML = "";

                const filtered = products.filter(p =>
                    p.name.toLowerCase().includes(query)
                );

                if (filtered.length === 0) {
                    results.innerHTML = "<li>No results found</li>";
                    return;
                }

                filtered.forEach(p => {
                    const li = document.createElement("li");
                    li.textContent = `${p.name} - ₹${p.price} (${p.category})`;
                    results.appendChild(li);
                });
            })
            .catch(() => results.innerHTML = "<li>Error loading data</li>");
    }, 500); // debounce delay
});
