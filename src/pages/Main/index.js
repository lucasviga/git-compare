import React, { Component } from 'react';
import moment from 'moment';
import api from '../../services/api';
import Logo from '../../assets/logo.png';
import { Container, Form } from './styles';

import CompareList from '../../components/CompareList/index';

export default class Main extends Component {
  state = {
    loading: false,
    repositoryError: false,
    repositoryInput: '',
    repositories: [],
  };

  async componentDidMount() {
    this.setState({ loading: true });
    this.setState({ loading: false, repositories: await this.getLocalRepositories() });
  }

  handleAddRepository = async (e) => {
    e.preventDefault();

    const { repositoryInput, repositories } = this.state;

    this.setState({ loading: true });

    try {
      const { data: repository } = await api.get(`/repos/${repositoryInput}`);

      repository.lastCommit = moment(repository.pushed_at).fromNow();

      this.setState({
        repositoryInput: '',
        repositories: [...repositories, repository],
        repositoryError: false,
      });

      const localRepositories = await this.getLocalRepositories();

      await localStorage.setItem('repository', JSON.stringify([...localRepositories, repository]));
    } catch (err) {
      this.setState({ repositoryError: true });
    } finally {
      this.setState({ loading: false });
    }
  };

  getLocalRepositories = async () => JSON.parse(await localStorage.getItem('repository')) || [];

  removeRepository = (id) => {
    const { repositories } = this.state;

    const updateRepositories = repositories.filter(repository => repository.id !== id);

    this.setState({ repositories: updateRepositories });

    localStorage.setItem('repository', JSON.stringify(updateRepositories));
  };

  updateRepository = async (id) => {
    const { repositories } = this.state;

    const repository = repositories.find(repo => repo.id === id);

    try {
      const { data } = await api.get(`/repos/${repository.full_name}`);

      data.lastCommit = moment(data.pushed_at).fromNow();

      this.setState({
        repositoryError: false,
        repositoryInput: '',
        repositories: repositories.map(repo => (repo.id === id ? data : repo)),
      });

      localStorage.setItem('repository', JSON.stringify(repositories));
    } catch (err) {
      this.setState({ repositoryError: true });
    }
  };

  render() {
    const {
      repositoryError, repositoryInput, loading, repositories,
    } = this.state;

    return (
      <Container>
        <img src={Logo} alt="Github Compare" />

        <Form withError={repositoryError} onSubmit={this.handleAddRepository}>
          <input
            type="text"
            placeholder="usuário/repositório"
            value={repositoryInput}
            onChange={e => this.setState({ repositoryInput: e.target.value })}
          />
          <button type="submit">{loading ? <i className="fa fa-spinner fa-pulse" /> : 'Ok'}</button>
        </Form>

        <CompareList
          repositories={repositories}
          removeRepository={this.removeRepository}
          updateRepository={this.updateRepository}
        />
      </Container>
    );
  }
}
