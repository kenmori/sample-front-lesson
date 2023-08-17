import { createElementWithClassName } from './modules/create-element';

const selectElement = document.getElementById('js-select-category');
const newsContent = document.getElementById('js-news-body');

const url = 'https://mocki.io/v1/3da6f634-e090-4734-8c1a-ecb5c581fdca';
// const url = "https://mocki.io/v1/8cc57c74-d671-48ac-b59f-d3dfb73ec8c1"; //No data
// const url = "https://httpstat.us/503"; // 503 error
// const url = "https://mocki.io/v1/fafafafa"; // Failed to fetch

const addLoading = (target) => {
  const img = document.createElement('img');
  img.src = '/assets/img/loading-circle.gif';
  img.id = 'js-loading';
  target.appendChild(img);
};

const removeLoading = () => document.getElementById('js-loading').remove();

const displayInfo = (target, error) => {
  const p = document.createElement('p');
  p.textContent = error;
  target.appendChild(p);
};

const displayErrorStatus = (target, response) => {
  const p = document.createElement('p');
  p.textContent = `${response.status}:${response.statusText}`;
  target.appendChild(p);
};

const fetchData = async (api) => {
  addLoading(newsContent);
  try {
    const response = await fetch(api);

    if (response.ok) {
      return await response.json();
    } else {
      console.error(`${response.status}:${response.statusText}`);
      displayErrorStatus(newsContent, response);
    }
  } catch (error) {
    displayInfo(newsContent, error);
  } finally {
    removeLoading();
  }
};

const init = async () => {
  const data = await fetchData(url);

  if (!data) return;
  if (!data.length) {
    displayInfo(newsContent, 'no data');
  } else {
    renderCategories(data);
    renderArticleList(data);
    addEventForCategoryList(data);
  }
};

const createOptionElements = (data) => {
  const fragment = document.createDocumentFragment();
  data.forEach(({ category }) => {
    const optionElement = document.createElement('option');
    optionElement.value = category;
    optionElement.textContent = category;
    fragment.appendChild(optionElement);
  });
  return fragment;
};

const renderCategories = (data) =>
  selectElement.appendChild(createOptionElements(data));

const createArticleCards = (data) => {
  const fragment = document.createDocumentFragment();
  data.articles.forEach((article) => {
    const newsItem = createElementWithClassName('li', 'news__item');
    const infoArea = createElementWithClassName('div', 'news__item-info');
    const categoryLabel = createElementWithClassName(
      'p',
      'news__item-category'
    );
    const date = createElementWithClassName('p', 'news__item-date');
    const title = createElementWithClassName('h3', 'news__item-title');
    const titleLink = createElementWithClassName('a', 'news__item-link');

    categoryLabel.textContent = data.category;
    date.textContent = article.date;
    titleLink.textContent = article.title;
    titleLink.href = '#';
    titleLink.classList.add('link');

    infoArea.appendChild(categoryLabel).after(date);
    title.appendChild(titleLink);
    fragment
      .appendChild(newsItem)
      .appendChild(title)
      .after(infoArea, createThumbnail(article));
  });
  return fragment;
};

const createThumbnail = (article) => {
  const thumbnailWrapper = createElementWithClassName(
    'div',
    'news__item-thumbnail-wrap'
  );
  const thumbnail = createElementWithClassName('img', 'news__item-thumbnail');
  const noImgSrc = '/assets/img/no-img.jpg';

  thumbnail.alt = '';
  thumbnail.src = article.img || noImgSrc;

  thumbnailWrapper.appendChild(thumbnail);
  return thumbnailWrapper;
};

const renderArticleList = (data) => {
  const newsList = createElementWithClassName('ul', 'news__list');

  const fragment = document.createDocumentFragment();
  data.forEach((item) => {
    fragment.appendChild(createArticleCards(item));
  });
  newsContent.replaceChildren(newsList);
  newsList.appendChild(fragment);
};

const addEventForCategoryList = (data) => {
  selectElement.addEventListener('change', (e) => {
    const selectedCategory = e.target.value;

    if (selectedCategory === 'all') {
      renderArticleList(data);
    } else {
      const filteredData = data.filter(
        (item) => item.category === selectedCategory
      );
      renderArticleList(filteredData);
    }
  });
};

init();
