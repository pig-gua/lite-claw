import { useState, useEffect } from 'react';
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
  const [screenWidth, setScreenWidth] = useState(window.innerWidth);

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
          backgroundColor: '#f5f5f5',
          borderRadius: 12,
          marginBottom: 12,
        }}
      />
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
    </div>
  );
};

export default ModelsPage;
