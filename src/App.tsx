import React, {useState} from 'react';
import { AbiItem } from 'web3-utils'
import './App.css';
import Web3 from "web3";
import ICOJson from "./ico.json";

function App() {
  const web3 = new Web3(window.ethereum);
  
  const address="0xFB189474191B70584958f4AB104b9d1147ae5140";
  const [checkAmount, setCheckAmount] = useState(0);
  const [accountCheck, setAccountCheck] = useState<any>([]);

  async function connectWallet() {
    try {
        if (!window.ethereum) {
            alert("Please Install the wallet")
        }
        else
          await window.ethereum.enable();
          let account = await web3.eth.getAccounts();
          setAccountCheck(account);
        // chainId = await web3.eth.getChainId()
        console.log("address", account);
        return account;
    } catch (error) {
        console.log(error);
    }
  }
  
const Amount=()=> {
  setCheckAmount(checkAmount);
  console.log(checkAmount)
  return(checkAmount)
}

 async function invest(amount:any) {
  try {
    connectWallet()
    console.log(amount,"checkamount1")
    const contract = new web3.eth.Contract(ICOJson.abi as AbiItem[], address);
    console.log(amount,"2")
    const funds = await contract.methods.invest().send({from :accountCheck[0], value:amount}); 
    console.log(amount,"3")
    console.log("Funds recieved", funds)
 } catch (error) {
    console.log(error)
 }
 }
 async function userCollect(){
  await invest(checkAmount)
 }
async function collectProfit() {
  try {
    const contract = new web3.eth.Contract(ICOJson.abi as AbiItem[], address);
    const profit = await contract.methods.collectProfit().send({from:accountCheck[0]}); 
    console.log("Profit Collected: ", profit)
 } catch (error) {
    console.log(error)
 }
 }
return (
    <>
    <div className="App">
      <header className="App-header">
      <button onClick={connectWallet}>Connect</button>
      <form>
        <div className="form-group">
          <label htmlFor="exampleInputAmount">Invest in ICO</label><br />
          <input className="form-control" placeholder="Add amount to invest in ICO" onChange={(event:any) => setCheckAmount(event.target.value)}></input>
        </div>
      </form>
      <button type="submit" className="btn btn-primary" onClick={() => invest(checkAmount) }>Invest</button>
      <button type="submit" className="btn btn-primary" onClick={() => collectProfit() }>Collect Profit</button> 
      </header>
    </div>  
    </>  
  );
 }

export default App;


