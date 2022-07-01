# 问题说明

## 兼容性说明

PolarDB Stack存储架构，分为控制平面（Control Plane）和数据平面（Data Plane）。

- 控制平面：负责LUN的创建、删除、扩容、克隆、快照等功能，通过SSH CLI或REST API与存储设备管控交互。控制平面没有统一标准，每个厂商的设备对外提供的命令或API都不一样，由客户的存储管理团队负责。
- 数据平面：存储管理模块扫描发现的LUN设备，并管理主机侧LUN的生命周期，逻辑卷创建、格式化、文件系统扩容、数据链路高可用、读写保护控制等功能，业界有标准的SCSI/NVMe协议访问，依赖支持Persist Reservation锁，所以对存储设备有SCSI/NVMe兼容性要求，只有满足要求的设备才能使用。

| 类型                 | 数据平面                                                     |
| -------------------- | ------------------------------------------------------------ |
| SAN存储兼容性要求    | 支持FC或iSCSI链路Lun至少有2条路径兼容SCSI-3协议，支持Persistent Reservation-7模式（Write Exclusive-All Registrants）。支持Persistent Reservation动作：REGISTER、RESERVE、PREEMPT、RELEASE、CLEAR |
| 分布式存储兼容性要求 | 提供块设备访问能力支持块设备级别的读写控制，有两种选择：兼容SCSI-3协议，支持Persistent Reservation-7模式（Write Exclusive-All Registrants）。支持Persistent Reservation动作：REGISTER、RESERVE、PREEMPT、RELEASE、CLEAR。支持类似于SCSI PR的机制，存储管理可以进行适配。 |

- 兼容性检测

```bash
#检查脚本，对存储的兼容性进行检测，没有报错即为正常。
sudo ./script/check_storage.sh
```

## PR锁依赖原理说明

请参见[《PolarDB 管控如何保障 DB 一致性》](https://lynnleelhl.github.io/docs/20211206_db_consistency.html)。