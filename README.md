# NCU MIS Project 2022

![](https://badgen.net/github/watchers/QI-XIANG/NCU_Project_Demo) ![](https://badgen.net/github/commits/QI-XIANG/NCU_Project_Demo) ![](https://badgen.net/github/last-commit/QI-XIANG/NCU_Project_Demo) ![](https://badgen.net/github/license/QI-XIANG/NCU_Project_Demo)

![NCU_Project_Demo](https://socialify.git.ci/QI-XIANG/NCU_Project_Demo/image?description=1&font=Inter&language=1&name=1&owner=1&pattern=Brick%20Wall&theme=Light)

* [一般用戶登入](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/userLogin.html)
* [保險公司登入](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/insuranceCompany_login.html)
* [政府機關登入](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/Government_login.html)
* [忘記密碼](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/resetPassword.html)
* [個人頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/user_profile.html)
* [保險公司頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/InsuranceCompany.html)
* [保險公司檢視個人頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/insuranceCompany_UserProfile.html)
* [登入分流頁面](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/login_seperation.html)
* [政府機關頁面 (需先登入)](https://qi-xiang.github.io/NCU_Project_Demo/FireBaseDemo/Government.html)

### 建議使用電腦瀏覽，RWD尚未完善!!!

### 附註:

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

### 備忘錄:

1. ~~因資料庫有部分欄位更動，某些.js、min.js檔皆須調整~~
2. 圖表標題待新增
3. ~~政府機關登入功能尚未實作~~
4. 版面重新調整
5. ~~將部分通用的 function 存至另外的檔案並以 import 形式載入~~
6. ~~重新規劃並檢視 cookie 運作狀況~~
7. search bar 功能待新增
8. 將全數 CSS 從 Html 中獨立出來並壓縮成 min.css
9. 將 CSS 轉換用 Sass 做前處理達成 DRY (Don't repeat yourself)
10. 將視覺化圖表修正為舊到新排列(JQuery pre-click last page-link)
