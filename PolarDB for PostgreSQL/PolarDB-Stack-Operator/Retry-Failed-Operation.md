# 失败重试

适用于操作失败状态变为 Interrupt

将 interrupt.recover 的值由 F 改为 T

```yaml
metadata:
  annotations:
    interrupt.recover: F
```
