const container=document.querySelector('.container');
const search=document.getElementById('search');
const submit=document.getElementById('submit');
const baseUrl='https://api.github.com/users/';
const pic=document.getElementById('pic');
const nome=document.getElementById('name');
const bio=document.getElementById('bio');
const followers=document.getElementsByClassName('numbers')[0];
const following
=document.getElementsByClassName('numbers')[1];
const repos=document.getElementsByClassName('numbers')[2];
const reposi=document.getElementById('reposito');
const repositu=document.getElementsByClassName('repo')
const colors=['#040161','#4C47E6','#0A02E0','#201E61','#0701AD','#431A61','#BC83E6','#9C3DE0','#503761','#782FAD']

function getUSER(){
    fetch(baseUrl+search.value).then(response=>response.json()).then(json=>{
            if (json.message=='Not Found') {
                container.style.height='150px';
            }
            else{
                container.style.height='auto';
                pic.setAttribute('src',json.avatar_url);
                nome.innerHTML=json.name;
                bio.innerHTML=json.bio;
                followers.innerHTML=json.followers + ' followers';
                following.innerHTML=json.following + ' following';
                repos.innerHTML=json.public_repos + ' repos';
            }

        })
}

async function getRepositories(){
    const resp=await fetch(baseUrl+search.value+'/repos');
    const respData=await resp.json();
    console.log(respData);
    reposi.innerHTML = "";
    respData.sort((a,b)=>b.size-a.size).slice(0,10).forEach(element => {
        const randomColor=colors[Math.floor(Math.random()*colors.length)];
        let repo=document.createElement('a');
        repo.setAttribute('class', 'repo')
        repo.innerHTML=element.name;
        repo.setAttribute('target', '_blank')
        repo.setAttribute('href',element.html_url);
        repo.style.backgroundColor=randomColor
        reposi.appendChild(repo);
    
});  
    
}

submit.addEventListener('click',()=>{
        getUSER();
        getRepositories();


})
search.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        getUSER();
        getRepositories();
    }
});
