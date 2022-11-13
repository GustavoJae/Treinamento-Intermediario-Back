import { OpenAPIV3 } from "openapi-types";
import usersComponent from "../schemas/usersComponent";

export const usersPaths: OpenAPIV3.PathsObject = {
  "/users": {
    post: {
      summary: "Criar usuário",
      description: "Documentação de como criar um novo usuário",
      tags: ["Users"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                name: {
                  type: "string",
                },
                email: {
                  type: "string",
                },
                password: {
                  type: "string",
                },
                birthDate: {
                  type: "string",
                },
                cpf: {
                  type: "string",
                },
                telephone: {
                  type: "string",
                },
              },
            },
          },
        },
      },
      responses: {
        401: {
          description: "Erro 401",
        },
        400: {
          description: "Erro 400",
        },
        200: {
          description: "OK",
          content: {
            "application/json": {
              schema: {
                ...usersComponent?.User,
              },
            },
          },
        },
      },
    },
  },
};

export default usersPaths;
