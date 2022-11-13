import { OpenAPIV3 } from "openapi-types";
import usersComponent from "../schemas/usersComponent";

export const sessionsPaths: OpenAPIV3.PathsObject = {
  "/sessions": {
    post: {
      summary: "Fazer Login",
      description: "Documentação de como fazer login na plataforma",
      tags: ["Sessions"],
      requestBody: {
        content: {
          "application/json": {
            schema: {
              properties: {
                email: {
                  type: "string",
                },
                password: {
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
            'aplication/json': {
              schema: {
                properties: {
                  user: {
                    ...usersComponent?.User,
                  },
                  token: {
                    type: "string",
                  },
                },
              },
            },
          },
        },
      },
    },
  },
};

export default sessionsPaths;
