function toggleAccordion(tableId) {
    var tables = document.querySelectorAll("table");
    tables.forEach(table => {
        table.style.display = (table.id === tableId) ? (table.style.display === "none" ? "table" : "none") : "none";
    });
}

let sortDirection = {}; // Stores sorting state for each table and column
function sortTable(tableId, columnIndex) {
    var table = document.getElementById(tableId);
    var rows = Array.from(table.rows).slice(1);
    var tbody = table.querySelector("tbody");

    // Initialize sorting state for the specific table if it doesn't exist
    if (!sortDirection[tableId]) {
        sortDirection[tableId] = {};
    }

    // Toggle sorting direction
    sortDirection[tableId][columnIndex] = !sortDirection[tableId][columnIndex];

    rows.sort((a, b) => {
        var cellA = a.cells[columnIndex].innerText.toLowerCase();
        var cellB = b.cells[columnIndex].innerText.toLowerCase();

        return sortDirection[tableId][columnIndex] 
            ? cellA.localeCompare(cellB, undefined, { numeric: true }) 
            : cellB.localeCompare(cellA, undefined, { numeric: true });
    });

    // Re-render sorted rows
    tbody.innerHTML = "";
    rows.forEach(row => tbody.appendChild(row));
}