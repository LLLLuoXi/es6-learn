function getUserInfo(req, res) {
    return axios.get('./json/userinfo.json', {
        timeout: 1000,
    })
}
async function test() {
    const InfoData = await getUserInfo()
    console.log('InfoData', InfoData)
    const ul = document.querySelector('.list');
    const { data: { data: result } } = InfoData
    console.log('result', result)
    const li = result.map((d) => `<li>${d.username}</li>`).join(',')
    console.log('li', li)
    ul.innerHTML = li
}

test()