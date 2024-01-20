// Signin.tsx
import { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { login, setAuthToken, register } from '../../api/api';
import logo from "../../assets/iconL.svg";
import signinBanner from "../../assets/signin.jpg";
import { RegisterState, SigninState } from '@/interface/interface';

export default function Login() {

  const [signinState, setSigninState] = useState<SigninState>({
    email: '',
    password: '',
  });

  const [registerState, setRegisterState] = useState<RegisterState>({
    firstName: '',
    lastName: '',
    regEmail: '',
    regPassword: '',
    conPassword: '',
    picturePath: null,
    connections: '',
    sex: '',
    worksAt: '',
    phone: '',
    location: '',
    occupation: ''
  });

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [registerMode, setRegisterMode] = useState(false);

  const handleLogInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
      setSigninState((prevState) => ({
        ...prevState,
        [name]: value,
      }));
  };

  const onImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const pic =  event.target.files[0];
      setRegisterState({ ...registerState, picturePath: pic });
    }
  }

  const handleRegInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setRegisterState((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };
  
  const handleLogIn = async (e:Event) => {
      e.preventDefault()
      setLoading(true);
      try {
        const response = await login(signinState.email, signinState.password);

        const { token, user } = response;
        setAuthToken(token);
        localStorage.setItem('authToken', token);
        localStorage.setItem('userId', user._id);
        window.location.href = `/bcad/${user._id}`
        
      } catch (error:any) {
        setError(error.toString());
        console.error(error);
      } finally {
        setLoading(false);
      }
  };


  const handleRegister = async (e: Event) => {
    e.preventDefault();
    setLoading(true);
  
    try {
      if (registerState.regPassword === registerState.conPassword) {
        const formData = new FormData();
        formData.append('firstName', registerState.firstName);
        formData.append('lastName', registerState.lastName);
        formData.append('email', registerState.regEmail);
        formData.append('password', registerState.regPassword);
        
        // Log FormData to verify that picturePath is set correctly
        console.log(formData);
  
        if (registerState.picturePath) {
          formData.append('picturePath', registerState.picturePath);
        }
  
        await register(formData);
  
        setRegisterMode(false);
        setError('Created! Now login please');
      } else {
        setError('Password did not match');
      }
    } catch (error: any) {
      setError(error.toString());
    } finally {
      setLoading(false);
    }
  };
  
  
  

  // const handleRegister = async (e:Event) => {
  //   e.preventDefault()
  //   setLoading(true);
  //   try {
  //     if (registerState.regPassword === registerState.conPassword) {
  //       await register({
  //         firstName: registerState.firstName ,
  //         lastName: registerState.lastName ,
  //         email: registerState.regEmail ,
  //         password: registerState.regPassword ,
  //         picturePath: registerState.picturePath
  //       })

  //       setRegisterMode(false)
  //       setError("Created! Now login please")

  //     } else {
  //       setError("Password did not match");
  //     }

  //   } catch (error:any) {
  //     setError(error.toString());
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  return (
    <section className="h-screen flex flex-col md:flex-row justify-center md:justify-between items-center">
      <div className="md:flex justify-center items-center w-full h-full hidden">
        <img className="h-full w-full object-cover" src={signinBanner} alt="aesthetics" />
      </div>
      <div className="flex justify-center items-center w-full">
        <Card className="w-fit">
          <CardHeader className="text-center mb-4 w-full">
            <img src={logo} className="object-contain text-center h-20 w-full" alt="Logo" />
            <CardTitle>BCAD Connect</CardTitle>
            <CardDescription>Bridge between BD and CA</CardDescription>
          </CardHeader>
          <form encType="multipart/form-data">
            <CardContent className="flex flex-col gap-5">
              { !registerMode ? 
                (
                  <>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="email">Your email address</Label>
                      <Input
                        type="email"
                        name="email"
                        id="email"
                        value={signinState.email}
                        onChange={handleLogInputChange}
                        autoComplete='off'
                        placeholder="Email"
                      />              
                  </div>
                  <div className="flex flex-col gap-2">
                    <Label htmlFor="password">Your password</Label>
                      <Input
                        type="password"
                        name="password"
                        id="password"
                        value={signinState.password}
                        onChange={handleLogInputChange}
                        autoComplete='off'
                        placeholder="Password"
                      /> 
                      <p className='flex text-xs justify-end gap-1 items-center'>
                        Not an user?
                        <span onClick={()=>{
                          setError("")
                          setRegisterMode(!registerMode)}
                        } className='font-bold cursor-pointer'>Register</span>             
                      </p>
                  </div>
                </>
                )
                :
                (
                  <>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="firstName">First name</Label>
                        <Input
                          required
                          type="text"
                          name="firstName"
                          id="firstName"
                          value={registerState.firstName}
                          onChange={handleRegInputChange}
                          autoComplete='off'
                          placeholder="First Name"
                        /> 
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="lastName">Last name</Label>
                        <Input
                          required
                          type="text"
                          name="lastName"
                          id="lastName"
                          value={registerState.lastName}
                          onChange={handleRegInputChange}
                          autoComplete='off'
                          placeholder="Last Name"
                        /> 
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="regEmail">Your email address</Label>
                        <Input
                          required
                          type="email"
                          name="regEmail"
                          id="regEmail"
                          value={registerState.regEmail}
                          onChange={handleRegInputChange}
                          autoComplete='off'
                          placeholder="Email"
                        /> 
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="picturePath">Your picture</Label>
                        <Input
                          required
                          type="file"
                          name="picturePath"
                          id="picturePath"
                          accept="image/png, image/jpeg"
                          onChange={onImageChange}
                          autoComplete='off'
                        /> 
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="regPassword">Your password</Label>
                        <Input
                          required
                          type="password"
                          name="regPassword"
                          id="regPassword"
                          value={registerState.regPassword}
                          onChange={handleRegInputChange}
                          autoComplete='off'
                          placeholder="Password"
                        /> 
                    </div>
                    <div className="flex flex-col gap-2">
                      <Label htmlFor="conPassword">Confirm password</Label>
                        <Input
                          required
                          type="password"
                          name="conPassword"
                          id="conPassword"
                          value={registerState.conPassword}
                          onChange={handleRegInputChange}
                          autoComplete='off'
                          placeholder="Confirm Password"
                        /> 
                        <p className='flex text-xs justify-end gap-1 items-center'>
                          Already an user?
                          <span onClick={()=>setRegisterMode(!registerMode)} className='font-bold cursor-pointer'>Login</span>             
                        </p>
                    </div>
                  </>
                )
              }

              { error !== ""  &&
                <p className='text-red-500 text-xs'>{error}</p>
              }
              
              <Button type="submit" onClick={(e:any)=>{
                  if(registerMode===false) {
                    handleLogIn(e);
                  } else {
                    handleRegister(e);
                  }
                }} disabled={loading}
              >
                {loading ? 
                  (registerMode ? "Registering..." : "Logging In..." ) 
                  : 
                  (registerMode ? "Register" : "Log in")
                }
              </Button>

            </CardContent>
          </form>
          <CardFooter className="flex justify-center">
            <Badge variant={"outline"}>
              <a rel="noopener" target="_blank" href="https://chnspart.com">
                CHNsPart © 2024
              </a>
            </Badge>
          </CardFooter>
        </Card>
      </div>
    </section>
  )
}