import { useState, useEffect } from 'react';
import { DeleteOutlined, MinusCircleOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Empty, Flex, Form, Input, message, Modal, Popconfirm, Select, Space } from 'antd';
import { McpServer, Tool } from '@/service/tool-service';

const { Meta } = Card;

const ToolsPage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [mcpServers, setMcpServers] = useState<McpServer[]>([]);

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [insertForm] = Form.useForm();

  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [updateForm] = Form.useForm();

  const [testing, setTesting] = useState(false);
  const [type, setType] = useState('');

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.toolService.getMcpServers().then((servers) => {
      console.log(servers);
      setMcpServers(servers);
    });
  }, []);

  // 根据屏幕宽度计算每行显示的卡片数量
  const getCardWidth = () => {
    if (screenWidth < 768) {
      // 小屏幕: 1列
      return '100%';
    } else if (screenWidth < 1024) {
      // 中等屏幕: 2列
      return 'calc((100vw - 256px - 48px - 12px)/2)';
    } else if (screenWidth < 1440) {
      // 大屏幕: 3列
      return 'calc((100vw - 256px - 48px - 18px)/3)';
    } else {
      // 超大屏幕: 4列
      return 'calc((100vw - 256px - 48px - 24px)/4)';
    }
  };


  return (
    <div>
      <div
        style={{
          height: '25vh',
          minHeight: 128,
          maxHeight: 320,
          backgroundColor: '#e6f4ff',
          borderRadius: 12,
          marginBottom: 12,
          position: 'relative',
        }}
      >
        <Button
          style={{
            position: 'absolute',
            bottom: 12,
            right: 12,
          }}
          color="primary" variant="solid"
          onClick={() => {
            setType('');
            insertForm.resetFields();
            setIsInsertModalOpen(true);
          }}
        >
          新增Mcp服务器
        </Button>
      </div>
      {mcpServers.length == 0 && (
        <Empty style={{ marginTop: 132 }} description="暂无Mcp服务器" />
      )}
      <Flex wrap gap="small">
        {mcpServers.map((server) => (
          <Card
            key={server.name}
            style={{ width: getCardWidth() }}
            actions={[
              <SettingOutlined key="setting" style={{ color: '#1677ff' }} onClick={
                () => {
                  updateForm.setFieldsValue(server);
                  setType(server.type);
                  setIsUpdateModalOpen(true);
                }} />,
              <Popconfirm
                title="删除Mcp服务器"
                description="确认删除服务器吗？服务器删除将无法恢复。"
                onConfirm={() => {
                  window.toolService.deleteMcpServer(server.name).then(() => {
                    // 重新获取服务器数据
                    window.toolService.getMcpServers().then((servers) => {
                      setMcpServers(servers);
                    });
                  });
                }}
                onCancel={() => { }}
                okText="确认"
                cancelText="取消"
              >
                <DeleteOutlined key="delete" style={{ color: '#f5222d' }} />
              </Popconfirm>

            ]}
          >
            <Meta
              style={{ height: 126 }}
              title={server.name}
            // description={server.description}
            />
          </Card>
        ))}
      </Flex>

      <Modal
        title="新增Mcp服务器"
        centered={false}
        mask={{ closable: false }}
        open={isInsertModalOpen}
        onCancel={() => setIsInsertModalOpen(false)}
        footer={(_, { }) => (
          <>
            <Button loading={testing} onClick={() => {
              insertForm.validateFields();
              setTesting(true);
              window.toolService.testMcpServer(insertForm.getFieldsValue()).then((tools: Tool[]) => {
                message.success('测试成功, 可用工具:' + tools.length + '个');
              }).catch(() => {
                message.error('测试失败');
              }).finally(() => {
                setTesting(false);
              });
            }}>测试连接</Button>
            <Button type="primary" onClick={() => {
              insertForm.validateFields().then((values) => {
                window.toolService.addMcpServer(values).then(() => {
                  setIsInsertModalOpen(false);
                  insertForm.resetFields();
                  // 重新获取模型数据
                  window.toolService.getMcpServers().then((servers) => {
                    setMcpServers(servers);
                  });
                });
              });
            }}>确认</Button>
          </>
        )}
      >
        <Form
          form={insertForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={(values) => {
            console.log(values);
          }}
          style={{ maxWidth: 600, marginTop: 24 }}
        >
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="备注" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Divider />
          <Form.Item name="type" label="type" rules={[{ required: true }]}>
            <Select options={[
              { label: 'stdio', value: 'stdio', disabled: true },
              { label: 'websocket', value: 'websocket', disabled: true },
              { label: 'streamable-http', value: 'streamable-http' },
              { label: 'webhook', value: 'webhook', disabled: true },
            ]} onChange={(value) => setType(value)} />
          </Form.Item>
          {(type == 'websocket' || type == 'streamable-http' || type == 'webhook') && (
            <Form.Item name="url" label="url" rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          )}
          {type == 'stdio' && (
            <Form.Item name="command" label="command" rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          )}
          {type == 'stdio' && (
            <Form.Item name="args" label="args" rules={[{ required: false }]}>
              <Form.List name="args">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[{ required: true, message: 'Missing arg' }]}
                        >
                          <Input placeholder="Arg" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          )}
        </Form>
      </Modal>
      <Modal
        title="更新Mcp服务器"
        centered={false}
        mask={{ closable: false }}
        open={isUpdateModalOpen}
        onCancel={() => setIsUpdateModalOpen(false)}
        footer={(_, { }) => (
          <>
            <Button loading={testing} onClick={() => {
              updateForm.validateFields();
              setTesting(true);
              window.toolService.testMcpServer(updateForm.getFieldsValue()).then((tools: Tool[]) => {
                message.success('测试成功, 可用工具:' + tools.length + '个');
              }).catch(() => {
                message.error('测试失败');
              }).finally(() => {
                setTesting(false);
              });
            }}>测试连接</Button>
            <Button type="primary" onClick={() => {
              updateForm.validateFields().then((values) => {
                window.toolService.updateMcpServer(values).then(() => {
                  setIsUpdateModalOpen(false);
                  updateForm.resetFields();
                  // 重新获取服务器数据
                  window.toolService.getMcpServers().then((servers) => {
                    setMcpServers(servers);
                  });
                });
              });
            }}>确认</Button>
          </>
        )}
      >
        <Form
          form={updateForm}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 20 }}
          onFinish={(values) => {
            console.log(values);
          }}
          style={{ maxWidth: 600, marginTop: 24 }}
        >
          <Form.Item name="name" label="名称" rules={[{ required: true }]}>
            <Input disabled={true}/>
          </Form.Item>
          <Form.Item name="description" label="备注" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Divider />
          <Form.Item name="type" label="type" rules={[{ required: true }]}>
            <Select options={[
              { label: 'stdio', value: 'stdio', disabled: true },
              { label: 'websocket', value: 'websocket', disabled: true },
              { label: 'streamable-http', value: 'streamable-http' },
              { label: 'webhook', value: 'webhook', disabled: true },
            ]} onChange={(value) => setType(value)} />
          </Form.Item>
          {(type == 'websocket' || type == 'streamable-http' || type == 'webhook') && (
            <Form.Item name="url" label="url" rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          )}
          {type == 'stdio' && (
            <Form.Item name="command" label="command" rules={[{ required: false }]}>
              <Input />
            </Form.Item>
          )}
          {type == 'stdio' && (
            <Form.Item name="args" label="args" rules={[{ required: false }]}>
              <Form.List name="args">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }) => (
                      <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                        <Form.Item
                          {...restField}
                          name={name}
                          rules={[{ required: true, message: 'Missing arg' }]}
                        >
                          <Input placeholder="Arg" />
                        </Form.Item>
                        <MinusCircleOutlined onClick={() => remove(name)} />
                      </Space>
                    ))}
                    <Form.Item>
                      <Button type="dashed" onClick={() => add()} block icon={<PlusOutlined />}>
                        Add field
                      </Button>
                    </Form.Item>
                  </>
                )}
              </Form.List>
            </Form.Item>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default ToolsPage;
