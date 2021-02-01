async function fetchRepos() {
    let stocks=[];
    let countedStocks=[];
    let stonk = undefined;
    let merged = [];
    const subreddit = document.getElementById("subreddit").value;
    const response = await fetch("https://www.reddit.com/r/"+ subreddit + ".json?limit=100");
    if (response.status != 404) {
        const posts = await response.json();

        for(let i = 0; i < posts.data.children.length; i++) {
            let name = [];
            name = name.concat(posts.data.children[i].data.title.split(" "));
            merged = merged.concat(posts.data.children[i].data.selftext.split(" "));
            merged = merged.concat(name);
        }
        console.log(merged);

        for(let j=0; j<merged.length; j++) {
            if (merged[j].length === 3 && merged[j] === merged[j].toUpperCase() && isNaN(merged[j]) === true || merged[j].length>3&&merged[j].startsWith("\$") == true&&isNaN(merged[j])==true
            ) {
                stocks.push(merged[j]);
                // console.log(stocks);
                stocks.sort();
                //  console.log(stocks);
            }
        }
        console.log(stocks);

        let cnt = 1;
        for (let k = 0; k < stocks.length; k++) {
            if (stocks[k] === stocks[k+1]) {
                cnt++;

            }
            else{
                stonk = {
                    instances: cnt,
                    title: stocks[k],
                }
                countedStocks.push(stonk);
                cnt=1;
            }
        }
    }



    //console.log(countedStocks);
    countedStocks.sort((a, b) => parseFloat(b.instances) - parseFloat(a.instances));
    renderAllRepos(countedStocks);

}

function renderRepo(post) {
    const table = document.getElementById("reddit-table");
    const row = table.insertRow(-1);
    const nameCell = row.insertCell(0);
    nameCell.innerText = post.title;
    const dateCell = row.insertCell(1);
    dateCell.innerText = post.instances;
}

function renderAllRepos(repos) {
    for (let i = 0; i < repos.length; i++) {
        renderRepo(repos[i]);
    }
}





