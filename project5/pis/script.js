let inventory = [];

async function loadInventory() {
    const res = await fetch("inventory.json");
    inventory = await res.json();
    renderInventory();
}

function renderInventory() {
    const table = document.getElementById("invTable");
    table.innerHTML = "";
    let total = 0;

    inventory.forEach((p, i) => {
        total += p.price * p.stock;

        const low = p.stock < 3 ? "style='color:red'" : "";

        table.innerHTML += `
        <tr ${low}>
          <td>${p.id}</td>
          <td>${p.name}</td>
          <td>${p.category}</td>
          <td>${p.price}</td>
          <td>${p.stock}</td>
          <td><button onclick="delProd(${i})">Delete</button></td>
        </tr>`;
    });

    document.getElementById("total").textContent = "Total Value: ₹" + total;
}

function delProd(i) {
    inventory.splice(i, 1);
    renderInventory();
}
