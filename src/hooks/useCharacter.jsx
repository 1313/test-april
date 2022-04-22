import { gql, useQuery } from '@apollo/client';

export const useCharacter = (id) => {
  const GET_CHARACTER = gql`
    query GetCharacter($id: ID!) {
      person(id: $id) {
        id
        name
        gender
        height
        birthYear
        mass
        hairColor
        eyeColor
        starshipConnection {
          starships {
            id
            name
          }
        }
        homeworld {
          id
          name
        }
        vehicleConnection {
          vehicles {
            id
            name
          }
        }
        filmConnection {
          films {
            id
            title
          }
        }
      }
    }
  `;
  const { error, loading, data } = useQuery(GET_CHARACTER, {
    variables: {
      id,
    },
  });

  return { error, loading, data };
};
