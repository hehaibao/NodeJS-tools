/**
* 替换静态页面中 公共部分代码
* 用法：
 *    页面中引用 已有公共文件 比如： <link rel="import" href="header.html"> <link rel="import" href="footer.html">
 *
 *    原理其实很简单：

         1. 读import-example.html页面；
         2. 页面中含有link import这行HTML 则替换成对应href页面中的内容；

 命令： node replaceImport
* */

// 引入fs文件处理模块
var fs = require("fs");

// 测试用的HTML页文件夹地址和文件名称
var src = 'import',
    tplSrc = src + '/test';

// API文档中中找到遍历文件夹的API
fs.readdir(tplSrc, function(err, files) {
    if (err) throw err;
    files.forEach(function(filename) {
        // 读取HTML页面数据
        // 使用API文档中的fs.readFile(filename, [options], callback)
        fs.readFile(tplSrc + '/' + filename, {
            // 需要指定编码方式，否则返回原生buffer
            encoding: 'utf8'
        }, function(err, data) {
            // 下面要做的事情就是把
            // <link rel="import" href="header.html">
            // 这段HTML替换成href文件中的内容
            // 可以求助万能的正则
            var dataReplace = data.replace(/<link\srel="import"\shref="(.*)">/gi, function(matchs, m1) {
                // m1就是匹配的路径地址了
                // 然后就可以读文件了
                return fs.readFileSync(src + '/' + m1, {
                    encoding: 'utf8'
                });
            });

            // 由于我们要把文件放在更上一级目录，因此，一些相对地址要处理下
            // 在本例子中，就比较简单，对../进行替换
            //dataReplace = dataReplace.replace(/"\.\.\//g, '"');

            // 于是生成新的HTML文件
            // 文档找一找，发现了fs.writeFile(filename, data, [options], callback)
            fs.writeFile(filename, dataReplace, {
                encoding: 'utf8'
            }, function(err) {
                if (err) throw err;
                console.log(filename + ' -- 生成成功！');
            });
        });
    });
});