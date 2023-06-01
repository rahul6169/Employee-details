import { useState } from "react";
import { CreateTag } from "./modify-tag";
import { Button, Card, Drawer } from "antd";
import { getDrawerWidth } from "../lib/drawer-size";
import { PlusCircleOutlined } from "@ant-design/icons";
import { Tag } from "../../graphql";
import { TagListInfo } from "./tag-list";

export const Tags: React.FC = () => {
  const [isDrawerVisible, setIsDrawerVisible] = useState(false);
  const toggleDrawerVisible = () => setIsDrawerVisible((prev) => !prev);
  const [editData, setEditData] = useState<Tag | null>();
  const onClickCreate = () => {
    setEditData(null);
    toggleDrawerVisible();
  };
  const onClickEdit = (editData: Tag) => {
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
        title={editData ? "Update Category" : "Create a new Category"}
        width={getDrawerWidth(400)}
        onClose={toggleDrawerVisible}
        visible={isDrawerVisible}
        bodyStyle={{ paddingBottom: 80 }}
        destroyOnClose={true}
      >
        <CreateTag
          toggleDrawerVisible={toggleDrawerVisible}
          editData={editData}
        />
      </Drawer>
      <TagListInfo onClickEdit={onClickEdit} />
    </Card>
  );
};
