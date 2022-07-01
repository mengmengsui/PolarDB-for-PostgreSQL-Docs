# 整体架构

本节将从两个方面来解读PolarDB架构的技术要点，分别是：存储计算分离架构、HTAP架构。

> 更多技术细节（如：如何基于Shared-Storage的查询优化器，LogIndex如何做到高性能，如何闪回到任意时间点，如何在Shared-Storage上支持MPP，如何和X-Paxos结合构建高可用等等），正在持续完善中。