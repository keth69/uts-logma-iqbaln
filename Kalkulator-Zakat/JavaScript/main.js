const hargaEmas = 2321000;
const hargaPerak = 26600;
const hargaGabah = 8000;
const nishabEmas = 85;
const nishabPerak = 595;
const nishabPertanian = 653; 
const nishabRupiah = nishabEmas * hargaEmas;
const nishabPenghasilanBulanan = nishabRupiah / 12;
const zakatFitrahKg = 2.5;
const hargaBerasPerKg = 15000;
let jumlahZakatTerhitung = 0;


document.addEventListener('DOMContentLoaded', () => {
    const radioMal = document.getElementById('pilihMal');
    const radioFitrah = document.getElementById('pilihFitrah');
    const malContainer = document.getElementById('zakatMalContainer');
    const fitrahContainer = document.getElementById('zakatFitrahContainer');

    const hasilElement = document.getElementById('hasil');
    const penjelasanElement = document.getElementById('penjelasan');
    const distribusiContainer = document.getElementById('distribusiContainer');
    const hasilDistribusiEl = document.getElementById('hasilDistribusi');
    const penjelasanDistribusiEl = document.getElementById('penjelasanLogikaDistribusi');

    // fungsi bantu lokal untuk mereset area hasil & distribusi
    function resetHasil() {
        if (hasilElement) hasilElement.innerHTML = '';
        if (penjelasanElement) penjelasanElement.innerHTML = '';
        if (distribusiContainer) distribusiContainer.classList.add('hidden');
        if (hasilDistribusiEl) hasilDistribusiEl.innerHTML = '';
        if (penjelasanDistribusiEl) penjelasanDistribusiEl.innerHTML = '';
        jumlahZakatTerhitung = 0;
    }

    if (radioMal) {
        radioMal.addEventListener('change', () => {
            if (radioMal.checked) {
                if (malContainer) malContainer.classList.remove('hidden');
                if (fitrahContainer) fitrahContainer.classList.add('hidden');
                resetHasil();
            }
        });
    }

    if (radioFitrah) {
        radioFitrah.addEventListener('change', () => {
            if (radioFitrah.checked) {
                if (malContainer) malContainer.classList.add('hidden');
                if (fitrahContainer) fitrahContainer.classList.remove('hidden');
                resetHasil();
            }
        });
    }

    // daftar section zakat mal
    const zakatSections = [
        { checkId: 'cekEmas', sectionId: 'emasSection' },
        { checkId: 'cekPertanian', sectionId: 'pertanianSection' },
        { checkId: 'cekPenghasilan', sectionId: 'penghasilanSection' },
        { checkId: 'cekPerak', sectionId: 'perakSection' },
        { checkId: 'cekUang', sectionId: 'uangSection' },
        { checkId: 'cekNiaga', sectionId: 'niagaSection' },
        { checkId: 'cekPeternakan', sectionId: 'peternakanSection' },
        { checkId: 'cekTambang', sectionId: 'tambangSection' },
        { checkId: 'cekInvestasi', sectionId: 'investasiSection' },
        { checkId: 'cekTabungan', sectionId: 'tabunganSection' },
        { checkId: 'cekRikaz', sectionId: 'rikazSection' }
    ];

    // listener checkbox zakat mal
    zakatSections.forEach(item => {
        const checkbox = document.getElementById(item.checkId);
        const section = document.getElementById(item.sectionId);

        if (checkbox && section) {
            checkbox.addEventListener('change', () => {
                checkbox.checked ? section.classList.remove('hidden') : section.classList.add('hidden');
                
                if (!checkbox.checked) {
                    const inputs = section.querySelectorAll('input[type="number"], input[type="text"], textarea');
                    inputs.forEach(i => i.value = '');
                    resetHasil();
                }
            });
        }
    });
});

// fungsi bantuan: ambil angka dari input
function getAngka(id) {
    const el = document.getElementById(id);
    if (!el) return 0;
    return parseFloat(el.value) || 0;
}

