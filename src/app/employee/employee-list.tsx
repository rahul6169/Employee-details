import { useMutation, useQuery } from "@apollo/client";
import { Card, Table } from "antd";
import { ColumnsType } from "antd/es/table";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
import { Employee, IMutation, IQuery, Skill, Tag } from "../../../graphql";
import { DELETE_EMPLOYEE, GET_ALL_EMPLOYEE } from "./query";
import { DateTime } from "luxon";
interface PropsType {
  onClickEdit: (editData: Employee) => void;
}
export const EmployeeListInfo: React.FC<PropsType> = ({ onClickEdit }) => {
  const { data, loading } = useQuery<IQuery>(GET_ALL_EMPLOYEE, {
    fetchPolicy: "network-only",
  });

  const [deleteEmployee] = useMutation<IMutation>(DELETE_EMPLOYEE);

  const onClickDelete = async (record: any) => {
    console.log(record?.id, "adfadfadfadfasdf");

    await deleteEmployee({
      variables: {
        deleteEmployeeId: record?.id,
      },
      refetchQueries: ["GetAllEmployee"],
    });
  };
  const employeeList = data?.getAllEmployee;
  const tableColumns: ColumnsType<Employee> = [
    {
      title: "Name",
      dataIndex: "name",
      render: (_, record) => (
        <div className="d-flex antd-data-table-text-primary">
          {record?.Name as string}
        </div>
      ),
    },
    {
      title: "Phone",
      dataIndex: "phone",
      render: (_, record) => (
        <div className="d-flex antd-data-table-text-primary">
          {(record?.Phone as string) || "--"}
        </div>
      ),
    },
    {
      title: "Email",
      dataIndex: "email",
      render: (_, record) => (
        <div className="d-flex antd-data-table-text-primary">
          {(record?.Email as string) || "--"}
        </div>
      ),
    },
    {
      title: "DOB",
      dataIndex: "dob",
      render: (_, record) => (
        <div className="d-flex antd-data-table-text-primary">
          {DateTime.fromISO(record?.dob).toFormat("dd-MM-yyyy") || "--"}
        </div>
      ),
    },
    {
      title: "DOJ",
      dataIndex: "doj",
      render: (_, record) => (
        <div className="d-flex antd-data-table-text-primary">
          {DateTime.fromISO(record?.doj).toFormat("dd-MM-yyyy") || "--"}
        </div>
      ),
    },
    {
      title: "Age",
      dataIndex: "age",
      render: (_, record) => (
        <div className="d-flex antd-data-table-text-primary">
          {record?.age as number}
        </div>
      ),
    },
    {
      title: "Action",
      dataIndex: "operation",
      key: "operation",
      render: (_, record) => {
        return (
          <>
            <span
              className=""
              style={{ marginRight: "10px" }}
              onClick={() => onClickEdit(record)}
            >
              <EditOutlined />
            </span>
            <span className="" onClick={() => onClickDelete(record)}>
              <DeleteOutlined />
            </span>
          </>
        );
      },
    },
  ];

  return (
    <Card title={<b>Employee List</b>}>
      <Table
        columns={tableColumns}
        dataSource={employeeList}
        loading={loading}
        className="skill-table custom-table-header"
        rowKey="id"
      />
    </Card>
  );
};
