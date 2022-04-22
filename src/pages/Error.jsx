import React from 'react';
import { Link } from 'react-router-dom';

export default function Error() {
  return (
    <div className='center'>
      <h1>Page not found</h1>
      <p>
        The force was not strong with this one. Navigate back{' '}
        <Link to='/'>home</Link>.
      </p>
    </div>
  );
}
