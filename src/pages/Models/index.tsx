import { useState, useEffect } from 'react';
import { EllipsisOutlined, MinusCircleOutlined, PlusOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Button, Card, Divider, Flex, Form, Input, Modal, Select, Space } from 'antd';

const { Meta } = Card;

type Model = {
  name: string;
  description: string;
};
const models: Model[] = [
  {
    name: 'Qwen-2.5-Chat-Plus-1',
    description: '千问',
  },
  {
    name: 'Qwen-2.5-Chat-Plus-2',
    description: '千问2',
  },
  {
    name: 'Qwen-2.5-Chat-Plus-3',
    description: '千问3',
  },
  {
    name: 'Qwen-2.5-Chat-Plus-4',
    description: '千问4',
  },
  {
    name: 'Qwen-2.5-Chat-Plus-5',
    description: '千问5',
  },
];

const ModelsPage = () => {
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

  const [isInsertModalOpen, setIsInsertModalOpen] = useState(false);
  const [insertForm] = Form.useForm();

  useEffect(() => {
    const handleResize = () => {
      setScreenWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
      <Flex wrap gap="small">
        {models.map((model) => (
          <Card
            key={model.name}
            style={{ width: getCardWidth() }}
            actions={[
              <SettingOutlined key="setting" />,
              <EllipsisOutlined key="ellipsis" />,
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
            <Button type="primary" onClick={() => setIsInsertModalOpen(false)}>确认</Button>
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
