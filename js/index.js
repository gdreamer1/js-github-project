function nameSearch (event){
    event.preventDefault()
    const query = event.target[0].value
    const url = `https://api.github.com/search/users?q=${query}`
    return fetch(url)
    .then(users => users.json())
    .then(users => renderUsers(users.items))
    .catch(error => renderUsers(['no users found']))
}

function renderUsers(users){
    console.log('Value in name search function: ', users)  

    const usersList = document.getElementById('user-list')
    users.forEach(user => {
        const li = document.createElement('li')
        const img = document.createElement('img')
        img.src = user.avatar_url
        img.style.height = '30px'
        img.style.width = '30px'
        img.style.marginRight = '1rem'
        li.appendChild(img)
        const button = document.createElement('button')
        button.id = user.login
        button.onclick= repoSearch
        button.style.marginBottom = '1rem'
        button.innerHTML = user.login
        li.appendChild(button)
        usersList.appendChild(li)
    })
}

function repoSearch(event){
    event.preventDefault()
    const username = event.target.innerHTML;
    console.log(username)
    const url = `https://api.github.com/users/${username}/repos`
    return fetch(url)
    .then(repos => repos.json())
    .then(repos => renderRepos(repos))
    .catch(error => renderRepos(['no repos found for selected user']))
}

function renderRepos(repos) {
    console.log('Repos: ', repos)  

    const reposList = document.getElementById('repos-list')
    while (reposList.firstChild) {
        reposList.removeChild(reposList.firstChild);
    }

    repos.forEach(repo => {
        const li = document.createElement('li')
        li.innerHTML = repo.full_name
        reposList.appendChild(li)
    }) 
}

const form = document.getElementById('github-form')
console.log('Value: ', form)  
form.addEventListener('submit', nameSearch);
