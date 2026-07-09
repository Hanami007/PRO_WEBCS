import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";

type CardProps = {
  content: string;
  name: string;
  title: string;
  imgUrl: string;
};

const TestimonialCard = ({ content, name, title, imgUrl }: CardProps) => {
  return (
    <Card className="h-full flex flex-col">
      <CardHeader>
        <CardTitle>
          <h3>{content}</h3>
        </CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
        <Avatar className="size-12">
          <AvatarImage src={imgUrl} />
          <AvatarFallback>ST</AvatarFallback>
        </Avatar>
        <div className="flex flex-col">
          <p className="lead">{name}</p>
          <p className="text-muted-foreground">{title}</p>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
