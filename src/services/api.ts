import request from "graphql-request";

export async function getAllPatientsDashboard() {
    interface ResponseProps {
        patients: [];
    }

    const endpoint = process.env.CONTENT_API_KEY as string;
    const query = `
    query getAllPatientsDashboard {
        patients {
          name
          id
        }
      }
    `;

    const { patients }: ResponseProps = await request(endpoint, query);

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
            }
        ];
    }

    const endpoint = process.env.CONTENT_API_KEY as string;

    const query = `
  query getSinglePatient($id: ID!) {
    patients(where: {id: $id}) {
      name
      age
      weight
      height
    }
  }
  `;

    const variables = {
        id: id,
    };

    const response: ResponseProps = await request(endpoint, query, variables);

    return response.patients[0] || {};
}
