# Project Structure Guide

Tài liệu này mô tả cấu trúc dự án Next.js hiện tại, vai trò của từng thư mục / file chính, cách luồng code hoạt động, và cách mở rộng khi bạn muốn thêm tính năng mới.

## 1) Tổng quan kiến trúc

Project này đang đi theo mô hình Next.js App Router, có i18n bằng `next-intl`, gọi dữ liệu từ CMS / WordPress, và có một lớp helper riêng cho SEO, metadata, form Contact Form 7, cùng các tiện ích scroll bằng GSAP.

Luồng chạy chính có thể hiểu như sau:

1. Trình duyệt vào app.
2. [src/proxy.ts](src/proxy.ts) chạy middleware của `next-intl` để xử lý routing theo locale.
3. Next.js render shell gốc từ [src/app/layout.tsx](src/app/layout.tsx).
4. Khi vào route có locale, [src/app/[locale]/layout.tsx](src/app/%5Blocale%5D/layout.tsx) bọc nội dung bằng `NextIntlClientProvider`.
5. Trang cụ thể như [src/app/[locale]/page.tsx](src/app/%5Blocale%5D/page.tsx) dùng `useTranslations` để lấy text từ [messages/en.json](messages/en.json) hoặc [messages/vi.json](messages/vi.json).
6. Khi cần dữ liệu ngoài, code dùng tầng `fetches/` và `services/` để gọi CMS.
7. Khi cần metadata, dự án có các helper trong `utils/` để chuẩn hóa SEO / Rank Math.

## 2) Cây thư mục chính

```text
src/
  app/          App Router: layout, page, robots, error boundary, locale routes
  configs/      Cấu hình môi trường, endpoints, routes nội bộ
  fetches/      Wrapper gọi API / CMS
  i18n/         Cấu hình next-intl: routing, request, navigation
  lib/          Helper dùng chung kiểu cn()
  services/     Service layer theo domain nghiệp vụ
  utils/        Các helper thuần: metadata, scroll, parse HTML
  proxy.ts      Middleware cho locale routing
messages/       File dịch vi/en cho next-intl
public/         Asset tĩnh
```

Ngoài `src/`, các file config ở root như [next.config.ts](next.config.ts), [tsconfig.json](tsconfig.json), [package.json](package.json), [tailwind.config.ts](tailwind.config.ts), [eslint.config.mjs](eslint.config.mjs) quyết định cách build, alias, style, lint, và runtime behavior.

## 3) Giải thích từng thư mục / file

### 3.1 `src/app/`

Đây là nơi định nghĩa giao diện và routing chính của App Router.

- [src/app/layout.tsx](src/app/layout.tsx)
  - Là root layout của toàn app.
  - Import font từ Google Fonts (`Geist`, `Geist_Mono`).
  - Gắn metadata mặc định cho toàn site.
  - Bọc toàn bộ app bằng thẻ `html` và `body`.
  - Đây là nơi thích hợp để đặt các thứ dùng toàn cục như font, theme provider, analytics, hoặc script nền.

- [src/app/global-error.tsx](src/app/global-error.tsx)
  - Error boundary cấp global.
  - Chỉ chạy ở client.
  - Dùng khi lỗi nghiêm trọng vượt khỏi boundary thông thường.
  - Có nút `Try again` để gọi `reset()`.

- [src/app/globals.css](src/app/globals.css)
  - CSS global của app.
  - Chứa style nền tảng cho toàn hệ thống.

- [src/app/robots.ts](src/app/robots.ts)
  - Tạo `robots.txt` động cho SEO.
  - Dùng `NEXT_PUBLIC_DOMAIN` để tạo sitemap URL.

- [src/app/[locale]/layout.tsx](src/app/%5Blocale%5D/layout.tsx)
  - Layout cho toàn bộ route có locale.
  - Bọc children bằng `NextIntlClientProvider`.
  - Đây là chỗ nối giữa routing locale và translation message.

