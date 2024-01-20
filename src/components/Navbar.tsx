import { useEffect, useState } from "react";
import fullL from "../assets/fullL.svg";
import iconL from "../assets/iconL.svg";
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";
import { fetchUserProfile, logout } from "@/api/api";
import { RegisterState } from "@/interface/interface";
import { RxShare1, RxLinkNone1, RxAvatar, RxExit } from "react-icons/rx";

const Navbar = () => {
  const navigate = useNavigate();
  const [userProfile, setUserProfile] = useState<RegisterState | null>(null);
  const [uID, setuID] = useState("");
  const [active, setActive] = useState({
    post: false,
    connections: false,
    profile: true || false
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userId:any = localStorage.getItem('userId');
        const profileData = await fetchUserProfile(userId);
        setUserProfile(profileData);
        setuID(profileData._id);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      }
    };

    fetchData();
  }, [uID]);

  console.log(active)

  const renderDesktopNav = () => (
    <nav className="border-r w-full min-h-screen lg:flex flex-col justify-around hidden">
      <div className="mx-auto flex p-4 md:p-8">
        <img src={fullL} alt="logo" />
      </div>
      {userProfile ? (
        <>
          <div className="flex flex-col h-full justify-between">
            <ul className="flex flex-col items-center justify-start h-fit w-full border-t gap-5 p-5">
              <li className="w-full">
                <Button 
                  onClick={()=>{
                    setActive({
                      post: true,
                      connections: false,
                      profile: false,
                    });
                    navigate("/bcad/post")
                  }}
                  variant={ active.post ? "default" : "outline" } 
                  className={'w-full'}>Post</Button>
              </li>
              <li className="w-full">
                <Button 
                  onClick={()=>{
                    setActive({
                      post: false,
                      connections: true,
                      profile: false,
                    });
                    navigate(`/bcad/${uID}/connections/`)
                  }}
                  variant={ active.connections ? "default" : "outline" } 
                  className="w-full">Connections</Button>
              </li>
              <li className="w-full">
                <Button 
                  onClick={()=>{
                    setActive({
                      post: false,
                      connections: false,
                      profile: true,
                    });
                    navigate(`/bcad/${uID}`)
                  }}
                  variant={ active.profile ? "default" : "outline" } 
                  className="w-full">Profile</Button>
              </li>
            </ul>
          </div>
          <div className="w-full px-5 pt-5 border-t">
            <Button variant={"secondary"} className="flex flex-col items-center justify-start w-full">Logout</Button>
          </div>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </>
      )}
    </nav>
  );

const renderTabletNav = () => (
    <nav className="min-h-screen border-r flex flex-col items-center justify-around lg:hidden md:flex">
        <div className="mx-auto border-b">
         <img src={iconL} alt="logo" />
       </div>
      {userProfile ? (
        <>
        <div className="flex flex-col items-center w-full gap-5 py-5">
          <div className="flex flex-col justify-center items-center gap-5">
            <Button 
              onClick={()=>{
                setActive({
                  post: true,
                  connections: false,
                  profile: false,
                });
                navigate("/bcad/post")
              }}
              variant={ active.post ? "default" : "outline" } 
              className="rounded-full">
                <RxShare1 size={"30"} />
            </Button>
            <Button 
              onClick={()=>{
                setActive({
                  post: false,
                  connections: true,
                  profile: false,
                });
                navigate(`/bcad/${uID}/connections/`)
              }}
              variant={ active.connections ? "default" : "outline" } 
              className="rounded-full">
                <RxLinkNone1 size={"30"} />
            </Button>
            <Button 
              onClick={()=>{
                setActive({
                  post: false,
                  connections: false,
                  profile: true,
                });
                navigate(`/bcad/${uID}`)
              }}
              variant={ active.profile ? "default" : "outline" } 
              className="rounded-full">
                <RxAvatar size={"30"} />
            </Button>
          </div>
        </div>
        <Button onClick={() => { logout(); navigate("/auth/login"); }} variant={"destructive"} className="rounded-full">
          <RxExit />
        </Button>
        </>
      ) : (
        <>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </>
      )}
    </nav>
  );

    

  const renderMobileNav = () => (
    <nav className="fixed bottom-0 left-0 right-0 border-t lg:hidden md:hidden sm:flex">
      {userProfile ? (
        <div className="flex items-center justify-around py-2">
          <Button 
            onClick={()=>{
              setActive({
                post: true,
                connections: false,
                profile: false,
              });
              navigate("/bcad/post")
            }}
            variant={ active.post ? "default" : "outline" } 
            className="rounded-full">
            <RxShare1 size={"20"} />
          </Button>
          <Button 
            onClick={()=>{
              setActive({
                post: false,
                connections: true,
                profile: false,
              });
              navigate(`/bcad/${uID}/connections/`)
            }}
            variant={ active.connections ? "default" : "outline" } 
            className="rounded-full">
            <RxLinkNone1 size={"20"} />
          </Button>
          <Button 
            onClick={()=>{
              setActive({
                post: false,
                connections: false,
                profile: true,
              });
              navigate(`/bcad/${uID}`)
            }}
            variant={ active.profile ? "default" : "outline" } 
            className="rounded-full">
            <RxAvatar size={"20"} />
          </Button>
          <Button 
            onClick={() => navigate("/logout")} 
            variant={"destructive"} 
            className="rounded-full">
            <RxExit />
          </Button>
        </div>
      ) : (
        <>
          <Button onClick={() => navigate("/login")}>Login</Button>
        </>
      )}
    </nav>
  );
  

  return (
    <>
      {renderDesktopNav()}
      {(window.innerWidth <= 1024 && window.innerWidth > 767) ? renderTabletNav() : null}
      {(window.innerWidth <= 767) ? renderMobileNav() : null}
    </>
  );
};

export default Navbar;
