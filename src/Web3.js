import abi from "./abi/abi.json" assert {type:"json"};

const polygon = new Promise((res, rej) => {
    async function meta(){
        //checking if metamask is installed or not
        if (typeof window.ethereum === "undefined") {
            rej("You should install Metamask");
        }

        let web3 = new Web3(window.ethereum);
        let contract = new web3.eth.Contract(
            abi,
            "0x6F20400075Bb45afc7E16F0ED73F963E35e579bb"
        );

        let accounts = await web3.eth.requestAccounts();
        console.log("Connected account : ", accounts[0]);

        let totalSupply = await contract.methods.totalSupply().call({from:accounts[0]});
        let maxSupply = await contract.methods.maxSupply().call({from:accounts[0]});
        console.log("Max Supply :",maxSupply);

        let objects = await contract.methods.getOwnersObject().call({from:accounts[0]});
        console.log("Your objects :",objects);
    

        //if we get the accounts
        web3.eth.requestAccounts().then((accounts) => {
            //if we get the supply
            contract.methods.totalSupply().call({from:accounts[0]}).then((supply)=>{
                //if we get the objects
                contract.methods.getObjects.call({from:accounts[0]}).then((data)=>{
                    res({supply:supply,nft:data});
                })
            });
        })

    }

    meta();
});

export default polygon;