// fungsi format rupiah
function formatRupiah(number) {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(number);
}

// fungsi zakat logika if else dan aritmatika
function hitungZakatMal() {
    let totalZakatRupiah = 0;
    let hasilPerhitunganHTML = '<h3 class="text-lg font-semibold mb-2">Rincian Perhitungan Zakat Mal:</h3><ul class="list-disc list-inside space-y-1">';
    let penjelasanLogikaHTML = '<h3 class="text-lg font-semibold mb-2">Penjelasan Logika Zakat Mal:</h3><ul class="list-disc list-inside space-y-1">';

    const distribusiContainer = document.getElementById('distribusiContainer');
    const hasilDistribusiEl = document.getElementById('hasilDistribusi');
    const penjelasanDistribusiEl = document.getElementById('penjelasanLogikaDistribusi');
    
    // Zakat Emas
    const cekEmasEl = document.getElementById('cekEmas');
    if (cekEmasEl && cekEmasEl.checked) {
        const emas = getAngka('emas');
        const haulEmas = getAngka('haulEmas');
        const wajibZakatEmas = (emas >= nishabEmas) && (haulEmas >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Emas:</b> Anda memiliki emas ${emas} g, haul ${haulEmas} tahun. Nishab ${nishabEmas} g. Wajib: <b>${wajibZakatEmas}</b>.</li>`;
        if (wajibZakatEmas) {
            const zakatRupiah = (emas * 0.025) * hargaEmas;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Emas: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Emas: Tidak Wajib</li>`;
        }
    }

    // Zakat Perak
    const cekPerakEl = document.getElementById('cekPerak');
    if (cekPerakEl && cekPerakEl.checked) {
        const perak = getAngka('perak');
        const haulPerak = getAngka('haulPerak');
        const wajibZakatPerak = (perak >= nishabPerak) && (haulPerak >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Perak:</b> Anda memiliki perak ${perak} g, haul ${haulPerak} tahun. Nishab ${nishabPerak} g. Wajib: <b>${wajibZakatPerak}</b>.</li>`;
        if (wajibZakatPerak) {
            const zakatRupiah = (perak * 0.025) * hargaPerak;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Perak: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Perak: Tidak Wajib</li>`;
        }
    }

    // Zakat Uang
    const cekUangEl = document.getElementById('cekUang');
    if (cekUangEl && cekUangEl.checked) {
        const uang = getAngka('uang');
        const haulUang = getAngka('haulUang');
        const wajibZakatUang = (uang >= nishabRupiah) && (haulUang >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Uang:</b> Anda memiliki uang ${formatRupiah(uang)}, haul ${haulUang} tahun. Nishab rupiah: ${formatRupiah(nishabRupiah)}. Wajib: <b>${wajibZakatUang}</b>.</li>`;
        if (wajibZakatUang) {
            const zakatRupiah = uang * 0.025;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Uang: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Uang: Tidak Wajib</li>`;
        }
    }

    // Zakat Penghasilan
    const cekPenghasilanEl = document.getElementById('cekPenghasilan');
    if (cekPenghasilanEl && cekPenghasilanEl.checked) {
        const penghasilanBulanan = getAngka('gaji');
        const penghasilanTahunan = penghasilanBulanan * 12;
        const wajibZakatPenghasilan = (penghasilanBulanan >= nishabPenghasilanBulanan);
        penjelasanLogikaHTML += `<li><b>Zakat Penghasilan:</b> Penghasilan bulanan ${formatRupiah(penghasilanBulanan)}. Nishab bulanan ~ ${formatRupiah(nishabPenghasilanBulanan)}. Wajib: <b>${wajibZakatPenghasilan}</b>.</li>`;
        if (wajibZakatPenghasilan) {
            //mengambil 2.5% dari gaji TAHUNAN, dibayar saat haul (akhir tahun).
            const zakatRupiah = penghasilanTahunan * 0.025;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Penghasilan (per tahun): ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Penghasilan: Tidak Wajib</li>`;
        }
    }

    // zakat pertanian
    const cekPertanianEl = document.getElementById('cekPertanian');
    if (cekPertanianEl && cekPertanianEl.checked) {
        const hasilPanen = getAngka('hasilPanen');
        const wajibZakatPertanian = (hasilPanen >= nishabPertanian);
        penjelasanLogikaHTML += `<li><b>Zakat Pertanian:</b> Hasil panen ${hasilPanen} kg. Nishab ${nishabPertanian} kg. Wajib: <b>${wajibZakatPertanian}</b>.</li>`;
        if (wajibZakatPertanian) {
            const zakatRupiah = (hasilPanen * hargaGabah) * 0.05; // 5% dari nilai rupiah
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Pertanian (5%): ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Pertanian: Tidak Wajib</li>`;
        }
    }

    // zakat perniagaan
    const cekNiagaEl = document.getElementById('cekNiaga');
    if (cekNiagaEl && cekNiagaEl.checked) {
        const barangNiaga = getAngka('barangNiaga');
        const labaNiaga = getAngka('labaNiaga');
        const utangNiaga = getAngka('utangNiaga');
        const haulNiaga = getAngka('haulNiaga');
        const totalHartaNiaga = (barangNiaga + labaNiaga) - utangNiaga;
        
        const wajibZakatNiaga = (totalHartaNiaga >= nishabRupiah) && (haulNiaga >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Niaga:</b> Harta bersih ${formatRupiah(totalHartaNiaga)}, haul ${haulNiaga} tahun. Nishab ${formatRupiah(nishabRupiah)}. Wajib: <b>${wajibZakatNiaga}</b>.</li>`;
        if (wajibZakatNiaga) {
            const zakatRupiah = totalHartaNiaga * 0.025;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Niaga: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Niaga: Tidak Wajib</li>`;
        }
    }

    // -zakat peternakan
    const cekPeternakanEl = document.getElementById('cekPeternakan');
    if (cekPeternakanEl && cekPeternakanEl.checked) {
        const hasilPeternakan = getAngka('hasilPeternakan');
        const haulPeternakan = getAngka('haulPeternakan');
        const wajibZakatPeternakan = (hasilPeternakan >= nishabRupiah) && (haulPeternakan >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Peternakan:</b> Nilai hasil ${formatRupiah(hasilPeternakan)}, haul ${haulPeternakan} tahun. Nishab ${formatRupiah(nishabRupiah)}. Wajib: <b>${wajibZakatPeternakan}</b>.</li>`;
        if (wajibZakatPeternakan) {
            const zakatRupiah = hasilPeternakan * 0.025;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Peternakan: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Peternakan: Tidak Wajib</li>`;
        }
    }

    // zakat pertambangan
    const cekTambangEl = document.getElementById('cekTambang');
    if (cekTambangEl && cekTambangEl.checked) {
        const hasilTambang = getAngka('hasilTambang');
        const haulTambang = getAngka('haulTambang');
        const wajibZakatTambang = (hasilTambang >= nishabRupiah) && (haulTambang >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Tambang:</b> Nilai hasil ${formatRupiah(hasilTambang)}, haul ${haulTambang} tahun. Nishab ${formatRupiah(nishabRupiah)}. Wajib: <b>${wajibZakatTambang}</b>.</li>`;
        if (wajibZakatTambang) {
            const zakatRupiah = hasilTambang * 0.025;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Tambang: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Tambang: Tidak Wajib</li>`;
        }
    }

    // zakat investasi
    const cekInvestasiEl = document.getElementById('cekInvestasi');
    if (cekInvestasiEl && cekInvestasiEl.checked) {
        const hasilInvestasi = getAngka('hasilInvestasi');
        const haulInvestasi = getAngka('haulInvestasi');
        // Qiyas ke zakat niaga/uang atas keuntungannya
        const wajibZakatInvestasi = (hasilInvestasi >= nishabRupiah) && (haulInvestasi >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Investasi:</b> Keuntungan ${formatRupiah(hasilInvestasi)}, haul ${haulInvestasi} tahun. Nishab ${formatRupiah(nishabRupiah)}. Wajib: <b>${wajibZakatInvestasi}</b>.</li>`;
        if (wajibZakatInvestasi) {
            const zakatRupiah = hasilInvestasi * 0.025;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Investasi (dari profit): ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Investasi: Tidak Wajib</li>`;
        }
    }
    
    // zakat tabungan
    const cekTabunganEl = document.getElementById('cekTabungan');
    if (cekTabunganEl && cekTabunganEl.checked) {
        const tabungan = getAngka('tabungan');
        const haulTabungan = getAngka('haulTabungan');
        const wajibZakatTabungan = (tabungan >= nishabRupiah) && (haulTabungan >= 1);
        penjelasanLogikaHTML += `<li><b>Zakat Tabungan:</b> Saldo ${formatRupiah(tabungan)}, haul ${haulTabungan} tahun. Nishab ${formatRupiah(nishabRupiah)}. Wajib: <b>${wajibZakatTabungan}</b>.</li>`;
        if (wajibZakatTabungan) {
            const zakatRupiah = tabungan * 0.025;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Tabungan: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Tabungan: Tidak Wajib</li>`;
        }
    }

    // zakat rikaz
    const cekRikazEl = document.getElementById('cekRikaz');
    if (cekRikazEl && cekRikazEl.checked) {
        const rikaz = getAngka('rikaz');
        const wajibZakatRikaz = (rikaz > 0);
        penjelasanLogikaHTML += `<li><b>Zakat Rikaz:</b> Nilai temuan ${formatRupiah(rikaz)}. Tidak ada nishab/haul, zakat 20%. Wajib: <b>${wajibZakatRikaz}</b>.</li>`;
        if (wajibZakatRikaz) {
            const zakatRupiah = rikaz * 0.20;
            totalZakatRupiah += zakatRupiah;
            hasilPerhitunganHTML += `<li>Zakat Rikaz: ${formatRupiah(zakatRupiah)}</li>`;
        } else {
            hasilPerhitunganHTML += `<li>Zakat Rikaz: Tidak Wajib</li>`;
        }
    }


    // output akhir
    hasilPerhitunganHTML += '</ul>';
    penjelasanLogikaHTML += '</ul>';

    const hasilElement = document.getElementById('hasil');
    const penjelasanElement = document.getElementById('penjelasan');

    if (hasilElement) {
        if (totalZakatRupiah > 0) {
            hasilElement.innerHTML = `${hasilPerhitunganHTML}
            <hr class="my-3">
            <h3 class="text-xl font-bold text-gray-800">Total Kewajiban Zakat Mal: ${formatRupiah(totalZakatRupiah)}</h3>`;
            jumlahZakatTerhitung = totalZakatRupiah;
            const totalZakatDistribusiEl = document.getElementById('totalZakatDistribusi');
            if (totalZakatDistribusiEl) totalZakatDistribusiEl.textContent = formatRupiah(jumlahZakatTerhitung);
            if (distribusiContainer) distribusiContainer.classList.remove('hidden');
            if (hasilDistribusiEl) hasilDistribusiEl.innerHTML = '';
            if (penjelasanDistribusiEl) penjelasanDistribusiEl.innerHTML = '';
        } else {
            hasilElement.innerHTML = `${hasilPerhitunganHTML}
            <hr class="my-3">
            <h3 class="text-xl font-bold text-gray-800">Total Kewajiban Zakat Mal: ${formatRupiah(0)}</h3>
            <p>Tidak ada kewajiban Zakat Mal dari item yang dipilih, atau nishab/haul tidak terpenuhi.</p>`;
            jumlahZakatTerhitung = 0;
            if (distribusiContainer) distribusiContainer.classList.add('hidden');
            if (hasilDistribusiEl) hasilDistribusiEl.innerHTML = '';
            if (penjelasanDistribusiEl) penjelasanDistribusiEl.innerHTML = '';
        }
    }

    if (penjelasanElement) penjelasanElement.innerHTML = penjelasanLogikaHTML;
}

// fungsi zakat fitrah
function hitungZakatFitrah() {
    let hasilPerhitunganHTML = '<h3 class="text-lg font-semibold mb-2">Rincian Perhitungan Zakat Fitrah:</h3><ul class="list-disc list-inside space-y-1">';
    let penjelasanLogikaHTML = '<h3 class="text-lg font-semibold mb-2">Penjelasan Logika Zakat Fitrah:</h3><ul class="list-disc list-inside space-y-1">';

    const jumlahJiwa = getAngka('jumlahJiwa');
    const wajibZakatFitrah = (jumlahJiwa > 0);

    penjelasanLogikaHTML += `<li><b>Zakat Fitrah:</b> Wajib atas setiap jiwa. Premis: (Jumlah Jiwa > 0). Hasil: (${jumlahJiwa} > 0) → <b>${wajibZakatFitrah}</b>.</li>`;

    const hasilElement = document.getElementById('hasil');
    const penjelasanElement = document.getElementById('penjelasan');
    const distribusiContainer = document.getElementById('distribusiContainer');
    const hasilDistribusiEl = document.getElementById('hasilDistribusi');
    const penjelasanDistribusiEl = document.getElementById('penjelasanLogikaDistribusi');

    if (wajibZakatFitrah) {
        const totalBeras = jumlahJiwa * zakatFitrahKg;
        const totalRupiah = totalBeras * hargaBerasPerKg;

        hasilPerhitunganHTML += `<li>Kewajiban per jiwa: ${zakatFitrahKg} kg beras</li>`;
        hasilPerhitunganHTML += `<li>Total Jiwa: ${jumlahJiwa} orang</li>`;
        hasilPerhitunganHTML += `<li><b>Total Beras: ${totalBeras.toFixed(1)} kg</b></li>`;

        if (hasilElement) {
            hasilElement.innerHTML = `${hasilPerhitunganHTML}</ul>
            <hr class="my-3">
            <h3 class="text-xl font-bold text-gray-800">Total Kewajiban Zakat Fitrah (jika dinilai uang): ${formatRupiah(totalRupiah)}</h3>
            <p class="text-sm text-gray-600">(Berdasarkan asumsi harga beras ${formatRupiah(hargaBerasPerKg)} per kg)</p>`;
        }

        jumlahZakatTerhitung = totalRupiah;
        const totalZakatDistribusiEl = document.getElementById('totalZakatDistribusi');
        if (totalZakatDistribusiEl) totalZakatDistribusiEl.textContent = formatRupiah(jumlahZakatTerhitung);
        if (distribusiContainer) distribusiContainer.classList.remove('hidden');
        if (hasilDistribusiEl) hasilDistribusiEl.innerHTML = '';
        if (penjelasanDistribusiEl) penjelasanDistribusiEl.innerHTML = '';
    } else {
        hasilPerhitunganHTML += `<li>Tidak ada jiwa yang diinput.</li></ul>`;
        if (hasilElement) {
            hasilElement.innerHTML = `${hasilPerhitunganHTML}
            <hr class="my-3">
            <h3 class="text-xl font-bold text-gray-800">Total Kewajiban Zakat Fitrah: ${formatRupiah(0)}</h3>`;
        }
        jumlahZakatTerhitung = 0;
        if (distribusiContainer) distribusiContainer.classList.add('hidden');
        if (hasilDistribusiEl) hasilDistribusiEl.innerHTML = '';
        if (penjelasanDistribusiEl) penjelasanDistribusiEl.innerHTML = '';
    }

    if (penjelasanElement) penjelasanElement.innerHTML = penjelasanLogikaHTML;
}

// cek zakat
function cekZakat() {
    const pilihMalEl = document.getElementById('pilihMal');
    const pilihFitrahEl = document.getElementById('pilihFitrah');
    const pilihMal = pilihMalEl ? pilihMalEl.checked : false;
    const pilihFitrah = pilihFitrahEl ? pilihFitrahEl.checked : false;

    const distrib = document.getElementById('distribusiContainer');
    const hasilDistrib = document.getElementById('hasilDistribusi');
    const penjelasanDistrib = document.getElementById('penjelasanLogikaDistribusi');
    if (distrib) distrib.classList.add('hidden');
    if (hasilDistrib) hasilDistrib.innerHTML = '';
    if (penjelasanDistrib) penjelasanDistrib.innerHTML = '';

    if (pilihMal) {
        hitungZakatMal();
    } else if (pilihFitrah) {
        hitungZakatFitrah();
    } else {
        const hasilElement = document.getElementById('hasil');
        const penjelasanElement = document.getElementById('penjelasan');
        if (hasilElement) hasilElement.innerHTML = '<p class="text-red-600 font-bold"><b>Error:</b> Silakan pilih jenis zakat terlebih dahulu (Mal atau Fitrah).</p>';
        if (penjelasanElement) penjelasanElement.innerHTML = '';
    }
}

/**
 * distribusikanZakat
 */
function distribusikanZakat() {
    const semuaCheckbox = document.querySelectorAll('.mustahik-check');
    const checkboxTerpilih = Array.from(semuaCheckbox).filter(cb => cb.checked);
    const jumlahPenerima = checkboxTerpilih.length;
    const hasilDistribusiEl = document.getElementById('hasilDistribusi');
    const penjelasanDistribusiEl = document.getElementById('penjelasanLogikaDistribusi');

    if (!hasilDistribusiEl || !penjelasanDistribusiEl) return;

    if (jumlahPenerima === 0) {
        hasilDistribusiEl.innerHTML = '<p class="text-red-600 font-bold"><b>Logika Error:</b> Anda harus memilih minimal 1 mustahik (anggota himpunan) untuk distribusi.</p>';
        penjelasanDistribusiEl.innerHTML = '';
        return;
    }

    const proporsiRupiah = jumlahZakatTerhitung / jumlahPenerima;
    const proporsiPersen = 100 / jumlahPenerima;

    let hasilHTML = '<h3 class="text-lg font-semibold mb-2">Hasil Distribusi Proporsional:</h3><ul class="list-disc list-inside space-y-1">';
    checkboxTerpilih.forEach(checkbox => {
        const namaMustahik = checkbox.value || checkbox.getAttribute('data-name') || 'Penerima';
        hasilHTML += `<li><b>${namaMustahik}:</b> ${formatRupiah(proporsiRupiah)} (${proporsiPersen.toFixed(2)}%)</li>`;
    });
    hasilHTML += '</ul>';
    hasilDistribusiEl.innerHTML = hasilHTML;

    let penjelasanHTML = '<p class="text-sm font-bold text-gray-700 uppercase">Hukum Logika Himpunan & Proporsi</p>';
    penjelasanHTML += `<ul class="list-disc list-inside space-y-1">
        <li>Himpunan Semesta (S) = {Fakir, Miskin, Amil, Muallaf, Riqab, Gharim, Fi Sabilillah, Ibnu Sabil}.</li>
        <li>Himpunan Pilihan (M) = {${checkboxTerpilih.map(cb => cb.value || 'Penerima').join(', ')}}. M ⊆ S.</li>
        <li>Jumlah anggota himpunan pilihan: |M| = <b>${jumlahPenerima}</b>.</li>
        <li><b>Logika Proporsi:</b> Jika Total Zakat (Z) = ${formatRupiah(jumlahZakatTerhitung)} dan N penerima, setiap penerima mendapat Z / N.</li>
        <li><b>Perhitungan Proporsi:</b> P = ${formatRupiah(jumlahZakatTerhitung)} / ${jumlahPenerima} = <b>${formatRupiah(proporsiRupiah)}</b> per golongan.</li>
    </ul>`;

    penjelasanDistribusiEl.innerHTML = penjelasanHTML;

}
