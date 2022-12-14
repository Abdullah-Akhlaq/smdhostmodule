import React, { useState, useEffect } from 'react'
import useInput from '../hooks/useInput'

import { useNavigate, Link } from 'react-router-dom'

const SignUp = (props) => {
   
    const navigate = useNavigate()
    const [isAdmin, setIsAdmin]=useState(false)
    const [adminValue1,setAdmin]=useState(false)
   const toggleChangeHandler=(event)=>{
    setAdmin(true)
    props.admin(isAdmin)
    console.log(isAdmin);
   }
    let dataArray=[]
    useEffect(()=>{
        const getValues=async()=>{
            const response = await fetch('https://react-3048b-default-rtdb.firebaseio.com/usersReg.json')
            const data= await response.json()
       
            for (const item in data) {
                dataArray.push(data[item])
            }
            console.log(dataArray);
            let isAdminFoundArray=[]
            for(let i=0; i< dataArray.length; i++){
                isAdminFoundArray.push(dataArray[i].isAdmin)
             }
             if(isAdminFoundArray.indexOf(true) !== -1){
                setIsAdmin(true)
                
            } else{
                setIsAdmin(false)
              
            }
        }
        getValues()
    },[])
    
   
    const [alreadyExist, setAlreadyExist] = useState(false)
    //first name
    const {
        value: firstNameValue,
        isValid: eneteredNameIsValid,
        hasError: firstNameHasError,
        valueChangeHandler: firstNameChangeHandler,
        inputBlurHandler: firstNameBlurHandler,
       
    } = useInput((value) => value.trim() !== '')
    // last name
    const {
        value: lastNameValue,
        isValid: eneteredLastNameIsValid,
        hasError: lastNameHasError,
        valueChangeHandler: lastNameChangeHandler,
        inputBlurHandler: lastNameBlurHandler,
       
    } = useInput((value) => value.trim() !== '')

    //email
    const {
        value: emailValue,
        isValid: emailIsValid,
        hasError: emailHasError,
        valueChangeHandler: emailChangeHandler,
        inputBlurHandler: emailBlurHandler,
       
    } = useInput((value) => value.includes('@'))

    // password    
    const {
        value: passwordValue,
        isValid: passwordIsValid,
        hasError: passwordHasError,
        valueChangeHandler: passwordChangeHandler,
        inputBlurHandler: passwordBlurHandler,
      
    } = useInput((value) => value.trim() !== '')
    // confirm Password
    const {
        value: confirmPasswordValue,
        isValid: confirmPasswordIsValid,
        hasError: confirmPasswordHasError,
        valueChangeHandler: confirmPasswordChangeHandler,
        inputBlurHandler: confirmPasswordBlurHandler,
     
    } = useInput((value) => value.trim() !== '')

    let matchingPass = false
    if (passwordValue === confirmPasswordValue) {
        matchingPass = true
    }

    let formIsValid = false
    if (eneteredNameIsValid && eneteredLastNameIsValid && emailIsValid && passwordIsValid && confirmPasswordIsValid && matchingPass) {
        formIsValid = true
    }

    const formSubmitter = async(e) => {
        e.preventDefault();
  
    //    const userValues=[{
    //     firstNameValue,
    //     lastNameValue,
    //     isAdmin,
    //     emailValue,
    //     passwordValue,
    //     confirmPasswordValue
    //    }]
     //  console.log(userValues);
        // const dispatch = useDispatch()
        
        const authUser = async () => {
        //    if (!dataArray.find(obj => obj.emailValue === emailValue)) {
                setAlreadyExist(false)
                try {
                    const response = await fetch('https://react-3048b-default-rtdb.firebaseio.com/usersReg.json', {
                        method: 'POST',
                        body: JSON.stringify({
                            firstNameValue,
                            lastNameValue,
                            isAdmin:adminValue1,
                            emailValue,
                            passwordValue,
                            confirmPasswordValue,
                        }),
                        headers: {
                            'Content-Type': 'application/json'
                        }
                    })
                    if (!response.ok) {
                        const data = await response.json();
                        let errorMessage = data.error.message
                        throw new Error(errorMessage)
                    }
                }
                catch (error) {
                    console.log(error);
                }
                navigate('/data')   
            // }
             setAlreadyExist(true)
        }
        authUser()
        //console.log(userValues);
    // }
    }

    return (
        <>
        
        <form onSubmit={formSubmitter} >
            <div className={firstNameHasError ? 'form-control invalid' : 'form-control'}>
                <label htmlFor="firstName">First Name</label>
                <input type="text" id='firstName' value={firstNameValue}
                    onChange={firstNameChangeHandler}
                    onBlur={firstNameBlurHandler} />
                {firstNameHasError && <p className='error-text'> First Name should not be empty </p>}
            </div>
           {!isAdmin && <input type="checkbox" onChange={toggleChangeHandler} value={isAdmin}/>}

            <div className={lastNameHasError ? 'form-control invalid' : 'form-control'
            }>
                <label htmlFor="lastName">Last Name</label>
                <input type="text" id='lastName' value={lastNameValue}
                    onChange={lastNameChangeHandler}
                    onBlur={lastNameBlurHandler} />
                {lastNameHasError && <p className='error-text'> Last Name should not be empty </p>}
            </div>

            <div className={emailHasError ? 'form-control invalid' : `form-control ${alreadyExist ? 'invalid' : ''}`}
            >
                <label htmlFor="email">Email</label>
                <input type="email" id='email' value={emailValue}
                    onChange={emailChangeHandler}
                    onBlur={emailBlurHandler} />
                {emailHasError && <p className='error-text'> Email should not be empty </p>}
            </div>

            <div className={passwordHasError ? 'form-control invalid' : `form-control`}>
                <label htmlFor="password">Password</label>
                <input type="password" id='password' minLength={6} value={passwordValue}
                    onChange={passwordChangeHandler}
                    onBlur={passwordBlurHandler} />
                {passwordHasError && <p className='error-text'> Password should not be empty </p>}
            </div>

            <div className={confirmPasswordHasError ? 'form-control invalid' : 'form-control'}>
                <label htmlFor="confirmPass">Confirm Password</label>
                <input type="password" id='confirmPass' minLength={6} value={confirmPasswordValue}
                    onChange={confirmPasswordChangeHandler}
                    onBlur={confirmPasswordBlurHandler} />
                {confirmPasswordHasError && <p className='error-text'> Password should not be empty </p>}
                {confirmPasswordHasError && matchingPass && <p className='error-text'> Password should Match </p>}
            </div>
            <button type='submit' disabled={!formIsValid} >Submit</button>
            {alreadyExist && <p className='error-text'> user already exists</p>}

            <p>Already a user? <Link to='/login' >Login in here</Link>  </p>
        </form>
        {dataArray.map(items=><div>
            {items.emailValue}
            1111
        </div>)}
        </>

    )
}

