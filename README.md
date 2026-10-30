# Laundry Management Platform (Monorepo)

Monorepo hỗ trợ Supabase & Netlify cho chuỗi giặt ủi.

## Cấu trúc
- `apps/admin-web`: Quản trị hệ thống & chi nhánh (Next.js)
- `apps/staff-pwa`: Trạm tiếp nhận, máy giặt, quét QR (Next.js PWA)
- `apps/customer-web`: Portal khách hàng (Next.js)
- `packages/shared`: Thư viện kết nối Supabase và types chung

## Cài đặt
```bash
npm install
npm run dev:admin    # Chạy Admin (port 3000)
npm run dev:staff    # Chạy Staff (port 3001)
npm run dev:customer # Chạy Customer (port 3002)
```
