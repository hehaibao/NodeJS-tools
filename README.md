## NodeJS小工具

这里记录一些之前用过的小工具，只要按照代码所写的规则，执行一句命令 即可减少人工操作，提高工作效率；
今后有其他的话将陆续更新。

以下小工具均需要本地有NodeJS。

1. replaceFileName.js -- 批量替换文件 下划线：_ 为 中横线：-

   比如：我想替换某个文件夹里所有带下划线的图片名称未中横线；

   执行命令： node replaceFileName 

2. replaceImport.js -- 替换静态页面中 公共部分代码

   比如：我想替换某个HTML文件中 ```javascript <link rel="import" href="header.html"> <link rel="import" href="footer.html">``` 这句代码为已经写好的代码块

   执行命令： node replaceImport


