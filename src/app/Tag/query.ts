import { gql } from "@apollo/client";

export const CREATE_TAG = gql`
  mutation CreateTag($createTag: TagDto!) {
    createTag(createTag: $createTag) {
      Name
      id
    }
  }
`;

export const GET_TAG = gql`
  query GetTag($getTagId: String!) {
    getTag(id: $getTagId) {
      Name
      id
    }
  }
`;
export const GET_ALL_TAGS = gql`
  query GetAllTags {
    getAllTags {
      Name
      id
    }
  }
`;
export const UPDATE_TAG = gql`
  mutation UpdateTag($updateTagId: String!, $updateTag: TagDto!) {
    updateTag(id: $updateTagId, updateTag: $updateTag) {
      Name
      id
    }
  }
`;
export const DELETE_TAG = gql`
  mutation DeleteTag($deleteTagId: String!) {
    deleteTag(id: $deleteTagId) {
      id
    }
  }
`;
