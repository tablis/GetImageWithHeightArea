//获取项目工程里的图片
var fs = require('fs');//引用文件系统模块
var image = require("imageinfo"); //引用imageinfo模块 
function readFileList(path, filesList) {
    var files = fs.readdirSync(path);
    files.forEach(function (itm, index) {
        try {
            // var stat = fs.stat(path + itm, function (err, data) {
            //     if (err)
            //         console.log('it does not exist');
            //     else {
            //         console.log('it exists');
            //         if (stat.isDirectory()) {
            //             //递归读取文件
            //             readFileList(path + "/" + itm + "/", filesList)
            //         } else {

            //             var obj = {};//定义一个对象存放文件的路径和名字
            //             obj.path = path;//路径
            //             obj.filename = itm//名字
            //             filesList.push(obj);
            //         }
            //     }

            // });

            var stat =  fs.statSync(path +"/"+ itm);
            if (stat.isDirectory()) {
                //递归读取文件
                readFileList(path +"/"+ itm + "/", filesList)
            } else {

                var obj = {};//定义一个对象存放文件的路径和名字
                obj.path = path;//路径
                obj.filename = itm//名字
                filesList.push(obj);
            }
        }
        catch (err) {
            console.log('it does not exist:' + path + "/" + itm);
            console.log("err:"+err)
        }
    })
}
var getFiles = {
    //获取文件夹下的所有文件
    getFileList: function (path) {
        var filesList = [];
        readFileList(path, filesList);
        return filesList;
    },
    //获取文件夹下的所有图片
    getImageFiles: function (path) {
        var imageInfoList = [];

        this.getFileList(path).forEach((item) => {
            var ms = image(fs.readFileSync(item.path +"/"+ item.filename));
            if (ms.mimeType) {
                var json = {};
                json.imageName = item.filename;
                json.imageWidth = ms.width;
                json.imageHeight = ms.height;
                json.imageArea = ms.width * ms.height;
                imageInfoList.push(json);
            }
        });
        return imageInfoList;

    }
};
console.log(1);
var param = process.argv.slice(2);
//获取文件夹下的所有图片
console.log(1);
var imageInfoList = getFiles.getImageFiles(param[0]);
console.log(2);
console.log("所有图片信息:" + JSON.stringify(imageInfoList));
var totalImageCount = 0;
var totalImageArea = 0;
var arr1024_1024 =[];
var area = 1024*1024;
for (var i = 0; i < imageInfoList.length; i++) {
    totalImageCount++;
    totalImageArea += imageInfoList[i]["imageArea"];
    if(imageInfoList[i]["imageArea"]>=area){
        arr1024_1024.push(imageInfoList[i]);
    }
}
console.log("大于1024*1024的图:"+JSON.stringify(arr1024_1024));
console.log("总图片数:" + totalImageCount);
console.log("总图片面积:" + totalImageArea);
    //获取文件夹下的所有文件
    // getFiles.getFileList("./");