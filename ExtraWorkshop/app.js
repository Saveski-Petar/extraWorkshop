console.log("Country");

const countryApp = {
  init: () => {
    const search = document.getElementById("search");
    const btn = document.getElementById("search-Btn");
    const loaderEl = document.querySelector(".center-body");
    search.addEventListener("keypress", (e) => {
      if (e.key === "Enter") {
        loaderEl.classList.add("active");
        countryApp.fetchCountryData(search);
        search.value = "";
      }
    });
    btn.addEventListener("click", () => {
      loaderEl.classList.add("active");
      countryApp.fetchCountryData(search);
      search.value = "";
    });
  },
  fetchCountryData: async () => {
    const API = `https://restcountries.com/v3.1/name/${search.value}`;
    const loaderEl = document.querySelector(".center-body");

    try {
      const res = await fetch(API);
      const countryData = await res.json();
      console.log(countryData);
      countryApp.renderCountryData(countryData);
      //   loaderEl.classList.remove("active");
      setTimeout(() => {
        loaderEl.classList.remove("active");
      }, 600);
    } catch (error) {
      loaderEl.classList.remove("active");
      countryApp.displayError();
      console.log(error);
    }
  },
  renderCountryData: (data) => {
    const dataContainer = document.querySelector(".container");
    dataContainer.innerHTML = "";
    data.forEach((element) => {
      dataContainer.innerHTML += `
        <div class="card">
        <img src="${element.flags.svg}" alt="image of the country flag">
        <h1>${element.name.official}</h1>
        <p>Population: ${element.population}</p>
        <p>Capital: ${element.capital}</p>
        <p>Area: ${element.area}</p>
        <div class="footer">
        <p>${element.currencies}</p>
        <p>${element.languages}</p>
        </div>
        </div>
        `;
    });
  },
  descendingOrder: () => {},
  displayError: () => {
    const dataContainer = document.querySelector(".container");
    dataContainer.innerHTML = "";
    dataContainer.innerHTML += `
    <h1>Country Not Found</h1>
    `;
  },
};
countryApp.init();
