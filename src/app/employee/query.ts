import { gql } from "@apollo/client";

export const CREATE_EMPLOYEE = gql`
  mutation CreateEmployee($createEmployee: EmployeeDto!) {
    createEmployee(createEmployee: $createEmployee) {
      Email
      Name
      Phone
      age
      dob
      doj
      id
      skills {
        Name
        id
      }
    }
  }
`;

export const GET_EMPLOYEE = gql`
  query GetEmployee($getEmployeeId: String!) {
    getEmployee(id: $getEmployeeId) {
      Name
      Email
      Phone
      age
      dob
      doj
      id
      skills {
        Name
        id
        employeeCount
      }
    }
  }
`;

export const GET_ALL_EMPLOYEE = gql`
  query GetAllEmployee($filter: FilterBySkill) {
    getAllEmployee(filter: $filter) {
      Email
      Phone
      Name
      age
      dob
      doj
      id
      skills {
        Name
        id
      }
    }
  }
`;

export const UPDATE_EMPLOYEE = gql`
  mutation UpdateEmployee(
    $updateEmployeeId: String!
    $updateEmployee: EmployeeDto!
  ) {
    updateEmployee(id: $updateEmployeeId, updateEmployee: $updateEmployee) {
      Name
      Email
      Phone
      age
      dob
      doj
      id
      skills {
        id
        Name
      }
    }
  }
`;

export const DELETE_EMPLOYEE = gql`
  mutation DeleteEmployee($deleteEmployeeId: String!) {
    deleteEmployee(id: $deleteEmployeeId) {
      id
    }
  }
`;
