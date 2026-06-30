# Port 3000 EACCES 問題

## 症狀

- `node index.js` 執行後 Terminal 顯示 `listening on port 3000`
- 但瀏覽器打 `http://127.0.0.1:3000` 出現 `ERR_CONNECTION_REFUSED`
- `netstat -ano | findstr ":3000"` 查不到任何結果
- log 檔出現：`Server failed to start: listen EACCES: permission denied 127.0.0.1:3000`

## 混淆點

Express 的 `app.listen(port, callback)` 在某些情況下 callback 會先觸發印出訊息，
接著才拋出 `error` 事件，導致看起來「啟動成功」但其實失敗了。

## 根本原因

Windows 的 **Hyper-V / WSL2** 在開機時會動態保留一批 TCP port 範圍。
Port 3000 落在 `2980–3079` 這段被保留的範圍內，任何程式都無法綁上它。

查看目前保留的 port 範圍：

```powershell
netsh interface ipv4 show excludedportrange protocol=tcp
```

## 觸發時機

這個問題不是一開始就有，通常在以下操作後出現：

- 安裝 **WSL2**
- 安裝 **Docker Desktop**（底層使用 Hyper-V 或 WSL2）
- Windows 大版本更新後 Hyper-V 重新配置 port 範圍

## 解法

### 方法一：換 port（推薦，最簡單）

改用不在保留範圍內的 port，例如 `8888`、`4000`、`8080`。

```js
// src/server.js
const port = process.env.PORT || 8888;
```

### 方法二：強制搶回 port 3000（需管理員 + 重開機）

```powershell
# 以系統管理員身份執行
netsh int ipv4 add excludedportrange protocol=tcp startport=3000 numberofports=1
# 重開機後 Hyper-V 就不會再保留 3000
```

## Debug 過程學到的事

1. `ERR_CONNECTION_REFUSED` 不一定是防火牆問題，`127.0.0.1` 不受 Windows 防火牆影響
2. 用 `netstat -ano | findstr ":PORT"` 確認 port 是否真的有在監聽
3. 加 file logger（`logs/server.log`）可以留下完整錯誤訊息，方便事後確認
4. VS Code Debug Mode（F5）與直接 `node index.js` 行為不同，要用 `launch.json` 正確設定
5. Server 程序必須一直在前景執行，關掉 Terminal = Server 死亡
