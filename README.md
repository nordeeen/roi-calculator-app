# ROI Calculator App

Aplikasi web sederhana yang digunakan untuk menghitung dan menganalisis performa bisnis atau campaign digital marketing berdasarkan beberapa metrik penting seperti **ROI (Return on Investment), Profit, Revenue, Results, dan CPR (Cost per Result)**.

Aplikasi ini membantu pengguna memahami efektivitas pengeluaran (budget) terhadap hasil yang diperoleh, sehingga dapat digunakan sebagai alat bantu dalam pengambilan keputusan yang lebih berbasis data.

---

## Fitur

- Menghitung Results, Revenue, Profit, dan ROI
- Menggunakan pendekatan rumus bisnis (benchmark digital marketing)
- Validasi input sederhana
- Tampilan clean dan mudah digunakan
- Menangani edge case dasar

---

## Rumus Perhitungan

Results = Budget ÷ CPR  
Revenue = Results × AOV  
Profit = Revenue − Budget  
ROI = (Profit ÷ Budget) × 100%  
CPR Target = Harga Produk × 30%  
Margin / Result = AOV − CPR

Keterangan:

- **Budget**: total biaya yang dikeluarkan
- **CPR (Cost per Result)**: biaya per hasil
- **AOV (Average Order Value)**: rata-rata nilai transaksi
- **Harga Produk**: harga jual produk

---

## Tech Stack

- Next.js (App Router)
- TypeScript
- Tailwind CSS
- Zustand
- Jest

---

## Menjalankan Project

Install dependencies:

npm install

Jalankan development server:

npm run dev

Buka di browser:

http://localhost:3000

---

## Build Production

npm run build  
npm start

---

## Struktur Folder

src/
├── app/
├── components/
├── constant/
├── store/
├── types/
├── utils/

---

## Edge Case yang Ditangani

- Input kosong
- Input bukan angka
- Budget = 0 (menghindari pembagian nol)
- Nilai negatif

---

## Catatan

- CPR Target menggunakan benchmark umum yaitu **30% dari harga produk**
- Aplikasi ini ditujukan untuk simulasi sederhana dan bukan alat analisis finansial yang kompleks

---
