import Web3 from 'web3';
import { setGlobalState, getGlobalState, setAlert } from './store';
import abi from './abis/TimelessNFT.json';

const { ethereum } = window;

// Check for Ethereum provider
if (!ethereum) {
    alert('Please install MetaMask');
    throw new Error('MetaMask is required');
}

window.web3 = new Web3(ethereum);

const getEthereumContract = async () => {
    const connectedAccount = getGlobalState('connectedAccount');

    if (connectedAccount) {
        const web3 = window.web3;
        const networkId = await web3.eth.net.getId();
        const networkData = abi.networks[networkId];

        if (networkData) {
            return new web3.eth.Contract(abi.abi, networkData.address);
        } else {
            alert('Smart contract not deployed to the current network');
            return null;
        }
    } else {
        return getGlobalState('contract');
    }
};

const connectWallet = async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_requestAccounts' });
        setGlobalState('connectedAccount', accounts[0].toLowerCase());
    } catch (error) {
        reportError(error);
    }
};

const isWalletConnected = async () => {
    try {
        const accounts = await ethereum.request({ method: 'eth_accounts' });

        window.ethereum.on('chainChanged', () => {
            window.location.reload();
        });

        window.ethereum.on('accountsChanged', async (newAccounts) => {
            if (newAccounts.length) {
                setGlobalState('connectedAccount', newAccounts[0].toLowerCase());
                await isWalletConnected();
            } else {
                alert('Please connect wallet.');
                console.log('No accounts found.');
            }
        });

        if (accounts.length) {
            setGlobalState('connectedAccount', accounts[0].toLowerCase());
        } else {
            alert('Please connect wallet.');
            console.log('No accounts found.');
        }
    } catch (error) {
        reportError(error);
    }
};

const mintNFT = async ({ title, description, metadataURI, price }) => {
    try {
        const web3 = window.web3;
        price = web3.utils.toWei(price.toString(), 'ether');
        const contract = await getEthereumContract();
        const account = getGlobalState('connectedAccount');
        const mintPrice = web3.utils.toWei('0.01', 'ether');

        await contract.methods
            .payToMint(title, description, metadataURI, price)
            .send({ from: account, value: mintPrice });

        return true;
    } catch (error) {
        reportError(error);
    }
};

const getAllNFTs = async () => {
    try {
        const contract = await getEthereumContract();
        const nfts = await contract.methods.getAllNFTs().call();
        const transactions = await contract.methods.getAllTransactions().call();

        setGlobalState('nfts', structuredNfts(nfts));
        setGlobalState('transactions', structuredNfts(transactions));
    } catch (error) {
        reportError(error);
    }
};

const structuredNfts = (nfts) => {
    return nfts
        .map((nft) => ({
            id: Number(nft.id),
            owner: nft.owner.toLowerCase(),
            cost: window.web3.utils.fromWei(nft.cost),
            title: nft.title,
            description: nft.description,
            metadataURI: nft.metadataURI,
            timestamp: nft.timestamp,
        }))
        .reverse();
};

const reportError = (error) => {
    setAlert(JSON.stringify(error), 'red');
    console.error('Error:', error);
};

export {
    connectWallet,
    isWalletConnected,
    mintNFT,
    getAllNFTs, // Added export for getAllNFTs
};
