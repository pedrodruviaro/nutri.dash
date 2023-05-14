import request from "graphql-request";

export async function getAllPatientsDashboard(email: string) {
    interface ResponseProps {
        patients: [];
    }

    const endpoint = process.env.CONTENT_API_KEY as string;
    const query = `
    query getAllPatientsDashboard($belongsTo: String!) {
      patients(where: { belongsTo: $belongsTo }) {
        name
        id
      }
    }
    `;

    const variables = {
        belongsTo: email,
    };

    const { patients }: ResponseProps = await request(
        endpoint,
        query,
        variables
    );

    return patients;
}

export async function getSinglePatient(id: string) {
    interface ResponseProps {
        patients: [
            {
                name: string;
                age: string;
                weight: string;
                height: string;
                belongsTo: string;
                diets: [
                    {
                        title: string;
                        description: string;
                        content: string;
                        id: string;
                    }
                ];
                notes: [
                    {
                        createdAt: string;
                        content: string;
                        id: string;
                    }
                ];
            }
        ];
    }

    const endpoint = process.env.CONTENT_API_KEY as string;

    const query = `
    query getSinglePatientInfos($ID: ID!) {
      patients(where: {id: $ID}) {
        name
        age
        weight
        height
        diets{
          title,
          description,
          content,
          id
        }
        notes {
          createdAt,
          content,
          id
        }
      }
    }
  `;

    const variables = {
        ID: id,
    };

    const response: ResponseProps = await request(endpoint, query, variables);

    return response.patients[0] || {};
}

export async function updatePatient(
    id: string,
    name: string,
    age: number,
    weight: number,
    height: number
) {
    const endpoint = process.env.CONTENT_API_KEY as string;

    const mutation = `
      mutation UpdatePatient($ID: ID!, $name: String!, $age: Int!, $height:Float!, $weight:Float!) {
      updatePatient(where:{ id: $ID}, data: {name: $name, age: $age, height: $height, weight: $weight}) {
        id
        name
        age
      weight
      height
      }
      publishPatient(where: {id: $ID}) {
      id
      }
      }
    `;

    const variables = {
        ID: id,
        name: name,
        age: age,
        weight: weight,
        height: height,
    };

    try {
        const response = await request(endpoint, mutation, variables);
        return response;
    } catch (err) {
        console.error(err);
    }
}
