
# Backend_test_crytocurrency

## 📌 คำอธิบายโปรเจกต์ (Project Description)

ระบบ Backend สำหรับแลกเปลี่ยนสกุลเงินดิจิทัล (Cryptocurrencies) เช่น Bitcoin, Ethereum, XRP, DOGE โดยผู้ใช้สามารถใช้สกุลเงิน Fiat (เช่น THB หรือ USD) เพื่อซื้อเหรียญจากผู้ใช้งานรายอื่นในระบบ หรือโอนเหรียญภายในระบบและภายนอกได้

This is a backend system for cryptocurrency exchange. Users can use Fiat currency (e.g., THB or USD) to buy crypto from other users, transfer crypto internally, or send it outside the system.

---

## 🛠 เทคโนโลยีที่ใช้ (Technologies Used)

- Node.js (JavaScript runtime)
- Express.js (Web framework)
- MySQL2 + Sequelize ORM (Database and ORM)
- JSON Web Token (JWT) for authentication
- bcrypt / bcryptjs for password hashing
- dotenv for environment configuration
- cors for handling CORS policy
- uuidv4 for unique ID generation
- express-session for session management

---

## 📦 รายการ dependencies

```json
{
  "bcrypt": "^5.1.1",
  "bcryptjs": "^3.0.2",
  "cors": "^2.8.5",
  "dotenv": "^16.4.7",
  "express": "^5.1.0",
  "express-session": "^1.18.1",
  "jsonwebtoken": "^9.0.2",
  "mysql2": "^3.14.0",
  "nodemon": "^3.1.9",
  "sequelize": "^6.37.7",
  "uuidv4": "^6.2.13"
}
```

---

## 🚀 วิธีเริ่มต้นโปรเจกต์ (How to Run the Project)

1. **Clone Repository:**
```bash
git clone https://github.com/Gas-nontachai/Skuberg_Test_Backend_Binance_Nontachai.git
cd Backend_test_crytocurrency
```

2. **ติดตั้ง dependencies (Install dependencies):**
```bash
npm install
```

3. **สร้างไฟล์ `.env` (Create a .env file):**
```
PORT=5120
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=yourdbname
SECRET_KEY=your_jwt_secret
```

4. **เริ่มต้นเซิร์ฟเวอร์ (Start the server):**
```bash
npm run dev
```

---

## 🔐 ระบบการยืนยันตัวตน (Authentication System)

### Login

- Endpoint: `POST /auth/login`

**ข้อมูลสำหรับทดสอบ (Test credentials):**
```json
{
  "email": "admin@example.com",
  "password": "admin1234"
}
```

**ผลลัพธ์ (Response):**
```json
{
  "token": "your_jwt_token"
}
```

> ให้นำ token ไปใส่ใน Header:
> `Authorization: Bearer {{token}}`

---

## 📈 ฟีเจอร์หลัก (Main Features)

### ✅ เปิดคำสั่งซื้อขาย (`POST /trade/openTrade`)

- ใช้สำหรับสร้างคำสั่งซื้อหรือขายเหรียญ
- ต้องมี JWT token ใน Header

**Request body:**
```json
{
  "user_id": "USR12345",          // ไอดีผู้ใช้
  "crypto_id": "CRP12345",          // รหัสเหรียญ เช่น BTC, ETH, XRP, DOGE
  "order_type": "buy",         // ประเภทคำสั่ง: buy หรือ sell
  "amount": 1,                 // จำนวนเหรียญ
  "status": "open"             // สถานะ: ให้ใช้ "open" ตอนสร้างใหม่
}
```

---

### 💰 ชำระเงินตามคำสั่ง (`POST /payment/paymentOrder`)

- ใช้สำหรับดำเนินการซื้อขายตามคำสั่งที่มีอยู่ในระบบ

**Request body:**
```json
{
  "from_user_id": "USR12345",     // ผู้ทำรายการ
  "trade_id": "TRD12345"          // รหัสคำสั่งซื้อขายที่ต้องการจับคู่
}
```

---

### 💸 บันทึกการโอนเหรียญ (`POST /transaction/insertTransaction`)

- ใช้สำหรับโอนเหรียญจากผู้ใช้หนึ่งไปยังอีกคนหนึ่งในระบบ

**Request body:**
```json
{
  "from_user_id": "USR12345",     // ผู้โอนเหรียญ
  "to_user_id": "USR67890",       // ผู้รับเหรียญ
  "amount": "1000"             // จำนวนเหรียญ
}
```

---

## 📋 หมายเหตุ (Notes)

- โปรเจกต์นี้สร้างขึ้นเพื่อการทดลองและเรียนรู้เท่านั้น
- ไม่แนะนำให้นำไปใช้ในระบบที่เกี่ยวกับเงินจริงโดยตรง

---

## 👨‍💻 ผู้พัฒนา (Developed by)

- Gas-Nontachai
