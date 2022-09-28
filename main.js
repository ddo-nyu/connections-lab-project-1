import { Application } from '@splinetool/runtime';

const botui = new BotUI('my-botui-app');

const canvas = document.getElementById('canvas3d');
const app = new Application(canvas);

const SCENES = {
    BASE: 'https://prod.spline.design/WntXgIyUEdn49DFP/scene.splinecode',
    HI: 'https://prod.spline.design/tm-q8M4UBVnlzfXs/scene.splinecode',
    HAPPY: 'https://prod.spline.design/ipTf4XEj4hAhzts8/scene.splinecode',
};
const PET_TYPES = [
    {
        text: 'Dogs',
        value: 'dogs'
    },
    {
        text: 'Cats',
        value: 'cats'
    },
    {
        text: 'Both',
        value: ''
    },
];

window.onload = () => {
    updateScene(SCENES.HI);
    initChatBot();
}

function updateScene(scene) {
    app.load(scene);
}

async function initChatBot() {
    await sendBotMessage('Hey! I heard you’re looking for a new friend! What’s your name?');
    const nameResponse = await sendUserTextAction('Enter your name');

    await sendBotMessage(`Nice to meet you ${nameResponse.value}! Could you tell me where you live?`);
    const addressResponse = await sendUserTextAction('Enter your city');
    // const shelterIds = await searchShelters(addressResponse.value);
    // console.log(shelterIds);
    updateScene(SCENES.HAPPY);

    await sendBotMessage('What kind of friend are you looking for?');
    const petTypeRes = sendUserButtonAction(PET_TYPES);

    await sendBotMessage(`So you're looking for ${petTypeRes.value.toLowerCase()}! We have plenty of friends like that.`);
}

async function sendBotMessage(message) {
    await botui.message.bot({
        content: message,
        delay: 3000,
        loading: true,
    });
    // scroll to bottom
}

async function sendUserTextAction(placeholder) {
    const response = await botui.action.text({
        action: {
            placeholder: placeholder
        },
        delay: 1000,
        loading: true,
    });
    return response;
}

async function sendUserButtonAction(buttons) {
    await botui.action.button({
        action: buttons
    });
}

async function searchShelters(queryString) {
    const raw = "";

    const requestOptions = {
        method: 'GET',
        redirect: 'follow'
    };

    const response = await fetch(`https://api.adoptapet.me/ac?q=${queryString}`, requestOptions)
    const responseText = await response.text();
    const responseObj = JSON.parse(responseText);
    const shelterIds = responseObj?.page.map(shelter => shelter.api_id);
    return shelterIds;
}
