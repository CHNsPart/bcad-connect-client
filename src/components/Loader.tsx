import { MutatingDots } from "react-loader-spinner"

export default function Loader() {
  return (
    <div className="flex justify-center items-center h-full">
        <MutatingDots
            visible={true}
            height="100"
            width="100"
            color="#1e1e1e"
            secondaryColor="#000"
            radius="12.5"
            ariaLabel="mutating-dots-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    </div>
  )
}
