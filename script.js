const header = document.querySelector("header");
const footer = document.querySelector(".footer-section");
const loadElement = (element, fileName) => {
  fetch(`/placeholder/common_layout/${fileName}.html`)
    .then(res => {
      return res.text();
    })
    .then(html => {
      element.innerHTML = html;
    })
};
loadElement(header, 'header');
loadElement(footer, 'footer');


const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
      if (entry.isIntersecting)
      {
          entry.target.classList.add('show');
      }
      else 
      {
          entry.target.classList.remove('show');
      }
  });
}/*, {
  rootMargin: "-55px",
}*/);

const hiddenElements = (elements) => {
  elements.forEach((el) => observer.observe(el));
}
hiddenElements(document.querySelectorAll('.hidden-left'));
hiddenElements(document.querySelectorAll('.hidden-right'));
hiddenElements(document.querySelectorAll('.hidden-popup'));
hiddenElements(document.querySelectorAll('.hidden-popdown'));
// const hiddenElementsLeft = document.querySelectorAll('.hidden-left');
// const hiddenElementsRight = document.querySelectorAll('.hidden-right');
// const hiddenElementsPopup = document.querySelectorAll('.hidden-popup');
// hiddenElementsLeft.forEach((el) => observer.observe(el)), hiddenElementsRight.forEach((el) => observer.observe(el));
// hiddenElementsPopup.forEach((el) => observer.observe(el));



function activeLink (location)
{
  switch(location)
  {
    case "Form":
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSchFxqZAkcTmViyRaQyjdHztcAAeQj3RTU6qOOspBVS-yFOFQ/viewform?usp=sf_link");
      window.location.href = "about.html";
      break;
    case "Contact":
      window.location.href = "contacts.html";
      break;
    case "Shop":
      window.open("");
      break;
    
  }
}
/*
function changeBackgroundImage (competition)
{
  let image;
  switch (competition)
  {
    case "FTC":
      image = "url('https://searx.be/image_proxy?url=https%3A%2F%2Fi.pinimg.com%2F236x%2F65%2F6c%2F26%2F656c26e4d7b4083e0e8f87801dac98d2.jpg&h=126a0d4ae5954aa7e1553eac6a77c39c489c403d0ce3f2e5bfa491bd6fd10fdf')";
      break;
    case "SeaGlide":
      image = "url('https://searx.be/image_proxy?url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcSYyEUBoLLB6uABtNa7tYnzHTKbQYnoF6xGe1SpUxJgK3a2EW0%26s&h=a4a8959ddd54243f82cf2e8a4e5dd331759e50d0e278fed5f10b59c1898960b4')";
      break;
    case "SeaPerch":
      image = "url('https://searx.be/image_proxy?url=https%3A%2F%2Fencrypted-tbn0.gstatic.com%2Fimages%3Fq%3Dtbn%3AANd9GcRSXRE-UNYtitmlMLONgtglaMqTVci-eZsbxlhny87id_nBHUk%26s&h=6d5e0ea028c32bf4efcb6fadbb87f6beb4e02a64f0a3e18761b26e969373c651')";
      break;
    default:
      image = "none";
      break;
  }
  //document.getElementById('background-competition').classList.add("placeholder");
  document.getElementById('background-competition').style.backgroundImage = image;
}*/