export default SignUp


















































import useInput from "../hooks/useInput";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { useState, useEffect } from "react";
import { dataActions } from "../store/dataSlice";

const Login = () => {
  const [matchedData, setMatchedData] = useState([]);
  const dispatch=useDispatch()
  
  useEffect(() => {
   async function getValues(){
      const response = await fetch(
        "https://react-3048b-default-rtdb.firebaseio.com/usersReg.json"
      );
      const data = await response.json();
      let dataArray = [];
      for (const key in data){
        dataArray.push({
          id: key,
          email:data[key].emailValue,
          password:data[key].passwordValue,
          isAdmin:data[key].isAdmin
        })
      }
      setMatchedData(dataArray)

    };
    getValues()
  }, []);
  console.log(matchedData);

  const [isAdmin, setIsAdmin] = useState(false);

  // const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    value: email,
    isValid: emailIsValid,
    hasError: emailHasError,
    valueChangeHandler: emailChangeHandler,
    inputBlurHandler: emailBlurHandler,
  } = useInput((value) => value.trim() !== "");
  // last name
  const {
    value: passwordValue,
    isValid: passwordIsValid,
    hasError: passwordHasError,
    valueChangeHandler: passwordChangeHandler,
    inputBlurHandler: passwordBlurHandler,
  } = useInput((value) => value.trim() !== "");

  let formIsValid = false;
  if (emailIsValid && passwordIsValid) {
    formIsValid = true;
  }

  const formSubmitter = (e) => {
    e.preventDefault()
    const found = matchedData.find(element => element.email == email);
    // let valueUser= (found ?? localStorage.setItem(found) )
    if (found != undefined ) {
        localStorage.setItem('user',found.email)
        console.log('dddddd');
        console.log(found);
    }
    if (found.isAdmin== true) {
        dispatch(dataActions.storeData(found.isAdmin))
    }
    // if (matchedData.find(obj=>obj.email===email)) {
    //     console.log(obj=>obj.email);
    // }
    // let user=  dataArray.find(obj => obj.email)
    // console.log(user.email);
    // debugger;
    // console.log('entered email',email)
    // let user = dataArray.find(item=>item)
    // console.log(user.email)




    // if( user.email==email ){
    //     console.log('found a match');
    // }
    // else{
    //     console.log('Sad face');
    
    // if (dataArray.find(obj => obj.email === email)) {
    //    console.log('foundvalue');
    // }
    // else{
    //     console.log('ddddd');
    // }

    // const loginUser = async () => {
    //     try {
    //         const response = await fetch('https://auth-7fa28-default-rtdb.firebaseio.com/users.json')

    //         if (!response.ok) {
    //             const data = await response.json();
    //             let errorMessage = data.error.message
    //             throw new Error(errorMessage)
    //         } else {
    //             console.log(response);
    //             //    let match =  Incomingdata.find( )
    //             //  setMatchedData(  )
    //             navigate('/')
    //         }
    //     }

    //     catch (error) {
    //         console.log(error);
    //     }   }
    // loginUser()
  };
  // console.log('data matched is', matchedData);

  return (
    <>
      <form onSubmit={formSubmitter}>
        <div
          className={emailHasError ? "form-control invalid" : "form-control"}
        >
          <label htmlFor="firstName">Email</label>
          <input
            type="email"
            id="firstName"
            value={email}
            onChange={emailChangeHandler}
            onBlur={emailBlurHandler}
          />
          {emailHasError && (
            <p className="error-text"> Email should not be empty </p>
          )}
        </div>
        <div
          className={passwordHasError ? "form-control invalid" : "form-control"}
        >
          <label htmlFor="lastName">Password</label>
          <input
            type="password"
            id="lastName"
            value={passwordValue}
            onChange={passwordChangeHandler}
            onBlur={passwordBlurHandler}
          />
          {passwordHasError && (
            <p className="error-text">password should not be empty </p>
          )}
        </div>
        <button type="submit" disabled={!formIsValid}>
          Submit
        </button>
      </form>
    </>
  );
};

export default Login;
