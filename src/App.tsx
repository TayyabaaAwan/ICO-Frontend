import React, {useState} from 'react';
import { AbiItem } from 'web3-utils'
import './App.css';
import Web3 from "web3";
import ICOJson from "./ico.json";

function App() {
  const web3 = new Web3(window.ethereum);
  
  const address="0x20d0C061153A60BC166b32a33d7828261AE9FA97";
  const [checkAmount, setCheckAmount] = useState('Enter the amount here');
  const [accounts, setAccount] = useState<any>([]);

  async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert("Please Install the wallet")
        }
        else
          await window.ethereum.enable();
          let account = await web3.eth.getAccounts();
          setAccount(account);
        // chainId = await web3.eth.getChainId()
        console.log("address", account);
        return accounts;
    } catch (error) {
        console.log(error);
    }
  }
  // const Account=()=> {
  //   setAccount(accounts[0]);
  //   console.log(accounts[0])
  //   return(accounts[0])
  // }
   
const Amount=()=> {
  setCheckAmount(checkAmount);
  console.log(checkAmount)
  return(checkAmount)
}
  // async function Funds(amount : any) {
  //   await invest(amount);
  // };

 async function invest() {
  try {
    const contract = new web3.eth.Contract(ICOJson.abi as AbiItem[], address);
    const funds = await contract.methods.invest().send({from :accounts[0]}); 
    console.log("Funds recieved", funds)
 } catch (error) {
    console.log(error)
 }
 }

async function collectProfit() {
  try {
    const contract = new web3.eth.Contract(ICOJson.abi as AbiItem[], address);
    const profit = await contract.methods.collectProfit().call(accounts[0]); 
    console.log("Profit Collected: ", profit)
 } catch (error) {
    console.log(error)
 }
 }
 async function profitCollected(amount: any) {
  await collectProfit();
};
return (
    <>
    <div className="App">
      <header className="App-header">
      <button onClick={connectWallet}>Connect</button>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputAmount">Invest in ICO</label><br />
          <input className="form-control" placeholder="Add amount to invest in ICO" onChange={event => setCheckAmount(event.target.value)}></input>
        </div>
      </form>
      <button type="submit" className="btn btn-primary" onClick={() => invest() }>Invest</button>
      <button type="submit" className="btn btn-primary" onClick={() => profitCollected(checkAmount) }>Collect Profit</button>
      </header>
    </div>  
    </>  
  );
 }

export default App;
// /<button onClick={getTokens}>Invest in ICO</button>

