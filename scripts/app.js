'use strict';

/* page */

const page = {
  header: {
    logoText: document.querySelector('.logo span'),
    nav: document.querySelector('.nav__list'),
  },
  main: {
    pageTitle: document.querySelector('main h1'),
    cardsContainer: document.querySelector('.cards'),
  },
};

async function getData() {
  const res = await fetch('./data/demo.json', {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  const data = await res.json();
  return data;
}

async function renderLogo() {
  const data = await getData();
  const logoConfig = data.filter((el) => {
    return el.sitename;
  });
  const [firstPage] = logoConfig;
  page.header.logoText.innerText = firstPage.sitename;
}

async function renderNav() {
  const data = await getData();
  const navConfig = data.filter((el) => el.links);
  const [firstPage] = navConfig;
  page.header.nav.innerHTML = firstPage.links
    .map(({ name, url }) => {
      return `<a href=${url}>${name}</a>`;
    })
    .join('');
}

async function renderEmp() {
  const data = await getData();
  const empConfig = data.filter((el) => el.employees);
  const [secondPage] = empConfig;
  page.main.pageTitle.innerText = secondPage.pageTitle;
  page.main.cardsContainer.innerHTML = secondPage.employees
    .map((el) => {
      return `<div class="card">
            <img class="card__photo" src="./images/${el.photo}" alt="${el.name}" />
            <div class="card__title">
              <span class="card__name">${el.name}</span>
              <span class="card__age">${el.age}</span>
            </div>
          </div>`;
    })
    .join('');
}

const renderFunctions = [renderLogo, renderNav, renderEmp];

function render() {
  renderFunctions.forEach((fn) => fn());
}

render();
