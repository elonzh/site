// https://www.tampermonkey.net/documentation.php
// ==UserScript==
// @name         添加飞书切换团队
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  try to take over the world!
// @author       elonzh
// @match        https://*.feishu.cn/messenger/
// @connect      feishu.cn
// @grant        GM_xmlhttpRequest
// @require      https://cdn.jsdelivr.net/npm/arrive@2.4.1/src/arrive.min.js
// ==/UserScript==

function getUser() {
    // {"code":0,"message":"ok","data":{"user_id":"6754331012689297672","tenant":{"tenant_id":"6754331010424373512","name":"elonzh","icon_url":"https://s3-fs.pstatp.com/static-resource/v1/25d0001e-9ff8-40bf-8fee-4d85fa552b8g~?image_size=100x100\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp","tenant_domain":"elonzh","suite_full_domain":"elonzh.feishu.cn","tip":"","tag":0,"status":0,"single_product_types":[1]},"tenant_id":"6754331010424373512","name":"elonzh","en_name":"elonzh","i18n_name":{"en_us":"elonzh","ja_jp":"","zh_cn":""},"is_active":true,"is_frozen":false,"is_c":false,"is_idp":false,"is_guest":false,"upgrade_enabled":false,"avatar_url":"https://s3-fs.pstatp.com/static-resource/v1/50c40c28-192b-4a24-95de-7bed16d4a91g~?image_size=100x100\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp","avatar_key":"50c40c28-192b-4a24-95de-7bed16d4a91g","user_env":"feishu","user_unit":"eu_nc","user_status":0,"tip":""}}
    let details = {
        method: "GET",
        url: "https://www.feishu.cn/suite/passport/v3/user?app_id=1",
        onabort: (e) => {
            console.warn("onabort", e)
        },
        onerror: (e) => {
            console.warn("onerror", e)
        },
        onload: (
            finalUrl,
            readyState,
            status,
            statusText,
            responseHeaders,
            response,
            responseXML,
            responseText,
        ) => {
            console.log('getUser', response)
        }
    }
    console.log(GM_xmlhttpRequest(details))
    let req = new XMLHttpRequest()
    req.addEventListener("abort", details.onabort)
    req.addEventListener("error", details.onerror)
    req.addEventListener("load", details.onload)
    req.open(details.method, details.url)
    req.withCredentials = true
    req.send()
}

function getUsers() {
    // {"code":0,"message":"ok","data":{"users":[{"user_id":"6876970395623227394","tenant":{"tenant_id":"6841362461338124290","name":"Ivy Science","icon_url":"https://s1-fs.pstatp.com/static-resource/v1/27fa97ce-03dd-49f4-bc9b-955591f9fa6g~?image_size=100x100\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp","tenant_domain":"ivysci","suite_full_domain":"ivysci.feishu.cn","tip":"","tag":0,"status":0,"single_product_types":[1]},"tenant_id":"6841362461338124290","name":"周而良","en_name":"周而良","i18n_name":{"en_us":"","ja_jp":"","zh_cn":""},"is_active":true,"is_frozen":false,"is_c":false,"is_idp":false,"is_guest":false,"upgrade_enabled":false,"avatar_url":"https://s3-fs.pstatp.com/static-resource/v1/752d3528-02fa-4a1e-8d55-c1a2d8304d5g~?image_size=100x100\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp","avatar_key":"752d3528-02fa-4a1e-8d55-c1a2d8304d5g","user_env":"feishu","user_unit":"eu_nc","user_status":0,"tip":"","account_security_config":{"module_modify_pwd":{"switch_status":1},"module_account_management":{"switch_status":1},"module_security_verification":{"switch_status":1},"module_device_management":{"switch_status":1},"module_2fa":{"switch_status":0}}},{"user_id":"6754331012689297672","tenant":{"tenant_id":"6754331010424373512","name":"elonzh","icon_url":"https://s3-fs.pstatp.com/static-resource/v1/25d0001e-9ff8-40bf-8fee-4d85fa552b8g~?image_size=100x100\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp","tenant_domain":"elonzh","suite_full_domain":"elonzh.feishu.cn","tip":"","tag":0,"status":0,"single_product_types":[1]},"tenant_id":"6754331010424373512","name":"elonzh","en_name":"elonzh","i18n_name":{"en_us":"elonzh","ja_jp":"","zh_cn":""},"is_active":true,"is_frozen":false,"is_c":false,"is_idp":false,"is_guest":false,"upgrade_enabled":false,"avatar_url":"https://s3-fs.pstatp.com/static-resource/v1/50c40c28-192b-4a24-95de-7bed16d4a91g~?image_size=100x100\u0026cut_type=\u0026quality=\u0026format=png\u0026sticker_format=.webp","avatar_key":"50c40c28-192b-4a24-95de-7bed16d4a91g","user_env":"feishu","user_unit":"eu_nc","user_status":0,"tip":"","account_security_config":{"module_modify_pwd":{"switch_status":1},"module_account_management":{"switch_status":1},"module_security_verification":{"switch_status":1},"module_device_management":{"switch_status":1},"module_2fa":{"switch_status":0}}}],"current_user_id":"6754331012689297672"}}
    let details = {
        method: "GET",
        url: "https://www.feishu.cn/suite/passport/v3/users?app_id=1",
        onabort: (e) => {
            console.warn("onabort", e)
        },
        onerror: (e) => {
            console.warn("onerror", e)
        },
        onload: (
            finalUrl,
            readyState,
            status,
            statusText,
            responseHeaders,
            response,
            responseXML,
            responseText,
        ) => {
            console.log('getUsers', response)
        }
    }
    console.log(GM_xmlhttpRequest(details))
    let req = new XMLHttpRequest()
    req.addEventListener("abort", details.onabort)
    req.addEventListener("error", details.onerror)
    req.addEventListener("load", details.onload)
    req.open(details.method, details.url)
    req.withCredentials = true
    req.send()
}

function switchUser() {
    let url = "https://www.feishu.cn/suite/passport/v3/switch"
    // {"user_id":"6876970395623227394","app_id":1,"path":"https://vc.feishu.cn/j?lang=zh-CN"}
    let req = new XMLHttpRequest()
    req.open(details.method, details.url)
}

function injectNavItem() {
    let ele = document.querySelector("#app section.appNavbar > section.nav-items")
    const item = document.createElement("section")
    item.classList.add("navbarMenu")
    item.insertAdjacentHTML('afterbegin', '<div class="larkc-badge"><div class="larkc-avatar larkc-avatar-middle appNavbar_avatar"><img class="larkc-avatar-img" alt="Avatar" src="https://internal-api-lark-file.feishu.cn/api/avatar/v1/752d3528-02fa-4a1e-8d55-c1a2d8304d5g/72x72_q70.image"></div></div>')
    item.addEventListener('click', event => {
        console.log(`Click count: ${event.detail}`)
    })
    ele.append(item)
    console.log("injectNavItem finished", ele)
    getUser()
    getUsers()
}


(function () {
    'use strict';
    document.arrive("#app section.appNavbar > section.nav-items", function () {
        console.log('page is fully loaded')
        injectNavItem()
    })
})()
