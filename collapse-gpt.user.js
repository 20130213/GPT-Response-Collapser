// ==UserScript==
// @name         ChatGPT 回覆折疊器
// @namespace    https://github.com/20130213/GPT-Response-Collapser
// @version      0.5
// @description  為 ChatGPT 回覆加入可折疊按鈕，自動偵測新回覆、穩定運作
// @match        https://chat.openai.com/*
// @match        https://chatgpt.com/*
// @grant        none
// ==/UserScript==

(function () {
    'use strict';

    const log = (...args) => console.log('[GPT 折疊器]', ...args);

    function addCollapseButtons() {
        const assistantMessages = document.querySelectorAll('div[data-message-author-role="assistant"]');

        assistantMessages.forEach(msg => {
            if (msg.querySelector('.collapse-test-button')) return;

            const markdown = msg.querySelector('.markdown');
            if (!markdown || !markdown.parentElement) return;

            const button = document.createElement('button');
            button.innerText = '🔽 折疊回覆';
            button.className = 'collapse-test-button';
            button.style.margin = '10px 0';
            button.style.background = '#eee';
            button.style.border = '1px solid #ccc';
            button.style.borderRadius = '6px';
            button.style.padding = '4px 10px';
            button.style.cursor = 'pointer';

            button.addEventListener('click', () => {
                markdown.style.display = (markdown.style.display === 'none') ? '' : 'none';
                button.innerText = markdown.style.display === 'none' ? '▶ 展開回覆' : '🔽 折疊回覆';
            });

            markdown.parentElement.insertBefore(button, markdown);
            log('已加入折疊按鈕');
        });
    }

    function waitForMainContainer() {
        const container = document.querySelector('main');

        if (!container) {
            requestAnimationFrame(waitForMainContainer);
            return;
        }

        log('主容器已載入，開始觀察變化');

        const observer = new MutationObserver(() => {
            addCollapseButtons();
        });

        observer.observe(container, { childList: true, subtree: true });
        addCollapseButtons();
    }

    waitForMainContainer();
})();
