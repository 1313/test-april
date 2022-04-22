import { gql, useQuery } from '@apollo/client';

export const useCharacters = () => {
  const GET_CHARACTERS = gql`
    {
      allPeople {
        people {
          id
          name
        }
      }
    }
  `;
  const { error, loading, data } = useQuery(GET_CHARACTERS);

  return { error, loading, data };
};
