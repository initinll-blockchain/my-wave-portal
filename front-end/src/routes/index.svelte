<div class="mainContainer">
    <div class="dataContainer">
      <div class="header">
        👋 Hey, I'm Nitin!
      </div>
      <div class="bio">
        I am .Net developer learning blockchain.
      </div>
      <div class="bio">         
        Connect your Ethereum wallet and wave at me!
      </div>
      <div class="dataContainer">
          <button class="waveButton">Connect Wallet</button>
      </div>      
      <div class="bio">Deployed on Rinkeby at 0x0000.</div>
    </div>
</div>

<style>    
    .mainContainer {
    display: flex;
    justify-content: center;
    width: 100%;
    margin-top: 64px;
    }

    .dataContainer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    max-width: 600px;
    margin-top: 32px;
    margin-bottom: 10px;

    }

    .header {
    text-align: center;
    font-size: 32px;
    font-weight: 600;
    }

    .bio {
    text-align: center;
    color: gray;
    margin-top: 16px;
    }

    .waveMessage {
    margin-top: 16px;
    padding: 8px;
    border: 0;
    border-radius: 5px;
    
    }

    .waveButton {
    cursor: pointer;
    margin-top: 16px;
    padding: 16px;
    border: 0;
    border-radius: 10px;
    font-size: 15px;
    color: purple;
    }
</style>