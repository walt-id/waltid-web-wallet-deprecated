<template>
    <div>
        <h2>Credential offer</h2>
        <div class="_container-list d-flex justify-content-center align-items-center">
            <div class="_window-content m-2 p-2 ">
                <div class="p-4">
                    <ul>
                        <li class="d-flex">
                            <div class="col-11 d-flex align-items-center">
                                <p>Dominik</p>
                            </div>
                            <span class="col">
                                <i class="bi bi-x-circle-fill"></i>
                            </span>
                        </li>
                        <li class="d-flex">
                            <div class="col-11 d-flex align-items-center">
                                <p>Beron</p>
                            </div>
                            <span class="col">
                                <i class="bi bi-x-circle-fill"></i>
                            </span>
                        </li>
                        <li class="d-flex">
                            <div class="col-11 d-flex align-items-center">
                                <p>xxx</p>
                            </div>
                            <span class="col">
                                <i class="bi bi-x-circle-fill"></i>
                            </span>
                        </li>
                        <li class="d-flex">
                            <div class="col-11 d-flex align-items-center">
                                <p>xxx</p>
                            </div>
                            <span class="col">
                                <i class="bi bi-x-circle-fill"></i>
                            </span>
                        </li>
                        <li class="d-flex">
                            <div class="col-11 d-flex align-items-center">
                                <p>xxx</p>
                            </div>
                            <span class="col">
                                <i class="bi bi-x-circle-fill"></i>
                            </span>
                        </li>

                    </ul>
                </div>
            </div>
        </div>
        <div class="_btns col-12 d-flex justify-content-center">
            <div class="col-6">
                <button href="#share" class="_share col-12 mb-2">Share</button>
                <a href="#reject" class="_reject col-12">Reject</a>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'CredentialOffer',
  data() {
    return {
      id: 'xxxxxxxxxx'
    }
  }
};
</script>
