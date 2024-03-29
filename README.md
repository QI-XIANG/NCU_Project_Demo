# NCU MIS Project 2022

![](https://badgen.net/github/watchers/QI-XIANG/NCU_Project_Demo) ![](https://badgen.net/github/commits/QI-XIANG/NCU_Project_Demo) ![](https://badgen.net/github/last-commit/QI-XIANG/NCU_Project_Demo) ![](https://badgen.net/github/license/QI-XIANG/NCU_Project_Demo)

![](https://i.imgur.com/uWQ6eml.png)

## 網頁連結

* [首頁](https://qi-xiang.github.io/ProjectWebsite/)
* [一般用戶登入](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/userLogin.html)
* [保險公司登入](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/insuranceCompany_login.html)
* [政府機關登入](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/Government_login.html)
* [忘記密碼](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/resetPassword.html)
* [個人頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/user_profile.html)
* [保險公司頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/InsuranceCompany.html)
* [保險公司檢視個人頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/insuranceCompany_UserProfile.html)
* [登入分流頁面](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/login_seperation.html)
* [政府機關頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/Government.html)
* [公開數據頁](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/publicData.html)
* [行程資料API (Compressed Ver.)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/ApiTestCompressed.json)

> ps. 需登入方可拜訪的頁面建議使用尺寸較大之裝置進行瀏覽!!!

## 測試帳號

### 一般用戶

帳號: ncumotorcycleapp2@gmail.com
密碼: A123456a

### 保險公司

公司名稱: 台灣人壽
公司編號: 123456
登入密碼: taiwanlife123456

### 政府

帳號: 123456
密碼: gv123456

## 附註:

1. 已完成登入/登出/註冊/找回密碼功能 2022.06
2. 個人頁面必須先登入才能檢視 2022.06
3. 個人頁面表格資料整理全數完成 2022.07
4. 表格的分頁功能(Pagination)已完成 2022.07
5. 表格資料顯示相關 bug 已修正 2022.07
6. 修正個人頁面 toggleButton 點擊後無法展開 bug 2022.07
7. 保險公司檢視介面檢視客戶功能完成 2022.07.18
8. 目前確認支援的瀏覽器為 Chrome、Edge、FireFox、Samsung Internet、Safari 2022.07.18
9. 保險公司登入/登出功能完成 (資料庫假資料表已建置) 2022.07.21
10. 新增彈出視窗動畫效果 2022.07.21
11. 所有網頁均使用獨立的 min.js 檔 2022.07.21
12. 新增表格資料載入中動畫 2022.07.21
13. 新增政府監管用戶頁面 (僅在背後邏輯與保險公司不同) 2022.07.22
14. 表格分頁功能部分 bug 修正 2022.07.22
15. 行程詳情新增顯示安全分數 2022.07.22
16. 速度折線圖 50% 完工 2022.07.25
17. 除安全分數外其餘數據圖表皆已完成(尚未美化並實裝到user上) 2022.07.28
18. 移除資料視覺化頁面，將其合併到使用者頁面 2022.07.29
19. 修正使用者頁面部分連結點擊後，造成圖表下拉式選單顯示錯誤 2022.07.30
20. 修正圖表無法正常置於視窗正中央的排版錯誤 2022.07.30
21. 全數圖表均已繪製完成 2022.07.30
22. 政府機關登入功能實作完成 2022.08.01
23. 所有 cookie 的操作均已調整修復完成 2022.08.01
24. 通用的 function 存至另外的檔案並以 import 形式載入 2022.08.02
25. min.js 檔全數修正完畢 2022.08.02
26. 完成政府機關、保險公司頁面的 Pagination 2022.08.02
27. 將視覺化圖表修正為舊到新排列並優先顯示最新數據 2022.08.03
28. 新增圖表標題 2022.08.03
29. 修改部分頁面的版面 2022.08.10 
30. 新增車友數據供參考 2022.08.11
31. 將車友數據移植到個人頁面 2022.08.12
32. 個人頁面版面調整(同保險公司檢視個人頁面) 2022.08.12
33. 所有版面初步調整完畢 2022.08.14
34. 部分bug修正 2022.08.14
35. 追加公開資料 API 測試頁面 (含資料說明書撰寫) 2022.08.17 
36. 公開資料頁面新增完畢 2022.08.22
37. 登入介面新增返回首頁 2022.08.22
38. 資料表格功能擴展(含排序、分頁、搜尋) 2022.08.29

> 版本更新紀錄 38. 暫為最後一次大更新，之後僅做版面部分細微調整。

## 備忘錄:

1. ~~因資料庫有部分欄位更動，某些.js、min.js檔皆須調整~~
2. ~~圖表標題待新增~~
3. ~~政府機關登入功能尚未實作~~
4. 版面重新調整
5. ~~將部分通用的 function 存至另外的檔案並以 import 形式載入~~
6. ~~重新規劃並檢視 cookie 運作狀況~~
7. ~~search bar 功能待新增~~
8. 將全數 CSS 從 Html 中獨立出來並壓縮成 min.css
9. ~~將 CSS 轉換用 Sass 做前處理達成 DRY (Don't repeat yourself)~~
10. ~~將視覺化圖表修正為舊到新排列(JQuery pre-click last page-link)~~
11. ~~Figma 版型研究中...~~
12. 將所有欄位的 autocomplete 設成 off
13. 所有帳號的密碼都必須含英數字!!!
14. CSS 獨立出來勿夾雜在 HTML 裡面

## 許願池

1. 將 CSS 轉換用 Sass 做前處理達成 DRY (Don't repeat yourself)
2. ~~search bar 功能待新增~~ (許願成功 2022.08.27)