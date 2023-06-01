
/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */

export class CustomerProfile {
    age?: Nullable<number>;
    contactEmail?: Nullable<string>;
    contactName?: Nullable<string>;
    contactPhoneNumber?: Nullable<string>;
    email?: Nullable<string>;
    number?: Nullable<string>;
    userName?: Nullable<string>;
}

export class EmployeeDto {
    Email?: Nullable<string>;
    Name?: Nullable<string>;
    Phone?: Nullable<string>;
    dob?: Nullable<DateTime>;
    doj?: Nullable<DateTime>;
    skillsId?: Nullable<string[]>;
}

export class FilterBySkill {
    skillId?: Nullable<string>;
}

export class SkillDto {
    Name?: Nullable<string>;
    tagIds?: Nullable<string[]>;
}

export class TagDto {
    Name?: Nullable<string>;
}

export class Customer {
    contactEmail?: Nullable<string>;
    contactName?: Nullable<string>;
    contactPhoneNumber?: Nullable<string>;
    createdAt?: Nullable<DateTime>;
    email?: Nullable<string>;
    id?: Nullable<string>;
    number?: Nullable<string>;
    updatedAt?: Nullable<DateTime>;
    userName?: Nullable<string>;
}

export class Employee {
    Email?: Nullable<string>;
    Name?: Nullable<string>;
    Phone?: Nullable<string>;
    age?: Nullable<number>;
    dob?: Nullable<DateTime>;
    doj?: Nullable<DateTime>;
    id?: Nullable<string>;
    skills?: Nullable<Skill[]>;
}

export abstract class IMutation {
    createCustomer?: Customer;
    createEmployee?: Employee;
    createSkill?: Skill;
    createTag?: Tag;
    deleteCustomer?: Customer;
    deleteEmployee?: Employee;
    deleteSkill?: Skill;
    deleteTag?: Tag;
    stringReturnType?: string;
    updateEmployee?: Employee[];
    updateSkill?: Skill[];
    updateTag?: Tag;
}

export abstract class IQuery {
    getAllCustomer: Customer[];
    getAllEmployee?: Employee[];
    getAllSkills: Skill[];
    getAllTags: Tag[];
    getCustomer?: Customer;
    getEmployee?: Employee;
    getEmployeeCount: number;
    getSkill?: Skill;
    getTag?: Tag;
    getTopSkillsWithCount: Skill[];
    getTopTagWithCount: Tag[];
}

export class Skill {
    Name?: Nullable<string>;
    employeeCount?: Nullable<number>;
    id?: Nullable<string>;
    tags?: Nullable<Tag[]>;
}

export class Tag {
    Name?: Nullable<string>;
    employeeCount?: Nullable<number>;
    id: string;
}

export type DateTime = any;
type Nullable<T> = T | null;
