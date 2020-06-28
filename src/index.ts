// CSS
import 'normalize.css';
import './styles/index.css';
// JS
import './scripts/d3';
import { getByUsername, getAllLanguagesSumByUser } from './scripts/github';
import renderLanguagesGraph from './scripts/d3';

// Elements
const form = document.querySelector('form');

// Execution

const getInfo = async (username: string) => {
  try {
    const ghUser = await getByUsername(username);
    console.log({ ghUser });
    // TODO: renderUserInfo(ghUser);
    const allLanguages = await getAllLanguagesSumByUser(username);
    renderLanguagesGraph(allLanguages);
  } catch (error) {
    console.error(error);
    throw error;
  }
};

const getUsernameFromfrom = async (event: Event) => {
  event.preventDefault();
  const username = (form?.querySelector(
    'input[type="text"]',
  ) as HTMLInputElement)?.value
    .toLocaleLowerCase()
    .trim();

  getInfo(username);
};

// Events
form?.addEventListener('submit', getUsernameFromfrom);
