// Esperando ações da extensão
chrome.runtime.onMessage.addListener(options);

function options(message){
    action = message.action;
    
    switch (action) {
        case 'remove_css':
            let elements = document.head

            for (let [key, element] of Object.entries(elements.children)) {
                element.className.includes('CssEditor') ? element.remove(element.firstChild) : ''
            }
            break;
        case 'no_css_until_stop':
            try {
                localStorage.getItem('no_css_until_stop') == 'yes' ? localStorage.setItem('no_css_until_stop', 'no') : localStorage.setItem('no_css_until_stop', 'yes');
            } catch {
                localStorage.setItem('no_css_until_stop', 'yes')
            }
            break;
        case 'edit_css':
            open_css_editor()
            break;
        default:
            break;
    }
}

function open_css_editor() {
    // Edit
    let edit = document.getElementsByClassName('action-button');
    edit.length > 0 ? edit[0].click() : '';

    // open menu
    let startButton = document.querySelector("#save-dash-split-button")
    startButton.click()

    //open css
    let xPathRes = document.evaluate ('//div[1]/div/div[1]/div/div/div/div[3]/div/div/ul/li[9]/span/span', document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
    xPathRes.singleNodeValue.click();

    let close = document.getElementsByClassName('ant-modal-close');
    close[0].addEventListener("click", save_css);
}


function save_css() {
    let save = document.getElementsByClassName('superset-button');
    
    for (let element of save) {
        console.log(element.textContent == 'Save'? element.click() : '')
    }
}


// monitorar se a ação de remover css sempre foi desligado.
setInterval(awaiting_actions, 2)

function awaiting_actions () {
    // aguardando ação
    if (localStorage.getItem('no_css_until_stop') == 'yes') {
        let elements = document.head

        for (let [key, element] of Object.entries(elements.children)) {
            element.className.includes('CssEditor') ? element.remove(element.firstChild) : ''
        }
    }
}
