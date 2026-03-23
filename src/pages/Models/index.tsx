import { EditOutlined, EllipsisOutlined, SettingOutlined } from "@ant-design/icons";
import { Avatar, Card } from "antd";

const { Meta } = Card;

const ModelsPage = () => {
  return (
    <div>
      Models
      <Card
        style={{ width: 256 }}
        cover={
          <img
            draggable={false}
            alt="example"
            src="https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"
          />
        }
        actions={[
          <SettingOutlined key="setting" />,
          // <EditOutlined key="edit" />,
          <EllipsisOutlined key="ellipsis" />,
        ]}
      >
        <Meta
          // avatar={<Avatar src="https://api.dicebear.com/7.x/miniavs/svg?seed=8" />}
          title="Qwen-2.5-Chat-Plus-1"
          description="千问"
        />
      </Card>
    </div>
  );
};

export default ModelsPage;
