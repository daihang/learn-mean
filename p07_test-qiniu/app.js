// ������ţ Node.js SDK
var qiniu = require('node-qiniu');

// ����ȫ�ֲ�������������� AccessKey �� SecretKey��
// ���������������� CallbackURL �Ȳ���������˳�������пռ䡣
qiniu.config({
  access_key: 'yN5mbFne5oTu7qg0MYkVR2oC93QkYqP-wDNsVGzU',
  secret_key: 'pKKRZtN_bYVkNTRRy3_sYSoXcAjVDGiGIVgRZuV5'
});

// ��ÿռ����
var imagesBucket = qiniu.bucket('bluemix-demo');

// �ϴ�һ���ļ�������Ϊ��Ҫ�ϴ��� Key���ļ���ַ(�����Ǿ��Ե�ַ��Ҳ��������Ե�ַ)��
// ������Ϊ��ѡ���� options���������ϴ�����ʹ�� PutToken ���������ã�
// ���ĸ�Ϊ��ѡ�����ص�(callback)��
// ��������ص����������� putFile ���������ص� Promise ���������Ӧ��
imagesBucket.putFile('bluemixKey', __dirname + '/upload/bluemix-2.png', function(err, reply) {
  if (err) {
    return console.error(err);
  }

  console.dir(reply);
});