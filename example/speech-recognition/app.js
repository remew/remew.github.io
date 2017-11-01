'use strict';

window.addEventListener('DOMContentLoaded', () => {
    if (!isSupportedBrowser()) {
        return alert('this browser is not supported');
    }
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const speechRecognition = new SpeechRecognition;
    speechRecognition.continuous = true;
    speechRecognition.interimResults = true;
    speechRecognition.lang = 'ja-JP';
    window.speechRecognition = speechRecognition; // for debug

    const ul = document.getElementById('list');
    const btn = document.getElementById('btn');

    btn.addEventListener('click', () => {
        speechRecognition.start();
    });

    speechRecognition.addEventListener('result', e => {
        const results = [...e.results].map(([result]) => result);
        const frag = document.createDocumentFragment();
        results.forEach(result => {
            const li = document.createElement('li');
            li.textContent = result.transcript;
            frag.appendChild(li);
        });
        ul.innerHTML = '';
        ul.appendChild(frag);
    });
    speechRecognition.addEventListener('nomatch', e => {
        console.log('nomatch', e);
    });
    speechRecognition.addEventListener('end', e => {
        console.log('end', e);
    });
    speechRecognition.addEventListener('audiostart', e => {
        console.log('audiostart', e);
    });
    speechRecognition.addEventListener('soundstart', e => {
        console.log('soundstart', e);
    });
    speechRecognition.addEventListener('speechstart', e => {
        console.log('speechstart', e);
    });
    speechRecognition.addEventListener('audioend', e => {
        console.log('audiosend', e);
    });
    speechRecognition.addEventListener('soundend', e => {
        console.log('soundend', e);
    });
    speechRecognition.addEventListener('speechend', e => {
        console.log('speechend', e);
    });
    speechRecognition.addEventListener('error', e => {
        console.error(e);
    });

    function isSupportedBrowser() {
        return ('SpeechRecognition' in window) || ('webkitSpeechRecognition' in window);
    }
});

