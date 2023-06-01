import { gql } from "@apollo/client";

export const CREATE_SKILL = gql`
  mutation CreateSkill($createskill: SkillDto!) {
    createSkill(createskill: $createskill) {
      Name
      tags {
        id
        Name
      }
    }
  }
`;
export const GET_SKILL = gql`
  query GetSkill($getSkillId: String!) {
    getSkill(id: $getSkillId) {
      Name
      id
    }
  }
`;
export const GET_ALL_SKILLS = gql`
  query GetAllSkills {
    getAllSkills {
      Name
      id
    }
  }
`;
export const UPDATE_SKILLS = gql`
  mutation UpdateSkill($updateSkillId: String!, $updateSkill: SkillDto!) {
    updateSkill(id: $updateSkillId, updateSkill: $updateSkill) {
      Name
    }
  }
`;
export const DELETE_SKILL = gql`
  mutation DeleteSkill($deleteSkillId: String!) {
    deleteSkill(id: $deleteSkillId) {
      Name
      id
    }
  }
`;
