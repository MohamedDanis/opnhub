"use client";
import React, { useEffect, useState } from "react";
import { Card } from "./ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import Link from "next/link";
import { Button } from "./ui/button";
import { BugIcon, ForkIcon, StarIcon } from "./ui/icons";

const RepoCard = ({ data, handleSubmit }: {data: any, handleSubmit: (topic: string) => void }) => {
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
                className="bg-muted rounded-full px-3 py-1 text-xs font-medium cursor-pointer hover:bg-violet-300 transition-all duration-300"
                onClick={()=>{ handleSubmit(topic) }}
              >
                {topic}
              </span>
            );
          })}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-muted-foreground">
            <BugIcon className="w-5 h-5" />
            <Link href={`${data.html_url}/issues`} className="text-sm font-medium" prefetch={false}  target="_blank">
              {data?.open_issues_count}
            </Link>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <ForkIcon className="w-5 h-5" />
            <Link href={`${data.html_url}/forks`} className="text-sm font-medium" prefetch={false}  target="_blank">
              {data?.forks_count}
            </Link>
          </div>
          <div className="flex items-center gap-2 text-muted-foreground">
            <StarIcon className="w-5 h-5" />
            <Link href={`${data.html_url}/stargazers`} className="text-sm font-medium" prefetch={false}  target="_blank">
              {data?.stargazers_count}
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

export default RepoCard;
