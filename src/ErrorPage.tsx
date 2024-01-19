import { useRouteError, useNavigate } from "react-router-dom";
import { RxLinkBreak2 } from "react-icons/rx";
import { Badge } from "./components/ui/badge";
import { Button } from "./components/ui/button";

export default function ErrorPage() {
  const error:any = useRouteError();
  const navigate:any = useNavigate();

  console.error(error);

  return (
    <div className="h-screen w-full flex flex-col justify-center items-center gap-5" id="error-page">
      <RxLinkBreak2 size={50} />
        <div className="flex flex-col items-center">
          <h1>Oops!</h1>
          <p>There's No Page 😔</p>
          <Badge variant={"destructive"}>
            <i>{error.statusText || error.message}</i>
          </Badge>
          <Button onClick={()=>navigate(-1)} className="mt-5" variant={"outline"} size={"sm"}>Go Back</Button>
        </div>
    </div>
  );
}