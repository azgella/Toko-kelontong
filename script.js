/* --- 1. DATA PRODUK (DATABASE) --- */
const dataProduk = [
    { id: 1, nama: "Beras Pandan Wangi 5kg", harga: 65000, tag: "Terlaris" },
    { id: 2, nama: "Minyak Goreng Tropis 2L", harga: 38000, tag: "Promo" },
    { id: 3, nama: "Gula Pasir Gulaku 1kg", harga: 14500, tag: null },
    { id: 4, nama: "Telur Omega (Isi 10)", harga: 28000, tag: "Segar" },
    { id: 5, nama: "Paket Anak Kos (5 Mie)", harga: 15000, tag: "Hemat" }
];

let keranjang = [];

/* --- 2. FUNGSI MENAMPILKAN BARANG --- */
function tampilkanProduk() {
    const container = document.getElementById('list-produk');
    container.innerHTML = ""; // Bersihkan dulu

    dataProduk.forEach(produk => {
        // Format Rupiah
        let hargaRp = new Intl.NumberFormat('id-ID').format(produk.harga);
        
        // Cek Tag
        let tagHTML = produk.tag ? `<span class="tag">${produk.tag}</span>` : '';

        // Template HTML
        container.innerHTML += `
            <div class="product-card">
                ${tagHTML}
                <div class="product-img-placeholder">Foto ${produk.nama}</div>
                <h3 class="product-title">${produk.nama}</h3>
                <p class="product-price">Rp ${hargaRp}</p>
                <button class="btn-aesthetic" onclick="tambahKeKeranjang(${produk.id})">
                    + Keranjang
                </button>
            </div>
        `;
    });
}

/* --- 3. FUNGSI TAMBAH KE KERANJANG --- */
function tambahKeKeranjang(id) {
    let item = dataProduk.find(p => p.id === id);
    keranjang.push(item);
    
    // Update tombol di navbar
    document.querySelector('.cart-icon').innerText = `Keranjang (${keranjang.length})`;
    
    // Efek visual sederhana (alert)
    alert(`${item.nama} berhasil masuk keranjang!`);
}

/* --- 4. FUNGSI KIRIM KE WHATSAPP --- */
function checkoutWhatsApp() {
    if (keranjang.length === 0) {
        alert("Keranjang masih kosong, nih!");
        return;
    }

    let nomorHP = "628953821126"; // GANTI NOMOR WA ANDA DI SINI (Tanpa tanda +)
    
    let pesan = `Halo Min, saya mau pesan:%0A`;
    let total = 0;

    keranjang.forEach((item, i) => {
        pesan += `${i+1}. ${item.nama} - Rp ${item.harga}%0A`;
        total += item.harga;
    });

    pesan += `%0A*Total Bayar: Rp ${total}*`;

    // Buka WA
    window.open(`https://wa.me/${nomorHP}?text=${pesan}`, '_blank');
}

// Jalankan saat halaman dibuka pertama kali

window.onload = tampilkanProduk;
