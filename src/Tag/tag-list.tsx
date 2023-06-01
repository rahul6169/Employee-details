import { useMutation, useQuery } from "@apollo/client";
import { Card, Table } from "antd";
import { DELETE_TAG, GET_ALL_TAGS } from "./query";
import { ColumnsType } from "antd/es/table";
import { IMutation, IQuery, Tag } from "../../graphql";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";
interface PropsType {
  onClickEdit: (editData: Tag) => void;
}
export const TagListInfo: React.FC<PropsType> = ({ onClickEdit }) => {
  const { data, loading } = useQuery<IQuery>(GET_ALL_TAGS, {
    fetchPolicy: "network-only",
  });

  const [deleteTag] = useMutation<IMutation>(DELETE_TAG);

  const onClickDelete = async (record: any) => {
    console.log(record?.id, "adfadfadfadfasdf");

    await deleteTag({
      variables: {
        deleteTagId: record?.id,
      },
      refetchQueries: ["GetAllTags"],
    });
  };
  const tagList = data?.getAllTags;
  const tableColumns: ColumnsType<Tag> = [
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
    <Card title={<b>Tag List</b>}>
      <Table
        columns={tableColumns}
        dataSource={tagList}
        loading={loading}
        className="skill-table custom-table-header"
        rowKey="id"
      />
    </Card>
  );
};
