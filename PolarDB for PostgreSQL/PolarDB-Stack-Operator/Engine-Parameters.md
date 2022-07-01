# 引擎参数说明

引擎参数说明

| 参数名称                                               | 默认值     | 重启 | 修改范围                                                     |
| ------------------------------------------------------ | ---------- | ---- | ------------------------------------------------------------ |
| archive_mode                                           | on         | 是   | [always&#124;on&#124;off]                                    |
| autovacuum_vacuum_cost_delay                           | 0          | 否   | [-1-100]                                                     |
| autovacuum_vacuum_cost_limit                           | 10000      | 否   | [-1-10000]                                                   |
| auto_explain.log_analyze                               | off        | 否   | [on&#124;off]                                                |
| auto_explain.log_buffers                               | off        | 否   | [on&#124;off]                                                |
| auto_explain.log_format                                | text       | 否   | [text&#124;xml&#124;json&#124;yaml]                          |
| auto_explain.log_min_duration                          | 5000       | 否   | [-1-2147483647]                                              |
| auto_explain.<br />log_nested_statements               | off        | 否   | [on&#124;off]                                                |
| auto_explain.log_timing                                | on         | 否   | [on&#124;off]                                                |
| auto_explain.log_triggers                              | off        | 否   | [on&#124;off]                                                |
| auto_explain.log_verbose                               | off        | 否   | [on&#124;off]                                                |
| auto_explain.sample_rate                               | 1          | 否   | [0-1]                                                        |
| checkpoint_completion_target                           | 0.9        | 否   | [0-1]                                                        |
| checkpoint_timeout                                     | 300        | 否   | [1-86400]                                                    |
| default_transaction_deferrable                         | off        | 否   | [on&#124;off]                                                |
| default_with_oids                                      | off        | 否   | [on&#124;off]                                                |
| default_with_rowids                                    | off        | 否   | [on&#124;off]                                                |
| enable_partitionwise_aggregate                         | on         | 否   | [on&#124;off]                                                |
| enable_partitionwise_join                              | on         | 否   | [on&#124;off]                                                |
| extra_float_digits                                     | 0          | 否   | [-15-3]                                                      |
| idle_in_transaction_<br />session_timeout              | 3600000    | 否   | ^(0&#124;[1-9]\d{3,8}&#124;1\d{9}&#124;2000000000)$          |
| jit                                                    | off        | 否   | [on&#124;off]                                                |
| lock_timeout                                           | 0          | 否   | ^(0&#124;[1-9]\d{3,8}&#124;1\d{9}&#124;2000000000)$          |
| log_min_duration_statement                             | -1         | 否   | [-1-2147483647]                                              |
| log_statement                                          | all        | 否   | [none&#124;ddl&#124;mod&#124;all]                            |
| log_temp_files                                         | 100000     | 否   | [-1-2147483647]                                              |
| log_timezone                                           | 'PRC'      | 否   | ^'(((UTC)(-){0,1}(\d&#124;[1-9]\d&#124;1([0-5]\d&#124;6<br />[0-7])))&#124;((GMT)(-){0,1}(\d&#124;[1-9]\d&#124;1([0-5]<br />\d&#124;6[0-7])))&#124;CST6CDT&#124;Poland&#124;Kwajalein&#124;<br />MST&#124;NZ&#124;Universal&#124;Libya&#124;Turkey&#124;<br />EST5EDT&#124;Greenwich&#124;NZ-CHAT&#124;MET&#124;<br />Portugal&#124;GMT-0&#124;CET&#124;Eire&#124;PST8PDT&#124;<br />Jamaica&#124;GMT&#124;Zulu&#124;Japan&#124;ROC&#124;GB-Eire&#124;<br />ROK&#124;Navajo&#124;Singapore&#124;posixrules&#124;GB&#124;<br />EST&#124;GMT0&#124;Hongkong&#124;PRC&#124;Iran&#124;<br />MST7MDT&#124;WET&#124;W-SU&#124;UCT&#124;Cuba&#124;Egypt&#124;<br />EET&#124;Israel&#124;UTC&#124;HST&#124;Iceland)'$ |
| max_parallel_<br />maintenance_workers                 | 2          | 否   | [0-1024]                                                     |
| max_parallel_workers                                   | 2          | 否   | [0-512]                                                      |
| max_parallel_workers_per_gather                        | 2          | 否   | [0-512]                                                      |
| min_parallel_index_scan_size                           | 64         | 否   | [0-715827882]                                                |
| min_parallel_table_scan_size                           | 1024       | 否   | [0-715827882]                                                |
| old_snapshot_threshold                                 | -1         | 是   | [-1-86400]                                                   |
| polar_comp_dynatune                                    | 0          | 是   | [0-100]                                                      |
| polar_comp_dynatune_profile                            | oltp       | 是   | [oltp&#124;reporting&#124;mixed]                             |
| polar_comp_enable_pruning                              | on         | 否   | [on&#124;off]                                                |
| polar_comp_redwood_date                                | on         | 否   | [on&#124;off]                                                |
| polar_comp_<br />redwood_greatest_least                | on         | 否   | [on&#124;off]                                                |
| polar_comp_<br />redwood_raw_names                     | on         | 否   | [on&#124;off]                                                |
| polar_comp_redwood_strings                             | on         | 否   | [on&#124;off]                                                |
| polar_comp_stmt_level_tx                               | on         | 否   | [on&#124;off]                                                |
| dbms_job.database_name                                 | 'postgres' | 是   | ^'\w+'$                                                      |
| statement_timeout                                      | 0          | 否   | ^(0&#124;[1-9]\d{3,8}&#124;1\d{9}&#124;2000000000)$          |
| temp_file_limit                                        | 524288000  | 否   | [-1-1048576000]                                              |
| timezone                                               | 'PRC'      | 否   | ^'(((UTC)(-){0,1}(\d&#124;[1-9]\d&#124;1([0-5]\d&#124;6<br />[0-7])))&#124;((GMT)(-){0,1}(\d&#124;[1-9]\d&#124;1([0-5]\d&#124;<br />6[0-7])))&#124;CST6CDT&#124;Poland&#124;Kwajalein&#124;<br />MST&#124;NZ&#124;Universal&#124;Libya&#124;Turkey&#124;<br />EST5EDT&#124;Greenwich&#124;NZ-CHAT&#124;MET&#124;<br />Portugal&#124;GMT-0&#124;CET&#124;Eire&#124;PST8PDT&#124;<br />Jamaica&#124;GMT&#124;Zulu&#124;Japan&#124;ROC&#124;GB-Eire&#124;<br />ROK&#124;Navajo&#124;Singapore&#124;posixrules&#124;GB&#124;<br />EST&#124;GMT0&#124;Hongkong&#124;PRC&#124;Iran&#124;<br />MST7MDT&#124;WET&#124;W-SU&#124;UCT&#124;Cuba&#124;Egypt&#124;<br />EET&#124;Israel&#124;UTC&#124;HST&#124;Iceland)'$ |
| track_commit_timestamp                                 | off        | 是   | [on&#124;off]                                                |
| vacuum_defer_cleanup_age                               | 0          | 否   | [0-1000000]                                                  |
| wal_level                                              | logical    | 是   | [replica&#124;logical]                                       |
| work_mem                                               | 4096       | 否   | [4096-524288]                                                |
| polar_empty_<br />string_is_null_enable                | on         | 否   | [on&#124;off]                                                |
| polar_enable_varchar2_<br />length_with_byte           | on         | 否   | [on&#124;off]                                                |
| polar_enable_base64_decode                             | on         | 否   | [on&#124;off]                                                |
| polar_enable_nls_date_format                           | on         | 否   | [on&#124;off]                                                |
| polar_enable_rowid                                     | on         | 否   | [on&#124;off]                                                |
| postgres_fdw.<br />polar_connection_check              | off        | 否   | [on&#124;off]                                                |
| polar_comp_custom_plan_tries                           | 5          | 否   | [-1-100]                                                     |
| dblink.polar_auto_port_mapping                         | off        | 否   | [on&#124;off]                                                |
| dblink.polar_connection_check                          | off        | 否   | [on&#124;off]                                                |
| pg_stat_statements.<br />enable_superuser_track        | on         | 否   | [on&#124;off]                                                |
| cron.polar_allow_superuser_task                        | on         | 是   | [on&#124;off]                                                |
| polar_stat_sql.<br />enable_qps_monitor                | on         | 否   | [on&#124;off]                                                |
| polar_enable_audit_<br />log_bind_sql_parameter        | off        | 否   | [on&#124;off]                                                |
| polar_enable_audit_log_<br />bind_sql_parameter_new    | off        | 否   | [on&#124;off]                                                |
| polar_enable_replica_<br />use_smgr_cache              | on         | 是   | [off&#124;on]                                                |
| idle_session_timeout                                   | 0          | 否   | [0-2147483647]                                               |
| polar_resource_group.<br />total_mem_limit_rate        | 95         | 否   | [50-100]                                                     |
| polar_resource_group.<br />total_mem_limit_remain_size | 524288     | 否   | [131072-2097151]                                             |



> **注意**：以下参数为高危参数，请确认影响后谨慎修改

| 参数名称                                           | 默认值                                                       | 重启 | 修改范围                            |
| -------------------------------------------------- | ------------------------------------------------------------ | ---- | ----------------------------------- |
| autovacuum_max_workers                             | 5                                                            | 是   | [1-262143]                          |
| autovacuum_work_mem                                | 200MB                                                        | 否   | [-1-2147483647]                     |
| enable_hashagg                                     | off                                                          | 否   | [on&#124;off]                       |
| log_connections                                    | off                                                          | 否   | [on&#124;off]                       |
| log_disconnections                                 | off                                                          | 否   | [on&#124;off]                       |
| max_standby_streaming_delay                        | 30000                                                        | 否   | [-1-2147483647]                     |
| polar_bgwriter_batch_size_flushlist                | 100                                                          | 是   | [1-10000]                           |
| polar_bgwriter_max_batch_size                      | 5000                                                         | 否   | [0-1073741823]                      |
| polar_bgwriter_sleep_lsn_lag                       | 100                                                          | 否   | [0-1000]                            |
| polar_buffer_copy_lsn_lag_with_cons_lsn            | 100                                                          | 否   | [1-1000]                            |
| polar_buffer_copy_min_modified_count               | 5                                                            | 否   | [0-100]                             |
| polar_bulk_extend_size                             | 512                                                          | 否   | [0-1073741823]                      |
| polar_check_checkpoint_legal_interval              | 10                                                           | 否   | [1-3600]                            |
| polar_clog_slot_size                               | 512                                                          | 是   | [128-8192]                          |
| polar_comp_early_lock_release                      | off                                                          | 否   | [on&#124;off]                       |
| polar_copy_buffers                                 | 16384                                                        | 是   | [128-1073741823]                    |
| polar_enable_connectby_multiexpr                   | on                                                           | 否   | [on&#124;off]                       |
| polar_enable_physical_<br />repl_non_super_wal_snd | off                                                          | 否   | [on&#124;off]                       |
| polar_enable_show_polar_comp_version               | on                                                           | 否   | [on&#124;off]                       |
| polar_enable_syslog_pipe_buffer                    | off                                                          | 否   | [on&#124;off]                       |
| polar_global_temp_table_debug                      | off                                                          | 否   | [on&#124;off]                       |
| polar_max_log_files                                | 20                                                           | 否   | [-1-2147483647]                     |
| polar_max_super_conns                              | 100                                                          | 否   | [-1-262143]                         |
| polar_num_active_global_temp_table                 | 1000                                                         | 是   | [0-1000000]                         |
| polar_parallel_bgwriter_check_interval             | 10                                                           | 否   | [1-600]                             |
| polar_parallel_bgwriter_delay                      | 10                                                           | 否   | [1-10000]                           |
| polar_parallel_bgwriter_workers                    | 5                                                            | 否   | [0-8]                               |
| polar_parallel_new_<br />bgwriter_threshold_time   | 10                                                           | 否   | [1-3600]                            |
| polar_read_ahead_xlog_num                          | 200                                                          | 是   | [0-200]                             |
| polar_redo_hashtable_size                          | 131072                                                       | 是   | [16-1073741823]                     |
| polar_ring_buffer_vacuum                           | 128                                                          | 否   | [10-1000]                           |
| polar_spl_savepoint_enable                         | on                                                           | 否   | [on&#124;off]                       |
| polar_temp_relation_<br />file_in_shared_storage   | off                                                          | 是   | [on&#124;off]                       |
| polar_vfs.libmm_num_partition                      | 32                                                           | 是   | [4-128]                             |
| polar_vfs.libmm_size                               | 67108864                                                     | 是   | [67108864-1073741824]               |
| polar_enable_fullpage_snapshot                     | off                                                          | 否   | [on&#124;off]                       |
| polar_enable_default_polar_comp_guc                | on                                                           | 否   | [on&#124;off]                       |
| polar_stat_stale_cost                              | 0.0001                                                       | 否   | [0-2147483647]                      |
| polar_auditlog_max_query_length                    | 4096                                                         | 否   | [512-49152]                         |
| polar_use_statistical_relpages                     | on                                                           | 否   | [on&#124;off]                       |
| shared_preload_libraries                           | 'polar_vfs,polar_worker,dbms_pipe,<br />polar_gen,pg_stat_statements,auth_delay,<br />auto_explain,pg_cron,dbms_job,polar_stat_sql' | 是   | ^'(polar_vfs,polar_worker)(,\w+)*'$ |
| wal_keep_segments                                  | 32                                                           | 否   | [0-100000]                          |
| temp_tablespaces                                   | 'polar_tmp'                                                  | 否   |                                     |
| polar_csn_enable                                   | on                                                           | 是   | [on&#124;off]                       |
| polar_max_non_super_conns                          | 400                                                          | 否   | [-1-262143]                         |
| polar_enable_master_xlog_read_ahead                | on                                                           | 是   | [on&#124;off]                       |
| polar_enable_early_launch_checkpointer             | on                                                           | 是   | [on&#124;off]                       |
| polar_enable_early_<br />launch_parallel_bgwriter  | on                                                           | 是   | [on&#124;off]                       |
| polar_enable_wal_prefetch                          | off                                                          | 是   | [on&#124;off]                       |
| polar_enable_persisted_buffer_pool                 | on                                                           | 是   | [on&#124;off]                       |
| polar_cast_decode_list                             | ''                                                           | 否   |                                     |