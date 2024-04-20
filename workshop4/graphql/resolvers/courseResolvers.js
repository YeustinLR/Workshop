const axios = require('axios');

const getHeaders = (token) => ({
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

const courseResolvers = {
  Query: {
    courses: async (_, __, { authToken }) => {
      try {
        const response = await axios.get('http://localhost:3001/api/courses', getHeaders(authToken));
        const courses = response.data;
        if (!Array.isArray(courses) || courses.some(course => !course._id)) {
          throw new Error('Error al obtener los cursos: los IDs son inválidos');
        }

        return courses.map(course => ({
          id: course._id, // Mapear el campo _id al campo id esperado por el esquema GraphQL
          name: course.name,
          credits: course.credits,
          teacher: {
            id: course.teacher._id, // Mapear el campo _id al campo id esperado por el esquema GraphQL
            first_name: course.teacher.first_name,
            last_name: course.teacher.last_name,
            cedula: course.teacher.cedula,
            age: course.teacher.age,
          },
        }));
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener los cursos');
      }
    },
    courseById: async (_, { id }, { authToken }) => {
      try {
        const response = await axios.get(`http://localhost:3001/api/courses?id=${id}`, getHeaders(authToken));
        const course = response.data;

        if (!course || !course._id) {
          throw new Error('No se encontró ningún curso con el ID proporcionado');
        }

        return {
          id: course._id, // Mapear el campo _id al campo id esperado por el esquema GraphQL
          name: course.name,
          credits: course.credits,
          teacher: {
            id: course.teacher._id, // Mapear el campo _id al campo id esperado por el esquema GraphQL
            first_name: course.teacher.first_name,
            last_name: course.teacher.last_name,
            cedula: course.teacher.cedula,
            age: course.teacher.age,
          },
        };
      } catch (error) {
        console.error(error);
        throw new Error('Error al obtener el curso por ID');
      }
    },
  },
};

module.exports = courseResolvers;
