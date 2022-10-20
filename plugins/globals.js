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
                let matches = url.match("^(ipfs://)([1-9A-Za-z]{59}|[1-9A-Za-z]{46})$");
                if (matches != null && matches.length > 2) {
                    result = "https://ipfs.io/ipfs/" + matches[2]
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