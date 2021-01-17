import * as Navigation from "../services/navigation";
import { useRouter } from "next/router";
import { Card, Elevation } from "@blueprintjs/core";
export default function Home() {
  const router = useRouter();
  return (
    <div className="absolute justify-center items-center flex w-full h-full bg-auth-background">
      <Card
        elevation={Elevation.THREE}
        className="flex flex-col w-96 h-64 border-xl items-center justify-center space-y-4">
        <div className="text-4xl font-thin mb-6">INTERNIFY</div>
        <div
          className="rounded cursor-pointer flex place-items-center justify-center text-white bg-indigo-800 hover:bg-indigo-600 w-64 h-10"
          onClick={() => {
            Navigation.goToRegister(router);
          }}>
          <div className="text-lg">Register</div>
        </div>
        <div
          className="rounded cursor-pointer flex place-items-center justify-center text-white bg-indigo-800 hover:bg-indigo-600 w-64 h-10"
          onClick={() => {
            Navigation.goToLogin(router);
          }}>
          <div className="text-lg">Login</div>
        </div>
      </Card>
    </div>
  );
}
