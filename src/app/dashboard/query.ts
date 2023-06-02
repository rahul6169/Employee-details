import { gql } from "@apollo/client";

export const EMPLOYEE_TOTAL_COUNT = gql`
  query Query {
    getEmployeeCount
  }
`;
export const GET_TOP_SKILLS_COUNT = gql`
  query GetTopSkillsWithCount {
    getTopSkillsWithCount {
      Name
      employeeCount
      id
    }
  }
`;
export const GET_TOP_TAGS_COUNT = gql`
  query GetTopTagWithCount {
    getTopTagWithCount {
      Name
      employeeCount
      id
    }
  }
`;
