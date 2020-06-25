// CSS
import 'normalize.css';
import './styles/main.css';
// JS

import './scripts/form';

import {
  getByUsername,
  getReposByUsername,
  getLanguagesByUserAndRepo,
  getToken,
  getAllLanguagesByUser,
  getAllLanguagesSumByUser,
} from './scripts/github';

// const token = getToken();
// token.then((data) => console.log(data));

// const repos = getReposByUsername('pataruco');
// repos.then((data) => console.log({ data }));

const languages = getAllLanguagesSumByUser('pataruco');

languages.then((data) => console.log(data));
