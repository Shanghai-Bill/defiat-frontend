const MEDIUM_URL = 'https://api.rss2json.com/v1/api.json?rss_url=https%3A%2F%2Fmedium.com%2Ffeed%2F%40defiat&api_key=ezcyzxhvdypvprmcokydvmyzfkvc70xtebllciws&count=6';

export const loadNews = async () => {
  const response = await fetch(MEDIUM_URL);
  const mediumObj = await response.json();
  console.log(mediumObj)
  return mediumObj.items;
}