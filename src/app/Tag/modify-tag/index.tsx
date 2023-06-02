import { useMutation } from "@apollo/client";
import { Button, Col, Form, Input, Row, message } from "antd";
import { Rule } from "antd/es/form";
import { useEffect, useState } from "react";
import { CREATE_TAG, UPDATE_TAG } from "../query";
import { IMutation, Tag } from "../../../../graphql";

interface PropsType {
  toggleDrawerVisible: () => void;
  editData: Tag | null | undefined;
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
export const CreateTag: React.FC<PropsType> = ({
  toggleDrawerVisible,
  editData,
}) => {
  const [form] = Form.useForm();
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const [createTag, { loading }] = useMutation<IMutation>(CREATE_TAG);
  const [updateTag, { loading: updateLoading }] =
    useMutation<IMutation>(UPDATE_TAG);
  useEffect(() => {
    if (!editData) return;
    form.setFieldsValue({
      name: editData?.Name,
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
      };

      if (editData?.id) {
        await updateTag({
          variables: {
            updateTagId: editData?.id,
            updateTag: modifyCategoryDto,
          },
        })
          .then(() => toggleDrawerVisible())
          .catch((error) => message?.error(error.message));
      } else {
        await createTag({
          variables: {
            createTag: modifyCategoryDto,
          },
          refetchQueries: ["GetAllTags"],
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
          <Form.Item name="name" rules={rules?.name} label="Name">
            <Input placeholder="Enter Tag Name" />
          </Form.Item>
        </Col>
      </Row>
      <div className="organization-submit-btn-section">
        <Button
          type="primary"
          className="custom-submit-btn"
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
