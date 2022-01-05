/*
 * @Author: luoxi
 * @LastEditTime: 2022-01-05 23:51:37
 * @LastEditors: your name
 * @Description: 
 */
function getUserInfo(req, res) {
    return axios.get('./json/userinfo.json', {
        timeout: 1000,
    })
}
async function test() {
    const InfoData = await getUserInfo()
    const ul = document.querySelector('.list');
    const { data: { data: result } } = InfoData
    const li = result.map((d) => `<li>${d.username}</li>`).join(',')
    console.log('li', li)
    ul.innerHTML = li
}

test()