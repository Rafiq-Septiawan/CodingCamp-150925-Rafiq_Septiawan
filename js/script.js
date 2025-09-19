document.addEventListener("DOMContentLoaded", () => {
  const inputTask = document.getElementById("taskInput");
  const inputDate = document.getElementById("dateInput");
  const btnAdd = document.getElementById("addBtn");
  const tbody = document.getElementById("todo-table-body");
  const filter = document.getElementById("filter");
  const btnDeleteAll = document.getElementById("deleteAllBtn");

  function formatTanggal(val) {
    const [y, m, d] = val.split("-");
    return `${d}/${m}/${y}`;
  }

  function tampilkanKosong() {
    if (!document.getElementById("row-kosong")) {
      const row = document.createElement("tr");
      row.id = "row-kosong";
      row.innerHTML = `<td colspan="4" class="px-4 py-2 text-center italic text-gray-500">Belum ada laporan</td>`;
      tbody.appendChild(row);
    }
  }

  function hapusKosong() {
    const row = document.getElementById("row-kosong");
    if (row) row.remove();
  }

  btnAdd.addEventListener("click", () => {
    const task = inputTask.value.trim();
    const date = inputDate.value;

    if (!task || !date) {
      alert("Harap isi kolom yang kosong");
      return;
    }

    hapusKosong();

    const tr = document.createElement("tr");
    tr.innerHTML = `
      <td class="px-4 py-2">${task}</td>
      <td class="px-4 py-2">${formatTanggal(date)}</td>
      <td class="px-4 py-2 status">Belum Selesai</td>
      <td class="px-4 py-2 flex gap-2">
        <button class="bg-green-500 text-white px-2 py-1 rounded btn-done">Selesai</button>
        <button class="bg-red-500 text-white px-2 py-1 rounded btn-del">Hapus</button>
      </td>
    `;

    tr.querySelector(".btn-done").addEventListener("click", () => {
      const cell = tr.querySelector(".status");
      if (cell.textContent === "Belum Selesai") {
        cell.textContent = "Selesai";
        cell.style.color = "green";
      } else {
        cell.textContent = "Belum Selesai";
        cell.style.color = "";
      }
      applyFilter();
    });

    tr.querySelector(".btn-del").addEventListener("click", () => {
      tr.remove();
      if (!tbody.querySelector("tr")) tampilkanKosong();
    });

    tbody.appendChild(tr);

    inputTask.value = "";
    inputDate.value = "";
    applyFilter();
  });

  btnDeleteAll.addEventListener("click", () => {
    tbody.innerHTML = "";
    tampilkanKosong();
  });

  filter.addEventListener("change", applyFilter);
  function applyFilter() {
    const val = filter.value;
    const rows = tbody.querySelectorAll("tr:not(#row-kosong)");

    rows.forEach(r => {
      const status = r.querySelector(".status")?.textContent.trim();
      if (val === "all" ||
          (val === "pending" && status === "Belum Selesai") ||
          (val === "done" && status === "Selesai")) {
        r.style.display = "";
      } else {
        r.style.display = "none";
      }
    });
  }

  tampilkanKosong();
});
