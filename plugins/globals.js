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
                let matches = url.match("^(ipfs://)([1-9A-Za-z]{59})$");
                if (matches != null && matches.length > 2) {
                    result = "https://ipfs.io/ipfs/" + matches[2]
                }
            }
            return result
        },
        isVideo(nft) {
            let result = false
            let media = this.mediaUrl(nft)
            this.getRemoteFileHeader(media, header => {
                result = this.mimeType(header.type).toLowerCase() == "video"
            })
            return result
        },
        getRemoteFileHeader(url, callback) {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url);
            xhr.responseType = "blob";
            xhr.onload = function() {
              callback(xhr.response)
            };
            xhr.onerror = function() {
              console.log('A network error occurred!');
            };
            xhr.send();
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