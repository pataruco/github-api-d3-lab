// CSS
import 'normalize.css';
import './styles/index.css';
// JS

import './scripts/form';
import './scripts/d3';

import {
  getByUsername,
  getReposByUsername,
  getLanguagesByUserAndRepo,
  getToken,
  getAllLanguagesByUser,
  getAllLanguagesSumByUser,
} from './scripts/github';

// const languages = getAllLanguagesSumByUser('pataruco');

// languages.then((data) => console.log({ data }));
