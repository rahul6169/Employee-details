import { useState } from "react";
import { Button, Card, Drawer } from "antd";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Skill } from "../../../graphql";
import { getDrawerWidth } from "../../lib/drawer-size";
import { CreateSkill } from "./modify-skill";
import { SkillListInfo } from "./skill-list";

export const Skills: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleDrawerVisible = () => setIsDrawerVisible((prev) => !prev);
  const [editData, setEditData] = useState<Skill | null>();
  const onClickCreate = () => {
    setEditData(null);
    toggleDrawerVisible();
  };
  const onClickEdit = (editData: Skill) => {
    setEditData(editData);
    toggleDrawerVisible();
  };
  const extraButton = (
    <div>
      <Button
        type="primary"
        icon={<PlusCircleOutlined />}
        onClick={onClickCreate}
        className="ml-3"
        block
      >
        Create
      </Button>
    </div>
  );

  return (
    <Card extra={extraButton}>
      <Drawer
        title={editData ? "Update Skill" : "Create a new Skill"}
        width={getDrawerWidth(400)}
        onClose={toggleDrawerVisible}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={true}
      >
        <CreateSkill
          toggleDrawerVisible={toggleDrawerVisible}
          editData={editData}
        />
      </Drawer>
      <SkillListInfo onClickEdit={onClickEdit} />
    </Card>
  );
};
