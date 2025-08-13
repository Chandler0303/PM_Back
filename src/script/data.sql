-- 公司
INSERT INTO company (id, name, priority) VALUES (1, 'Tree工作室', 1);

-- 部门
INSERT INTO org (id, name, priority) VALUES (1, 'root', 1);

-- 管理员
INSERT INTO user (id, username, password, name, permissions, admin, createdDate, updatedDate, orgId) VALUES (1, 'admin', '123', '管理员', '[]', 1, '2025-08-04 03:26:18', '2025-08-04 03:26:18', 1);

-- 流程模板
INSERT INTO procedure (id, name, config) VALUES (1, '经营管理【工程项目】', '{"stages":[{"seq":1,"stageName":"合同签订阶段","nodes":[{"seq":1,"name":"中标公示","plannedDays":"开始1","participants":[]},{"seq":2,"name":"甲方合同签订","plannedDays":30,"participants":[]}]},{"seq":2,"stageName":"合同交底阶段","nodes":[{"seq":1,"name":"合同交底会","plannedDays":"开始2","participants":[]}]},{"seq":3,"stageName":"成本下达阶段","nodes":[{"seq":1,"name":"技经中心完成成本下达","plannedDays":10,"participants":[]}]},{"seq":4,"stageName":"分包、物资招标阶段","nodes":[{"seq":1,"name":"物资招标","plannedDays":"","participants":[]},{"seq":2,"name":"分包招标","plannedDays":"","participants":[]}]},{"seq":5,"stageName":"工程实施阶段","nodes":[{"seq":1,"name":"项目施工","plannedDays":"","participants":[]},{"seq":2,"plannedDays":"开始3","name":"竣工验收","participants":[]}]},{"seq":6,"stageName":"总包结算阶段","nodes":[{"seq":1,"name":"接收结算资料","plannedDays":10,"participants":[]},{"seq":2,"name":"总包结算初审","plannedDays":45,"participants":[]},{"seq":3,"name":"总包结算","plannedDays":15,"participants":[]}]},{"seq":7,"stageName":"分包结算阶段","nodes":[{"seq":1,"name":"分包结算","plannedDays":60,"participants":[]}]},{"seq":8,"stageName":"项目决算阶段","nodes":[{"seq":1,"name":"核实项目账务情况","plannedDays":"开始4","participants":[]},{"seq":2,"name":"项目账务关闭","plannedDays":5,"participants":[]}]}]}');
