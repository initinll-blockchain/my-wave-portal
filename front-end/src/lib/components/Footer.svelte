<script>
    import { getContractAddress } from '$lib/helper/wavePortalHelper';
    let contractAddress = getContractAddress();
</script>

<div class="bio">Deployed on Rinkeby at {contractAddress}</div>

<style>
    .bio {
        text-align: center;
        color: gray;
        margin-top: 16px;
    }
</style>