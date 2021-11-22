// ==UserScript==
// @name         Bad Apple
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       You
// @match        https://www.twitch.tv/directory/all*
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    let sortTitle = "Bad Apple!! (Start to Finish)";

    function sleep(ms) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    let cachedThumbnails = [];
    let cachedProfilePictures = [];
    let cachedTitles = [];
    let cachedViewers = [];
    let cachedUsernames = [];
    let cachedSections = [];
    function populateCache() {

        for (let i = 2; i < 44; i++) {
            let stream = document.querySelector(`#root > div > div.sc-AxjAm.tlQbp > div > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div.sc-AxjAm.gBRyDo > div > div.ScTower-sc-1dei8tr-0.hRbnOC.tw-tower > div:nth-child(${i})`);

            let thumbnailElement = stream.querySelector(`div > div > div > article > div.sc-AxjAm.kJBVIw > div > div.ScTransformWrapper-uo2e2v-1.eiQqOY > a > div > div > div.ScAspectRatio-sc-1sw3lwy-1.dNNaBC.tw-aspect > img`);
            cachedThumbnails.push(thumbnailElement);

            let profilePicture = stream.querySelector(`div > div > div > article > div.sc-AxjAm.czqVsG > div > div.ScImageWrapper-sc-14f6evl-0.feabhV > a > div > figure > img`);
            cachedProfilePictures.push(profilePicture);

            let titleElement = stream.querySelector(`div > div > div > article > div.sc-AxjAm.czqVsG > div > div.ScTextWrapper-sc-14f6evl-1.gboCPP > div:nth-child(1) > div > a > div > h3`);
            cachedTitles.push(titleElement);

            let viewersElement = stream.querySelector(`div > div > div > article > div.sc-AxjAm.kJBVIw > div > div.ScTransformWrapper-uo2e2v-1.eiQqOY > a > div > div > div.ScPositionOver-sc-1iiybo2-0.hahEKi.tw-media-card-image__corners > div.sc-AxjAm.iVDSNS > div > p`);
            cachedViewers.push(viewersElement);

            let usernameElement = stream.querySelector(`div > div > div > article > div.sc-AxjAm.czqVsG > div > div.ScTextWrapper-sc-14f6evl-1.gboCPP > div:nth-child(2) > p:nth-child(1) > a`);
            cachedUsernames.push(usernameElement);

            let sectionElement = stream.querySelector(`div > div > div > article > div.sc-AxjAm.czqVsG > div > div.ScTextWrapper-sc-14f6evl-1.gboCPP > div:nth-child(2) > p:nth-child(2) > a`);
            cachedSections.push(sectionElement)
        };

    }

    function formatViewerCount(view) {
         if (view < 1000) {
             return view + " viewers";
         } else if (view < 1100) {
             return view.toFixed(0) + "K viewers";
         } else if (view > 1000000) {
             return view.substring(0, 3) + "K viewers";
         } else {
             return view.toFixed(1) + "K viewers";
         }
    }

    function applyFrame(x, frame) {
        cachedThumbnails[x].src = "http://127.0.0.1:8887/" + frame.path.split('files3/')[1];
        cachedProfilePictures[x].src = frame.pfp;
        cachedTitles[x].innerText = frame.title;
        cachedViewers[x].innerText = formatViewerCount(frame.viewer_count);
        cachedUsernames[x].innerText = frame.user_name;
        cachedSections[x].innerText = frame.game_name;
    }


    let playBadAppleFunction = function() {
        populateCache();

        let selectedSort = document.querySelector("#root > div > div.sc-AxjAm.tlQbp > div > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div.sc-AxjAm.fYVIHQ > div.sc-AxjAm.bvKSPW > div:nth-child(2) > div.sc-AxjAm.lhJKfK > div > div:nth-child(1) > button > div > div.sc-AxjAm.eFxetL > div")
        selectedSort.innerText = sortTitle
        let tickbox = document.querySelector("#root > div > div.sc-AxjAm.tlQbp > div > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div.sc-AxjAm.fYVIHQ > div.sc-AxjAm.bvKSPW > div:nth-child(2) > div.sc-AxjAm.lhJKfK > div > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(1) > a > div > div.sc-AxjAm.fSXlsG > div > div > svg")
        tickbox.remove()
        let originalLinkElement = document.querySelector("#root > div > div.sc-AxjAm.tlQbp > div > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div.sc-AxjAm.fYVIHQ > div.sc-AxjAm.bvKSPW > div:nth-child(2) > div.sc-AxjAm.lhJKfK > div > div:nth-child(2) > div > div > div > div > div > div > div:nth-child(1) > a")
        originalLinkElement.setAttribute('class', 'ScInteractableBase-awmohi-0 ScInteractableDefault-awmohi-1 juRUlM tw-interactable')
        newLinkElement.setAttribute('class', 'ScInteractableBase-awmohi-0 ScInteractableDefault-awmohi-1 bXQXqm tw-interactable')

        setTimeout(async function() {
            for (let i = 0; i < frames.length; i++) {
                for (let x = 0; x < frames[i].length; x++) {
                    applyFrame(x, frames[i][x])
                }
                await sleep(0);
            }
        }, 500)
    }

    let frames;
    //fetch('https://files.catbox.moe/yl03o0.json').then(response => response.json()).then(json => frames = json);
    fetch('https://files.catbox.moe/48dx5c.json').then(response => response.json()).then(json => frames = json);

    let origin;
    setTimeout(function() {
        origin = document.querySelector(`#root > div > div.sc-AxjAm.tlQbp > div > main > div.root-scrollable.scrollable-area > div.simplebar-scroll-content > div > div > div > div > div.sc-AxjAm.gBRyDo > div > div.ScTower-sc-1dei8tr-0.hRbnOC.tw-tower`);
    }, 1000);

    let newstreamcount = 0;
    let tagRemovalInterval = setInterval(function() {
        let streamcount = document.getElementsByClassName('iOGWRP').length;
        if (streamcount > newstreamcount && origin) {
            for (let y = 0; y < streamcount; y++) {
                let stream = origin.querySelector(`div:nth-child(${y+2}) > div > div > div > article > div.sc-AxjAm.czqVsG > div`);
                let tag = stream.querySelector(`div.ScTextWrapper-sc-14f6evl-1.gboCPP > div.sc-AxjAm.cKgtIZ`);
                if (tag) {
                    tag.remove();
                }
            }
            newstreamcount = streamcount;
        }

        if (streamcount > 42) {
            clearInterval(tagRemovalInterval);
        }
    }, 50)

    let checkExist = setInterval(function() {
        let centeredColumns = document.getElementsByClassName('common-centered-column');

        if (centeredColumns.length) {
            clearInterval(checkExist);
            let checkZoom = setInterval(function() {
                let zoom = (( window.outerWidth - 10 ) / window.innerWidth) * 100;

                if (zoom < 55) {
                    centeredColumns[0].style.maxWidth = "64%"
                    centeredColumns[0].removeAttribute('class');
                    clearInterval(checkZoom);
                }
            }, 500);
        }
    }, 500);

    let newLinkElement;
    let badAppleSortInterval = setInterval(function() {
        let sorts = document.getElementsByClassName('cOAuJS').length
        if (sorts > 1) {
            let original = document.getElementsByClassName('sc-AxjAm cOAuJS')[4]
            let badAppleSort = original.cloneNode(true)
            badAppleSort.querySelector('div > a > div > div.sc-AxjAm.dVmHJR > div > div').innerText = sortTitle
            badAppleSort.querySelector('div > a > div > div.sc-AxjAm.laXFHr > div > div > div > svg').remove()
            let image = document.createElement('img')
            image.src = "https://i.imgur.com/nRXD3Bh.png"
            badAppleSort.querySelector('div > a > div > div.sc-AxjAm.laXFHr > div > div > div').appendChild(image)
            newLinkElement = badAppleSort.querySelector("div > a")
            newLinkElement.removeAttribute('href')
            newLinkElement.style.cursor = "pointer";
            newLinkElement.onclick = playBadAppleFunction;
            document.getElementsByClassName('directory-channel-sort-drop-down')[0].appendChild(newLinkElement)

            clearInterval(badAppleSortInterval)
        }
    }, 50);

})();