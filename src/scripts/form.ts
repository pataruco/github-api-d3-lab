// Elements
const form = document.querySelector('form');

// Execution

const getUsername = (event: Event) => {
  event.preventDefault();
  const value = (form?.querySelector('input[type="text"]') as HTMLInputElement)
    ?.value;
  console.log({ value });
};

// Events
form?.addEventListener('submit', getUsername);
