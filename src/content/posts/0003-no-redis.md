---
serial: 3
title: Redis 없이 WebSocket 팬아웃 하기
description: 수백 대 디바이스까지는 Go 채널만으로 충분하다. Redis를 빼는 게 복잡도를 줄이는 길이었다.
date: 2026-04-12
category: deep-dive
tags: [go, websocket, architecture]
---

Nexos의 첫 아키텍처 스케치에는 Redis Pub/Sub이 있었다.

MQTT 브로커에서 받은 메시지를 **여러 WebSocket 클라이언트에 뿌리기**(fan-out) 위해서다.
"Pub/Sub의 정석" 같은 선택이었다.

이틀 고민하고, 뺐다.

## 왜 넣으려 했나

처음 생각의 흐름:

```
MQTT → ingestion → Redis Pub/Sub → WebSocket clients
```

Redis가 있으면:
- 여러 ingestion 인스턴스로 수평 확장 가능
- 브로커/클라이언트 분리로 결합도 감소
- 프로덕션 "느낌" 있음

## 왜 뺐나

Nexos의 설계 제약을 다시 읽었다:

1. **타겟 스케일**: 디바이스 50대 미만
2. **배포**: 단일 서버, `docker compose up`
3. **ops 단순화**: 5개 서비스 최대

Redis를 추가하면:
- 서비스 6개 (원칙 위반)
- 장애 포인트 하나 더
- 설정 파일 하나 더
- 메모리 요구량 증가

**실제 얻는 게 뭐냐?** 수평 확장? 디바이스 50대 이하에서 필요 없다. 그 스케일이 되면 그때 추가해도 늦지 않다.

## 대신 뭘 쓰나

Go 채널.

```go
type Hub struct {
    broadcast chan Metric
    clients   map[*Client]bool
    mu        sync.RWMutex
}

func (h *Hub) Run() {
    for msg := range h.broadcast {
        h.mu.RLock()
        for client := range h.clients {
            select {
            case client.send <- msg:
            default:
                // client slow, drop
            }
        }
        h.mu.RUnlock()
    }
}
```

버퍼는 256. 이건 다음 글에서 따로 근거를 쓴다.

MQTT subscriber goroutine이 메시지를 `broadcast` 채널에 넣으면,
`Hub.Run()` 고루틴이 모든 활성 클라이언트에 fan-out.
**슬로우 클라이언트는 메시지를 드롭**한다. IoT 모니터링 용도라 허용 가능.

## 성능

로컬 테스트: 디바이스 100개, 클라이언트 10개, 초당 100 메시지.

- CPU: 2%
- 메모리: 18MB (ingestion 프로세스)
- WebSocket 지연: p99 < 5ms

Redis 없이도 차고 넘친다.

## 교훈

**의심스러우면 빼라.**
추가하는 건 쉽고, 빼는 건 정치적이다. 설계 초기에 결정하자.

이 결정은 ADR-002로 [CLAUDE.md](/posts/0001-hello/)에 기록돼 있다.