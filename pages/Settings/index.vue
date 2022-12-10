<template>
    <div class="_setting">
        <h2>Settings</h2>
        <br>
        <!--<p class="mt-3">You have no settings.</p>-->
        <div class="d-flex mt-3 align-items-center _setting-items">
            <div class="col-10 _item">
                <h4>Account</h4>
                <p>Manage your account.</p>
            </div>
            <div class="col">
                <NuxtLink to="/settings/account" class="_button-view">View</NuxtLink>
            </div>
        </div>
        <div class="d-flex mt-4 align-items-center _setting-items">
            <div class="col-10 _item">
                <h4>Data</h4>
                <p>Manage your data.</p>
            </div>
            <div class="col">
                <NuxtLink to="/settings/data" class="_button-view">View</NuxtLink>
            </div>
        </div>
        <div class="d-flex mt-4 align-items-center _setting-items">
            <div class="col-10 _item">
                <h4>Ecosystems</h4>
                <p>Join and manage your<br>identity ecosystems.</p>
            </div>
            <div class="col">
                <NuxtLink to="/settings/ecosystems" class="_button-view">View</NuxtLink>
            </div>
        </div>
    </div>
</template>

<script>

export default {
  name: 'Settings'
};
</script>
