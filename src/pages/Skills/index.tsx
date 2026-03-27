import { Skill } from "@/service/skill-service";
import { InboxOutlined } from "@ant-design/icons";
import { Button, Card, message, Modal } from "antd";
import Dragger from "antd/es/upload/Dragger";
import { useEffect, useState } from "react";

const SkillsPage = () => {
  const [isUploadModalOpen, setIsUploadModalOpen] = useState<boolean>(false);

  const [skills, setSkills] = useState<Skill[]>([]);

  useEffect(() => {
    window.skillService.getSkills().then((skills) => {
      setSkills(skills);
    });
  }, []);

  return (
    <div>
      <Button onClick={() => setIsUploadModalOpen(true)}>
        导入技能
      </Button>
      <div>
        {skills.map((skill) => (
          <Card key={skill.name}>
            <p>{skill.name}</p>
            <p>{skill.version}</p>
            <p>{skill.description}</p>
            <p style={{ color: 'red' }}>{skill.errorMessage}</p>
          </Card>
        ))}
      </div>

      <Modal
        title="导入技能"
        open={isUploadModalOpen}
        onOk={() => setIsUploadModalOpen(false)}
        onCancel={() => setIsUploadModalOpen(false)}
      >
        <Dragger name="file"
          multiple={true}
          action="https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload"
          onChange={(info) => {
            const { status } = info.file;
            if (status !== 'uploading') {
              console.log(info.file, info.fileList);
            }
            if (status === 'done') {
              message.success(`${info.file.name} file uploaded successfully.`);
            } else if (status === 'error') {
              message.error(`${info.file.name} file upload failed.`);
            }
          }}
          onDrop={(e) => {
            console.log('Dropped files', e.dataTransfer.files);
          }}>
          <p className="ant-upload-drag-icon">
            <InboxOutlined />
          </p>
          <p className="ant-upload-text">Click or drag file to this area to upload</p>
          <p className="ant-upload-hint">
            Support for a single or bulk upload. Strictly prohibited from uploading company data or other
            banned files.
          </p>
        </Dragger>
      </Modal>
    </div>
  );
};

export default SkillsPage;
