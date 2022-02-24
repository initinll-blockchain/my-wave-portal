<script>
    import { getContractAddress } from '$lib/helper/wavePortalHelper';
    let contractAddress = getContractAddress();
</script>

<div class="bio">Deployed on Rinkeby at {contractAddress}</div>