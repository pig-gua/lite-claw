import { useState, useEffect } from 'react';
import { DeleteOutlined, EllipsisOutlined, MinusCircleOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Button, Card, Divider, Dropdown, Empty, Flex, Form, Input, Modal, Popconfirm, Space } from 'antd';
import { Model } from '@/service/model-service';

const { Meta } = Card;

const ModelsPage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);
  const [models, setModels] = useState<Model[]>([]);

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [insertForm] = Form.useForm();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  useEffect(() => {
    window.modelService.getModels().then((models) => {
      console.log(models);
      setModels(models);
    });
  }, []);

  // 根据屏幕宽度计算每行显示的卡片数量
  const getCardWidth = () => {
    if (screenWidth < 768) {
      // 小屏幕：1列
      return '100%';
    } else if (screenWidth < 1024) {
      // 中等屏幕：2列
      return 'calc((100vw - 256px - 48px - 12px)/2)';
    } else if (screenWidth < 1440) {
      // 大屏幕：3列
      return 'calc((100vw - 256px - 48px - 18px)/3)';
    } else {
      // 超大屏幕：4列
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
          onClick={() => setIsInsertModalOpen(true)}
        >
          新增模型
        </Button>
      </div>
      {models.length == 0 && (
        <Empty style={{ marginTop: 132 }} description="暂无模型" />
      )}
      <Flex wrap gap="small">
        {models.map((model) => (
          <Card
            key={model.name}
            style={{ width: getCardWidth() }}
            actions={[
              <SettingOutlined key="setting" style={{ color: '#1677ff' }} />,
              <Popconfirm
                title="删除模型"
                description="确认删除模型吗？模型删除将无法恢复。"
                onConfirm={() => {
                  window.modelService.deleteModel(model.name).then(() => {
                    // 重新获取模型数据
                    window.modelService.getModels().then((models) => {
                      setModels(models);
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
              title={model.name}
              description={model.description}
            />
          </Card>
        ))}
      </Flex>

      <Modal
        title="新增模型"
        centered={false}
        mask={{ closable: false }}
        open={isInsertModalOpen}
        onCancel={() => setIsInsertModalOpen(false)}
        footer={(_, { }) => (
          <>
            <Button onClick={() => {
              console.log('test connection');
              insertForm.validateFields();
              console.log(insertForm.getFieldsValue());
            }}>测试连接</Button>
            <Button type="primary" onClick={() => {
              insertForm.validateFields().then((values) => {
                window.modelService.addModel(values).then(() => {
                  setIsInsertModalOpen(false);
                  insertForm.resetFields();
                  // 重新获取模型数据
                  window.modelService.getModels().then((models) => {
                    setModels(models);
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
          <Form.Item name="endpoint" label="endpoint" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="model" label="model" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="token" label="Bear Token" rules={[{ required: false }]}>
            <Input />
          </Form.Item>
          <Form.Item name="headers" label="headers" rules={[{ required: false }]}>
            <Form.List name="headers">
              {(fields, { add, remove }) => (
                <>
                  {fields.map(({ key, name, ...restField }) => (
                    <Space key={key} style={{ display: 'flex', marginBottom: 8 }} align="baseline">
                      <Form.Item
                        {...restField}
                        name={[name, 'first']}
                        rules={[{ required: true, message: 'Missing header key' }]}
                      >
                        <Input placeholder="Key" />
                      </Form.Item>
                      <Form.Item
                        {...restField}
                        name={[name, 'last']}
                        rules={[{ required: true, message: 'Missing header value' }]}
                      >
                        <Input placeholder="Value" />
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
        </Form>
      </Modal>
    </div>
  );
};

export default ModelsPage;
