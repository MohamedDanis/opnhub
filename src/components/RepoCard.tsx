"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";

const RepoCard = ({ data }: any) => {
  const [showMore, setShowMore] = useState(false);

  return (
    <Card className="w-full max-w-sm p-6 grid gap-6">
      <div className="flex items-center gap-4 w-fit">
        <Avatar className="w-12 h-12">
          <AvatarImage src={data.owner.avatar_url} />
          <AvatarFallback>GH</AvatarFallback>
        </Avatar>
        <div className="space-y-1 w-fit px-2">
          <h3 className="text-xl font-bold w-full">{data.name}</h3>
          <p className="text-muted-foreground">{data.owner.login}</p>
        </div>
      </div>
      <div className="space-y-4 text-sm min-w-fit">
        <p>
          {showMore
            ? data.description
            : data?.description?.split(" ").slice(0, 10).join(" ")}
          {data.description?.split(" ").length > 10 && (
            <span
              className="text-primary cursor-pointer"
              onClick={() => setShowMore(!showMore)}
            >
              {showMore ? " Read less" : " Read more..."}
            </span>
          )}
        </p>
        <div className="flex flex-wrap gap-2">
          {data?.topics?.slice(0, 5).map((topic: any, index: any) => {
            return (
              <span
                key={index}
                className="bg-muted rounded-full px-3 py-1 text-xs font-medium"
              >
                {topic}
              </span>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BugIcon className="w-5 h-5" />
            <Link href="#" className="text-sm font-medium" prefetch={false}>
              {data?.open_issues_count}
            </Link>
          </div>
          <Button
            asChild
            variant="ghost"
            size="sm"
            className="gap-1 underline rounded-md underline-offset-2"
          >
            <Link href={data.html_url} target="_blank">
              Repo Link
            </Link>
          </Button>
        </div>
      </div>
    </Card>
  );
};
function BugIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="m8 2 1.88 1.88" />
      <path d="M14.12 3.88 16 2" />
      <path d="M9 7.13v-1a3.003 3.003 0 1 1 6 0v1" />
      <path d="M12 20c-3.3 0-6-2.7-6-6v-3a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v3c0 3.3-2.7 6-6 6" />
      <path d="M12 20v-9" />
      <path d="M6.53 9C4.6 8.8 3 7.1 3 5" />
      <path d="M6 13H2" />
      <path d="M3 21c0-2.1 1.7-3.9 3.8-4" />
      <path d="M20.97 5c0 2.1-1.6 3.8-3.5 4" />
      <path d="M22 13h-4" />
      <path d="M17.2 17c2.1.1 3.8 1.9 3.8 4" />
    </svg>
  );
}
export default RepoCard;
