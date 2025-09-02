# Booking Hybrid

แอปพลิเคชันจัดการหนังสือแบบข้ามแพลตฟอร์ม สร้างด้วย React Native และ Expo Router สามารถใช้งานได้บน iOS, Android และ Web

## ฟีเจอร์หลัก

- **ระบบยืนยันตัวตน** - เข้าสู่ระบบและสมัครสมาชิกอย่างปลอดภัย
- **จัดการหนังสือ** - ดู เพิ่ม และจัดการคอลเลกชันหนังสือ
- **ธีมกลางคืน/กลางวัน** - สลับธีมพร้อมบันทึกการตั้งค่า
- **ข้ามแพลตฟอร์ม** - ทำงานบน iOS, Android และ Web
- **อัพเดตแบบเรียลไทม์** - ซิงค์ข้อมูลสด
- **เก็บข้อมูลถาวร** - จัดการ token และข้อมูลอัตโนมัติ
- **ออกแบบตอบสนอง** - UI ปรับตัวตามขนาดหน้าจอ

## เทคโนโลยีที่ใช้

- **React Native** - พัฒนาแอปข้ามแพลตฟอร์ม
- **Expo** - แพลตฟอร์มและเครื่องมือพัฒนา
- **Expo Router** - ระบบนำทางแบบ file-based
- **React Context API** - จัดการ state
- **AsyncStorage** - เก็บข้อมูลในเครื่อง

## สิ่งที่ต้องมีก่อนเริ่ม

ก่อนรันโปรเจค ตรวจสอบว่าคุณมี:

- Node.js (เวอร์ชัน 16 ขึ้นไป)
- npm หรือ yarn
- Expo CLI (`npm install -g @expo/cli`)
- Git

สำหรับการพัฒนาบนมือถือ:
- แอป Expo Go บนมือถือของคุณ หรือ
- Android Studio (สำหรับ Android emulator) หรือ
- Xcode (สำหรับ iOS simulator)

## วิธีเริ่มต้น

### 1. โคลนโปรเจค
```bash
git clone https://github.com/NuPanuwat47/Booking_hybrid.git
cd Booking_hybrid
```

### 2. ติดตั้ง dependencies
```bash
npm install
```

### 3. ตั้งค่า Backend URL
แก้ไข `BASE_URL` ใน `app/config.js` ให้ตรงกับเซิร์ฟเวอร์ backend:

```javascript
// สำหรับการพัฒนาในเครื่อง
export const BASE_URL = 'http://localhost:3000';

// สำหรับอุปกรณ์จริง (แทนที่ด้วย IP ของคอมพิวเตอร์)
// export const BASE_URL = 'http://192.168.1.100:3000';

// สำหรับ Android emulator
// export const BASE_URL = 'http://10.0.2.2:3000';
```

### 4. เริ่มเซิร์ฟเวอร์พัฒนา
```bash
npm start
```

### 5. รันบนแพลตฟอร์มต่างๆ
- **Web**: กด `w` ในเทอร์มินัลหรือเปิด `http://localhost:8081`
- **iOS**: กด `i` หรือสแกน QR code ด้วยแอปกล้อง
- **Android**: กด `a` หรือสแกน QR code ด้วยแอป Expo Go

## โครงสร้างโปรเจค

```
Booking_hybrid/
├── app/                    # โค้ดหลักของแอปพลิเคชัน
│   ├── components/         # คอมโพเนนต์ที่ใช้ซ้ำได้
│   │   ├── Theme.js       # ระบบดีไซน์และเครื่องมือ responsive
│   │   └── ThemeToggle.jsx # คอมโพเนนต์สลับธีม
│   ├── context/           # Context providers
│   │   ├── AuthContext.js # จัดการสถานะการยืนยันตัวตน
│   │   └── ThemeContext.js # จัดการสถานะธีม
│   ├── _layout.js         # เลย์เอาต์หลักและการนำทาง
│   ├── index.jsx          # หน้าหลัก
│   ├── about.jsx          # หน้าเกี่ยวกับ
│   ├── book.jsx           # หน้ารายการหนังสือ
│   ├── book_detail.jsx    # หน้ารายละเอียดหนังสือ
│   ├── book_new.jsx       # หน้าเพิ่มหนังสือใหม่
│   ├── signin.jsx         # หน้าเข้าสู่ระบบ
│   ├── signup.jsx         # หน้าสมัครสมาชิก
│   └── config.js          # การตั้งค่า API
├── assets/                # ไฟล์สื่อคงที่
├── App.js                # จุดเริ่มต้น
├── app.json              # การตั้งค่า Expo
└── package.json          # Dependencies และ scripts
```

