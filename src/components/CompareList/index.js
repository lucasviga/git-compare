import React from 'react';
import PropTypes from 'prop-types';

import { Container, Repository } from './styles';

const CompareList = ({ repositories, removeRepository, updateRepository }) => (
  <Container>
    {repositories.map(repository => (
      <Repository key={repository.id}>
        <button type="button" onClick={() => removeRepository(repository.id)}>
          <i className="fa fa-times">Remove</i>
        </button>
        <header>
          <img src={repository.owner.avatar_url} alt={repository.owner.login} />
          <strong>{repository.name}</strong>
          <small>{repository.owner.login}</small>
        </header>

        <ul>
          <li>
            {repository.stargazers_count} <small>starts</small>
          </li>

          <li>
            {repository.forks_count} <small>forks</small>
          </li>

          <li>
            {repository.open_issues_count} <small>issues</small>
          </li>

          <li>
            {repository.lastCommit} <small>last commit</small>
          </li>

          <button type="button" onClick={() => updateRepository(repository.id)}>
            Refresh
          </button>
        </ul>
      </Repository>
    ))}
  </Container>
);

CompareList.propTypes = {
  repositories: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number,
      name: PropTypes.string,
      owner: PropTypes.shape({
        login: PropTypes.string,
        avatar_url: PropTypes.string,
      }),
      stargazers_count: PropTypes.number,
      forks_count: PropTypes.number,
      open_issues_count: PropTypes.number,
      pushed_at: PropTypes.string,
    }),
  ).isRequired,
  removeRepository: PropTypes.func.isRequired,
  updateRepository: PropTypes.func.isRequired,
};

export default CompareList;
