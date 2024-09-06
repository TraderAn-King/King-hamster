document.addEventListener('DOMContentLoaded', () => {
    const EVENTS_DELAY = 30000;
    const games = {
        1: {
            name: 'Train Miner',
            appToken: '82647f43-3f87-402d-88dd-09a90025313f',
            promoId: 'c4480ac7-e178-4973-8061-9ed5b2e17954',
        },
        2: {
            name: 'Chain Cube 2048',
            appToken: 'd1690a07-3780-4068-810f-9b5bbf2931b2',
            promoId: 'b4170868-cef0-424f-8eb9-be0622e8e8e3',
        },
        3: {
            name: 'Merge Away',
            appToken: '8d1cc2ad-e097-4b86-90ef-7a27e19fb833',
            promoId: 'dc128d28-c45b-411c-98ff-ac7726fbaea4',
        },
        4: {
            name: 'Twerk Race 3D',
            appToken: '61308365-9d16-4040-8bb0-2f4a4c69074c',
            promoId: '61308365-9d16-4040-8bb0-2f4a4c69074c',
        },
        5: {
            name: 'Polysphere',
            appToken: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
            promoId: '2aaf5aee-2cbc-47ec-8a3f-0962cc14bc71',
        },
        6: {
            name: 'Mow and Trim',
            appToken: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
            promoId: 'ef319a80-949a-492e-8ee0-424fb5fc20a6',
        },
        7: {
            name: 'Zoopolis',
            appToken: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
            promoId: 'b2436c89-e0aa-4aed-8046-9b0515e1c46b',
        },
        8: {
            name: 'Tile Trio',
            appToken: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
            promoId: 'e68b39d2-4880-4a31-b3aa-0393e7df10c7',
        },
        9: {
            name: 'Fluff Crusade',
            appToken: '112887b0-a8af-4eb2-ac63-d82df78283d9',
            promoId: '112887b0-a8af-4eb2-ac63-d82df78283d9',
        },
       10: {
            name: 'Stone Age',
            appToken: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
            promoId: '04ebd6de-69b7-43d1-9c4b-04a6ca3305af',
        },
        11: {
            let games = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10"];

        }
    };

    const startBtn = document.getElementById('startBtn');
    const keyCountSelect = document.getElementById('keyCountSelect');
    const keyCountLabel = document.getElementById('keyCountLabel');
    const progressContainer = document.getElementById('progressContainer');
    const progressBar = document.getElementById('progressBar');
    const progressBarLine = document.getElementById('progressBarLine');
    const progressText = document.getElementById('progressText');
    const progressLog = document.getElementById('progressLog');
    const keyContainer = document.getElementById('keyContainer');
    const keysList = document.getElementById('keysList');
    const copyAllBtn = document.getElementById('copyAllBtn');
    const generatedKeysTitle = document.getElementById('generatedKeysTitle');
    const gameSelect = document.getElementById('gameSelect');
    const copyStatus = document.getElementById('copyStatus');
    // const sourceCode = document.getElementById('sourceCode');
    const gameSelectGroup = document.getElementById('gameSelectGroup');
    const keyCountGroup = document.getElementById('keyCountGroup');
    const loadingShape = document.getElementById('loadingShape');


    startBtn.addEventListener('click', async () => {
        const gameChoice = parseInt(gameSelect.value);
        const keyCount = parseInt(keyCountSelect.value);
        const game = games[gameChoice];

        // Hide the form sections
        gameSelectGroup.style.display = 'none';
        keyCountGroup.style.display = 'none';
        keyCountLabel.classList.remove('hidden');
        keyCountLabel.innerText = `Number of keys: ${keyCount}`;

        // progressBar.style.width = '0%';
        progressText.innerText = '0%';
        progressLog.innerText = 'Starting...';
        progressContainer.classList.remove('hidden');
        keyContainer.classList.add('hidden');
        generatedKeysTitle.classList.add('hidden');
        keysList.innerHTML = '';
        keyCountSelect.classList.add('hidden');
        gameSelect.classList.add('hidden');
        startBtn.classList.add('hidden');
        copyAllBtn.classList.add('hidden');
        startBtn.disabled = true;

        let progress = 0;
        const updateProgress = (increment, message) => {
            progress += increment;
            progressBar.style.width = `${progress}%`;
            progressText.innerText = `${progress}%`;
            progressLog.innerText = message;
        };

        const generateKeyProcess = async () => {
            const clientId = generateClientId();
            let clientToken;
            try {
                clientToken = await login(clientId, game.appToken);
            } catch (error) {
                // alert(`Failed to login: ${error.message}`);
                alert("Oops! Failed to login");

                startBtn.disabled = false;
                return null;
            }

            for (let i = 0; i < 11; i++) {
                await sleep(EVENTS_DELAY * delayRandom());
                const hasCode = await emulateProgress(clientToken, game.promoId);
                updateProgress(7 / keyCount, 'Please wait. Generating Keys...\nExpected time 2 minutes');
                if (hasCode) {
                    break;
                }
            }

            try {
                const key = await generateKey(clientToken, game.promoId);
                updateProgress(30 / keyCount, 'Generating key...');
                return key;
            } catch (error) {
                // alert(`Failed to generate key: ${error.message}`);
                alert("Oops! Failed to generate key check your Internet or Vpn");
                return null;
            }
        };

        const keys = await Promise.all(Array.from({ length: keyCount }, generateKeyProcess));

        if (keys.length > 1) {
            keysList.innerHTML = keys.filter(key => key).map(key =>
                `<div class="key-item">
                    <input type="text" value="${key}" readonly>
                    <button class="copyKeyBtn" data-key="${key}">Copy Key</button>
                </div>`
            ).join('');
            copyAllBtn.classList.remove('hidden');
            
        } else if (keys.length === 1) {
            keysList.innerHTML =
                `<div class="key-item">
                    <input type="text" value="${keys[0]}" readonly>
                    <button class="copyKeyBtn" data-key="${keys[0]}">Copy Key</button>
                </div>`;
        }
        
        //Zahid bot All keys code here
        function updateConstants() {
            const selectedApp = document.getElementById('appSelect').value;
            const keyCountDropdown = document.getElementById('keyCount');
            const keyCountLabel = document.getElementById('keyCountLabel');
            if (selectedApp === "All") {
                // Hide KeyCount dropdown and label
                keyCountDropdown.style.display = 'none';
                keyCountLabel.style.display = 'none'; 
                NUM_KEYS_TO_GENERATE = 4; // Set default to 4
            } else if (selectedApp === "Fluf") {
                // Show KeyCount dropdown and label
                keyCountDropdown.value = '8';
                keyCountDropdown.style.display = 'block';
                keyCountLabel.style.display = 'block'; 
                NUM_KEYS_TO_GENERATE = parseInt(keyCountDropdown.value);
                APP_TOKEN = appConfigs[selectedApp].appToken;
                PROMO_ID = appConfigs[selectedApp].promoId;
            } else {
                // Show KeyCount dropdown and label
                keyCountDropdown.value = '4';
                keyCountDropdown.style.display = 'block';
                keyCountLabel.style.display = 'block'; 
                NUM_KEYS_TO_GENERATE = parseInt(keyCountDropdown.value);
                APP_TOKEN = appConfigs[selectedApp].appToken;
                PROMO_ID = appConfigs[selectedApp].promoId;
            }
        }
   
        function generateClientId() {
            const timestamp = Date.now();
            const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
            return `${timestamp}-${randomNumbers}`;
        }

        function generateDeviceId() {
            const baseDeviceId = '00000000000-0000000000000000000';
            const randomDigits = Array.from({ length: 5 }, () => Math.floor(Math.random() * 10)).join('');
            let deviceIdArray = baseDeviceId.split('');
            for (let i = 0; i < randomDigits.length; i++) {
                const randomIndex = Math.floor(Math.random() * deviceIdArray.length);
                deviceIdArray[randomIndex] = randomDigits[i];
            }
            return deviceIdArray.join('');
        }

        function sleep(ms) {
            return new Promise(resolve => setTimeout(resolve, ms));
        }

        async function login(appToken, clientId) {
            if (DEBUG_MODE) {
                return `${appToken}:deviceid:${deviceId}:${Date.now()}`;
            }
            while (true) {
                try {
                    const response = await fetch('https://api.gamepromo.io/promo/login-client', {
                        method: 'POST',
                        headers: { 'Content-Type': 'application/json' },
                        body: JSON.stringify({
                            appToken: appToken,
                            clientId: clientId,
                            clientOrigin: 'deviceid'
                        })
                    });
                    const data = await response.json();
                    console.log(data);
                    if (data.clientToken) {
                        return data.clientToken;
                    } else if (data.error_code && counts < 1) {
                        counts ++;
                        appendToDisplay('\nYour ip has been blocked\nGeneration of keys may take more than excepted time');
                        await sleep(120000);
                    } else if (data.error_code) {
                        await sleep(120000);
                    }
                } catch (error) {
                    console.error('Error logging in:', error);
                }
            }
        }

        async function emulateProgress(clientToken, promoId) {
            if (DEBUG_MODE) {
                return Math.random() < 0.5;
            }

            try {
                const response = await fetch('https://api.gamepromo.io/promo/register-event', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${clientToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        promoId: promoId,
                        eventId: generateClientId(),
                        eventOrigin: 'undefined'
                    })
                });
                const data = await response.json();
                console.log(data);
                return data.hasCode;
            } catch (error) {
                console.error('Error emulating progress:', error);
                return false;
            }
        }

        async function generateKey(clientToken, promoId) {
            if (DEBUG_MODE) {
                return Math.random() < 0.5 ? 'BIKE-0NS-DDDY-0GV8-WQ9' : '';
            }
            try {
                const response = await fetch('https://api.gamepromo.io/promo/create-code', {
                    method: 'POST',
                    headers: {
                        'Authorization': `Bearer ${clientToken}`,
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({ promoId: promoId })
                });
                const data = await response.json();
                return data.promoCode;
            } catch (error) {
                console.error('Error generating key:', error);
                return null;
            }
        }

        async function generateSingleKey(appToken, promoId) {
            const clientId = generateClientId();
            const clientToken = await login(appToken, clientId);

            if (!clientToken) {
                console.log('Login failed. Skipping key generation.');
                return null;
            }

            for (let j = 0; j < 33; j++) {
                if (await emulateProgress(clientToken, promoId)) {
                    break;
                }
                await sleep(EVENTS_DELAY);
            }

            const key = await generateKey(clientToken, promoId);
            if (key) {
                appendToDisplay(`New Code : ${key}`);
                allKeys.push(key); // Add the key to the array
            } else {
                //appendToDisplay('Generating next key...');
                return null;
            }
        }

        async function findValidKeys(appToken, promoId, numKeys, appName) {
            const selectedApp = document.getElementById('appSelect').value;
            const copyButton = document.querySelector('.buttoon');
            const keyDisplay = document.getElementById('jsonDataDisplay');
            const loadingBarFill = document.getElementById('loadingBarFill');
            keyDisplay.style.display = "block";
            //keyDisplay.textContent = ''; // Clear previous content

            const keyPromises = Array.from({ length: numKeys }, () => generateSingleKey(appToken, promoId));
            const keys = await Promise.all(keyPromises);


            const validKeys = keys.filter(key => key !== null);
            if (validKeys.length > 0) {
                if (selectedApp === "All" && allKeys.length === 44) {
                        updateLoadingBar(100);
                        appendToDisplay("\nAll Keys Generated, Thanks for using");
                        copyButton.style.display = 'block';
                        localStorage.setItem('generatedKeys', JSON.stringify(allKeys));
                 } else if (selectedApp !== "All" && allKeys.length === parseInt(document.getElementById('keyCount').value) ) {
                        updateLoadingBar(100);
                        appendToDisplay("\nAll Keys Generated, Thanks for using");
                        copyButton.style.display = 'block';
                        localStorage.setItem('generatedKeys', JSON.stringify(allKeys));
                    }
            } else {
                appendToDisplay(`\nError: Failed to generate ${appName} keys!\nPlease try again later.`);

            }
            
            
            //finished all keys zahid
                    
        //added by me
        progressText.classList.add('hidden');
        progressBarLine.classList.add('hidden');

        keyContainer.classList.remove('hidden');
        generatedKeysTitle.classList.remove('hidden');
        document.querySelectorAll('.copyKeyBtn').forEach(button => {
            button.addEventListener('click', (event) => {
                const key = event.target.getAttribute('data-key');
                
                // Check if navigator.clipboard is available
                if (navigator.clipboard && navigator.clipboard.writeText) {
                    navigator.clipboard.writeText(key).then(() => {
                        copyStatus.classList.remove('hidden');
                        setTimeout(() => copyStatus.classList.add('hidden'), 2000);
                    }).catch(err => {
                        console.error('Failed to copy text: ', err);
                    });
                } else {
                    // Fallback method for non-HTTPS environments
                    const textArea = document.createElement('textarea');
                    textArea.value = key;
                    textArea.style.position = 'fixed';  // Avoid scrolling to bottom of page
                    textArea.style.top = '0';
                    textArea.style.left = '0';
                    document.body.appendChild(textArea);
                    textArea.focus();
                    textArea.select();

                    try {
                        const successful = document.execCommand('copy');
                        const msg = successful ? 'successful' : 'unsuccessful';
                        console.log('Fallback: Copying text command was ' + msg);
                        if (successful) {
                            copyStatus.classList.remove('hidden');
                            setTimeout(() => copyStatus.classList.add('hidden'), 2000);
                        }
                    } catch (err) {
                        console.error('Fallback: Oops, unable to copy', err);
                    }

                    document.body.removeChild(textArea);
                }
            });
        });
        copyAllBtn.addEventListener('click', () => {
            const keysText = keys.filter(key => key).join('\n');
            if (navigator.clipboard && navigator.clipboard.writeText) {
                navigator.clipboard.writeText(keysText).then(() => {
                    copyStatus.classList.remove('hidden');
                    setTimeout(() => copyStatus.classList.add('hidden'), 2000);
                }).catch(err => {
                    console.error('Failed to copy text: ', err);
                });
            } else {
                const textArea = document.createElement('textarea');
                textArea.value = keysText;
                textArea.style.position = 'fixed';  // Avoid scrolling to bottom of page
                textArea.style.top = '0';
                textArea.style.left = '0';
                document.body.appendChild(textArea);
                textArea.focus();
                textArea.select();

                try {
                    const successful = document.execCommand('copy');
                    const msg = successful ? 'successful' : 'unsuccessful';
                    console.log('Fallback: Copying text command was ' + msg);
                    if (successful) {
                        copyStatus.classList.remove('hidden');
                        setTimeout(() => copyStatus.classList.add('hidden'), 2000);
                    }
                } catch (err) {
                    console.error('Fallback: Oops, unable to copy', err);
                }

                document.body.removeChild(textArea);
            }
        });

        //progressBar.style.width = '100%';

        


        progressLog.innerText = 'Completed';
        loadingShape.classList.add('hidden');


        // startBtn.classList.remove('hidden');
        // keyCountSelect.classList.remove('hidden');
        // gameSelect.classList.remove('hidden');
        // startBtn.disabled = false;
        generateMore.classList.remove('hidden');
    });

    document.getElementById('generateMoreBtn').addEventListener('click', () => {
        progressContainer.classList.add('hidden');
        keyContainer.classList.add('hidden');
        startBtn.classList.remove('hidden');
        keyCountSelect.classList.remove('hidden');
        gameSelect.classList.remove('hidden');
        generatedKeysTitle.classList.add('hidden');
        copyAllBtn.classList.add('hidden');
        keysList.innerHTML = '';
        keyCountLabel.innerText = 'Number of keys :';
        
        // Show the form sections again
        gameSelectGroup.style.display = 'block';
        keyCountGroup.style.display = 'block';
    });

    // sourceCode.addEventListener('click', () => {
    //     window.open('https://t.me/hamstersyria', '_blank');
    // });

    const generateClientId = () => {
        const timestamp = Date.now();
        const randomNumbers = Array.from({ length: 19 }, () => Math.floor(Math.random() * 10)).join('');
        return `${timestamp}-${randomNumbers}`;
    };

    const login = async (clientId, appToken) => {
        const response = await fetch('https://api.gamepromo.io/promo/login-client', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                appToken,
                clientId,
                clientOrigin: 'deviceid'
            })
        });

        if (!response.ok) {
            throw new Error('Failed to login');
        }

        const data = await response.json();
        return data.clientToken;
    };

    const emulateProgress = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/register-event', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId,
                eventId: generateUUID(),
                eventOrigin: 'undefined'
            })
        });

        if (!response.ok) {
            return false;
        }

        const data = await response.json();
        return data.hasCode;
    };

    const generateKey = async (clientToken, promoId) => {
        const response = await fetch('https://api.gamepromo.io/promo/create-code', {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${clientToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                promoId
            })
        });

        if (!response.ok) {
            throw new Error('Failed to generate key');
        }

        const data = await response.json();
        return data.promoCode;
    };

    const generateUUID = () => {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
            const r = Math.random() * 16 | 0, v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    };

    const sleep = ms => new Promise(resolve => setTimeout(resolve, ms));

    const delayRandom = () => Math.random() / 3 + 1;

});




    const keyCountInput = document.getElementById('keyCountSelect');
    const incrementButton = document.getElementById('increment');
    const decrementButton = document.getElementById('decrement');

    incrementButton.addEventListener('click', function() {
        let value = parseInt(keyCountInput.value);
        if (value < 10) {
            keyCountInput.value = value + 1;
        }
    });

    decrementButton.addEventListener('click', function() {
        let value = parseInt(keyCountInput.value);
        if (value > 1) {
            keyCountInput.value = value - 1;
        }
    });

    const generateMore = document.getElementById('generateMore');
    const loadingShape = document.getElementById('loadingShape');

    generateMore.addEventListener('click', function() {
        progressContainer.classList.add('hidden');
        progressText.classList.remove('hidden');
        progressBarLine.classList.remove('hidden');
        loadingShape.classList.remove('hidden');

        keyContainer.classList.add('hidden');
        keyCountLabel.classList.add('hidden');
        generateMoreBtn.classList.add('hidden');
        generateMore.classList.add('hidden');

        gameSelectGroup.style.display = 'block';
        keyCountGroup.style.display = 'block';
        gameSelect.classList.remove('hidden');
        startBtn.classList.remove('hidden');
        keyCountSelect.classList.remove('hidden');
        startBtn.disabled = false;
    });
        
