class NguoiDung {
  constructor(MaNguoiDung, TenNguoiDung, Email, MatKhau, Quyen) {
    this.MaNguoiDung = MaNguoiDung;
    this.TenNguoiDung = TenNguoiDung;
    this.Email = Email;
    this.MatKhau = MatKhau;
    this.Quyen = Quyen;
  }
}

module.exports = new NguoiDung();