- [src/app/[locale]/page.tsx](src/app/%5Blocale%5D/page.tsx)
  - Trang home theo locale.
  - Có `generateStaticParams()` để build trước `vi` và `en`.
  - Dùng `useTranslations('HomePage')` để lấy text từ messages.
  - Hiện tại chỉ là demo tối giản, nhưng đây là nơi bạn sẽ thay bằng trang chủ thật.

- [src/app/[locale]/abc/page.tsx](src/app/%5Blocale%5D/abc/page.tsx)
- [src/app/[locale]/bcd/page.tsx](src/app/%5Blocale%5D/bcd/page.tsx)
  - Đây là ví dụ route con theo locale.
  - `abc` chỉ build cho `vi`.
  - `bcd` chỉ build cho `en`.
  - Hai file này cho thấy cách tách route theo locale hoặc theo chiến lược static params riêng.

### 3.2 `src/i18n/`

Thư mục này điều phối toàn bộ internationalization.

- [src/i18n/routing.ts](src/i18n/routing.ts)
  - Khai báo locale được hỗ trợ: `vi`, `en`.
  - `defaultLocale` là `vi`.
  - `localePrefix: 'as-needed'` nghĩa là chỉ thêm prefix khi cần.
  - `localeDetection: false` nghĩa là không tự đoán locale từ trình duyệt.

- [src/i18n/request.ts](src/i18n/request.ts)
  - Cấu hình request cho `next-intl` ở server.
  - Lấy locale từ route segment `[locale]`.
  - Nếu locale không hợp lệ thì fallback về `defaultLocale`.
  - Load message tương ứng từ [messages/vi.json](messages/vi.json) hoặc [messages/en.json](messages/en.json).

- [src/i18n/navigation.ts](src/i18n/navigation.ts)
  - Tạo các wrapper navigation-aware như `Link`, `redirect`, `usePathname`, `useRouter`, `getPathname`.
  - Khi dùng những helper này, route sẽ tự hiểu cấu hình locale trong `routing`.
  - Đây là chỗ nên dùng thay vì import navigation trực tiếp từ Next.js nếu bạn muốn giữ nhất quán với i18n.

### 3.3 `src/proxy.ts`

- File này gắn middleware từ `next-intl/middleware`.
- Nó chạy trước khi vào app để xử lý locale routing.
- `matcher` loại trừ các path như `api`, `/_next`, `/_vercel` và file có dấu chấm.
- Nếu bạn thêm route đặc biệt, cần kiểm tra matcher để tránh middleware bắt sai.

### 3.4 `src/configs/`

Đây là lớp cấu hình đầu vào, giúp code bên dưới không phải hardcode URL / route / endpoint.

- [src/configs/env.ts](src/configs/env.ts)
  - Gom các biến môi trường public thành object `ENV`.
  - Hiện tại có `DOMAIN`, `CMS`, `API`.
  - Từ code thực tế còn thấy [src/fetches/cf7Request.ts](src/fetches/cf7Request.ts) dùng `NEXT_PUBLIC_API_CF7`, nên nếu bạn dùng Contact Form 7 thì cần khai báo thêm biến này.

- [src/configs/endpoints.ts](src/configs/endpoints.ts)
  - Danh sách endpoint tương đối của CMS.
  - Hiện tại có `tour.list = '/tour/list'`.
  - Khi thêm domain nghiệp vụ mới, nên đặt endpoint ở đây thay vì rải trực tiếp trong service.

- [src/configs/routes.ts](src/configs/routes.ts)
  - Tập hợp route nội bộ đã chuẩn hóa.
  - Hiện có `homeEn` và `homeVi`.
  - File này hữu ích khi bạn muốn dùng route constant thay vì hardcode string.

### 3.5 `src/fetches/`

Đây là tầng truy xuất dữ liệu từ CMS hoặc API ngoài.

