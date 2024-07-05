document.addEventListener("DOMContentLoaded", function() {
    // deklarasi variabel html
    const tambahBarangBtn = document.getElementById('tambah-barang');
    const halamanPertama = document.getElementById('halaman-pertama');
    const halamanKedua = document.getElementById('halaman-kedua');
    const totalHargaPertama = document.getElementById('total-harga-pertama');
    const formsBarang = document.getElementById('form-barang');
    const tbody = document.querySelector('#barang-table tbody');
    const totalElement = document.getElementById('total');

    tambahBarangBtn.addEventListener('click', function() {
        halamanPertama.style.display = 'none';
        halamanKedua.style.display = 'block';
    });

    const simpanBarangBtn = document.getElementById('simpan-barang');
    simpanBarangBtn.addEventListener('click', simpanBarang);

    tbody.addEventListener('click', function(event) { // akan mendengarkan klik pada elemen - elemen di dalamnya.
        if (event.target.classList.contains('delete-row')) {
            event.target.closest('tr').remove();
            updateTotal();
        }
    });

    function simpanBarang() {
        const newRow = document.createElement('tr');
        newRow.innerHTML = `
            <td><input type="text" class="nama-barang"></td>
            <td><input type="number" class="harga-barang"></td>
            <td><input type="number" class="jumlah-barang"></td>
            <td class="subtotal">0</td>
            <td><button class="delete-row">Hapus</button></td>
        `;
        tbody.appendChild(newRow);
        halamanPertama.style.display = 'block';
        halamanKedua.style.display = 'none';
    }

    // untuk mengidentifikasi perubahan input pada tabel
    tbody.addEventListener('input', function(event) {
        const target = event.target; // Mengidentifikasi elemen yang menyebabkan perubahan input.
        if (target.classList.contains('harga-barang') || target.classList.contains('jumlah-barang')) {
            updateSubtotal(target.closest('tr'));
        }
    });

    // Menghitung subtotal dari sebuah baris berdasarkan harga dan jumlah barang.
    function updateSubtotal(row) {
        const hargaBarang = parseFloat(row.querySelector('.harga-barang').value) || 0;
        const jumlahBarang = parseFloat(row.querySelector('.jumlah-barang').value) || 0;
        const subtotal = hargaBarang * jumlahBarang;
        row.querySelector('.subtotal').textContent = subtotal;
        updateTotal();
    }

    function updateTotal() {
        const subtotals = document.querySelectorAll('.subtotal');
        let total = 0;
        subtotals.forEach(subtotal => {
            total += parseFloat(subtotal.textContent);
        });
        totalElement.textContent = total;
        totalHargaPertama.textContent = total; // Update total harga di halaman pertama
    }
});