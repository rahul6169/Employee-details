import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { Rule } from "antd/es/form";
import { useEffect, useState } from "react";
import { IMutation, IQuery, Skill, Tag } from "../../../../graphql";
import { CREATE_SKILL, UPDATE_SKILLS } from "../query";
import { GET_ALL_TAGS } from "../../Tag/query";

interface PropsType {
  toggleDrawerVisible: () => void;
  editData: Skill | null | undefined;
}
const rules: { [key: string]: Rule[] } = {
  name: [
    {
      max: 30,
      required: true,
      message: "Enter title",
    },
  ],
};

const { Option } = Select;

export const CreateSkill: React.FC<PropsType> = ({
  toggleDrawerVisible,
  editData,
}) => {
  const [form] = Form.useForm();
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const [createSkill, { loading }] = useMutation<IMutation>(CREATE_SKILL);
  const [updateSkill, { loading: updateLoading }] =
    useMutation<IMutation>(UPDATE_SKILLS);

  const { loading: rolesDetailLoading, data } = useQuery<IQuery>(GET_ALL_TAGS);
  const tagsInfo = data?.getAllTags;
  console.log(tagsInfo, "aasdadaassddasd");
  useEffect(() => {
    if (!editData) return;
    form.setFieldsValue({
      name: editData?.Name,
      tagIds: editData?.tags?.map((tag) => tag?.Name),
    });
  }, [form, editData]);
  const onFinish = async () => {
    setIsFormDisabled(true);
    setTimeout(() => {
      setIsFormDisabled(false);
    }, 2000);
    try {
      const values = await form.validateFields();
      const modifyCategoryDto = {
        Name: values?.name,
        tagIds: values?.tagIds.map((tag: any) => tag.value),
      };
      if (editData?.id) {
        await updateSkill({
          variables: {
            updateSkillId: editData?.id,
            updateSkill: modifyCategoryDto,
          },
        })
          .then(() => toggleDrawerVisible())
          .catch((error) => message?.error(error.message));
      } else {
        await createSkill({
          variables: {
            createskill: modifyCategoryDto,
          },
          refetchQueries: ["GetAllSkills"],
        })
          .then(() => toggleDrawerVisible())
          .catch((error) => message?.error(error.message));
      }
    } catch (error: any) {
      message.error(
        error?.["errorFields"]?.[0]?.["errors"]?.[0] ||
          error["message"] ||
          "Please enter all required field "
      );
    }
  };

  return (
    <Form layout="vertical" form={form}>
      <Row gutter={16}>
        <Col span={20}>
          <Form.Item name="name" rules={rules?.name} label="Title">
            <Input placeholder="Enter Skill Name" />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            name="tagIds"
            rules={rules?.roleId}
            wrapperCol={{ span: 23 }}
          >
            <Select
              className="w-100 input-box-bg"
              placeholder="Select Tag"
              mode="multiple"
              labelInValue={true}
              showSearch
            >
              {tagsInfo?.map((tag) => (
                <Option value={tag?.id} key={tag?.id}>
                  {tag?.Name}
                </Option>
              ))}
            </Select>
          </Form.Item>
        </Col>
      </Row>
      <div className="organization-submit-btn-section">
        <Button
          type="primary"
          className="custom-submit-btn mr-2"
          onClick={onFinish}
          loading={loading || isFormDisabled}
        >
          {editData ? "Update" : "Create"}
        </Button>
        <Button>Cancel</Button>
      </div>
    </Form>
  );
};
