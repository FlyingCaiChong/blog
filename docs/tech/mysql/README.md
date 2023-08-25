# MySQL Cheat Sheet

## MySQL 命令行客户端命令

使用用户名和密码连接 MySQL 服务器(MySQL 将提示输入密码):

```sh
mysql -u [username] -p;
```

使用用户名和密码连接具有指定数据库的 MySQL 服务器:

```sh
mysql -u [username] -p [database];
```

退出`mysql`命令行客户端:

```sh
exit;
```

使用`mysqldump`工具导出数据:

```sh
mysqldump -u [username] -p [database] > data_backup.sql;
```

## 使用数据库

创建指定名称的数据库(如果不存在该数据库才创建):

```sql
CREATE DATABASE [IF NOT EXISTS] database_name;
```

使用数据库:

```sql
USE database_name;
```

永久删除指定名称的数据库(如果数据库存在):

```sql
DROP DATABASE [IF EXISTS] database_name;
```

显示当前数据库服务器中的所有可用数据库:

```sql
SHOW DATABASE;
```

## 使用表

显示当前数据库中的所有表:

```sql
SHOW TABLES;
```

创建新表:

```sql
CREATE TABLE [IF NOT EXISTS] table_name(
  column_list
);
```

向表中添加新列:

```sql
ALTER TABLE table_name ADD [COLUMN] column_name;
```

从表中删除列:

```sql
ALTER TABLE table_name DROP [COLUMN] column_name;
```

向表中添加指定名称的索引:

```sql
ALTER TABLE table_name ADD INDEX [name](column, ...);
```

向表中添加主键:

```sql
ALTER TABLE table_name ADD PRIMARY KEY (column_name, ...);
```

删除表的主键:

```sql
ALTER TABLE table_name DROP PRIMARY KEY;
```

删除表:

```sql
DROP TABLE [IF EXISTS] table_name;
```

显示表的列:

```sql
DESCRIBE table_name;
```

在表中显示列的信息:

```sql
DESCRIBE table_name column_name;
```

## 使用索引

在表中创建指定名称的索引:

```sql
CREATE INDEX index_name
ON table_name (column,...);
```

删除索引:

```sql
DROP INDEX index_name;
```

创建唯一索引:

```sql
CREATE UNIQUE INDEX index_name
ON table_name (column,...);
```

## 使用视图

创建新视图:

```sql
CREATE VIEW [IF NOT EXISTS] view_name
AS
  select_statement;
```

使用`WITH CHECK OPTION`:

```sql
CREATE VIEW [IF NOT EXISTS] view_name
AS select_statement
WITH CHECK OPTION;
```

创建或替换视图:

```sql
CREATE OR REPLACE view_name
AS
select_statement;
```

删除视图:

```sql
DROP VIEW [IF EXISTS] view_name;
```

删除多个视图:

```sql
DROP VIEW [IF EXISTS] view1, view2, ...;
```

重命名视图:

```sql
RENAME TABLE view_name
TO new_view_name;
```

显示数据库中的视图:

```sql
SHOW FULL TABLES
[{FROM | IN } database_name]
WHERE table_type = 'VIEW';
```

## 使用触发器

创建触发器:

```sql
CREATE TRIGGER trigger_name
{BEFORE | AFTER} {INSERT | UPDATE| DELETE }
ON table_name FOR EACH ROW
trigger_body;
```

删除触发器:

```sql
DROP TRIGGER [IF EXISTS] trigger_name;
```

显示数据库中触发器:

```sql
SHOW TRIGGERS
[{FROM | IN} database_name]
[LIKE 'pattern' | WHERE search_condition];
```

## 使用存储过程

创建存储过程:

```sql
DELIMITER $$

CREATE PROCEDURE procedure_name(parameter_list)
BEGIN
   body;
END $$

DELIMITER ;
```

删除存储过程:

```sql
DROP PROCEDURE [IF EXISTS] procedure_name;
```

显示存储过程:

```sql
SHOW PROCEDURE STATUS
[LIKE 'pattern' | WHERE search_condition];
```

## 使用存储函数

创建存储函数:

```sql
DELIMITER $$

CREATE FUNCTION function_name(parameter_list)
RETURNS datatype
[NOT] DETERMINISTIC
BEGIN
 -- statements
END $$

DELIMITER ;
```

删除存储函数:

```sql
DROP FUNCTION [IF EXISTS] function_name;
```

显示存储函数:

```sql
SHOW FUNCTION STATUS
[LIKE 'pattern' | WHERE search_condition];
```

## 从表中查询数据

查询表中的所有数据:

```sql
SELECT * FROM table_name;
```

从表的一列或多列查询数据:

```sql
SELECT
    column1, column2, ...
FROM
    table_name;
```

从查询结果中删除重复的行:

```sql
SELECT
    DISTINCT (column)
FROM
   table_name;
```

使用子句筛选数据 `WHERE`:

```sql
SELECT select_list
FROM table_name
WHERE condition;
```

使用列别名输出:

```sql
SELECT
    column1 AS alias_name,
    expression AS alias,
    ...
FROM
    table_name;
```

使用内部联接从多个表中查询数据:

```sql
SELECT select_list
FROM table1
INNER JOIN table2 ON condition;
```

使用左连接从多个表中查询数据:

```sql
SELECT select_list
FROM table1
LEFT JOIN table2 ON condition;
```

使用右连接从多个表中查询数据:

```sql
SELECT select_list
FROM table1
RIGHT JOIN table2 ON condition;
```

取行的笛卡尔积:

```sql
SELECT select_list
FROM table1
CROSS JOIN table2;
```

对表中的行进行计数:

```sql
SELECT COUNT(*)
FROM table_name;
```

对结果集进行排序:

```sql
SELECT
    select_list
FROM
    table_name
ORDER BY
    column1 ASC [DESC],
    column2 ASC [DESC];
```

使用 `GROUP BY` 子句对行进行分组:

```sql
SELECT select_list
FROM table_name
GROUP BY column_1, column_2, ...;
```

使用`HAVING`子句筛选器组:

```sql
SELECT select_list
FROM table_name
GROUP BY column1
HAVING condition;
```

## 修改表数据

向表中插入新行:

```sql
INSERT INTO table_name(column_list)
VALUES(value_list);
```

向表中插入多行:

```sql
INSERT INTO table_name(column_list)
VALUES(value_list1),
      (value_list2),
      (value_list3),
      ...;
```

更新表中所有行数据:

```sql
UPDATE table_name
SET column1 = value1,
    ...;
```

通过`WHERE`子句限定条件, 更新表中指定行数据

```sql
UPDATE table_name
SET column_1 = value_1,
    ...
WHERE condition
```

更新并连接:

```sql
UPDATE
    table1,
    table2
INNER JOIN table1 ON table1.column1 = table2.column2
SET column1 = value1,
WHERE condition;
```

删除表中所有数据

```sql
DELETE FROM table_name;
```

删除表中限定条件的数据行:

```sql
DELETE FROM table_name
WHERE condition;
```

删除并连接:

```sql
DELETE table1, table2
FROM table1
INNER JOIN table2
    ON table1.column1 = table2.column2
WHERE condition;
```

## 搜索

通过关键字`LIKE`搜索数据:

```sql
SELECT select_list
FROM table_name
WHERE column LIKE '%pattern%';
```

通过关键字`RLIKE`使用正则表达式搜索数据:

```sql
SELECT select_list
FROM table_name
WHERE column RLIKE 'regular_expression';
```

---

[参考文档](https://www.mysqltutorial.org/mysql-cheat-sheet.aspx)
