<template>
    <div>
        <video :src="$globals.mediaUrl(nft)" class="img-fluid img-thumbnail" v-if="!showQR && isVideo && thumbnail" autoplay muted playsinline />
        <video :src="$globals.mediaUrl(nft)" class="image-fluid mx-auto img-thumbnail nft-img" v-if="!showQR && isVideo && !thumbnail" autoplay loop playsinline />
        <img :src="$globals.mediaUrl(nft)" class="image-fluid mx-auto img-thumbnail nft-img" v-if="!showQR && !isVideo" />
    </div>
</template>

<script>
import moment from "moment";

export default {
    name: "TokenMediaComponent",
    props: {
        nft: {},
        showQR: Boolean,
        thumbnail: Boolean,
    },
    data() {
        return {
            moment: moment,
            isVideo: false,
        }
    },
    async mounted() {
        console.log(this.muted)
        const media = this.$globals.mediaUrl(this.nft)
        await this.$globals.getRemoteFileMimeType(media)
        .then( res => {
            this.isVideo = res !== undefined && res.toLowerCase() == "video"
        }
        ).catch(err => {
            console.log(err)
        })
    },
}
</script>

<style scoped>

</style>