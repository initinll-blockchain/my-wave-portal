<script lang="ts">
    import { getContractAddress } from '$lib/services/wavePortalService';
    let contractAddress: string = getContractAddress();
</script>

<div class="bio">Deployed on Rinkeby at {contractAddress}</div>