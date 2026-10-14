# ORβIT 400

2026.12.20 (SUN) 홍대 우주정거장 · 4밴드 J-POP/애니송 카피 라이브 공연 사이트.

- 사이트: https://orbit400.vercel.app
- 포스터(A4): `/poster`

## 페이지
| 경로 | 내용 |
|---|---|
| `/` | 메인 (라인업, 타임테이블, 예매, 오시는 길) |
| `/t/<token>` | 예매자 티켓 · 입금 확인 후 입장 QR |
| `/admin` | 스태프: 입금 확인, 입장 스캔 |
| `/poster` | A4 인쇄용 포스터 |
| `/cards` | 인스타 카드뉴스 9장 (1080×1080, `?n=1`~`9`로 한 장씩) |

## 구조
- 정적 HTML + Vercel Functions (`api/`)
- 데이터: Upstash Redis (키 접두사 `l1220:`)
- 팀·세트리스트·가격: `assets/data.js`, 서버 가격: `api/_lib.js`

## 환경변수 (Vercel)
- `KV_REST_API_URL`, `KV_REST_API_TOKEN` — Upstash Redis
- `ADMIN_PASSWORD` — 스태프 페이지 비밀번호

## 배포
```
vercel deploy --prod
```
