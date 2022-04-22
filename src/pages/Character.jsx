import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useCharacter } from '../hooks/useCharacter';
import BackButtonBar from '../components/BackButtonBar';
import Loading from '../components/Loading';
import CharacterPresentation from '../components/CharacterPresentation';
import { useNavigate } from 'react-router-dom';

export default function Character(props) {
  const { id } = useParams();
  const { error, loading, data } = useCharacter(id);
  const navigate = useNavigate();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;
  if (error) return <>Error</>;

  return (
    <>
      <BackButtonBar
        onClick={() => {
          navigate(-1);
        }}
      >
        Back to characters
      </BackButtonBar>

      <CharacterPresentation data={data?.person} />
    </>
  );
}
