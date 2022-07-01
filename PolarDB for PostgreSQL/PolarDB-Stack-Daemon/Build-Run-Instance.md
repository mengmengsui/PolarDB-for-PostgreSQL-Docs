# 搭建和运行实例

可采用以下两种途径使用PolarDB Stack Daemon：

- 阿里云PolarDB混合云版本。
- 本地搭建开源PolarDB Stack Daemon。

## 搭建阿里巴巴PolarDB混合云版运行的实例

阿里云PolarDB 混合云版：[官网地址](https://www.alibabacloud.com/zh/product/polarbox)。

## 搭建本地运行的实例

**操作前提：**

PolarDB Stack Daemon以k8s daemonset形式运行在每台node机器上，通过ssh在本机上执行操作命令。部署前，请确保k8s安装完毕，k8s各组件运行正常， 且所有主机之间互相已打通ssh免密访问。

**操作步骤：**

1. 下载PolarDB Stack Daemon源代码，地址： <https://github.com/ApsaraDB/PolarDB-Stack-Daemon>。
2. 安装k8s，确保k8s个组件处于正常运行状态。
3. 安装相关依赖：执行`kubectl create -f all.yaml`（该yaml文件包含了PolarStack-Daemon部署所需的全部内容）。
    1. 网卡配置ccm-config configmap：

        - 配置了NET_CARD_NAME业务网网卡名称。NET_MASK业务网网卡子网掩码

    2. 创建了PolarDB Stack Daemon运行所需的ClusterRole、ServiceAccount、ClusterRoleBinding

        - ClusterRole：cloud-controller-manager

        - ClusterRoleBinding：cloud-controller-manager
        - ServiceAccount：cloud-controller-manage

    3. 主要启动参数：
        - 数据库日志所在目录参数dbcluster-log-dir
        - 数据库日志清理标准（单位天）ins-folder-overdue-days
        - 内核小版本信息所在configmap的label标签：core-version-cm-labels

    4. k8s daemonset设置：
        - 需要通过ssh访问本机的一些命令，挂载了/root/.ssh
        - polarstack-daemon日志所在目录/var/log/polardb-box/polardb-net， 挂载了该目录
        - 需要访问本机网情况，因为daemon-set使用了主机网络hostNetwork: true

1. 检查运行状态

    部署完PolarDB Stack Daemon后，可以通过查看daemonset pod状态，k8s node中的condition状态，k8s中端口扫描清理configmap， 内核镜像版本存在性configmap查看功能是否正常

​        a. PolarDB Stack Daemon的pod运行情况, 每台机器上有一个polarstack-daemon的pod， 都处于runningzhaungtai
​        ```kubectl get pod -owide -A |grep polarstack-daemon```

![img](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/288373/1632647922395-52bb9f96-9f03-444b-9e43-5b63d60c6782.png)

​        b. 查看端口扫描情况， 每个polarstack-daemon pod会通过尝试监听端口的方式识别本机上端口占用情况，并将已使用端口存入configmap中

​        ```kubectl get cm -A |grep port-usage```

![img](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/288373/1632648185711-686a7a48-9fc6-4814-beab-57ab2032e359.png)

​        c. 查看内核版本情况，PolarDB Stack Daemon在启动时会根据参数值查询内核小版本信息的configmap，然后根据configmap查询本机上是否存在这些image信息

​        ```kubectl get cm -A |grep version-availability```

![img](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/288373/1632648411948-c7a5a08b-d385-42fb-a984-50f2fa038aef.png)

​        如下所示图中表示两个内核小版本11.2.20200630.0172e3f3.20201103225317和11.2.20200630.e0eb5bdb.20210317155810存在于polardb-box-soft011160139051机器上

![img](https://intranetproxy.alipay.com/skylark/lark/0/2021/png/288373/1632648640395-7c4e5fb8-ff89-4cfe-b46c-b0be6fb6cac4.png)
