const axios = require('axios');

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const teacherResolvers = {
  Query: {
    teachers: async (_, __, { authToken }) => {
      try {
        const response = await axios.get('http://localhost:3001/api/teachers', getHeaders(authToken));
        const teachers = response.data;
        if (!Array.isArray(teachers) || teachers.some(teacher => !teacher._id)) {
          throw new Error('Error al obtener los profesores: los IDs son inválidos');
        }

        return teachers.map(teacher => ({
          id: teacher._id, // Mapear el campo _id al campo id esperado por el esquema GraphQL
          first_name: teacher.first_name,
          last_name: teacher.last_name,
          cedula: teacher.cedula,
          age: teacher.age,
        }));
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los profesores');
      }
    },
    teacherById: async (_, { id }, { authToken }) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/teachers?id=${id}`, getHeaders(authToken));
        const teacher = response.data;

        if (!teacher || !teacher._id) {
          throw new Error('No se encontró ningún profesor con el ID proporcionado');
        }

        return {
          id: teacher._id, // Mapear el campo _id al campo id esperado por el esquema GraphQL
          first_name: teacher.first_name,
          last_name: teacher.last_name,
          cedula: teacher.cedula,
          age: teacher.age,
        };
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el profesor por ID');
      }
    },
  },
};

module.exports = teacherResolvers;
