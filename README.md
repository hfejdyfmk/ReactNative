# ReactNative
## Usage
  (1) $expo init <your project name>  
  (2) 下載這個repository的檔案到本地端(git clone或直接下載)，並取代expo init <your project name>同樣名字的檔案和資料夾  
  (3) $expo start 或是 $expo start --tunnel  
  (4) 開啟emulator (eg. browser, android模擬器, android手機等)  
  
## 檔案說明
- components/element/test.jsx:  即時編輯與測試(目前import進Screen Two，reload時會顯示)
- components/element/modify/:  尚未測試connect，已編輯
- components/element/demo/:  用來看已經修改檔案(modify)中的UI，目前import在Screen Two(目前import並顯示在Screen Two)

- components/webJS_notImport: 方便看web程式碼，沒有import在screens

## 其他
- 如果Reload慢，建議用expo+browswer模擬
- 如果想在Android手機模擬，
   (0)確保手機連到的wifi與電腦在同一個區域(連上同一個wifi，或是電腦開熱點給手機都可)
   (1)在電腦執行時指令用$expo start --tunnel  
   (2)手機下載Expo App 
   (3)在電腦的cmd訊息出現"Tunnel is ready"後掃描QRcode)
