<template>
  <div>
    <h1>Verify</h1>
    <div class="px-5">
      Scan an NFT voucher and check its validity.
    </div>
    <div class="mt-5">
      <NuxtLink :to="{ name: 'verify-ScanNFT' }" class="btn btn-primary py-2" style="width: 70%;">
        <i class="bi bi-upc-scan me-2"></i>Scan NFT
      </NuxtLink>
    </div>
  </div>
</template>

<script>

export default {
  name: "Verify",
    
}
</script>
