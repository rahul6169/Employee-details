import { useMutation, useQuery } from "@apollo/client";
import {
  Button,
  Col,
  DatePicker,
  Form,
  Input,
  Row,
  Select,
  message,
} from "antd";
import { Rule } from "antd/es/form";
import { useEffect, useState } from "react";
import { Employee, IMutation, IQuery, Skill, Tag } from "../../../../graphql";
import { GET_ALL_TAGS } from "../../Tag/query";
import { CREATE_EMPLOYEE, UPDATE_EMPLOYEE } from "../query";
import { GET_ALL_SKILLS } from "../../skill/query";
import { DateTime } from "luxon";

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
  email: [
    {
      required: true,
      message: "Enter Email",
    },
  ],
  phone: [
    {
      max: 10,
      required: true,
      message: "Enter Phone",
    },
  ],
  dob: [
    {
      required: true,
      message: "Enter dob",
    },
  ],
  doj: [
    {
      required: true,
      message: "Enter doj",
    },
  ],
  skills: [
    {
      required: true,
      message: "Select Skills",
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

  const { loading: skillLoading, data } = useQuery<IQuery>(GET_ALL_SKILLS);
  const skillsInfo = data?.getAllSkills;
  useEffect(() => {
    if (!editData) return;
    console.log(editData?.dob);
    form.setFieldsValue({
      name: editData?.Name,
      email: editData?.Email,
      phone: editData?.Phone,
      // dob: editData?.dob
      //   ? DateTime.fromISO(editData.dob).toFormat("dd-MM-yyyy")
      //   : undefined,
      skillIds: editData?.skills,
    });
  }, [form, editData]);
  const onFinish = async () => {
    setIsFormDisabled(true);
    setTimeout(() => {
      setIsFormDisabled(false);
    }, 2000);
    try {
      const values = await form.validateFields();
      const modifyEmployeeDto = {
        Name: values?.name,
        Email: values?.email,
        Phone: values?.phone,
        dob: values?.dob,
        doj: values?.doj,
        skillsId: values?.skillsId?.map((skill: any) => skill?.value),
      };

      if (editData?.id) {
        await updateEmployee({
          variables: {
            updateEmployeeId: editData?.id,
            updateEmployee: modifyEmployeeDto,
          },
        })
          .then(() => toggleDrawerVisible())
          .catch((error) => message?.error(error.message));
      } else {
        await createEmployee({
          variables: {
            createEmployee: modifyEmployeeDto,
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
        <Col span={20}>
          <Form.Item name="dob" rules={rules?.dob} label="Date of Birth">
            <DatePicker style={{ width: 140 }} placeholder="Date of Birth" />
          </Form.Item>
        </Col>

        <Col span={20}>
          <Form.Item name="doj" rules={rules?.doj} label="Date of Joining">
            <DatePicker style={{ width: 140 }} placeholder="Date of Joining" />
          </Form.Item>
        </Col>
        <Col span={20}>
          <Form.Item
            name="skillsId"
            rules={rules?.skills}
            wrapperCol={{ span: 23 }}
            label="Select Skills"
          >
            <Select
              className="w-100 input-box-bg"
              placeholder="Select Skills"
              mode="multiple"
              labelInValue={true}
              showSearch
            >
              {skillsInfo?.map((skill) => (
                <Option value={skill?.id} key={skill?.id}>
                  {skill?.Name}
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
