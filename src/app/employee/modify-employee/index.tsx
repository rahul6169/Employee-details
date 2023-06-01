import { useMutation, useQuery } from "@apollo/client";
import { Button, Col, Form, Input, Row, Select, message } from "antd";
import { Rule } from "antd/es/form";
import { useEffect, useState } from "react";
import { Employee, IMutation, IQuery, Skill, Tag } from "../../../../graphql";
import { GET_ALL_TAGS } from "../../Tag/query";
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from "../query";

interface PropsType {
  toggleDrawerVisible: () => void;
  editData: Employee | null | undefined;
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

export const CreateEmployee: React.FC<PropsType> = ({
  toggleDrawerVisible,
  editData,
}) => {
  const [form] = Form.useForm();
  const [isFormDisabled, setIsFormDisabled] = useState<boolean>(false);

  const [createEmployee, { loading }] = useMutation<IMutation>(CREATE_EMPLOYEE);
  const [updateEmployee, { loading: updateLoading }] =
    useMutation<IMutation>(UPDATE_EMPLOYEE);

  const { loading: rolesDetailLoading, data } = useQuery<IQuery>(GET_ALL_TAGS);
  const tagsInfo = data?.getAllTags;
  console.log(tagsInfo, "aasdadaassddasd");
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
        Email: values?.email,
        Phone: values?.phone,
        tagIds: values?.tagIds?.value,
      };

      if (editData?.id) {
        await updateEmployee({
          variables: {
            updateSkillId: editData?.id,
            updateSkill: modifyCategoryDto,
          },
        })
          .then(() => toggleDrawerVisible())
          .catch((error) => message?.error(error.message));
      } else {
        await createEmployee({
          variables: {
            createskill: modifyCategoryDto,
          },
          refetchQueries: ["GetAllEmployee"],
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
            <Input placeholder="Enter Employee Name" />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="email" rules={rules?.email} label="Email">
            <Input placeholder="Enter Employee Email" />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item name="phone" rules={rules?.phone} label="Phone">
            <Input placeholder="Enter Employee Phone" />
          </Form.Item>
        </Col>
        {/* <Col span={20}>
          <Form.Item name="name" rules={rules?.name} label="Name">
            <Input placeholder="Enter Employee Name" />
          </Form.Item>
        </Col> */}
        <Col span={20}>
          <Form.Item
            name="skillsId"
            rules={rules?.roleId}
            wrapperCol={{ span: 23 }}
            label="Select Tag"
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
