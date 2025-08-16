-- 公司
INSERT INTO company (id, name, priority) VALUES (1, 'Tree工作室', 1);

-- 部门
INSERT INTO org (id, name, priority) VALUES (1, 'root', 1);

-- 管理员
INSERT INTO user (id, username, password, name, permissions, admin, createdDate, updatedDate, orgId) VALUES (1, 'admin', '123', '管理员', '[]', 1, '2025-08-04 03:26:18', '2025-08-04 03:26:18', 1);

-- 流程模板
INSERT INTO procedure (id, name, config) VALUES (1, '经营管理【工程项目】', '{"stages":[{"seq":1,"stageName":"中标、合同签订、交底","nodes":[{"seq":1,"name":"中标公示结束","plannedDays":"开始1","participants":[]},{"seq":2,"name":"甲方合同签订时间","plannedDays":30,"participants":[]}, {"seq":3,"name":"合同交底会","plannedDays":"开始2","participants":[]}]},{"seq":2,"stageName":"成本策划","nodes":[{"seq":1,"name":"图纸会审明确成本分类","plannedDays":3,"participants":[]}, {"seq":2,"name":"分公司提报采购需求","plannedDays":10,"participants":[]}, {"seq":3,"name":"技经中心完成成本策划","plannedDays":10,"participants":[]}]},{"seq":3,"stageName":"招标采购","nodes":[{"seq":1,"name":"分包招标是否完成","plannedDays":"","participants":[]},{"seq":2,"name":"物资招标是否完成","plannedDays":"","participants":[]}]},{"seq":4,"stageName":"工程施工","nodes":[{"seq":1,"name":"开工日期","plannedDays":"","participants":[]}, {"seq":2,"name":"竣工日期","plannedDays":"","participants":[]}, {"seq":3,"name":"项目工期","plannedDays":"","participants":[]}, {"seq":4,"plannedDays":"开始3","name":"收到竣工验收单","participants":[]}]},{"seq":5,"stageName":"项目结算","nodes":[{"seq":1,"name":"收到结算资料","plannedDays":10,"participants":[]},{"seq":2,"name":"总包结算初审","plannedDays":45,"participants":[]},{"seq":3,"name":"完成总包结算","plannedDays":15,"participants":[]}, {"seq":4,"name":"完成分包结算","plannedDays":60,"participants":[]}]},{"seq":6,"stageName":"项目决算","nodes":[{"seq":1,"name":"启动决算工作","plannedDays":"开始4","participants":[]}]}]}');
