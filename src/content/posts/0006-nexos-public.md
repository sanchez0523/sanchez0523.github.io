---
serial: 6
title: Nexos를 공개한다 — v0.9.0-rc.1
description: 혼자 만들던 self-hosted MQTT 대시보드를 방금 GitHub에 올렸다. rc 단계의 의미와, 피드백 받고 싶은 지점.
date: 2026-04-19
category: build-log
tags: [nexos, release, show-hn]
---

방금 [github.com/sanchez0523/nexos](https://github.com/sanchez0523/nexos) 리포를 public으로 전환했다.
**v0.9.0-rc.1** 태그로.

이 블로그가 지난 몇 시간 예고했던 [그 프로젝트](/posts/0002-why-nexos/)다.

---

## 왜 지금, 왜 rc인가

원래 계획은 "v1.0.0 완벽하게 만들어서 Show HN에 쏘기"였다. 현명한 솔로 프로젝트 플레이북이다.

그런데 하나를 바꿨다.

**공개 전 검증을 제대로 돌려봤더니 이미 실전 품질이었다.**
5시간 dogfooding 동안:

| 지표 | 값 |
|------|-----|
| Ingested metrics | **53,231행** (손실 0) |
| 가동 중 서비스 | 5/5 `(healthy)` |
| Auto-Discovery 신규 디바이스 감지 | **< 2초** |
| WebSocket 실시간 브로드캐스트 | 4초에 18 메시지 (3 디바이스 × 3 센서) |
| Alert → Webhook 발사 | 임계값 초과 시 정확한 JSON payload 수신 |
| TODO / FIXME 코멘트 | 0개 |

"완벽"은 아니지만, **"지금 공개해서 피드백 받는 게 더 가치 있는 구간"** 에 와 있다.
그래서 v1.0.0이 아니라 **rc**로 공개한다.

---

## rc 단계의 의미

v1.0.0 전까지 남은 것들:

- 🎬 30초 데모 GIF (이슈 [#3](https://github.com/sanchez0523/nexos/issues/3))
- 🎨 아키텍처 SVG 다이어그램 (이슈 [#2](https://github.com/sanchez0523/nexos/issues/2))
- 📱 ESP8266 예제 (이슈 [#1](https://github.com/sanchez0523/nexos/issues/1))
- 🔎 실사용자 피드백 2~3건 반영
- 🏗️ 깨끗한 Docker compose 올라오는 환경 3곳 (macOS, Ubuntu, WSL) 검증

**이 5개가 v1.0.0의 정의다.** 그 이후 Show HN.

---

## 지금 바로 시도할 수 있다

```bash
git clone https://github.com/sanchez0523/nexos
cd nexos
./scripts/setup.sh        # 인증서 + .env + passwd 자동 생성
docker compose up -d       # 5개 서비스 기동
open https://localhost     # 자체 서명 인증서 경고 accept
```

ESP32가 없어도 시뮬레이터가 번들돼 있다:

```bash
cd examples/simulator && go run main.go
```

자세한 건 [README](https://github.com/sanchez0523/nexos#readme).
아키텍처 결정 근거는 [ARCHITECTURE.md](https://github.com/sanchez0523/nexos/blob/main/ARCHITECTURE.md)에 있다.

---

## 피드백 받고 싶은 지점

rc 기간(~2주)에 특히 듣고 싶은 것:

1. **`docker compose up` 첫 기동 실패** — 포트 충돌, 인증서 경로, Docker Desktop 설정 등
2. **setup.sh의 macOS vs Ubuntu vs WSL 차이** — openssl 버전·bash 차이로 깨지는 케이스
3. **토픽/페이로드 규칙이 너무 엄격한가** — `devices/{id}/{sensor}` + `{"value": N}` 이 과한지
4. **Auto-Discovery가 실제로 "마법"처럼 느껴지는가** — 5초 안에 "오 이거 쓸만하네" 오는지

이슈, Discussions, 이 블로그 댓글 (곧 붙임) 아무 데나 환영합니다.

---

## 솔로 빌더의 공개는 매번 두렵다

**누가 안 써주면?**
**"이미 Grafana 있는데요?"라고 하면?**
**버그 터지면?**

이 세 가지 두려움이 "좀 더 다듬고 공개하자"의 원동력이다.
대부분의 프로젝트는 그 "좀 더 다듬고"에서 **공개 자체가 사라진다.**

[#0004 거절 목록](/posts/0004-seven-refusals/)에 썼듯,
내가 가장 많이 거절해야 하는 유혹은 **"완벽해질 때까지 기다리기"** 다.

그래서 오늘 공개한다. 아직 완벽하지 않은 채로.

---

## 앞으로

- **이번 주**: 개인 사용 계속 + 피드백 수집
- **다음 주**: 데모 GIF + README polish + 아키텍처 SVG
- **3주 후**: v1.0.0 태그 + Show HN + r/selfhosted

빌드 로그는 여기서 계속 쓴다.
읽어주시는 분은 Star 하나, 이슈 하나로 응원 부탁드립니다.
이게 솔로 빌더에게는 연료입니다.

→ [github.com/sanchez0523/nexos](https://github.com/sanchez0523/nexos)