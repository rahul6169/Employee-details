import { Card, Descriptions } from "antd";
import {
  EMPLOYEE_TOTAL_COUNT,
  GET_TOP_SKILLS_COUNT,
  GET_TOP_TAGS_COUNT,
} from "./query";
import { IQuery } from "../../../graphql";
import { useQuery } from "@apollo/client";

export const Dashboard = () => {
  const { loading, data } = useQuery<IQuery>(EMPLOYEE_TOTAL_COUNT, {
    fetchPolicy: "network-only",
  });

  const { data: topSkillsWithCount } = useQuery<IQuery>(GET_TOP_SKILLS_COUNT, {
    fetchPolicy: "network-only",
  });

  const { data: topTagsWithCount } = useQuery<IQuery>(GET_TOP_TAGS_COUNT, {
    fetchPolicy: "network-only",
  });

  const employeeCount = data?.getEmployeeCount;
  const topSkillsWithCounts = topSkillsWithCount?.getTopSkillsWithCount;
  const topTagsWithCounts = topTagsWithCount?.getTopTagWithCount;

  return (
    <>
      <Card title="Dashboard" style={{ marginBottom: "10px" }}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Employee Count">
            {employeeCount}
          </Descriptions.Item>
        </Descriptions>
      </Card>
      <Card title="Top Skills With Employee Count">
        <Descriptions bordered column={1}>
          {topSkillsWithCounts?.map((skill) => (
            <>
              <Descriptions.Item label={skill?.Name}>
                {skill?.employeeCount || "--"}
              </Descriptions.Item>
            </>
          ))}
        </Descriptions>
      </Card>

      <Card title="Top Tags With Employee Count">
        <Descriptions bordered column={1}>
          {topTagsWithCounts?.map((tag) => (
            <>
              <Descriptions.Item label={tag?.Name}>
                {tag?.employeeCount || "--"}
              </Descriptions.Item>
            </>
          ))}
        </Descriptions>
      </Card>
    </>
  );
};
