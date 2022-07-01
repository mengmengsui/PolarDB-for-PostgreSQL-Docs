# PostgreSQL生态兼容

PolarDB for PostgreSQL完全兼容PostgreSQL，应用迁移无需修改代码配置。

有关PostgreSQL详情，请参见[PostgreSQL官方文档](https://www.postgresql.org/docs/)。

## PostgreSQL消息协议

您也可以直接使用支持PostgreSQL消息协议的工具和图形化工具管理和开发PolarDB for PostgreSQL。

- 支持PostgreSQL消息协议的工具：命令行psql、libpq、JDBC、ODBC、psycopg2等。
- 图形化工具：DBeaver，阿里云数据管理服务DMS等。

## 语法兼容性

PolarDB for PostgreSQL兼容PostgreSQL的各种DML、DAL、DDL语法，包括但不限于：

- PostgreSQL函数（包括JSON函数、加密解密函数等）。
- 兼容PostgreSQL的视图、窗口函数、分析函数等。
- 支持PostgreSQL的各种数据类型，包括类型精度支持（比如时间戳、Decimal类型）。
- 兼容PostgreSQL的information_schema视图。

