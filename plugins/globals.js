export default (context, inject) => {
    const globals = {
        thumbnail(credential) {
            if (credential.type[credential.type.length - 1] == "OpenBadgeCredential") {
                return credential.credentialSubject.achievement.image
            }
        },
        convertUrl(url) {
            let result = url
            if (url) {
                const regex = "^((ipfs|ipns)://)([1-9A-Za-z]{59}|[1-9A-Za-z]{46})(/[^\\?]*)*(\\?filename=[^\\?]+)?$"
                result = this.buildUrlFromMatches(url.match(regex))
            }
            return this.isNotNullOrEmpty(result) ? result : url
        },
        buildUrlFromMatches(matches){
            let result = null
            if (matches != null && matches.length > 3) {
                result = `https://ipfs.io/${matches[2]}/${matches[3]}`
                if(matches[4] != null){
                    result += matches[4]
                }
                if(matches[5] != null){
                    result += matches[5]
                }
            }
            return result
        },
        getXHRPromise(url, method, header = 'Content-Type') {
            return new Promise(function (resolve, reject) {
                let xhr = new XMLHttpRequest();
                xhr.open(method, url, true);
                xhr.onload = function () {
                    if (this.status >= 200 && this.status < 300) {
                        let response = xhr.response
                        if(method.toUpperCase() == 'HEAD'){
                            response = xhr.getResponseHeader(header)
                        }
                        resolve(response);
                    } else {
                        reject({
                            status: this.status,
                            statusText: xhr.statusText
                        });
                    }
                };
                xhr.onerror = function () {
                    reject({
                        status: this.status,
                        statusText: xhr.statusText
                    });
                };
                xhr.send();
            });
        },
        async getRemoteFileMimeType(url){
            return this.mimeType(await this.getXHRPromise(url, 'HEAD', 'Content-Type'))
        },
        mimeType(type) {
            let result = null
            if(type){
                result = type.substr(0, type.indexOf('/'))
            }
            return result
        },
        isNotNullOrEmpty(value) {
            return value != null && value !== "";
        },
        mediaUrl(nft){
            let url = this.convertUrl(nft.metadata.image)
            if(!this.isNotNullOrEmpty(url)){
                url = nft.metadata.image_data
            }
            if (!this.isNotNullOrEmpty(url)) {
                url = "/NoImageAvailable.jpg"
            }
            return url
        }
    }
    // Inject $convertUrl(url) in Vue, context and store.
    inject('globals', globals)
    // For Nuxt <= 2.12, also add 👇
    context.$globals = globals
}