## ฟีเจอร์หลัก

### ระบบยืนยันตัวตน
- เข้าสู่ระบบและสมัครสมาชิกอย่างปลอดภัย
- จัดการ token อัตโนมัติ
- ป้องกันหน้าที่ต้องล็อกอิน

### จัดการหนังสือ
- ดูรายการหนังสือทั้งหมด
- ดูรายละเอียดหนังสือ
- เพิ่มหนังสือใหม่
- ค้นหาและกรองข้อมูล

### ระบบธีม
- สลับระหว่างโหมดสว่างและมืด
- บันทึกการตั้งค่าธีม
- ปรับตัวตามขนาดหน้าจอ

## คำสั่งที่ใช้

```bash
# เริ่มเซิร์ฟเวอร์พัฒนา
npm start

# เริ่มสำหรับแพลตฟอร์มเฉพาะ
npm run android    # Android
npm run ios        # iOS
npm run web        # Web browser
```

## การปรับแต่ง

### แก้ไขสีและสไตล์
แก้ไขไฟล์ `app/components/Theme.js` เพื่อเปลี่ยน:
- ชุดสี
- ระยะห่าง
- ขนาดตัวอักษร
- เงาและเอฟเฟกต์

### เพิ่มหน้าใหม่
1. สร้างไฟล์ `.jsx` ใหม่ในโฟลเดอร์ `app/`
2. Export React component เป็น default
3. ชื่อไฟล์จะเป็นเส้นทางอัตโนมัติ

### เชื่อมต่อ Backend
อัพเดต API endpoints ในไฟล์ `app/config.js` และใช้ฟังก์ชัน `authFetch` จาก `AuthContext`

## ข้อควรรู้แต่ละแพลตฟอร์ม

### มือถือ (iOS/Android)
- ติดตั้ง `@react-native-async-storage/async-storage` สำหรับเก็บข้อมูล
- ใช้ Expo Go สำหรับทดสอบ
- ใช้ EAS Build สำหรับสร้างแอปจริง

### เว็บ
- ใช้ localStorage เก็บข้อมูล
- รองรับการใช้งานด้วยเมาส์และแป้นพิมพ์
- ปรับตัวตามขนาดหน้าจอ

## แก้ไขปัญหาที่พบบ่อย

**ปัญหา Metro bundler**:
```bash
npx expo start --clear
```

**ปัญหาการเชื่อมต่อ**:
- ตรวจสอบว่าอุปกรณ์และคอมพิวเตอร์อยู่ในเครือข่ายเดียวกัน
- แก้ไข BASE_URL ให้ตรงกับ IP address

**ปัญหาการล็อกอิน**:
- ตรวจสอบว่าเซิร์ฟเวอร์ backend ทำงาน
- ตรวจสอบว่าเข้าถึง API ได้
- ดูการตั้งค่าเครือข่ายใน app.json

## การมีส่วนร่วม

หากต้องการพัฒนาต่อ:
1. Fork repository นี้
2. สร้าง branch ใหม่ (`git checkout -b feature/new-feature`)
3. Commit การเปลี่ยนแปลง (`git commit -m 'เพิ่มฟีเจอร์ใหม่'`)
4. Push ไป branch (`git push origin feature/new-feature`)
5. เปิด Pull Request

## ผู้พัฒนา

สร้างโดย **Panuwat Thammabut**
- GitHub: [@NuPanuwat47](https://github.com/NuPanuwat47)


