const link = 'https://rss.nytimes.com/services/xml/rss/nyt/Technology.xml'
let inf = ''
let ref = document.getElementById("newsrow")

fetch(link)
  .then(response => response.text())
  .then(str => new window.DOMParser().parseFromString(str, "text/xml"))
  .then(data => {
    let html = ``;
    console.log(Array.from(data.querySelectorAll("item")));
    const items = Array.from(data.querySelectorAll("item")).slice(0,5);
    /*
    items.forEach(el => {
        html += `
        <div class="col">
            <h1>${el.querySelector("Title")}</h1>
        </div>
        `
        console.log(el.querySelector("Title").textContent)
    })*/
    items.forEach(el => {
        let author = el.querySelector("creator").innerHTML;
        
        if (author.length > 37){
            author = author.slice(0,37) + '...'
            console.log(author.length)
        }
        /* let url = .el.querySelector("media\\:content")getAttribute("url");
        <img src="${url} alt="Article cover"> */
        html += `
          <div class="col news-article">
            <h6>
              <a href="${el.querySelector("link").innerHTML}" target="_blank" rel="noopener">
                ${el.querySelector("title").innerHTML}
              </a>
            </h6>
            
            <div class="newsxtra">
                <h7>Written by: ${author}</h7>
                <p>${el.querySelector("pubDate").innerHTML.slice(0,-14)}</p>
            </div>
          </div>
        `;
      });
      ref.innerHTML += html
  })