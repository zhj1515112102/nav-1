const $siteList = $('.siteList');
const $lastLi = $siteList.find('li.last');
const x = localStorage.getItem('x');
const xObject = JSON.parse(x);
const hashMap = xObject || [
    {
        logo: 'M',
        url: "https://developer.mozilla.org/zh-CN/"
    },
    {
        logo: 'B',
        url: 'https://www.bootcdn.cn/'
    },
    {
        logo: 'I',
        url: 'https://www.iconfont.cn/'
    }, 
];
const simplifyUrl = (url)=>{
    return url.replace('https://', '').replace('http://', '').replace('www.', '').replace(/\/.*/, '');
};
const render = ()=>{
    $siteList.find('li:not(.last)').remove();
    hashMap.forEach((node, index)=>{
        const $li = $(`\n    <li>\n        <div class="site">\n          <div class="logo">${node.logo[0]}</div>\n          <div class="link">${simplifyUrl(node.url)}</div>\n          <div class="close">\n            <svg class="icon" aria-hidden="true">\n              <use xlink:href="#icon-close"></use>\n            </svg>\n          </div>\n        </div>\n    </li>`).insertBefore($lastLi);
        $li.on('click', ()=>{
            window.open(node.url);
        });
        $li.on('click', '.close', (e)=>{
            e.stopPropagation() //阻止冒泡
            ;
            // console.log(hashMap)
            hashMap.splice(index, 1);
            render();
        });
    });
};
render();
$('.addButton').on('click', ()=>{
    let url = window.prompt('输入你要添加的网址：');
    if (url.indexOf('http') !== 0) url = 'https://' + url;
    console.log(url);
    console.log($siteList);
    hashMap.push({
        logo: simplifyUrl(url)[0].toUpperCase(),
        url: url
    });
    render();
});
window.onbeforeunload = ()=>{
    const string = JSON.stringify(hashMap);
    localStorage.setItem('x', string);
};
$(document).on('keypress', (e)=>{
    const key = e.key///={key} = e
    ;
    console.log(key);
    for(let i = 0; i < hashMap.length; i++)if (hashMap[i].logo.toLowerCase() === key) window.open(hashMap[i].url);
});

//# sourceMappingURL=index.9ce82391.js.map
