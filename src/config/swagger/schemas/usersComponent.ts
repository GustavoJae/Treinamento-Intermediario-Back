import { OpenAPIV3 } from "openapi-types"

const usersComponent: OpenAPIV3.ComponentsObject['schemas'] = {
    User: {
        type: 'object',
        properties: {
            id: {
                type: 'string',
            },
            name: {
                type: 'string',
            },
            email: {
                type: 'string',
            },
            created_at: {
                type: 'string',
            },
            updated_at: {
                type: 'string',
            },
        },
    },
};

export default usersComponent;