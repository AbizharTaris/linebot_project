const falseDateFormat = 'Format penulisan tanggal salah.';

const falsePassengerFormat = 'Format penulisan jumlah penumpang salah.';

const falsePhoneNumber = 'Format penulisan nomor handphone salah.';

const formEmpty = 'Form tidak boleh kosong.';

const routeNotFound = route => `Rute ${route} tidak tersedia.`;

const travelRouteNotFound = (origin, destination) => `Maaf rute ${origin}-${destination} belum tersedia.`;

const systemError = 'Maaf, terjadi kesalah pada sistem. Silahkan tunggu dan coba beberapa saat lagi.'

const travelOrderFormat =
  `Silahkan masukkan data diri anda dengan format sebagai berikut
  
  /pesan/tanggal & waktu#jumlah penumpang#alamat tujuan#alamat jemput#No.HP

  Contoh penulisan tanggal & waktu : 201802041400 (04 Februari 2018, Jam 14:00)

  Jumlah penumpang ditulis angka.

  alamat tujuan dan alamat jemput ditulis huruf.

  No.HP : 082150986729 atau +6282150986729

  Contoh :
  /pesan/201802041400#1#Jl. Sigura-gura III No.3#Bandara Juanda Surabaya#082150986591
  `;

export {
  falseDateFormat,
  falsePassengerFormat,
  falsePhoneNumber,
  formEmpty,
  routeNotFound,
  travelRouteNotFound,
  systemError,
  travelOrderFormat
}