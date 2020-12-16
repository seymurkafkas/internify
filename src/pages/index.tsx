import Link from "next/link";
import { Card, Elevation } from "@blueprintjs/core";

export default function Home() {
  return (
    <div className="absolute w-full h-full bg-auth-background">
      <div className="absolute inset-1/2  h-2/6 w-1/6 justify-around items-center transform -translate-x-1/2 -translate-y-1/2  flex flex-row">
        <Link href="/Register">
          <Card elevation={Elevation.THREE}>
            <a>Register</a>
          </Card>
        </Link>
        <Link href="/Login">
          <Card elevation={Elevation.THREE}>
            <a>Login</a>
          </Card>
        </Link>
      </div>
    </div>
  );
}