- [src/fetches/fetchData.ts](src/fetches/fetchData.ts)
  - Wrapper `fetch()` dùng chung cho request REST.
  - Tự ghép URL từ `ENV.CMS + ENV.API + request.api`.
  - Tự set header `Content-Type: application/json` nếu request là JSON.
  - Nếu response không ok thì throw error để kích hoạt error boundary gần nhất.
  - Đây là lớp nên dùng khi bạn cần gọi API có chung cách auth / header / error handling.

- [src/fetches/getMetaDataRankMath.ts](src/fetches/getMetaDataRankMath.ts)
  - Gọi endpoint Rank Math của WordPress để lấy phần head HTML.
  - Có `revalidate: 60`, tức là dữ liệu metadata được cache lại và tái xác thực theo chu kỳ.
  - Sau khi lấy xong, nó gọi [src/utils/parseRankMathHead.ts](src/utils/parseRankMathHead.ts) để tách title, description, OG, Twitter, schema.
  - Đây là trục SEO quan trọng nhất nếu site lấy metadata từ CMS.

- [src/fetches/cf7Request.ts](src/fetches/cf7Request.ts)
  - Class gửi dữ liệu Contact Form 7.
  - Chuyển object form thành `FormData`.
  - Tự ghép endpoint dựa trên `NEXT_PUBLIC_API_CF7` và form `id`.
  - Thêm `_wpcf7_unit_tag` trước khi submit.
  - Phù hợp khi bạn muốn tái sử dụng submit form ở nhiều component.

### 3.6 `src/services/`

Đây là lớp nghiệp vụ cao hơn `fetches/`.

- [src/services/tour/index.ts](src/services/tour/index.ts)
  - Là service cho domain `tour`.
  - Hiện có `getTours()` gọi [src/fetches/fetchData.ts](src/fetches/fetchData.ts) với endpoint từ [src/configs/endpoints.ts](src/configs/endpoints.ts).
  - Mẫu này cho thấy cách tổ chức theo domain: `service -> fetch -> config`.

Nếu sau này có `news`, `project`, `booking`, bạn nên tạo folder service riêng theo cùng pattern.

### 3.7 `src/utils/`

Những helper ở đây là hàm thuần, không phụ thuộc vào UI cụ thể.

- [src/utils/metadataValues.ts](src/utils/metadataValues.ts)
  - Chuẩn hóa object metadata để đổ vào `generateMetadata` hoặc component SEO.
  - Có fallback mặc định nếu không có dữ liệu từ CMS.
  - Chuẩn hóa ảnh Open Graph, Twitter image, canonical, schema.
  - Đây là file rất quan trọng nếu bạn muốn metadata của từng trang có cùng format.

- [src/utils/parseRankMathHead.ts](src/utils/parseRankMathHead.ts)
  - Parse HTML head do Rank Math trả về.
  - Trích title, meta description, canonical, OG tags, Twitter tags, schema JSON-LD.
  - Có xử lý decode HTML entities để text hiển thị đúng.
  - Nếu CMS đổi format HTML, đây là file đầu tiên cần kiểm tra.

- [src/utils/scrollToSection.ts](src/utils/scrollToSection.ts)
  - Helper client-side để scroll mượt đến một section theo `id`.
  - Dùng GSAP `ScrollToPlugin`.
  - Có hỗ trợ offset theo `rem`.
  - Thích hợp cho menu anchor hoặc CTA trên landing page.

- [src/utils/scrollToElementInContainer.ts](src/utils/scrollToElementInContainer.ts)
  - Tương tự `scrollToSection` nhưng scroll trong một container cuộn thay vì window.
  - Dùng cho carousel, sidebar, panel, hoặc layout có vùng scroll riêng.

### 3.8 `src/lib/`

- [src/lib/utils.ts](src/lib/utils.ts)
  - Chứa helper `cn()`.
  - Kết hợp `clsx` và `tailwind-merge` để ghép className an toàn.
  - Đây là helper chuẩn khi bạn làm UI với Tailwind.

### 3.9 `messages/`

- [messages/vi.json](messages/vi.json)
- [messages/en.json](messages/en.json)

