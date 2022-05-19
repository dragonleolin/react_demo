import './App.css';
import React, { useEffect, useState } from "react";
import { Button, Container, Row, Col } from 'react-bootstrap';
import { ethers } from "ethers";
import Web3Modal from "web3modal";

const providerOptions = {
  /* See Provider Options Section */
};

const web3Modal = new Web3Modal({
  network: "rinkeby", // optional
  cacheProvider: true, // optional
  providerOptions: {} // required
});

const contractAddr = '0xcdc6fc93d3910c0d1581fc129bd7658d2deac575';
//contract address: 0xcdc6fc93d3910c0d1581fc129bd7658d2deac575
//Abi資訊從智能合約內的Greeter.json內的abi取
const abi = [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [],
    "name": "greet",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_greeting",
        "type": "string"
      }
    ],
    "name": "setGreeting",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]

function App() {
  const [address, setAddress] = useState('');
  const [balance, setBalance] = useState('');
  const [msg, setMsg] = useState('');
  const [contract, setContract] = useState('');
  const [useInput, setUseInput] = useState('');
  const [ens, setEns] = useState('');
  const shortenAddr = addr => addr.slice(0, 4) + '...' + addr.slice(-4);


  //連結到錢包位置
  async function init() {
    const instance = await web3Modal.connect();
    const provider = new ethers.providers.Web3Provider(instance);
    const signer = provider.getSigner();
    const addr = await signer.getAddress();
    //初始化合約
    const _contract = new ethers.Contract(contractAddr, abi, signer)
    //console.log(contract);
    setContract(_contract)
    setEns(await provider.lookupAddress(addr))
    setAddress(addr);
    const bal = await provider.getBalance(addr);
    //要把BIGNUM變成可視化東西
    setBalance(ethers.utils.formatEther(bal));

  }

  async function getMessage() {
    const _msg = await contract.greet();
    //console.log(_msg);
    setMsg(_msg);
  }
  async function setMessage(msg) {
    await contract.setGreeting(msg);
    //await getMessage()
  }



  // useEffect(() => {
  //   init();
  // }, [])

  return (
    <div className="App" >
      <header>
        <link
          rel="stylesheet"
          href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css"
          integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3"
          crossorigin="anonymous"
        />
        <script crossorigin src="..."></script>
      </header>
      <Container className="mt-5">
        <Row>
          <Col>
            <h1>Hello {ens || shortenAddr(address)}, you have {balance}  Ethers</h1>
          </Col>
        </Row>
        <Row>
          <Col>
            <h1>Greet: {msg}</h1>
          </Col>
        </Row>
        {address && <Row className="mt-5">
          <Col>
            <h2>current user input: {useInput}</h2>
            <input type="text" value={useInput} onChange={e => setUseInput(e.target.value)} />
            <Button onClick={() => { setMessage(useInput) }}> set Message</Button>
          </Col>
        </Row>}
        {address && <Row className="mt-5">
          <Col>
            <Button onClick={() => { getMessage() }}>Get Message</Button>
          </Col>
        </Row>}
        <Row className="mt-5">
          <Col>
            <Button onClick={() => { init() }}> Connect Wallet</Button>
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
