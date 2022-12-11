// Remover css 1x
document.getElementById("option1").addEventListener("click", () => {options('remove_css')});
// css é o caralho
document.getElementById("option2").addEventListener("click", () => {options('no_css_until_stop')});
// Me salve capivara
document.getElementById("option3").addEventListener("click", () => {options('edit_css')});


if (localStorage.getItem('option2') == 'on') {
    document.getElementById("option2").style.borderColor = 'red';
}

async function options(option) {
    // no_css_until_stop
    if (option == 'no_css_until_stop') {
        if (localStorage.getItem('option2') == null || localStorage.getItem('option2') == 'off') {
            document.getElementById("option2").style.borderColor = 'red';
            localStorage.setItem('option2', 'on');
        } else if (localStorage.getItem('option2') == 'on') {
            document.getElementById("option2").style.borderColor = '#85FAF4';
            localStorage.setItem('option2', 'off');
        }
    }
    console.log(option)
    let [tab, error] = await chrome.tabs.query({active: true, currentWindow: true})
    error ? alert('error tab: ', error) : chrome.tabs.sendMessage(tab.id, { action: option });
}

// change languages
document.getElementById("pt-BR").addEventListener("click", () => {change_language('pt-BR')});
document.getElementById("en").addEventListener("click", () => {change_language('en')});

if (localStorage.getItem('langSelector')) {
    change_language(localStorage.getItem('langSelector'));
}

function change_language(language) {

    let languages = {
        "pt-BR": {"option1": "Limpar CSS 1x", "option2": "CSS é o caralho!!!", "option3": "Me salva capivara!"},
        "en": {"option1": "Clean CSS 1x", "option2": "CSS is the shit!!!", "option3": "Save me capybara!"}
    }

    document.getElementById("option1").innerText = languages[language].option1;
    document.getElementById("option2").innerText = languages[language].option2;
    document.getElementById("option3").innerText = languages[language].option3;
    localStorage.setItem('langSelector', language);
}