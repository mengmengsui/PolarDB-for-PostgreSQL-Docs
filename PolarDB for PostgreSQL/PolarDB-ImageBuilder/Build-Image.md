# 本地构建镜像

## 安装依赖

执行如下命令安装python：

```bash
sudo pip install -r requirements.txt
```


## 构建镜像


如果要构建新的镜像，请按照以下步骤:

1. 下载PolarDBManager的代码。

   ```
   git clone https://github.com/ApsaraDB/PolarDBManager.git && cd PolarDBManager
   ```

2. 根据实际镜像构建的需求，修改`image.yml`中的配置，主要为：

   **engine_branch**：使用PolarDB for PostgreSQL开源数据库的哪条github分支上代码来构建引擎镜像。

   > 如果需要push镜像，请先添加镜像仓库的读写权限，然后执行以下命令登录镜像仓库。
   >
   > ``` 
   > docker login -u ${USER} -p
   > ```

3. 执行如下命令，开始构建镜像。

   ```
   ./image.py -f image.yml
   ```

   构建的结果会放在`image.result`文件中。