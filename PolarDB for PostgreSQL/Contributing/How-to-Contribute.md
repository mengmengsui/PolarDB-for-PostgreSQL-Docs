# 如何贡献

### 贡献前

* 阅读并遵循我们的[行为守则](Code-of-Conduct.md)。
* 签署PolarDB for PostgreSQL贡献者许可协议（CLA）：请下载[PolarDB CLA](https://gist.github.com/alibaba-oss/151a13b0a72e44ba471119c7eb737d74)。按照说明进行签署。



如下是准备和提交Pull Request（PR）所需的流程清单。

* 通过克隆（Fork）PolarDB for PostgreSQL相关组件仓库来创建自己的GitHub分支。
* 关于如何部署PolarDB for PostgreSQL，请阅读[搭建实例](../Build-Instance.md)。
* 将修改推送到您的个人Fork，并确保它们遵循阿里云的[编码风格](Style.md)。
* 如果Commit消息无法明确表达其含义，请创建带有详细描述的PR。
* 将PR提交审核，并解决所有的反馈。
* 等待合并（由Committer完成）。

下面通过一个示例来演示该流程。



## 提交PolarDB for PostgreSQL代码修改的示例

### Fork自己的分支

在[PolarDB GitHub页面](https://github.com/alibaba/PolarDB-for-PostgreSQL)，点击**Fork**按钮，创建自己的PolarDB仓库。

### 创建本地仓库

```bash
git clone https://github.com/your_github/PolarDB-for-PostgreSQL.git
```

### 创建一个dev分支（命名为test-github）

```bash
git branch test-github
```

### 在本地进行修改和提交

```bash
git status
git add files-to-change
git commit -m "modification for test-github"
```

### 将修改变基（Rebase）到master分支上并提交到远程仓库

```bash
git checkout master
git pull
git checkout test-github
git rebase master
-- resolve conflict, compile and test --
git push origin test-github
```

### 创建PR

点击**New pull request**或者**Compare & pull request**按钮，选择并对比alibaba/PolarDB-for-PostgreSQL和your_github/test-github分支，并填写PR描述。

### 解决评审意见

解决评委提出的所有问题并更新PR。

### 合并操作（Merge）

此操作由PolarDB Committer完成。
