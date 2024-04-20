const { gql } = require('apollo-server-express');

const typeDefs = gql`
  type Teacher {
    id: ID!
    first_name: String
    last_name: String
    cedula: String
    age: Int
  }

  type Course {
    id: ID!
    name: String
    credits: Int
    teacher: Teacher
  }

  type Query {
    teachers: [Teacher]
    teacherById(id: ID!): Teacher
    courses: [Course]
    courseById(id: ID!): Course
  }
`;

module.exports = typeDefs;
