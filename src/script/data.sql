-- 公司
INSERT INTO company (id, name, priority) VALUES (1, 'Tree工作室', 1);

-- 部门
INSERT INTO org (id, name, priority) VALUES (1, 'root', 1);

-- 管理员
INSERT INTO user (id, username, password, name, permissions, admin, createdDate, updatedDate, orgId) VALUES (1, 'admin', '123', '管理员', '[]', 1, '2025-08-04 03:26:18', '2025-08-04 03:26:18', 1);

-- 流程模板
INSERT INTO procedure (id, name, config) VALUES (1, '经营管理【工程项目】', '{\"stages\":[{\"seq\":1,\"stageName\":\"合同签订阶段\",\"nodes\":[{\"seq\":1,\"name\":\"中标公示结束\",\"participants\":[1,3,4]},{\"seq\":2,\"name\":\"甲方合同签订时间\",\"plannedDays\":30,\"participants\":[1,3,4]}]},{\"seq\":2,\"stageName\":\"合同交底阶段\",\"nodes\":[{\"seq\":1,\"name\":\"合同交底会\",\"participants\":[1,3,4]}]},{\"seq\":3,\"stageName\":\"技经中心完成成本下达\",\"nodes\":[{\"seq\":1,\"name\":\"合同交底会\",\"plannedDays\":10,\"participants\":[1,3,4]}]},{\"seq\":4,\"stageName\":\"分包、物资招标阶段\",\"nodes\":[{\"seq\":1,\"name\":\"物资招标\",\"participants\":[1,3,4]},{\"seq\":2,\"name\":\"分包招标\",\"participants\":[1,3,4]}]},{\"seq\":5,\"stageName\":\"工程实施阶段\",\"nodes\":[{\"seq\":1,\"name\":\"开工\",\"participants\":[1,3,4]},{\"seq\":2,\"name\":\"竣工验收\",\"participants\":[1,3,4]}]},{\"seq\":6,\"stageName\":\"总包结算阶段\",\"nodes\":[{\"seq\":1,\"name\":\"报送结算资料\",\"plannedDays\":10,\"participants\":[1,3,4]},{\"seq\":2,\"name\":\"总包结算初审\",\"plannedDays\":45,\"participants\":[1,3,4]},{\"seq\":3,\"name\":\"总包结算\",\"plannedDays\":15,\"participants\":[1,3,4]}]},{\"seq\":7,\"stageName\":\"分包结算阶段\",\"nodes\":[{\"seq\":1,\"name\":\"分包结算\",\"plannedDays\":60,\"participants\":[1,3,4]}]},{\"seq\":8,\"stageName\":\"项目决算阶段\",\"nodes\":[{\"seq\":1,\"name\":\"分公司启动决算工作\",\"participants\":[1,3,4]},{\"seq\":2,\"name\":\"核实各自业务是否完成\",\"plannedDays\":5,\"participants\":[1,3,4]},{\"seq\":3,\"name\":\"项目账务关闭\",\"plannedDays\":5,\"participants\":[1,3,4]}]}]}');
