import { EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import { Avatar, Card, Flex } from 'antd';

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
  {
    name: 'Qwen-2.5-Chat-Plus-6',
    description: '千问6',
  },
  {
    name: 'Qwen-2.5-Chat-Plus-7',
    description: '千问7',
  },
];

const ModelsPage = () => {
  return (
    <div>
      <div
        style={{
          height: '25vh',
          minHeight: 128,
          maxHeight: 320,
          backgroundColor: '#f5f5f5',
          borderRadius: 12,
          marginBottom: 12,
        }}
      />
      <Flex wrap gap="small">
        {models.map((model) => (
          <Card
            key={model.name}
            style={{
              width: 'calc((100vw - 256px - 48px - 24px)/3)',
            }}
            actions={[
              <SettingOutlined key="setting" />,
              <EllipsisOutlined key="ellipsis" />,
            ]}
          >
            <Meta title={model.name} description={model.description} />
          </Card>
        ))}
      </Flex>
    </div>
  );
};

export default ModelsPage;
