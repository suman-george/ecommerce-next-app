import React from "react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import Socials from "./socials";
import BackButton from "./back-button";

type CardWrapperProps = {
  children: React.ReactNode;
  cardTitle: string;
  backButtonHref: string;
  backButtonLabel: string;
  showSocials?: boolean;
};

const AuthCard = ({
  children,
  cardTitle,
  backButtonHref,
  backButtonLabel,
  showSocials,
}: CardWrapperProps) => {
  return (
    <Card className=" w-96 mx-auto p-0">
      <CardHeader>
        <CardTitle>{cardTitle}</CardTitle>
        <CardContent className="p-0">{children}</CardContent>
        {showSocials && (
          <CardFooter className="p-0">
            <Socials />
          </CardFooter>
        )}
        <CardFooter className="p-0">
          <BackButton href={backButtonHref} label={backButtonLabel} />
        </CardFooter>
      </CardHeader>
    </Card>
  );
};

export default AuthCard;
