import { Application } from '@splinetool/runtime';

let currentScene = 'HI';

const SCENES = {
    BASE: 'https://prod.spline.design/WntXgIyUEdn49DFP/scene.splinecode',
    HI: 'https://prod.spline.design/tm-q8M4UBVnlzfXs/scene.splinecode',
    HAPPY: 'https://prod.spline.design/ipTf4XEj4hAhzts8/scene.splinecode',
};

initChatBot();

window.onload = () => {
    const canvas = document.getElementById('canvas3d');
    const app = new Application(canvas);
    app.load(SCENES[currentScene]);
}




// Object.keys(SCENES).map(scene => {
    // const sceneCanvas = document.createElement('canvas');
    // document.querySelector('.canvas-wrapper').append(sceneCanvas);
    // const app = new Application(sceneCanvas);
    // app.load(SCENES[scene]);

    // document.querySelector(`.buttons #${scene.toUpperCase()}`).addEventListener('click', () => {
    //     currentScene = scene;
    //     app.load(SCENES[currentScene]);
    // });
// });

async function initChatBot() {
    const botui = new BotUI('my-botui-app');
    await botui.message.bot({
        content: 'Hey! I heard you’re looking for a new friend! What’s your name?',
        // delay: 3000,
        // loading: true,
    });
    const nameResponse = await botui.action.text({
        action: {
            placeholder: 'Enter your name'
        },
        delay: 1000,
        loading: true,
    });
    // await botui.message.bot({
    //     content: `Nice to meet you ${nameResponse.value}! Could you tell me where you live?`,
    //     delay: 1500,
    //     loading: true,
    // });
    // const addressResponse = await botui.action.text({
    //     action: {
    //         placeholder: 'Enter your city'
    //     }
    // });
    // const shelterIds = await searchShelters(addressResponse.value);
    // console.log(shelterIds);

    currentScene = SCENES.HAPPY;
    app.load(SCENES[currentScene]);

    await botui.message.bot({
        content: `Nice to meet you ${nameResponse.value}! What kind of friend are you looking for?`,
        delay: 1500,
        loading: true,
    });

    const petTypeRes = await botui.action.button({
        action: [
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
        ]
    });

    await botui.message.bot({
        content: `So you're looking for ${petTypeRes.value.toLowerCase()}! We have plenty of friends like that.`,
        delay: 1500,
        loading: true,
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