Hai file này là nguồn text cho `next-intl`.

- Key hiện tại là `HomePage.title`.
- Khi thêm trang hoặc component mới, bạn nên thêm namespace mới cho từng khu vực, ví dụ `Header`, `Footer`, `Contact`, `TourList`.
- Cấu trúc messages nên giữ thống nhất giữa các ngôn ngữ để tránh lỗi key thiếu.

### 3.10 `public/`

- Chứa asset tĩnh như hình ảnh, icon, file download, favicon, default image.
- Nếu metadata fallback cần ảnh mặc định, thường nên đặt ở đây, ví dụ `/default.webp`.

## 4) Cách code hoạt động theo từng lớp

### 4.1 Routing và locale

Locale là trục chính của dự án này.

- `routing.ts` khai báo locale hợp lệ.
- `proxy.ts` áp routing đó vào request thật.
- `request.ts` quyết định message nào được load cho request hiện tại.
- `[locale]/layout.tsx` truyền messages vào client provider.
- `[locale]/page.tsx` hoặc các page con dùng `useTranslations()` để lấy text.

Nếu bạn thêm ngôn ngữ mới, bạn phải sửa đồng thời ít nhất 3 chỗ:

1. [src/i18n/routing.ts](src/i18n/routing.ts)
2. [src/i18n/request.ts](src/i18n/request.ts)
3. `messages/<locale>.json`

### 4.2 Dữ liệu từ CMS

Cách gọi dữ liệu nên đi theo thứ tự:

- Component hoặc server page gọi `service`.
- `service` gọi `fetchData` hoặc fetch helper chuyên biệt.
- `fetchData` ghép endpoint từ `ENV` và `ENDPOINTS`.
- Dữ liệu trả về được xử lý ở tầng `utils` nếu cần chuẩn hóa.

Điều này giúp bạn không nhét logic URL / header / parse vào từng component.

### 4.3 SEO / metadata

Nếu trang nào lấy metadata từ CMS, luồng tốt nhất là:

- Gọi `getMetaDataRankMath(slug)`.
- Parse head HTML bằng `parseRankMathHead`.
- Đưa dữ liệu qua `metadataValues()` để chuẩn hóa thành object Next.js metadata.
- Dùng kết quả đó trong `generateMetadata` hoặc component liên quan.

Lợi ích là metadata của các trang sẽ có format đồng nhất, có fallback an toàn, và có hỗ trợ schema.

### 4.4 Scroll / UI interaction

Các helper scroll tách khỏi component để tránh lặp code.

- `scrollToSection()` dành cho scroll toàn trang.
- `scrollToElementInContainer()` dành cho scroll trong container.
- Cả hai đều dùng GSAP, nên phù hợp với project đang có animation.

### 4.5 Form submit

Nếu dùng Contact Form 7:

- Khởi tạo `CF7Request` bằng dữ liệu form.
- Gọi `send({ id, unitTag })`.
- Class sẽ tự tạo `FormData` và POST đến endpoint CF7.

## 5) Cách mở rộng dự án đúng cấu trúc hiện tại

### 5.1 Thêm một trang mới

Nếu bạn muốn thêm trang mới theo locale, ví dụ `about`:

1. Tạo route tại [src/app/[locale]/about/page.tsx](src/app/%5Blocale%5D/about/page.tsx).
2. Nếu cần dịch, thêm key mới vào `messages/vi.json` và `messages/en.json`.
3. Dùng `useTranslations()` hoặc load data server-side tùy trang.
4. Nếu route cần SEO đặc biệt, thêm `generateMetadata` và dùng `metadataValues()`.

### 5.2 Thêm một ngôn ngữ mới

Nếu muốn thêm `jp` hoặc `fr`:

1. Thêm locale vào [src/i18n/routing.ts](src/i18n/routing.ts).
2. Đảm bảo `request.ts` load đúng file message tương ứng.
3. Tạo `messages/jp.json` hoặc `messages/fr.json`.
4. Cập nhật static params ở các page có khai báo `generateStaticParams()`.
5. Kiểm tra route prefix và middleware matcher.

