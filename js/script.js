document.addEventListener("DOMContentLoaded", () => {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const addBtn = document.getElementById("addBtn");
  const tableBody = document.getElementById("todo-table-body");
  const filterSelect = document.getElementById("filter");

  // Helper: format tanggal yyyy-mm-dd → dd/mm/yyyy
  const formatDate = dateStr => {
    const [y, m, d] = dateStr.split("-");
    return `${d}/${m}/${y}`;
  };

  // Helper: tampilkan baris "No task found"
  function showEmptyRow() {
    if (!document.getElementById("empty-row")) {
      const row = document.createElement("tr");
      row.id = "empty-row";
      row.innerHTML = `
        <td colspan="4" class="px-4 py-2 text-center text-gray-400">
          No task found
        </td>
      `;
      tableBody.appendChild(row);
    }
  }

  // Hapus baris "No task found" kalau ada task baru
  function removeEmptyRow() {
    const emptyRow = document.getElementById("empty-row");
    if (emptyRow) emptyRow.remove();
  }

  // Tambah Todo
  addBtn.addEventListener("click", () => {
    const task = taskInput.value.trim();
    const dueDate = dateInput.value;

    if (!task || !dueDate) {
      alert("Isi dulu semua fieldnya!");
      return;
    }

    removeEmptyRow();

    const row = document.createElement("tr");
    row.innerHTML = `
      <td class="px-4 py-2">${task}</td>
      <td class="px-4 py-2">${formatDate(dueDate)}</td>
      <td class="px-4 py-2 status">Belum Selesai</td>
      <td class="px-4 py-2 flex gap-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded btn-success">Selesai</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded btn-danger">Hapus</button>
      </td>
    `;

    // Tombol selesai
    row.querySelector(".btn-success").addEventListener("click", () => {
      const statusCell = row.querySelector(".status");
      statusCell.textContent =
        statusCell.textContent === "Belum Selesai" ? "Selesai ✅" : "Belum Selesai";
      statusCell.style.color =
        statusCell.textContent.includes("Selesai") ? "green" : "";
      applyFilter();
    });

    // Tombol hapus
    row.querySelector(".btn-danger").addEventListener("click", () => {
      row.remove();
      if (!tableBody.querySelector("tr")) {
        showEmptyRow();
      }
    });

    tableBody.appendChild(row);

    taskInput.value = "";
    dateInput.value = "";
    applyFilter();
  });

  // Filter
  filterSelect.addEventListener("change", applyFilter);
  function applyFilter() {
    const filter = filterSelect.value;
    const rows = tableBody.querySelectorAll("tr:not(#empty-row)");

    rows.forEach(row => {
      const statusCell = row.querySelector(".status");
      if (!statusCell) return;
      const status = statusCell.textContent.trim();
      row.style.display =
        filter === "all" ||
        (filter === "pending" && status === "Belum Selesai") ||
        (filter === "done" && status.startsWith("Selesai"))
          ? ""
          : "none";
    });
  }

  // Saat pertama kali load → tampilkan "No task found"
  showEmptyRow();
});