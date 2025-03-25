# redis-connect

Redia의 Failover를 테스트하기 위한 코드입니다. 

## 실행

```bash
export REDISHOST=<Memorysotre for Redis primary ip address>
export REDISPORT=<port number>

npm install 
node index.js
```
실행이 되면 hh:mm:ss 형식의 시각을 키로 현재날짜와 시각을 값으로 Redis 저장합니다.

```
$ node index.js
REDISHOST: 10.116.192.4, REDISPORT: 6379 
Connected to Redis
Wrote to Redis: Key - 09:31:43, Value - 2025-03-25T09:31:43.287Z
Wrote to Redis: Key - 09:31:44, Value - 2025-03-25T09:31:44.288Z
Wrote to Redis: Key - 09:31:45, Value - 2025-03-25T09:31:45.289Z
Wrote to Redis: Key - 09:31:46, Value - 2025-03-25T09:31:46.291Z
Wrote to Redis: Key - 09:31:47, Value - 2025-03-25T09:31:47.292Z
Wrote to Redis: Key - 09:31:48, Value - 2025-03-25T09:31:48.293Z
Wrote to Redis: Key - 09:31:49, Value - 2025-03-25T09:31:49.294Z
Wrote to Redis: Key - 09:31:50, Value - 2025-03-25T09:31:50.295Z
Wrote to Redis: Key - 09:31:51, Value - 2025-03-25T09:31:51.295Z
Wrote to Redis: Key - 09:31:52, Value - 2025-03-25T09:31:52.295Z
```

## Memorystore for Redis의 Failover 실행 

[셀프서비스 유지보수](https://cloud.google.com/memorystore/docs/redis/self-service-maintenance?hl=ko) 문서의 내용을 참고하여 maintenance를 실행하면서 Failover를 시뮬레이션 합니다. 

```bash
gcloud redis instances describe <instance_id> --region=asia-northeast3

gcloud redis instances describe --region=asia-northeast3 <instance_id>

gcloud redis instances update <instance_id> --maintenance-version=current_default --region=asia-northeast3


```

maintanance_version은 [Redis용 Memorystore 유지보수 변경 로그](https://cloud.google.com/memorystore/docs/redis/maintenance-changelog?hl=ko)의 번호를 참조하고 형식은 "cloud-redis-dataplane-critical_20240724_00_00" 이런식으로 앞에 prefix를 붙입니다. 

먼저 과거 버전으로 돌리고 다시 현재 버전으로 돌아오는 식으로 실행합니다. 현재버전은 current_default 로 설정해도 됩니다. 

아주 잠깐 오류 발생 

```
Wrote to Redis: Key - 09:59:50, Value - 2025-03-25T09:59:50.259Z
Wrote to Redis: Key - 09:59:51, Value - 2025-03-25T09:59:51.260Z
Wrote to Redis: Key - 09:59:52, Value - 2025-03-25T09:59:52.261Z
Wrote to Redis: Key - 09:59:53, Value - 2025-03-25T09:59:53.262Z
Wrote to Redis: Key - 09:59:54, Value - 2025-03-25T09:59:54.263Z
Wrote to Redis: Key - 09:59:55, Value - 2025-03-25T09:59:55.264Z
Wrote to Redis: Key - 09:59:56, Value - 2025-03-25T09:59:56.265Z
Wrote to Redis: Key - 09:59:57, Value - 2025-03-25T09:59:57.266Z
Wrote to Redis: Key - 09:59:58, Value - 2025-03-25T09:59:58.267Z
Wrote to Redis: Key - 09:59:59, Value - 2025-03-25T09:59:59.268Z
ERR:REDIS: SocketClosedUnexpectedlyError: Socket closed unexpectedly
    at Socket.<anonymous> (/home/admin_iloh_altostrat_com/redis-connect/node_modules/@redis/client/dist/lib/client/socket.js:194:118)
    at Object.onceWrapper (node:events:632:26)
    at Socket.emit (node:events:517:28)
    at TCP.<anonymous> (node:net:351:12)
ERR:REDIS: ConnectionTimeoutError: Connection timeout
    at Socket.<anonymous> (/home/admin_iloh_altostrat_com/redis-connect/node_modules/@redis/client/dist/lib/client/socket.js:177:124)
    at Object.onceWrapper (node:events:631:28)
    at Socket.emit (node:events:517:28)
    at Socket._onTimeout (node:net:599:8)
    at listOnTimeout (node:internal/timers:569:17)
    at process.processTimers (node:internal/timers:512:7)
Wrote to Redis: Key - 10:00:00, Value - 2025-03-25T10:00:00.268Z
Wrote to Redis: Key - 10:00:01, Value - 2025-03-25T10:00:01.270Z
Wrote to Redis: Key - 10:00:02, Value - 2025-03-25T10:00:02.271Z
Wrote to Redis: Key - 10:00:03, Value - 2025-03-25T10:00:03.272Z
Wrote to Redis: Key - 10:00:04, Value - 2025-03-25T10:00:04.273Z
Wrote to Redis: Key - 10:00:05, Value - 2025-03-25T10:00:05.274Z
Wrote to Redis: Key - 10:00:06, Value - 2025-03-25T10:00:06.275Z
Wrote to Redis: Key - 10:00:07, Value - 2025-03-25T10:00:07.276Z
Wrote to Redis: Key - 10:00:08, Value - 2025-03-25T10:00:08.277Z
Wrote to Redis: Key - 10:00:09, Value - 2025-03-25T10:00:09.278Z
Wrote to Redis: Key - 10:00:10, Value - 2025-03-25T10:00:10.279Z
Wrote to Redis: Key - 10:00:11, Value - 2025-03-25T10:00:11.280Z
Wrote to Redis: Key - 10:00:12, Value - 2025-03-25T10:00:12.281Z
Wrote to Redis: Key - 10:00:13, Value - 2025-03-25T10:00:13.282Z
Wrote to Redis: Key - 10:00:14, Value - 2025-03-25T10:00:14.283Z
Wrote to Redis: Key - 10:00:15, Value - 2025-03-25T10:00:15.284Z
Wrote to Redis: Key - 10:00:16, Value - 2025-03-25T10:00:16.285Z
Wrote to Redis: Key - 10:00:17, Value - 2025-03-25T10:00:17.286Z
Wrote to Redis: Key - 10:00:18, Value - 2025-03-25T10:00:18.287Z
Wrote to Redis: Key - 10:00:19, Value - 2025-03-25T10:00:19.288Z
ERR:REDIS: SocketClosedUnexpectedlyError: Socket closed unexpectedly
    at Socket.<anonymous> (/home/admin_iloh_altostrat_com/redis-connect/node_modules/@redis/client/dist/lib/client/socket.js:194:118)
    at Object.onceWrapper (node:events:632:26)
    at Socket.emit (node:events:517:28)
    at TCP.<anonymous> (node:net:351:12)
Wrote to Redis: Key - 10:00:20, Value - 2025-03-25T10:00:20.290Z
Wrote to Redis: Key - 10:00:21, Value - 2025-03-25T10:00:21.291Z
Wrote to Redis: Key - 10:00:22, Value - 2025-03-25T10:00:22.292Z
Wrote to Redis: Key - 10:00:23, Value - 2025-03-25T10:00:23.293Z
Wrote to Redis: Key - 10:00:24, Value - 2025-03-25T10:00:24.294Z
Wrote to Redis: Key - 10:00:25, Value - 2025-03-25T10:00:25.294Z
```