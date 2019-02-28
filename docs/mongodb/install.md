# 安装

## Ubuntu

```bash
# 切换到下载目录
cd Downloads

# 下载
curl -O https://fastdl.mongodb.org/linux/mongodb-linux-x86_64-3.0.6.tgz

# 解压
tar -zxvf mongodb-linux-x86_64-3.0.6.tgz

# 将解压包拷贝到指定目录
mv  mongodb-linux-x86_64-3.0.6/ /usr/local/mongodb

# MongoDB 的可执行文件位于 bin 目录下，所以可以将其添加到 PATH 路径中
export PATH=/usr/local/mongodb/bin:$PATH

# 创建数据库目录
# /data/db 是 MongoDB 默认的数据库路径
# 这个目录在安装过程不会自动创建
mkdir -p /data/db

# 启动 MongoDB 服务
# 如果你的数据库目录不是/data/db，可以通过 --dbpath 来指定。
sudo /usr/local/mongodb/bin/mongod

# MongoDB 后台管理 Shell
# 保证 MongoDB 服务已经启动着
sudo /usr/local/mongodb/bin/mongo
```

### MongoDB 后台管理 Shell

```bash
#
sudo /usr/local/mongodb/bin/mongo

# 显示所有的 database
show dbs

# 切换到某个 database
use <batabase name>
# eg: use dogs

# 显示 collection
show tables

# 查询 collection 中的 document
db.<collection name>.find({})
# eg: db.dog.find({})

```
