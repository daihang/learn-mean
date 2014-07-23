﻿var mysql = require('mysql'); //����MySQLģ��

/*
CREATE TABLE `t_test1` (
`id` INT(10) NOT NULL AUTO_INCREMENT,
`name` VARCHAR(50) NULL DEFAULT NULL,
`name_en` VARCHAR(50) NULL DEFAULT NULL,
`name_short` VARCHAR(50) NULL DEFAULT NULL,
PRIMARY KEY (`id`)
)
 */

//mysqlConfig
var mysqlConfig = {
	host : '127.0.0.1', //����
	user : 'root', //MySQL��֤�û���
	password : '1234', //MySQL��֤�û�����
	port : '3306', //�˿ں�
	database : 'test',
	charset : 'UTF8_GENERAL_CI'
};

testConn();
testInsert();
testPool();

function testConn() {
	//����һ��connection
	var connection = mysql.createConnection(mysqlConfig);

	//����һ��connection
	connection.connect(function (err) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		console.log('[connection connect]  succeed!');
	});

	//ִ��SQL���
	connection.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
		if (err) {
			console.log('[query] - :' + err);
			return;
		}
		console.log('The solution is: ', rows[0].solution);
	});

	//�ر�connection
	connection.end(function (err) {
		if (err) {
			return;
		}
		console.log('[connection end] succeed!');
	});
}

//test insert Data
function testInsert() {
	var connection = mysql.createConnection(mysqlConfig);
	connection.connect();
	var sql = 'INSERT INTO t_test1(name, name_en, name_short) VALUES(?, ?, ?)';
	var sqlParams = ['李玲', 'Liling', 'LL'];
	connection.query(sql, sqlParams, function (err, result) {
		if (err) {
			console.log('[INSERT ERROR] - ', err.message);
			return;
		}
		console.log('--------------------------INSERT----------------------------');
		console.log('INSERT ID:', result);
		console.log('-----------------------------------------------------------------');
	});
	connection.end();
}

function testPool() {
	var pool = mysql.createPool(mysqlConfig);
	pool.getConnection(function (err, connection) {
		connection.query('SELECT * FROM t_test1;', function (err, result) {
			console.log(result);
			connection.release();
		});

		connection.query('SELECT name,name_en FROM t_test1;', function (err, result) {
			console.log(result);
			//connection.release();
		});		
	});
}