### 5.3 Thêm một domain nghiệp vụ mới

Ví dụ bạn muốn thêm `project` hoặc `news`:

1. Thêm endpoint vào [src/configs/endpoints.ts](src/configs/endpoints.ts).
2. Tạo service mới trong `src/services/<domain>/index.ts`.
3. Nếu cần query / normalize dữ liệu, tạo helper riêng trong `src/fetches/` hoặc `src/utils/`.
4. Component chỉ gọi service, không gọi fetch trực tiếp nếu có thể tránh.

### 5.4 Thêm SEO từ CMS

Nếu một trang cần metadata động:

1. Lấy slug của trang.
2. Gọi [src/fetches/getMetaDataRankMath.ts](src/fetches/getMetaDataRankMath.ts).
3. Chuyển dữ liệu qua [src/utils/metadataValues.ts](src/utils/metadataValues.ts).
4. Gắn vào `generateMetadata` hoặc output schema của trang.

### 5.5 Thêm helper dùng chung

Nếu thấy logic bị lặp ở nhiều component:

- Nếu đó là hàm thuần, cho vào [src/utils/](src/utils/).
- Nếu đó là thứ liên quan UI helper chung, cân nhắc [src/lib/](src/lib/).
- Nếu đó là logic theo domain, đặt trong [src/services/](src/services/).

## 6) Cấu hình quan trọng ở root

### [next.config.ts](next.config.ts)

- Bật plugin `next-intl`.
- Bật bundle analyzer khi `ANALYZE=true`.
- Cấu hình ảnh remote wildcard khá rộng.
- `output: 'standalone'` phù hợp deploy Docker/VPS.
- `reactStrictMode: false` để giảm tác động với animation / GSAP.
- `typescript.ignoreBuildErrors: true` nghĩa là build không chặn bởi lỗi TypeScript, nên cần tự kiểm soát chất lượng cẩn thận.

### [package.json](package.json)

- Dùng `pnpm`.
- Script `build` đang chạy `lint:fix` và `format` trước khi build.
- Có sẵn `lint`, `format`, `format:check`.
- Dependencies cho thấy project đang dùng GSAP, next-intl, react-hook-form, zod, Radix, Tailwind.

### [tsconfig.json](tsconfig.json)

- Alias `@/*` trỏ về `src/*`.
- Đây là quy ước import chính của toàn bộ code.
- Khi tạo file mới, nên import qua alias này để tránh relative path dài.

## 7) Ghi chú thực tế khi bạn sửa hoặc mở rộng

- Nếu thay đổi route locale, luôn kiểm tra middleware `proxy.ts` trước tiên.
- Nếu thêm text mới, sửa cả hai file message để tránh thiếu key.
- Nếu thêm API mới, đặt endpoint trong `configs/endpoints.ts` và đi qua service.
- Nếu metadata trả về từ CMS thay đổi format, kiểm tra `parseRankMathHead()` và `metadataValues()`.
- Nếu page mới cần scroll animation, dùng helper trong `utils/` thay vì viết inline.
- Nếu thêm form CF7, nhớ kiểm tra biến môi trường `NEXT_PUBLIC_API_CF7`.

## 8) Tóm tắt ngắn để nhớ nhanh

- `app/` = giao diện và routing.
- `i18n/` = locale và messages.
- `configs/` = constant và env.
- `fetches/` = gọi API.
- `services/` = nghiệp vụ theo domain.
- `utils/` = helper thuần.
- `lib/` = helper chung kiểu `cn()`.
- `messages/` = text đa ngôn ngữ.
- `proxy.ts` = middleware locale.

Nếu bạn muốn, bước tiếp theo mình có thể viết thêm cho bạn một file thứ hai theo kiểu “hướng dẫn mở rộng tính năng” chỉ tập trung vào quy trình thêm page mới, thêm API mới, thêm locale mới, và thêm SEO metadata.
