import { useRef, useState, useContext, Fragment } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { ChevronDownIcon } from '@heroicons/react/solid';
import { useHistory } from 'react-router-dom';
import { StoreContext, signUp, connectToWallet } from '../utils';
import backgroundImage from '../assets/backgroundimage.jpg'

function Verify() {
  let history = useHistory();
  const ctx = useContext(StoreContext);
  const { state } = ctx;
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [accType, setType] = useState('user');


  return (
    
      <div className={`flex h-screen w-100 px-5 justify-end items-center -mt-16 bg-no-repeat bg-cover bg-center rounded-lg`} 
      style={{ backgroundImage: `url(${backgroundImage})`}} >
        <div className='w-3/13 mx-5  p-5 border-2 drop-shadow-sm border-solid border-gray-300 rounded-3xl ' style={{marginRight:'13rem'}}>
          <div className='text-white mx-auto text-center '>
            <h2 className=' p-1 text-lg'><b>Verify Your Details</b></h2>
            <form
              className='p-1 '
              onSubmit={(e) => {
                e.preventDefault();
              }}>
              <label className='px-1 py-1 my-1'><b>Enter Your Email Id:</b></label>
              <input
                placholder='Enter your LinkedIn mail id'
                type='text'
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                className='border-2 border-solid border-black my-1'
                required
              />
              <br />
              <label className='px-3 py-1'><b>Enter Your Name:</b></label>
              <input
                placholder='Enter name'
                type='text'
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                }}
                className='border-2 border-solid border-black my-2'
                required
              />
              <br />
              <br />
              <select
                className='p-2 bg-black border-2 border-black rounded-sm'
                value={accType}
                onChange={(e) => {
                  setType(e.target.value);
                }}>
                <option value='user' className='p-2'>
                  user
                </option>
                <option value='company' className='p-2'>
                  company
                </option>
              </select>
              <button
                onClick={async () => {
                  if (state.connected) {
                    console.log(email, name, accType);
                    if (await signUp(ctx, email, name, accType))
                      history.push('/');
                    else alert('signup error');
                  } else {
                    connectToWallet(ctx);
                  }
                }}
                className='bg-white mx-auto text-black rounded-lg hover:text-white-300 block px-4 py-2 m-4 text-sm'>
                <b>Verify</b>
              </button>
            </form>
          </div>
        </div>
      </div>
    
  );
}

export default Verify;
