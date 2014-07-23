// 引入七牛 Node.js SDK
var qiniu = require('node-qiniu');

// 设置全局参数，包括必须的 AccessKey 和 SecretKey，
// 还可以设置其他如 CallbackURL 等参数，将会顺延至所有空间。
qiniu.config({
  access_key: 'yN5mbFne5oTu7qg0MYkVR2oC93QkYqP-wDNsVGzU',
  secret_key: 'pKKRZtN_bYVkNTRRy3_sYSoXcAjVDGiGIVgRZuV5'
});

// 获得空间对象
var imagesBucket = qiniu.bucket('bluemix-demo');

// 上传一个文件，参数为将要上传的 Key，文件地址(可以是绝对地址，也可以是相对地址)，
// 第三个为可选参数 options，即本次上传中所使用 PutToken 的特殊设置，
// 第四个为可选参数回调(callback)，
// 若不传入回调函数，将由 putFile 函数所返回的 Promise 对象进行响应。
imagesBucket.putFile('bluemixKey', __dirname + '/upload/bluemix-2.png', function(err, reply) {
  if (err) {
    return console.error(err);
  }

  console.dir(reply);
});