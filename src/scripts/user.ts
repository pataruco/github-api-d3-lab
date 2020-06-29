import { User } from './github';

const template: HTMLTemplateElement | null = document.querySelector('template');

const result = document.querySelector('.result');

const renderUserInfo = (data: User) => {
  const { avatar_url, name, bio: bioData, created_at } = data;

  const clone = template?.content.cloneNode(true);

  const img = (<Element>clone)?.querySelector('img');
  img?.setAttribute('src', avatar_url);
  img?.setAttribute('alt', name);

  const h2 = (<Element>clone)?.querySelector('h2');

  if (h2) {
    h2.innerText = name.toString();
  }

  const bio: HTMLParagraphElement | null = (<Element>clone)?.querySelector(
    'p.bio',
  );
  if (bio) {
    bio.innerText = bioData;
  }

  const join: HTMLTimeElement | null = (<Element>clone)?.querySelector(
    'p.join time',
  );

  const LocaleDateString = new Date(created_at).toLocaleDateString();
  if (join) {
    join.innerText = LocaleDateString;
    join.setAttribute('datetime', LocaleDateString);
  }

  if (clone) {
    result?.prepend(clone);
  }
};

export default renderUserInfo;
